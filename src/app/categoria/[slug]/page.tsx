import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { categories, articles, getCategory } from '@/lib/content';
import { Card, Ad } from '@/components/editorial';
export function generateStaticParams(){return categories.map(c=>({slug:c.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const c=getCategory(slug);return {title:c?.name||'Categoria não encontrada',description:c?.description,alternates:{canonical:`/categoria/${slug}`}}}
export default async function Category({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const c=getCategory(slug);if(!c)notFound();return <main id="conteudo" className="wrap page-space"><div className="breadcrumbs"><Link href="/">Início</Link> / {c.name}</div><section className="category-heading"><span className="eyebrow">CANAL {c.code} · CONTEÚDO DEMONSTRATIVO</span><h1>{c.name}<span className="orange-dot">.</span></h1><p>{c.description}</p></section><div className="card-grid">{articles.filter(a=>a.category===slug).map(a=><Card key={a.slug} article={a}/>)}</div><Ad/></main>}
