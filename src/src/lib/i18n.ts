export type Locale = 'en' | 'es';

export const locales: Record<
  Locale,
  {
    articlesLabel: string;
    articlesPath: string;
    categoriesLabel: string;
    categoriesPath: string;
    homePath: string;
    htmlLang: string;
    languageLabel: string;
  }
> = {
  en: {
    articlesLabel: 'Articles',
    articlesPath: '/en/articles',
    categoriesLabel: 'Categories',
    categoriesPath: '/en/categories',
    homePath: '/en',
    htmlLang: 'en-US',
    languageLabel: 'ES',
  },
  es: {
    articlesLabel: 'Artículos',
    articlesPath: '/es/articulos',
    categoriesLabel: 'Categorías',
    categoriesPath: '/es/categorias',
    homePath: '/es',
    htmlLang: 'es-CO',
    languageLabel: 'EN',
  },
};

export function otherLocale(locale: Locale): Locale {
  return locale === 'es' ? 'en' : 'es';
}

export function formatDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === 'es' ? 'es-CO' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}
