alter policy contribution_select on public.contributions using (
  user_id = (select auth.uid()) or (select auth.jwt())->'app_metadata'->>'learnspace_role' = 'admin'
);
alter policy contribution_insert on public.contributions with check (
  user_id = (select auth.uid()) and coalesce((select auth.jwt())->>'is_anonymous','false') <> 'true' and status = 'uploading'
);
drop policy contribution_submit on public.contributions;
drop policy contribution_admin_update on public.contributions;
create policy contribution_update on public.contributions for update to authenticated
  using ((select auth.jwt())->'app_metadata'->>'learnspace_role' = 'admin' or (user_id = (select auth.uid()) and status = 'uploading'))
  with check ((select auth.jwt())->'app_metadata'->>'learnspace_role' = 'admin' or (
    user_id = (select auth.uid()) and status = 'pending' and review_note is null and document_id is null
    and reviewed_by is null and reviewed_at is null and (select private.contribution_file_ready(contributions.id))
  ));

drop policy document_published_read on public.document;
drop policy document_admin_select on public.document;
create policy document_public_read on public.document for select to anon using (is_published);
create policy document_authenticated_read on public.document for select to authenticated
  using (is_published or (select auth.jwt())->'app_metadata'->>'learnspace_role' = 'admin');
alter policy document_admin_insert on public.document with check (
  (select auth.jwt())->'app_metadata'->>'learnspace_role' = 'admin' and is_published
);
alter policy document_admin_update on public.document
  using ((select auth.jwt())->'app_metadata'->>'learnspace_role' = 'admin')
  with check ((select auth.jwt())->'app_metadata'->>'learnspace_role' = 'admin');

alter policy reports_select on public.document_reports using (
  reporter_id = (select auth.uid()) or (select auth.jwt())->'app_metadata'->>'learnspace_role' = 'admin'
);
alter policy reports_insert on public.document_reports with check (
  reporter_id = (select auth.uid()) and coalesce((select auth.jwt())->>'is_anonymous','false') <> 'true' and status = 'pending'
  and exists (select 1 from public.document d where d.id = document_id and d.is_published)
);
alter policy reports_admin_update on public.document_reports
  using ((select auth.jwt())->'app_metadata'->>'learnspace_role' = 'admin')
  with check ((select auth.jwt())->'app_metadata'->>'learnspace_role' = 'admin');

alter policy document_file_read on storage.objects using (
  (select auth.uid()) is not null and coalesce((select auth.jwt())->>'is_anonymous','false') <> 'true' and (
    exists (select 1 from public.document d where d.is_published and d.storage_bucket = storage.objects.bucket_id and d.file_path = storage.objects.name)
    or (bucket_id = 'contributions' and exists (select 1 from public.contributions c where c.file_path = storage.objects.name
      and (c.user_id = (select auth.uid()) or (select auth.jwt())->'app_metadata'->>'learnspace_role' = 'admin')))
  )
);
