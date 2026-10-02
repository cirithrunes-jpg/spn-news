'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home, Menu, X, Search, Instagram } from 'lucide-react';
import { useState } from 'react';
import { socialProfiles } from '@/lib/social-profiles';
import { categories } from '@/lib/content';

export default function Header() {
 const [open,setOpen]=useState(false); const path=usePathname();
 return <><div className="demo-bar">SPN NEWS <span>O mundo pop levado a sério. Mais ou menos.</span></div><header className="site-header">
 <div className="masthead"><Link href="/" className="brand-banner" aria-label="SPN News — início. O mundo pop levado a sério. Mais ou menos."><Image src="/spn-banner" alt="SPN News — Canal Só Para Nerds" width={1200} height={400} priority unoptimized className="spn-site-banner"/></Link></div>
 <div className="nav-shell"><div className="wrap nav-tools">
 <Link href="/" className="home-tab" aria-label="Início"><Home size={19} fill="currentColor" /></Link>
 <button className="menu-button" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="main-nav" aria-label={open?'Fechar menu':'Abrir menu'}>{open?<X/>:<Menu/>}</button>
 <nav id="main-nav" className={'nav '+(open?'nav-open':'')} aria-label="Navegação principal">{categories.map(c=><Link key={c.slug} href={'/categoria/'+c.slug} className={path==='/categoria/'+c.slug?'active':''} onClick={()=>setOpen(false)}>{c.slug==='series-streaming'?'Séries':c.name}</Link>)}{['Listas','Vídeos','Podcast'].map((label,i)=><Link key={label} href={['/listas','/videos','/podcast'][i]} onClick={()=>setOpen(false)}>{label}</Link>)}</nav>
 <form action="/busca" className="nav-search"><label className="sr-only" htmlFor="header-query">Buscar no SPN</label><input id="header-query" type="search" name="q" placeholder="Busca no SPN…" maxLength={200}/><button type="submit" aria-label="Buscar"><Search size={18}/></button></form><div className="public-socials" aria-label="Redes sociais">{socialProfiles.map(profile => <a key={profile.name} href={profile.url} target="_blank" rel="noopener noreferrer" aria-label={`SPN no ${profile.name}: ${profile.handle}`}><Instagram size={18}/></a>)}</div>
 </div></div></header></>;
}
