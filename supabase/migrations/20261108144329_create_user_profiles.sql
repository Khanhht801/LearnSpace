-- public.profile already belongs to the application's schema.
-- Auth creates the profile in the same transaction as the new account,
-- including accounts that have not confirmed their email yet.
create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

alter table public.profile enable row level security;
grant select on public.profile to authenticated;
grant update (display_name, avatar_url) on public.profile to authenticated;

create function private.create_auth_user_profile()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  -- Only an auth.users INSERT trigger may call this privileged function.
  -- auth.uid() is null during email signup, so ownership comes from NEW.id.
  if tg_op <> 'INSERT' or tg_table_schema <> 'auth' or tg_table_name <> 'users' then
    raise exception 'Invalid profile trigger context';
  end if;

  insert into public.profile (id, display_name)
  values (
    new.id,
    coalesce(nullif(btrim(new.raw_user_meta_data ->> 'full_name'), ''), '')
  );
  return new;
end;
$$;

revoke all on function private.create_auth_user_profile() from public, anon, authenticated, service_role;

create trigger learnspace_create_auth_user_profile
after insert on auth.users
for each row execute function private.create_auth_user_profile();

-- Preserve any profile the user has already edited.
insert into public.profile (id, display_name, created_at)
select id, coalesce(nullif(btrim(raw_user_meta_data ->> 'full_name'), ''), ''), created_at
from auth.users
on conflict (id) do nothing;
