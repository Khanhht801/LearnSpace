-- The nested block rolls back all fixtures and role changes.
do $$
declare a uuid; b uuid; other_user uuid; category bigint; cid uuid := gen_random_uuid(); cid_reject uuid := gen_random_uuid(); file_name text; doc_id bigint; report_id uuid; n int; stage text := 'setup';
begin
  begin
    select id into a from auth.users order by id limit 1;
    select id into b from auth.users where id <> a order by id limit 1;
    select id into other_user from auth.users where id not in (a,b) order by id limit 1;
    select id into category from public.categories limit 1;
    if a is null or b is null or other_user is null or category is null then raise exception 'Three accounts and one category are required'; end if;
    file_name := a::text || '/' || cid::text || '.pdf';
    perform set_config('request.jwt.claims', json_build_object('sub',a,'role','authenticated')::text, true);
    execute 'set local role authenticated';
    insert into public.contributions(id,category_id,title,description,author,source,usage_note,rights_confirmed,file_path)
    values(cid,category,'Test contribution','Detailed description for this temporary test','Author','Original','For learning',true,file_name);
    begin
      update public.contributions set title='Forged' where id=cid;
      raise exception 'Contributor changed immutable fields';
    exception when insufficient_privilege then null; end;
    begin
      update public.contributions set status='pending' where id=cid;
      raise exception 'Submission without file was accepted';
    exception when insufficient_privilege then null; end;
    insert into storage.objects(bucket_id,name) values('contributions',file_name);
    update public.contributions set status='pending' where id=cid;
    perform set_config('request.jwt.claims', json_build_object('sub',a,'role','authenticated','user_metadata',json_build_object('learnspace_role','admin'))::text, true);
    begin
      perform public.review_contribution(cid,'approve',null);
      raise exception 'User metadata granted admin rights';
    exception when insufficient_privilege then null; end;
    begin
      update public.contributions set status='approved' where id=cid;
      if found then raise exception 'Contributor approved their own file'; end if;
    exception when insufficient_privilege then null; end;
    begin
      perform public.review_contribution(cid,'approve',null);
      raise exception 'Contributor invoked review';
    exception when insufficient_privilege then null; end;
    perform set_config('request.jwt.claims', json_build_object('sub',other_user,'role','authenticated')::text, true);
    select count(*) into n from public.contributions where id=cid;
    if n <> 0 then raise exception 'Another user sees private submission'; end if;
    select count(*) into n from storage.objects where bucket_id='contributions' and name=file_name;
    if n <> 0 then raise exception 'Another user sees pending file'; end if;
    perform set_config('request.jwt.claims', json_build_object('sub',a,'role','authenticated')::text, true);
    insert into public.contributions(id,category_id,title,description,author,source,usage_note,rights_confirmed,file_path)
    values(cid_reject,category,'Rejected contribution','Detailed description for rejected fixture','Author','Original','For learning',true,a::text || '/' || cid_reject::text || '.pdf');
    insert into storage.objects(bucket_id,name) values('contributions',a::text || '/' || cid_reject::text || '.pdf');
    update public.contributions set status='pending' where id=cid_reject;
    perform set_config('request.jwt.claims', json_build_object('sub',b,'role','authenticated','app_metadata',json_build_object('learnspace_role','admin'))::text, true);
    perform public.review_contribution(cid_reject,'reject','Không đủ nguồn');
    perform set_config('request.jwt.claims', json_build_object('sub',a,'role','authenticated')::text, true);
    select count(*) into n from public.contributions where id=cid_reject and status='rejected' and review_note='Không đủ nguồn';
    if n <> 1 then raise exception 'Rejection or feedback not visible to owner'; end if;
    perform set_config('request.jwt.claims', json_build_object('sub',b,'role','authenticated','app_metadata',json_build_object('learnspace_role','admin'))::text, true);
    stage := 'approve';
    select public.review_contribution(cid,'approve',null) into doc_id;
    if doc_id is null then raise exception 'Approval failed'; end if;
    perform set_config('request.jwt.claims', json_build_object('sub',other_user,'role','authenticated')::text, true);
    select count(*) into n from storage.objects where bucket_id='contributions' and name=file_name;
    if n <> 1 then raise exception 'Published file not accessible'; end if;
    insert into public.document_reports(document_id,reason) values(doc_id,'A valid report reason') returning id into report_id;
    begin
      perform public.resolve_document_report(report_id,true);
      raise exception 'Reporter invoked admin resolution';
    exception when insufficient_privilege then null; end;
    perform set_config('request.jwt.claims', json_build_object('sub',b,'role','authenticated','app_metadata',json_build_object('learnspace_role','admin'))::text, true);
    stage := 'resolve report';
    perform public.resolve_document_report(report_id,true);
    perform set_config('request.jwt.claims', json_build_object('sub',other_user,'role','authenticated')::text, true);
    select count(*) into n from public.document where id=doc_id;
    if n <> 0 then raise exception 'Reported document remains published'; end if;
    select count(*) into n from storage.objects where bucket_id='contributions' and name=file_name;
    if n <> 0 then raise exception 'Hidden document remains accessible'; end if;
    execute 'set local role anon';
    begin perform * from public.contributions limit 1; raise exception 'Guest sees submissions'; exception when insufficient_privilege then null; end;
    raise exception using errcode='ZX001', message='Rollback fixtures';
  exception when sqlstate 'ZX001' then null;
    when others then raise exception 'Test stage %: %', stage, sqlerrm;
  end;
end;
$$;
