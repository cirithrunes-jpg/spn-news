/* eslint-disable @typescript-eslint/no-require-imports -- This isolated CommonJS validation script loads the TypeScript content modules through a local transpilation hook. */
const fs = require('node:fs');
const ts = require('typescript');
const assert = require('node:assert/strict');
require.extensions['.ts'] = (mod, filename) => mod._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,filename);
const {news}=require('../src/lib/news.ts');
const {editorialSchedule}=require('../editorial-config/editorial-calendar.ts');
const {editors}=require('../editorial-config/editors.ts');
assert.equal(news.length,31);
assert.equal(new Set(news.map(n=>n.slug)).size,31);
for(let day=1;day<=30;day++){
 const items=news.filter(n=>n.historicalDate===`2026-09-${String(day).padStart(2,'0')}`);
 assert.equal(items.length,day===2?2:1,`Missing edition ${day}`);
 for(const item of items){
 assert.ok(item.photo?.path,`Missing photo ${day}`);
 assert.ok(item.photo.creator && item.photo.sourceUrl && item.photo.license,`Missing image credit ${day}`);
 assert.ok(item.source.url.startsWith('https://'),`Missing source ${day}`);
 assert.ok(item.body.join(' ').length>400,`Article too short ${day}`);
 for(const section of item.sections??[])assert.ok((item.sources??[item.source])[section.source],`Invalid citation ${item.slug}`);
 if([5,10,23,26].includes(day))assert.equal(item.sections.length,10,`Incomplete list ${day}`);
 const slot=editorialSchedule.find(s=>s.day===day);
 const ed=Array.isArray(editors)?editors.find(e=>e.id===slot.editorId):editors[slot.editorId];
 if(ed)assert.equal(item.byline,ed.name,`Wrong byline ${day}`);
 }
}
console.log('OK: 31 articles; editions 1–30; 4 lists with 10 entries; image credits and citations present.');
