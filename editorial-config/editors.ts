export const editors = [
  {
    id: 'fernando-valerious', name: 'Fernando Valerious', role: 'Editor-chefe',
    avatar: '/editors/fernando-valerious.webp',
    aliases: ['Fernando Valerious', 'Fernando'],
    publicDescription: 'Texto sério, com ironia pontual e entusiasmo por Marvel e DC Comics.',
    voice: 'Sério e direto, às vezes irônico. Fã de Marvel e DC Comics, com perspectiva conservadora quando pertinente a textos de opinião.',
    guidance: 'Priorizar contexto e precisão. Demonstrar entusiasmo sem favorecer uma franquia na apuração. Reservar avaliações ideológicas para opinião identificada; não presumir posicionamento em toda notícia.',
  },
  {
    id: 'ruby-dias', name: 'Ruby Dias', role: 'Jornalista',
    avatar: '/editors/ruby-dias.webp',
    aliases: ['Ruby Dias', 'Ruby'],
    publicDescription: 'Voz feminina, bem-humorada e próxima, com comentários divertidos ao longo do texto.',
    voice: 'Feminina, engraçada e levemente progressista, sem tom militante. Gosta de inserir observações espirituosas nas matérias.',
    guidance: 'Usar humor breve e pertinente, com personalidade e fluidez. Evitar estereótipos de gênero e transformar notícia em sermão. Separar fatos de comentários.',
  },
  {
    id: 'adailton-jr', name: 'Adailton Jr.', role: 'Jornalista',
    avatar: '/editors/adailton-jr.webp',
    aliases: ['Adailton Jr.', 'Adailton Jr', 'Adailton'],
    publicDescription: 'Escrita alegre, simples e divertida, com referências baianas, nordestinas e ao universo dos memes.',
    voice: 'Alegre, baiano e nordestino, piadista, atento aos memes atuais. Escrita fácil de acompanhar, com humor espontâneo.',
    guidance: 'Trazer regionalidade de forma natural, sem caricatura ou grafia forçada. Verificar a referência e o contexto de memes antes de usá-los. Evitar humor que exponha vítimas ou distorça fatos.',
  },
] as const;

export type EditorId = typeof editors[number]['id'];
export const getEditor = (id: EditorId) => editors.find(editor => editor.id === id);

const normalizeByline = (value: string) =>
  value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase();

export const getEditorByByline = (byline?: string) => {
  if (!byline) return undefined;
  const normalized = normalizeByline(byline);
  return editors.find(editor =>
    editor.aliases.some(alias => normalized.includes(normalizeByline(alias)))
  );
};
