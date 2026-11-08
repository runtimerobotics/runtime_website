import type { APIContext } from 'astro';
import { posts } from '../data/posts';
import { servicePages } from '../data/servicePages';

// llms.txt (https://llmstxt.org): a plain-Markdown map of the site for AI assistants and crawlers.
export function GET(context: APIContext) {
  const url = (path: string) => new URL(`${import.meta.env.BASE_URL}${path}`, context.site).href;
  const body = `# RUNTIME Robotics

> Robot software engineering company in Kochi, Kerala, India. RUNTIME Robotics builds ROS 2 and Physical AI systems, from digital twins, simulation, perception and robot learning to humanoids, quadrupeds, AMRs and industrial deployment, and runs hands-on robotics training.

- Co-founders: Lentin Joseph (CEO), ROS developer and educator since 2010 and author of 11 books on ROS and robotics; and Aleena Johny, ROS software developer, educator and co-author.
- Works with commercial and research teams, remote-friendly, from prototypes through product integration.
- Core stack: ROS 2, Nav2, MoveIt, NVIDIA Isaac Sim, Isaac Lab, Isaac ROS, Omniverse, OpenUSD.
- Contact: runtimerobotics@gmail.com, +91 89075 90702 (phone and WhatsApp: https://wa.me/918907590702), ${url('#contact')}

## Services

${servicePages.map((p) => `- [${p.title}](${url(`${p.slug}/`)}): ${p.description}`).join('\n')}

## Blog

${posts.map((p) => `- [${p.title}](${url(`${p.slug}/`)}) (${p.date}): ${p.description}`).join('\n')}

## Optional

- [Blog index](${url('blog/')})
- [RSS feed](${url('rss.xml')})
- [Sitemap](${url('sitemap.xml')})
- [LinkedIn](https://www.linkedin.com/company/runtimerobotics/)
- [GitHub](https://github.com/runtimerobotics)
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
