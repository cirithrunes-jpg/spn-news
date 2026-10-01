import type { EditorId } from './editors';
export type EditorialSlot = { day: number; subject: string; editorId?: EditorId; kind: 'news' | 'feature' | 'opinion' | 'guide' | 'data' };
const fernando: EditorId = 'fernando-valerious';
const ruby: EditorId = 'ruby-dias';
const adailton: EditorId = 'adailton-jr';
export const editorialSchedule: EditorialSlot[] = [
  { day:1,subject:'Lançamentos do mês: filmes, séries, games, música, famosos, animes e HQs',editorId:fernando,kind:'guide' },
  { day:2,subject:'Duas notícias do dia sobre séries',editorId:ruby,kind:'news' },
  { day:3,subject:'Notícia do dia: mangás e animes',editorId:adailton,kind:'news' },
  { day:4,subject:'Notícia do dia: filmes e famosos',editorId:fernando,kind:'news' },
  { day:5,subject:'Lista dos 10 melhores filmes em um tema, com avaliação SPN, ironia e humor',editorId:adailton,kind:'opinion' },
  { day:6,subject:'Notícia do dia: cultura pop',editorId:fernando,kind:'news' },
  { day:7,subject:'Notícia do dia e recomendação de um livro que influencia a cultura pop',editorId:fernando,kind:'guide' },
  { day:8,subject:'Nostalgia: resenha bem-humorada de uma música, game ou artista',editorId:ruby,kind:'feature' },
  { day:9,subject:'Notícia do dia: cultura pop atual',editorId:adailton,kind:'news' },
  { day:10,subject:'Lista dos 10 melhores games em um tema, com avaliação SPN, ironia e humor',editorId:ruby,kind:'opinion' },
  { day:11,subject:'Bilheteria de cinema: desempenho dos filmes, com valores e contexto',editorId:ruby,kind:'data' },
  { day:12,subject:'Notícia do dia e cultura pop internacional dos anos 80, 90 e 2000',editorId:fernando,kind:'feature' },
  { day:13,subject:'Notícia do dia e cultura pop da TV aberta brasileira',kind:'feature' },
  { day:14,subject:'Notícia do dia e música internacional',editorId:fernando,kind:'feature' },
  { day:15,subject:'Notícia do dia e séries mais assistidas do mês',kind:'data' },
  { day:16,subject:'Notícia do dia e heavy metal',editorId:fernando,kind:'feature' },
  { day:17,subject:'Notícia do dia e nostalgia pop',editorId:fernando,kind:'feature' },
  { day:18,subject:'Notícia do dia e música brasileira',editorId:ruby,kind:'feature' },
  { day:19,subject:'Nostalgia: resenha bem-humorada de um anime, filme, série ou desenho animado',editorId:fernando,kind:'feature' },
  { day:20,subject:'Notícia do dia e tecnologia',editorId:fernando,kind:'feature' },
  { day:21,subject:'Notícia do dia e ciência',editorId:fernando,kind:'feature' },
  { day:22,subject:'Notícia do dia e curiosidades do universo geek',editorId:adailton,kind:'feature' },
  { day:23,subject:'Lista dos 10 piores filmes em um tema, com avaliação SPN, ironia e humor',editorId:adailton,kind:'opinion' },
  { day:24,subject:'Notícia do dia',editorId:fernando,kind:'news' },
  { day:25,subject:'Notícia do dia',editorId:fernando,kind:'news' },
  { day:26,subject:'Lista dos 10 piores games em um tema, com avaliação SPN, ironia e humor',editorId:fernando,kind:'opinion' },
  { day:27,subject:'Notícia do dia: famosos',editorId:ruby,kind:'news' },
  { day:28,subject:'Notícia do dia: moda feminina',editorId:ruby,kind:'news' },
  { day:29,subject:'Notícia do dia',editorId:fernando,kind:'news' },
  { day:30,subject:'Animes mais assistidos do mês e HQs e mangás mais vendidos do mês',editorId:adailton,kind:'data' },
];
export function getEditorialMonth(year: number, month: number) {
  if (!Number.isInteger(year) || year < 2000 || year > 2100 || !Number.isInteger(month) || month < 1 || month > 12) throw new RangeError('Ano ou mês inválido');
  const days = new Date(Date.UTC(year,month,0)).getUTCDate();
  return Array.from({length:days},(_,i)=>({ date:`${year}-${String(month).padStart(2,'0')}-${String(i+1).padStart(2,'0')}`, slot:editorialSchedule.find(slot=>slot.day===i+1) }));
}
