import 'server-only';
import { createClient } from '@supabase/supabase-js';
import { news as archive, type NewsItem } from './news';

// Only the public snapshot table is queried, with an anonymous publishable key.
// Internal drafts, calendar and memberships are never part of this response.
export async function publishedNews(): Promise<NewsItem[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return archive;
  const client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false }, global: { fetch: (input, init) => fetch(input, { ...init, cache: 'no-store' }) } });
  const { data, error } = await client.from('spn_publications').select('slug,content,published_at,modified_at,withdrawn');
  if (error) { console.error('SPN: publicações indisponíveis', error.code); return []; }
  const merged = new Map(archive.map(item => [item.slug, item]));
  for (const row of data ?? []) {
    if (row.withdrawn) merged.delete(row.slug);
    else merged.set(row.slug, { ...row.content, slug: row.slug, publishedAt: row.published_at, modifiedAt: row.modified_at } as NewsItem);
  }
  return [...merged.values()].sort((a, b) => (b.historicalDate ?? b.publishedAt ?? '').localeCompare(a.historicalDate ?? a.publishedAt ?? ''));
}
export async function publishedArticle(slug: string) { return (await publishedNews()).find(item => item.slug === slug); }
