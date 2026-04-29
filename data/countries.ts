import type { Country } from '@/lib/types';

export const countries: Country[] = [
  {
    slug: 'cameroon',
    name: { en: 'Cameroon', fr: 'Cameroun' },
    nameLocal: 'Cameroun',
    flag: '🇨🇲',
    region: 'central',
    regions: ['Bamileke', 'Bamoun', 'Sawa', 'North', 'Adamawa'],
    ethnicGroups: ['Bamileke', 'Bamoun', 'Beti', 'Fulani', 'Sawa'],
    signatureProduct: { en: 'Royal Toghu Dress', fr: 'Robe Toghu royale' },
    description: {
      en: 'Africa in miniature — from Bamileke royal courts to Sawa coastal markets, a continent of crafts in one country.',
      fr: "L'Afrique en miniature — des cours royales Bamileke aux marchés Sawa de la côte, un continent d'artisanat dans un pays.",
    },
    productCount: 38,
    heroImage:
      'https://images.unsplash.com/photo-1577722422778-eb35cf942cc4?w=1200&q=80&auto=format&fit=crop',
  },
  {
    slug: 'nigeria',
    name: { en: 'Nigeria', fr: 'Nigéria' },
    flag: '🇳🇬',
    region: 'west',
    regions: ['Yoruba', 'Igbo', 'Hausa', 'Edo', 'Niger Delta'],
    ethnicGroups: ['Yoruba', 'Igbo', 'Hausa', 'Edo', 'Tiv'],
    signatureProduct: { en: 'Aso Oke ceremonial wrap', fr: 'Pagne cérémoniel Aso Oke' },
    description: {
      en: 'The Nollywood of textiles. Yoruba indigo, Igbo bronze, Hausa leather — Nigeria sets the tempo.',
      fr: 'Le Nollywood du textile. Indigo Yoruba, bronze Igbo, cuir Hausa — le Nigéria donne le tempo.',
    },
    productCount: 42,
    heroImage:
      'https://images.unsplash.com/photo-1580130732478-4e339fb33746?w=1200&q=80&auto=format&fit=crop',
  },
  {
    slug: 'senegal',
    name: { en: 'Senegal', fr: 'Sénégal' },
    flag: '🇸🇳',
    region: 'west',
    regions: ['Dakar', 'Casamance', 'Saint-Louis', 'Sine-Saloum'],
    ethnicGroups: ['Wolof', 'Serer', 'Peul', 'Diola'],
    signatureProduct: { en: 'Hand-dyed Wax fabric', fr: 'Tissu Wax teinté main' },
    description: {
      en: 'Teranga in cloth form. Saint-Louis pastels, Dakar street fashion, Casamance baskets.',
      fr: 'La Teranga en tissu. Pastels de Saint-Louis, mode de rue Dakar, paniers de Casamance.',
    },
    productCount: 31,
    heroImage:
      'https://images.unsplash.com/photo-1565299543923-37dd37887442?w=1200&q=80&auto=format&fit=crop',
  },
  {
    slug: 'ivory-coast',
    name: { en: "Côte d'Ivoire", fr: "Côte d'Ivoire" },
    flag: '🇨🇮',
    region: 'west',
    regions: ['Abidjan', 'Korhogo', 'Yamoussoukro', 'Man'],
    ethnicGroups: ['Akan', 'Baoulé', 'Senoufo', 'Dan'],
    signatureProduct: { en: 'Baoulé goldweight sculpture', fr: 'Poids à or Baoulé' },
    description: {
      en: 'Where bronze meets cocoa. Senoufo masks, Baoulé goldweights, Korhogo painted cloth.',
      fr: 'Là où le bronze rencontre le cacao. Masques Senoufo, poids Baoulé, toiles peintes de Korhogo.',
    },
    productCount: 24,
    heroImage:
      'https://images.unsplash.com/photo-1604881744146-d6c7c47a8eb1?w=1200&q=80&auto=format&fit=crop',
  },
  {
    slug: 'ghana',
    name: { en: 'Ghana', fr: 'Ghana' },
    flag: '🇬🇭',
    region: 'west',
    regions: ['Ashanti', 'Volta', 'Cape Coast', 'Bolgatanga'],
    ethnicGroups: ['Ashanti', 'Ewe', 'Ga', 'Fante'],
    signatureProduct: { en: 'Royal Kente cloth', fr: 'Étoffe royale Kente' },
    description: {
      en: 'Home of Kente — every thread a proverb, every pattern a king.',
      fr: 'Le pays du Kente — chaque fil un proverbe, chaque motif un roi.',
    },
    productCount: 35,
    heroImage:
      'https://images.unsplash.com/photo-1604719312566-878e6e3b97df?w=1200&q=80&auto=format&fit=crop',
  },
  {
    slug: 'mali',
    name: { en: 'Mali', fr: 'Mali' },
    flag: '🇲🇱',
    region: 'west',
    regions: ['Bamako', 'Mopti', 'Timbuktu', 'Dogon Country'],
    ethnicGroups: ['Bambara', 'Dogon', 'Tuareg', 'Songhai'],
    signatureProduct: { en: 'Authentic Bogolan cloth', fr: 'Étoffe Bogolan authentique' },
    description: {
      en: 'Bogolan mud cloth, Dogon masks, Timbuktu manuscripts — Mali holds the deep grammar of the Sahel.',
      fr: 'Bogolan, masques Dogon, manuscrits de Tombouctou — le Mali tient la grammaire du Sahel.',
    },
    productCount: 27,
    heroImage:
      'https://images.unsplash.com/photo-1547234935-80c7145ec969?w=1200&q=80&auto=format&fit=crop',
  },
  {
    slug: 'burkina-faso',
    name: { en: 'Burkina Faso', fr: 'Burkina Faso' },
    flag: '🇧🇫',
    region: 'west',
    regions: ['Ouagadougou', 'Bobo-Dioulasso', 'Gaoua'],
    ethnicGroups: ['Mossi', 'Bobo', 'Lobi', 'Peul'],
    signatureProduct: { en: 'Raw artisan shea butter', fr: 'Beurre de karité brut' },
    description: {
      en: 'The land of upright men. Shea butter, faso dan fani, bronze masks.',
      fr: 'Le pays des hommes intègres. Karité, faso dan fani, masques en bronze.',
    },
    productCount: 18,
    heroImage:
      'https://images.unsplash.com/photo-1583087253076-5d1315860eb7?w=1200&q=80&auto=format&fit=crop',
  },
  {
    slug: 'drc',
    name: { en: 'DR Congo', fr: 'RD Congo' },
    flag: '🇨🇩',
    region: 'central',
    regions: ['Kinshasa', 'Kasai', 'Katanga', 'Kivu'],
    ethnicGroups: ['Kongo', 'Luba', 'Mongo', 'Mangbetu'],
    signatureProduct: { en: 'Kuba raffia textile', fr: 'Textile Kuba en raphia' },
    description: {
      en: 'Kuba raffias, Luba sculptures, Sapeurs of Brazzaville — pure Central African elegance.',
      fr: "Raphias Kuba, sculptures Luba, Sapeurs — élégance d'Afrique centrale.",
    },
    productCount: 22,
    heroImage:
      'https://images.pexels.com/photos/8089088/pexels-photo-8089088.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    slug: 'congo',
    name: { en: 'Congo', fr: 'Congo' },
    flag: '🇨🇬',
    region: 'central',
    regions: ['Brazzaville', 'Pointe-Noire'],
    ethnicGroups: ['Kongo', 'Teke', 'M’Bochi'],
    signatureProduct: { en: 'Sapeur silk pocket square', fr: 'Pochette Sapeur en soie' },
    description: {
      en: 'Where the Sapeurs walk. Congolese tailoring meets Atlantic-coast wood.',
      fr: 'Le pays des Sapeurs. Couture congolaise et bois de la côte atlantique.',
    },
    productCount: 12,
    heroImage:
      'https://images.unsplash.com/photo-1535082623926-b39352a03fb7?w=1200&q=80&auto=format&fit=crop',
  },
  {
    slug: 'benin',
    name: { en: 'Benin', fr: 'Bénin' },
    flag: '🇧🇯',
    region: 'west',
    regions: ['Cotonou', 'Abomey', 'Ouidah'],
    ethnicGroups: ['Fon', 'Yoruba', 'Bariba'],
    signatureProduct: { en: 'Lost-wax bronze bracelet', fr: 'Bracelet bronze à la cire perdue' },
    description: {
      en: 'Cradle of vodun. Bronze, applique tapestries, sacred art.',
      fr: 'Berceau du vodun. Bronze, tentures appliquées, art sacré.',
    },
    productCount: 16,
    heroImage:
      'https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?w=1200&q=80&auto=format&fit=crop',
  },
  {
    slug: 'togo',
    name: { en: 'Togo', fr: 'Togo' },
    flag: '🇹🇬',
    region: 'west',
    regions: ['Lomé', 'Kara', 'Sokodé'],
    ethnicGroups: ['Ewe', 'Kabye', 'Tem'],
    signatureProduct: { en: 'Kabye iron jewelry', fr: 'Bijou en fer Kabye' },
    description: {
      en: 'Tiny coast, mighty crafts. Kabye iron, Ewe weaving, voodoo markets.',
      fr: 'Petite côte, grand artisanat. Fer Kabye, tissage Ewe, marchés vaudou.',
    },
    productCount: 11,
    heroImage:
      'https://images.unsplash.com/photo-1581281863883-2469417a1668?w=1200&q=80&auto=format&fit=crop',
  },
  {
    slug: 'niger',
    name: { en: 'Niger', fr: 'Niger' },
    flag: '🇳🇪',
    region: 'west',
    regions: ['Agadez', 'Niamey', 'Zinder'],
    ethnicGroups: ['Hausa', 'Tuareg', 'Songhai', 'Fulani'],
    signatureProduct: { en: 'Tuareg silver cross of Agadez', fr: "Croix d'Agadez en argent Touareg" },
    description: {
      en: 'Saharan silver, indigo Tuareg veils, leather camel saddles.',
      fr: 'Argent saharien, voiles indigo touaregs, selles en cuir.',
    },
    productCount: 14,
    heroImage:
      'https://images.unsplash.com/photo-1531171673193-c34111c1097a?w=1200&q=80&auto=format&fit=crop',
  },
  {
    slug: 'guinea',
    name: { en: 'Guinea', fr: 'Guinée' },
    flag: '🇬🇳',
    region: 'west',
    regions: ['Conakry', 'Fouta Djallon', 'Forécariah'],
    ethnicGroups: ['Malinké', 'Peul', 'Soussou'],
    signatureProduct: { en: 'Lenké wood Djembe', fr: 'Djembé en bois Lenké' },
    description: {
      en: 'Birthplace of the djembe. Hand-carved Lenké wood, goat skin, master rhythm.',
      fr: 'Berceau du djembé. Bois Lenké sculpté main, peau de chèvre, rythme maîtrisé.',
    },
    productCount: 13,
    heroImage:
      'https://images.unsplash.com/photo-1548115184-bc6544d06a58?w=1200&q=80&auto=format&fit=crop',
  },
  {
    slug: 'gabon',
    name: { en: 'Gabon', fr: 'Gabon' },
    flag: '🇬🇦',
    region: 'central',
    regions: ['Libreville', 'Port-Gentil'],
    ethnicGroups: ['Fang', 'Punu', 'Myene'],
    signatureProduct: { en: 'Fang mask reproduction', fr: 'Reproduction de masque Fang' },
    description: {
      en: 'Equatorial forests, Fang masks, Punu white-face spirits.',
      fr: 'Forêts équatoriales, masques Fang, esprits Punu au visage blanc.',
    },
    productCount: 9,
    heroImage:
      'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=1200&q=80&auto=format&fit=crop',
  },
  {
    slug: 'morocco',
    name: { en: 'Morocco', fr: 'Maroc' },
    flag: '🇲🇦',
    region: 'north',
    regions: ['Marrakech', 'Fez', 'Atlas Mountains', 'Essaouira'],
    ethnicGroups: ['Berber/Amazigh', 'Arab'],
    signatureProduct: { en: 'Berber Atlas carpet', fr: "Tapis berbère de l'Atlas" },
    description: {
      en: 'Berber carpets, brass lamps, ras el hanout — the medina in your living room.',
      fr: 'Tapis berbères, lampes en laiton, ras el hanout — la médina chez vous.',
    },
    productCount: 47,
    heroImage:
      'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1200&q=80&auto=format&fit=crop',
  },
  {
    slug: 'algeria',
    name: { en: 'Algeria', fr: 'Algérie' },
    flag: '🇩🇿',
    region: 'north',
    regions: ['Algiers', 'Oran', 'Kabylia', 'Tassili'],
    ethnicGroups: ['Arab', 'Berber/Amazigh', 'Tuareg'],
    signatureProduct: { en: 'Kabyle silver fibula', fr: 'Fibule kabyle en argent' },
    description: {
      en: 'Kabyle silver, Tuareg rugs, Andalusian patterns — North Africa’s deep cellar.',
      fr: 'Argent kabyle, tapis touareg, motifs andalous — le grenier du Maghreb.',
    },
    productCount: 19,
    heroImage:
      'https://images.unsplash.com/photo-1583991133337-a04ce39e54aa?w=1200&q=80&auto=format&fit=crop',
  },
  {
    slug: 'tunisia',
    name: { en: 'Tunisia', fr: 'Tunisie' },
    flag: '🇹🇳',
    region: 'north',
    regions: ['Tunis', 'Sidi Bou Saïd', 'Djerba', 'Sahel'],
    ethnicGroups: ['Arab', 'Berber/Amazigh'],
    signatureProduct: { en: 'Hand-painted ceramic plate', fr: 'Assiette céramique peinte main' },
    description: {
      en: 'Blue-and-white ceramics, olive wood, Sidi Bou Saïd light.',
      fr: "Céramiques bleu-blanc, bois d'olivier, lumière de Sidi Bou Saïd.",
    },
    productCount: 16,
    heroImage:
      'https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=1200&q=80&auto=format&fit=crop',
  },
  {
    slug: 'egypt',
    name: { en: 'Egypt', fr: 'Égypte' },
    flag: '🇪🇬',
    region: 'north',
    regions: ['Cairo', 'Alexandria', 'Aswan', 'Luxor'],
    ethnicGroups: ['Arab', 'Nubian', 'Bedouin'],
    signatureProduct: { en: 'Nubian woven basket', fr: 'Panier tressé nubien' },
    description: {
      en: 'Khan el-Khalili brass, Nubian textiles, Aswan reed baskets.',
      fr: "Laiton de Khan el-Khalili, textiles nubiens, paniers de roseau d'Assouan.",
    },
    productCount: 21,
    heroImage:
      'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=1200&q=80&auto=format&fit=crop',
  },
  {
    slug: 'kenya',
    name: { en: 'Kenya', fr: 'Kenya' },
    flag: '🇰🇪',
    region: 'east',
    regions: ['Nairobi', 'Mombasa', 'Maasai Mara', 'Lamu'],
    ethnicGroups: ['Kikuyu', 'Maasai', 'Luo', 'Swahili'],
    signatureProduct: { en: 'Maasai beaded collar', fr: 'Collier perlé Massaï' },
    description: {
      en: 'Maasai beadwork, Kikuyu basketry, Swahili coast wood — East Africa in beads.',
      fr: "Perles massaï, vannerie kikuyu, bois de la côte swahili — l'Afrique de l'Est en perles.",
    },
    productCount: 33,
    heroImage:
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&q=80&auto=format&fit=crop',
  },
  {
    slug: 'ethiopia',
    name: { en: 'Ethiopia', fr: 'Éthiopie' },
    flag: '🇪🇹',
    region: 'east',
    regions: ['Addis Ababa', 'Aksum', 'Lalibela', 'Harar'],
    ethnicGroups: ['Amhara', 'Oromo', 'Tigray', 'Hamer'],
    signatureProduct: { en: 'Coffee ceremony jebena set', fr: 'Set jebena cérémonie du café' },
    description: {
      en: 'Coffee ceremony, Aksumite gold, white shamma cotton — Ethiopia is its own grammar.',
      fr: "Cérémonie du café, or aksumite, coton blanc shamma — l'Éthiopie a sa propre grammaire.",
    },
    productCount: 26,
    heroImage:
      'https://images.unsplash.com/photo-1571770095004-6b61b1cf308a?w=1200&q=80&auto=format&fit=crop',
  },
  {
    slug: 'tanzania',
    name: { en: 'Tanzania', fr: 'Tanzanie' },
    flag: '🇹🇿',
    region: 'east',
    regions: ['Zanzibar', 'Dar es Salaam', 'Arusha'],
    ethnicGroups: ['Sukuma', 'Maasai', 'Chagga', 'Swahili'],
    signatureProduct: { en: 'Tinga Tinga painting', fr: 'Peinture Tinga Tinga' },
    description: {
      en: 'Tinga Tinga colors, Zanzibar carved doors, Maasai shukas.',
      fr: 'Couleurs Tinga Tinga, portes sculptées de Zanzibar, shukas massaï.',
    },
    productCount: 17,
    heroImage:
      'https://images.unsplash.com/photo-1504432842672-1a79f78e4084?w=1200&q=80&auto=format&fit=crop',
  },
  {
    slug: 'south-africa',
    name: { en: 'South Africa', fr: 'Afrique du Sud' },
    flag: '🇿🇦',
    region: 'southern',
    regions: ['Cape Town', 'Johannesburg', 'Durban', 'Eastern Cape'],
    ethnicGroups: ['Zulu', 'Xhosa', 'Sotho', 'Ndebele'],
    signatureProduct: { en: 'Zulu beaded earrings', fr: "Boucles d'oreilles perlées Zoulou" },
    description: {
      en: 'Ndebele color geometry, Zulu beadwork, Cape Town design — the southern beat.',
      fr: 'Géométrie colorée Ndebele, perles Zoulou, design du Cap — le tempo sud.',
    },
    productCount: 28,
    heroImage:
      'https://images.unsplash.com/photo-1577462281852-279cb1f0a3c1?w=1200&q=80&auto=format&fit=crop',
  },
];

export const countriesBySlug: Record<string, Country> = Object.fromEntries(
  countries.map((c) => [c.slug, c]),
);
