import { categories, type CategorySlug } from './content';
import { editors } from '../../editorial-config/editors';
import type { NewsItem, NewsSource } from './news';
export function slugify(value:string){return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,130).replace(/-$/,'');}
function text(form:FormData,key:string,max:number){const value=String(form.get(key)??'').trim();if(value.length>max)throw new Error('O campo '+key+' está muito longo.');return value;}
export function safeUrl(value:string,local=false){
 if(local&&/^\/(?:news|photos)\/[a-z0-9_.\/-]+$/i.test(value)&&!value.includes('..'))return value;
 try{const url=new URL(value);if(url.protocol!=='https:'||url.username||url.password)throw new Error();return url.href;}catch{throw new Error('Use links HTTPS completos para fontes e imagens.');}
}
export function parseDraft(form:FormData):NewsItem{
 const title=text(form,'title',180),excerpt=text(form,'excerpt',500),category=text(form,'category',40);
 const editor=editors.find(e=>e.id===text(form,'editorId',60)),date=text(form,'date',10),slug=text(form,'slug',130)||slugify(title),kind=text(form,'kind',20);
 if(title.length<8||excerpt.length<20)throw new Error('Preencha o título e uma chamada com pelo menos 20 caracteres.');
 if(!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug))throw new Error('Use letras minúsculas, números e hífens no endereço.');
 if(!categories.some(c=>c.slug===category)||!editor||!['news','guide','feature','opinion','data'].includes(kind))throw new Error('Escolha a editoria, o editor e o formato.');
 if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||Number.isNaN(Date.parse(date+'T12:00:00Z'))||new Date(date+'T12:00:00Z').toISOString().slice(0,10)!==date)throw new Error('Informe uma data válida para a edição.');
 const sources:NewsSource[]=text(form,'sources',18000).split('\n').filter(s=>s.trim()).map(line=>{const[name,url,sourceDate]=line.split('|').map(p=>p.trim());if(!name||!url)throw new Error('Cada fonte deve conter nome | link.');if(sourceDate&&!/^\d{4}-\d{2}-\d{2}$/.test(sourceDate))throw new Error('A data da fonte deve usar AAAA-MM-DD.');return{name,url:safeUrl(url),...(sourceDate?{date:sourceDate}:{})};});
 if(!sources.length||sources.length>50)throw new Error('Inclua de 1 a 50 fontes.');
 const raw=text(form,'body',100000),chunks=raw.split(/\n\s*\n/).map(p=>p.trim()).filter(Boolean);
 if(raw.length<100)throw new Error('Escreva o conteúdo com pelo menos 100 caracteres.');
 const body:string[]=[],sections:NonNullable<NewsItem['sections']>=[];
 for(const chunk of chunks){if(chunk.startsWith('## ')){const lines=chunk.split('\n');sections.push({title:lines[0].slice(3),paragraphs:lines.slice(1).join('\n').trim()?[lines.slice(1).join('\n').trim()]:[],source:0});}else if(sections.length)sections[sections.length-1].paragraphs.push(chunk);else body.push(chunk);}
 if(!body.length)throw new Error('Inclua uma abertura antes dos subtítulos.');
 const result:NewsItem={slug,title,excerpt,category:category as CategorySlug,byline:editor.name,historicalDate:date,kind:kind as NewsItem['kind'],context:text(form,'context',3000),source:sources[0],sources,body,...(sections.length?{sections}:{})};
 const path=text(form,'photoPath',2000);
 if(path){const creator=text(form,'photoCreator',300),alt=text(form,'photoAlt',500),license=text(form,'photoLicense',200);if(!creator||!alt||!license)throw new Error('Preencha autor, descrição e situação de uso da imagem.');result.photo={path:safeUrl(path,true),creator,alt,caption:text(form,'photoCaption',800),sourceName:text(form,'photoSourceName',300)||'Fonte original',sourceUrl:safeUrl(text(form,'photoSourceUrl',2000)),originalUrl:safeUrl(text(form,'photoOriginalUrl',2000)),license,licenseUrl:safeUrl(text(form,'photoLicenseUrl',2000)),rightsReserved:form.get('rightsReserved')==='on'};}
 const inlinePath=text(form,'inlinePhotoPath',2000);
 if(inlinePath){const creator=text(form,'inlinePhotoCreator',300),alt=text(form,'inlinePhotoAlt',500),license=text(form,'inlinePhotoLicense',200),afterParagraph=Number(form.get('inlinePhotoAfter')??4);if(!creator||!alt||!license)throw new Error('Preencha autor, descrição e situação de uso da imagem interna.');if(!Number.isInteger(afterParagraph)||afterParagraph<1||afterParagraph>body.length)throw new Error('Escolha depois de qual parágrafo a imagem interna aparece.');result.inlinePhotos=[{afterParagraph,path:safeUrl(inlinePath,true),creator,alt,caption:text(form,'inlinePhotoCaption',800),sourceName:text(form,'inlinePhotoSourceName',300)||'Fonte original',sourceUrl:safeUrl(text(form,'inlinePhotoSourceUrl',2000)),originalUrl:safeUrl(text(form,'inlinePhotoOriginalUrl',2000)),license,licenseUrl:safeUrl(text(form,'inlinePhotoLicenseUrl',2000)),rightsReserved:form.get('inlinePhotoRightsReserved')==='on'}];}
 result.monetization=form.get('monetization')==='on';
 return result;
}
export function checkPublishable(item:NewsItem){if(!item.photo)throw new Error('Adicione uma imagem com origem, crédito e situação de uso antes de aprovar.');if(!item.context)throw new Error('Preencha o contexto e a data da informação.');}


