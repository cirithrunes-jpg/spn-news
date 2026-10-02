import type { NewsItem, NewsPhoto } from './news';

const promo = (
  path: string,
  alt: string,
  caption: string,
  creator: string,
  sourceUrl: string,
  sourceName: string,
  width = 1600,
  height = 900
): NewsPhoto => ({
  path,
  width,
  height,
  alt,
  caption,
  creator,
  sourceUrl,
  originalUrl: path,
  license: 'Material promocional/editorial — direitos reservados',
  licenseUrl: sourceUrl,
  sourceName,
  rightsReserved: true
});

export const starWarsWatts: NewsItem = {
  slug: 'star-wars-jon-watts-skywalker-de-novo',
  title: 'Star Wars achou um lugar novo na galáxia: a família Skywalker de novo?',
  excerpt: 'Jon Watts está ligado ao próximo filme, Simon Kinberg escreve o roteiro e relatos falam em Rey. Calma: parte disso ainda não foi oficializada pela Lucasfilm.',
  category: 'filmes',
  kind: 'news',
  byline: 'Fernando Valerious',
  historicalDate: '2026-10-02',
  publishedAt: '2026-10-02T15:08:00Z',
  modifiedAt: '2026-10-02T15:08:00Z',
  context: 'Notícia publicada em 2 de outubro de 2026. O envolvimento de Jon Watts e Simon Kinberg foi reportado pela Variety. A ligação direta com uma nova saga Skywalker e um possível retorno de Rey aparece em relatos da imprensa e deve ser tratada como informação ainda não oficializada pela Lucasfilm.',
  source: {
    name: 'Variety — Jon Watts to Direct Next Star Wars Movie',
    url: 'https://au.variety.com/2026/film/global/jon-watts-to-direct-star-wars-40762/',
    date: '2026-09-28'
  },
  sources: [
    {
      name: 'Variety — Jon Watts to Direct Next Star Wars Movie',
      url: 'https://au.variety.com/2026/film/global/jon-watts-to-direct-star-wars-40762/',
      date: '2026-09-28',
      note: 'Confirma o projeto em desenvolvimento com Jon Watts e roteiro de Simon Kinberg.'
    },
    {
      name: 'The Guardian — report on a possible new Skywalker trilogy',
      url: 'https://www.theguardian.com/film/2026/oct/02/new-skywalker-trilogy-star-wars-jon-watts',
      date: '2026-10-02',
      note: 'Relata possível conexão com os Skywalker e interesse em Daisy Ridley; esses pontos ainda não são anúncio oficial da Lucasfilm.'
    }
  ],
  photo: promo(
    'https://images-r2-1.thebrag.com/var/uploads/2026/09/GettyImages-2187954772-910x511.jpg',
    'Jon Watts em evento da Disney',
    'Jon Watts está ligado ao próximo filme de Star Wars atualmente em desenvolvimento.',
    'Getty Images for Disney / Variety',
    'https://au.variety.com/2026/film/global/jon-watts-to-direct-star-wars-40762/',
    'Variety',
    910, 511
  ),
  inlinePhotos: [
    {
      ...promo(
        'https://lumiere-a.akamaihd.net/v1/images/rey-main_ca4bb0d7.jpeg?region=180%2C0%2C951%2C536&width=1280',
        'Rey na saga Star Wars',
        'Rey, personagem de Daisy Ridley, aparece nos relatos sobre o projeto — mas seu retorno ainda não foi anunciado oficialmente.',
        'Lucasfilm',
        'https://www.starwars.com/databank/rey',
        'StarWars.com',
        1280, 720
      ),
      afterParagraph: 2
    },
    {
      ...promo(
        'https://lumiere-a.akamaihd.net/v1/images/the-rise-of-skywalker-rey-history-02_e42337c1.jpeg?region=0%2C0%2C1280%2C536',
        'Rey em Star Wars: A Ascensão Skywalker',
        'A última aparição cinematográfica de Rey foi em A Ascensão Skywalker, de 2019.',
        'Lucasfilm',
        'https://www.starwars.com/databank/rey',
        'StarWars.com',
        1280, 536
      ),
      afterParagraph: 4
    }
  ],
  body: [
    'A galáxia muito, muito distante ganhou mais um projeto no mapa. A Variety informa que Jon Watts, diretor da trilogia de Homem-Aranha com Tom Holland e cocriador de Skeleton Crew, está ligado a um novo filme de Star Wars. Simon Kinberg trabalha no roteiro.',
    'A parte que acendeu o sabre de luz da internet veio depois: relatos desta semana falam em uma possível continuação ligada à família Skywalker e citam Daisy Ridley como nome em consideração para voltar como Rey. Isso ainda não equivale a anúncio oficial da Lucasfilm — e o filme nem recebeu sinal verde público.',
    'Vale lembrar que, quando o projeto de Kinberg começou a circular em 2024, a própria Lucasfilm contestou a ideia de que ele necessariamente continuaria a história dos Skywalker. Então, por enquanto, o sabre mais importante aqui é o da cautela.',
    'Dito isso: é impossível não rir. Star Wars tem uma galáxia com bilhões de habitantes, planetas inteiros e séculos de história. Mesmo assim, a árvore genealógica Skywalker segue aparecendo como aquele grupo de família que ninguém consegue silenciar.'
  ]
};

export const mummyFour: NewsItem = {
  slug: 'a-mumia-4-brendan-fraser-rachel-weisz-voltaram',
  title: 'Brendan Fraser e Rachel Weisz voltaram: o verdadeiro CGI de A Múmia 4 era a saudade',
  excerpt: 'Rick e Evelyn estão juntos de novo, as filmagens já começaram e Hollywood finalmente testou uma tecnologia revolucionária: chamar os atores que a gente queria.',
  category: 'filmes',
  kind: 'news',
  byline: 'Ruby Dias',
  historicalDate: '2026-10-02',
  publishedAt: '2026-10-02T15:07:00Z',
  modifiedAt: '2026-10-02T15:07:00Z',
  context: 'Matéria publicada em 2 de outubro de 2026 com base em informações e fotos de set divulgadas pela People. O filme está em produção na Inglaterra e tem estreia marcada para 15 de outubro de 2027.',
  source: {
    name: 'People — All About The Mummy 4',
    url: 'https://people.com/all-about-the-mummy-4-12147718',
    date: '2026-10-01'
  },
  sources: [
    {
      name: 'People — All About The Mummy 4',
      url: 'https://people.com/all-about-the-mummy-4-12147718',
      date: '2026-10-01',
      note: 'Elenco, direção, filmagens e data de estreia.'
    }
  ],
  photo: promo(
    'https://people.com/thmb/Xsa2M_aPvURTbTv3O6kZhzYVw-M%3D/1500x0/filters%3Ano_upscale%28%29%3Amax_bytes%28150000%29%3Astrip_icc%28%29%3Afocal%28749x0%3A751x2%29%3Aformat%28webp%29/rachel-weisz-the-mummy-filming-092826-83b77de9d1c846d8be34d2deb3441128.jpg',
    'Rachel Weisz caracterizada como Evelyn nas filmagens de A Múmia 4',
    'Rachel Weisz voltou ao papel de Evelyn O’Connell nas filmagens do novo A Múmia.',
    'Click News and Media / BACKGRID',
    'https://people.com/all-about-the-mummy-4-12147718',
    'People',
    1500, 1000
  ),
  inlinePhotos: [
    {
      ...promo(
        'https://people.com/thmb/jw_g5er0Q8WKr9HWQyZ87IQ4I_c%3D/4000x0/filters%3Ano_upscale%28%29%3Amax_bytes%28150000%29%3Astrip_icc%28%29%3Afocal%28749x0%3A751x2%29%3Aformat%28webp%29/Brendan-Fraser-filming-new-Mummy-movie-6-0594047ae14c49cc9153ad1454b1db23.jpg',
        'Brendan Fraser nas filmagens de A Múmia 4',
        'Brendan Fraser retorna como Rick O’Connell.',
        'Click News and Media / BACKGRID',
        'https://people.com/all-about-the-mummy-4-12147718',
        'People',
        1500, 1000
      ),
      afterParagraph: 2
    },
    {
      ...promo(
        'https://people.com/thmb/uUmlL3K8nZPk0RkPqmb1hxR6U8Q%3D/4000x0/filters%3Ano_upscale%28%29%3Amax_bytes%28150000%29%3Astrip_icc%28%29%3Afocal%28750x295%3A752x297%29%3Aformat%28webp%29/the-mummy-brendan-fraser-rachel-weisz-110525-1513b73ac01b4d47a193b1241c226d60.jpg',
        'Brendan Fraser e Rachel Weisz no filme A Múmia',
        'A dupla virou uma das marcas da fase clássica da franquia.',
        'Universal / arquivo editorial',
        'https://people.com/all-about-the-mummy-4-12147718',
        'People',
        1500, 844
      ),
      afterParagraph: 4
    }
  ],
  body: [
    'É oficial: Brendan Fraser e Rachel Weisz estão juntos novamente como Rick e Evelyn O’Connell. Os dois foram fotografados nas filmagens de A Múmia 4 na Inglaterra, marcando a primeira reunião da dupla nesses papéis desde O Retorno da Múmia, de 2001.',
    'John Hannah, Oded Fehr e Kevin J. O’Connor também estão entre os nomes que retornam. Matt Bettinelli-Olpin e Tyler Gillett dirigem, David Coggeshall assina o roteiro e a estreia está marcada para 15 de outubro de 2027.',
    'A história continua guardada no sarcófago: os detalhes oficiais da trama ainda não foram revelados. Então qualquer “sinopse vazada” que aparecer por aí merece a mesma confiança de um arqueólogo dizendo “pode abrir essa tumba, vai dar tudo certo”.',
    'Por enquanto, a notícia é simples e linda: Hollywood descobriu uma tecnologia revolucionária chamada “ligar para os atores que o público queria”. Nem precisou de inteligência artificial. Só de agenda.'
  ]
};

export const ps5Qssr: NewsItem = {
  slug: 'ps5-qssr-ia-upscaling-sony',
  title: 'Sony colocou IA no PS5. Agora só falta ela explicar por que eu continuo ruim',
  excerpt: 'O QSSR leva upscaling por IA ao PS5 base e estreia em Wolverine e Ghost of Yōtei. A imagem fica mais estável; o seu parry continua sendo responsabilidade sua.',
  category: 'games',
  kind: 'news',
  byline: 'Adailton Jr.',
  historicalDate: '2026-10-02',
  publishedAt: '2026-10-02T15:06:00Z',
  modifiedAt: '2026-10-02T15:06:00Z',
  context: 'Notícia baseada no anúncio oficial da Sony Interactive Entertainment de 1º de outubro de 2026.',
  source: {
    name: 'PlayStation Blog — AI upscaling is coming to PS5',
    url: 'https://blog.playstation.com/2026/10/01/ai-upscaling-is-coming-to-ps5/',
    date: '2026-10-01'
  },
  sources: [
    {
      name: 'PlayStation Blog — AI upscaling is coming to PS5',
      url: 'https://blog.playstation.com/2026/10/01/ai-upscaling-is-coming-to-ps5/',
      date: '2026-10-01',
      note: 'Anúncio oficial do QSSR e dos primeiros jogos compatíveis.'
    }
  ],
  photo: promo(
    'https://blog.playstation.com/tachyon/2026/10/5f2b04388e41b48507f4c8d57ce8f53bd059f03a.jpg?crop_strategy=smart&resize=1088%2C612',
    'Imagem oficial do anúncio de QSSR no PS5',
    'O QSSR é a nova camada de upscaling por IA anunciada para o PS5.',
    'Sony Interactive Entertainment',
    'https://blog.playstation.com/2026/10/01/ai-upscaling-is-coming-to-ps5/',
    'PlayStation Blog',
    1088, 612
  ),
  inlinePhotos: [
    {
      ...promo(
        'https://i.ytimg.com/vi/RcFYsDKbAIk/maxresdefault.jpg',
        'Demonstração oficial de QSSR em Marvel’s Wolverine',
        'Marvel’s Wolverine está entre os primeiros títulos com suporte ao QSSR.',
        'Sony Interactive Entertainment / Insomniac Games',
        'https://blog.playstation.com/2026/10/01/ai-upscaling-is-coming-to-ps5/',
        'PlayStation Blog',
        1280, 720
      ),
      afterParagraph: 2
    },
    {
      ...promo(
        'https://i.ytimg.com/vi/E929-XwrS_Q/maxresdefault.jpg',
        'Demonstração oficial de QSSR em Ghost of Yōtei',
        'Ghost of Yōtei também recebeu suporte à nova tecnologia.',
        'Sony Interactive Entertainment / Sucker Punch Productions',
        'https://blog.playstation.com/2026/10/01/ai-upscaling-is-coming-to-ps5/',
        'PlayStation Blog',
        1280, 720
      ),
      afterParagraph: 4
    }
  ],
  body: [
    'A Sony anunciou o Quick Spectral Super Resolution, ou QSSR, uma nova solução de upscaling por inteligência artificial para o PS5 base. A tecnologia nasceu do Project Amethyst, parceria de pesquisa gráfica da PlayStation com a AMD.',
    'Em português de gente: o console usa IA para reconstruir detalhes e tentar entregar uma imagem mais limpa e estável sem depender apenas de renderizar tudo na resolução final. O PSSR continua sendo a solução mais avançada do PS5 Pro; o QSSR é a versão feita para caber no PS5 comum.',
    'Marvel’s Wolverine e Ghost of Yōtei são os dois primeiros jogos anunciados com a biblioteca e receberam atualização para oferecer a opção gráfica.',
    'Resumo SPN: mais nitidez, mais estabilidade, mais siglas para decorar. Agora, se você errar o mesmo comando pela décima vez, não adianta culpar o pixel. A IA lavou as mãos.'
  ]
};

export const wolverineQssr: NewsItem = {
  slug: 'marvels-wolverine-qssr-ia-grafica',
  title: 'Wolverine ganhou IA gráfica. Logan continua usando o recurso clássico: cara fechada',
  excerpt: 'O jogo da Insomniac está entre os primeiros a usar QSSR no PS5, com promessa de mais clareza e estabilidade visual.',
  category: 'games',
  kind: 'news',
  byline: 'Adailton Jr.',
  historicalDate: '2026-10-02',
  publishedAt: '2026-10-02T15:05:00Z',
  modifiedAt: '2026-10-02T15:05:00Z',
  context: 'Matéria publicada após a Sony anunciar Marvel’s Wolverine como um dos primeiros jogos compatíveis com QSSR no PS5.',
  source: {
    name: 'PlayStation Blog — AI upscaling is coming to PS5',
    url: 'https://blog.playstation.com/2026/10/01/ai-upscaling-is-coming-to-ps5/',
    date: '2026-10-01'
  },
  sources: [
    {
      name: 'PlayStation Blog — AI upscaling is coming to PS5',
      url: 'https://blog.playstation.com/2026/10/01/ai-upscaling-is-coming-to-ps5/',
      date: '2026-10-01',
      note: 'A Insomniac detalha os ganhos esperados de clareza e estabilidade com QSSR.'
    }
  ],
  photo: promo(
    'https://blog.playstation.com/tachyon/2028/09/21072d2c0c79f076f7e8021c619da5d0708d1ee7-scaled.jpg?crop_strategy=smart&resize=1088%2C612',
    'Marvel’s Wolverine em imagem oficial',
    'Marvel’s Wolverine está entre os primeiros títulos do PS5 com QSSR.',
    'Insomniac Games / Sony Interactive Entertainment',
    'https://blog.playstation.com/2026/10/01/ai-upscaling-is-coming-to-ps5/',
    'PlayStation Blog',
    1088, 612
  ),
  inlinePhotos: [
    {
      ...promo(
        'https://blog.playstation.com/tachyon/2026/07/64aab9113b761b758ab61bf8efd60337f9b2bffa.jpg?crop_strategy=smart&resize=1088%2C612',
        'Logan em Marvel’s Wolverine',
        'A Insomniac diz que o QSSR ajuda a preservar detalhes em ambientes mais carregados.',
        'Insomniac Games / Sony Interactive Entertainment',
        'https://blog.playstation.com/2026/10/01/ai-upscaling-is-coming-to-ps5/',
        'PlayStation Blog',
        1088, 612
      ),
      afterParagraph: 2
    },
    {
      ...promo(
        'https://blog.playstation.com/tachyon/2026/07/422713c21cdd6fdb73e0900f24a0c47ba516c873.jpg',
        'Arte oficial de Marvel’s Wolverine',
        'O jogo recebeu suporte à nova opção gráfica no PS5.',
        'Insomniac Games / Sony Interactive Entertainment',
        'https://blog.playstation.com/2026/10/01/ai-upscaling-is-coming-to-ps5/',
        'PlayStation Blog',
        1920, 1080
      ),
      afterParagraph: 4
    }
  ],
  body: [
    'Marvel’s Wolverine virou uma das primeiras vitrines do QSSR, a nova tecnologia de upscaling por IA do PS5. A atualização chegou junto com o anúncio da Sony e adiciona a nova opção gráfica ao jogo.',
    'Segundo a Insomniac, a tecnologia ajuda na clareza de detalhes e na estabilidade da imagem em cenários mais movimentados. É o tipo de melhoria que aparece menos como “efeito UAU piscando na tela” e mais como uma imagem que segura melhor os detalhes enquanto o jogo acontece.',
    'O interessante é que o QSSR não substitui o PSSR do PS5 Pro. Ele é uma alternativa mais leve criada justamente para levar parte desse ganho ao PS5 base.',
    'Ou seja: a Sony melhora os pixels, a Insomniac melhora a imagem e Logan continua contribuindo com sua especialidade histórica — parecer que alguém falou com ele antes do café.'
  ]
};

export const aceCombatEight: NewsItem = {
  slug: 'ace-combat-8-lancamento-2-outubro',
  title: 'Ace Combat 8 decola hoje — e pelo menos aqui ninguém cobra pela mala',
  excerpt: 'Wings of Theve chega em 2 de outubro para PS5, Xbox Series X|S e PC, sete anos depois do último capítulo principal.',
  category: 'games',
  kind: 'news',
  byline: 'Adailton Jr.',
  historicalDate: '2026-10-02',
  publishedAt: '2026-10-02T15:04:00Z',
  modifiedAt: '2026-10-02T15:04:00Z',
  context: 'Notícia de lançamento publicada em 2 de outubro de 2026. O texto trata apenas dos recursos gerais e da proposta ficcional do jogo.',
  source: {
    name: 'PlayStation Blog — Ace Combat 8 launches globally October 2',
    url: 'https://blog.playstation.com/?p=419151',
    date: '2026-06-02'
  },
  sources: [
    {
      name: 'PlayStation Blog — Ace Combat 8 launches globally October 2',
      url: 'https://blog.playstation.com/?p=419151',
      date: '2026-06-02',
      note: 'Data de lançamento e visão geral oficial.'
    },
    {
      name: 'Bandai Namco — Ace Combat 8: Wings of Theve Takes Flight This October',
      url: 'https://www.bandainamcoent.com/news/ace-combat-8-wings-of-theve-takes-flight-this-october',
      date: '2026-06-02',
      note: 'Plataformas, desenvolvimento e tecnologia.'
    }
  ],
  photo: promo(
    'https://blog.playstation.com/tachyon/2028/09/ff75fce50bd7e91554f237fa73e39219fe600cbb.png?crop_strategy=smart&resize=1088%2C612',
    'Ace Combat 8: Wings of Theve em imagem oficial',
    'Ace Combat 8: Wings of Theve chega nesta sexta-feira, 2 de outubro.',
    'Bandai Namco Entertainment',
    'https://blog.playstation.com/?p=419151',
    'PlayStation Blog',
    1088, 612
  ),
  inlinePhotos: [
    {
      ...promo(
        'https://i.ytimg.com/vi/MAYvqfhptME/maxresdefault.jpg',
        'Imagem do trailer oficial de Ace Combat 8: Wings of Theve',
        'O novo capítulo retorna ao universo ficcional de Strangereal.',
        'Bandai Namco Entertainment',
        'https://blog.playstation.com/2026/09/25/how-ace-combat-8-wings-of-theve-uses-first-person-to-tell-a-more-personal-story/',
        'PlayStation Blog',
        1280, 720
      ),
      afterParagraph: 2
    }
  ],
  body: [
    'Ace Combat 8: Wings of Theve chega hoje, 2 de outubro, para PS5, Xbox Series X|S e PC. É o primeiro capítulo principal da série em sete anos e foi desenvolvido pela Bandai Namco Aces.',
    'O jogo volta ao universo ficcional de Strangereal e aposta numa campanha mais próxima dos personagens, com cenas em primeira pessoa e maior foco no convívio da equipe entre as missões. A produção combina Unreal Engine 5 com tecnologia própria do estúdio.',
    'Também há multiplayer com cross-play, enquanto a campanha tenta dar mais peso às relações entre os personagens — um caminho diferente de simplesmente transformar tudo numa sucessão de fases desconectadas.',
    'E a vantagem mais importante, segundo o departamento científico do SPN: depois de horas no céu virtual, ainda não apareceu nenhuma tela cobrando taxa para despachar mala.'
  ]
};

export const rubberSoulEdition: NewsItem = {
  slug: 'beatles-rubber-soul-edicao-especial-2026',
  title: 'Rubber Soul ganhou edição nova porque aparentemente os Beatles ainda têm DLC',
  excerpt: 'O clássico de 1965 retorna com nova mixagem, Dolby Atmos, mono original, demos e gravações de sessão. A banda acabou; o conteúdo extra não recebeu o memorando.',
  category: 'musica',
  kind: 'news',
  byline: 'Fernando Valerious',
  historicalDate: '2026-10-02',
  publishedAt: '2026-10-02T15:03:00Z',
  modifiedAt: '2026-10-02T15:03:00Z',
  context: 'Notícia baseada no anúncio oficial dos Beatles e da Apple Corps para o lançamento mundial da edição especial em 2 de outubro de 2026.',
  source: {
    name: 'The Beatles — Rubber Soul Released as Expanded Special Edition',
    url: 'https://www.thebeatles.com/landmark-album-rubber-soul-released-expanded-special-edition',
    date: '2026-10-02'
  },
  sources: [
    {
      name: 'The Beatles — Rubber Soul Released as Expanded Special Edition',
      url: 'https://www.thebeatles.com/landmark-album-rubber-soul-released-expanded-special-edition',
      date: '2026-10-02',
      note: 'Detalhes oficiais da nova edição.'
    }
  ],
  photo: promo(
    'https://www.thebeatles.com/sites/default/files/styles/max_2600x2600/public/2026-07/1LP_Beatles_Rubber%20Soul_Packshot.jpg?itok=Erl0JN-6',
    'Capa da edição especial de Rubber Soul',
    'Rubber Soul volta em edição expandida nesta sexta-feira.',
    'Apple Corps Ltd. / Universal Music Group',
    'https://www.thebeatles.com/landmark-album-rubber-soul-released-expanded-special-edition',
    'The Beatles',
    1200, 1200
  ),
  inlinePhotos: [
    {
      ...promo(
        'https://usastore.thebeatles.com/cdn/shop/files/07_BEA-00052_5LPBOXSETD2C_02331.png?v=1785323636&width=900',
        'Box e material da edição especial de Rubber Soul',
        'A edição Super Deluxe reúne discos, livro e material de arquivo.',
        'Apple Corps Ltd. / Universal Music Group',
        'https://usastore.thebeatles.com/pages/rubber-soul-collection',
        'The Beatles Official Store',
        900, 900
      ),
      afterParagraph: 2
    },
    {
      ...promo(
        'https://usastore.thebeatles.com/cdn/shop/files/BEA-00052_RubberSoul_DevImages-01ArtCards.png?v=1785323441&width=1200',
        'Cartões fotográficos de The Beatles incluídos na coleção Rubber Soul',
        'Imagens de arquivo também fazem parte das edições de luxo.',
        'Apple Corps Ltd. / Universal Music Group',
        'https://usastore.thebeatles.com/pages/rubber-soul-collection',
        'The Beatles Official Store',
        1200, 1000
      ),
      afterParagraph: 4
    }
  ],
  body: [
    'Rubber Soul ganhou uma edição especial expandida nesta sexta-feira, 2 de outubro. O álbum de 1965 foi remixado em estéreo por Giles Martin e Sam Okell e também chega em Dolby Atmos, ao lado da mixagem mono original e da versão americana da Capitol.',
    'Os pacotes maiores incluem gravações de sessões, demos caseiras e material do período que antes não havia sido lançado oficialmente. Há ainda edições em vinil, CD e Blu-ray, com livro e material fotográfico nas versões Super Deluxe.',
    'É uma nova chance de ouvir um disco que marcou uma mudança importante na forma como os Beatles tratavam estúdio, composição e álbum como obra inteira — agora com a lupa de uma restauração moderna.',
    'A banda terminou em 1970 e, 56 anos depois, continua recebendo conteúdo extra. Se isso não é o passe de temporada mais duradouro da cultura pop, eu não sei o que é.'
  ]
};

export const streamingWeekend: NewsItem = {
  slug: 'o-que-assistir-fim-de-semana-netflix-2-outubro-2026',
  title: 'O que assistir neste fim de semana sem passar 40 minutos escolhendo',
  excerpt: 'Três estreias da Netflix para três humores diferentes: romance, Fórmula 1 e drama. Escolhe uma, dá play e sai da tela de catálogo.',
  category: 'series-streaming',
  kind: 'guide',
  byline: 'Ruby Dias',
  historicalDate: '2026-10-02',
  publishedAt: '2026-10-02T15:02:00Z',
  modifiedAt: '2026-10-02T15:02:00Z',
  context: 'Guia curto do SPN com três títulos adicionados à Netflix em 2 de outubro de 2026. Disponibilidade pode variar por região.',
  source: {
    name: 'Netflix Tudum — New on Netflix in October 2026',
    url: 'https://www.netflix.com/tudum/articles/new-on-netflix',
    date: '2026-09-30'
  },
  sources: [
    {
      name: 'Netflix Tudum — New on Netflix in October 2026',
      url: 'https://www.netflix.com/tudum/articles/new-on-netflix',
      date: '2026-09-30',
      note: 'Calendário oficial de estreias de outubro.'
    }
  ],
  photo: promo(
    'https://dnm.nflximg.net/api/v6/BvVbc2Wxr2w6QuoANoSpJKEIWjQ/AAAAQQcUn59M8JrYLRqPyBb_LTpxyqfEo_trwV2Q-4kfRYc3kOqVBvpFUFDZVAFEIMIQF8aF5X_My2Pv6QQPKEd2Gs7G9tx1QGYcbzxlf9UCY2Q4OoEL3Uh0Y4qmuX8r1vswwpEIt4__srvjuA6kqw.jpg?r=79d',
    'Imagem promocional de #Love',
    '#Love é uma das estreias da Netflix em 2 de outubro.',
    'Netflix',
    'https://www.netflix.com/tudum/articles/new-on-netflix',
    'Netflix Tudum',
    1000, 562
  ),
  inlinePhotos: [
    {
      ...promo(
        'https://dnm.nflximg.net/api/v6/BvVbc2Wxr2w6QuoANoSpJKEIWjQ/AAAAQV2dgf1ku2TbjnjlM9Mq8eVCqoqmRwLcPXV_3TZuLZYLD-zPZ55fV50fThhwGxHzc9WfE-Axyu_V0eaueirwAN7BUzuSxFYf-sQMoRQMtvZkGzTz_ucZ6wH1bgbfL5dzN-hiF1Sa3D_mM-yIUA.jpg?r=ea6',
        'Michael Schumacher em imagem de arquivo usada no documentário Schumacher 94',
        'Schumacher ’94 revisita a temporada do primeiro título mundial do piloto.',
        'Netflix',
        'https://www.netflix.com/br/title/81916859',
        'Netflix',
        1000, 562
      ),
      afterParagraph: 2
    },
    {
      ...promo(
        'https://dnm.nflximg.net/api/v6/BvVbc2Wxr2w6QuoANoSpJKEIWjQ/AAAAQSg6GJ53En-VC3huhxVsPQD93Ei2UhHsnYC6F52T6eUEs7U3CfmCuV4V4N7Sq-hKOtFB6Kgu2FqbC9yambNFhcidrvJk-oadRTNzBR3vr2sGm-8U3tJHCNsj6QRsMKkzfnSZy57FwImc1zQfug.jpg?r=9e6',
        'Imagem promocional de Doing Life',
        'Doing Life é o novo drama escrito e dirigido por Tyler Perry.',
        'Netflix',
        'https://www.netflix.com/tudum/articles/doing-life-tyler-perry-release-date-cast-news',
        'Netflix Tudum',
        1000, 562
      ),
      afterParagraph: 3
    }
  ],
  body: [
    'Sexta-feira chegou e eu me recuso a deixar você passar 40 minutos rolando catálogo para depois rever alguma coisa pela nona vez. Então aqui vão três opções novas e objetivas da Netflix.',
    '#Love acompanha dois criadores de aplicativos de namoro com ideias opostas sobre compatibilidade, colocados numa experiência de 60 dias. É a escolha para quem quer romance leve com aquela energia de “isso vai dar errado e eu quero assistir”.',
    'Schumacher ’94 — The Birth of a Legend é para quem prefere documentário: entrevistas e imagens de arquivo revisitam a temporada de 1994, quando Michael Schumacher conquistou seu primeiro Mundial de Fórmula 1. Doing Life, escrito e dirigido por Tyler Perry, vai para o drama e acompanha uma conexão construída por cartas entre duas pessoas em momentos bem diferentes da vida.',
    'Pronto. Três opções, três humores. Agora escolhe uma antes que a Netflix pergunte de novo quem está assistindo e você perceba que o fim de semana acabou.'
  ]
};

export const rayearthReturns: NewsItem = {
  slug: 'magic-knight-rayearth-volta-anime-7-outubro',
  title: 'Rayearth voltou para buscar a geração que ainda paga terapia emocional dos anos 90',
  excerpt: 'Hikaru, Umi e Fuu retornam em uma nova adaptação do clássico da CLAMP, com estreia em 7 de outubro e streaming pela Crunchyroll.',
  category: 'animes-hqs',
  kind: 'news',
  byline: 'Ruby Dias',
  historicalDate: '2026-10-02',
  publishedAt: '2026-10-02T15:01:00Z',
  modifiedAt: '2026-10-02T15:01:00Z',
  context: 'Prévia publicada em 2 de outubro de 2026. A nova adaptação estreia em 7 de outubro e terá exibição pela Crunchyroll em diversas regiões, incluindo a América do Sul.',
  source: {
    name: 'Crunchyroll — Animes da Temporada de Outubro de 2026',
    url: 'https://www.crunchyroll.com/pt-br/news/seasonal-lineup/2026/9/15/animes-temporada-outubro-2026-crunchyroll',
    date: '2026-09-15'
  },
  sources: [
    {
      name: 'Crunchyroll — Animes da Temporada de Outubro de 2026',
      url: 'https://www.crunchyroll.com/pt-br/news/seasonal-lineup/2026/9/15/animes-temporada-outubro-2026-crunchyroll',
      date: '2026-09-15',
      note: 'Data de estreia, estúdio e disponibilidade na América do Sul.'
    },
    {
      name: 'Crunchyroll — New Magic Knight Rayearth Anime Theme Songs',
      url: 'https://www.crunchyroll.com/news/latest/2026/9/20/new-magic-knight-rayearth-anime-theme-songs-previewed-in-new-trailer',
      date: '2026-09-20',
      note: 'Confirma dois cours, músicas-tema e elenco adicional.'
    }
  ],
  photo: promo(
    'https://i.ytimg.com/vi/67GqhfLw3ys/maxresdefault.jpg',
    'Hikaru, Umi e Fuu no novo anime Magic Knight Rayearth',
    'O novo Rayearth estreia em 7 de outubro de 2026.',
    'TMS / E&H production / divulgação',
    'https://www.crunchyroll.com/news/latest/2026/9/20/new-magic-knight-rayearth-anime-theme-songs-previewed-in-new-trailer',
    'Crunchyroll',
    1280, 720
  ),
  inlinePhotos: [
    {
      ...promo(
        'https://i.ytimg.com/vi/gISc0dl5R_8/maxresdefault.jpg',
        'Imagem do trailer principal de Magic Knight Rayearth 2026',
        'A nova adaptação revisita a história clássica de Hikaru, Umi e Fuu.',
        'TMS / E&H production / divulgação',
        'https://www.crunchyroll.com/pt-br/news/seasonal-lineup/2026/9/15/animes-temporada-outubro-2026-crunchyroll',
        'Crunchyroll',
        1280, 720
      ),
      afterParagraph: 2
    }
  ],
  body: [
    'Magic Knight Rayearth está voltando. A nova adaptação do mangá da CLAMP estreia em 7 de outubro, com animação da E&H production e distribuição pela Crunchyroll em várias regiões, incluindo a América do Sul.',
    'Ayane Sakura dá voz a Hikaru, Rumi Okubo interpreta Umi e Rie Takahashi assume Fuu. A produção já confirmou exibição em dois cours, ou seja, a história vai atravessar aproximadamente meio ano de programação.',
    'Toaka canta a abertura Otome no Ken, enquanto Yurina Kawaguchi interpreta Seira no encerramento. Para quem chegou agora: Rayearth mistura fantasia, aventura e a amizade do trio com aquele talento muito específico da CLAMP para fazer você achar que está tudo fofo cinco minutos antes de começar a conversar com seus sentimentos.',
    'Para quem viu a versão dos anos 90, é reencontro. Para quem nunca viu, é a chance de descobrir por que tanta gente reconhece essas três heroínas imediatamente — e por que a palavra “nostalgia” às vezes vem acompanhada de um leve olhar para o vazio.'
  ]
};

export const octoberSecond: NewsItem[] = [
  mummyFour,
  starWarsWatts,
  ps5Qssr,
  wolverineQssr,
  aceCombatEight,
  rubberSoulEdition,
  streamingWeekend,
  rayearthReturns
];
