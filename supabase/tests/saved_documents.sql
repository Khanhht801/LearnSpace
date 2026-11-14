-- Uses two existing accounts but never changes their data: the inner block rolls back.
do $$
declare
  user_a uuid; user_b uuid; category bigint; published_id bigint; draft_id bigint; n integer;
begin
  begin
    select id into user_a from auth.users order by id limit 1;
    select id into user_b from auth.users where id <> user_a order by id limit 1;
    select id into category from public.categories limit 1;
    if user_a is null or user_b is null or category is null then raise exception 'Test requires two accounts and one category'; end if;
    insert into public.document(category_id,title,slug,file_path,is_published) values
      (category,'Saved test published','phase3-test-published','phase3-test/published.pdf',true)
      returning id into published_id;
    insert into public.document(category_id,title,slug,file_path,is_published) values
      (category,'Saved test draft','phase3-test-draft','phase3-test/draft.pdf',false)
      returning id into draft_id;
    perform set_config('request.jwt.claims', json_build_object('sub',user_a,'role','authenticated')::text, true);
    execute 'set local role authenticated';
    insert into public.saved_documents(user_id,document_id) values (user_a,published_id);
    insert into public.saved_documents(user_id,document_id) values (user_a,published_id) on conflict (user_id,document_id) do nothing;
    select count(*) into n from public.saved_documents where document_id=published_id;
    if n <> 1 then raise exception 'Saving the same document should be idempotent'; end if;
    begin
      insert into public.saved_documents(user_id,document_id) values (user_b,published_id);
      raise exception 'A user could save for another user';
    exception when insufficient_privilege then null; end;
    begin
      insert into public.saved_documents(user_id,document_id) values (user_a,draft_id);
      raise exception 'A draft could be saved';
    exception when insufficient_privilege then null; end;
    perform set_config('request.jwt.claims', json_build_object('sub',user_b,'role','authenticated')::text, true);
    select count(*) into n from public.saved_documents where document_id=published_id;
    if n <> 0 then raise exception 'Another user can see saved documents'; end if;
    delete from public.saved_documents where user_id=user_a and document_id=published_id;
    get diagnostics n = row_count;
    if n <> 0 then raise exception 'Another user can delete saved documents'; end if;
    execute 'set local role anon';
    begin
      perform * from public.saved_documents limit 1;
      raise exception 'Public role can read saved documents';
    exception when insufficient_privilege then null; end;
    raise exception using errcode='ZX001', message='Rollback test fixtures';
  exception when sqlstate 'ZX001' then null;
  end;
end;
$$;
