'use server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { editorialClient, editorialConfigured } from '@/lib/supabase/server';
import { siteUrl } from '@/lib/site';

export type LoginResult = { message: string; success?: boolean };

const PRIMARY_ADMIN_EMAIL = 'spnerds.oficial@gmail.com';

async function authCallbackUrl() {
  const requestHeaders = await headers();
  const host = requestHeaders.get('x-forwarded-host') ?? requestHeaders.get('host');
  const protocol = requestHeaders.get('x-forwarded-proto') ?? (host?.includes('localhost') ? 'http' : 'https');
  const origin = host ? `${protocol}://${host}` : siteUrl.origin;
  return new URL('/admin/auth/callback', origin).href;
}

export async function requestAdminAccess(_previous: LoginResult, _form: FormData): Promise<LoginResult> {
  if (!editorialConfigured()) return { message: 'O acesso ao painel ainda não está conectado ao banco da redação.' };

  const client = await editorialClient();
  const { error } = await client.auth.signInWithOtp({
    email: PRIMARY_ADMIN_EMAIL,
    options: {
      emailRedirectTo: await authCallbackUrl(),
      shouldCreateUser: false,
    },
  });

  if (error) return { message: 'Não foi possível enviar o acesso agora. Tente novamente em instantes.' };
  return {
    message: 'Acesso enviado para o e-mail do administrador. Abra a mensagem e toque no link para entrar.',
    success: true,
  };
}

export async function login(_previous: LoginResult, form: FormData): Promise<LoginResult> {
  if (!editorialConfigured()) return { message: 'O acesso aguarda a conexão com o banco da redação.' };
  const email = String(form.get('email') ?? '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { message: 'Informe um e-mail válido.' };

  const client = await editorialClient();
  const { error } = await client.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: await authCallbackUrl(),
      shouldCreateUser: false,
    },
  });

  if (error) return { message: 'Não foi possível enviar o link de acesso. Tente novamente em instantes.' };
  return {
    message: 'Se este e-mail estiver autorizado na redação, você receberá um link seguro para entrar. Não é necessário digitar senha.',
    success: true,
  };
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

export async function logout() {
  if (editorialConfigured()) {
    const client = await editorialClient();
    await client.auth.signOut();
  }
  redirect('/admin/login');
}
