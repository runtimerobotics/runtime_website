import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { posts } from '../data/posts';

export function GET(context: APIContext) {
  return rss({
    title: 'RUNTIME Robotics Blog',
    description: 'Articles on ROS 2, NVIDIA Isaac, simulation, synthetic data and Physical AI from RUNTIME Robotics.',
    site: context.site!,
    trailingSlash: true,
    items: posts.map((post) => ({
      title: post.title,
      description: post.description,
      pubDate: new Date(post.date),
      link: `${import.meta.env.BASE_URL}${post.slug}/`
    }))
  });
}
