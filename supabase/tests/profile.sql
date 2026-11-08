-- Run after the migration, inside a transaction that is always rolled back.
select set_config('test.profile_user_one', gen_random_uuid()::text, true);
select set_config('test.profile_user_two', gen_random_uuid()::text, true);

insert into auth.users (id, email, raw_user_meta_data)
values
  (current_setting('test.profile_user_one')::uuid, current_setting('test.profile_user_one') || '@example.invalid', '{"full_name":"  Profile Test  "}'),
  (current_setting('test.profile_user_two')::uuid, current_setting('test.profile_user_two') || '@example.invalid', '{}');

do $$
begin
  if not exists (select 1 from public.profile where id = current_setting('test.profile_user_one')::uuid and display_name = 'Profile Test') then
    raise exception 'Signup did not create the named profile';
  end if;
  if not exists (select 1 from public.profile where id = current_setting('test.profile_user_two')::uuid and display_name = '') then
    raise exception 'Signup without metadata failed';
  end if;
  if exists (select 1 from auth.users u left join public.profile p on p.id = u.id where p.id is null) then
    raise exception 'An existing account is missing its profile';
  end if;
  if has_table_privilege('anon', 'public.profile', 'SELECT') then
    raise exception 'Anonymous role can read profiles';
  end if;
  if has_function_privilege('authenticated', 'private.create_auth_user_profile()', 'EXECUTE') then
    raise exception 'Trigger function is directly executable';
  end if;
end;
$$;

select set_config('request.jwt.claim.sub', current_setting('test.profile_user_one'), true);
set local role authenticated;
do $$
declare affected integer;
begin
  if (select count(*) from public.profile) <> 1 then
    raise exception 'RLS must expose exactly the signed-in profile';
  end if;
  update public.profile set display_name = 'Updated Name' where id = current_setting('test.profile_user_one')::uuid;
  get diagnostics affected = row_count;
  if affected <> 1 then raise exception 'Own profile cannot be updated'; end if;

  update public.profile set display_name = 'Not Allowed' where id = current_setting('test.profile_user_two')::uuid;
  get diagnostics affected = row_count;
  if affected <> 0 then raise exception 'Another profile was updated'; end if;
  if has_column_privilege('authenticated', 'public.profile', 'id', 'UPDATE') then
    raise exception 'Profile ownership can be reassigned';
  end if;
end;
$$;
reset role;

delete from auth.users where id = current_setting('test.profile_user_two')::uuid;
do $$
begin
  if exists (select 1 from public.profile where id = current_setting('test.profile_user_two')::uuid) then
    raise exception 'Deleting an account did not cascade to its profile';
  end if;
end;
$$;
