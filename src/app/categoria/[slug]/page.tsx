import type { Metadata } from 'next';
import { publishedNews } from '@/lib/published-news';
import { NewsCard } from '@/components/news';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { categories, getCategory } from '@/lib/content';
import { Ad } from '@/components/editorial';
export function generateStaticParams(){return categories.map(c=>({slug:c.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const c=getCategory(slug);return {title:c?.name||'Categoria não encontrada',description:c?.description,alternates:{canonical:'/categoria/'+slug}}}
export default async function Category({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const c=getCategory(slug);if(!c)notFound();const items=(await publishedNews()).filter(n=>n.category===slug);return <main id="conteudo" className="wrap page-space"><div className="breadcrumbs"><Link href="/">Início</Link> / {c.name}</div><section className="category-heading"><span className="eyebrow">CANAL {c.code}</span><h1>{c.name}<span className="orange-dot">.</span></h1><p>{c.description}</p></section><div className="news-grid real-card-grid">{items.map(item=><NewsCard key={item.slug} item={item}/>)}</div><Ad/></main>}
