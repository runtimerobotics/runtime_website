import type { APIContext } from 'astro';
import { posts } from '../data/posts';
import { servicePages } from '../data/servicePages';

// Generated so new posts and services are listed automatically; posts carry their publish date.
export function GET(context: APIContext) {
  const url = (path: string) => new URL(`${import.meta.env.BASE_URL}${path}`, context.site).href;
  const entries = [
    { loc: url('') },
    { loc: url('blog/'), lastmod: posts[0]?.date },
    ...posts.map((post) => ({ loc: url(`${post.slug}/`), lastmod: post.date })),
    ...servicePages.map((page) => ({ loc: url(`${page.slug}/`) }))
  ];
  const body = entries
    .map((e) => `  <url><loc>${e.loc}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ''}</url>`)
    .join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml' } }
  );
}
