import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import ts from 'typescript';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
function loadConfig(name) {
  const filename = path.join(root, 'editorial-config', name + '.ts');
  const exports = {};
  const source = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  vm.runInNewContext(source, { exports, Date, Intl, require: relative => {
    if (!['./editors', './editorial-calendar'].includes(relative)) throw new Error('Unsupported config import');
    return loadConfig(relative.slice(2));
  } }, { filename });
  return exports;
}
const argument = process.argv.find(arg => arg.startsWith('--at='));
const now = argument ? new Date(argument.slice(5)) : new Date();
if (Number.isNaN(now.getTime())) throw new Error('Invalid --at timestamp');
const plan = loadConfig('bot-plan').getBotPlan(now);
if (process.argv.includes('--queue')) {
  const directory = path.resolve(root, '..', 'editorial-drafts', plan.date);
  fs.mkdirSync(directory, { recursive: true });
  const filename = path.join(directory, 'plan.json');
  try { fs.writeFileSync(filename, JSON.stringify(plan, null, 2) + '\n', { flag: 'wx' }); }
  catch (error) { if (error.code !== 'EEXIST') throw error; }
}
console.log(JSON.stringify(plan, null, 2));

