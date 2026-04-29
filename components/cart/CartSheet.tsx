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
        className="w-full sm:max-w-md md:max-w-lg flex flex-col p-0 overflow-hidden"
      >
        <div className="flex items-center gap-3 border-b border-ink/10 px-6 py-4 pr-14">
          <SheetTitle className="font-display text-2xl">{t('title')}</SheetTitle>
          <span
            className="ml-auto font-mono text-[11px] uppercase tracking-wider text-ink/60"
            data-num
          >
            {t('items', { count: lines.reduce((s, l) => s + l.qty, 0) })}
          </span>
        </div>

        {/* Free shipping progress */}
        {ready && lines.length > 0 ? (
          <div className="px-6 pt-3">
            {remaining > 0 ? (
              <div className="text-xs text-ink/70">
                {locale === 'fr' ? (
                  <>Plus que <strong className="font-mono tabular-nums" data-num>{formatPrice(remaining, locale)}</strong> pour la livraison gratuite</>
                ) : (
                  <>Add <strong className="font-mono tabular-nums" data-num>{formatPrice(remaining, locale)}</strong> for free shipping</>
                )}
              </div>
            ) : (
              <div className="font-mono text-[11px] uppercase tracking-wider text-leaf">
                ✓ {locale === 'fr' ? 'Livraison gratuite débloquée' : 'Free shipping unlocked'}
              </div>
            )}
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-bone-deep">
              <div
                className="h-full rounded-full bg-leaf transition-[width] duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : null}

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {!ready ? null : lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-ink/15">
                <ShoppingBag className="h-7 w-7 text-ink/40" />
              </div>
              <p className="text-ink/65">{t('empty')}</p>
              <Button
                variant="ink"
                size="md"
                onClick={() => {
                  setOpen(false);
                }}
                asChild
              >
                <Link href="/">{t('emptyCta')}</Link>
              </Button>
            </div>
          ) : (
            <ul className="space-y-5">
              {lines.map(({ product, qty }) => (
                <li key={product.slug} className="grid grid-cols-[80px_1fr] gap-3">
                  <Link
                    href={`/products/${product.slug}`}
                    onClick={() => setOpen(false)}
                    className="relative block aspect-square overflow-hidden bg-bone-deep"
                  >
                    <Image
                      src={product.images[0]}
                      alt={pickLocale(product.name, locale)}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex flex-col gap-1.5">
                    <Link
                      href={`/products/${product.slug}`}
                      onClick={() => setOpen(false)}
                      className="line-clamp-1 text-sm font-medium hover:text-clay"
                    >
                      {pickLocale(product.name, locale)}
                    </Link>
                    <div
                      className="font-mono text-sm font-semibold tabular-nums"
                      data-num
                    >
                      {formatPrice(product.price * qty, locale)}
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="inline-flex items-stretch border border-ink/15">
                        <button
                          type="button"
                          onClick={() => setQty(product.slug, qty - 1)}
                          className="px-2 py-1 hover:bg-ink/5"
                          aria-label="Decrease"
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
                          className="px-2 py-1 hover:bg-ink/5"
                          aria-label="Increase"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(product.slug)}
                        aria-label={t('remove')}
                        className="rounded p-1 text-ink/50 hover:text-berry"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {ready && lines.length > 0 ? (
          <div className="border-t border-ink/10 bg-bone p-6">
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
                  {shipping === 0
                    ? locale === 'fr'
                      ? 'Offerte'
                      : 'Free'
                    : formatPrice(shipping, locale)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between border-t border-ink/15 pt-2 text-base font-semibold">
                <dt>{t('total')}</dt>
                <dd className="font-mono tabular-nums" data-num>
                  {formatPrice(total, locale)}
                </dd>
              </div>
            </dl>

            <Button
              variant="ink"
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
              className="mt-2 block w-full text-center font-mono text-[11px] uppercase tracking-wider text-ink/60 hover:text-clay"
            >
              {locale === 'fr' ? 'Voir le panier complet' : 'View full cart'}
            </button>
            <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-ink/50">
              <Lock className="h-3 w-3" /> Secure (demo) checkout
            </div>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
