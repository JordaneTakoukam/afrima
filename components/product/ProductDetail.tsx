'use client';

import { SafeImage as Image } from '@/components/shared/SafeImage';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import {
  Truck,
  ShieldCheck,
  CreditCard,
  BadgeCheck,
  Minus,
  Plus,
  Share2,
  Check,
  ChevronRight,
  Boxes,
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { PriceTag } from '@/components/shared/PriceTag';
import { ProductBadges } from '@/components/shared/ProductBadges';
import { RatingStars } from '@/components/shared/RatingStars';
import { SocialProofPill } from '@/components/shared/SocialProofPill';
import { PaymentMethods } from '@/components/shared/PaymentMethods';
import { AddToCartButton } from '@/components/product/AddToCartButton';
import { WishlistButton } from '@/components/product/WishlistButton';
import { categoriesBySlug } from '@/data/categories';
import { getReviewsForProduct } from '@/data/reviews';
import { discountPercent, formatPrice, pickLocale } from '@/lib/utils';
import type { Locale, Product } from '@/lib/types';

export function ProductDetail({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  const t = useTranslations('Product');
  const category = categoriesBySlug[product.category];
  const reviews = getReviewsForProduct(product.slug);
  const off = discountPercent(product.price, product.originalPrice);
  const savings = product.originalPrice ? product.originalPrice - product.price : 0;
  const watchers = Math.max(4, Math.round(product.soldCount / 90));

  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: pickLocale(product.name, locale), url });
        return;
      } catch {
        /* user cancelled */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      toast.success(t('shareCopied'));
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <>
      <div className="mx-auto max-w-[1440px] px-4 py-6 md:px-8 md:py-10">
        {/* Breadcrumb */}
        <nav className="mb-6 flex flex-wrap items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
          <Link href="/" className="hover:text-ink">
            {t('breadcrumbHome')}
          </Link>
          <ChevronRight className="h-3 w-3" />
          {category ? (
            <>
              <Link href={`/categories/${category.slug}`} className="hover:text-ink">
                {pickLocale(category.name, locale)}
              </Link>
              <ChevronRight className="h-3 w-3" />
            </>
          ) : null}
          <span className="text-ink/80">{pickLocale(product.name, locale)}</span>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Gallery */}
          <div className="lg:col-span-7">
            <div className="flex flex-col-reverse gap-3 md:grid md:grid-cols-[88px_1fr]">
              <div className="flex flex-row gap-2.5 overflow-x-auto md:flex-col scrollbar-hide">
                {product.images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    aria-label={`Image ${i + 1}`}
                    className={`relative aspect-square w-20 shrink-0 overflow-hidden rounded-lg border-2 md:w-22 ${
                      activeImage === i
                        ? 'border-clay'
                        : 'border-border opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="88px"
                      className="object-cover"
                      fallbackText={product.brand}
                      fallbackSeed={`${product.slug}-${i}`}
                    />
                  </button>
                ))}
              </div>
              <div className="relative aspect-square overflow-hidden rounded-xl border border-border bg-surface">
                <Image
                  src={product.images[activeImage]}
                  alt={pickLocale(product.name, locale)}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  priority
                  className="object-cover"
                  fallbackText={pickLocale(product.name, locale)}
                  fallbackSeed={product.slug}
                  fallbackKicker={product.brand}
                />
                {off ? (
                  <div className="absolute left-4 top-4 rounded-md bg-clay px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-wide text-bone">
                    −{off}%
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-clay">
                {product.brand}
              </span>
              <ProductBadges product={product} locale={locale} max={2} />
            </div>

            <h1 className="mt-2 font-display text-3xl leading-tight text-ink md:text-4xl">
              {pickLocale(product.name, locale)}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-2.5 text-sm">
              <RatingStars value={product.rating} size={16} />
              <span className="font-mono tabular-nums" data-num>
                {product.rating.toFixed(1)}
              </span>
              <span className="text-muted-foreground">
                · {t('reviewsCount', { count: product.reviewCount })}
              </span>
              <span className="text-muted-foreground">
                · {t('soldCount', { count: product.soldCount })}
              </span>
            </div>

            <div className="mt-5 flex items-end gap-3">
              <PriceTag
                price={product.price}
                originalPrice={product.originalPrice}
                locale={locale}
                size="lg"
              />
            </div>
            {savings > 0 ? (
              <div className="mt-1.5 font-mono text-xs uppercase tracking-wide text-leaf" data-num>
                − {formatPrice(savings, locale)}
              </div>
            ) : null}

            <p className="mt-5 text-[15px] leading-relaxed text-ink/75">
              {pickLocale(product.description, locale)}
            </p>

            {/* Highlights */}
            <ul className="mt-5 space-y-2">
              {pickLocale(product.highlights, locale).map((h, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-ink/80">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-5">
              <SocialProofPill>
                {t('viewing', { count: watchers })}
              </SocialProofPill>
            </div>

            {/* Quantity + add to cart */}
            <div className="mt-5 flex items-stretch gap-3">
              <div className="inline-flex items-stretch rounded-lg border border-border bg-surface">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-3 text-ink hover:bg-bone-deep disabled:opacity-40"
                  aria-label="−"
                  disabled={qty <= 1}
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
                  className="px-3 text-ink hover:bg-bone-deep"
                  aria-label="+"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <AddToCartButton
                product={product}
                locale={locale}
                qty={qty}
                size="lg"
                variant="primary"
                fullWidth
              />
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-border bg-surface">
                <WishlistButton slug={product.slug} variant="plain" size={20} />
              </div>
            </div>

            {/* Stock line */}
            <div className="mt-3">
              {!product.inStock ? (
                <span className="inline-flex items-center gap-2 rounded-md bg-ink/5 px-3 py-1.5 text-xs text-ink/60">
                  {t('outOfStock')}
                </span>
              ) : product.stockCount <= 8 ? (
                <span className="inline-flex items-center gap-2 rounded-md bg-berry/10 px-3 py-1.5 text-xs text-berry">
                  <span className="h-2 w-2 rounded-full bg-berry pulse-dot" />
                  {t('lowStock', { count: product.stockCount })}
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-md bg-leaf-soft px-3 py-1.5 text-xs font-medium text-leaf">
                  <Check className="h-3.5 w-3.5" />
                  {t('inStock')}
                </span>
              )}
            </div>

            {/* Trust grid */}
            <div className="mt-6 grid grid-cols-2 gap-3 rounded-xl border border-border bg-surface p-4">
              <Trust Icon={Truck} text={t('deliveryFast')} />
              <Trust Icon={ShieldCheck} text={t('warranty', { count: product.warrantyMonths })} />
              <Trust Icon={CreditCard} text={t('securePayment')} />
              <Trust Icon={BadgeCheck} text={t('genuine')} />
            </div>

            {/* Payment line */}
            <div className="mt-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                {t('securePayment')}
              </div>
              <PaymentMethods locale={locale} className="mt-2" />
            </div>

            {/* Wholesale */}
            {product.wholesale ? (
              <div className="mt-5 flex items-start gap-3 rounded-xl border border-clay/30 bg-clay/5 p-4">
                <Boxes className="mt-0.5 h-5 w-5 shrink-0 text-clay" />
                <div>
                  <div className="text-sm font-semibold text-ink">
                    {t('wholesaleTitle')}
                  </div>
                  <p className="mt-1 text-sm text-ink/70">{t('wholesaleBody')}</p>
                </div>
              </div>
            ) : null}

            <button
              type="button"
              onClick={handleShare}
              className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-muted-foreground hover:text-ink"
            >
              <Share2 className="h-3.5 w-3.5" /> {t('share')}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-14 max-w-3xl">
          <Tabs defaultValue="description">
            <TabsList>
              <TabsTrigger value="description">{t('descriptionTab')}</TabsTrigger>
              <TabsTrigger value="specs">{t('specsTab')}</TabsTrigger>
              <TabsTrigger value="reviews">
                {t('reviewsTab')} ({product.reviewCount})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description">
              <p className="text-[15px] leading-relaxed text-ink/80">
                {pickLocale(product.description, locale)}
              </p>
              <ul className="mt-4 space-y-2">
                {pickLocale(product.highlights, locale).map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-ink/80">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
                    {h}
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="specs">
              <dl className="overflow-hidden rounded-xl border border-border">
                {product.specs.map((s, i) => (
                  <div
                    key={i}
                    className={`flex items-baseline gap-4 px-4 py-3 text-sm ${
                      i % 2 ? 'bg-bone-deep/50' : 'bg-surface'
                    }`}
                  >
                    <dt className="w-1/2 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                      {pickLocale(s.label, locale)}
                    </dt>
                    <dd className="w-1/2 font-medium text-ink">{s.value}</dd>
                  </div>
                ))}
                <div className="flex items-baseline gap-4 bg-surface px-4 py-3 text-sm">
                  <dt className="w-1/2 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                    {t('warranty', { count: product.warrantyMonths })}
                  </dt>
                  <dd className="w-1/2 font-medium text-ink">{product.brand}</dd>
                </div>
              </dl>
            </TabsContent>

            <TabsContent value="reviews">
              <div className="space-y-5">
                {reviews.length === 0 ? (
                  <p className="text-sm text-muted-foreground">{t('noReviews')}</p>
                ) : (
                  reviews.map((r, i) => (
                    <div
                      key={i}
                      className="border-b border-border pb-5 last:border-none"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <RatingStars value={r.rating} size={14} />
                        <span className="text-sm font-semibold text-ink">
                          {r.author}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          · {r.authorCity}
                        </span>
                        {r.verified ? (
                          <span className="inline-flex items-center gap-1 rounded-md bg-leaf-soft px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-leaf">
                            <BadgeCheck className="h-3 w-3" />
                            {t('verifiedBuyer')}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-2 text-sm text-ink/80">
                        {pickLocale(r.comment, locale)}
                      </p>
                      <div
                        className="mt-1 font-mono text-[10px] uppercase tracking-wide text-muted-foreground"
                        data-num
                      >
                        {r.date}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Sticky mobile add-to-cart */}
      <div className="fixed inset-x-0 bottom-14 z-20 border-t border-border bg-bone/95 backdrop-blur md:hidden">
        <div className="flex items-center gap-3 px-4 py-3">
          <PriceTag
            price={product.price}
            originalPrice={product.originalPrice}
            locale={locale}
            size="sm"
          />
          <AddToCartButton
            product={product}
            locale={locale}
            qty={qty}
            size="md"
            variant="primary"
            fullWidth
          />
        </div>
      </div>
    </>
  );
}

function Trust({ Icon, text }: { Icon: typeof Truck; text: string }) {
  return (
    <div className="flex items-center gap-2.5 text-xs text-ink/75">
      <Icon className="h-5 w-5 shrink-0 text-clay" />
      <span>{text}</span>
    </div>
  );
}
