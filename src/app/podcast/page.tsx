import type { Metadata } from 'next';
import Link from 'next/link';
import { Mascot } from '@/components/editorial';
export const metadata: Metadata = { title: 'Podcast — em planejamento', robots: { index: false, follow: false } };
export default function Podcast() { return <main id="conteudo" className="wrap page-space prose"><span className="eyebrow">FUTURO PODCAST · NÃO DISPONÍVEL</span><h1>A conversa vai ganhar voz<span className="orange-dot">.</span></h1><div className="podcast-mascot"><Mascot /></div><p className="lead">Um espaço para cinema, séries, games e boas conversas.</p><p>Esta é a estrutura de apresentação do futuro podcast SPN. Ainda não há episódios, áudio ou feed disponível. Nenhum conteúdo demonstrativo será apresentado como uma gravação real.</p><Link href="/" className="button">Continuar explorando o SPN →</Link></main>; }
