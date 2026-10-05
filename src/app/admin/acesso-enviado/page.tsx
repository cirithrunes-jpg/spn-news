import Link from 'next/link';

export default async function AccessSentPage({
  searchParams,
}: {
  searchParams: Promise<{ erro?: string }>;
}) {
  const { erro } = await searchParams;

  return <main id="conteudo" className="desk-login">
    <section className="login-box">
      <span className="desk-eyebrow">SPN NEWS · REDAÇÃO</span>
      <h1>{erro ? 'Acesso indisponível agora.' : 'Link enviado.'}</h1>
      <p className={erro ? 'desk-notice' : 'desk-success'}>
        {erro === 'config'
          ? 'O painel ainda não está conectado corretamente ao banco da redação.'
          : erro === 'envio'
            ? 'Não foi possível enviar o link agora. Tente abrir o painel novamente em instantes.'
            : 'Abra a mensagem mais recente no e-mail do administrador e toque no link. Se aparecer uma confirmação, toque em Confirmar e abrir o painel. Links anteriores podem já ter expirado.'}
      </p>
      <Link className="desk-button" href="/admin/login">Solicitar outro link →</Link>
      <Link className="login-return" href="/">← Voltar para o SPN News</Link>
    </section>
  </main>;
}
