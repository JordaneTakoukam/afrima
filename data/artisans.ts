import type { Artisan } from '@/lib/types';

export const artisans: Artisan[] = [
  {
    slug: 'adele-mboue',
    name: 'Adèle Mboué',
    country: 'cameroon',
    region: 'Bamileke',
    craft: { en: 'Master Toghu embroiderer', fr: 'Brodeuse Toghu maîtresse' },
    bio: {
      en: 'Adèle was twelve when her grandmother handed her a needle. Forty years later, she leads a workshop of nine women in Bafoussam producing royal Toghu for chiefs across the Bamileke kingdoms. She trained under Mama Suzanne, who embroidered for HM Bafu Kemajou IV.',
      fr: 'Adèle avait douze ans quand sa grand-mère lui a tendu une aiguille. Quarante ans plus tard, elle dirige un atelier de neuf femmes à Bafoussam qui produisent du Toghu royal pour les chefs des royaumes Bamileke. Elle a appris auprès de Mama Suzanne, qui brodait pour SM Bafu Kemajou IV.',
    },
    quote: {
      en: 'A Toghu is not a dress. It is a memory the King wears in public.',
      fr: 'Un Toghu n\'est pas une robe. C\'est un souvenir que le Roi porte en public.',
    },
    photo:
      'https://images.unsplash.com/photo-1551830820-330a71b99659?w=1200&q=80&auto=format&fit=crop',
    yearsOfExperience: 40,
    productSlugs: ['royal-toghu-dress', 'bamileke-ceremonial-cap'],
    signature: { en: 'Master Toghu embroiderer', fr: 'Brodeuse Toghu maîtresse' },
    pronouns: 'she',
  },
  {
    slug: 'amadou-keita',
    name: 'Amadou Keïta',
    country: 'guinea',
    region: 'Conakry',
    craft: { en: 'Lenké wood djembe carver', fr: 'Sculpteur de djembé en bois Lenké' },
    bio: {
      en: 'Amadou comes from a Malinké griot family. He carves only Lenké wood, and only from trees that have already fallen. His drums are played from Conakry to Carnegie Hall.',
      fr: 'Amadou vient d\'une famille de griots Malinké. Il ne sculpte que le bois Lenké, et uniquement des arbres déjà tombés. Ses tambours sont joués de Conakry à Carnegie Hall.',
    },
    quote: {
      en: 'The wood already knows the rhythm. I just open the door.',
      fr: 'Le bois connaît déjà le rythme. Moi, j\'ouvre juste la porte.',
    },
    photo:
      'https://images.unsplash.com/photo-1512835356112-acbe8b89af6e?w=1200&q=80&auto=format&fit=crop',
    yearsOfExperience: 28,
    productSlugs: ['lenke-wood-djembe', 'malinké-talking-drum'],
    signature: { en: 'Master djembe carver', fr: 'Sculpteur de djembé maître' },
    pronouns: 'he',
  },
  {
    slug: 'fatou-ndiaye',
    name: 'Fatou Ndiaye',
    country: 'senegal',
    region: 'Saint-Louis',
    craft: { en: 'Indigo dyer & wax printer', fr: 'Teinturière indigo & wax' },
    bio: {
      en: 'Fatou ferments her indigo for 21 days before any dye touches a fibre. Her workshop, on the banks of the Senegal river, supplies designers from Dakar to Paris.',
      fr: 'Fatou fait fermenter son indigo 21 jours avant que la moindre teinture ne touche une fibre. Son atelier, sur les rives du fleuve Sénégal, fournit des créateurs de Dakar à Paris.',
    },
    quote: {
      en: 'Indigo is patient. Anyone who isn\'t will get a flat color.',
      fr: 'L\'indigo est patient. Qui ne l\'est pas obtient une couleur plate.',
    },
    photo:
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=1200&q=80&auto=format&fit=crop',
    yearsOfExperience: 22,
    productSlugs: ['indigo-wax-fabric', 'aso-oke-ceremonial-wrap'],
    signature: { en: 'Master indigo dyer', fr: 'Teinturière indigo maîtresse' },
    pronouns: 'she',
  },
  {
    slug: 'kofi-asante',
    name: 'Kofi Asante',
    country: 'ghana',
    region: 'Ashanti',
    craft: { en: 'Royal Kente weaver', fr: 'Tisserand royal Kente' },
    bio: {
      en: 'Kofi weaves on the same kind of loom his grandfather used to weave for the Asantehene. Each Kente is named, registered, and signed.',
      fr: 'Kofi tisse sur le même type de métier que son grand-père utilisait pour l\'Asantehene. Chaque Kente est nommé, enregistré, signé.',
    },
    quote: {
      en: 'A pattern is a sentence. A cloth is a paragraph. A Kente is a chapter of who we are.',
      fr: 'Un motif est une phrase. Un tissu est un paragraphe. Un Kente est un chapitre de qui nous sommes.',
    },
    photo:
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=1200&q=80&auto=format&fit=crop',
    yearsOfExperience: 35,
    productSlugs: ['royal-kente-cloth', 'kente-cushion-cover'],
    signature: { en: 'Royal Kente weaver', fr: 'Tisserand royal Kente' },
    pronouns: 'he',
  },
  {
    slug: 'aisha-bouzid',
    name: 'Aïsha Bouzid',
    country: 'morocco',
    region: 'Atlas Mountains',
    craft: { en: 'Berber rug weaver', fr: 'Tisseuse de tapis berbère' },
    bio: {
      en: 'Aïsha weaves with eight other women in a cooperative high above Imintanout. Each rug carries a private symbol — a daughter\'s wedding, a brother\'s recovery, a year of good rain.',
      fr: 'Aïsha tisse avec huit autres femmes dans une coopérative au-dessus d\'Imintanout. Chaque tapis porte un symbole privé — le mariage d\'une fille, la guérison d\'un frère, une bonne année de pluie.',
    },
    quote: {
      en: 'A rug remembers. The buyer will not always know what, but it will.',
      fr: 'Un tapis se souvient. L\'acheteur ne saura pas toujours de quoi, mais lui, oui.',
    },
    photo:
      'https://images.unsplash.com/photo-1524292332709-b33366a7f165?w=1200&q=80&auto=format&fit=crop',
    yearsOfExperience: 30,
    productSlugs: ['berber-atlas-carpet', 'kilim-runner'],
    signature: { en: 'Atlas rug master', fr: "Maîtresse du tapis de l'Atlas" },
    pronouns: 'she',
  },
  {
    slug: 'ibrahim-ag-mohamed',
    name: 'Ibrahim ag Mohamed',
    country: 'niger',
    region: 'Agadez',
    craft: { en: 'Tuareg silversmith', fr: 'Forgeron touareg' },
    bio: {
      en: 'Ibrahim is Inadan, a hereditary blacksmith caste. He forges the Cross of Agadez and Tuareg pendants, melting old French coins into new constellations.',
      fr: 'Ibrahim est Inadan, caste héréditaire de forgerons. Il forge la Croix d\'Agadez et les pendentifs touaregs, fondant de vieilles pièces françaises en nouvelles constellations.',
    },
    quote: {
      en: 'The cross of Agadez gives you the four directions. The rest, you choose.',
      fr: 'La croix d\'Agadez donne les quatre directions. Le reste, tu choisis.',
    },
    photo:
      'https://images.unsplash.com/photo-1601933470928-c4ce4c5f2ddb?w=1200&q=80&auto=format&fit=crop',
    yearsOfExperience: 33,
    productSlugs: ['tuareg-silver-cross', 'tuareg-silver-bracelet'],
    signature: { en: 'Master Inadan smith', fr: 'Maître forgeron Inadan' },
    pronouns: 'he',
  },
  {
    slug: 'naledi-zungu',
    name: 'Naledi Zungu',
    country: 'south-africa',
    region: 'KwaZulu-Natal',
    craft: { en: 'Zulu beadwork artist', fr: 'Artiste perlière Zoulou' },
    bio: {
      en: 'Naledi turned a family tradition into a Cape Town atelier. She designs collars, earrings, and dress panels for African weddings worldwide.',
      fr: 'Naledi a transformé une tradition familiale en atelier à Cape Town. Elle dessine colliers, boucles et panneaux pour des mariages africains à travers le monde.',
    },
    quote: {
      en: 'A bead is a word. A collar is a love letter.',
      fr: 'Une perle est un mot. Un collier est une lettre d\'amour.',
    },
    photo:
      'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=1200&q=80&auto=format&fit=crop',
    yearsOfExperience: 18,
    productSlugs: ['zulu-beaded-earrings', 'ndebele-beaded-necklace'],
    signature: { en: 'Zulu beadwork designer', fr: 'Designer perlière Zoulou' },
    pronouns: 'she',
  },
  {
    slug: 'amare-tesfaye',
    name: 'Amare Tesfaye',
    country: 'ethiopia',
    region: 'Addis Ababa',
    craft: { en: 'Coffee curator & jebena potter', fr: 'Curateur café & potier jebena' },
    bio: {
      en: 'Amare runs a third-wave coffee co-op in Addis. He selects single-origin beans and works with Aksumite potters to produce the jebena pots used in the ceremony.',
      fr: 'Amare gère une coopérative de café de troisième vague à Addis. Il sélectionne des grains single origin et travaille avec des potiers aksumites pour les jebenas de cérémonie.',
    },
    quote: {
      en: 'Coffee is a conversation. The jebena is the room.',
      fr: 'Le café est une conversation. La jebena est la pièce.',
    },
    photo:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=1200&q=80&auto=format&fit=crop',
    yearsOfExperience: 14,
    productSlugs: ['ethiopian-coffee-set', 'sidamo-coffee-beans'],
    signature: { en: 'Coffee ceremony curator', fr: 'Curateur cérémonie café' },
    pronouns: 'he',
  },
  {
    slug: 'salimata-ouedraogo',
    name: 'Salimata Ouédraogo',
    country: 'burkina-faso',
    region: 'Ouagadougou',
    craft: { en: 'Shea butter cooperative leader', fr: 'Cheffe de coopérative karité' },
    bio: {
      en: 'Salimata leads a 240-woman shea cooperative outside Ouagadougou. Their butter is unrefined, cold-pressed, and fair-trade certified.',
      fr: 'Salimata dirige une coopérative de 240 femmes près de Ouagadougou. Leur beurre est non raffiné, pressé à froid, certifié commerce équitable.',
    },
    quote: {
      en: 'Shea pays for our daughters\' school. That is the gold of African women.',
      fr: 'Le karité paie l\'école de nos filles. C\'est l\'or des femmes africaines.',
    },
    photo:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80&auto=format&fit=crop',
    yearsOfExperience: 17,
    productSlugs: ['raw-shea-butter', 'shea-soap-set'],
    signature: { en: 'Shea cooperative lead', fr: 'Cheffe coopérative karité' },
    pronouns: 'she',
  },
  {
    slug: 'oumar-traore',
    name: 'Oumar Traoré',
    country: 'mali',
    region: 'Bamako',
    craft: { en: 'Bogolan mud-cloth master', fr: 'Maître Bogolan' },
    bio: {
      en: 'Oumar dyes Bogolan with fermented mud collected from the Niger river. The patterns are old as kingdoms — dawn, antelope, the path home.',
      fr: 'Oumar teinte le Bogolan avec une boue fermentée du fleuve Niger. Les motifs sont vieux comme des royaumes — l\'aube, l\'antilope, le chemin du retour.',
    },
    quote: {
      en: 'You don\'t paint Bogolan. You read the mud, and follow.',
      fr: 'On ne peint pas le Bogolan. On lit la boue, on suit.',
    },
    photo:
      'https://images.unsplash.com/photo-1554310603-d39d43033735?w=1200&q=80&auto=format&fit=crop',
    yearsOfExperience: 26,
    productSlugs: ['bogolan-mud-cloth', 'dogon-mask-replica'],
    signature: { en: 'Master Bogolan dyer', fr: 'Maître teinturier Bogolan' },
    pronouns: 'he',
  },
];

export const artisansBySlug: Record<string, Artisan> = Object.fromEntries(
  artisans.map((a) => [a.slug, a]),
);
