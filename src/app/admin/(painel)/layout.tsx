import Link from 'next/link';
import { LayoutDashboard, CalendarDays, FilePenLine, Users, Bot, ArrowUpRight, LogOut, Radio } from 'lucide-react';
import { requireEditor } from '@/lib/redacao';
import { logout } from '../auth/actions';
const links = [ ['Visão geral', '/admin', LayoutDashboard], ['Matérias', '/admin/materias', FilePenLine], ['Calendário', '/admin/calendario', CalendarDays], ['Editores', '/admin/editores', Users], ['Automação', '/admin/automacao', Bot] ] as const;
export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireEditor();
  return <div className="desk"><aside className="desk-sidebar"><Link href="/admin" className="desk-brand"><span className="desk-play">▶</span><span>SPN<span className="desk-orange">NEWS</span><small>PAINEL DA REDAÇÃO</small></span></Link><div className="desk-private"><Radio size={14}/> ACESSO INTERNO</div><nav aria-label="Redação">{links.map(([label, href, Icon]) => <Link href={href} key={href}><Icon size={19}/>{label}</Link>)}</nav><div className="desk-sidebar-bottom"><Link href="/" target="_blank"><ArrowUpRight size={17}/> Abrir site</Link><form action={logout}><button><LogOut size={17}/> Sair da redação</button></form></div></aside><div className="desk-main"><header className="desk-top"><span><i/> REDAÇÃO NO PLAY</span><Link className="desk-button" href="/admin/materias/nova">+ Nova matéria</Link></header><main id="conteudo" className="desk-content">{children}</main><div className="desk-bottom">SPN News · O mundo pop levado a sério. Mais ou menos.</div></div></div>;
}
