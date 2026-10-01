'use server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { requireEditor,getDraft } from '@/lib/redacao';
import { parseDraft,checkPublishable } from '@/lib/editorial-validation';
import { getEditor } from '../../../../editorial-config/editors';
export type SaveResult={message:string};
function revision(form:FormData){const v=Number(form.get('revision'));if(!Number.isSafeInteger(v)||v<1)throw new Error('Reabra a matéria antes de salvar.');return v;}
export async function saveDraft(_previous:SaveResult,form:FormData):Promise<SaveResult>{
 const{client}=await requireEditor();let id=String(form.get('id')??''),item;
 try{item=parseDraft(form);}catch(e){return{message:e instanceof Error?e.message:'Confira os campos.'};}
 if(id){const current=await getDraft(id);if(!current)return{message:'Matéria não encontrada.'};let version;try{version=revision(form);}catch{return{message:'Reabra a matéria.'};}
 const originalSources=current.content.sources??[current.content.source];
 if(originalSources.map(s=>s.name+' | '+s.url+(s.date?' | '+s.date:'')).join('\n')===String(form.get('sources')??'').trim()){item.sources=originalSources;item.source=originalSources[0];}
 if([...(current.content.body??[]),...(current.content.sections??[]).flatMap(s=>['## '+s.title,...s.paragraphs])].join('\n\n')===String(form.get('body')??'').trim()){item.body=current.content.body;item.sections=current.content.sections;}
 if(item.photo&&item.photo.path===current.content.photo?.path){item.photo.width=current.content.photo.width;item.photo.height=current.content.photo.height;}
 if(item.slug!==current.slug)return{message:'O endereço da matéria salva não pode ser alterado.'};
 const{data,error}=await client.from('spn_drafts').update({content:item,state:'draft'}).eq('id',id).eq('revision',version).select('id').maybeSingle();
 if(error)return{message:'Não foi possível salvar.'};if(!data)return{message:'Outra alteração foi salva. Reabra a matéria para evitar perder conteúdo.'};
 }else{const{data,error}=await client.from('spn_drafts').insert({slug:item.slug,content:item,state:'draft'}).select('id').single();if(error)return{message:error.code==='23505'?'Esse endereço já existe. Escolha outro.':'Não foi possível salvar.'};id=data.id;}
 revalidatePath('/admin');redirect('/admin/materias/'+id+'?salvo=1');
}
export async function transition(_previous:SaveResult,form:FormData):Promise<SaveResult>{
 const{client}=await requireEditor(),id=String(form.get('id')??''),current=await getDraft(id);if(!current)return{message:'Matéria não encontrada.'};
 let expected;try{expected=revision(form);}catch{return{message:'Reabra a matéria.'};}if(current.revision!==expected)return{message:'A matéria mudou. Reabra antes de continuar.'};
 const target=String(form.get('target')??'');let error;
 if(target==='published'){try{checkPublishable(current.content);}catch(e){return{message:e instanceof Error?e.message:'Revise a matéria.'};}if(current.state!=='approved')return{message:'A matéria precisa estar aprovada.'};({error}=await client.rpc('spn_publish',{draft_id:id,expected_revision:expected}));}
 else if(target==='withdrawn'){({error}=await client.rpc('spn_withdraw',{draft_id:id,expected_revision:expected}));}
 else{const allowed=(target==='in_review'&&current.state==='draft')||(target==='approved'&&current.state==='in_review')||(target==='draft'&&['in_review','approved'].includes(current.state));if(!allowed)return{message:'Essa mudança não está disponível neste estágio.'};
 if(target==='approved'){try{checkPublishable(current.content);}catch(e){return{message:e instanceof Error?e.message:'Revise a matéria.'};}}
 const result=await client.from('spn_drafts').update({state:target}).eq('id',id).eq('revision',expected).select('id').maybeSingle();error=result.error;if(!error&&!result.data)return{message:'A matéria foi alterada. Reabra antes de continuar.'};}
 if(error)return{message:'Não foi possível concluir. Reabra a matéria e tente novamente.'};
 revalidatePath('/','layout');redirect('/admin/materias/'+id+'?salvo=1');
}
export async function saveSlot(form:FormData){
 const{client}=await requireEditor(),day=Number(form.get('day')),subject=String(form.get('subject')??'').trim(),editorId=String(form.get('editorId')??''),kind=String(form.get('kind')??''),count=Number(form.get('count'));
 if(!Number.isInteger(day)||day<1||day>31||subject.length<5||subject.length>1000||!getEditor(editorId as Parameters<typeof getEditor>[0])||!['news','guide','feature','opinion','data'].includes(kind)||!Number.isInteger(count)||count<1||count>10)throw new Error('Confira os campos do calendário.');
 const{error}=await client.from('spn_schedule').upsert({day,subject,editor_id:editorId,kind,article_count:count});if(error)throw new Error('Não foi possível salvar a pauta.');
 revalidatePath('/admin/calendario');redirect('/admin/calendario?salvo=1');
}

