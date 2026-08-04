/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_ADMIN_URL?: string;
  readonly PUBLIC_GA4_MEASUREMENT_ID?: string;
  readonly PUBLIC_MAIN_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  dataLayer: unknown[][];
  gtag: (...args: unknown[]) => void;
}
