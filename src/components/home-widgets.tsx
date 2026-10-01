'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Zap, Popcorn, CalendarDays, ArrowRight } from 'lucide-react';
import { articles } from '@/lib/content';
import { releaseDemos } from '@/lib/programming';
import { Artwork, Mascot } from './editorial';

export function GiroPanel() {
  const [category, setCategory] = useState('todas');
  const filtered = articles.filter(a => category === 'todas' || a.category === category).slice(0, 5);
  return <section className="giro-panel white-panel"><div className="panel-heading"><h2><Zap fill="currentColor" />Giro SPN</h2><span className="demo-label">DEMO</span></div><div className="mini-tabs" aria-label="Filtrar Giro SPN">{[['todas', 'Todas'], ['filmes', 'Filmes'], ['series-streaming', 'Séries'], ['games', 'Games'], ['musica', 'Música']].map(([slug, name]) => <button key={slug} aria-pressed={category === slug} onClick={() => setCategory(slug)}>{name}</button>)}</div><div className="giro-list">{filtered.map((a, i) => <Link href={'/materia/' + a.slug} key={a.slug}><span className="giro-index">0{i + 1}</span><div><h3>{a.title}</h3><p>{a.excerpt}</p></div></Link>)}</div><Link className="more-link" href="/busca">VER MAIS HISTÓRIAS <ArrowRight size={15} /></Link></section>;
}

export function WatchFinder() {
  const [kind, setKind] = useState('filmes');
  const [mood, setMood] = useState('aventura');
  const [platform, setPlatform] = useState('todos');
  const [result, setResult] = useState<{ slug: string; title: string; platform: string } | null>(null);
  return <section className="watch-panel white-panel"><div className="panel-heading"><h2><Popcorn />O que assistir?</h2><span className="demo-label">DEMO</span></div><div className="watch-content"><div><p className="watch-intro">Não sabe por onde começar?<br />O SPN te ajuda!</p><form onSubmit={e => { e.preventDefault(); const article = kind === 'series-streaming' ? articles[1] : mood === 'nostalgia' ? articles[6] : articles[0]; setResult({ slug: article.slug, title: article.title, platform }); }}><label className="sr-only" htmlFor="watch-kind">Filme ou série?</label><select id="watch-kind" value={kind} onChange={e => setKind(e.target.value)}><option value="filmes">Filme ou série? · Filme</option><option value="series-streaming">Série</option></select><label className="sr-only" htmlFor="watch-platform">Catálogo demonstrativo</label><select id="watch-platform" value={platform} onChange={e => setPlatform(e.target.value)}><option value="todos">Qual catálogo? · Todos</option><option value="spn">SPN Play · fictício</option></select><label className="sr-only" htmlFor="watch-mood">Qual seu clima?</label><select id="watch-mood" value={mood} onChange={e => setMood(e.target.value)}><option value="aventura">Qual seu clima? · Aventura</option><option value="nostalgia">Nostalgia</option></select><button type="submit" className="yellow-button">ME INDICA ALGO <ArrowRight size={16} /></button></form></div><Mascot popcorn /></div>{result && <p className="watch-result" role="status">Sugestão demonstrativa{result.platform === 'spn' ? ' · SPN Play fictício' : ''}: <Link href={'/materia/' + result.slug}>{result.title} →</Link></p>}<small className="module-note">Curadoria de exemplo, sem catálogo real conectado.</small></section>;
}

export function ReleaseCalendar({ expanded = false }: { expanded?: boolean }) {
  const [category, setCategory] = useState('todos');
  const entries = releaseDemos.filter(e => category === 'todos' || e.category === category);
  return <section className={'calendar-panel white-panel ' + (expanded ? 'calendar-expanded' : '')}><div className="panel-heading"><h2><CalendarDays />Calendário de lançamentos</h2>{!expanded && <Link href="/calendario">VER COMPLETO →</Link>}</div><div className="mini-tabs" aria-label="Filtrar calendário">{[['todos', 'Todos'], ['filmes', 'Filmes'], ['series-streaming', 'Séries'], ['games', 'Games'], ['musica', 'Música']].map(([slug, name]) => <button key={slug} aria-pressed={category === slug} onClick={() => setCategory(slug)}>{name}</button>)}</div><p className="calendar-disclosure">OUTUBRO FICTÍCIO · DATAS E TÍTULOS DE EXEMPLO</p><div className="calendar-list">{entries.map(e => <div key={e.title} className="release-row"><span className="release-date">{e.day}<small>OUT</small></span><div className="release-art"><Artwork art={e.art} /></div><div><h3>{e.title}</h3><p>{e.platform}</p></div></div>)}</div></section>;
}
