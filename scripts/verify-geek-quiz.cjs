/* eslint-disable @typescript-eslint/no-require-imports -- Standalone validation loads TypeScript source. */
const fs = require('node:fs');
const ts = require('typescript');
const assert = require('node:assert/strict');
require.extensions['.ts'] = (mod, filename) => mod._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, filename);
const { getGeekEdition, geekQuizUpdatedAt, geekQuizRounds } = require('../src/lib/geek-quiz.ts');
const { searchNews } = require('../src/lib/search-news.ts');
const start = Date.parse(geekQuizUpdatedAt);
const boundary = start + 3 * 86_400_000;
const first = getGeekEdition(new Date(start));
assert.equal(getGeekEdition(new Date(boundary - 1)).id, first.id);
assert.notEqual(getGeekEdition(new Date(boundary)).id, first.id);
assert.equal(getGeekEdition(new Date(boundary)).round.id, geekQuizRounds[1].id);
assert.equal(getGeekEdition(new Date(boundary)).nextUpdate, new Date(start + 6 * 86_400_000).toISOString());
assert.notEqual(getGeekEdition(new Date(start + geekQuizRounds.length * 3 * 86_400_000)).id, first.id);
for (const round of geekQuizRounds) {
  assert.equal(round.questions.length, 3);
  assert.ok(round.poll.options.length >= 2);
  for (const question of round.questions) {
    assert.equal(new Set(question.options).size, 4);
    assert.ok(Number.isInteger(question.answer) && question.answer >= 0 && question.answer < 4);
    assert.ok(question.source.url.startsWith('https://'));
  }
}
const article = { slug: 'sample', title: 'Clássicos do cinema', excerpt: 'Filmes para rever', category: 'filmes', byline: 'Fernando Valerious', body: ['Batman encontra a Terra-média.'], sections: [{ title: 'O jogo', paragraphs: ['Arthur Morgan cavalga.'], source: 0 }] };
assert.equal(searchNews([article], 'batman terra media').length, 1);
assert.equal(searchNews([article], 'arthur morgan').length, 1);
assert.equal(searchNews([article], 'fernando classicos').length, 1);
assert.equal(searchNews([article], 'batman', 'games').length, 0);
assert.equal(searchNews([article], 'assunto inexistente').length, 0);
assert.equal(searchNews([article], '').length, 1);
console.log('PASS: three-day boundaries, renewed response IDs, answer validity and full-text search with accents and category filtering.');
