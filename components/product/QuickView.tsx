'use client';

import Image from 'next/image';
import { Eye, Minus, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/Sheet';
import { PriceTag } from '@/components/shared/PriceTag';
import { RatingStars } from '@/components/shared/RatingStars';
import { ProductBadges } from '@/components/shared/ProductBadges';
import { AddToCartButton } from '@/components/product/AddToCartButton';
import { WishlistButton } from '@/components/product/WishlistButton';
import { artisansBySlug } from '@/data/artisans';
import { countriesBySlug } from '@/data/countries';
import { pickLocale } from '@/lib/utils';
import type { Locale, Product } from '@/lib/types';

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return isDesktop;
}

export function QuickView({
  product,
  locale,
  className,
}: {
  product: Product;
  locale: Locale;
  className?: string;
}) {
  const t = useTranslations('Product');
  const router = useRouter();
  const isDesktop = useIsDesktop();
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState(1);

  const artisan = artisansBySlug[product.artisanSlug];
  const country = countriesBySlug[product.country];

  const triggerProps = {
    type: 'button' as const,
    onClick: (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isDesktop) {
        router.push(`/products/${product.slug}`);
      } else {
        setOpen(true);
      }
    },
    'aria-label': t('quickView'),
    className: `inline-flex items-center gap-1.5 rounded-full bg-bone/95 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-ink shadow-sm backdrop-blur transition-all hover:bg-ink hover:text-bone ${
      className ?? ''
    }`,
  };

  if (!isDesktop) {
    return (
      <button {...triggerProps}>
        <Eye className="h-3 w-3" />
        {t('quickView')}
      </button>
    );
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button {...triggerProps}>
          <Eye className="h-3 w-3" />
          {t('quickView')}
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md md:max-w-xl overflow-y-auto p-0">
        <div className="relative aspect-[4/3] bg-bone-deep">
          <Image
            src={product.images[0]}
            alt={pickLocale(product.name, locale)}
            fill
            sizes="600px"
            className="object-cover"
          />
          <div className="absolute left-3 top-3 flex flex-wrap gap-1">
            <ProductBadges product={product} locale={locale} max={3} />
          </div>
          <div className="absolute right-3 top-3">
            <WishlistButton slug={product.slug} />
          </div>
        </div>

        <div className="p-6">
          <h3 className="font-display text-2xl leading-tight md:text-3xl">
            {pickLocale(product.name, locale)}
          </h3>

          {artisan ? (
            <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-ink/60">
              {country?.flag} {country ? pickLocale(country.name, locale) : ''} ·{' '}
              {pickLocale(artisan.signature, locale)}
            </div>
          ) : null}

          <div className="mt-3 flex items-center gap-3">
            <RatingStars value={product.rating} size={14} />
            <span className="font-mono text-sm tabular-nums" data-num>
              {product.rating.toFixed(1)}
            </span>
            <span className="text-ink/40">·</span>
            <span className="text-sm text-ink/60 tabular-nums" data-num>
              {t('soldCount', { count: product.soldCount })}
            </span>
          </div>

          <div className="mt-5">
            <PriceTag
              price={product.price}
              originalPrice={product.originalPrice}
              locale={locale}
              size="lg"
            />
          </div>

          <p className="mt-5 line-clamp-3 text-sm text-ink/75">
            {pickLocale(product.description, locale)}
          </p>

          <div className="mt-6 flex items-center gap-3">
            <div className="inline-flex items-stretch border border-ink/20">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3 hover:bg-ink/5"
                aria-label="Decrease"
              >
                <Minus className="h-4 w-4" />
              </button>
              <div
                className="flex min-w-12 items-center justify-center font-mono text-base tabular-nums"
                data-num
              >
                {qty}
              </div>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                className="px-3 hover:bg-ink/5"
                aria-label="Increase"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <AddToCartButton
              product={product}
              locale={locale}
              qty={qty}
              size="md"
              variant="primary"
              fullWidth
            />
          </div>

          <button
            type="button"
            onClick={() => {
              setOpen(false);
              router.push(`/products/${product.slug}`);
            }}
            className="mt-4 inline-flex w-full items-center justify-center border-b border-ink/20 pb-2 font-mono text-xs uppercase tracking-wider text-ink/70 hover:text-clay hover:border-clay"
          >
            {locale === 'fr' ? 'Voir tous les détails' : 'See full details'}
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
