import {notFound} from 'next/navigation';
import Link from 'next/link';
import {getDraft,stateLabels} from '@/lib/redacao';
import {editors} from '../../../../../../editorial-config/editors';
import {getBotPlan} from '../../../../../../editorial-config/bot-plan';
import {ArticleForm,TransitionForm} from '../form';
export default async function EditArticle({params,searchParams}:{params:Promise<{id:string}>;searchParams:Promise<{salvo?:string}>}){
 const{id}=await params,draft=await getDraft(id);if(!draft)notFound();const{salvo}=await searchParams;
 return <><div className="desk-intro"><div><span className="desk-eyebrow">EDIÇÃO DA MATÉRIA · VERSÃO {draft.revision}</span><h1>Na mesa, antes do play.</h1><span className={'desk-state '+draft.state}>{stateLabels[draft.state]}</span></div><div className="desk-actions"><Link href={'/admin/materias/'+id+'/preview'} className="desk-button secondary">Abrir prévia privada ↗</Link>{draft.published_at&&<Link href={'/admin/redes-sociais?materia='+encodeURIComponent(draft.slug)} className="desk-button">Publicar no Instagram →</Link>}</div></div>{salvo&&<p className="desk-toast" role="status">Alteração concluída.</p>}<section className="desk-card"><h2>Próximo passo</h2><p className="desk-muted">Os botões abaixo usam a versão salva. Salve o texto antes de avançar. A aprovação confirma sua revisão das fontes e do uso da imagem.</p><TransitionForm draft={draft}/></section><ArticleForm draft={draft} editors={editors.map(({id,name})=>({id,name}))} date={getBotPlan().date}/></>;
}
