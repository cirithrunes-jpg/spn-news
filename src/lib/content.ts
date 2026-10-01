export const categories = [
  { slug: 'filmes', name: 'Filmes', code: '01', description: 'Da sala de cinema à conversa depois dos créditos.' },
  { slug: 'series-streaming', name: 'Séries & Streaming', code: '02', description: 'Um episódio só? A gente sabe como termina.' },
  { slug: 'games', name: 'Games', code: '03', description: 'Controle na mão. Curiosidade no modo multiplayer.' },
  { slug: 'musica', name: 'Música', code: '04', description: 'O volume sobe. A conversa também.' },
  { slug: 'famosos', name: 'Famosos', code: '05', description: 'Os rostos, os bastidores e as histórias da cultura pop.' },
  { slug: 'animes-hqs', name: 'Animes & HQs', code: '06', description: 'Universos que não cabem em uma dimensão.' },
  { slug: 'cultura-pop', name: 'Cultura Pop', code: '07', description: 'Tudo aquilo que faz a gente apertar o play.' },
] as const;
export type CategorySlug = typeof categories[number]['slug'];
export type Article = {slug:string; title:string; excerpt:string; category:CategorySlug; art:string; minutes:number; publishedAt:string; body:string[]; status:'demo'; social:{caption:string; formats:string[]}};
const seeds: [CategorySlug,string,string,string,string,number][] = [
 ['filmes','alem-do-ultimo-frame','Além do último frame: por que amamos voltar ao cinema','Uma viagem imaginária pelas histórias que ficam com a gente depois que a tela apaga.','cinema',5],
 ['series-streaming','so-mais-um-episodio','Só mais um episódio: a arte de uma boa maratona','Um guia demonstrativo para escolher a próxima história sem passar a noite no catálogo.','series',4],
 ['games','proxima-fase','Próxima fase: quando o jogo vira um lugar para explorar','Mundos inventados, escolhas inesperadas e a vontade de descobrir o que vem depois.','games',6],
 ['musica','lado-b','O lado B também merece estar no repeat','Uma playlist fictícia para lembrar que descobrir música é parte da diversão.','music',3],
 ['animes-hqs','fora-dos-quadros','Histórias que saltam para fora dos quadros','Dos traços ao movimento: um passeio imaginário entre quadrinhos e animação.','anime',5],
 ['famosos','por-tras-dos-holofotes','Por trás dos holofotes, uma história para contar','Como seria uma entrevista SPN: curiosidade, contexto e espaço para boas respostas.','stars',4],
 ['cultura-pop','nostalgia-apertou-play','A nostalgia apertou play. E a gente foi junto.','TV de tubo, locadora e fita rebobinada: referências antigas, conversas novas.','retro',4],
 ['filmes','creditos-finais','Os créditos subiram. A conversa está só começando.','Um modelo de crítica que separa impressão, contexto e opinião, sem spoilers.','cinema',3],
 ['games','coop','Jogar junto ainda é o melhor modo de jogo','Um exemplo de pauta sobre os encontros que acontecem do outro lado da tela.','games',4],
];
export const articles: Article[] = seeds.map(([category,slug,title,excerpt,art,minutes]) => ({category,slug,title,excerpt,art,minutes,publishedAt:'2026-01-01T12:00:00Z',status:'demo',body:[
 'Esta é uma matéria demonstrativa do SPN News. O título, a pauta e os textos foram criados para apresentar o visual e a experiência de leitura do portal. Não descrevem um acontecimento atual, um lançamento confirmado ou uma apuração jornalística.',
 'A cultura pop vive nas conversas depois do filme, no episódio que deixa uma pergunta e na música que acompanha o caminho para casa. Neste espaço, o SPN vai conectar essas referências com uma linguagem próxima e um olhar curioso.',
 'Uma matéria real terá fontes verificáveis, autoria, data de publicação e revisão editorial. Notícias, críticas e conteúdos comerciais serão identificados conforme sua natureza. Esta página apresenta apenas o modelo que receberá esse conteúdo.',
 'O mundo pop levado a sério. Mais ou menos. A proposta é ter espaço para o entusiasmo sem abrir mão do contexto: explicar o que aconteceu, por que interessa e o que ainda precisa ser confirmado.',
 ],social:{caption:`[DEMONSTRAÇÃO] ${title} — um exemplo de pacote social do SPN.`,formats:['feed-4:5','story-9:16','link-post']}}));
export const getCategory = (slug:string) => categories.find(c=>c.slug===slug);
export const getArticle = (slug:string) => articles.find(a=>a.slug===slug);
