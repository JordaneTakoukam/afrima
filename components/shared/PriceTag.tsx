import { cn } from '@/lib/utils';
import { discountPercent, formatPrice } from '@/lib/utils';

export function PriceTag({
  price,
  originalPrice,
  locale = 'en',
  size = 'md',
  className,
}: {
  price: number;
  originalPrice?: number;
  locale?: 'en' | 'fr';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const off = discountPercent(price, originalPrice);
  const sizes = {
    sm: { price: 'text-base', orig: 'text-xs', badge: 'text-[10px] px-1.5 py-0.5' },
    md: { price: 'text-lg', orig: 'text-xs', badge: 'text-[11px] px-1.5 py-0.5' },
    lg: { price: 'text-3xl', orig: 'text-sm', badge: 'text-xs px-2 py-1' },
  }[size];

  return (
    <div className={cn('inline-flex items-baseline gap-2 font-mono', className)} data-num>
      <span className={cn('font-semibold tabular-nums text-ink', sizes.price)}>
        {formatPrice(price, locale)}
      </span>
      {originalPrice && originalPrice > price ? (
        <>
          <s className={cn('tabular-nums text-ink/40', sizes.orig)}>
            {formatPrice(originalPrice, locale)}
          </s>
          {off ? (
            <span
              className={cn(
                'inline-flex items-center rounded-sm bg-clay font-bold uppercase tracking-wider text-bone',
                sizes.badge,
              )}
            >
              −{off}%
            </span>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
