import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { PriceTag } from '@/components/shared/PriceTag';
import { artisansBySlug } from '@/data/artisans';
import { pickLocale } from '@/lib/utils';
import type { Locale, Product } from '@/lib/types';

export function ProductCardEditorial({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const artisan = artisansBySlug[product.artisanSlug];
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <article className="relative">
        <div className="relative aspect-[4/5] overflow-hidden bg-bone-deep">
          <Image
            src={product.images[0]}
            alt={pickLocale(product.name, locale)}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4">
            <div className="text-bone">
              <h3 className="font-display text-2xl leading-tight md:text-3xl">
                {pickLocale(product.name, locale)}
              </h3>
              {artisan ? (
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-bone/70">
                  {locale === 'fr' ? 'par' : 'by'} {artisan.name}
                </p>
              ) : null}
            </div>
            <div className="rounded-sm bg-bone px-3 py-2">
              <PriceTag price={product.price} originalPrice={product.originalPrice} locale={locale} size="sm" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
