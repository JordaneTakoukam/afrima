import { Badge } from '@/components/ui/Badge';
import { discountPercent, pickLocale, cn } from '@/lib/utils';
import type { Locale, Localized, Product } from '@/lib/types';

const LABELS: Record<string, Localized> = {
  bestseller: { en: 'Bestseller', fr: 'Top vente' },
  new: { en: 'New', fr: 'Nouveau' },
  wholesale: { en: 'Wholesale', fr: 'Gros' },
};

type BadgeVariant = 'clay' | 'gold' | 'leaf' | 'ink';

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
  const off = discountPercent(product.price, product.originalPrice);
  const items: { variant: BadgeVariant; label: string }[] = [];

  if (off) items.push({ variant: 'clay', label: `−${off}%` });
  if (product.bestseller) items.push({ variant: 'gold', label: pickLocale(LABELS.bestseller, locale) });
  if (product.newArrival) items.push({ variant: 'leaf', label: pickLocale(LABELS.new, locale) });
  if (product.wholesale) items.push({ variant: 'ink', label: pickLocale(LABELS.wholesale, locale) });

  if (!items.length) return null;

  return (
    <div className={cn('flex flex-wrap gap-1', className)}>
      {items.slice(0, max).map((b, i) => (
        <Badge key={i} variant={b.variant}>
          {b.label}
        </Badge>
      ))}
    </div>
  );
}
