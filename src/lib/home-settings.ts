import 'server-only';
import { createClient } from '@supabase/supabase-js';

export type HomeSettings = {
  frequency_count: number;
  side_highlights_count: number;
  giro_count: number;
  latest_count: number;
  lists_count: number;
};

export const defaultHomeSettings: HomeSettings = {
  frequency_count: 5,
  side_highlights_count: 3,
  giro_count: 6,
  latest_count: 6,
  lists_count: 6,
};

function clamp(value: unknown, fallback: number, min: number, max: number) {
  const parsed = Number(value);
  return Number.isInteger(parsed) ? Math.min(max, Math.max(min, parsed)) : fallback;
}

export async function publicHomeSettings(): Promise<HomeSettings> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return defaultHomeSettings;

  const client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (input, init) => fetch(input, { ...init, cache: 'no-store' }) },
  });

  const { data, error } = await client.from('spn_home_settings').select('*').eq('id', true).maybeSingle();
  if (error || !data) return defaultHomeSettings;

  return {
    frequency_count: clamp(data.frequency_count, 5, 1, 12),
    side_highlights_count: clamp(data.side_highlights_count, 3, 1, 6),
    giro_count: clamp(data.giro_count, 6, 1, 12),
    latest_count: clamp(data.latest_count, 6, 1, 12),
    lists_count: clamp(data.lists_count, 6, 1, 12),
  };
}
