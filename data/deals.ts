import type { Deal } from '@/lib/types';

const inHours = (h: number) => {
  const d = new Date();
  d.setHours(d.getHours() + h);
  return d.toISOString();
};

export const deals: Deal[] = [
  { productSlug: 'royal-toghu-dress', discount: 26, endsAt: inHours(18), stockLeft: 4 },
  { productSlug: 'raw-shea-butter', discount: 25, endsAt: inHours(8), stockLeft: 124 },
  { productSlug: 'berber-atlas-carpet', discount: 24, endsAt: inHours(36), stockLeft: 6 },
  { productSlug: 'wax-print-fabric', discount: 26, endsAt: inHours(20), stockLeft: 36 },
  { productSlug: 'ras-el-hanout', discount: 22, endsAt: inHours(12), stockLeft: 200 },
  { productSlug: 'lenke-wood-djembe', discount: 18, endsAt: inHours(48), stockLeft: 11 },
];
