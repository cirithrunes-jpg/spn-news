import Link from 'next/link';
import Image from 'next/image';
import { Radio } from 'lucide-react';
import { CategoryTag } from './editorial';
import { news, newsEdition, type NewsItem } from '@/lib/news';

export function NewsCard({ item }: { item: NewsItem }) {
  return <article className="news-card">{item.photo && <><Link href={'/noticia/' + item.slug}><Image className="news-card-photo" src={item.photo.path} alt={item.photo.alt} width={1280} height={945} sizes="(max-width: 700px) 100vw, 760px" /></Link><span className="photo-credit">Foto de arquivo (2024): {item.photo.creator} · <a href={item.photo.sourceUrl} target="_blank" rel="noopener noreferrer">Wikimedia Commons</a> · <a href={item.photo.licenseUrl} target="_blank" rel="noopener noreferrer">{item.photo.license}</a></span></>}<CategoryTag slug={item.category} /><h3><Link href={'/noticia/' + item.slug}>{item.title}</Link></h3><p>{item.excerpt}</p><small>{item.context}</small><a href={item.source.url} target="_blank" rel="noopener noreferrer">Fonte: {item.source.name} ↗</a><Link className="more-link" href={'/noticia/' + item.slug}>LEIA A MATÉRIA →</Link></article>;
}
export function DailyNews() {
  return <section className="daily-news" aria-label="Teste histórico de setembro"><div className="section-heading"><h2><Radio />Teste de setembro · {newsEdition}</h2><Link href="/atualizacoes">VER MATÉRIAS →</Link></div><p className="news-disclosure">Dia 1 · lançamentos do mês · perfil editorial de Fernando Valerious. Matéria histórica com fontes e apoio de IA; preparada em outubro.</p><div className="news-grid historical-edition">{news.map(item => <NewsCard key={item.slug} item={item} />)}</div></section>;
}
