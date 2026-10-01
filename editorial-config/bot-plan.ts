// Internal configuration only. Do not import into public pages or client components.
import { editorialSchedule } from './editorial-calendar';
import { getEditor } from './editors';

export function getBotPlan(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now);
  const value = (type: string) => parts.find(part => part.type === type)!.value;
  const day = Number(value('day'));
  const slot = editorialSchedule.find(item => item.day === day);
  const editor = slot?.editorId ? getEditor(slot.editorId) : undefined;
  return {
    date: `${value('year')}-${value('month')}-${value('day')}`,
    timeZone: 'America/Sao_Paulo',
    subject: slot?.subject ?? null,
    publicationType: slot?.kind ?? null,
    articleCount: slot ? day === 2 ? 2 : 1 : 0,
    assignedEditorId: editor?.id ?? null,
    intendedByline: editor?.name ?? null,
    voice: editor?.voice ?? null,
    writingGuidance: editor?.guidance ?? null,
    state: !slot ? 'unplanned' : !editor ? 'needs_assignment' : 'needs_research_and_review',
    automaticPublication: false,
  } as const;
}
