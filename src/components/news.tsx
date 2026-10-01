import Link from 'next/link';
import Image from 'next/image';
import { Radio } from 'lucide-react';
import { CategoryTag } from './editorial';
import { news, editionLabel, type NewsItem } from '@/lib/news';

export function NewsCard({ item }: { item: NewsItem }) {
  return <article className="news-card">{item.photo && <><Link href={'/noticia/' + item.slug}><Image className="news-card-photo" unoptimized={item.photo.path.startsWith('https://')} src={item.photo.path} alt={item.photo.alt} width={item.photo.width ?? 1280} height={item.photo.height ?? 945} sizes="(max-width: 700px) 100vw, 760px" /></Link><span className="photo-credit">{item.photo.rightsReserved ? 'Imagem: ' : 'Foto de arquivo: '}{item.photo.creator} · <a href={item.photo.sourceUrl} target="_blank" rel="noopener noreferrer">{item.photo.sourceName ?? 'Wikimedia Commons'}</a> · <a href={item.photo.licenseUrl} target="_blank" rel="noopener noreferrer">{item.photo.license}</a></span></>}<div className="story-meta"><span>{item.byline}</span><time dateTime={item.historicalDate}>{item.historicalDate && editionLabel(item.historicalDate)}</time></div><CategoryTag slug={item.category} /><h3><Link href={'/noticia/' + item.slug}>{item.title}</Link></h3><p>{item.excerpt}</p><small>{item.context}</small><a href={item.source.url} target="_blank" rel="noopener noreferrer">Fonte: {item.source.name} ↗</a><Link className="more-link" href={'/noticia/' + item.slug}>LEIA A MATÉRIA →</Link></article>;
}
export function DailyNews() {
  const dates = [...new Set(news.map(item => item.historicalDate))].filter((date): date is string => Boolean(date)).sort().reverse();
  return <section className="daily-news" aria-label="Matérias de setembro"><div className="section-heading"><h2><Radio />Na frequência do SPN</h2><Link href="/atualizacoes">VER MATÉRIAS →</Link></div>{dates.map(date => <section key={date} className="daily-edition"><h3 className="edition-date">{editionLabel(date)}</h3><div className="news-grid historical-edition">{news.filter(item => item.historicalDate === date).map(item => <NewsCard key={item.slug} item={item} />)}</div></section>)}</section>;
}
