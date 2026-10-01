import type { Metadata } from 'next';
import { EditorialContact } from '@/components/editorial-contact';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getNews, news, newsEdition, newsPublishedAt } from '@/lib/news';
import { getCategory } from '@/lib/content';
import { siteUrl } from '@/lib/site';
export function generateStaticParams() { return news.map(item => ({ slug: item.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const item = getNews(slug);
  return { title: item?.title || 'Notícia não encontrada', description: item?.excerpt, alternates: { canonical: '/noticia/' + slug }, openGraph: { type: 'article', title: item?.title, description: item?.excerpt, publishedTime: newsPublishedAt } };
}
export default async function NewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const item = getNews(slug); if (!item) notFound();
  const schema = { '@context': 'https://schema.org', '@type': 'NewsArticle', headline: item.title, description: item.excerpt, datePublished: newsPublishedAt, dateModified: newsPublishedAt, author: { '@type': 'Organization', name: 'SPN News — curadoria com apoio de IA' }, publisher: { '@type': 'Organization', name: 'SPN News' }, mainEntityOfPage: new URL('/noticia/' + slug, siteUrl).href, citation: item.source.url, articleSection: getCategory(item.category)?.name, inLanguage: 'pt-BR', isAccessibleForFree: true };
  return <main id="conteudo" className="wrap page-space"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} /><div className="breadcrumbs"><Link href="/">Início</Link> / <Link href="/atualizacoes">Atualizações</Link></div><article><header className="article-heading"><span className="eyebrow">{getCategory(item.category)?.name} · NOTÍCIA REAL</span><h1>{item.title}</h1><p>{item.excerpt}</p><div className="byline"><strong>SPN News · Curadoria com apoio de IA</strong><time dateTime={newsPublishedAt}>{newsEdition}</time></div></header><div className="article-body"><aside className="news-context"><strong>Data e contexto</strong><p>{item.context}</p></aside>{item.body.map(paragraph => <p key={paragraph}>{paragraph}</p>)}<EditorialContact title={item.title} path={'/noticia/' + item.slug}/><section className="news-context"><h2>Fonte e transparência</h2><p>Resumo escrito com apoio de IA a partir do comunicado da empresa, sem entrevista ou apuração independente. Não é publicidade nem recomendação de compra.</p><a href={item.source.url} target="_blank" rel="noopener noreferrer">{item.source.name} · comunicado de <time dateTime={item.source.date}>{item.source.date.split('-').reverse().join('/')}</time> ↗</a><p>Texto consultado em 1 de outubro de 2026. Não usamos imagens promocionais nesta notícia.</p></section><Link className="button" href="/atualizacoes">Voltar à edição →</Link></div></article></main>;
}



