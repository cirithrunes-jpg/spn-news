import type { Metadata } from 'next';
import { articles } from '@/lib/content';
import { Card } from '@/components/editorial';
export const metadata: Metadata = { title: 'Listas e seleções demonstrativas', robots: { index: false, follow: false } };
export default function Lists() { return <main id="conteudo" className="wrap page-space"><div className="category-heading"><span className="eyebrow">CURADORIA DEMONSTRATIVA</span><h1>Uma boa lista merece play<span className="orange-dot">.</span></h1><p>Três histórias de exemplo para uma sessão de nostalgia, música e jogos.</p></div><div className="card-grid">{[articles[6], articles[3], articles[8]].map(a => <Card key={a.slug} article={a} />)}</div></main>; }
