'use server';
import { redirect } from 'next/navigation';
import { editorialClient, editorialConfigured } from '@/lib/supabase/server';
import { siteUrl } from '@/lib/site';
export type LoginResult = { message: string; success?: boolean };
export async function login(_previous: LoginResult, form: FormData): Promise<LoginResult> {
  if (!editorialConfigured()) return { message: 'O acesso aguarda a conexão com o banco da redação.' };
  const email = String(form.get('email') ?? '').trim().toLowerCase();
  const password = String(form.get('password') ?? '');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 8 || password.length > 128) return { message: 'Confira o e-mail e a senha (mínimo de 8 caracteres).' };
  const client = await editorialClient();
  const mode = form.get('mode');
  if (mode === 'first') {
    const { error } = await client.auth.signUp({ email, password, options: { emailRedirectTo: new URL('/admin/auth/callback', siteUrl).href } });
    return { message: error ? 'Não foi possível iniciar o acesso. Tente novamente mais tarde.' : 'Confira seu e-mail para confirmar a conta. Depois, volte e entre com a senha que criou.', success: !error };
  }
  const { error } = await client.auth.signInWithPassword({ email, password });
  if (error) return { message: 'Não foi possível entrar. Confira suas credenciais e a confirmação do e-mail.' };
  redirect('/admin');
}
export async function recover(_previous: LoginResult, form: FormData): Promise<LoginResult> {
  if (!editorialConfigured()) return { message: 'O acesso ainda está sendo configurado.' };
  const email = String(form.get('email') ?? '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { message: 'Informe um e-mail válido.' };
  const client = await editorialClient();
  await client.auth.resetPasswordForEmail(email, { redirectTo: new URL('/admin/auth/callback?recovery=1', siteUrl).href });
  return { message: 'Se houver uma conta com esse endereço, você receberá as instruções por e-mail.', success: true };
}
export async function changePassword(_previous: LoginResult, form: FormData): Promise<LoginResult> {
  const client = await editorialClient();
  const { data: { user } } = await client.auth.getUser();
  if (!user) return { message: 'Solicite um novo link de recuperação.' };
  const password = String(form.get('password') ?? '');
  if (password.length < 12 || password.length > 128) return { message: 'Use uma senha entre 12 e 128 caracteres.' };
  const { error } = await client.auth.updateUser({ password });
  if (error) return { message: 'Não foi possível alterar a senha. Solicite um novo link.' };
  await client.auth.signOut();
  redirect('/admin/login?aviso=senha-alterada');
}
export async function logout() { if (editorialConfigured()) { const client = await editorialClient(); await client.auth.signOut(); } redirect('/admin/login'); }
