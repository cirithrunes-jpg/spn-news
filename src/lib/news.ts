import type { CategorySlug } from './content';

export const newsEdition = '01 de outubro de 2026';
export const newsPublishedAt = '2026-10-01T14:50:30Z';
export type NewsItem = { slug: string; title: string; excerpt: string; category: CategorySlug; source: { name: string; url: string; date: string }; context: string; body: string[] };
export const news: NewsItem[] = [
  {
    slug: 'kena-scars-of-kosmora-2027', category: 'games',
    title: 'Kena: Scars of Kosmora passa para 2027',
    excerpt: 'Ember Lab anuncia mais tempo de desenvolvimento para a aventura de PS5 e PC.',
    source: { name: 'Ember Lab / PlayStation Blog', date: '2026-10-01', url: 'https://blog.playstation.com/2026/10/01/kena-scars-of-kosmora-launches-2027-ember-lab-shares-story-overview/' },
    context: 'Anúncio publicado em 1 de outubro. Lançamento previsto para 2027; dia e mês não informados.',
    body: ['A Ember Lab informou nesta quinta-feira, 1 de outubro, que Kena: Scars of Kosmora será lançado em 2027 para PS5 e PC. O estúdio diz precisar de mais tempo para aperfeiçoar a experiência, maior que a de Bridge of Spirits.', 'O comunicado também apresenta a ilha de Kosmora, onde a protagonista busca respostas sobre sua história. A aventura mantém uma estrutura linear focada nos personagens, mas promete mais possibilidades de exploração.', 'Ainda não há dia ou mês de lançamento no anúncio. Para acompanhar mudanças na previsão, consulte o comunicado oficial abaixo.'],
  },
  {
    slug: 'the-wolf-among-us-remastered-outubro', category: 'games',
    title: 'The Wolf Among Us Remastered tem lançamento anunciado para 29 de outubro',
    excerpt: 'Telltale detalha a atualização de Fabletown em publicação oficial desta quinta-feira.',
    source: { name: 'Telltale / PlayStation Blog', date: '2026-10-01', url: 'https://blog.playstation.com/2026/10/01/return-to-fabletown-with-the-wolf-among-us-remastered-out-october-29/' },
    context: 'Publicação de 1 de outubro. A data anunciada de lançamento é 29 de outubro de 2026.',
    body: ['A Telltale anunciou no PlayStation Blog que The Wolf Among Us Remastered chega em 29 de outubro. A publicação de hoje apresenta o trabalho de atualização da aventura de Bigby Wolf.', 'Segundo a equipe, a proposta preserva a história e as escolhas de direção do original, enquanto renova modelos, texturas e iluminação. A versão também inclui um modo visual em preto e branco chamado Noir Mode.', 'A data é a previsão divulgada pela empresa, e não significa que o jogo esteja disponível hoje. Detalhes de compra e disponibilidade devem ser conferidos nos canais oficiais.'],
  },
  {
    slug: 'netflix-wwe-japao-outubro', category: 'series-streaming',
    title: 'Netflix inicia nova fase da WWE no Japão nesta quinta-feira',
    excerpt: 'Acordo anunciado em setembro passa a valer em 1 de outubro e se refere ao mercado japonês.',
    source: { name: 'Netflix / About Netflix', date: '2026-09-29', url: 'https://about.netflix.com/en/news/wwe-in-japan' },
    context: 'Entrada em vigor em 1 de outubro. Comunicado publicado em 29 de setembro. Escopo: Japão.',
    body: ['A Netflix informou que passa a ser a casa da programação da WWE no Japão a partir de 1 de outubro. O comunicado foi publicado em 29 de setembro; a atualização de hoje é a entrada em vigor do acordo.', 'A seleção anunciada inclui Raw, SmackDown e NXT, eventos especiais e acervo. A empresa prevê comentários em inglês e japonês nas transmissões ao vivo.', 'Essa informação se refere ao Japão. O comunicado não anuncia uma nova mudança de catálogo para o Brasil. A programação e os horários locais estão detalhados na fonte oficial.'],
  },
];
export const getNews = (slug: string) => news.find(item => item.slug === slug);
