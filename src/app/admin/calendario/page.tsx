import type { Metadata } from 'next';
import { getEditorialMonth } from '@/lib/editorial-calendar';
import { getEditor } from '@/lib/editors';
export const metadata: Metadata = { title:'Calendário editorial',robots:{index:false,follow:false} };
const months=['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
export default async function EditorialCalendar({searchParams}:{searchParams:Promise<{ano?:string;mes?:string}>}) {
  const p=await searchParams;const year=Number(p.ano)||2026;const month=Number(p.mes)||10;
  const safeYear=Number.isInteger(year)&&year>=2000&&year<=2100?year:2026;
  const safeMonth=Number.isInteger(month)&&month>=1&&month<=12?month:10;
  return <main id="conteudo" className="wrap page-space"><span className="eyebrow">PLANEJAMENTO · SEM PUBLICAÇÃO AUTOMÁTICA</span><h1>Calendário editorial</h1><p>Programação recorrente de janeiro a dezembro. Pautas planejadas, ainda não produzidas ou aprovadas.</p><form action="/admin/calendario" className="search-form"><label>Mês<select name="mes" defaultValue={safeMonth}>{months.map((name,i)=><option value={i+1} key={name}>{name}</option>)}</select></label><label>Ano<input type="number" name="ano" min="2000" max="2100" defaultValue={safeYear}/></label><button className="button">Ver mês →</button></form><h2>{months[safeMonth-1]} de {safeYear}</h2><div className="editorial-plan">{getEditorialMonth(safeYear,safeMonth).map(({date,slot})=><article key={date}><time dateTime={date}>{date.split('-').reverse().join('/')}</time><div><h3>{slot?.subject||'Espaço livre para pauta extra'}</h3><p>{slot?.editorId?getEditor(slot.editorId)?.name:'Responsável a definir'} · {slot?.kind==='opinion'?'Lista opinativa':slot?.kind==='data'?'Dados a verificar':'Pauta planejada'}</p></div></article>)}</div><p>Rankings e bilheterias exigem fonte, período, região e critério. Antes do fim do mês, rankings mensais serão identificados como parciais. Listas dos melhores ou piores refletem avaliação editorial, não um consenso universal.</p></main>;
}
