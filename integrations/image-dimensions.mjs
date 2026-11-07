// Adds width/height to <img> tags in the built HTML so the browser can reserve
// space before images load (no layout shift). Reads sizes straight from the
// image headers, so it needs no image library.
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

export function imageSize(buf) {
  // PNG: IHDR width/height at bytes 16-23
  if (buf.readUInt32BE(0) === 0x89504e47) return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  // WebP: RIFF....WEBP + VP8 / VP8L / VP8X chunk
  if (buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
    const chunk = buf.toString('ascii', 12, 16);
    if (chunk === 'VP8 ') return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    if (chunk === 'VP8L') {
      const b = buf.readUInt32LE(21);
      return { width: (b & 0x3fff) + 1, height: ((b >> 14) & 0x3fff) + 1 };
    }
    if (chunk === 'VP8X') return { width: buf.readUIntLE(24, 3) + 1, height: buf.readUIntLE(27, 3) + 1 };
  }
  // JPEG: walk segments to the first SOFn marker
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length) {
      const marker = buf[i + 1];
      const len = buf.readUInt16BE(i + 2);
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { width: buf.readUInt16BE(i + 7), height: buf.readUInt16BE(i + 5) };
      }
      i += 2 + len;
    }
  }
  return null;
}

async function htmlFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await htmlFiles(path)));
    else if (entry.name.endsWith('.html')) out.push(path);
  }
  return out;
}

export default function imageDimensions() {
  let base = '/';
  return {
    name: 'image-dimensions',
    hooks: {
      'astro:config:done': ({ config }) => { base = config.base.endsWith('/') ? config.base : `${config.base}/`; },
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const cache = new Map();
        let added = 0;
        for (const file of await htmlFiles(root)) {
          const html = await readFile(file, 'utf8');
          const next = await replaceAsync(html, /<img\b[^>]*>/g, async (tag) => {
            if (/\swidth=/.test(tag) || /\sheight=/.test(tag)) return tag;
            const src = tag.match(/\ssrc="([^"]+)"/)?.[1];
            if (!src || !src.startsWith(base)) return tag;
            const path = join(root, decodeURI(src.slice(base.length)));
            if (!cache.has(path)) cache.set(path, await readFile(path).then(imageSize).catch(() => null));
            const size = cache.get(path);
            if (!size) return tag;
            added++;
            return tag.replace(/^<img\b/, `<img width="${size.width}" height="${size.height}"`);
          });
          if (next !== html) await writeFile(file, next);
        }
        logger.info(`added width/height to ${added} images`);
      }
    }
  };
}

async function replaceAsync(str, regex, fn) {
  const parts = await Promise.all([...str.matchAll(regex)].map((m) => fn(m[0])));
  let i = 0;
  return str.replace(regex, () => parts[i++]);
}
