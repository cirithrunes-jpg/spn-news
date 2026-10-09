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
export const geekQuizUpdatedAt = '2026-10-09T12:00:00Z';
export const geekQuizIntervalDays = 3;
const spiderMan = { name: 'Marvel · Homem-Aranha nas HQs', url: 'https://www.marvel.com/characters/spider-man-peter-parker/in-comics' };
const blackPanther = { name: 'Marvel · Pantera Negra nas HQs', url: 'https://www.marvel.com/characters/black-panther-t-challa/in-comics' };
const naruto = { name: 'NARUTO Official · apresentação da história', url: 'https://naruto-official.com/en/about' };
const dragonBall = { name: 'Dragon Ball Official · técnicas de Goku', url: 'https://en.dragon-ball-official.com/news/01_140.html' };
const jurassicPark = { name: 'Universal · Jurassic Park', url: 'https://www.universalpicturesathome.com/movies/jurassic-park' };
const chewbacca = { name: 'StarWars.com · Chewbacca', url: 'https://www.starwars.com/databank/chewbacca' };
const gryffindor = { name: 'HarryPotter.com · Grifinória', url: 'https://www.harrypotter.com/fact-file/magical-miscellany/gryffindor' };
const creeper = { name: 'Mojang · a origem do Creeper', url: 'https://www.minecraft.net/en-us/article/meet-creeper' };
const metroid = { name: 'Nintendo · Samus em Metroid Dread', url: 'https://www.nintendo.com/us/whatsnew/suit-up-as-samus-in-metroid-dread-available-now/' };

export const geekQuizRounds: GeekRound[] = [
  {
    id: '20261009-teias-ninjas-dinossauros', title: 'Teias, ninjas e dinossauros',
    questions: [
      { id: '20261009-homem-aranha-identidade', universe: 'HQs · Homem-Aranha', question: 'Qual destes personagens é conhecido como Homem-Aranha nas HQs da Marvel?', options: ['Matt Murdock', 'Tony Stark', 'Bruce Banner', 'Peter Parker'], answer: 3, explanation: 'Peter Parker é o Homem-Aranha apresentado nesse perfil oficial da Marvel.', source: spiderMan },
      { id: '20261009-naruto-sonho', universe: 'Anime · Naruto', question: 'No começo da história, qual cargo Naruto sonha em alcançar?', options: ['Hokage', 'Kazekage', 'Raikage', 'Mizukage'], answer: 0, explanation: 'Naruto quer se tornar Hokage, o líder da Vila Oculta da Folha. Esse sonho faz parte da premissa da série.', source: naruto },
      { id: '20261009-jurassic-diretor', universe: 'Cinema · Jurassic Park', question: 'Quem dirigiu Jurassic Park, lançado em 1993?', options: ['James Cameron', 'George Lucas', 'Steven Spielberg', 'Ridley Scott'], answer: 2, explanation: 'Steven Spielberg dirigiu o Jurassic Park original, de 1993, como registra a ficha oficial da Universal.', source: jurassicPark },
    ],
    poll: { question: 'Qual adaptação geek você mais gostaria de acompanhar?', options: ['HQ transformada em filme', 'Anime em uma série com atores', 'Game em uma animação', 'Livro de fantasia em uma série'] },
  },
  {
    id: '20261009-reinos-magia-blocos', title: 'Reinos, magia e blocos',
    questions: [
      { id: '20261009-pantera-pais', universe: 'HQs · Pantera Negra', question: 'Qual é o país de T’Challa, o Pantera Negra?', options: ['Latvéria', 'Wakanda', 'Genosha', 'Sokóvia'], answer: 1, explanation: 'Wakanda é a nação africana de T’Challa, descrita pela Marvel como secreta e muito avançada.', source: blackPanther },
      { id: '20261009-grifinoria-simbolo', universe: 'Fantasia · Harry Potter', question: 'Qual animal representa a casa Grifinória em Hogwarts?', options: ['Águia', 'Texugo', 'Serpente', 'Leão'], answer: 3, explanation: 'O leão é o animal emblemático da Grifinória, associado à coragem e à bravura da casa.', source: gryffindor },
      { id: '20261009-creeper-origem', universe: 'Games · Minecraft', question: 'O Creeper surgiu de um erro ao criar o modelo de qual animal?', options: ['Porco', 'Vaca', 'Ovelha', 'Galinha'], answer: 0, explanation: 'A Mojang conta que um erro nas dimensões do modelo de um porco deu origem ao Creeper.', source: creeper },
    ],
    poll: { question: 'O que mais pesa na sua escolha de um game?', options: ['Jogabilidade e desafios', 'História e personagens', 'Mundo para explorar', 'Cooperação com amigos'] },
  },
  {
    id: '20261009-poderes-outra-galaxia', title: 'Poderes de outra galáxia',
    questions: [
      { id: '20261009-samus-profissao', universe: 'Games · Metroid', question: 'Como a Nintendo descreve a profissão de Samus Aran?', options: ['Diplomata galáctica', 'Comerciante espacial', 'Caçadora de recompensas', 'Arqueóloga interplanetária'], answer: 2, explanation: 'Samus Aran é uma caçadora de recompensas intergaláctica, a protagonista da série Metroid.', source: metroid },
      { id: '20261009-kamehameha-criador', universe: 'Anime · Dragon Ball', question: 'Quem criou a técnica Kamehameha em Dragon Ball?', options: ['Vegeta', 'Mestre Kame', 'Piccolo', 'Goku'], answer: 1, explanation: 'Mestre Kame, chamado Kamesennin no site oficial, criou o Kamehameha. Goku aprende a técnica observando o mestre.', source: dragonBall },
      { id: '20261009-chewbacca-especie', universe: 'Cinema · Star Wars', question: 'A qual espécie pertence Chewbacca?', options: ['Wookiee', 'Ewok', 'Hutt', 'Twi’lek'], answer: 0, explanation: 'Chewbacca é um Wookiee. O databank oficial de Star Wars identifica diretamente sua espécie.', source: chewbacca },
    ],
    poll: { question: 'Qual habilidade clássica você escolheria experimentar por um dia?', options: ['Lançar teias como o Homem-Aranha', 'Usar os equipamentos de Samus', 'Soltar um Kamehameha', 'Fazer feitiços como em Hogwarts'] },
  },
];

export function getGeekEdition(now: Date = new Date()): GeekEdition {
  const interval = geekQuizIntervalDays * 86_400_000;
  const anchor = Date.parse(geekQuizUpdatedAt);
  const step = Math.max(0, Math.floor((now.getTime() - anchor) / interval));
  const startsAt = new Date(anchor + step * interval).toISOString();
  return { id: `${startsAt}-${geekQuizRounds[step % geekQuizRounds.length].id}`, round: geekQuizRounds[step % geekQuizRounds.length], startsAt, nextUpdate: new Date(anchor + (step + 1) * interval).toISOString() };
}
