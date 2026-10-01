import Link from 'next/link';
import { LockKeyhole } from 'lucide-react';
import { editorialConfigured } from '@/lib/supabase/server';
import { LoginForm } from './form';
const notices: Record<string, string> = { 'sem-acesso': 'Sua conta ainda não está autorizada para a redação.', 'link-invalido': 'Este link não pôde ser confirmado. Solicite um novo acesso.', 'senha-alterada': 'Senha alterada. Entre com sua nova senha.' };
export default async function LoginPage({ searchParams }: { searchParams: Promise<{ aviso?: string }> }) {
  const { aviso } = await searchParams;
  const configured = editorialConfigured();
  return <main id="conteudo" className="desk-login"><section className="login-story"><Link href="/" className="desk-brand"><span className="desk-play">▶</span>SPN<span className="desk-orange">NEWS</span></Link><span className="desk-eyebrow">BASTIDORES DO PLAY</span><h1>A próxima<br/>boa história<br/>começa aqui<span>.</span></h1><p>Pautas, contexto e a personalidade da redação. Tudo no seu lugar, antes de entrar no ar.</p><div className="login-labels"><span>FERNANDO</span><span>RUBY</span><span>ADAILTON</span></div></section><section className="login-box"><span className="desk-lock"><LockKeyhole/></span><span className="desk-eyebrow">ACESSO RESTRITO</span><h2>Entre na redação.</h2><p className="desk-muted">Seu espaço para preparar, revisar e publicar.</p>{!configured && <p className="desk-notice">O painel está preparado. O login será liberado após conectar o banco da redação.</p>}{aviso && notices[aviso] && <p className="desk-notice">{notices[aviso]}</p>}<LoginForm configured={configured}/><Link className="login-return" href="/">← Voltar para o SPN News</Link></section></main>;
}
