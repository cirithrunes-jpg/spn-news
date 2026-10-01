import Link from 'next/link';
import { KeyRound } from 'lucide-react';
import { editorialConfigured } from '@/lib/supabase/server';
import { LoginForm } from './form';

const notices: Record<string, string> = {
  'sem-acesso': 'Esta sessão não tem autorização para a redação.',
  'link-invalido': 'Este link expirou ou não pôde ser confirmado. Peça um novo acesso.',
  'senha-alterada': 'Acesso atualizado.',
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ aviso?: string }> }) {
  const { aviso } = await searchParams;
  const configured = editorialConfigured();

  return <main id="conteudo" className="desk-login">
    <section className="login-story">
      <Link href="/" className="desk-brand"><span className="desk-play">▶</span>SPN<span className="desk-orange">NEWS</span></Link>
      <span className="desk-eyebrow">REDAÇÃO SPN</span>
      <h1>Painel<br/>administrativo<span>.</span></h1>
      <p>Acesso direto do administrador do SPN News.</p>
    </section>
    <section className="login-box">
      <span className="desk-lock"><KeyRound/></span>
      <span className="desk-eyebrow">ACESSO DO ADM</span>
      <h2>Entrar no painel.</h2>
      <p className="desk-muted">Sem campo de e-mail e sem campo de senha.</p>
      {!configured && <p className="desk-notice">O painel ainda não está conectado ao banco da redação.</p>}
      {aviso && notices[aviso] && <p className="desk-notice">{notices[aviso]}</p>}
      <LoginForm configured={configured}/>
      <Link className="login-return" href="/">← Voltar para o SPN News</Link>
    </section>
  </main>;
}
