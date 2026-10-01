import { requireEditor } from '@/lib/redacao';
import { publishedNews } from '@/lib/published-news';
import { siteUrl } from '@/lib/site';
import SocialComposer from './social-composer';
export default async function SocialPage() {
  await requireEditor();
  const articles = (await publishedNews()).map(({ slug, title, excerpt, byline, photo }) => ({ slug, title, excerpt, byline, image: photo?.path, imageCredit: photo?.creator }));
  return <><span className="desk-eyebrow">DISTRIBUIÇÃO · SPN NEWS</span><h1>Redes sociais</h1><p className="desk-muted">Prepare a chamada de cada reportagem antes de compartilhar nos perfis oficiais.</p><div className="desk-notice">Publicação manual. O Instagram já está disponível. Para publicar automaticamente, ainda é necessário autorizar a integração da conta.</div><SocialComposer articles={articles} baseUrl={siteUrl.origin}/></>;
}

