import type { Metadata } from 'next';
import Link from 'next/link';
import { news, editionLabel } from '@/lib/news';
import { NewsCard } from '@/components/news';
export const metadata: Metadata = { title: 'Arquivo · setembro de 2026', alternates: { canonical: '/atualizacoes' } };
export default async function Updates({ searchParams }: {searchParams: Promise<{dia?:string}>}) {
 const {dia}=await searchParams;
 const selected=typeof dia==='string'&&/^(0?[1-9]|[12][0-9]|30)$/.test(dia)?Number(dia):undefined;
 const items=selected?news.filter(n=>Number(n.historicalDate?.slice(-2))===selected):news;
 return <main id="conteudo" className="wrap page-space"><section className="category-heading"><span className="eyebrow">ARQUIVO SPN · 2026</span><h1>Setembro inteiro no play<span className="orange-dot">.</span></h1><p>Escolha uma edição para ler as matérias do dia. {news.length} publicações de 1 a 30 de setembro.</p></section><nav className="archive-days" aria-label="Edições por dia"><Link href="/atualizacoes" aria-current={!selected?'page':undefined}>Todos</Link>{Array.from({length:30},(_,i)=>i+1).map(day=><Link key={day} href={'/atualizacoes?dia='+day} aria-label={day+' de setembro'} aria-current={selected===day?'page':undefined}>{String(day).padStart(2,'0')}</Link>)}</nav><div className="news-grid real-card-grid">{items.map(n=><div key={n.slug}><h2 className="edition-date">{editionLabel(n.historicalDate!)}</h2><NewsCard item={n}/></div>)}</div>{selected&&<div className="archive-pagination">{selected>1&&<Link className="button" href={'/atualizacoes?dia='+(selected-1)}>← Dia anterior</Link>}{selected<30&&<Link className="button" href={'/atualizacoes?dia='+(selected+1)}>Próximo dia →</Link>}</div>}</main>;
}
