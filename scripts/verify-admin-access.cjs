/* eslint-disable @typescript-eslint/no-require-imports -- Isolated TypeScript validation CLI. */
const fs = require('node:fs'), ts = require('typescript'), assert = require('node:assert/strict');
require.extensions['.ts'] = (mod, filename) => mod._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, filename);
const { confirmationInput, accessNotice, adminAccessMessages } = require('../src/lib/admin-access.ts');
const hash = 'a'.repeat(64);
assert.deepEqual(confirmationInput(hash), { token_hash: hash, type: 'email' });
assert.deepEqual(confirmationInput(hash, 'magiclink'), { token_hash: hash, type: 'magiclink' });
for (const value of [undefined, '', 'short', 'a'.repeat(1025), 'https://example.com/token', '<script>alert(1)</script>', hash + '\n']) assert.equal(confirmationInput(value), null);
for (const type of ['invite', 'email_change', 'recovery', 'sms', 'javascript:alert(1)']) assert.equal(confirmationInput(hash, type), null);
for (const code of ['otp_expired', 'access_denied', undefined, 'provider secret']) assert.equal(accessNotice(code), 'link-invalido');
for (const code of ['bad_code_verifier', 'flow_state_not_found']) assert.equal(accessNotice(code), 'outro-navegador');
assert.match(adminAccessMessages[accessNotice('otp_expired')], /expirou/);
console.log('PASS: expired and cross-browser links have actionable errors; malformed tokens and unsupported authentication operations are rejected.');
