import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

const productionSite = 'https://blog.bigmelo.com';
const site = process.env.CI ? productionSite : (process.env.SITE_URL ?? productionSite);

export default defineConfig({
  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: {
          en: 'en-US',
          es: 'es-CO',
        },
      },
    }),
  ],
  output: 'static',
  site,
  trailingSlash: 'never',
});
