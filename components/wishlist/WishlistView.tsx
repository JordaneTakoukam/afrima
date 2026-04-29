'use client';

import { Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/product/ProductCard';
import { useWishlist } from '@/lib/wishlist-context';
import { productsBySlug } from '@/data/products';
import type { Locale } from '@/lib/types';

export function WishlistView({ locale }: { locale: Locale }) {
  const t = useTranslations('Wishlist');
  const { items, ready } = useWishlist();

  if (!ready) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 py-16 md:px-8 md:py-20">
        <h1 className="font-display text-5xl md:text-7xl">{t('title')}</h1>
      </div>
    );
  }

  const products = items.map((s) => productsBySlug[s]).filter(Boolean);

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-12 md:px-8 md:py-16">
      <h1 className="font-display text-4xl md:text-7xl">{t('title')}</h1>

      {products.length === 0 ? (
        <div className="mt-12 max-w-md flex flex-col items-start gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-ink/20">
            <Heart className="h-8 w-8 text-ink/40" />
          </div>
          <p className="text-ink/70">{t('empty')}</p>
          <Button asChild variant="ink" size="md">
            <Link href="/">{t('emptyCta')}</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
