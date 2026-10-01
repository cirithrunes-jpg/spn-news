import type { Metadata } from 'next';
import { DailyNews } from '@/components/news';
export const metadata: Metadata = { title: 'Atualizações de 1 de outubro de 2026', alternates: { canonical: '/atualizacoes' } };
export default function Updates() { return <main id="conteudo" className="wrap page-space"><DailyNews /></main>; }
