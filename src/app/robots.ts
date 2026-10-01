import type { MetadataRoute } from 'next';
import { siteUrl, indexable } from '@/lib/site';
export default function robots():MetadataRoute.Robots{return {rules:{userAgent:'*',...(indexable?{allow:'/',disallow:['/admin','/busca','/materia/']}:{disallow:'/'})},sitemap:new URL('/sitemap.xml',siteUrl).href}}
