export type Locale = 'en' | 'fr';

export type Localized<T = string> = { en: T; fr: T };

export type Region = 'west' | 'central' | 'north' | 'east' | 'southern';

export type Country = {
  slug: string;
  name: Localized;
  nameLocal?: string;
  flag: string;
  region: Region;
  regions: string[];
  ethnicGroups: string[];
  signatureProduct: Localized;
  description: Localized;
  productCount: number;
  heroImage: string;
};

export type Category = {
  slug: string;
  name: Localized;
  description: Localized;
  longDescription: Localized;
  cover: string;
  icon: string;
  numberLabel: string;
  subcategories?: Localized[];
};

export type ProductLabel =
  | 'made-in-africa'
  | 'hand-made'
  | 'fair-trade'
  | 'limited-edition'
  | 'authentic';

export type ProductUsage = 'wedding' | 'ceremony' | 'daily' | 'spiritual' | 'royal';

export type Product = {
  slug: string;
  name: Localized;
  price: number;
  originalPrice?: number;
  currency: 'EUR' | 'USD' | 'XOF';
  country: string;
  region?: string;
  ethnicGroup?: string;
  category: string;
  subcategory?: string;
  images: string[];
  artisanSlug: string;
  description: Localized;
  culturalContext: Localized;
  materials: string[];
  dimensions?: string;
  usage: ProductUsage[];
  labels: ProductLabel[];
  shipsFrom: string;
  availableIn: ('africa' | 'europe' | 'americas' | 'asia')[];
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  soldCount: number;
  featured?: boolean;
  bestseller?: boolean;
  newArrival?: boolean;
  flashDeal?: boolean;
};

export type Artisan = {
  slug: string;
  name: string;
  country: string;
  region: string;
  craft: Localized;
  bio: Localized;
  quote: Localized;
  photo: string;
  yearsOfExperience: number;
  productSlugs: string[];
  signature: Localized;
  pronouns?: 'she' | 'he' | 'they';
};

export type Story = {
  slug: string;
  title: Localized;
  excerpt: Localized;
  content: Localized;
  cover: string;
  category: Localized;
  readTime: number;
  publishedAt: string;
};

export type Deal = {
  productSlug: string;
  discount: number;
  endsAt: string;
  stockLeft: number;
};

export type Review = {
  productSlug: string;
  author: string;
  authorCountry: string;
  rating: number;
  date: string;
  comment: Localized;
  verified: boolean;
};
