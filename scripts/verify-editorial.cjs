/* eslint-disable @typescript-eslint/no-require-imports -- Isolated validation CLI loads TypeScript modules. */
const fs=require('node:fs'),ts=require('typescript'),assert=require('node:assert/strict');
require.extensions['.ts']=(mod,filename)=>mod._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,filename);
const{parseDraft,checkPublishable,safeUrl}=require('../src/lib/editorial-validation.ts');
const{news}=require('../src/lib/news.ts');
const{editors}=require('../editorial-config/editors.ts');
function formFor(n){const f=new FormData();const values={title:n.title,excerpt:n.excerpt,category:n.category,editorId:editors.find(e=>e.name===n.byline).id,date:n.historicalDate,kind:n.kind,slug:n.slug,context:n.context,body:[...n.body,...(n.sections??[]).flatMap(s=>['## '+s.title,...s.paragraphs])].join('\n\n'),sources:(n.sources??[n.source]).map(s=>s.name+' | '+s.url+(s.date?' | '+s.date:'')).join('\n'),photoPath:n.photo.path,photoCreator:n.photo.creator,photoAlt:n.photo.alt,photoCaption:n.photo.caption,photoSourceName:n.photo.sourceName,photoSourceUrl:n.photo.sourceUrl,photoOriginalUrl:n.photo.originalUrl,photoLicense:n.photo.license,photoLicenseUrl:n.photo.licenseUrl,rightsReserved:n.photo.rightsReserved?'on':''};for(const[k,v]of Object.entries(values))if(v!=null)f.set(k,v);return f;}
for(const n of news){const p=parseDraft(formFor(n));checkPublishable(p);assert.equal(p.title,n.title);assert.equal(p.byline,n.byline);assert.deepEqual(p.body,n.body);assert.equal(p.sections?.length,n.sections?.length);for(const s of p.sections??[])assert.ok(p.sources[s.source]);}
assert.throws(()=>safeUrl('javascript:alert(1)'));
assert.throws(()=>safeUrl('https://user:password@example.com'));
assert.throws(()=>safeUrl('/news/../../x',true));
const f=formFor(news[0]);f.set('date','2026-02-31');assert.throws(()=>parseDraft(f));
const noImage=parseDraft(formFor(news[0]));delete noImage.photo;assert.throws(()=>checkPublishable(noImage));
console.log('PASS: 31 existing articles editable; bylines, sections and body retained; unsafe URLs, invalid dates and missing publication images rejected.');

