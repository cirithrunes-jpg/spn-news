import { siteUrl } from '@/lib/site';

export function EditorialContact({ title, path }: { title: string; path: string }) {
  const email = process.env.EDITORIAL_CONTACT_EMAIL?.trim();
  const enabled = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const subject = encodeURIComponent(`Correção ou contestação — ${title}`);
  const body = encodeURIComponent(`Matéria: ${title}\nLink: ${new URL(path, siteUrl).href}\n\nNome e contato:\nTrecho ou imagem contestada:\nMotivo do pedido e documentos ou links que o sustentam:\n`);
  return <section className="news-context editorial-contact" aria-labelledby="editorial-contact-title"><h2 id="editorial-contact-title">Correções e direitos de imagem</h2><p>Encontrou uma informação incorreta ou deseja contestar o uso de uma imagem? Envie à redação o link desta matéria, a identificação do trecho ou da imagem e os documentos ou links que sustentam seu pedido.</p><p>O pedido será analisado. Quando necessário, poderemos corrigir o texto, substituir ou retirar a imagem, ou remover a publicação. Correções relevantes serão identificadas na matéria.</p>{enabled ? <a className="button" href={`mailto:${email}?subject=${subject}&body=${body}`}>Entrar em contato com a redação →</a> : <p><strong>Canal de contato em configuração.</strong> O recebimento de solicitações ainda não está disponível nesta versão.</p>}<small>O botão abre seu aplicativo de e-mail; este site não recebe nem armazena o pedido. Não envie senhas ou documentos pessoais desnecessários.</small></section>;
}
