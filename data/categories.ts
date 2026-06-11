import type { Category } from '@/lib/types';

const IMG = (id: string) => `/catalog/${id}.jpg`;

export const categories: Category[] = [
  {
    slug: 'textiles',
    name: { en: 'Fashion & Textiles', fr: 'Mode & Textiles' },
    tagline: {
      en: 'Traditional outfits, woven fabrics & embroidery',
      fr: 'Tenues traditionnelles, tissus tissés & broderies',
    },
    description: {
      en: 'African fashion and authentic textiles — toghu, ndop, woven pagne, embroidered boubous and ceremonial outfits, hand-made by our artisans.',
      fr: 'La mode africaine et les textiles authentiques — toghu, ndop, pagne tissé, boubous brodés et tenues de cérémonie, faits main par nos artisans.',
    },
    cover: IMG('pagne-traditionnel-1'),
    icon: 'textiles',
  },
  {
    slug: 'artisanat',
    name: { en: 'Crafts & Art', fr: 'Artisanat & Art' },
    tagline: {
      en: 'Bags, carved wood, fans & handmade objects',
      fr: 'Sacs, bois sculpté, éventails & objets faits main',
    },
    description: {
      en: 'African craft and art — ndop leather bags, hand-carved wooden utensils, woven fans and decorative objects that carry real cultural heritage.',
      fr: "L'artisanat et l'art africains — sacs en cuir ndop, ustensiles en bois sculpté, éventails tressés et objets décoratifs porteurs d'un véritable héritage culturel.",
    },
    cover: IMG('sac-ndop-1'),
    icon: 'artisanat',
  },
  {
    slug: 'beaute',
    name: { en: 'Beauty & Wellness', fr: 'Beauté & Bien-être' },
    tagline: {
      en: 'Shea butter, black soap, oils & natural care',
      fr: 'Karité, savon noir, huiles & soins naturels',
    },
    description: {
      en: 'Natural African beauty — raw shea butter, traditional black soap, pure plant oils and artisanal hair and body care, made the way it always has been.',
      fr: 'La beauté naturelle africaine — beurre de karité brut, savon noir traditionnel, huiles végétales pures et soins capillaires et corporels artisanaux, faits comme depuis toujours.',
    },
    cover: IMG('queen-rishma-creme-1'),
    icon: 'beaute',
  },
  {
    slug: 'gastronomie',
    name: { en: 'Food & Gastronomy', fr: 'Gastronomie' },
    tagline: {
      en: 'Spices, coffee, dried goods & local flavours',
      fr: 'Épices, café, produits secs & saveurs locales',
    },
    description: {
      en: 'African gastronomy — roasted coffee, local spices, dried foods and traditional condiments, sourced straight from the producers.',
      fr: 'La gastronomie africaine — café torréfié, épices locales, produits secs et condiments traditionnels, sourcés directement chez les producteurs.',
    },
    cover: IMG('cafe-grains'),
    icon: 'gastronomie',
  },
  {
    slug: 'maison',
    name: { en: 'Home & Decoration', fr: 'Maison & Décoration' },
    tagline: {
      en: 'Raffia, baskets, décor & event styling',
      fr: 'Raphia, paniers, décor & décoration événementielle',
    },
    description: {
      en: 'African home and decoration — woven raffia, baskets, decorative objects and complete event-styling sets to bring a space to life.',
      fr: 'La maison et la décoration africaines — raphia tressé, paniers, objets décoratifs et ensembles de décoration événementielle complets pour faire vivre un espace.',
    },
    cover: IMG('decor-raphia-set'),
    icon: 'maison',
  },
  {
    slug: 'culture',
    name: { en: 'Culture & Heritage', fr: 'Culture & Héritage' },
    tagline: {
      en: 'Ceremonial pieces, beadwork & cultural objects',
      fr: 'Pièces de cérémonie, perles & objets culturels',
    },
    description: {
      en: 'Culture and heritage — ceremonial outfits, beaded regalia and cultural pieces for weddings, dowries and traditional celebrations across Africa.',
      fr: 'La culture et le patrimoine — tenues de cérémonie, parures perlées et pièces culturelles pour mariages, dots et célébrations traditionnelles à travers l’Afrique.',
    },
    cover: IMG('tenue-ceremonie-homme'),
    icon: 'culture',
  },
];

export const categoriesBySlug: Record<string, Category> = Object.fromEntries(
  categories.map((c) => [c.slug, c]),
);
