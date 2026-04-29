import { Badge } from '@/components/ui/Badge';
import type { Product } from '@/lib/types';
import type { Locale } from '@/lib/types';
import { discountPercent, pickLocale } from '@/lib/utils';
import { countriesBySlug } from '@/data/countries';

const t = (key: string, locale: Locale) => {
  const map: Record<string, { en: string; fr: string }> = {
    bestseller: { en: 'Bestseller', fr: 'Best-seller' },
    newArrival: { en: 'New', fr: 'Nouveau' },
    handMade: { en: 'Hand-made', fr: 'Fait main' },
    fairTrade: { en: 'Fair-trade', fr: 'Équitable' },
    authentic: { en: 'Authentic', fr: 'Authentique' },
    limited: { en: 'Limited', fr: 'Limité' },
    freeShipping: { en: 'Free shipping', fr: 'Livraison offerte' },
  };
  return pickLocale(map[key], locale);
};

export function ProductBadges({
  product,
  locale,
  max = 2,
  className,
}: {
  product: Product;
  locale: Locale;
  max?: number;
  className?: string;
}) {
  const country = countriesBySlug[product.country];
  const off = discountPercent(product.price, product.originalPrice);
  const items: Array<{ variant: 'clay' | 'gold' | 'leaf' | 'berry' | 'ink' | 'soft'; label: string }> = [];

  if (off) items.push({ variant: 'clay', label: `−${off}%` });
  if (product.bestseller) items.push({ variant: 'gold', label: t('bestseller', locale) });
  if (product.newArrival) items.push({ variant: 'leaf', label: t('newArrival', locale) });
  if (product.labels.includes('limited-edition'))
    items.push({ variant: 'berry', label: t('limited', locale) });
  if (product.labels.includes('hand-made'))
    items.push({ variant: 'soft', label: t('handMade', locale) });
  if (product.labels.includes('fair-trade'))
    items.push({ variant: 'ink', label: t('fairTrade', locale) });

  return (
    <div className={`flex flex-wrap gap-1 ${className ?? ''}`}>
      {items.slice(0, max).map((b, i) => (
        <Badge key={i} variant={b.variant}>
          {b.label}
        </Badge>
      ))}
      {country ? (
        <Badge variant="bone">
          {country.flag} {pickLocale(country.name, locale)}
        </Badge>
      ) : null}
    </div>
  );
}
