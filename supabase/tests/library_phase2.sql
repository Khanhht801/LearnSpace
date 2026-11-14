-- All fixture rows and role changes are rolled back in the inner subtransaction.
do $$
declare
  test_category bigint;
  n integer;
begin
  begin
    select id into test_category from public.categories limit 1;
    if test_category is null then raise exception 'No category available for test'; end if;
    insert into public.document(category_id,title,slug,description,file_path,file_type,is_published)
    values (test_category,'Phase 2 published test','phase2-check-published','Test','phase2-check/published.pdf','pdf',true),
           (test_category,'Phase 2 draft test','phase2-check-draft','Test','phase2-check/draft.pdf','pdf',false);
    insert into storage.objects (bucket_id,name) values ('documents','phase2-check/published.pdf'),('documents','phase2-check/draft.pdf');

    perform set_config('request.jwt.claims', '{"sub":"00000000-0000-4000-8000-000000000001","role":"authenticated"}', true);
    execute 'set local role authenticated';
    select count(*) into n from storage.objects where bucket_id='documents' and name like 'phase2-check/%';
    if n <> 1 then raise exception 'Authenticated storage policy returned % objects, expected 1', n; end if;
    select count(*) into n from public.document where slug in ('phase2-check-published','phase2-check-draft');
    if n <> 1 then raise exception 'Authenticated document policy returned % rows, expected 1', n; end if;
    perform set_config('request.jwt.claims', '{"sub":"00000000-0000-4000-8000-000000000001","role":"authenticated","is_anonymous":true}', true);
    select count(*) into n from storage.objects where bucket_id='documents' and name like 'phase2-check/%';
    if n <> 0 then raise exception 'Anonymous auth user can read files'; end if;

    execute 'set local role anon';
    select count(*) into n from public.search_documents('phase 2', null, 'newest') where slug in ('phase2-check-published','phase2-check-draft');
    if n <> 1 then raise exception 'Public search returned % rows, expected 1', n; end if;
    begin
      perform file_path from public.document limit 1;
      raise exception 'Public role can read file paths';
    exception when insufficient_privilege then null;
    end;
    select count(*) into n from storage.objects where bucket_id='documents' and name like 'phase2-check/%';
    if n <> 0 then raise exception 'Public role can read files'; end if;
    raise exception using errcode = 'ZX001', message = 'Rollback test fixtures';
  exception when sqlstate 'ZX001' then
    null;
  end;
end;
$$;
