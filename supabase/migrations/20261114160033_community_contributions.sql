alter table public.document add column storage_bucket text not null default 'documents'
  check (storage_bucket in ('documents', 'contributions'));

create table public.contributions (
  id uuid primary key,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  category_id bigint not null references public.categories(id),
  title text not null check (length(trim(title)) between 3 and 120),
  description text not null check (length(trim(description)) between 20 and 2000),
  author text not null check (length(trim(author)) between 2 and 100),
  source text not null check (length(trim(source)) between 2 and 300),
  usage_note text not null check (length(trim(usage_note)) between 2 and 300),
  rights_confirmed boolean not null check (rights_confirmed),
  file_path text not null unique check (file_path = user_id::text || '/' || id::text || '.pdf'),
  status text not null default 'uploading' check (status in ('uploading','pending','approved','rejected')),
  review_note text check (length(review_note) <= 1000),
  document_id bigint references public.document(id),
  reviewed_by uuid references auth.users(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);
create index contributions_user_created_idx on public.contributions(user_id, created_at desc);
create index contributions_status_created_idx on public.contributions(status, created_at);
alter table public.contributions enable row level security;
revoke all on public.contributions from public, anon, authenticated;
grant select on public.contributions to authenticated;
grant insert (id,category_id,title,description,author,source,usage_note,rights_confirmed,file_path) on public.contributions to authenticated;
grant update (status,review_note,document_id,reviewed_by,reviewed_at) on public.contributions to authenticated;
create policy contribution_select on public.contributions for select to authenticated
  using (user_id = (select auth.uid()) or (select auth.jwt()->'app_metadata'->>'learnspace_role') = 'admin');
create policy contribution_insert on public.contributions for insert to authenticated
  with check (user_id = (select auth.uid()) and coalesce((select auth.jwt()->>'is_anonymous'),'false') <> 'true' and status = 'uploading');
-- This private helper breaks the contribution/storage policy cycle. It checks
-- the caller and ownership itself before bypassing Storage RLS.
create function private.contribution_file_ready(p_id uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select (select auth.uid()) is not null and exists (
    select 1 from public.contributions c join storage.objects o on o.bucket_id = 'contributions' and o.name = c.file_path
    where c.id = p_id and c.user_id = (select auth.uid()) and c.status = 'uploading'
  );
$$;
revoke all on function private.contribution_file_ready(uuid) from public, anon, authenticated, service_role;
grant usage on schema private to authenticated;
grant execute on function private.contribution_file_ready(uuid) to authenticated;
create policy contribution_submit on public.contributions for update to authenticated
  using (user_id = (select auth.uid()) and status = 'uploading')
  with check (user_id = (select auth.uid()) and status = 'pending' and review_note is null and document_id is null and reviewed_by is null and reviewed_at is null
    and (select private.contribution_file_ready(contributions.id)));
create policy contribution_admin_update on public.contributions for update to authenticated
  using ((select auth.jwt()->'app_metadata'->>'learnspace_role') = 'admin')
  with check ((select auth.jwt()->'app_metadata'->>'learnspace_role') = 'admin');

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values ('contributions','contributions',false,10485760,array['application/pdf']);
create policy contribution_file_upload on storage.objects for insert to authenticated
  with check (bucket_id = 'contributions' and exists (
    select 1 from public.contributions c where c.file_path = storage.objects.name and c.user_id = (select auth.uid()) and c.status = 'uploading'
  ));
drop policy documents_published_read on storage.objects;
create policy document_file_read on storage.objects for select to authenticated using (
  (select auth.uid()) is not null and coalesce((select auth.jwt()->>'is_anonymous'),'false') <> 'true' and (
    exists (select 1 from public.document d where d.is_published and d.storage_bucket = storage.objects.bucket_id and d.file_path = storage.objects.name)
    or (bucket_id = 'contributions' and exists (select 1 from public.contributions c where c.file_path = storage.objects.name and (c.user_id = (select auth.uid()) or (select auth.jwt()->'app_metadata'->>'learnspace_role') = 'admin')))
  )
);

grant insert on public.document to authenticated;
grant update (is_published) on public.document to authenticated;
grant usage, select on sequence public.document_id_seq to authenticated;
create policy document_admin_select on public.document for select to authenticated
  using ((select auth.jwt()->'app_metadata'->>'learnspace_role') = 'admin');
create policy document_admin_insert on public.document for insert to authenticated
  with check ((select auth.jwt()->'app_metadata'->>'learnspace_role') = 'admin' and is_published);
create policy document_admin_update on public.document for update to authenticated
  using ((select auth.jwt()->'app_metadata'->>'learnspace_role') = 'admin')
  with check ((select auth.jwt()->'app_metadata'->>'learnspace_role') = 'admin');

create function public.review_contribution(p_id uuid, p_action text, p_note text default null)
returns bigint language plpgsql security invoker set search_path = '' as $$
declare c public.contributions; new_id bigint;
begin
  if (select auth.uid()) is null or coalesce((select auth.jwt()->'app_metadata'->>'learnspace_role'),'') <> 'admin' then raise exception 'Not authorized' using errcode = '42501'; end if;
  if p_action is null or p_action not in ('approve','reject') or (p_action = 'reject' and (p_note is null or length(trim(p_note)) < 5)) or length(coalesce(p_note,'')) > 1000 then raise exception 'Invalid review'; end if;
  select * into c from public.contributions where id = p_id and status = 'pending' for update;
  if not found then raise exception 'Submission is not pending'; end if;
  if p_action = 'approve' then
    if not exists (select 1 from storage.objects o where o.bucket_id = 'contributions' and o.name = c.file_path) then raise exception 'Submission file missing'; end if;
    insert into public.document(category_id,title,slug,description,file_path,file_type,is_published,author,source,usage_note,storage_bucket)
    values(c.category_id,c.title,'contribution-' || c.id::text,c.description,c.file_path,'pdf',true,c.author,c.source,c.usage_note,'contributions') returning id into new_id;
  end if;
  update public.contributions set status = case when p_action = 'approve' then 'approved' else 'rejected' end,
    review_note = nullif(trim(p_note),''), document_id = new_id, reviewed_by = (select auth.uid()), reviewed_at = now() where id = p_id;
  return new_id;
end;
$$;
revoke all on function public.review_contribution(uuid,text,text) from public;
grant execute on function public.review_contribution(uuid,text,text) to authenticated;

create table public.document_reports (
  id uuid primary key default gen_random_uuid(),
  document_id bigint not null references public.document(id),
  reporter_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  reason text not null check (length(trim(reason)) between 10 and 2000),
  status text not null default 'pending' check (status in ('pending','reviewed')),
  created_at timestamptz not null default now()
);
create index document_reports_status_created_idx on public.document_reports(status,created_at);
create index document_reports_reporter_idx on public.document_reports(reporter_id);
alter table public.document_reports enable row level security;
revoke all on public.document_reports from public, anon, authenticated;
grant select on public.document_reports to authenticated;
grant insert (document_id,reason) on public.document_reports to authenticated;
grant update (status) on public.document_reports to authenticated;
create policy reports_select on public.document_reports for select to authenticated
  using (reporter_id = (select auth.uid()) or (select auth.jwt()->'app_metadata'->>'learnspace_role') = 'admin');
create policy reports_insert on public.document_reports for insert to authenticated
  with check (reporter_id = (select auth.uid()) and coalesce((select auth.jwt()->>'is_anonymous'),'false') <> 'true' and status = 'pending' and exists (select 1 from public.document d where d.id = document_id and d.is_published));
create policy reports_admin_update on public.document_reports for update to authenticated
  using ((select auth.jwt()->'app_metadata'->>'learnspace_role') = 'admin')
  with check ((select auth.jwt()->'app_metadata'->>'learnspace_role') = 'admin');

create function public.resolve_document_report(p_id uuid, p_hide boolean default false)
returns void language plpgsql security invoker set search_path = '' as $$
declare report public.document_reports;
begin
  if (select auth.uid()) is null or coalesce((select auth.jwt()->'app_metadata'->>'learnspace_role'),'') <> 'admin' then raise exception 'Not authorized' using errcode = '42501'; end if;
  select * into report from public.document_reports where id = p_id and status = 'pending' for update;
  if not found then raise exception 'Report is not pending'; end if;
  if p_hide then update public.document set is_published = false where id = report.document_id; end if;
  update public.document_reports set status = 'reviewed' where id = p_id;
end;
$$;
revoke all on function public.resolve_document_report(uuid,boolean) from public;
grant execute on function public.resolve_document_report(uuid,boolean) to authenticated;
