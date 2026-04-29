import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  // Disable browser-language auto-detection — / always serves EN
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
