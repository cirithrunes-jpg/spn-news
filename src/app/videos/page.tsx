import type { Metadata } from 'next';
import Link from 'next/link';
import { videoDemos } from '@/lib/programming';
import { Artwork, PhotoCredit } from '@/components/editorial';
export const metadata: Metadata = { title: 'SPN TV — vídeos demonstrativos', robots: { index: false, follow: false } };
export default async function Videos({ searchParams }: { searchParams: Promise<{ video?: string }> }) {
  const { video } = await searchParams;
  const selected = videoDemos.find(v => v.slug === video);
  return <main id="conteudo" className="wrap page-space"><div className="category-heading"><span className="eyebrow">SPN TV · CONCEITOS DEMONSTRATIVOS</span><h1>O pop também tem play<span className="orange-dot">.</span></h1><p>Explore os roteiros de exemplo. Ainda não há vídeos gravados ou reprodução disponível.</p></div>{selected && <section className="video-detail"><div><div className="video-detail-art"><Artwork art={selected.art} large /></div><PhotoCredit art={selected.art}/></div><div><span className="eyebrow">ROTEIRO DEMONSTRATIVO · SEM VÍDEO DISPONÍVEL</span><h2>{selected.title}</h2><p>{selected.description}</p><Link href="/videos" className="button">Voltar aos conceitos →</Link></div></section>}<div className="card-grid">{videoDemos.map(v => <div className="video-list-card" key={v.slug}><Link href={'/videos?video=' + v.slug}><Artwork art={v.art} /><span className="eyebrow">ROTEIRO DEMONSTRATIVO</span><h2>{v.title}</h2><p>{v.description}</p></Link><PhotoCredit art={v.art}/></div>)}</div></main>;
}
