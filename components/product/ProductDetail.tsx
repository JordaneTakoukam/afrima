'use client';

import { SafeImage as Image } from '@/components/shared/SafeImage';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Truck, ShieldCheck, Hand, Award, Minus, Plus, Share2 } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { PriceTag } from '@/components/shared/PriceTag';
import { ProductBadges } from '@/components/shared/ProductBadges';
import { RatingStars } from '@/components/shared/RatingStars';
import { SocialProofPill } from '@/components/shared/SocialProofPill';
import { AddToCartButton } from '@/components/product/AddToCartButton';
import { WishlistButton } from '@/components/product/WishlistButton';
import { artisansBySlug } from '@/data/artisans';
import { countriesBySlug } from '@/data/countries';
import { getReviewsForProduct } from '@/data/reviews';
import { discountPercent, formatPrice, pickLocale } from '@/lib/utils';
import type { Locale, Product } from '@/lib/types';

export function ProductDetail({ product, locale }: { product: Product; locale: Locale }) {
  const t = useTranslations('Product');
  const artisan = artisansBySlug[product.artisanSlug];
  const country = countriesBySlug[product.country];
  const reviews = getReviewsForProduct(product.slug);
  const off = discountPercent(product.price, product.originalPrice);
  const savings = product.originalPrice ? product.originalPrice - product.price : 0;

  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 md:px-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 font-mono text-[11px] uppercase tracking-wider text-ink/50">
        <Link href="/" className="hover:text-ink">Home</Link>
        <span className="mx-2">/</span>
        <Link href={`/categories/${product.category}`} className="hover:text-ink">
          {product.category.replace(/-/g, ' ')}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink/80">{pickLocale(product.name, locale)}</span>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Gallery */}
        <div className="lg:col-span-7 flex flex-col-reverse gap-3 md:grid md:grid-cols-[80px_1fr]">
          <div className="flex flex-row gap-2 overflow-x-auto md:flex-col scrollbar-hide">
            {product.images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setActiveImage(i)}
                className={`relative aspect-square w-16 shrink-0 overflow-hidden border-2 md:w-20 ${
                  activeImage === i ? 'border-ink' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
          <div className="relative aspect-[4/5] overflow-hidden bg-bone-deep">
            <Image
              src={product.images[activeImage]}
              alt={pickLocale(product.name, locale)}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority
              className="object-cover"
              fallbackText={pickLocale(product.name, locale)}
              fallbackSeed={product.slug}
              fallbackKicker="Image"
            />
            {off ? (
              <div className="absolute left-3 top-3 rounded-sm bg-clay px-2 py-1 font-mono text-xs font-bold uppercase tracking-wider text-bone">
                −{off}%
              </div>
            ) : null}
          </div>
        </div>

        {/* Info */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
          <div className="flex flex-wrap items-center gap-2">
            <ProductBadges product={product} locale={locale} max={3} />
          </div>
          <h1 className="mt-3 font-display text-3xl leading-tight text-ink md:text-4xl">
            {pickLocale(product.name, locale)}
          </h1>

          {artisan ? (
            <Link
              href={`/artisans/${artisan.slug}`}
              className="mt-1 block font-mono text-[11px] uppercase tracking-wider text-ink/60 hover:text-clay"
            >
              {t('byArtisan')} {artisan.name} · {pickLocale(artisan.signature, locale)}
            </Link>
          ) : null}

          <div className="mt-4 flex items-center gap-3">
            <RatingStars value={product.rating} size={16} />
            <span className="font-mono text-sm tabular-nums" data-num>
              {product.rating.toFixed(1)}
            </span>
            <span className="text-ink/40" aria-hidden>·</span>
            <span className="text-sm text-ink/60">
              {t('rating', { rating: product.rating, count: product.reviewCount })}
            </span>
            <span className="text-ink/40" aria-hidden>·</span>
            <span className="text-sm text-ink/60 font-mono tabular-nums" data-num>
              {t('soldCount', { count: product.soldCount })}
            </span>
          </div>

          <div className="mt-6 flex items-end gap-3">
            <PriceTag
              price={product.price}
              originalPrice={product.originalPrice}
              locale={locale}
              size="lg"
            />
          </div>
          {savings > 0 ? (
            <div className="mt-2 font-mono text-xs uppercase tracking-wider text-leaf" data-num>
              {t('savings', { amount: formatPrice(savings, locale) })}
            </div>
          ) : null}

          <p className="mt-6 text-base text-ink/75">
            {pickLocale(product.description, locale)}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <SocialProofPill>
              {t('viewing', { count: 247 })}
            </SocialProofPill>
            <SocialProofPill>
              {t('boughtToday', { count: 38 })}
            </SocialProofPill>
          </div>

          {/* Quantity + add to cart */}
          <div className="mt-8 flex items-stretch gap-3">
            <div className="inline-flex items-stretch border border-ink/20">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3 hover:bg-ink/5"
                aria-label="Decrease"
              >
                <Minus className="h-4 w-4" />
              </button>
              <div className="flex min-w-12 items-center justify-center font-mono text-base tabular-nums" data-num>
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
              size="lg"
              variant="primary"
              fullWidth
            />
            <div className="flex h-14 w-14 items-center justify-center border-2 border-ink hover:bg-ink/5">
              <WishlistButton slug={product.slug} variant="plain" size={20} />
            </div>
          </div>

          {product.stockCount <= 8 ? (
            <div className="mt-3 inline-flex items-center gap-2 rounded-sm bg-berry/10 px-3 py-2 text-xs text-berry">
              <span className="relative inline-flex h-2 w-2 rounded-full bg-berry pulse-dot" />
              {t('stockLeft', { count: product.stockCount })}
            </div>
          ) : null}

          {/* Trust strip */}
          <div className="mt-8 grid grid-cols-2 gap-3 border-y border-ink/10 py-4 sm:grid-cols-4">
            <Trust Icon={Truck} text={t('deliveryTime')} />
            <Trust Icon={ShieldCheck} text={t('secureCheckout')} />
            <Trust Icon={Hand} text={t('handMade')} />
            <Trust Icon={Award} text={t('authentic')} />
          </div>

          <button
            type="button"
            className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-wider text-ink/60 hover:text-ink"
          >
            <Share2 className="h-3.5 w-3.5" /> {t('share')}
          </button>
        </div>
      </div>

      {/* Sticky mobile add-to-cart */}
      <div className="fixed inset-x-0 bottom-14 z-20 border-t border-ink/10 bg-bone/95 backdrop-blur md:hidden">
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

      {/* Tabs */}
      <div className="mt-16 max-w-4xl">
        <Tabs defaultValue="description">
          <TabsList>
            <TabsTrigger value="description">{t('tabDescription')}</TabsTrigger>
            <TabsTrigger value="culture">{t('tabCulture')}</TabsTrigger>
            <TabsTrigger value="materials">{t('tabMaterials')}</TabsTrigger>
            <TabsTrigger value="reviews">{t('tabReviews')} ({product.reviewCount})</TabsTrigger>
          </TabsList>

          <TabsContent value="description">
            <p className="text-base text-ink/80 leading-relaxed">
              {pickLocale(product.description, locale)}
            </p>
          </TabsContent>

          <TabsContent value="culture">
            <div className="border-l-4 border-ink bg-ochre/10 p-6 md:p-8">
              <p className="font-display text-lg italic leading-relaxed text-ink md:text-xl">
                {pickLocale(product.culturalContext, locale)}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="materials">
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-wider text-ink/50">
                  {t('materials')}
                </dt>
                <dd className="mt-1 text-sm">{product.materials.join(' · ')}</dd>
              </div>
              {product.dimensions ? (
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-ink/50">
                    {t('dimensions')}
                  </dt>
                  <dd className="mt-1 text-sm">{product.dimensions}</dd>
                </div>
              ) : null}
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-wider text-ink/50">
                  {t('country')}
                </dt>
                <dd className="mt-1 text-sm">{country?.flag} {country ? pickLocale(country.name, locale) : ''}</dd>
              </div>
              {product.ethnicGroup ? (
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-ink/50">
                    {t('ethnicGroup')}
                  </dt>
                  <dd className="mt-1 text-sm">{product.ethnicGroup}</dd>
                </div>
              ) : null}
            </dl>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="space-y-6">
              {reviews.length === 0 ? (
                <p className="text-sm text-ink/60">No reviews yet.</p>
              ) : (
                reviews.map((r, i) => (
                  <div key={i} className="border-b border-ink/10 pb-5 last:border-none">
                    <div className="flex items-center gap-2">
                      <RatingStars value={r.rating} size={14} />
                      <span className="text-sm font-medium">{r.author}</span>
                      <span className="text-xs text-ink/50">· {r.authorCountry}</span>
                      {r.verified ? (
                        <span className="rounded-sm bg-leaf/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-leaf">
                          {t('verifiedReview')}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 text-sm text-ink/80">{pickLocale(r.comment, locale)}</p>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-ink/40" data-num>
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
  );
}

function Trust({ Icon, text }: { Icon: typeof Truck; text: string }) {
  return (
    <div className="flex items-center gap-2 text-xs text-ink/70">
      <Icon className="h-4 w-4 text-clay" />
      <span>{text}</span>
    </div>
  );
}
