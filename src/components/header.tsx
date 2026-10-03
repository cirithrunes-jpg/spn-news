'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Menu, X, Search, Instagram } from 'lucide-react';
import { useRef, useState } from 'react';
import { socialProfiles } from '@/lib/social-profiles';
import { categories } from '@/lib/content';

export default function Header() {
 const [openPath,setOpenPath]=useState<string|null>(null); const path=usePathname();
 const open=openPath===path; const menuButton=useRef<HTMLButtonElement>(null);
 return <><div className="demo-bar">SPN NEWS <span>O mundo pop levado a sério. Mais ou menos.</span></div><header className="site-header">
 <div className="masthead"><Link href="/" className="brand-banner" aria-label="SPN News — início. O mundo pop levado a sério. Mais ou menos."><img src="/brand/spn-news-banner.webp" alt="SPN News — Canal Só Para Nerds" width="2048" height="682" className="spn-site-banner"/></Link></div>
 <div className="nav-shell"><div className="wrap nav-tools" onKeyDown={event=>{if(event.key==='Escape'&&open){setOpenPath(null);menuButton.current?.focus();}}}>
 <Link href="/" className="home-tab" aria-label="Início"><Home size={19} fill="currentColor" /></Link>
 <button ref={menuButton} type="button" className="menu-button" onClick={()=>setOpenPath(open?null:path)} aria-expanded={open} aria-controls="main-nav" aria-label={open?'Fechar menu':'Abrir menu'}>{open?<X/>:<Menu/>}</button>
 <nav id="main-nav" className={'nav '+(open?'nav-open':'')} aria-label="Navegação principal">{categories.map(c=><Link key={c.slug} href={'/categoria/'+c.slug} className={path==='/categoria/'+c.slug?'active':''} aria-current={path==='/categoria/'+c.slug?'page':undefined} onClick={()=>setOpenPath(null)}>{c.slug==='series-streaming'?'Séries':c.name}</Link>)}{['Listas','Vídeos','Podcast'].map((label,i)=>{const href=['/listas','/videos','/podcast'][i];return <Link key={label} href={href} aria-current={path===href?'page':undefined} onClick={()=>setOpenPath(null)}>{label}</Link>})}</nav>
 <form action="/busca" className="nav-search"><label className="sr-only" htmlFor="header-query">Buscar no SPN</label><input id="header-query" type="search" name="q" placeholder="Busca no SPN…" maxLength={200}/><button type="submit" aria-label="Buscar"><Search size={18}/></button></form><div className="public-socials" aria-label="Redes sociais">{socialProfiles.map(profile => <a key={profile.name} href={profile.url} target="_blank" rel="noopener noreferrer" aria-label={`SPN no ${profile.name}: ${profile.handle}`}><Instagram size={18}/></a>)}</div>
 </div></div></header></>;
}
