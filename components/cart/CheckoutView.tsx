'use client';

import { SafeImage as Image } from '@/components/shared/SafeImage';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { ArrowLeft, CheckCircle2, CreditCard, Lock, Truck } from 'lucide-react';
import { Link, useRouter } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useCart } from '@/lib/cart-context';
import { productsBySlug } from '@/data/products';
import { formatPrice, pickLocale } from '@/lib/utils';
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from '@/lib/constants';
import type { Locale } from '@/lib/types';

export function CheckoutView({ locale }: { locale: Locale }) {
  const t = useTranslations('Cart');
  const router = useRouter();
  const { items, clear, ready } = useCart();
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const lines = items
    .map((i) => ({ product: productsBySlug[i.slug], qty: i.qty }))
    .filter((l) => l.product);
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  if (!ready) return null;

  if (success) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 md:px-8 md:py-28 text-center">
        <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-leaf/15">
          <CheckCircle2 className="h-8 w-8 text-leaf" />
        </div>
        <h1 className="mt-6 font-display text-4xl md:text-6xl">
          {locale === 'fr' ? 'Commande confirmée' : 'Order confirmed'}
        </h1>
        <p className="mt-4 text-ink/70">
          {locale === 'fr'
            ? 'Merci ! Votre numéro de commande est'
            : 'Thank you! Your order number is'}{' '}
          <span className="font-mono font-semibold tabular-nums text-ink" data-num>
            {success}
          </span>
          .
        </p>
        <p className="mt-2 text-sm text-ink/55">
          {locale === 'fr'
            ? 'Démo : aucun paiement réel n\'a été effectué.'
            : "Demo: no real payment was processed."}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild variant="ink" size="md">
            <Link href="/">{locale === 'fr' ? "Retour à l'accueil" : 'Back to home'}</Link>
          </Button>
          <Button asChild variant="outline" size="md">
            <Link href="/categories/fashion-textiles">
              {locale === 'fr' ? 'Continuer mes achats' : 'Keep shopping'}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 md:px-8 md:py-28 text-center">
        <h1 className="font-display text-4xl md:text-6xl">{t('empty')}</h1>
        <Button asChild variant="ink" size="md" className="mt-8">
          <Link href="/">{t('emptyCta')}</Link>
        </Button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      const id = `AF-${new Date().getFullYear()}-${Math.floor(Math.random() * 90000) + 10000}`;
      clear();
      setSuccess(id);
      toast.success(locale === 'fr' ? 'Commande confirmée (démo)' : 'Order confirmed (demo)');
      setSubmitting(false);
    }, 900);
  };

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 md:px-8 md:py-12">
      <button
        type="button"
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-ink/60 hover:text-ink"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {locale === 'fr' ? 'Retour au panier' : 'Back to cart'}
      </button>

      <h1 className="mt-4 font-display text-4xl md:text-6xl">
        {locale === 'fr' ? 'Paiement' : 'Checkout'}
      </h1>

      <form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-10">
          <fieldset className="space-y-4">
            <legend className="font-mono text-[10px] uppercase tracking-[0.2em] text-clay">
              01 / {locale === 'fr' ? 'Coordonnées' : 'Contact'}
            </legend>
            <Input required type="email" name="email" placeholder="email@example.com" />
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="font-mono text-[10px] uppercase tracking-[0.2em] text-clay">
              02 / {locale === 'fr' ? 'Adresse de livraison' : 'Shipping address'}
            </legend>
            <div className="grid grid-cols-2 gap-3">
              <Input required name="firstName" placeholder={locale === 'fr' ? 'Prénom' : 'First name'} />
              <Input required name="lastName" placeholder={locale === 'fr' ? 'Nom' : 'Last name'} />
            </div>
            <Input required name="address" placeholder={locale === 'fr' ? 'Adresse' : 'Address'} />
            <div className="grid grid-cols-3 gap-3">
              <Input required name="city" placeholder={locale === 'fr' ? 'Ville' : 'City'} />
              <Input required name="zip" placeholder={locale === 'fr' ? 'Code postal' : 'Postal code'} />
              <Input required name="country" placeholder={locale === 'fr' ? 'Pays' : 'Country'} />
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-clay">
              03 / {locale === 'fr' ? 'Paiement' : 'Payment'}
              <Lock className="h-3 w-3" />
            </legend>
            <div className="rounded-sm border border-ink/15 bg-bone-deep/50 p-4 text-xs text-ink/65">
              {locale === 'fr'
                ? "Démo — aucun paiement réel n'est traité. Saisissez n'importe quoi."
                : 'Demo — no real payment is processed. Enter anything.'}
            </div>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/50" />
              <Input
                required
                name="card"
                placeholder="4242 4242 4242 4242"
                className="pl-10 font-mono tabular-nums"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input required name="expiry" placeholder="MM / YY" className="font-mono" />
              <Input required name="cvc" placeholder="CVC" className="font-mono" />
            </div>
          </fieldset>

          <Button type="submit" variant="ink" size="lg" disabled={submitting} className="w-full">
            {submitting
              ? locale === 'fr'
                ? 'Traitement…'
                : 'Processing…'
              : locale === 'fr'
                ? `Payer ${formatPrice(total, locale)}`
                : `Pay ${formatPrice(total, locale)}`}
          </Button>
        </div>

        <aside className="lg:col-span-5 lg:col-start-9 lg:sticky lg:top-24 lg:self-start">
          <div className="border-2 border-ink p-6">
            <div className="font-mono text-[10px] uppercase tracking-wider text-ink/50">
              {locale === 'fr' ? 'Votre commande' : 'Your order'}
            </div>
            <ul className="mt-4 space-y-4">
              {lines.map(({ product, qty }) => (
                <li key={product.slug} className="flex items-start gap-3">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-bone-deep">
                    <Image
                      src={product.images[0]}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                    <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1 font-mono text-[10px] font-semibold text-bone tabular-nums">
                      {qty}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="line-clamp-1 text-sm font-medium">
                      {pickLocale(product.name, locale)}
                    </div>
                    <div
                      className="mt-1 font-mono text-xs tabular-nums text-ink/60"
                      data-num
                    >
                      {formatPrice(product.price * qty, locale)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <dl className="mt-6 space-y-2 border-t border-ink/15 pt-4 text-sm">
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

            <div className="mt-5 flex items-center gap-2 text-xs text-ink/55">
              <Truck className="h-3.5 w-3.5" />
              {locale === 'fr'
                ? 'Livraison 5–10 jours, suivi inclus'
                : 'Delivery in 5–10 days, tracked'}
            </div>
          </div>
        </aside>
      </form>
    </div>
  );
}
