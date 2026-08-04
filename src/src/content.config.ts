import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const authors = defineCollection({
  loader: glob({ base: './src/data/authors', pattern: '**/*.json' }),
  schema: z.object({
    bio: z.string().min(20),
    name: z.string().min(2),
    role: z.string().min(2),
  }),
});

const categories = defineCollection({
  loader: glob({ base: './src/data/categories', pattern: '**/*.json' }),
  schema: z.object({
    description: z.string().min(20),
    eyebrow: z.string().min(2),
    locale: z.enum(['en', 'es']),
    name: z.string().min(2),
    translationKey: z.string().min(2),
  }),
});

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      author: reference('authors'),
      categories: z.array(reference('categories')).min(1),
      cover: image(),
      coverAlt: z.string().min(10),
      description: z.string().min(40).max(180),
      draft: z.boolean().default(false),
      featured: z.boolean().default(false),
      locale: z.enum(['en', 'es']),
      publishedAt: z.coerce.date(),
      tags: z.array(z.string().min(2)).min(1),
      title: z.string().min(10).max(100),
      translationKey: z.string().min(2),
      updatedAt: z.coerce.date().optional(),
    }),
});

export const collections = { authors, blog, categories };
