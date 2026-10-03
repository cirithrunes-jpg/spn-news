import type { Metadata } from 'next';
import { NewsImage } from '@/components/news-image';
import { GeekQuiz } from '@/components/geek-quiz';
import { getGeekEdition } from '@/lib/geek-quiz';
import Link from 'next/link';
import { ArrowRight, Flame, Radio, Clapperboard, MonitorPlay, Gamepad2, Headphones, Star, Sparkles, Orbit, List } from 'lucide-react';
import { editionLabel, type NewsItem } from '@/lib/news';
import { publishedNews } from '@/lib/published-news';
import { publicHomeSettings } from '@/lib/home-settings';
import { categories } from '@/lib/content';
import { CategoryTag, Ad } from '@/components/editorial';
import { NewsCard } from '@/components/news';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { alternates: { canonical: '/' } };
const icons = [Clapperboard, MonitorPlay, Gamepad2, Headphones, Star, Sparkles, Orbit];
const descriptions = ['Histórias e conversas sobre cinema','Maratonas, episódios e universos','Exploração, jogos e próxima fase','Álbuns, canções e memória','Artistas e bastidores do pop','Animação, mangá e quadrinhos','Tendências, memória e curiosidades'];

function Credit({ item }: { item: NewsItem }) {
 return item.photo && <span className="photo-credit">Imagem: {item.photo.creator} · <a href={item.photo.sourceUrl} target="_blank" rel="noopener noreferrer">{item.photo.sourceName}</a></span>;
}

export default async function Home() {
 const [news,home]=await Promise.all([publishedNews(),publicHomeSettings()]);
 if(!news.length)return <main id="conteudo" className="wrap page-space"><h1>A frequência está temporariamente indisponível.</h1><p>Tente novamente em alguns instantes.</p></main>;

 const hero=news[0];
 const side=news.filter(n=>n.slug!==hero.slug).slice(0,home.side_highlights_count);
 const picks=news.filter(n=>n.kind==='opinion').slice(0,home.lists_count);

 return <main id="conteudo" className="home-page"><div className="wrap">
 <section className="hot-strip" aria-label="Seleção editorial"><strong><Flame fill="currentColor"/>NA FREQUÊNCIA!</strong>{news.slice(0,home.frequency_count).map((n,i)=><Link href={'/noticia/'+n.slug} key={n.slug}><b>{i+1}</b><span>{n.title}</span></Link>)}</section>

 <section className="hero-grid" aria-label="Destaques SPN"><div className="hero-feature"><article className="hero-main">{hero.photo&&<NewsImage className="real-hero-image" src={hero.photo.path} alt={hero.photo.alt} fill unoptimized={hero.photo.path.startsWith('https://')} priority sizes="(max-width:760px) 100vw, 800px"/>}<div className="hero-shade"/><div className="hero-content"><CategoryTag slug={hero.category}/><h1><Link href={'/noticia/'+hero.slug}>{hero.title}</Link></h1><p>{hero.excerpt}</p><Link className="yellow-button" href={'/noticia/'+hero.slug}>LEIA A MATÉRIA <ArrowRight size={20}/></Link></div></article><Credit item={hero}/></div>
 <div className="hero-side" style={{gridTemplateRows:`repeat(${Math.max(side.length,1)}, minmax(0,1fr))`}}>{side.map(n=><div className="side-item" key={n.slug}><Link href={'/noticia/'+n.slug} className="side-story">{n.photo&&<NewsImage className="real-hero-image" src={n.photo.path} alt={n.photo.alt} fill unoptimized={n.photo.path.startsWith('https://')} sizes="(max-width:760px) 100vw, 480px"/>}<div className="side-content"><CategoryTag slug={n.category}/><h2>{n.title}</h2></div></Link><Credit item={n}/></div>)}</div></section>

 <div className="real-newsroom-grid"><section className="white-panel"><div className="panel-heading"><h2><Radio/>Giro SPN</h2><Link href="/atualizacoes">VER TODOS →</Link></div><div className="giro-list">{news.slice(0,home.giro_count).map(n=><Link href={'/noticia/'+n.slug} key={n.slug}><time dateTime={n.historicalDate}>{(n.historicalDate??n.publishedAt??'').slice(5,10).split('-').reverse().join('/')}</time><div><h3>{n.title}</h3><p>{n.byline}</p></div></Link>)}</div></section>
 <GeekQuiz initialEdition={getGeekEdition()}/></div>

 <section className="editoria-section"><div className="section-heading"><h2><Flame fill="currentColor"/>Escolha sua editoria</h2><Link href="/busca">EXPLORAR TUDO →</Link></div><div className="editoria-grid">{categories.map((c,i)=>{const Icon=icons[i];return <Link href={'/categoria/'+c.slug} className="editoria-tile" key={c.slug}><Icon/><h3>{c.slug==='series-streaming'?'Séries':c.name}</h3><p>{descriptions[i]}</p></Link>})}<Link href="/listas" className="editoria-tile"><List/><h3>Listas</h3><p>Seleções com opinião e humor SPN</p></Link></div></section>

 <section className="featured-section"><div className="section-heading"><h2><Clapperboard/>Últimas edições</h2><Link href="/atualizacoes">VER O ARQUIVO →</Link></div><div className="news-grid real-card-grid">{news.slice(0,home.latest_count).map(n=><div key={n.slug}><p className="card-edition">{editionLabel(n.historicalDate??n.publishedAt!.slice(0,10))}</p><NewsCard item={n}/></div>)}</div></section>

 {!!picks.length&&<section className="featured-section"><div className="section-heading"><h2><List/>Listas para discordar com carinho</h2><Link href="/listas">VER TODAS →</Link></div><div className="news-grid real-card-grid">{picks.map(n=><NewsCard key={n.slug} item={n}/>)}</div></section>}

 <Ad/><section className="affiliate"><span className="eyebrow">ESPAÇO PARA AFILIADOS</span><h2>O seu universo também pode virar coleção.</h2><p>Área comercial reservada. Nenhuma oferta ou link de compra está ativo. Futuras comissões serão identificadas junto a cada link.</p><Link href="/sobre#publicidade">Publicidade e afiliados <ArrowRight size={16}/></Link></section>
 </div></main>;
}
