import { getCollection, type CollectionEntry } from 'astro:content';

import type { Locale } from './i18n';

export type BlogPost = CollectionEntry<'blog'>;
export type BlogCategory = CollectionEntry<'categories'>;

export async function getPublishedPosts(locale?: Locale): Promise<BlogPost[]> {
  const posts = await getCollection('blog', ({ data }) => {
    if (data.draft) return false;
    return locale ? data.locale === locale : true;
  });

  return posts.sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());
}

export async function getCategories(locale: Locale): Promise<BlogCategory[]> {
  const categories = await getCollection('categories', ({ data }) => data.locale === locale);
  return categories.sort((a, b) => a.data.name.localeCompare(b.data.name, locale));
}

export function getEntrySlug(entry: { id: string }): string {
  return entry.id.split('/').at(-1) ?? entry.id;
}

export function getPostUrl(post: BlogPost): string {
  const segment = post.data.locale === 'es' ? 'articulos' : 'articles';
  return `/${post.data.locale}/${segment}/${getEntrySlug(post)}`;
}

export function getCategoryUrl(category: BlogCategory): string {
  const segment = category.data.locale === 'es' ? 'categorias' : 'categories';
  return `/${category.data.locale}/${segment}/${getEntrySlug(category)}`;
}

export function postBelongsToCategory(post: BlogPost, category: BlogCategory): boolean {
  return post.data.categories.some((reference) => reference.id === category.id);
}

export function readingTime(body: string): number {
  const words = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#*_>`\[\]()-]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 210));
}
