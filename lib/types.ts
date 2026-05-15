export type Locale = 'en' | 'fr';

export type Localized<T = string> = { en: T; fr: T };

/** A single key/value technical specification row. */
export type Spec = {
  label: Localized;
  value: string;
};

export type Product = {
  slug: string;
  name: Localized;
  brand: string;
  /** Price in FCFA (XAF). */
  price: number;
  /** Crossed-out reference price in FCFA, when on sale. */
  originalPrice?: number;
  category: string;
  images: string[];
  description: Localized;
  /** Short selling points shown as bullets. */
  highlights: Localized<string[]>;
  specs: Spec[];
  /** Warranty length in months. */
  warrantyMonths: number;
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  soldCount: number;
  /** Available at wholesale / bulk pricing. */
  wholesale?: boolean;
  featured?: boolean;
  bestseller?: boolean;
  newArrival?: boolean;
  flashDeal?: boolean;
};

export type Category = {
  slug: string;
  name: Localized;
  tagline: Localized;
  description: Localized;
  cover: string;
  /** lucide-react icon name. */
  icon: string;
};

export type Review = {
  productSlug: string;
  author: string;
  authorCity: string;
  rating: number;
  date: string;
  comment: Localized;
  verified: boolean;
};

export type Deal = {
  productSlug: string;
  endsAt: string;
};

export type PaymentMethod = {
  id: 'mtn-momo' | 'orange-money' | 'card' | 'paypal' | 'bank-transfer';
  name: Localized;
  blurb: Localized;
  /** Hex accent for the method chip. */
  color: string;
};

export type DeliveryZone = {
  id: string;
  label: Localized;
  estimate: Localized;
};
