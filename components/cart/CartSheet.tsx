'use client';

import { SafeImage as Image } from '@/components/shared/SafeImage';
import { useLocale, useTranslations } from 'next-intl';
import { Minus, Plus, ShoppingBag, Trash2, ArrowRight, Lock } from 'lucide-react';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/Sheet';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/lib/cart-context';
import { Link, useRouter } from '@/i18n/navigation';
import { productsBySlug } from '@/data/products';
import { formatPrice, pickLocale } from '@/lib/utils';
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from '@/lib/constants';
import type { Locale } from '@/lib/types';

export function CartSheet({ children }: { children: React.ReactNode }) {
  const t = useTranslations('Cart');
  const locale = useLocale() as Locale;
  const { items, setQty, remove, ready } = useCart();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const lines = items
    .map((i) => ({ product: productsBySlug[i.slug], qty: i.qty }))
    .filter((l) => l.product);
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="right"
        aria-describedby={undefined}
        className="flex w-full flex-col overflow-hidden p-0 sm:max-w-md md:max-w-lg"
      >
        <div className="flex items-center gap-3 border-b border-border px-6 py-4 pr-14">
          <SheetTitle className="font-display text-2xl">{t('title')}</SheetTitle>
          <span
            className="ml-auto font-mono text-[11px] uppercase tracking-wide text-muted-foreground"
            data-num
          >
            {t('items', { count })}
          </span>
        </div>

        {ready && lines.length > 0 ? (
          <div className="px-6 pt-3">
            {remaining > 0 ? (
              <div className="text-xs text-ink/70">
                {t('addMore', { amount: formatPrice(remaining, locale) })}
              </div>
            ) : (
              <div className="font-mono text-[11px] uppercase tracking-wide text-leaf">
                ✓ {t('freeUnlocked')}
              </div>
            )}
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-bone-deep">
              <div
                className="h-full rounded-full bg-leaf transition-[width] duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : null}

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {!ready ? null : lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-bone-deep">
                <ShoppingBag className="h-7 w-7 text-muted-foreground" />
              </div>
              <p className="text-ink/70">{t('empty')}</p>
              <Button variant="ink" size="md" onClick={() => setOpen(false)} asChild>
                <Link href="/categories">{t('emptyCta')}</Link>
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {lines.map(({ product, qty }) => (
                <li
                  key={product.slug}
                  className="grid grid-cols-[80px_1fr] gap-3 rounded-xl border border-border bg-surface p-2.5"
                >
                  <Link
                    href={`/products/${product.slug}`}
                    onClick={() => setOpen(false)}
                    className="relative block aspect-square overflow-hidden rounded-lg bg-bone-deep"
                  >
                    <Image
                      src={product.images[0]}
                      alt={pickLocale(product.name, locale)}
                      fill
                      sizes="80px"
                      className="object-cover"
                      fallbackText={product.brand}
                      fallbackSeed={product.slug}
                    />
                  </Link>
                  <div className="flex min-w-0 flex-col gap-1">
                    <div className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                      {product.brand}
                    </div>
                    <Link
                      href={`/products/${product.slug}`}
                      onClick={() => setOpen(false)}
                      className="line-clamp-1 text-sm font-medium hover:text-clay"
                    >
                      {pickLocale(product.name, locale)}
                    </Link>
                    <div className="mt-auto flex items-center justify-between gap-2">
                      <div className="inline-flex items-stretch rounded-lg border border-border">
                        <button
                          type="button"
                          onClick={() => setQty(product.slug, qty - 1)}
                          className="px-3 py-2 hover:bg-bone-deep"
                          aria-label="−"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span
                          className="flex min-w-7 items-center justify-center font-mono text-xs tabular-nums"
                          data-num
                        >
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQty(product.slug, qty + 1)}
                          className="px-3 py-2 hover:bg-bone-deep"
                          aria-label="+"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className="font-mono text-sm font-semibold tabular-nums"
                          data-num
                        >
                          {formatPrice(product.price * qty, locale)}
                        </span>
                        <button
                          type="button"
                          onClick={() => remove(product.slug)}
                          aria-label={t('remove')}
                          className="rounded p-1 text-muted-foreground hover:text-berry"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {ready && lines.length > 0 ? (
          <div className="border-t border-border bg-surface p-6">
            <dl className="space-y-1.5 text-sm">
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
              <div className="flex items-baseline justify-between border-t border-border pt-2 text-base font-semibold">
                <dt>{t('total')}</dt>
                <dd className="font-mono tabular-nums" data-num>
                  {formatPrice(total, locale)}
                </dd>
              </div>
            </dl>

            <Button
              variant="primary"
              size="lg"
              className="mt-4 w-full"
              onClick={() => {
                setOpen(false);
                router.push('/checkout');
              }}
            >
              {t('checkout')}
              <ArrowRight />
            </Button>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                router.push('/cart');
              }}
              className="mt-2 block w-full text-center font-mono text-[11px] uppercase tracking-wide text-muted-foreground hover:text-clay"
            >
              {t('viewCart')}
            </button>
            <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
              <Lock className="h-3 w-3" /> {t('secureNote')}
            </div>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
