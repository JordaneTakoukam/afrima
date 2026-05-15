'use client';

import { SafeImage as Image } from '@/components/shared/SafeImage';
import { useTranslations } from 'next-intl';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Lock } from 'lucide-react';
import { Link, useRouter } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { PaymentMethods } from '@/components/shared/PaymentMethods';
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
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  if (!ready) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 py-16 md:px-8 md:py-20">
        <h1 className="font-display text-4xl md:text-6xl">{t('title')}</h1>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 py-16 md:px-8 md:py-24">
        <h1 className="font-display text-4xl md:text-6xl">{t('title')}</h1>
        <div className="mt-10 flex max-w-md flex-col items-start gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-bone-deep">
            <ShoppingBag className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <p className="text-lg font-medium text-ink">{t('empty')}</p>
            <p className="mt-1 text-sm text-muted-foreground">{t('emptySub')}</p>
          </div>
          <Button asChild variant="primary" size="md">
            <Link href="/categories">{t('emptyCta')}</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-10 md:px-8 md:py-14">
      <h1 className="font-display text-4xl md:text-6xl">{t('title')}</h1>
      <p className="mt-2 font-mono text-xs uppercase tracking-wide text-muted-foreground" data-num>
        {t('items', { count })}
      </p>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Lines */}
        <div className="space-y-3 lg:col-span-7">
          {lines.map(({ product, qty }) => (
            <div
              key={product.slug}
              className="flex gap-4 rounded-xl border border-border bg-surface p-3 md:p-4"
            >
              <Link
                href={`/products/${product.slug}`}
                className="relative block aspect-square w-24 shrink-0 overflow-hidden rounded-lg bg-bone-deep md:w-32"
              >
                <Image
                  src={product.images[0]}
                  alt={pickLocale(product.name, locale)}
                  fill
                  sizes="128px"
                  className="object-cover"
                  fallbackText={product.brand}
                  fallbackSeed={product.slug}
                />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                  {product.brand}
                </div>
                <Link
                  href={`/products/${product.slug}`}
                  className="text-sm font-medium leading-snug hover:text-clay md:text-base"
                >
                  {pickLocale(product.name, locale)}
                </Link>
                <div className="mt-1 font-mono text-xs tabular-nums text-muted-foreground" data-num>
                  {formatPrice(product.price, locale)}
                </div>

                <div className="mt-auto flex flex-wrap items-center gap-3 pt-3">
                  <div className="inline-flex items-stretch rounded-lg border border-border">
                    <button
                      type="button"
                      onClick={() => setQty(product.slug, qty - 1)}
                      className="px-3.5 py-2.5 hover:bg-bone-deep"
                      aria-label="−"
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
                      className="px-3.5 py-2.5 hover:bg-bone-deep"
                      aria-label="+"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(product.slug)}
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-berry"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    {t('remove')}
                  </button>
                </div>
              </div>
              <div
                className="hidden shrink-0 font-mono text-lg font-semibold tabular-nums sm:block"
                data-num
              >
                {formatPrice(product.price * qty, locale)}
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <aside className="lg:col-span-5 lg:col-start-8 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-border bg-surface p-6 card-shadow">
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              {t('summary')}
            </div>

            <dl className="mt-4 space-y-2.5 text-sm">
              <div className="flex items-baseline justify-between">
                <dt className="text-ink/70">{t('subtotal')}</dt>
                <dd className="font-mono tabular-nums" data-num>
                  {formatPrice(subtotal, locale)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between">
                <dt className="text-ink/70">{t('shipping')}</dt>
                <dd className="font-mono tabular-nums" data-num>
                  {shipping === 0 ? t('free') : formatPrice(shipping, locale)}
                </dd>
              </div>
              {remaining > 0 ? (
                <div className="rounded-lg bg-bone-deep px-3 py-2 text-xs text-ink/65">
                  {t('addMore', { amount: formatPrice(remaining, locale) })}
                </div>
              ) : null}
              <div className="flex items-baseline justify-between border-t border-border pt-3 text-lg font-semibold">
                <dt>{t('total')}</dt>
                <dd className="font-mono tabular-nums" data-num>
                  {formatPrice(total, locale)}
                </dd>
              </div>
            </dl>

            <Button
              variant="primary"
              size="lg"
              className="mt-5 w-full"
              onClick={() => router.push('/checkout')}
            >
              {t('checkout')}
              <ArrowRight />
            </Button>

            <button
              type="button"
              onClick={() => router.push('/categories')}
              className="mt-2 block w-full text-center font-mono text-[11px] uppercase tracking-wide text-muted-foreground hover:text-clay"
            >
              {t('continueShopping')}
            </button>

            <div className="mt-5 border-t border-border pt-4">
              <PaymentMethods locale={locale} />
            </div>

            <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
              <Lock className="h-3 w-3" /> {t('secureNote')}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
