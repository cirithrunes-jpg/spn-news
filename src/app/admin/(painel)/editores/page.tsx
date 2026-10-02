import Image from 'next/image';
import {requireEditor} from '@/lib/redacao';
import {editors} from '../../../../../editorial-config/editors';

export default async function Editors(){
  await requireEditor();
  return <>
    <span className="desk-eyebrow">O JEITO SPN DE CONTAR</span>
    <h1>Três vozes. Uma redação.</h1>
    <p className="desk-muted">Perfis para as assinaturas editoriais. As artes abaixo também identificam cada autor nas matérias publicadas.</p>
    <div className="desk-editor-grid">
      {editors.map(e=><section key={e.id} className="desk-card desk-editor-card">
        <div className="desk-editor-portrait">
          <Image src={e.avatar} alt={e.name} width={512} height={640} sizes="(max-width: 700px) 70vw, 220px"/>
        </div>
        <h2>{e.name}</h2>
        <span className="desk-state">{e.role}</span>
        <p>{e.publicDescription}</p>
        <p><strong>Voz:</strong> {e.voice}</p>
        <p>{e.guidance}</p>
      </section>)}
    </div>
  </>;
}
