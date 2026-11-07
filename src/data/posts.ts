// Every blog post is a Markdown page using BlogPostLayout; RSS, sitemap and llms.txt read this list.
const files = import.meta.glob<{ frontmatter: Record<string, string> }>('../pages/*.md', { eager: true });

export const posts = Object.entries(files)
  .filter(([, mod]) => mod.frontmatter.layout?.includes('BlogPostLayout'))
  .map(([path, mod]) => ({
    slug: path.split('/').pop()!.replace(/\.md$/, ''),
    title: mod.frontmatter.title,
    description: mod.frontmatter.description,
    image: mod.frontmatter.image,
    date: mod.frontmatter.date
  }))
  .sort((a, b) => b.date.localeCompare(a.date));
