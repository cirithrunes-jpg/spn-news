import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/header';
import { Logo } from '@/components/editorial';
import { categories } from '@/lib/content';
import { siteUrl, indexable, slogan } from '@/lib/site';
import './globals.css';
export const metadata: Metadata = {metadataBase:siteUrl,title:{default:'SPN News — aperte o play na cultura pop',template:'%s | SPN News'},description:slogan+' Portal demonstrativo de filmes, séries, games e cultura pop.',robots:{index:indexable,follow:indexable},openGraph:{type:'website',locale:'pt_BR',siteName:'SPN News',title:'SPN News',description:slogan,images:['/og.svg']},twitter:{card:'summary',title:'SPN News',description:slogan},icons:{icon:'/icon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body><a href="#conteudo" className="skip-link">Pular para conteúdo</a><Header/>{children}<footer><div className="wrap footer-top"><div><Logo/><p>{slogan}</p><span className="footer-note">Cultura pop. Contexto. Uma boa dose de humor.</span></div><div className="footer-links">{categories.map(c=><Link href={`/categoria/${c.slug}`} key={c.slug}>{c.name}</Link>)}</div><div className="footer-links"><Link href="/sobre">Sobre o SPN</Link><Link href="/sobre#transparencia">Transparência editorial</Link><Link href="/sobre#publicidade">Publicidade & afiliados</Link><Link href="/admin">Futuro painel editorial</Link></div></div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} SPN News · MVP demonstrativo</span><span>FEITO PARA QUEM NUNCA PERDE O PLAY. ▶</span></div></footer></body></html>}
