import { timingSafeEqual } from 'node:crypto';
import { instagramConfigured,instagramRequest,socialWorkerClient,verifyInstagramAccount } from '@/lib/instagram';
import { socialCaption,socialImage } from '@/lib/social-content';
import type { NewsItem } from '@/lib/news';
export const runtime='nodejs';
export const dynamic='force-dynamic';
export const maxDuration=60;
export async function GET(request:Request){
 const secret=process.env.CRON_SECRET,provided=request.headers.get('authorization')??'';
 const expected=`Bearer ${secret??''}`;
 if(!secret||Buffer.byteLength(provided)!==Buffer.byteLength(expected)||!timingSafeEqual(Buffer.from(provided),Buffer.from(expected)))return Response.json({error:'Não autorizado.'},{status:401});
 if(!instagramConfigured())return Response.json({error:'Integração pendente.'},{status:503});
 const client=socialWorkerClient();
 const {data:settings,error:settingsError}=await client.from('spn_social_settings').select('*').eq('id',true).single();
 if(settingsError)return Response.json({error:'Configuração indisponível.'},{status:503});
 if(!settings.enabled)return Response.json({status:'paused'});
 try{await verifyInstagramAccount();}catch{return Response.json({error:'Confira a autorização da conta.'},{status:503});}
 const {data:recent,error:recentError}=await client.from('spn_publications').select('slug,content').eq('withdrawn',false).gte('published_at',settings.enabled_at).order('published_at').limit(100);
 if(recentError)return Response.json({error:'Matérias indisponíveis.'},{status:503});
 for(const row of recent??[]){
  let image_url;try{image_url=socialImage(row.content as NewsItem);}catch{image_url='';}
  const {error}=await client.from('spn_social_queue').upsert({slug:row.slug,caption:socialCaption(row.content as NewsItem),image_url,state:image_url?'queued':'failed',error:image_url?null:'Prepare uma imagem JPEG pública antes de enviar.'},{onConflict:'slug',ignoreDuplicates:true});
  if(error)return Response.json({error:'Fila indisponível.'},{status:503});
 }
 const {data:pending,error}=await client.from('spn_social_queue').select('*').eq('state','queued').order('created_at').limit(1);
 if(error)return Response.json({error:'Fila indisponível.'},{status:503});
 const job=pending?.[0];if(!job)return Response.json({status:'empty'});
 const {data:claim,error:claimError}=await client.from('spn_social_queue').update({state:'processing',error:null}).eq('id',job.id).eq('state','queued').select('id').maybeSingle();
 if(claimError)return Response.json({error:'Não foi possível reservar o envio.'},{status:503});
 if(!claim)return Response.json({status:'already_claimed'});
 let publishing=false;
 async function record(values:Record<string,unknown>){const {error}=await client.from('spn_social_queue').update(values).eq('id',job.id).eq('state','processing');if(error)throw new Error('Não foi possível registrar o envio. Confira o Instagram antes de repetir.');}
 try{
  const {data:article,error}=await client.from('spn_publications').select('content,withdrawn').eq('slug',job.slug).single();
  if(error)throw new Error('Não foi possível conferir a reportagem.');
  if(article.withdrawn){await record({state:'cancelled',error:'Matéria retirada do site.'});return Response.json({status:'cancelled'});}
  if(socialImage(article.content as NewsItem)!==job.image_url)throw new Error('A imagem da matéria mudou. Revise o envio.');
  const account=process.env.INSTAGRAM_USER_ID!;
  const created=await instagramRequest(`${account}/media`,{image_url:job.image_url,caption:job.caption},'POST');
  if(!created.id)throw new Error('A Meta não retornou a imagem preparada.');
  await record({container_id:created.id});
  let ready=false;
  for(let n=0;n<5;n++){
   const status=await instagramRequest(created.id,{fields:'status_code'});
   if(status.status_code==='FINISHED'){ready=true;break;}
   if(['ERROR','EXPIRED'].includes(status.status_code??''))throw new Error('A Meta recusou ou expirou a imagem. Confira formato e acesso público.');
   await new Promise(resolve=>setTimeout(resolve,1000));
  }
  if(!ready)throw new Error('A imagem ainda não está pronta. Confira o contêiner antes de reenviar.');
  // A lost response after this point must never trigger an automatic retry.
  publishing=true;
  const result=await instagramRequest(`${account}/media_publish`,{creation_id:created.id},'POST');
  if(!result.id)throw new Error('Confira o perfil: a Meta não confirmou o resultado.');
  await record({state:'published',media_id:result.id,published_at:new Date().toISOString()});
  return Response.json({status:'published'});
 }catch(e){
  const message=e instanceof Error?e.message:'Envio interrompido.';
  try{await record({state:publishing?'uncertain':'failed',error:message});}catch{ /* Keep processing: an administrator must reconcile it. */ }
  return Response.json({status:publishing?'uncertain':'failed'},{status:502});
 }
}
