'use server';
import { requireEditor } from '@/lib/redacao';
import { instagramConfigured,verifyInstagramAccount } from '@/lib/instagram';
import { socialCaption,socialImage } from '@/lib/social-content';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import type { NewsItem } from '@/lib/news';
export async function toggleSocial(form:FormData){
 const {client}=await requireEditor();const enabled=form.get('enabled')==='true';
 if(enabled){if(!instagramConfigured())redirect('/admin/redes-sociais?aviso=conexao');try{await verifyInstagramAccount();}catch{redirect('/admin/redes-sociais?aviso=conta');}}
 const {error}=await client.from('spn_social_settings').update({enabled,...(enabled?{enabled_at:new Date().toISOString()}:{})}).eq('id',true);
 if(error)throw new Error('Não foi possível atualizar a automação.');
 revalidatePath('/admin/redes-sociais');
}
export async function queueSocial(form:FormData){
 const {client}=await requireEditor(),slug=String(form.get('slug')??'');
 const {data,error}=await client.from('spn_publications').select('content,withdrawn').eq('slug',slug).single();
 if(error||data.withdrawn)redirect('/admin/redes-sociais?aviso=materia');
 let image:string;try{image=socialImage(data.content as NewsItem);}catch{redirect('/admin/redes-sociais?aviso=imagem');}
 const caption=String(form.get('caption')??'').trim()||socialCaption(data.content as NewsItem);
 if(caption.length>2200)redirect('/admin/redes-sociais?aviso=legenda');
 const result=await client.from('spn_social_queue').insert({slug,caption,image_url:image});
 if(result.error)redirect('/admin/redes-sociais?aviso=duplicada');
 revalidatePath('/admin/redes-sociais');redirect('/admin/redes-sociais?aviso=salvo');
}
export async function cancelSocial(form:FormData){
 const {client}=await requireEditor();const {error}=await client.from('spn_social_queue').update({state:'cancelled'}).eq('id',String(form.get('id'))).eq('state','queued');
 if(error)throw new Error('Não foi possível cancelar.');revalidatePath('/admin/redes-sociais');
}
