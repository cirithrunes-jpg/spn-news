import type { MetadataRoute } from 'next';
import { publishedNews } from '@/lib/published-news';
import { categories } from '@/lib/content';
import { siteUrl, indexable } from '@/lib/site';
export default async function sitemap():Promise<MetadataRoute.Sitemap> { if(!indexable)return [];const news=await publishedNews();return ['','/sobre','/atualizacoes',...news.map(n=>`/noticia/${n.slug}`),...categories.map(c=>`/categoria/${c.slug}`)].map(path=>({url:new URL(path,siteUrl).href,changeFrequency:'weekly',priority:path===''?1:0.7})); }
