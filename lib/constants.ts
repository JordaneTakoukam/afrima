import type { Localized } from './types';

export const SITE = {
  name: 'AFRIMA',
  url: 'https://afrima.vercel.app',
  description: {
    en: 'Electronics & home goods at wholesale prices — ordered online, delivered across Cameroon and Africa.',
    fr: "Électronique & équipement maison à prix de gros — commandé en ligne, livré au Cameroun et partout en Afrique.",
  } satisfies Localized,
} as const;

export const LOCALES = ['fr', 'en'] as const;
export const DEFAULT_LOCALE = 'fr';

/** Free delivery above this cart subtotal (FCFA). */
export const FREE_SHIPPING_THRESHOLD = 150_000;
/** Flat delivery fee below the free-shipping threshold (FCFA). */
export const SHIPPING_FEE = 3_000;
