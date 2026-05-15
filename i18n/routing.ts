import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localePrefix: 'as-needed',
  // Disable browser-language auto-detection — / always serves the default locale.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
