import 'server-only';
import { cache } from 'react';
import { redirect } from 'next/navigation';
import { editorialClient, editorialConfigured } from './supabase/server';
import type { NewsItem } from './news';
import type { EditorialState } from './editorial-workflow';

export type Draft = { id: string; slug: string; content: NewsItem; state: EditorialState; revision: number; updated_at: string; published_at: string | null };
export const requireEditor = cache(async () => {
  if (!editorialConfigured()) redirect('/admin/login');
  const client = await editorialClient();
  const { data: { user }, error } = await client.auth.getUser();
  if (error || !user || !user.email_confirmed_at || user.is_anonymous) redirect('/admin/login');
  const { data: member } = await client.from('spn_members').select('role').eq('user_id', user.id).maybeSingle();
  if (!member || member.role !== 'admin') redirect('/admin/login?aviso=sem-acesso');
  return { client, user, role: member.role as 'admin' };
});
export async function getDrafts() {
  const { client } = await requireEditor();
  const { data, error } = await client.from('spn_drafts').select('*').order('updated_at', { ascending: false });
  if (error) throw new Error('Não foi possível carregar as matérias. Tente novamente.');
  return (data ?? []) as Draft[];
}
export async function getDraft(id: string) {
  const { client } = await requireEditor();
  if (!/^[a-f0-9-]{36}$/.test(id)) return null;
  const { data, error } = await client.from('spn_drafts').select('*').eq('id', id).maybeSingle();
  if (error) throw new Error('Não foi possível abrir a matéria.');
  return data as Draft | null;
}
export const stateLabels: Record<EditorialState, string> = { draft: 'Rascunho', in_review: 'Em revisão', approved: 'Aprovada', published: 'Publicada' };
