import Link from 'next/link';
import { confirmationInput, adminAccessMessages } from '@/lib/admin-access';
import { confirmAdminAccess } from '../actions';

export default async function ConfirmAccess({ searchParams }: {
  searchParams: Promise<{ token_hash?: string; type?: string }>;
}) {
  const params = await searchParams;
  const input = confirmationInput(params.token_hash, params.type);
  return <main id="conteudo" className="desk-login"><section className="login-box">
    <span className="desk-eyebrow">SPN NEWS · REDAÇÃO</span>
    <h1>{input ? 'Confirme seu acesso.' : 'Solicite um novo acesso.'}</h1>
    <p className={input ? 'desk-muted' : 'desk-notice'}>{input
      ? 'Toque no botão para entrar na redação. O link é de uso único.'
      : adminAccessMessages['link-invalido']}</p>
    {input ? <form action={confirmAdminAccess} className="desk-form">
      <input type="hidden" name="token_hash" value={input.token_hash}/>
      <input type="hidden" name="type" value={input.type}/>
      <button className="desk-button">Confirmar e abrir o painel →</button>
    </form> : <Link className="desk-button" href="/admin/login">Enviar novo link →</Link>}
    <Link className="login-return" href="/">← Voltar para o SPN News</Link>
  </section></main>;
}
