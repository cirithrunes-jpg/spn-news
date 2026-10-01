import type { Metadata } from 'next';
import { DailyNews } from '@/components/news';
export const metadata: Metadata = { title: 'Teste histórico · 1 de setembro de 2026', alternates: { canonical: '/atualizacoes' } };
export default function Updates() { return <main id="conteudo" className="wrap page-space"><DailyNews /></main>; }
