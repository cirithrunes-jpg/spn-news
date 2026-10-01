import Image from 'next/image';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {getDraft} from '@/lib/redacao';
export default async function Preview({params}:{params:Promise<{id:string}>}){
 const{id}=await params,draft=await getDraft(id);if(!draft)notFound();const item=draft.content;
 return <article className="desk-card desk-preview"><Link className="desk-link" href={'/admin/materias/'+id}>← Voltar para edição</Link><p className="desk-state">PRÉVIA PRIVADA · VERSÃO {draft.revision}</p><h1>{item.title}</h1><p className="desk-muted">{item.excerpt}</p><p className="byline">{item.byline} · {item.historicalDate?.split('-').reverse().join('/')}</p>{item.photo&&<figure><Image unoptimized src={item.photo.path} width={1280} height={720} alt={item.photo.alt}/><figcaption className="desk-muted">{item.photo.caption} · {item.photo.creator} · <a href={item.photo.sourceUrl}>Origem</a></figcaption></figure>}<p className="desk-notice">{item.context}</p>{item.body.map((p,i)=><p key={i}>{p}</p>)}{item.sections?.map((s,i)=><section key={i}><h2>{s.title}</h2>{s.paragraphs.map((p,j)=><p key={j}>{p}</p>)}</section>)}<h2>Fontes</h2>{(item.sources??[item.source]).map(s=><p key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.name} ↗</a></p>)}</article>;
}
