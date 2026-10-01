import type { MetadataRoute } from 'next';
import { categories } from '@/lib/content';
import { siteUrl, indexable } from '@/lib/site';
export default function sitemap():MetadataRoute.Sitemap { if(!indexable)return [];return ['','/sobre',...categories.map(c=>`/categoria/${c.slug}`)].map(path=>({url:new URL(path,siteUrl).href,changeFrequency:'weekly',priority:path===''?1:0.7})); }
