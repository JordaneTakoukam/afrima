import { SafeImage as Image } from '@/components/shared/SafeImage';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { PriceTag } from '@/components/shared/PriceTag';
import { ProductBadges } from '@/components/shared/ProductBadges';
import { RatingStars } from '@/components/shared/RatingStars';
import { WishlistButton } from '@/components/product/WishlistButton';
import { QuickView } from '@/components/product/QuickView';
import { artisansBySlug } from '@/data/artisans';
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
  const artisan = artisansBySlug[product.artisanSlug];
  const formattedSold = new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-US').format(
    product.soldCount,
  );

  return (
    <article className="group relative flex flex-col">
      <Link
        href={`/products/${product.slug}`}
        className="block focus:outline-none"
      >
        <div className="relative aspect-square overflow-hidden bg-bone-deep">
          <Image
            src={product.images[0]}
            alt={pickLocale(product.name, locale)}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            priority={priority}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            fallbackText={pickLocale(product.name, locale)}
            fallbackSeed={product.slug}
          />
          <div className="absolute left-2 top-2 flex flex-col gap-1">
            <ProductBadges product={product} locale={locale} max={2} />
          </div>
          {product.stockCount <= 8 ? (
            <div className="absolute bottom-2 left-2 rounded-sm bg-berry px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-bone">
              {t('stockLeft', { count: product.stockCount })}
            </div>
          ) : null}
          {/* Quick view hover overlay */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-center pb-2 opacity-0 transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
            <QuickView product={product} locale={locale} />
          </div>
        </div>
      </Link>

      <div className="absolute right-2 top-2 z-10">
        <WishlistButton slug={product.slug} />
      </div>

      <Link href={`/products/${product.slug}`} className="block focus:outline-none">
        <div className="flex flex-1 flex-col gap-1.5 pt-3">
          <h3 className="line-clamp-2 text-sm font-medium leading-snug text-ink group-hover:text-clay">
            {pickLocale(product.name, locale)}
          </h3>
          {artisan ? (
            <p className="font-mono text-[10px] uppercase tracking-wider text-ink/50">
              {pickLocale(artisan.signature, locale)}
            </p>
          ) : null}
          <div className="mt-1 flex items-center justify-between gap-2">
            <PriceTag
              price={product.price}
              originalPrice={product.originalPrice}
              locale={locale}
              size="md"
            />
          </div>
          <div className="flex items-center gap-2 text-xs text-ink/60">
            <RatingStars value={product.rating} size={12} />
            <span className="font-mono tabular-nums" data-num>
              {product.rating.toFixed(1)}
            </span>
            <span aria-hidden className="text-ink/30">·</span>
            <span className="font-mono tabular-nums" data-num>
              {formattedSold} {locale === 'fr' ? 'vendus' : 'sold'}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
