#!/usr/bin/env node
import { mkdir, writeFile, rm, stat, readdir } from 'node:fs/promises';
import path from 'node:path';

const SOURCE = (process.env.SPN_SOURCE_URL || 'https://spn-news.vercel.app').replace(/\/$/, '');
const OUT = path.resolve(process.env.WIX_EXPORT_DIR || '.wix-export');
const MAX_PAGES = Number(process.env.WIX_MAX_PAGES || 250);

const seeds = [
  '/', '/sobre', '/atualizacoes', '/listas', '/videos', '/podcast',
  '/categoria/filmes', '/categoria/series-streaming', '/categoria/games',
  '/categoria/musica', '/categoria/famosos', '/categoria/animes-hqs',
  '/categoria/cultura-pop'
];

const blocked = (pathname) =>
  pathname.startsWith('/admin') ||
  pathname.startsWith('/api') ||
  pathname.startsWith('/_next/data');

const normalizeRoute = (pathname) => {
  const clean = pathname.replace(/\/+$/, '') || '/';
  return clean;
};

const routeFile = (pathname) => {
  const route = normalizeRoute(pathname);
  if (route === '/') return path.join(OUT, 'index.html');
  return path.join(OUT, route.slice(1), 'index.html');
};

const assetFile = (pathname) => {
  const clean = pathname.replace(/^\//, '');
  return path.join(OUT, clean);
};

const sameOriginPath = (raw) => {
  if (!raw || raw.startsWith('#') || raw.startsWith('mailto:') || raw.startsWith('tel:') || raw.startsWith('javascript:')) return null;
  try {
    const url = new URL(raw, SOURCE);
    if (url.origin !== new URL(SOURCE).origin) return null;
    return url.pathname + (url.search || '');
  } catch {
    return null;
  }
};

const unwrapNextImage = (html) =>
  html.replace(/\/_next\/image\?url=([^&"'<>\s]+)&(?:amp;)?w=\d+&(?:amp;)?q=\d+/g, (_m, encoded) => {
    try { return decodeURIComponent(encoded); } catch { return encoded; }
  });

const htmlLinks = (html) => {
  const out = new Set();
  const rx = /(?:href|src)=["']([^"'<>]+)["']/g;
  let match;
  while ((match = rx.exec(html))) {
    const value = sameOriginPath(match[1]);
    if (value) out.add(value);
  }
  return [...out];
};

const looksLikePage = (pathname) => {
  const noQuery = pathname.split('?')[0];
  if (blocked(noQuery)) return false;
  if (noQuery.startsWith('/_next/')) return false;
  if (/\.[a-z0-9]{2,6}$/i.test(noQuery)) return false;
  return true;
};

const ensureParent = async (file) => mkdir(path.dirname(file), { recursive: true });

const fetchBuffer = async (url) => {
  const res = await fetch(url, { redirect: 'follow', headers: { 'user-agent': 'SPN-Wix-Exporter/1.0' } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return { res, data: Buffer.from(await res.arrayBuffer()) };
};

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const pageQueue = [...seeds];
const seenPages = new Set();
const seenAssets = new Set();
const errors = [];

while (pageQueue.length && seenPages.size < MAX_PAGES) {
  const route = normalizeRoute(pageQueue.shift());
  if (seenPages.has(route) || blocked(route)) continue;
  seenPages.add(route);

  try {
    const { res, data } = await fetchBuffer(SOURCE + route);
    const type = res.headers.get('content-type') || '';
    if (!type.includes('text/html')) continue;

    let html = unwrapNextImage(data.toString('utf8'));
    for (const linked of htmlLinks(html)) {
      const clean = linked.split('?')[0];
      if (looksLikePage(clean)) {
        const next = normalizeRoute(clean);
        if (!seenPages.has(next)) pageQueue.push(next);
      } else if (!blocked(clean) && !linked.startsWith('/_next/image')) {
        seenAssets.add(linked);
      }
    }

    const file = routeFile(route);
    await ensureParent(file);
    await writeFile(file, html);
    process.stdout.write(`page  ${route}\n`);
  } catch (err) {
    errors.push({ type: 'page', route, error: String(err) });
    process.stderr.write(`FAIL  ${route}: ${err}\n`);
  }
}

for (const asset of [...seenAssets]) {
  const pathname = asset.split('?')[0];
  if (!pathname || blocked(pathname)) continue;

  try {
    const { data } = await fetchBuffer(SOURCE + asset);
    const file = assetFile(pathname);
    await ensureParent(file);
    await writeFile(file, data);
    process.stdout.write(`asset ${pathname}\n`);
  } catch (err) {
    errors.push({ type: 'asset', route: asset, error: String(err) });
    process.stderr.write(`FAIL  ${asset}: ${err}\n`);
  }
}

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

const files = await walk(OUT);
let totalBytes = 0;
const tooLarge = [];
for (const file of files) {
  const s = await stat(file);
  totalBytes += s.size;
  if (s.size > 3 * 1024 * 1024) tooLarge.push({ file: path.relative(OUT, file), bytes: s.size });
}

const manifest = {
  generatedAt: new Date().toISOString(),
  source: SOURCE,
  pages: [...seenPages].sort(),
  assets: [...seenAssets].sort(),
  errors,
  wixUploadChecks: {
    topLevelIndex: files.some((f) => path.relative(OUT, f) === 'index.html'),
    totalBytes,
    totalUnder20MB: totalBytes <= 20 * 1024 * 1024,
    filesOver3MB: tooLarge
  },
  adaptationsStillNeeded: [
    'Search with query parameters needs a Wix/client-side implementation.',
    'Admin/editorial routes stay outside the static public export.',
    'Supabase-backed publication and home-setting changes require a fresh export until a Wix backend adapter is added.',
    'Review canonical URLs and redirects before domain cutover.'
  ]
};

await writeFile(path.join(OUT, 'wix-export-manifest.json'), JSON.stringify(manifest, null, 2));
console.log(`\nExport ready: ${OUT}`);
console.log(`Pages: ${seenPages.size} | Files: ${files.length + 1} | Size: ${(totalBytes / 1024 / 1024).toFixed(2)} MB`);
if (errors.length) console.log(`Warnings: ${errors.length} fetch failures (see wix-export-manifest.json)`);
if (tooLarge.length || totalBytes > 20 * 1024 * 1024) process.exitCode = 2;
