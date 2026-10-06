export type GeekQuestion = {
  id: string;
  universe: string;
  question: string;
  options: [string, string, string, string];
  answer: number;
  explanation: string;
  source: { name: string; url: string };
};
export type GeekRound = {
  id: string;
  title: string;
  questions: GeekQuestion[];
  poll: { question: string; options: string[] };
};
export type GeekEdition = { id: string; round: GeekRound; startsAt: string; nextUpdate: string };

// The recurring editorial task renews this bank. Prepared rounds keep the
// three-day rotation working even when an editorial refresh is delayed.
export const geekQuizUpdatedAt = '2026-10-06T12:00:00Z';
export const geekQuizIntervalDays = 3;
const wonderWoman = { name: 'DC · perfil oficial da Mulher-Maravilha', url: 'https://www.dc.com/characters/wonder-woman' };
const superman = { name: 'DC · perfil oficial do Superman', url: 'https://www.dc.com/characters/superman' };
const toyStory = { name: 'Pixar · Toy Story', url: 'https://www.pixar.com/toy-story' };
const nemo = { name: 'Pixar · Procurando Nemo', url: 'https://www.pixar.com/finding-nemo' };
const zelda = { name: 'Nintendo · o mundo de Breath of the Wild', url: 'https://play.nintendo.com/activities/puzzles/zelda-breath-of-the-wild-online-jigsaw-puzzle/' };
const kirby = { name: 'Nintendo · Kirby’s Return to Dream Land Deluxe', url: 'https://www.nintendo.com/en-ca/whatsnew/the-tough-puff-is-back-in-kirbys-return-to-dream-land-deluxe/' };
const luffy = { name: 'ONE PIECE.com · perfil oficial de Luffy', url: 'https://one-piece.com/character/luffy/index.html' };
const zoro = { name: 'ONE PIECE.com · perfil oficial de Zoro', url: 'https://one-piece.com/character/zoro/index.html' };
const hobbit = { name: 'Tolkien Estate · abertura de O Hobbit', url: 'https://www.tolkienestate.com/writing/' };

export const geekQuizRounds: GeekRound[] = [
  {
    id: '20261006-ilhas-reinos-brinquedos', title: 'Ilhas, reinos e brinquedos',
    questions: [
      { id: '20261006-diana-ilha', universe: 'HQs · Mulher-Maravilha', question: 'Em qual ilha Diana, a Mulher-Maravilha, foi criada?', options: ['Genosha', 'Themyscira', 'Madripoor', 'Krakoa'], answer: 1, explanation: 'Diana cresceu em Themyscira, a ilha das amazonas, também conhecida como Ilha Paraíso.', source: wonderWoman },
      { id: '20261006-zelda-reino', universe: 'Games · The Legend of Zelda', question: 'Qual reino Link explora em Breath of the Wild?', options: ['Termina', 'Koholint', 'Hyrule', 'Holodrum'], answer: 2, explanation: 'Breath of the Wild leva Link pelo mundo aberto de Hyrule.', source: zelda },
      { id: '20261006-woody-brinquedo', universe: 'Cinema · Toy Story', question: 'Que tipo de personagem o brinquedo Woody representa?', options: ['Caubói', 'Patrulheiro espacial', 'Soldado', 'Piloto de corrida'], answer: 0, explanation: 'Woody é um brinquedo de caubói; Buzz Lightyear é o patrulheiro espacial da dupla.', source: toyStory },
    ],
    poll: { question: 'Qual aventura combina mais com sua próxima sessão geek?', options: ['Super-heróis das HQs', 'Exploração em games', 'Animações no cinema', 'Aventuras de anime'] },
  },
  {
    id: '20261006-simbolos-e-origens', title: 'Símbolos e origens',
    questions: [
      { id: '20261006-luffy-chapeu', universe: 'Anime · One Piece', question: 'Qual acessório é a marca registrada de Monkey D. Luffy?', options: ['Óculos de aviador', 'Coroa dourada', 'Máscara de raposa', 'Chapéu de palha'], answer: 3, explanation: 'O chapéu de palha é a marca de Luffy. O perfil oficial destaca esse acessório desde sua infância.', source: luffy },
      { id: '20261006-hobbit-abertura', universe: 'Fantasia · O Hobbit', question: 'Na frase de abertura de O Hobbit, em que lugar vive um hobbit?', options: ['Uma torre de pedra', 'Um buraco no chão', 'Um barco de madeira', 'Uma caverna de gelo'], answer: 1, explanation: 'A abertura apresenta um hobbit vivendo num buraco no chão. Logo em seguida, Tolkien associa essa moradia ao conforto.', source: hobbit },
      { id: '20261006-superman-planeta', universe: 'HQs · Superman', question: 'Qual é o planeta de origem do Superman?', options: ['Oa', 'Thanagar', 'Krypton', 'Apokolips'], answer: 2, explanation: 'Superman nasceu em Krypton e foi criado em Smallville, na Terra.', source: superman },
    ],
    poll: { question: 'Qual tipo de protagonista mais prende sua atenção?', options: ['Herói que inspira esperança', 'Aventureiro de vida tranquila', 'Líder de uma tripulação', 'Anti-herói cheio de dilemas'] },
  },
  {
    id: '20261006-habilidades-e-companhia', title: 'Habilidades e boa companhia',
    questions: [
      { id: '20261006-kirby-super-habilidades', universe: 'Games · Kirby', question: 'Como Kirby ganha Super Habilidades em Kirby’s Return to Dream Land Deluxe?', options: ['Inalando inimigos brilhantes', 'Abrindo qualquer baú', 'Terminando uma corrida', 'Vestindo uma máscara comum'], answer: 0, explanation: 'Inimigos brilhantes podem ser inalados para conceder Super Habilidades, como explica a Nintendo.', source: kirby },
      { id: '20261006-zoro-tres-espadas', universe: 'Anime · One Piece', question: 'Quantas espadas Zoro usa no seu característico estilo Santoryu?', options: ['Uma', 'Duas', 'Quatro', 'Três'], answer: 3, explanation: 'Santoryu é o estilo de três espadas de Zoro: duas nas mãos e uma segurada com a boca.', source: zoro },
      { id: '20261006-nemo-pai', universe: 'Cinema · Procurando Nemo', question: 'Como se chama o pai de Nemo?', options: ['Gill', 'Marlin', 'Bruce', 'Crush'], answer: 1, explanation: 'Marlin é o pai de Nemo e parte pelo oceano para encontrar o filho.', source: nemo },
    ],
    poll: { question: 'Qual companhia você escolheria para uma aventura fictícia?', options: ['Um grupo de amigos de anime', 'Uma equipe de heróis das HQs', 'Personagens de um game cooperativo', 'Um grupo de viajantes de fantasia'] },
  },
];

export function getGeekEdition(now: Date = new Date()): GeekEdition {
  const interval = geekQuizIntervalDays * 86_400_000;
  const anchor = Date.parse(geekQuizUpdatedAt);
  const step = Math.max(0, Math.floor((now.getTime() - anchor) / interval));
  const startsAt = new Date(anchor + step * interval).toISOString();
  return { id: `${startsAt}-${geekQuizRounds[step % geekQuizRounds.length].id}`, round: geekQuizRounds[step % geekQuizRounds.length], startsAt, nextUpdate: new Date(anchor + (step + 1) * interval).toISOString() };
}
