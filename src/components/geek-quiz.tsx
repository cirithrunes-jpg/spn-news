'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { ArrowRight, Check, Gamepad2, RotateCcw, Trophy } from 'lucide-react';
import type { GeekEdition } from '@/lib/geek-quiz';

type Progress = { answers: Record<string, number>; poll: number | null };
const storageEvent = 'spn-geek-progress';
function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(storageEvent, callback);
  return () => { window.removeEventListener('storage', callback); window.removeEventListener(storageEvent, callback); };
}
function readProgress(raw: string | null, edition: GeekEdition): Progress {
  const progress: Progress = { answers: {}, poll: null };
  try {
    const saved = raw ? JSON.parse(raw) : null;
    for (const question of edition.round.questions) {
      const answer = saved?.answers?.[question.id];
      if (Number.isInteger(answer) && answer >= 0 && answer < question.options.length) progress.answers[question.id] = answer;
    }
    if (Number.isInteger(saved?.poll) && saved.poll >= 0 && saved.poll < edition.round.poll.options.length) progress.poll = saved.poll;
  } catch { /* Invalid or unavailable browser storage starts a new round. */ }
  return progress;
}

function QuizRound({ edition }: { edition: GeekEdition }) {
  const [tab, setTab] = useState<'quiz' | 'poll'>('quiz');
  const [index, setIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [temporary, setTemporary] = useState<Progress | null>(null);
  const key = `spn-geek:${edition.id}`;
  const raw = useSyncExternalStore(subscribe, () => { try { return localStorage.getItem(key); } catch { return null; } }, () => null);
  const progress = temporary ?? readProgress(raw, edition);
  const question = edition.round.questions[index];
  const chosen = progress.answers[question.id];
  const answered = chosen !== undefined;
  const score = edition.round.questions.filter(q => progress.answers[q.id] === q.answer).length;
  const nextDate = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', timeZone: 'America/Fortaleza' }).format(new Date(edition.nextUpdate));

  function save(value: Progress) {
    try { localStorage.setItem(key, JSON.stringify(value)); window.dispatchEvent(new Event(storageEvent)); setTemporary(null); }
    catch { setTemporary(value); }
  }

  return <aside className="geek-panel" aria-labelledby="geek-heading">
    <div className="geek-top"><span className="eyebrow"><Gamepad2 size={17} /> DESAFIO SPN</span><span className="geek-badge">A CADA 3 DIAS</span></div>
    <h2 id="geek-heading">Quiz <span>Geek.</span></h2>
    <p className="geek-intro">Você sabe. Ou acha que sabe?</p>
    <div className="geek-tabs" aria-label="Escolha uma atividade"><button type="button" aria-pressed={tab === 'quiz'} onClick={() => setTab('quiz')}>Quiz</button><button type="button" aria-pressed={tab === 'poll'} onClick={() => setTab('poll')}>Pesquisa geek</button></div>
    {tab === 'quiz' ? showResult ? <div className="geek-result" role="status"><Trophy size={34} /><strong>{score} de {edition.round.questions.length}</strong><h3>{score === edition.round.questions.length ? 'Respeita esse repertório!' : 'O próximo nível te espera.'}</h3><p>{edition.round.title}. Cada resposta vem com contexto e fonte para conferir.</p><button type="button" className="geek-next" onClick={() => { setShowResult(false); setIndex(0); }}>Rever respostas <RotateCcw size={15} /></button><button type="button" className="geek-text-button" onClick={() => { save({ ...progress, answers: {} }); setIndex(0); setShowResult(false); }}>Jogar de novo</button></div> : <>
      <div className="geek-progress"><span>{question.universe}</span><span>{index + 1}/{edition.round.questions.length}</span></div>
      <fieldset className="geek-question"><legend>{question.question}</legend><div className="geek-options">{question.options.map((option, i) => <button type="button" key={option} disabled={answered} aria-pressed={chosen === i} className={answered && i === question.answer ? 'correct' : chosen === i ? 'incorrect' : ''} onClick={() => save({ ...progress, answers: { ...progress.answers, [question.id]: i } })}><span className="geek-letter">{String.fromCharCode(65 + i)}</span><span>{option}</span>{answered && i === question.answer && <Check size={16} />}</button>)}</div></fieldset>
      {answered && <div className="geek-feedback" aria-live="polite"><strong>{chosen === question.answer ? 'Acertou!' : `A resposta é ${question.options[question.answer]}.`}</strong><p>{question.explanation}</p><a href={question.source.url} target="_blank" rel="noopener noreferrer">Conferir: {question.source.name} ↗</a><button className="geek-next" type="button" onClick={() => { if (index + 1 < edition.round.questions.length) setIndex(index + 1); else setShowResult(true); }}>{index + 1 < edition.round.questions.length ? 'Próxima pergunta' : 'Ver resultado'} <ArrowRight size={16} /></button></div>}
    </> : <div className="geek-poll"><span className="geek-poll-label">AQUI VALE OPINIÃO</span><fieldset className="geek-question"><legend>{edition.round.poll.question}</legend><div className="geek-options">{edition.round.poll.options.map((option, i) => <button type="button" key={option} aria-pressed={progress.poll === i} className={progress.poll === i ? 'selected' : ''} onClick={() => save({ ...progress, poll: i })}><span>{option}</span>{progress.poll === i && <Check size={16} />}</button>)}</div></fieldset>{progress.poll !== null && <p className="geek-poll-confirmation" role="status">Sua escolha: <strong>{edition.round.poll.options[progress.poll]}</strong>. Pode mudar de ideia.</p>}<p className="geek-local-note">Resposta pessoal salva neste navegador. Esta pesquisa não exibe uma contagem coletiva de votos.</p></div>}
    <div className="geek-bottom"><span className="geek-update-dot" />Próxima rodada: <time dateTime={edition.nextUpdate}>{nextDate}</time><span>3 perguntas + 1 pesquisa</span></div>
    <noscript>Ative o JavaScript para responder ao quiz e à pesquisa.</noscript>
  </aside>;
}

export function GeekQuiz({ initialEdition }: { initialEdition: GeekEdition }) {
  const [edition, setEdition] = useState(initialEdition);
  useEffect(() => {
    let canceled = false;
    let timer: ReturnType<typeof setTimeout>;
    async function refresh() {
      try {
        const response = await fetch('/api/quiz-geek', { cache: 'no-store' });
        if (!response.ok) throw new Error('Quiz unavailable');
        const next: GeekEdition = await response.json();
        if (!canceled) { setEdition(next); schedule(next.nextUpdate); }
      } catch { if (!canceled) timer = setTimeout(refresh, 60_000); }
    }
    function schedule(nextUpdate: string) { clearTimeout(timer); timer = setTimeout(refresh, Math.min(2_147_483_647, Math.max(1_000, Date.parse(nextUpdate) - Date.now() + 1_000))); }
    const onVisible = () => { if (document.visibilityState === 'visible') void refresh(); };
    schedule(edition.nextUpdate);
    document.addEventListener('visibilitychange', onVisible);
    return () => { canceled = true; clearTimeout(timer); document.removeEventListener('visibilitychange', onVisible); };
  }, [edition.nextUpdate]);
  return <QuizRound key={edition.id} edition={edition} />;
}
