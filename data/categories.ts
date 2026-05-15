import type { Category } from '@/lib/types';

const IMG = (id: string) => `/products/${id}.jpg`;

export const categories: Category[] = [
  {
    slug: 'phones-tablets',
    name: { en: 'Phones & Tablets', fr: 'Téléphones & Tablettes' },
    tagline: {
      en: 'Smartphones, tablets & accessories',
      fr: 'Smartphones, tablettes & accessoires',
    },
    description: {
      en: 'The latest Tecno, Samsung, iPhone, Infinix and Itel — sealed, warrantied and ready to ship.',
      fr: 'Les derniers Tecno, Samsung, iPhone, Infinix et Itel — scellés, garantis et prêts à expédier.',
    },
    cover: IMG('photo-1598327105666-5b89351aff97'),
    icon: 'phones',
  },
  {
    slug: 'computers',
    name: { en: 'Computers & Office', fr: 'Informatique & Bureautique' },
    tagline: {
      en: 'Laptops, monitors, printers & peripherals',
      fr: 'PC portables, écrans, imprimantes & périphériques',
    },
    description: {
      en: 'Work-ready laptops and office gear from HP, Dell, Lenovo and Apple — built to last.',
      fr: "PC portables et matériel de bureau prêts à l'emploi : HP, Dell, Lenovo et Apple — faits pour durer.",
    },
    cover: IMG('photo-1547082299-de196ea013d6'),
    icon: 'computers',
  },
  {
    slug: 'tv-audio',
    name: { en: 'TV, Audio & Photo', fr: 'TV, Audio & Photo' },
    tagline: {
      en: 'Smart TVs, speakers, headphones & cameras',
      fr: 'TV connectées, enceintes, casques & appareils photo',
    },
    description: {
      en: 'Bring the cinema home — 4K smart TVs, JBL sound systems and Canon cameras.',
      fr: 'Le cinéma à la maison — TV 4K connectées, systèmes son JBL et appareils Canon.',
    },
    cover: IMG('photo-1593359677879-a4bb92f829d1'),
    icon: 'tv',
  },
  {
    slug: 'appliances',
    name: { en: 'Home Appliances', fr: 'Électroménager' },
    tagline: {
      en: 'Fridges, air conditioners, washers & cookers',
      fr: 'Réfrigérateurs, climatiseurs, lave-linge & cuisinières',
    },
    description: {
      en: 'The big appliances that keep a home running — Nasco, Hisense, LG and Binatone.',
      fr: 'Le gros électroménager qui fait tourner une maison — Nasco, Hisense, LG et Binatone.',
    },
    cover: IMG('photo-1571175443880-49e1d25b2bc5'),
    icon: 'appliances',
  },
  {
    slug: 'kitchen',
    name: { en: 'Kitchen & Cookware', fr: 'Cuisine & Ustensiles' },
    tagline: {
      en: 'Blenders, kettles, cookware & small appliances',
      fr: 'Blenders, bouilloires, casseroles & petit électroménager',
    },
    description: {
      en: 'Everything for the kitchen — sold by the unit or by the carton at wholesale prices.',
      fr: "Tout pour la cuisine — à l'unité ou au carton, à prix de gros.",
    },
    cover: IMG('photo-1556911220-bff31c812dba'),
    icon: 'kitchen',
  },
  {
    slug: 'bathroom',
    name: { en: 'Bathroom & Shower', fr: 'Salle de bain & Douche' },
    tagline: {
      en: 'Showers, water heaters, taps & sanitaryware',
      fr: 'Douches, chauffe-eau, robinetterie & sanitaire',
    },
    description: {
      en: 'Everything to fit out a bathroom — showers, water heaters, basins, taps and cabinets.',
      fr: 'Tout pour équiper une salle de bain — douches, chauffe-eau, lavabos, robinetterie et meubles.',
    },
    cover: IMG('photo-1620626011761-996317b8d101'),
    icon: 'bathroom',
  },
  {
    slug: 'home-living',
    name: { en: 'Home & Furniture', fr: 'Maison & Mobilier' },
    tagline: {
      en: 'Sofas, beds, tables & storage',
      fr: 'Canapés, lits, tables & rangement',
    },
    description: {
      en: 'Furnish every room — solid furniture delivered, and assembled wherever we can.',
      fr: 'Meublez chaque pièce — du mobilier solide livré, et monté quand nous le pouvons.',
    },
    cover: IMG('photo-1586023492125-27b2c045efd7'),
    icon: 'home',
  },
  {
    slug: 'beaute',
    name: { en: 'Beauty & Care', fr: 'Beauté & Soins' },
    tagline: {
      en: 'Hair care, soaps, oils & natural skincare',
      fr: 'Soins capillaires, savons, huiles & soins naturels',
    },
    description: {
      en: 'Natural beauty and body care — artisanal hair products, African black soap, raw shea butter and pure oils.',
      fr: 'Beauté naturelle et soins du corps — produits capillaires artisanaux, savon noir africain, beurre de karité brut et huiles pures.',
    },
    cover: IMG('queen-rishma-creme-1'),
    icon: 'beaute',
  },
];

export const categoriesBySlug: Record<string, Category> = Object.fromEntries(
  categories.map((c) => [c.slug, c]),
);
