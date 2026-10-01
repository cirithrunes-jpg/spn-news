import type { Metadata } from 'next';
import { ReleaseCalendar } from '@/components/home-widgets';
export const metadata: Metadata = { title: 'Calendário demonstrativo', robots: { index: false, follow: false } };
export default function Calendar() { return <main id="conteudo" className="wrap page-space"><div className="category-heading"><span className="eyebrow">EXEMPLO DE EXPERIÊNCIA · SEM LANÇAMENTOS REAIS</span><h1>Reserve um espaço na agenda<span className="orange-dot">.</span></h1><p>Todos os títulos, serviços e datas abaixo são fictícios. Use os filtros para explorar o modelo do calendário.</p></div><ReleaseCalendar expanded /></main>; }
