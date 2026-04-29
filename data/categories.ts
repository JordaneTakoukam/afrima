import type { Category } from '@/lib/types';

export const categories: Category[] = [
  {
    slug: 'fashion-textiles',
    name: { en: 'Fashion & Textiles', fr: 'Mode & Textiles' },
    description: {
      en: 'Toghu, Kente, Aso Oke, Bogolan, Ankara, Wax — woven heritage you can wear.',
      fr: 'Toghu, Kente, Aso Oke, Bogolan, Ankara, Wax — un héritage tissé, à porter.',
    },
    longDescription: {
      en: 'From the royal Bamileke Toghu to the proverb-bearing Ashanti Kente, every textile here is more than fabric — it is a passport, a poem, a proverb. Each piece is hand-woven, hand-dyed, or embroidered by master artisans whose techniques have been refined over centuries.',
      fr: "Du Toghu royal Bamileke au Kente Ashanti chargé de proverbes, chaque textile ici est bien plus qu'un tissu — c'est un passeport, un poème, un proverbe. Chaque pièce est tissée, teinte ou brodée à la main par des artisans dont les techniques ont été affinées au fil des siècles.",
    },
    cover:
      'https://images.pexels.com/photos/6626855/pexels-photo-6626855.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: 'shirt',
    numberLabel: '01',
    subcategories: [
      { en: 'Wax & Ankara', fr: 'Wax & Ankara' },
      { en: 'Royal Toghu', fr: 'Toghu royal' },
      { en: 'Kente & Aso Oke', fr: 'Kente & Aso Oke' },
      { en: 'Bogolan & Indigo', fr: 'Bogolan & Indigo' },
      { en: 'Boubou & Kaftan', fr: 'Boubou & Caftan' },
    ],
  },
  {
    slug: 'crafts-art',
    name: { en: 'Crafts & Art', fr: 'Artisanat & Art' },
    description: {
      en: 'Masks, bronze, wood, raffia. Every piece, a one-of-one.',
      fr: 'Masques, bronze, bois, raphia. Chaque pièce, une unique.',
    },
    longDescription: {
      en: 'Sculptures and masks carved by the descendants of the Dogon, the Senoufo, the Fang. Bronze cast in lost-wax foundries that have not changed in 600 years. Baskets woven from grass cut at first light.',
      fr: 'Sculptures et masques taillés par les descendants des Dogon, Senoufo, Fang. Bronze coulé dans des fonderies à la cire perdue qui n\'ont pas changé depuis 600 ans. Paniers tissés à l\'aube.',
    },
    cover:
      'https://images.pexels.com/photos/2122293/pexels-photo-2122293.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: 'palette',
    numberLabel: '02',
    subcategories: [
      { en: 'Masks', fr: 'Masques' },
      { en: 'Bronze sculpture', fr: 'Sculpture bronze' },
      { en: 'Wood carving', fr: 'Sculpture bois' },
      { en: 'Baskets & raffia', fr: 'Paniers & raphia' },
    ],
  },
  {
    slug: 'gastronomy',
    name: { en: 'Gastronomy', fr: 'Gastronomie' },
    description: {
      en: 'Spices, sauces, teas, coffee — the continent on a plate.',
      fr: 'Épices, sauces, thés, café — le continent dans l\'assiette.',
    },
    longDescription: {
      en: 'Ras el hanout from a Marrakech medina, Ethiopian berbere ground at altitude, Cameroonian ndolè sauce simmered for 8 hours. Real flavors, no shortcuts.',
      fr: 'Ras el hanout d\'une médina de Marrakech, berbéré éthiopien moulu en altitude, sauce ndolè camerounaise mijotée 8 heures. Vrais goûts, sans raccourcis.',
    },
    cover:
      'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=1600&q=80&auto=format&fit=crop',
    icon: 'utensils',
    numberLabel: '03',
    subcategories: [
      { en: 'Spices & blends', fr: 'Épices & mélanges' },
      { en: 'Sauces', fr: 'Sauces' },
      { en: 'Coffee & tea', fr: 'Café & thé' },
      { en: 'Snacks', fr: 'Encas' },
    ],
  },
  {
    slug: 'beauty-wellness',
    name: { en: 'Beauty & Wellness', fr: 'Beauté & Bien-être' },
    description: {
      en: 'Shea, argan, black soap. African beauty rituals, sourced raw.',
      fr: 'Karité, argan, savon noir. Rituels de beauté africains, sourcés bruts.',
    },
    longDescription: {
      en: 'Shea butter from Burkina cooperatives, argan from Souss women collectives, black soap from Ghanaian villages. We trace every drop.',
      fr: 'Karité de coopératives du Burkina, argan de coopératives de femmes du Souss, savon noir de villages ghanéens. Chaque goutte est tracée.',
    },
    cover:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1600&q=80&auto=format&fit=crop',
    icon: 'sparkles',
    numberLabel: '04',
    subcategories: [
      { en: 'Shea & body butters', fr: 'Karité & beurres' },
      { en: 'Oils', fr: 'Huiles' },
      { en: 'Soaps', fr: 'Savons' },
      { en: 'Hair care', fr: 'Soin cheveux' },
    ],
  },
  {
    slug: 'home-decor',
    name: { en: 'Home & Decor', fr: 'Maison & Déco' },
    description: {
      en: 'Berber rugs, brass lamps, hand-thrown pottery.',
      fr: 'Tapis berbères, lampes en laiton, poterie tournée main.',
    },
    longDescription: {
      en: 'Furniture and decoration that turn an apartment into a memory. Atlas rugs that hold the warmth of mountain looms, Tunisian ceramics painted with the precision of a calligrapher.',
      fr: 'Mobilier et déco qui transforment un appart en souvenir. Tapis de l\'Atlas tissés sur des métiers de montagne, céramiques tunisiennes peintes avec la précision d\'un calligraphe.',
    },
    cover:
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=1600&q=80&auto=format&fit=crop',
    icon: 'home',
    numberLabel: '05',
    subcategories: [
      { en: 'Rugs & carpets', fr: 'Tapis' },
      { en: 'Lamps & light', fr: 'Lampes & lumière' },
      { en: 'Pottery & ceramics', fr: 'Poterie & céramique' },
      { en: 'Furniture', fr: 'Mobilier' },
    ],
  },
  {
    slug: 'music-culture',
    name: { en: 'Music & Culture', fr: 'Musique & Culture' },
    description: {
      en: 'Djembe, kora, talking drum — the sound of the continent.',
      fr: 'Djembé, kora, tambour parlant — le son du continent.',
    },
    longDescription: {
      en: 'Hand-carved Lenké wood djembes from Guinea, koras strung in Mali workshops, talking drums whose tonality changes when squeezed. Instruments, not souvenirs.',
      fr: 'Djembés en bois Lenké taillés à la main en Guinée, koras montées dans des ateliers maliens, tambours parlants dont la tonalité change quand on les serre. Des instruments, pas des souvenirs.',
    },
    cover:
      'https://images.unsplash.com/photo-1548115184-bc6544d06a58?w=1600&q=80&auto=format&fit=crop',
    icon: 'music',
    numberLabel: '06',
    subcategories: [
      { en: 'Drums', fr: 'Tambours' },
      { en: 'Strings', fr: 'Cordes' },
      { en: 'Books & vinyl', fr: 'Livres & vinyles' },
    ],
  },
  {
    slug: 'jewelry-accessories',
    name: { en: 'Jewelry & Accessories', fr: 'Bijoux & Accessoires' },
    description: {
      en: 'Tuareg silver, lost-wax bronze, Maasai beadwork.',
      fr: 'Argent touareg, bronze à la cire perdue, perles massaï.',
    },
    longDescription: {
      en: 'The Cross of Agadez forged by a sixth-generation Inadan smith. Maasai collars beaded by women whose grandmothers also beaded for queens. Each piece tells you who you are without saying a word.',
      fr: "La Croix d'Agadez forgée par un Inadan de la sixième génération. Colliers massaï perlés par des femmes dont les grands-mères perlaient déjà pour les reines. Chaque pièce vous dit qui vous êtes sans un mot.",
    },
    cover:
      'https://images.unsplash.com/photo-1584811644165-33078f50ff43?w=1600&q=80&auto=format&fit=crop',
    icon: 'gem',
    numberLabel: '07',
    subcategories: [
      { en: 'Silver', fr: 'Argent' },
      { en: 'Bronze', fr: 'Bronze' },
      { en: 'Beads', fr: 'Perles' },
      { en: 'Leather', fr: 'Cuir' },
    ],
  },
];

export const categoriesBySlug: Record<string, Category> = Object.fromEntries(
  categories.map((c) => [c.slug, c]),
);
