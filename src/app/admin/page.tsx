import type { Metadata } from 'next';

export const metadata:Metadata={title:'Futuro painel editorial',robots:{index:false,follow:false}};
export default function Admin(){return <main id="conteudo" className="wrap page-space prose"><span className="eyebrow">ESTRUTURA FUTURA · SEM FUNÇÕES ATIVAS</span><h1>Nos bastidores do play<span className="orange-dot">.</span></h1><p className="lead">O ponto de partida para a redação SPN.</p><div className="demo-notice"><strong>Esta página é uma apresentação pública.</strong><p>Não há acesso administrativo, autenticação, edição ou publicação disponível neste MVP.</p></div>{[['01','Pautas e revisão','Rascunho → revisão → aprovação → publicação.'],['02','Automação editorial','Entrada de fontes, deduplicação e conferência humana antes de publicar.'],['03','Pacotes sociais','Legenda e formatos de feed, stories e postagem com link ligados à matéria.']].map(([n,t,d])=><section className="admin-module" key={n}><span>{n}</span><div><h2>{t}</h2><p>{d}</p></div><small>PLANEJADO</small></section>)}</main>}


