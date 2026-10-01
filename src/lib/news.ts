import type { CategorySlug } from './content';
import { septemberOpening } from './september';
export const newsEdition = '01 de setembro de 2026';
export const newsPublishedAt = '2026-10-01T17:04:33Z';
export type NewsSource = { name: string; url: string; date?: string; note?: string };
export type NewsPhoto = { path: string; alt: string; caption: string; creator: string; sourceUrl: string; originalUrl: string; license: string; licenseUrl: string };
export type NewsItem = { slug: string; title: string; excerpt: string; category: CategorySlug; source: NewsSource; sources?: NewsSource[]; context: string; body: string[]; historicalDate?: string; byline?: string; sections?: { title: string; paragraphs: string[]; source: number }[]; photo?: NewsPhoto };
export const news: NewsItem[] = [septemberOpening];
export const getNews = (slug: string) => news.find(item => item.slug === slug);
