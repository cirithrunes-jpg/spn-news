import { siteUrl } from './site';
import type { NewsItem } from './news';
export function socialCaption(article:NewsItem){return `${article.title}\n\n${article.excerpt}\n\n${article.byline?`Por ${article.byline}\n\n`:''}Leia no SPN News: ${siteUrl.origin}/noticia/${article.slug}\n\n#SPNNews #CulturaPop`.slice(0,2200);}
export function socialImage(article:NewsItem){
 if(!article.photo?.path)throw new Error('A matéria precisa ter imagem.');
 const url=new URL(article.photo.path,siteUrl);
 if(url.protocol!=='https:'||url.username||url.password||url.hostname==='localhost'||/^\d+[.]/.test(url.hostname)||url.hostname.includes(':'))throw new Error('A imagem precisa ter um endereço HTTPS público.');
 if(!/\.jpe?g$/i.test(url.pathname))throw new Error('O envio automático de fotos precisa de uma imagem JPEG (.jpg). Prepare a imagem da matéria nesse formato.');
 return url.href;
}
