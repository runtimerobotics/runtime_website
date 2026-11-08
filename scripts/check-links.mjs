// Checks the built site (dist/) for broken internal links, images and #anchors.
// Usage: npm run build && npm run check:links
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const base = (process.env.BASE_PATH || '/').replace(/\/?$/, '/');
const files = (dir) => readdirSync(dir).flatMap((f) => (statSync(join(dir, f)).isDirectory() ? files(join(dir, f)) : [join(dir, f)]));
const pages = files(dist).filter((f) => f.endsWith('.html'));
const ids = new Map(pages.map((p) => [p, new Set([...readFileSync(p, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]))]));

const resolve = (path) => {
  const local = join(dist, decodeURI(path.slice(base.length)));
  if (existsSync(local) && statSync(local).isFile()) return local;
  if (existsSync(join(local, 'index.html'))) return join(local, 'index.html');
  return null;
};

const broken = [];
for (const page of pages) {
  const html = readFileSync(page, 'utf8');
  for (const [, url] of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:|data:|\/\/)/.test(url)) continue;
    const [path, hash] = url.split('#');
    if (!path) { if (hash && !ids.get(page).has(hash)) broken.push([page, url]); continue; }
    if (!path.startsWith(base)) continue;
    const target = resolve(path.split('?')[0]);
    if (!target) broken.push([page, url]);
    else if (hash && target.endsWith('.html') && !ids.get(target)?.has(hash)) broken.push([page, url]);
  }
}

if (broken.length) {
  for (const [page, url] of broken) console.error(`✗ ${relative(dist, page)} → ${url}`);
  console.error(`\n${broken.length} broken link(s) in ${pages.length} pages`);
  process.exit(1);
}
console.log(`✓ ${pages.length} pages, no broken internal links, images or anchors`);
