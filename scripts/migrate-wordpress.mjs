import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import TurndownService from 'turndown';

const ORIGIN = process.env.WP_ORIGIN || 'https://runtimerobotics.com';
const POSTS_API = `${ORIGIN.replace(/\/$/, '')}/wp-json/wp/v2/posts?per_page=100&_embed=1`;
const OUT_DIR = path.resolve('src/pages');
const MEDIA_DIR = path.resolve('public/wp-media');

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-'
});

turndown.addRule('removeScripts', {
  filter: ['script', 'style', 'noscript'],
  replacement: () => ''
});

function decodeBasicEntities(value = '') {
  return value
    .replace(/&#8211;|&ndash;/g, '–')
    .replace(/&#8212;|&mdash;/g, '—')
    .replace(/&#8217;|&rsquo;/g, '’')
    .replace(/&#8220;|&ldquo;/g, '“')
    .replace(/&#8221;|&rdquo;/g, '”')
    .replace(/&#038;|&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ');
}

function stripHtml(html = '') {
  return decodeBasicEntities(html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim());
}

function safeName(url, slug) {
  const parsed = new URL(url);
  let filename = decodeURIComponent(path.basename(parsed.pathname)) || 'image';
  filename = filename.replace(/[^a-zA-Z0-9._-]/g, '-');
  const ext = path.extname(filename);
  const stem = path.basename(filename, ext).slice(0, 80) || 'image';
  const hash = crypto.createHash('sha1').update(url).digest('hex').slice(0, 8);
  return `${slug}-${stem}-${hash}${ext || '.jpg'}`;
}

async function downloadImage(url, slug) {
  if (!url.startsWith('http')) return url;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    const filename = safeName(url, slug);
    const target = path.join(MEDIA_DIR, filename);
    const data = Buffer.from(await response.arrayBuffer());
    await fs.writeFile(target, data);
    return `/wp-media/${filename}`;
  } catch (error) {
    console.warn(`  ! Could not download ${url}: ${error.message}`);
    return url;
  }
}

async function localizeImages(html, slug) {
  const matches = [...html.matchAll(/<img\b[^>]*?\bsrc=["']([^"']+)["'][^>]*>/gi)];
  const replacements = new Map();

  for (const match of matches) {
    const remote = match[1];
    if (!replacements.has(remote)) {
      replacements.set(remote, await downloadImage(remote, slug));
    }
  }

  let localized = html;
  for (const [remote, local] of replacements) {
    localized = localized.split(remote).join(local);
  }

  // Remove WordPress srcset/sizes so browsers do not request the old server.
  localized = localized
    .replace(/\s+srcset=["'][^"']*["']/gi, '')
    .replace(/\s+sizes=["'][^"']*["']/gi, '');

  return localized;
}

async function getAllPosts() {
  const posts = [];
  let page = 1;
  while (true) {
    const url = `${POSTS_API}&page=${page}`;
    const response = await fetch(url);
    if (response.status === 400 && page > 1) break;
    if (!response.ok) throw new Error(`WordPress API failed: ${response.status} ${response.statusText}`);
    const batch = await response.json();
    posts.push(...batch);
    const totalPages = Number(response.headers.get('x-wp-totalpages') || '1');
    if (page >= totalPages) break;
    page += 1;
  }
  return posts;
}

async function migrate() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.mkdir(MEDIA_DIR, { recursive: true });

  console.log(`Reading WordPress posts from ${ORIGIN}`);
  const posts = await getAllPosts();
  console.log(`Found ${posts.length} post(s)`);

  for (const post of posts) {
    const slug = post.slug;
    const title = decodeBasicEntities(post.title?.rendered || slug);
    const excerpt = stripHtml(post.excerpt?.rendered || '').slice(0, 180);
    const localizedHtml = await localizeImages(post.content?.rendered || '', slug);
    const markdown = turndown.turndown(localizedHtml);

    const frontmatter = [
      '---',
      `layout: ../layouts/BlogPostLayout.astro`,
      `title: ${JSON.stringify(title)}`,
      `description: ${JSON.stringify(excerpt)}`,
      `date: ${JSON.stringify(post.date)}`,
      '---',
      ''
    ].join('\n');

    const target = path.join(OUT_DIR, `${slug}.md`);
    const temporaryAstroPage = path.join(OUT_DIR, `${slug}.astro`);
    await fs.rm(temporaryAstroPage, { force: true });
    await fs.writeFile(target, `${frontmatter}${markdown}\n`, 'utf8');
    console.log(`  ✓ ${slug}/`);
  }

  const site = ORIGIN.replace(/\/$/, '');
  const urls = [
    `${site}/`,
    `${site}/blog/`,
    ...posts.map((post) => `${site}/${post.slug}/`)
  ];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${url}</loc></url>`).join('\n')}\n</urlset>\n`;
  await fs.writeFile(path.resolve('public/sitemap.xml'), sitemap, 'utf8');

  console.log('\nDone. Review the generated Markdown, then run: npm run build');
}

migrate().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
