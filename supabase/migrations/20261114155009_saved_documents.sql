create table public.saved_documents (
  user_id uuid not null references auth.users(id) on delete cascade,
  document_id bigint not null references public.document(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, document_id)
);

create index saved_documents_document_id_idx on public.saved_documents (document_id);
alter table public.saved_documents enable row level security;
revoke all on public.saved_documents from public, anon, authenticated;
grant select, insert, delete on public.saved_documents to authenticated;

create policy saved_documents_select_own on public.saved_documents for select to authenticated
  using ((select auth.uid()) = user_id);
create policy saved_documents_insert_own on public.saved_documents for insert to authenticated
  with check ((select auth.uid()) = user_id and exists (
    select 1 from public.document d where d.id = document_id and d.is_published
  ));
create policy saved_documents_delete_own on public.saved_documents for delete to authenticated
  using ((select auth.uid()) = user_id);
