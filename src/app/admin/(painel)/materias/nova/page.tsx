import {requireEditor} from '@/lib/redacao';
import {editors} from '../../../../../../editorial-config/editors';
import {getBotPlan} from '../../../../../../editorial-config/bot-plan';
import {ArticleForm} from '../form';
export default async function NewArticle(){await requireEditor();return <><span className="desk-eyebrow">UMA HISTÓRIA POR VEZ</span><h1>Nova matéria.</h1><p className="desk-muted">O rascunho fica privado até a aprovação e publicação.</p><ArticleForm editors={editors.map(({id,name})=>({id,name}))} date={getBotPlan().date}/></>;}
