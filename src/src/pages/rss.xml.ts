import rss from '@astrojs/rss';

import { getPostUrl, getPublishedPosts } from '../lib/content';

export async function GET(context: { site?: URL }) {
  const posts = await getPublishedPosts();

  return rss({
    customData: '<language>es-CO</language>',
    description: 'Ideas, guías y perspectivas de Bigmelo sobre inteligencia artificial, identidad y presencia digital.',
    items: posts.map((post) => ({
      categories: post.data.tags,
      description: post.data.description,
      link: getPostUrl(post),
      pubDate: post.data.publishedAt,
      title: post.data.title,
    })),
    site: context.site ?? new URL('https://blog.bigmelo.com'),
    title: 'Bigmelo Blog',
  });
}
