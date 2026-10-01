import Link from 'next/link';
import { Radio } from 'lucide-react';
import { CategoryTag } from './editorial';
import { news, newsEdition, type NewsItem } from '@/lib/news';

export function NewsCard({ item }: { item: NewsItem }) {
  return <article className="news-card"><CategoryTag slug={item.category} /><h3><Link href={'/noticia/' + item.slug}>{item.title}</Link></h3><p>{item.excerpt}</p><small>{item.context}</small><a href={item.source.url} target="_blank" rel="noopener noreferrer">Fonte: {item.source.name} ↗</a><Link className="more-link" href={'/noticia/' + item.slug}>LER RESUMO →</Link></article>;
}
export function DailyNews() {
  return <section className="daily-news" aria-label="Notícias verificadas"><div className="section-heading"><h2><Radio />Atualizações · {newsEdition}</h2><Link href="/atualizacoes">VER EDIÇÃO →</Link></div><p className="news-disclosure">Notícias reais · resumos com apoio de IA, baseados em comunicados oficiais. Esta edição não se atualiza automaticamente.</p><div className="news-grid">{news.map(item => <NewsCard key={item.slug} item={item} />)}</div></section>;
}
