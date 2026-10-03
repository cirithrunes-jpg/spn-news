#!/usr/bin/env node
import { readdir, stat, access, readFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(process.env.WIX_EXPORT_DIR || '.wix-export');
const MB = 1024 * 1024;

const walk = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else files.push(full);
  }
  return files;
};

try {
  await access(path.join(ROOT, 'index.html'));
} catch {
  console.error('Wix preflight: missing top-level index.html. Run npm run wix:export first.');
  process.exit(1);
}

const files = await walk(ROOT);
let total = 0;
const oversized = [];

for (const file of files) {
  const s = await stat(file);
  total += s.size;
  if (s.size > 3 * MB) oversized.push({ file: path.relative(ROOT, file), mb: (s.size / MB).toFixed(2) });
}

const manifestPath = path.join(ROOT, 'wix-export-manifest.json');
let manifest = null;
try { manifest = JSON.parse(await readFile(manifestPath, 'utf8')); } catch {}

console.log('SPN → Wix preflight');
console.log(`Files: ${files.length}`);
console.log(`Total: ${(total / MB).toFixed(2)} MB / 20 MB`);
console.log(`Oversized files: ${oversized.length} / 3 MB each`);
if (manifest?.errors?.length) console.log(`Exporter warnings: ${manifest.errors.length}`);

if (oversized.length) {
  for (const item of oversized) console.error(`- ${item.file}: ${item.mb} MB`);
}
if (total > 20 * MB || oversized.length) {
  console.error('Preflight failed: package exceeds Wix static upload limits.');
  process.exit(2);
}
console.log('Preflight OK: static package fits Wix upload limits.');
