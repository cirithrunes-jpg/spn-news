import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/header';
import PublicShell from '@/components/public-shell';
import { Logo } from '@/components/editorial';
import { categories } from '@/lib/content';
import { siteUrl, indexable, slogan } from '@/lib/site';
import './globals.css';
import './reference.css';
export const metadata: Metadata = {metadataBase:siteUrl,title:{default:'SPN News — aperte o play na cultura pop',template:'%s | SPN News'},description:slogan+' Notícias, memória e opinião sobre filmes, séries, games e cultura pop.',robots:{index:indexable,follow:indexable},openGraph:{type:'website',locale:'pt_BR',siteName:'SPN News',title:'SPN News',description:slogan,images:['/og.svg']},twitter:{card:'summary',title:'SPN News',description:slogan},icons:{icon:'/icon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body><PublicShell header={<><a href="#conteudo" className="skip-link">Pular para conteúdo</a><Header/></>} footer={<footer><div className="wrap footer-top"><div><Logo/><p>{slogan}</p><span className="footer-note">Cultura pop. Contexto. Uma boa dose de humor.</span></div><div className="footer-links">{categories.map(c=><Link href={`/categoria/${c.slug}`} key={c.slug}>{c.name}</Link>)}</div><div className="footer-links"><Link href="/sobre">Sobre o SPN</Link><Link href="/sobre#transparencia">Transparência editorial</Link><Link href="/sobre#publicidade">Publicidade & afiliados</Link><Link href="/atualizacoes">Arquivo de matérias</Link></div></div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} SPN News</span><span>FEITO PARA QUEM NUNCA PERDE O PLAY. ▶</span></div></footer>}>{children}</PublicShell></body></html>}

