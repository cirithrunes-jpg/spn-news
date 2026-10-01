begin;
create temporary table spn_qa_ids as select id as user_id,gen_random_uuid() as draft_id,'spn-qa-'||replace(gen_random_uuid()::text,'-','') as slug from auth.users where coalesce(is_anonymous,false)=false limit 1;
insert into public.spn_members(user_id,role) select user_id,'admin' from spn_qa_ids on conflict(user_id) do nothing;
select set_config('request.jwt.claims',jsonb_build_object('sub',(select user_id from spn_qa_ids),'role','authenticated','is_anonymous',false)::text,true);
grant select on spn_qa_ids to authenticated;
set local role authenticated;
do $$
declare uid uuid; sid uuid; address text; version integer; snapshot text;
begin
 select user_id,draft_id,slug into uid,sid,address from spn_qa_ids;
 if (select count(*) from public.spn_schedule)<>30 then raise exception 'Calendar inaccessible'; end if;
 insert into public.spn_drafts(id,slug,content) values(sid,address,jsonb_build_object('slug',address,'title','QA private editorial article','body',jsonb_build_array('Private QA content'),'source',jsonb_build_object('url','https://supabase.com/docs'),'photo',jsonb_build_object('path','/news/qa.jpg')));
 begin perform public.spn_publish(sid,1); raise exception 'Unapproved publication accepted'; exception when raise_exception then if sqlerrm='Unapproved publication accepted' then raise; end if; end;
 update public.spn_drafts set state='approved' where id=sid;
 select revision into version from public.spn_drafts where id=sid;
 perform public.spn_publish(sid,version);
 select content->>'title' into snapshot from public.spn_publications where slug=address;
 if snapshot<>'QA private editorial article' then raise exception 'Publication snapshot missing'; end if;
 update public.spn_drafts set state='draft',content=jsonb_set(content,'{title}','"Private changed title"'::jsonb) where id=sid;
 if (select content->>'title' from public.spn_publications where slug=address)<>snapshot then raise exception 'Draft change leaked'; end if;
 select revision into version from public.spn_drafts where id=sid;
 begin perform public.spn_withdraw(sid,version-1);raise exception 'Stale revision accepted';exception when raise_exception then if sqlerrm='Stale revision accepted' then raise;end if;end;
 perform public.spn_withdraw(sid,version);
 if not exists(select 1 from public.spn_publications where slug=address and withdrawn and content is null) then raise exception 'Withdrawal failed';end if;
end; $$;
reset role;
select set_config('request.jwt.claims',jsonb_build_object('sub',gen_random_uuid(),'role','authenticated','is_anonymous',false)::text,true);
set local role authenticated;
do $$ begin
 if exists(select 1 from public.spn_drafts) or exists(select 1 from public.spn_schedule) or exists(select 1 from public.spn_members) or exists(select 1 from public.spn_audit) then raise exception 'Nonmember data leak';end if;
 begin insert into public.spn_drafts(slug,content) values('qa-forbidden','{}');raise exception 'Nonmember write allowed';exception when insufficient_privilege then null;end;
 if has_table_privilege(current_user,'public.spn_members','INSERT') then raise exception 'Self authorization allowed';end if;
end; $$;
reset role;
select set_config('request.jwt.claims',jsonb_build_object('sub',(select user_id from spn_qa_ids),'role','authenticated','is_anonymous',true)::text,true);
set local role authenticated;
do $$ begin if exists(select 1 from public.spn_drafts) or exists(select 1 from public.spn_members) then raise exception 'Anonymous identity allowed';end if;end;$$;
reset role;
set local role anon;
do $$ begin
 if has_table_privilege(current_user,'public.spn_drafts','SELECT') or has_function_privilege(current_user,'public.spn_publish(uuid,integer)','EXECUTE') then raise exception 'Anonymous privileges leak';end if;
 if (select count(*) from public.spn_publications where not withdrawn)<>31 then raise exception 'Public archive incomplete';end if;
end; $$;
reset role;
rollback;
select 'PASS: member isolation, anonymous denial, publication snapshot, approval gate, revision conflict, withdrawal; all QA changes rolled back' as result;
