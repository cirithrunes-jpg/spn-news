import type { Metadata } from 'next';
import Image from 'next/image';
import { NewsImage } from '@/components/news-image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { EditorialContact } from '@/components/editorial-contact';
import { news, editionLabel, newsPublishedAt } from '@/lib/news';
import { publishedArticle } from '@/lib/published-news';
import { getCategory } from '@/lib/content';
import { siteUrl } from '@/lib/site';
import { getEditorByByline } from '../../../../editorial-config/editors';
export function generateStaticParams() { return news.map(item => ({ slug: item.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const item = await publishedArticle(slug);
  return { title: item?.title || 'Notícia não encontrada', description: item?.excerpt, alternates: { canonical: '/noticia/' + slug }, openGraph: { type: 'article', title: item?.title, description: item?.excerpt, publishedTime: item?.publishedAt ?? newsPublishedAt, images: item?.photo ? [{ url: item.photo.path, alt: item.photo.alt }] : undefined } };
}
export default async function NewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const item = await publishedArticle(slug); if (!item) notFound();
  const byline = item.byline ?? 'Redação SPN';
  const editor = getEditorByByline(byline);
  const sources = item.sources ?? [item.source];
  const publishedAt = item.publishedAt ?? newsPublishedAt;
  const schema = { '@context': 'https://schema.org', '@type': item.kind === 'news' ? 'NewsArticle' : 'Article', headline: item.title, description: item.excerpt, datePublished: publishedAt, dateModified: item.modifiedAt ?? publishedAt, temporalCoverage: item.historicalDate, author: editor ? { '@type': 'Person', name: editor.name } : { '@type': 'Organization', name: 'SPN News — texto com apoio de IA' }, publisher: { '@type': 'Organization', name: 'SPN News' }, mainEntityOfPage: new URL('/noticia/' + slug, siteUrl).href, image: item.photo ? new URL(item.photo.path, siteUrl).href : undefined, citation: sources.map(source => source.url), articleSection: getCategory(item.category)?.name, inLanguage: 'pt-BR', isAccessibleForFree: true };
  return <main id="conteudo" className="wrap page-space">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <div className="breadcrumbs"><Link href="/">Início</Link> / <Link href="/atualizacoes">Matérias</Link></div>
    <article><header className="article-heading"><span className="eyebrow">{getCategory(item.category)?.name} · {({news:'NOTÍCIA',guide:'GUIA',feature:'CULTURA & CONTEXTO',opinion:'OPINIÃO',data:'DADOS'}[item.kind ?? 'news'])}</span><h1>{item.title}</h1><p>{item.excerpt}</p><div className="byline author-byline">{editor&&<Image src={editor.avatar} alt={editor.name} width={48} height={48} className="author-avatar"/>}<div className="author-byline-copy"><strong>{byline}</strong>{editor&&<span>{editor.role}</span>}</div><time dateTime={item.historicalDate ?? newsPublishedAt}>{editionLabel(item.historicalDate ?? publishedAt.slice(0,10))}</time></div></header>
    <div className="article-body">
      <aside className="news-context"><strong>Data e contexto</strong><p>{item.context}</p></aside>
      {item.photo && <figure className="historical-photo"><NewsImage unoptimized={item.photo.path.startsWith('https://')} src={item.photo.path} alt={item.photo.alt} width={item.photo.width ?? 1280} height={item.photo.height ?? 945} priority sizes="(max-width: 800px) 100vw, 760px" /><figcaption>{item.photo.caption}<span className="photo-credit">Foto: {item.photo.creator} · <a href={item.photo.sourceUrl} target="_blank" rel="noopener noreferrer">{item.photo.sourceName ?? 'Wikimedia Commons'}</a> · <a href={item.photo.originalUrl} target="_blank" rel="noopener noreferrer">Origem da foto</a> · <a href={item.photo.licenseUrl} target="_blank" rel="noopener noreferrer">{item.photo.license}</a>{item.photo.rightsReserved ? ' · Uso editorial para ilustrar a produção; direitos pertencem aos respectivos titulares.' : ' · Versão reduzida, sem recorte; fotografia redistribuída sob a mesma licença.'}</span></figcaption></figure>}
      {item.body.map((paragraph,index) => { const photos=(item.inlinePhotos??[]).filter(photo=>photo.afterParagraph===index+1); const showAd=item.monetization!==false && item.body.length>=6 && (index+1===3 || index+1===Math.max(6,Math.floor(item.body.length*.7))); return <div className="article-flow" key={index}><p>{paragraph}</p>{photos.map((photo,n)=><figure className="historical-photo inline-photo" key={n}><NewsImage unoptimized={photo.path.startsWith('https://')} src={photo.path} alt={photo.alt} width={photo.width??1280} height={photo.height??800} sizes="(max-width: 800px) 100vw, 760px"/><figcaption>{photo.caption}<span className="photo-credit">Foto: {photo.creator} · <a href={photo.sourceUrl} target="_blank" rel="noopener noreferrer">{photo.sourceName??'Fonte original'}</a> · <a href={photo.originalUrl} target="_blank" rel="noopener noreferrer">Origem da foto</a> · <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer">{photo.license}</a></span></figcaption></figure>)}{showAd&&<aside className="article-ad" aria-label="Publicidade"><span>PUBLICIDADE</span><div className="article-ad-slot">Espaço publicitário SPN News</div></aside>}</div>})}
      {item.sections?.map(section => <section className="historical-section" key={section.title}><h2>{section.title}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}<a className="section-source" href={sources[section.source].url} target="_blank" rel="noopener noreferrer">Fonte: {sources[section.source].name} ↗</a></section>)}
      <EditorialContact title={item.title} path={'/noticia/' + item.slug} />
      <section className="news-context"><h2>Fonte e transparência</h2><p>Texto com apoio de IA, baseado nas fontes abaixo. Os comentários de humor e avaliação são opinião editorial. Edição referente a {editionLabel(item.historicalDate ?? publishedAt.slice(0,10))}; publicação no site em <time dateTime={publishedAt}>{editionLabel(publishedAt.slice(0,10))}</time>. Fontes consultadas nessa data. Não é publicidade nem contém links de afiliados.</p><ul>{sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.name}{source.date && ' · ' + source.date.split('-').reverse().join('/')} ↗</a>{source.note && <p>{source.note}</p>}</li>)}</ul></section>
      <Link className="button" href="/atualizacoes">Ver outras matérias →</Link>
    </div></article>
  </main>;
}
