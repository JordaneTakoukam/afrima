export const SITE = {
  name: 'AFRIMA',
  url: 'https://afrima.demo',
  description: {
    en: 'The Pan-African marketplace of authentic culture. 22 countries, 250+ artisans, direct prices.',
    fr: "Le marché pan-africain de la culture authentique. 22 pays, 250+ artisans, prix direct.",
  },
} as const;

export const LOCALES = ['en', 'fr'] as const;
export const DEFAULT_LOCALE = 'en';

export const FREE_SHIPPING_THRESHOLD = 100;
export const SHIPPING_FEE = 9.99;
