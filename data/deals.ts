import type { Deal } from '@/lib/types';

const inHours = (h: number) => {
  const d = new Date();
  d.setHours(d.getHours() + h);
  return d.toISOString();
};

/** Live flash-deal countdowns. Slugs must carry `flashDeal: true`. */
export const deals: Deal[] = [
  { productSlug: 'itel-p55', endsAt: inHours(7) },
  { productSlug: 'nasco-microwave-20l', endsAt: inHours(11) },
  { productSlug: 'binatone-blender-15l', endsAt: inHours(15) },
  { productSlug: 'tecno-camon-30', endsAt: inHours(20) },
  { productSlug: 'jbl-tune-520bt', endsAt: inHours(28) },
  { productSlug: 'hisense-43-smart-tv', endsAt: inHours(34) },
  { productSlug: 'hp-250-g9', endsAt: inHours(40) },
  { productSlug: 'corner-sofa-5-seat', endsAt: inHours(46) },
  { productSlug: 'chauffe-eau-instantane', endsAt: inHours(9) },
  { productSlug: 'savon-noir-africain', endsAt: inHours(5) },
];
