// Every blog post is a Markdown page using BlogPostLayout; the blog lists, RSS, sitemap and llms.txt read this list.
import { existsSync } from 'node:fs';

type PostModule = { frontmatter: Record<string, any>; rawContent: () => string };
const files = import.meta.glob<PostModule>('../pages/*.md', { eager: true });

export const posts = Object.entries(files)
  .filter(([, mod]) => mod.frontmatter.layout?.includes('BlogPostLayout'))
  .map(([path, mod]) => {
    const fm = mod.frontmatter;
    const webp = fm.image?.replace(/\.(jpe?g|png)$/, '.webp');
    return {
      slug: path.split('/').pop()!.replace(/\.md$/, ''),
      title: fm.title as string,
      description: fm.description as string,
      image: fm.image as string,
      // Cards use the lighter WebP twin of a JPG/PNG share image when one exists.
      thumbnail: (webp && existsSync(`public/${webp}`) ? webp : fm.image) as string,
      date: fm.date as string,
      displayDate: new Date(fm.date).toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }),
      author: fm.author as string | undefined,
      service: fm.service as string | undefined,
      tags: (fm.tags ?? []) as string[],
      readingMinutes: Math.max(1, Math.round(mod.rawContent().replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length / 220))
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

export type Post = (typeof posts)[number];

// Posts sharing the most tags first, newest breaking ties.
export const relatedPosts = (post: Post, count = 2) =>
  posts
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ p, shared: p.tags.filter((t) => post.tags.includes(t)).length }))
    .sort((a, b) => b.shared - a.shared || b.p.date.localeCompare(a.p.date))
    .slice(0, count)
    .map(({ p }) => p);
