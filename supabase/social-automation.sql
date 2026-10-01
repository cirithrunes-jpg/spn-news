-- Social automation is isolated from the editorial publishing settings.
create table public.spn_social_settings(id boolean primary key default true check(id), enabled boolean not null default false, enabled_at timestamptz);
insert into public.spn_social_settings(id) values(true);
create table public.spn_social_queue(
 id uuid primary key default gen_random_uuid(), slug text not null unique references public.spn_publications(slug),
 caption text not null check(char_length(caption) between 1 and 2200), image_url text not null,
 state text not null default 'queued' check(state in ('queued','processing','published','failed','uncertain','cancelled')),
 created_at timestamptz not null default now(), published_at timestamptz, container_id text, media_id text, error text
);
alter table public.spn_social_settings enable row level security;
alter table public.spn_social_queue enable row level security;
revoke all on public.spn_social_settings,public.spn_social_queue from public,anon,authenticated;
grant select,insert,update on public.spn_social_settings,public.spn_social_queue to authenticated,service_role;
create policy spn_social_settings_admin on public.spn_social_settings for all to authenticated
using((select (auth.jwt()->>'is_anonymous')::boolean) is false and exists(select 1 from public.spn_members where user_id=(select auth.uid()) and role='admin'))
with check((select (auth.jwt()->>'is_anonymous')::boolean) is false and exists(select 1 from public.spn_members where user_id=(select auth.uid()) and role='admin'));
create policy spn_social_queue_admin on public.spn_social_queue for all to authenticated
using((select (auth.jwt()->>'is_anonymous')::boolean) is false and exists(select 1 from public.spn_members where user_id=(select auth.uid()) and role='admin'))
with check((select (auth.jwt()->>'is_anonymous')::boolean) is false and exists(select 1 from public.spn_members where user_id=(select auth.uid()) and role='admin'));
create index spn_social_queue_pending on public.spn_social_queue(created_at) where state='queued';
