-- SPN News: isolated tables for a shared Supabase project.
-- No service-role key is required by the website.
create schema if not exists spn_private;
revoke all on schema spn_private from public, anon, authenticated;
create table spn_private.invites(email text primary key, role text not null check(role='admin'));
create table public.spn_members(user_id uuid primary key references auth.users(id) on delete cascade, role text not null check(role='admin'));
alter table public.spn_members enable row level security;
grant select on public.spn_members to authenticated;
create policy spn_member_self on public.spn_members for select to authenticated using(user_id=(select auth.uid()));
create function spn_private.accept_invite() returns trigger language plpgsql security definer set search_path='' as $$
begin
  if new.email_confirmed_at is not null and coalesce(new.is_anonymous,false)=false then
    insert into public.spn_members(user_id,role)
    select new.id,i.role from spn_private.invites i where lower(i.email)=lower(new.email)
    on conflict(user_id) do nothing;
  end if;
  return new;
end; $$;
revoke all on function spn_private.accept_invite() from public,anon,authenticated;
create trigger spn_accept_invite after insert or update of email_confirmed_at,email on auth.users for each row execute function spn_private.accept_invite();

create table public.spn_drafts(
 id uuid primary key default gen_random_uuid(), slug text unique not null check(slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
 content jsonb not null check(jsonb_typeof(content)='object'),
 state text not null default 'draft' check(state in ('draft','in_review','approved','published')),
 revision integer not null default 1, updated_at timestamptz not null default now(),
 published_at timestamptz, updated_by uuid references auth.users(id)
);
create table public.spn_publications(
 slug text primary key, content jsonb, published_at timestamptz not null,
 modified_at timestamptz not null default now(), withdrawn boolean not null default false,
 check((withdrawn and content is null) or (not withdrawn and jsonb_typeof(content)='object'))
);
create table public.spn_schedule(
 day integer primary key check(day between 1 and 31), subject text not null,
 editor_id text not null check(editor_id in ('fernando-valerious','ruby-dias','adailton-jr')),
 kind text not null check(kind in ('news','feature','guide','opinion','data')),
 article_count integer not null default 1 check(article_count between 1 and 10)
);
create table public.spn_settings(
 id boolean primary key default true check(id), preparation_time time not null default '09:00',
 time_zone text not null default 'America/Sao_Paulo' check(time_zone='America/Sao_Paulo'),
 automatic_publication boolean not null default false check(automatic_publication=false),
 pipeline_status text not null default 'not_connected' check(pipeline_status in ('not_connected','connected','paused'))
);
insert into public.spn_settings(id) values(true);
create table public.spn_audit(id bigint generated always as identity primary key, draft_id uuid, actor uuid, event text not null, occurred_at timestamptz not null default now());
alter table public.spn_drafts enable row level security;
alter table public.spn_publications enable row level security;
alter table public.spn_schedule enable row level security;
alter table public.spn_settings enable row level security;
alter table public.spn_audit enable row level security;
grant select,insert,update,delete on public.spn_drafts to authenticated;
grant select,insert,update on public.spn_publications,public.spn_schedule,public.spn_settings to authenticated;
grant select on public.spn_publications to anon;
grant select on public.spn_audit to authenticated;
create policy spn_draft_admin on public.spn_drafts for all to authenticated
using(exists(select 1 from public.spn_members where user_id=(select auth.uid()) and role='admin'))
with check(exists(select 1 from public.spn_members where user_id=(select auth.uid()) and role='admin'));
create policy spn_public_read on public.spn_publications for select to anon,authenticated using(true);
create policy spn_public_admin_insert on public.spn_publications for insert to authenticated with check(exists(select 1 from public.spn_members where user_id=(select auth.uid()) and role='admin'));
create policy spn_public_admin_update on public.spn_publications for update to authenticated using(exists(select 1 from public.spn_members where user_id=(select auth.uid()) and role='admin')) with check(exists(select 1 from public.spn_members where user_id=(select auth.uid()) and role='admin'));
create policy spn_schedule_admin on public.spn_schedule for all to authenticated using(exists(select 1 from public.spn_members where user_id=(select auth.uid()) and role='admin')) with check(exists(select 1 from public.spn_members where user_id=(select auth.uid()) and role='admin'));
create policy spn_settings_admin on public.spn_settings for all to authenticated using(exists(select 1 from public.spn_members where user_id=(select auth.uid()) and role='admin')) with check(exists(select 1 from public.spn_members where user_id=(select auth.uid()) and role='admin'));
create policy spn_audit_admin on public.spn_audit for select to authenticated using(exists(select 1 from public.spn_members where user_id=(select auth.uid()) and role='admin'));

create function spn_private.revision_and_audit() returns trigger language plpgsql security definer set search_path='' as $$
begin
 new.updated_at=now(); new.updated_by=auth.uid();
 if tg_op='UPDATE' then
   new.revision=old.revision+1;
   if new.slug<>old.slug then raise exception 'O endereço da matéria não pode mudar'; end if;
 else new.revision=1; end if;
 insert into public.spn_audit(draft_id,actor,event) values(new.id,auth.uid(),case when tg_op='INSERT' then 'created' else 'updated:'||new.state end);
 return new;
end; $$;
revoke all on function spn_private.revision_and_audit() from public,anon,authenticated;
create trigger spn_revision before insert or update on public.spn_drafts for each row execute function spn_private.revision_and_audit();

create function public.spn_publish(draft_id uuid, expected_revision integer) returns void language plpgsql security invoker set search_path='' as $$
declare d public.spn_drafts;
begin
 select * into d from public.spn_drafts where id=draft_id for update;
 if d.id is null or d.revision<>expected_revision then raise exception 'A matéria foi alterada. Reabra antes de publicar.'; end if;
 if d.state<>'approved' then raise exception 'A matéria precisa estar aprovada.'; end if;
 if length(coalesce(d.content->>'title',''))<8 or jsonb_array_length(d.content->'body')<1 or coalesce(d.content->'source'->>'url','')='' or coalesce(d.content->'photo'->>'path','')='' then raise exception 'Revise texto, fonte e imagem antes de publicar.'; end if;
 insert into public.spn_publications(slug,content,published_at,modified_at,withdrawn)
 values(d.slug,d.content,coalesce(d.published_at,now()),now(),false)
 on conflict(slug) do update set content=excluded.content,modified_at=now(),withdrawn=false;
 update public.spn_drafts set state='published',published_at=coalesce(published_at,now()) where id=d.id;
end; $$;
create function public.spn_withdraw(draft_id uuid, expected_revision integer) returns void language plpgsql security invoker set search_path='' as $$
declare d public.spn_drafts;
begin
 select * into d from public.spn_drafts where id=draft_id for update;
 if d.id is null or d.revision<>expected_revision then raise exception 'A matéria foi alterada. Reabra antes de retirar.'; end if;
 insert into public.spn_publications(slug,content,published_at,withdrawn) values(d.slug,null,coalesce(d.published_at,now()),true)
 on conflict(slug) do update set content=null,withdrawn=true,modified_at=now();
 update public.spn_drafts set state='draft' where id=d.id;
end; $$;
revoke all on function public.spn_publish(uuid,integer),public.spn_withdraw(uuid,integer) from public,anon;
grant execute on function public.spn_publish(uuid,integer),public.spn_withdraw(uuid,integer) to authenticated;


alter policy spn_member_self on public.spn_members using(user_id=(select auth.uid()) and (select (auth.jwt()->>'is_anonymous')::boolean) is false);
alter policy spn_draft_admin on public.spn_drafts using((select (auth.jwt()->>'is_anonymous')::boolean) is false and exists(select 1 from public.spn_members where user_id=(select auth.uid()) and role='admin')) with check((select (auth.jwt()->>'is_anonymous')::boolean) is false and exists(select 1 from public.spn_members where user_id=(select auth.uid()) and role='admin'));
alter policy spn_schedule_admin on public.spn_schedule using((select (auth.jwt()->>'is_anonymous')::boolean) is false and exists(select 1 from public.spn_members where user_id=(select auth.uid()) and role='admin')) with check((select (auth.jwt()->>'is_anonymous')::boolean) is false and exists(select 1 from public.spn_members where user_id=(select auth.uid()) and role='admin'));
alter policy spn_settings_admin on public.spn_settings using((select (auth.jwt()->>'is_anonymous')::boolean) is false and exists(select 1 from public.spn_members where user_id=(select auth.uid()) and role='admin')) with check((select (auth.jwt()->>'is_anonymous')::boolean) is false and exists(select 1 from public.spn_members where user_id=(select auth.uid()) and role='admin'));
alter policy spn_public_admin_update on public.spn_publications using((select (auth.jwt()->>'is_anonymous')::boolean) is false and exists(select 1 from public.spn_members where user_id=(select auth.uid()) and role='admin')) with check((select (auth.jwt()->>'is_anonymous')::boolean) is false and exists(select 1 from public.spn_members where user_id=(select auth.uid()) and role='admin'));
alter policy spn_public_admin_insert on public.spn_publications with check((select (auth.jwt()->>'is_anonymous')::boolean) is false and exists(select 1 from public.spn_members where user_id=(select auth.uid()) and role='admin'));
alter policy spn_audit_admin on public.spn_audit using((select (auth.jwt()->>'is_anonymous')::boolean) is false and exists(select 1 from public.spn_members where user_id=(select auth.uid()) and role='admin'));
revoke all on public.spn_members,public.spn_drafts,public.spn_schedule,public.spn_settings,public.spn_audit,public.spn_publications from anon,authenticated;
grant select on public.spn_members,public.spn_audit to authenticated;
grant select,insert,update,delete on public.spn_drafts to authenticated;
grant select,insert,update on public.spn_publications,public.spn_schedule,public.spn_settings to authenticated;
grant select on public.spn_publications to anon;
