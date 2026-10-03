import { categories } from './content';
import type { NewsItem } from './news';

export function normalizeSearch(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export function searchNews(news: NewsItem[], query: string, category = '') {
  const terms = normalizeSearch(query).trim().split(/\s+/).filter(Boolean);
  return news.filter(item => {
    if (category && item.category !== category) return false;
    const text = normalizeSearch([item.title, item.excerpt, item.byline, categories.find(c => c.slug === item.category)?.name, ...item.body, ...(item.sections ?? []).flatMap(section => [section.title, ...section.paragraphs])].join(' '));
    return terms.every(term => text.includes(term));
  });
}
