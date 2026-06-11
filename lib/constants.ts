import type { Localized } from './types';

export const SITE = {
  name: 'AFRIMA',
  url: 'https://afrima.vercel.app',
  description: {
    en: 'The pan-African marketplace for authentic culture, craft and food — textiles, art, natural beauty and gastronomy, delivered across Africa and the diaspora.',
    fr: "La marketplace panafricaine de la culture, de l'artisanat et du terroir authentiques — textiles, art, beauté naturelle et gastronomie, livrés en Afrique et dans la diaspora.",
  } satisfies Localized,
} as const;

export const LOCALES = ['fr', 'en'] as const;
export const DEFAULT_LOCALE = 'fr';

/** Free delivery above this cart subtotal (FCFA). */
export const FREE_SHIPPING_THRESHOLD = 150_000;
/** Flat delivery fee below the free-shipping threshold (FCFA). */
export const SHIPPING_FEE = 3_000;
