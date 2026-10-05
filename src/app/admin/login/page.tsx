import Link from 'next/link';
import { editorialConfigured } from '@/lib/supabase/server';
import { adminAccessMessages, accessNotice } from '@/lib/admin-access';
import { LoginForm } from './form';

export default async function LoginPage({ searchParams }: {
  searchParams: Promise<{ aviso?: string; error?: string; error_code?: string }>;
}) {
  const params = await searchParams;
  const aviso = params.aviso ?? (params.error ? accessNotice(params.error_code) : undefined);
  return <main id="conteudo" className="desk-login"><section className="login-box">
    <span className="desk-eyebrow">SPN NEWS · REDAÇÃO</span>
    <h1>Entre na redação.</h1>
    <p className="desk-muted">Solicite um link seguro para o e-mail do administrador. Não é necessário digitar senha.</p>
    {aviso && adminAccessMessages[aviso] && <p className="desk-notice" role="status">{adminAccessMessages[aviso]}</p>}
    <LoginForm configured={editorialConfigured()}/>
    <Link className="login-return" href="/">← Voltar para o SPN News</Link>
  </section></main>;
}
