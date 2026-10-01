import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { EditorialContact } from '@/components/editorial-contact';
import { getNews, news, newsEdition, newsPublishedAt } from '@/lib/news';
import { getCategory } from '@/lib/content';
import { siteUrl } from '@/lib/site';
export function generateStaticParams() { return news.map(item => ({ slug: item.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const item = getNews(slug);
  return { title: item?.title || 'Notícia não encontrada', description: item?.excerpt, alternates: { canonical: '/noticia/' + slug }, openGraph: { type: 'article', title: item?.title, description: item?.excerpt, publishedTime: newsPublishedAt, images: item?.photo ? [{ url: item.photo.path, alt: item.photo.alt }] : undefined } };
}
export default async function NewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const item = getNews(slug); if (!item) notFound();
  const sources = item.sources ?? [item.source];
  const schema = { '@context': 'https://schema.org', '@type': item.historicalDate ? 'Article' : 'NewsArticle', headline: item.title, description: item.excerpt, datePublished: newsPublishedAt, dateModified: newsPublishedAt, temporalCoverage: item.historicalDate, author: { '@type': 'Organization', name: 'SPN News — texto com apoio de IA' }, publisher: { '@type': 'Organization', name: 'SPN News' }, mainEntityOfPage: new URL('/noticia/' + slug, siteUrl).href, image: item.photo ? new URL(item.photo.path, siteUrl).href : undefined, citation: sources.map(source => source.url), articleSection: getCategory(item.category)?.name, inLanguage: 'pt-BR', isAccessibleForFree: true };
  return <main id="conteudo" className="wrap page-space">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <div className="breadcrumbs"><Link href="/">Início</Link> / <Link href="/atualizacoes">Teste de setembro</Link></div>
    <article><header className="article-heading"><span className="eyebrow">{getCategory(item.category)?.name} · GUIA DE LANÇAMENTOS · TESTE HISTÓRICO</span><h1>{item.title}</h1><p>{item.excerpt}</p><div className="byline"><strong>{item.byline ?? 'Redação SPN'} · perfil editorial</strong><time dateTime={item.historicalDate ?? newsPublishedAt}>{newsEdition}</time></div></header>
    <div className="article-body">
      <aside className="news-context"><strong>Data e contexto</strong><p>{item.context}</p></aside>
      {item.photo && <figure className="historical-photo"><Image src={item.photo.path} alt={item.photo.alt} width={1280} height={945} priority sizes="(max-width: 800px) 100vw, 760px" /><figcaption>{item.photo.caption}<span className="photo-credit">Foto: {item.photo.creator} · <a href={item.photo.sourceUrl} target="_blank" rel="noopener noreferrer">Wikimedia Commons</a> · <a href={item.photo.originalUrl} target="_blank" rel="noopener noreferrer">Origem: Flickr</a> · <a href={item.photo.licenseUrl} target="_blank" rel="noopener noreferrer">{item.photo.license}</a> · Versão reduzida, sem recorte; fotografia redistribuída sob a mesma licença.</span></figcaption></figure>}
      {item.body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      {item.sections?.map(section => <section className="historical-section" key={section.title}><h2>{section.title}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}<a className="section-source" href={sources[section.source].url} target="_blank" rel="noopener noreferrer">Fonte: {sources[section.source].name} ↗</a></section>)}
      <EditorialContact title={item.title} path={'/noticia/' + item.slug} />
      <section className="news-context"><h2>Fonte e transparência</h2><p>Matéria preparada com apoio de IA na voz editorial de {item.byline ?? 'Redação SPN'}, conforme o perfil do teste. Não afirma entrevista, leitura antecipada ou revisão humana realizada. Comentários de humor e avaliação são opinião editorial.</p><p>Publicação efetiva: <time dateTime={newsPublishedAt}>1 de outubro de 2026</time>. A data de setembro identifica a edição histórica. Fontes consultadas em 1 de outubro; esta é uma reconstrução editorial, não uma reprodução arquivada do site em setembro. Previsões podem ter mudado. Não é publicidade nem contém links de afiliados.</p><ul>{sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.name}{source.date && ' · ' + source.date.split('-').reverse().join('/')} ↗</a>{source.note && <p>{source.note}</p>}</li>)}</ul></section>
      <Link className="button" href="/atualizacoes">Ver matérias do teste →</Link>
    </div></article>
  </main>;
}
