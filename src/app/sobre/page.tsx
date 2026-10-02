import type { Metadata } from 'next';

export const metadata:Metadata={title:'Sobre e transparência',alternates:{canonical:'/sobre'}};

export default function About(){
  return <main id="conteudo" className="wrap page-space prose">
    <span className="eyebrow">SÓ PARA QUEM AMA CULTURA POP</span>
    <h1>Prazer, SPN<span className="orange-dot">.</span></h1>
    <p className="lead">O mundo pop levado a sério. Mais ou menos.</p>

    <h2>Quem somos</h2>
    <p>O SPN nasceu em 2015 como o <strong>Canal Só Para Nerds</strong>, criado por Fernando no YouTube para falar de cultura pop do jeito que fã gosta: com paixão, opinião e espaço para uma boa zoeira.</p>
    <p>Com o tempo, o projeto cresceu e deixou de caber em um único canal. Hoje, o SPN está presente em diferentes frentes, com conteúdo para <strong>YouTube, site, Instagram e TikTok</strong>, acompanhando filmes, séries, games, música, quadrinhos, anime e tudo aquilo que rende uma boa conversa entre nerds.</p>
    <p>Fernando, hoje conhecido entre os amigos como o <strong>“Coroa Geek”</strong>, chega a esta nova fase com mais experiência, mais histórias para contar e a mesma vontade de comentar tudo o que assiste. A diferença é que agora entram também alguns anos a mais de repertório, uma boa dose de ironia e aquele humor de quem já viu muito hype nascer, dominar a internet e desaparecer na semana seguinte.</p>
    <p>O SPN é isso: cultura pop feita por quem acompanha esse universo há anos, sem fingir que tudo precisa ser levado a sério o tempo todo.</p>

    <h2 id="transparencia">Transparência editorial</h2>
    <p>O portal publica notícias, colunas e listas com apoio de IA, fontes identificadas, edição de referência e data efetiva de publicação. As assinaturas seguem as vozes editoriais definidas pelo SPN. Comentários e rankings próprios são opinião editorial. Declarações obtidas em publicações externas são atribuídas às fontes; não representam entrevistas realizadas pelo SPN.</p>
    <p>A estrutura futura prevê pautas, fontes verificadas, revisão humana, autoria, histórico de alterações e correções. A automação deverá auxiliar o trabalho editorial; a publicação dependerá de aprovação.</p>

    <h2 id="publicidade">Publicidade e afiliados</h2>
    <p>Os espaços comerciais estão identificados. Nenhuma campanha, oferta ou link afiliado está ativo. Conteúdos patrocinados e links que possam gerar comissão deverão receber avisos próximos ao conteúdo, antes de sua ativação.</p>

    <h2>Privacidade</h2>
    <p>O portal não inclui analytics, cookies publicitários, cadastro ou formulários de coleta de dados. A infraestrutura de hospedagem pode processar registros técnicos de acesso conforme as políticas do provedor. Uma política completa deverá ser preparada antes de ativar serviços que tratem dados pessoais.</p>
  </main>;
}
