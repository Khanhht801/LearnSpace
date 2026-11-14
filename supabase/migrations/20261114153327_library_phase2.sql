-- Existing rows were already public; preserve their visibility. New rows are drafts.
create extension if not exists unaccent with schema extensions;

alter table public.document
  add column is_published boolean not null default false,
  add column author text,
  add column source text,
  add column usage_note text,
  add column updated_at timestamptz not null default now();
update public.document set is_published = true;

create index document_category_published_idx on public.document (category_id, created_at desc, id desc) where is_published;

drop policy if exists document_public_read on public.document;
create policy document_published_read on public.document for select to anon, authenticated using (is_published);

-- Public catalog excludes the storage path and detailed source information.
revoke all on public.document from public, anon, authenticated;
grant select (id, category_id, title, slug, description, thumbnail_url, file_type, created_at, is_published)
  on public.document to anon;
grant select on public.document to authenticated;

insert into storage.buckets (id, name, public) values ('documents', 'documents', false);
create policy documents_published_read on storage.objects for select to authenticated
using (
  bucket_id = 'documents'
  and (select auth.uid()) is not null
  and coalesce((select auth.jwt()->>'is_anonymous'), 'false') <> 'true'
  and exists (select 1 from public.document d where d.is_published and d.file_path = storage.objects.name)
);

-- SECURITY INVOKER retains both table permissions and row-level policies.
create function public.search_documents(p_keyword text default '', p_category bigint default null, p_sort text default 'newest')
returns table (id bigint, category_id bigint, title text, slug text, description text, thumbnail_url text, file_type text, created_at timestamptz)
language sql stable security invoker set search_path = ''
as $$
  select d.id, d.category_id, d.title, d.slug, d.description, d.thumbnail_url, d.file_type, d.created_at
  from public.document d
  where d.is_published
    and (p_category is null or d.category_id = p_category)
    and (coalesce(trim(p_keyword), '') = '' or strpos(
      replace(lower(extensions.unaccent(coalesce(d.title, '') || ' ' || coalesce(d.description, ''))), 'đ', 'd'),
      replace(lower(extensions.unaccent(trim(p_keyword))), 'đ', 'd')
    ) > 0)
  order by case when p_sort = 'title' then d.title end asc,
           case when p_sort <> 'title' then d.created_at end desc, d.id desc;
$$;
revoke all on function public.search_documents(text, bigint, text) from public;
grant execute on function public.search_documents(text, bigint, text) to anon, authenticated;
