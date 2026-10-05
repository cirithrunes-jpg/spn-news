'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { editorialClient, editorialConfigured } from '@/lib/supabase/server';
import { siteUrl } from '@/lib/site';
import { confirmationInput } from '@/lib/admin-access';

export type LoginResult = { message: string; success?: boolean };

const PRIMARY_ADMIN_EMAIL = 'spnerds.oficial@gmail.com';

function authCallbackUrl() {
  return new URL('/admin/auth/callback', siteUrl).href;
}

export async function requestAdminAccess(_previous: LoginResult, _form: FormData): Promise<LoginResult> {
  if (!editorialConfigured()) return { message: 'O acesso ao painel ainda não está conectado ao banco da redação.' };
  const jar = await cookies();
  if (jar.get('spn_admin_link_requested')?.value === '1') {
    return { message: 'Aguarde um minuto antes de solicitar outro link. Abra a mensagem mais recente no e-mail do administrador.' };
  }
  const client = await editorialClient();
  const { error } = await client.auth.signInWithOtp({
    email: PRIMARY_ADMIN_EMAIL,
    options: {
      emailRedirectTo: authCallbackUrl(),
      shouldCreateUser: false,
    },
  });

  if (error) return { message: 'Não foi possível enviar o acesso agora. Tente novamente em instantes.' };
  jar.set('spn_admin_link_requested', '1', { httpOnly: true, sameSite: 'lax', secure: siteUrl.protocol === 'https:', maxAge: 60, path: '/admin' });
  redirect('/admin/acesso-enviado');
}

export async function confirmAdminAccess(form: FormData) {
  if (!editorialConfigured()) redirect('/admin/login?aviso=config');
  const input = confirmationInput(String(form.get('token_hash') ?? ''), String(form.get('type') ?? 'email'));
  if (!input) redirect('/admin/login?aviso=link-invalido');
  const client = await editorialClient();
  const { error } = await client.auth.verifyOtp(input);
  if (error) redirect('/admin/login?aviso=link-invalido');
  redirect('/admin');
}

export async function login(_previous: LoginResult, form: FormData): Promise<LoginResult> {
  if (!editorialConfigured()) return { message: 'O acesso aguarda a conexão com o banco da redação.' };
  const email = String(form.get('email') ?? '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { message: 'Informe um e-mail válido.' };

  const client = await editorialClient();
  const { error } = await client.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: authCallbackUrl(),
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
  redirect('/');
}
