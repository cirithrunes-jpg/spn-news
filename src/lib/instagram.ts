import 'server-only';
import { createClient } from '@supabase/supabase-js';
export function instagramConfigured() {
 return Boolean(process.env.INSTAGRAM_ACCESS_TOKEN && /^\d+$/.test(process.env.INSTAGRAM_USER_ID ?? '') && /^v\d+\.0$/.test(process.env.INSTAGRAM_API_VERSION ?? '') && process.env.SUPABASE_SECRET_KEY && process.env.CRON_SECRET);
}
export function socialWorkerClient() {
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.SUPABASE_SECRET_KEY;
 if(!url||!key) throw new Error('Configuração privada incompleta.');
 return createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
}
export async function instagramRequest(path:string, params:Record<string,string>={}, method:'GET'|'POST'='GET') {
 const version=process.env.INSTAGRAM_API_VERSION;
 if(!/^v\d+\.0$/.test(version??''))throw new Error('Versão da API não configurada.');
 const url=new URL(`https://graph.instagram.com/${version}/${path}`);
 if(method==='GET')Object.entries(params).forEach(([k,v])=>url.searchParams.set(k,v));
 let response:Response;
 try{response=await fetch(url,{method,headers:{Authorization:`Bearer ${process.env.INSTAGRAM_ACCESS_TOKEN}`},body:method==='POST'?new URLSearchParams(params):undefined,cache:'no-store',signal:AbortSignal.timeout(12000)});}catch{throw new Error('A Meta não respondeu. Confira o histórico antes de repetir.');}
 const data=await response.json();
 if(!response.ok||data.error)throw new Error(`Meta recusou a operação (código ${Number(data.error?.code)||response.status}). Confira a autorização ou o formato da imagem.`);
 return data as {id?:string;user_id?:string;username?:string;status_code?:string;permalink?:string};
}
export async function verifyInstagramAccount(){
 const data=await instagramRequest('me',{fields:'user_id,username'});
 if(data.username?.toLowerCase()!=='fernando.cspn'||data.user_id!==process.env.INSTAGRAM_USER_ID)throw new Error('A autorização precisa pertencer ao Instagram @fernando.cspn.');
 return data;
}
