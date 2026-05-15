import type { DeliveryZone } from '@/lib/types';

/** Delivery time bands, shown on product pages and at checkout. */
export const DELIVERY_ZONES: DeliveryZone[] = [
  {
    id: 'cmr-city',
    label: { en: 'Cameroon — same city', fr: 'Cameroun — même ville' },
    estimate: { en: '1–2 days', fr: '1 à 2 jours' },
  },
  {
    id: 'cmr-national',
    label: { en: 'Cameroon — other cities', fr: 'Cameroun — autres villes' },
    estimate: { en: '2–4 days', fr: '2 à 4 jours' },
  },
  {
    id: 'cemac',
    label: { en: 'Central Africa (CEMAC)', fr: 'Afrique Centrale (CEMAC)' },
    estimate: { en: '3–7 days', fr: '3 à 7 jours' },
  },
  {
    id: 'africa',
    label: { en: 'Rest of Africa', fr: "Reste de l'Afrique" },
    estimate: { en: '1–3 weeks', fr: '1 à 3 semaines' },
  },
];

/** Countries served, used for the checkout address selector (Cameroon first). */
export const AFRICA_COUNTRIES: string[] = [
  'Cameroun',
  'Afrique du Sud',
  'Bénin',
  'Burkina Faso',
  'Congo-Brazzaville',
  'Côte d’Ivoire',
  'Gabon',
  'Ghana',
  'Guinée',
  'Guinée Équatoriale',
  'Kenya',
  'Mali',
  'Niger',
  'Nigéria',
  'Ouganda',
  'RD Congo',
  'République Centrafricaine',
  'Rwanda',
  'Sénégal',
  'Tanzanie',
  'Tchad',
  'Togo',
  'Zambie',
];
