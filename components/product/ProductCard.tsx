import { SafeImage as Image } from '@/components/shared/SafeImage';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { PriceTag } from '@/components/shared/PriceTag';
import { ProductBadges } from '@/components/shared/ProductBadges';
import { RatingStars } from '@/components/shared/RatingStars';
import { WishlistButton } from '@/components/product/WishlistButton';
import { AddToCartButton } from '@/components/product/AddToCartButton';
import { pickLocale } from '@/lib/utils';
import type { Locale, Product } from '@/lib/types';

export function ProductCard({
  product,
  locale,
  priority = false,
}: {
  product: Product;
  locale: Locale;
  priority?: boolean;
}) {
  const t = useTranslations('Product');

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface card-shadow card-lift">
      <div className="absolute right-3 top-3 z-10">
        <WishlistButton slug={product.slug} />
      </div>

      <Link
        href={`/products/${product.slug}`}
        className="flex flex-1 flex-col focus:outline-none"
      >
        <div className="relative aspect-square overflow-hidden bg-bone-deep">
          <Image
            src={product.images[0]}
            alt={pickLocale(product.name, locale)}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 22vw"
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            fallbackText={pickLocale(product.name, locale)}
            fallbackSeed={product.slug}
            fallbackKicker={product.brand}
          />
          <div className="absolute left-3 top-3">
            <ProductBadges product={product} locale={locale} max={1} />
          </div>
          {!product.inStock ? (
            <div className="absolute inset-0 flex items-center justify-center bg-bone/65 backdrop-blur-[1px]">
              <span className="rounded-md bg-ink px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide text-bone">
                {t('outOfStock')}
              </span>
            </div>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col gap-1 p-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
            {product.brand}
          </div>
          <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-medium leading-snug text-ink transition-colors group-hover:text-clay">
            {pickLocale(product.name, locale)}
          </h3>
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
            <RatingStars value={product.rating} size={12} />
            <span className="font-mono tabular-nums" data-num>
              {product.rating.toFixed(1)}
            </span>
            <span aria-hidden>·</span>
            <span className="font-mono tabular-nums" data-num>
              {t('soldCount', { count: product.soldCount })}
            </span>
          </div>
          <div className="mt-2">
            <PriceTag
              price={product.price}
              originalPrice={product.originalPrice}
              locale={locale}
              size="sm"
            />
          </div>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <AddToCartButton
          product={product}
          locale={locale}
          size="sm"
          variant="primary"
          fullWidth
        />
      </div>
    </article>
  );
}
