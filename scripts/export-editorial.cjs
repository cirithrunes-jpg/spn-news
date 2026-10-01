/* eslint-disable @typescript-eslint/no-require-imports -- CLI for exporting the TypeScript editorial archive. */
const fs=require('node:fs'),ts=require('typescript');
require.extensions['.ts']=(mod,filename)=>mod._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,filename);
const{news,newsPublishedAt}=require('../src/lib/news.ts');
const{editorialSchedule}=require('../editorial-config/editorial-calendar.ts');
const kind=process.argv[2],start=Number(process.argv[3]??0),count=Number(process.argv[4]??5);
console.log(JSON.stringify(kind==='schedule'?editorialSchedule:news.slice(start,start+count).map(item=>({...item,publishedAt:item.publishedAt??newsPublishedAt}))));

