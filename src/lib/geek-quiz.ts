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
export const geekQuizUpdatedAt = '2026-10-03T12:00:00Z';
export const geekQuizIntervalDays = 3;
const dc = { name: 'DC · perfil oficial do Batman', url: 'https://www.dc.com/characters/batman' };
const tolkien = { name: 'Tolkien Estate · O Senhor dos Anéis', url: 'https://www.tolkienestate.com/writing/the-lord-of-the-rings/' };
const rockstar = { name: 'Rockstar · Red Dead Redemption 2', url: 'https://store.rockstargames.com/game/buy-red-dead-redemption-2' };

export const geekQuizRounds: GeekRound[] = [
  {
    id: 'gotham-terra-media-faroeste', title: 'Do Bat-Sinal ao Velho Oeste',
    questions: [
      { id: 'batman-estreia', universe: 'HQs · Batman', question: 'Em qual revista Batman fez sua primeira aparição?', options: ['Action Comics #1', 'Detective Comics #27', 'Batman #1', 'The Brave and the Bold #28'], answer: 1, explanation: 'Batman estreou em Detective Comics #27, em 1939. A revista Batman #1 veio depois.', source: dc },
      { id: 'rdr2-gangue', universe: 'Games · Red Dead Redemption 2', question: 'Arthur Morgan pertence a qual gangue?', options: ['O’Driscoll', 'Del Lobo', 'Van der Linde', 'Lemoyne Raiders'], answer: 2, explanation: 'Arthur faz parte da gangue Van der Linde, liderada por Dutch. Lealdade nunca foi uma missão simples.', source: rockstar },
      { id: 'lotr-destino-anel', universe: 'Livros · O Senhor dos Anéis', question: 'Frodo e Sam levam o Um Anel para ser destruído em qual lugar?', options: ['Moria', 'Valfenda', 'Isengard', 'Monte da Perdição'], answer: 3, explanation: 'O destino é o Monte da Perdição, também chamado Orodruin, em Mordor.', source: tolkien },
    ],
    poll: { question: 'Qual universo merece mais espaço no SPN?', options: ['DC e Gotham', 'Marvel e multiverso', 'Games e mundos abertos', 'Animes, mangás e fantasia'] },
  },
  {
    id: 'segredos-dos-classicos', title: 'Detalhes que fazem a diferença',
    questions: [
      { id: 'batman-alfred', universe: 'HQs · Batman', question: 'Quem cuida de Bruce Wayne depois da morte dos pais?', options: ['Jim Gordon', 'Lucius Fox', 'Alfred Pennyworth', 'Harvey Dent'], answer: 2, explanation: 'Alfred Pennyworth é o mordomo e guardião de Bruce. Gotham exige preparo; a Mansão Wayne também.', source: dc },
      { id: 'rdr2-ano', universe: 'Games · Red Dead Redemption 2', question: 'Em que ano começa a história principal de Red Dead Redemption 2?', options: ['1899', '1911', '1885', '1920'], answer: 0, explanation: 'A história começa em 1899, quando a era do Velho Oeste está chegando ao fim.', source: rockstar },
      { id: 'lotr-autor', universe: 'Livros · O Senhor dos Anéis', question: 'Quem escreveu O Senhor dos Anéis?', options: ['C. S. Lewis', 'J. R. R. Tolkien', 'George R. R. Martin', 'Frank Herbert'], answer: 1, explanation: 'J. R. R. Tolkien escreveu O Senhor dos Anéis. O projeto cresceu a partir de um pedido por uma continuação de O Hobbit.', source: tolkien },
    ],
    poll: { question: 'Qual formato você mais gosta de encontrar por aqui?', options: ['Notícias rápidas', 'Análises e críticas', 'Listas e nostalgia', 'Quiz e curiosidades'] },
  },
  {
    id: 'mapas-e-identidades', title: 'Conhece o caminho de casa?',
    questions: [
      { id: 'batman-cidade', universe: 'HQs · Batman', question: 'Qual cidade é a principal base de operações do Batman?', options: ['Metrópolis', 'Central City', 'Star City', 'Gotham City'], answer: 3, explanation: 'Gotham City é a casa do Batman. O Bat-Sinal não costuma tirar férias.', source: dc },
      { id: 'rdr2-blackwater', universe: 'Games · Red Dead Redemption 2', question: 'Um assalto fracassado em qual cidade força a gangue a fugir no começo da história?', options: ['Saint Denis', 'Blackwater', 'Valentine', 'Rhodes'], answer: 1, explanation: 'O assalto em Blackwater dá errado e coloca Arthur e a gangue Van der Linde em fuga.', source: rockstar },
      { id: 'lotr-sauron', universe: 'Livros · O Senhor dos Anéis', question: 'O anel levado por Frodo e Sam a Mordor está ligado a qual Senhor do Escuro?', options: ['Sauron', 'Saruman', 'Smaug', 'Gollum'], answer: 0, explanation: 'O Um Anel está ligado a Sauron. A missão dos hobbits é destruí-lo, não guardar uma lembrancinha.', source: tolkien },
    ],
    poll: { question: 'Qual jornada você encararia em um fim de semana geek?', options: ['Patrulhar Gotham', 'Cruzar a Terra-média', 'Explorar o Velho Oeste', 'Entrar em um mundo cyberpunk'] },
  },
];

export function getGeekEdition(now: Date = new Date()): GeekEdition {
  const interval = geekQuizIntervalDays * 86_400_000;
  const anchor = Date.parse(geekQuizUpdatedAt);
  const step = Math.max(0, Math.floor((now.getTime() - anchor) / interval));
  const startsAt = new Date(anchor + step * interval).toISOString();
  return { id: `${startsAt}-${geekQuizRounds[step % geekQuizRounds.length].id}`, round: geekQuizRounds[step % geekQuizRounds.length], startsAt, nextUpdate: new Date(anchor + (step + 1) * interval).toISOString() };
}
