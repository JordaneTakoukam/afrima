'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Lock } from 'lucide-react';
import { Link, useRouter } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useCart } from '@/lib/cart-context';
import { productsBySlug } from '@/data/products';
import { formatPrice, pickLocale } from '@/lib/utils';
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from '@/lib/constants';
import type { Locale } from '@/lib/types';

export function CartView({ locale }: { locale: Locale }) {
  const t = useTranslations('Cart');
  const { items, setQty, remove, ready } = useCart();
  const router = useRouter();

  const lines = items
    .map((i) => ({ product: productsBySlug[i.slug], qty: i.qty }))
    .filter((l) => l.product);
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  if (!ready) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 py-16 md:px-8 md:py-20">
        <h1 className="font-display text-5xl md:text-7xl">{t('title')}</h1>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 py-16 md:px-8 md:py-20">
        <h1 className="font-display text-5xl md:text-7xl">{t('title')}</h1>
        <div className="mt-12 max-w-md flex flex-col items-start gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-ink/20">
            <ShoppingBag className="h-8 w-8 text-ink/40" />
          </div>
          <p className="text-ink/70">{t('empty')}</p>
          <Button asChild variant="ink" size="md">
            <Link href="/">{t('emptyCta')}</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-12 md:px-8 md:py-16">
      <h1 className="font-display text-4xl md:text-7xl">{t('title')}</h1>
      <p className="mt-2 font-mono text-xs uppercase tracking-wider text-ink/60" data-num>
        {t('items', { count: lines.reduce((s, l) => s + l.qty, 0) })}
      </p>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-6">
          {lines.map(({ product, qty }) => (
            <div
              key={product.slug}
              className="grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr_auto] items-start gap-4 border-b border-ink/10 pb-6"
            >
              <Link
                href={`/products/${product.slug}`}
                className="relative block aspect-square overflow-hidden bg-bone-deep"
              >
                <Image
                  src={product.images[0]}
                  alt={pickLocale(product.name, locale)}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </Link>
              <div className="min-w-0">
                <Link
                  href={`/products/${product.slug}`}
                  className="font-display text-base sm:text-lg leading-tight hover:text-clay"
                >
                  {pickLocale(product.name, locale)}
                </Link>
                <div className="mt-1 line-clamp-1 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-ink/50">
                  {product.materials.slice(0, 2).join(' · ')}
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-stretch border border-ink/20">
                    <button
                      type="button"
                      onClick={() => setQty(product.slug, qty - 1)}
                      className="px-2.5 py-1.5 hover:bg-ink/5"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <div
                      className="flex min-w-10 items-center justify-center font-mono text-sm tabular-nums"
                      data-num
                    >
                      {qty}
                    </div>
                    <button
                      type="button"
                      onClick={() => setQty(product.slug, qty + 1)}
                      className="px-2.5 py-1.5 hover:bg-ink/5"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(product.slug)}
                    className="inline-flex items-center gap-1.5 text-xs text-ink/60 hover:text-berry"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    {t('remove')}
                  </button>
                </div>

                {/* Price on small screens */}
                <div
                  className="mt-3 font-mono text-base font-semibold tabular-nums sm:hidden"
                  data-num
                >
                  {formatPrice(product.price * qty, locale)}
                </div>
              </div>
              {/* Price on large screens */}
              <div
                className="hidden font-mono text-lg font-semibold tabular-nums sm:block"
                data-num
              >
                {formatPrice(product.price * qty, locale)}
              </div>
            </div>
          ))}
        </div>

        <aside className="lg:col-span-5 lg:col-start-9 lg:sticky lg:top-24 lg:self-start">
          <div className="border-2 border-ink p-6">
            <div className="font-mono text-[10px] uppercase tracking-wider text-ink/50">
              Summary
            </div>

            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex items-baseline justify-between">
                <dt className="text-ink/70">{t('subtotal')}</dt>
                <dd className="font-mono tabular-nums" data-num>
                  {formatPrice(subtotal, locale)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between">
                <dt className="text-ink/70">{t('shipping')}</dt>
                <dd className="font-mono tabular-nums" data-num>
                  {shipping === 0
                    ? locale === 'fr'
                      ? 'Offerte'
                      : 'Free'
                    : formatPrice(shipping, locale)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between border-t border-ink/15 pt-3 text-lg font-semibold">
                <dt>{t('total')}</dt>
                <dd className="font-mono tabular-nums" data-num>
                  {formatPrice(total, locale)}
                </dd>
              </div>
            </dl>

            <div className="mt-5 flex gap-2">
              <Input placeholder={t('promo')} className="flex-1" />
              <Button variant="outline" size="sm">
                {t('apply')}
              </Button>
            </div>

            <Button
              variant="ink"
              size="lg"
              className="mt-5 w-full"
              onClick={() => router.push('/checkout')}
            >
              {t('checkout')}
              <ArrowRight />
            </Button>

            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-ink/55">
              <Lock className="h-3 w-3" /> Secure (demo) checkout
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
