import type { Metadata } from 'next';
import { publishedNews } from '@/lib/published-news';
import { NewsCard } from '@/components/news';
export const metadata: Metadata = { title: 'Listas com opinião SPN', alternates:{canonical:'/listas'} };
export default async function Lists() { const news=await publishedNews(); return <main id="conteudo" className="wrap page-space"><div className="category-heading"><span className="eyebrow">SELEÇÃO DA REDAÇÃO</span><h1>Uma boa lista merece play<span className="orange-dot">.</span></h1><p>Dez itens por seleção. Opinião, contexto e humor — com espaço para a sua discordância.</p></div><div className="news-grid real-card-grid">{news.filter(n=>n.kind==='opinion').map(n=><NewsCard key={n.slug} item={n}/>)}</div></main>; }
