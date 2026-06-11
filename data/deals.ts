import type { Deal } from '@/lib/types';

const inHours = (h: number) => {
  const d = new Date();
  d.setHours(d.getHours() + h);
  return d.toISOString();
};

/** Live flash-deal countdowns. Slugs must carry `flashDeal: true`. */
export const deals: Deal[] = [
  { productSlug: 'savon-noir-africain', endsAt: inHours(5) },
  { productSlug: 'eventail-tresse', endsAt: inHours(9) },
  { productSlug: 'sac-ndop-cuir', endsAt: inHours(14) },
  { productSlug: 'pagne-tisse-traditionnel', endsAt: inHours(19) },
  { productSlug: 'coffret-soins-naturels', endsAt: inHours(26) },
  { productSlug: 'set-decor-raphia', endsAt: inHours(33) },
];
