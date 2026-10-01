'use client';
export default function EditorialError({reset}:{reset:()=>void}){return <section className="desk-card"><h1>A mesa ficou indisponível.</h1><p>Não foi possível carregar a redação agora. Seu conteúdo salvo permanece no banco.</p><button className="desk-button" onClick={reset}>Tentar novamente</button></section>;}
