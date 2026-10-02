import { requireEditor } from '@/lib/redacao';
import { saveHomeLayout } from '../actions';

export default async function HomeLayoutSettings({searchParams}:{searchParams:Promise<{salvo?:string}>}) {
 const {client}=await requireEditor();
 const {data}=await client.from('spn_home_settings').select('*').eq('id',true).single();
 const params=await searchParams;
 const settings=data??{frequency_count:5,side_highlights_count:3,giro_count:6,latest_count:6,lists_count:6};
 return <>
  <span className="desk-eyebrow">VITRINE DO SPN</span>
  <h1>Tela inicial.</h1>
  <p className="desk-muted">Escolha quantas matérias aparecem em cada bloco da Home. O destaque principal continua sendo a matéria publicada mais recente.</p>
  {params.salvo&&<p className="desk-toast" role="status">Tela inicial atualizada.</p>}
  <form action={saveHomeLayout} className="desk-form">
   <section className="desk-card home-layout-settings">
    <h2>Quantidade de posts por destaque</h2>
    <p className="desk-muted">Você pode mudar estes números quando quiser. A alteração entra na página inicial sem precisar editar o código.</p>
    <div className="desk-form-grid">
     <label>NA FREQUÊNCIA!<input type="number" name="frequency_count" min={1} max={12} defaultValue={settings.frequency_count}/><small>Faixa de chamadas no topo.</small></label>
     <label>Destaques laterais<input type="number" name="side_highlights_count" min={1} max={6} defaultValue={settings.side_highlights_count}/><small>Cards ao lado da matéria principal.</small></label>
     <label>Giro SPN<input type="number" name="giro_count" min={1} max={12} defaultValue={settings.giro_count}/><small>Lista rápida de notícias.</small></label>
     <label>Últimas edições<input type="number" name="latest_count" min={1} max={12} defaultValue={settings.latest_count}/><small>Grade de matérias recentes.</small></label>
     <label>Listas para discordar<input type="number" name="lists_count" min={1} max={12} defaultValue={settings.lists_count}/><small>Posts de opinião e listas.</small></label>
    </div>
    <div className="home-layout-preview" aria-hidden="true">
      <div className="preview-frequency"/>
      <div className="preview-hero"><span/><i/><i/></div>
      <div className="preview-row"><span/><span/><span/></div>
    </div>
    <button className="desk-button" type="submit">Salvar tela inicial</button>
   </section>
  </form>
 </>;
}
