'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { categories } from '@/lib/content';
import { Logo } from './editorial';
export default function Header(){const [open,setOpen]=useState(false);const path=usePathname();return <><div className="demo-bar">VERSÃO DEMONSTRATIVA <span>Conteúdo fictício para explorar o SPN. Nenhuma notícia atual.</span></div><header><div className="masthead wrap"><Logo/><p>O mundo pop levado a sério.<br/><strong>Mais ou menos.</strong></p><Link className="header-search" href="/busca" aria-label="Buscar no SPN"><Search size={19}/><span>Buscar no SPN</span></Link><Link href="/sobre" className="about-link">Conheça o SPN <ArrowUpRight size={16}/></Link><button className="menu-button" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="main-nav" aria-label={open?'Fechar menu':'Abrir menu'}>{open?<X/>:<Menu/>}</button></div><nav id="main-nav" className={`nav ${open?'nav-open':''}`} aria-label="Navegação principal"><div className="wrap"><Link href="/" className={path==='/'?'active':''} onClick={()=>setOpen(false)}>Início</Link>{categories.map(c=><Link key={c.slug} href={`/categoria/${c.slug}`} className={path===`/categoria/${c.slug}`?'active':''} onClick={()=>setOpen(false)}>{c.name}</Link>)}</div></nav></header></>}
