'use client';

import { SafeImage as Image } from '@/components/shared/SafeImage';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import {
  ArrowLeft,
  CheckCircle2,
  Lock,
  Truck,
  MapPin,
  Smartphone,
  CreditCard,
  Wallet,
  Landmark,
  Check,
  ShieldCheck,
} from 'lucide-react';
import { Link, useRouter } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useCart } from '@/lib/cart-context';
import { productsBySlug } from '@/data/products';
import { PAYMENT_METHODS } from '@/data/payment';
import { DELIVERY_ZONES, AFRICA_COUNTRIES } from '@/data/shipping';
import { formatPrice, pickLocale } from '@/lib/utils';
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from '@/lib/constants';
import type { Locale, PaymentMethod } from '@/lib/types';

const PAYMENT_ICON: Record<PaymentMethod['id'], typeof Smartphone> = {
  'mtn-momo': Smartphone,
  'orange-money': Smartphone,
  card: CreditCard,
  paypal: Wallet,
  'bank-transfer': Landmark,
};

const CEMAC = new Set([
  'Cameroun',
  'Tchad',
  'République Centrafricaine',
  'Congo-Brazzaville',
  'Gabon',
  'Guinée Équatoriale',
]);

type Success = { id: string; method: string; estimate: string; total: number };

export function CheckoutView({ locale }: { locale: Locale }) {
  const t = useTranslations('Checkout');
  const tc = useTranslations('Cart');
  const router = useRouter();
  const { items, clear, ready } = useCart();

  const [success, setSuccess] = useState<Success | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [paymentId, setPaymentId] = useState<PaymentMethod['id']>('mtn-momo');
  const [delivery, setDelivery] = useState<'home' | 'pickup'>('home');
  const [country, setCountry] = useState('Cameroun');

  const lines = items
    .map((i) => ({ product: productsBySlug[i.slug], qty: i.qty }))
    .filter((l) => l.product);
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  const zone =
    country === 'Cameroun'
      ? DELIVERY_ZONES[1]
      : CEMAC.has(country)
        ? DELIVERY_ZONES[2]
        : DELIVERY_ZONES[3];
  const estimate = pickLocale(zone.estimate, locale);

  if (!ready) return null;

  /* ── Success screen ── */
  if (success) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 md:px-8 md:py-24">
        <div className="text-center">
          <div className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-full bg-leaf-soft">
            <CheckCircle2 className="h-10 w-10 text-leaf" />
          </div>
          <h1 className="mt-6 font-display text-4xl md:text-5xl">{t('successTitle')}</h1>
          <p className="mx-auto mt-3 max-w-md text-ink/70">{t('successBody')}</p>
        </div>

        <div className="mt-8 overflow-hidden rounded-xl border border-border bg-surface">
          <Row label={t('orderNumber')}>
            <span className="font-mono font-semibold tabular-nums text-ink" data-num>
              {success.id}
            </span>
          </Row>
          <Row label={t('total')}>
            <span className="font-mono font-semibold tabular-nums text-ink" data-num>
              {formatPrice(success.total, locale)}
            </span>
          </Row>
          <Row label={t('successPaidWith', { method: '' }).trim()}>
            <span className="font-medium text-ink">{success.method}</span>
          </Row>
          <Row label={t('successDelivery')}>
            <span className="font-medium text-ink">{success.estimate}</span>
          </Row>
        </div>

        <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-border bg-bone-deep px-4 py-3 text-sm text-ink/65">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-clay" />
          {t('demoSuccessNote')}
        </div>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button asChild variant="primary" size="md">
            <Link href="/">{t('backHome')}</Link>
          </Button>
          <Button asChild variant="outline" size="md">
            <Link href="/categories">{t('keepShopping')}</Link>
          </Button>
        </div>
      </div>
    );
  }

  /* ── Empty cart ── */
  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center md:px-8 md:py-28">
        <h1 className="font-display text-4xl md:text-5xl">{t('emptyTitle')}</h1>
        <Button asChild variant="primary" size="md" className="mt-8">
          <Link href="/categories">{t('emptyCta')}</Link>
        </Button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const method = PAYMENT_METHODS.find((m) => m.id === paymentId)!;
    const captured = total;
    window.setTimeout(() => {
      const id = `CAS-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 89999)}`;
      clear();
      setSuccess({
        id,
        method: pickLocale(method.name, locale),
        estimate,
        total: captured,
      });
      toast.success(t('successTitle'));
      setSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1100);
  };

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-8 md:px-8 md:py-12">
      <button
        type="button"
        onClick={() => router.push('/cart')}
        className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-muted-foreground hover:text-ink"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {t('back')}
      </button>

      <h1 className="mt-3 font-display text-4xl md:text-6xl">{t('title')}</h1>

      <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="space-y-8 lg:col-span-7">
          {/* Contact */}
          <Fieldset step="01" label={t('contactStep')}>
            <Input required type="email" name="email" placeholder={t('email')} autoComplete="email" />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Input required name="name" placeholder={t('fullName')} autoComplete="name" />
              <Input required type="tel" name="phone" placeholder={t('phone')} autoComplete="tel" />
            </div>
          </Fieldset>

          {/* Delivery address */}
          <Fieldset step="02" label={t('deliveryStep')}>
            <Input required name="address" placeholder={t('address')} autoComplete="street-address" />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Input required name="city" placeholder={t('city')} autoComplete="address-level2" />
              <select
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="h-11 w-full rounded-lg border border-border bg-surface px-3.5 text-sm text-ink focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/20"
              >
                {AFRICA_COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </Fieldset>

          {/* Delivery method */}
          <Fieldset step="03" label={t('deliveryMethodStep')}>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <OptionCard
                selected={delivery === 'home'}
                onClick={() => setDelivery('home')}
                Icon={Truck}
                title={t('homeDelivery')}
                note={t('homeDeliveryNote')}
              />
              <OptionCard
                selected={delivery === 'pickup'}
                onClick={() => setDelivery('pickup')}
                Icon={MapPin}
                title={t('pickup')}
                note={t('pickupNote')}
              />
            </div>
          </Fieldset>

          {/* Payment */}
          <Fieldset step="04" label={t('paymentStep')}>
            <p className="text-sm text-ink/70">{t('paymentMethod')}</p>
            <div className="space-y-2.5">
              {PAYMENT_METHODS.map((m) => {
                const Icon = PAYMENT_ICON[m.id];
                const active = paymentId === m.id;
                return (
                  <div key={m.id}>
                    <button
                      type="button"
                      onClick={() => setPaymentId(m.id)}
                      className={`flex w-full items-center gap-3 rounded-xl border p-3.5 text-left transition-colors ${
                        active
                          ? 'border-clay bg-clay/5 ring-1 ring-clay'
                          : 'border-border bg-surface hover:border-ink/30'
                      }`}
                    >
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-bone"
                        style={{ background: m.color }}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-ink">
                          {pickLocale(m.name, locale)}
                        </span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {pickLocale(m.blurb, locale)}
                        </span>
                      </span>
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                          active ? 'border-clay bg-clay text-bone' : 'border-border'
                        }`}
                      >
                        {active ? <Check className="h-3 w-3" /> : null}
                      </span>
                    </button>

                    {active ? (
                      <div className="mt-2.5 rounded-xl border border-border bg-bone-deep/60 p-3.5">
                        {(m.id === 'mtn-momo' || m.id === 'orange-money') && (
                          <Input
                            required
                            type="tel"
                            name="momo"
                            placeholder={`${t('momoNumber')} — 6XX XX XX XX`}
                          />
                        )}
                        {m.id === 'card' && (
                          <div className="space-y-3">
                            <Input
                              required
                              name="card"
                              inputMode="numeric"
                              placeholder={`${t('cardNumber')} — 4242 4242 4242 4242`}
                              className="font-mono"
                            />
                            <Input required name="cardName" placeholder={t('cardName')} />
                            <div className="grid grid-cols-2 gap-3">
                              <Input required name="expiry" placeholder={t('expiry')} className="font-mono" />
                              <Input required name="cvc" placeholder={t('cvc')} className="font-mono" />
                            </div>
                          </div>
                        )}
                        {m.id === 'paypal' && (
                          <p className="text-xs text-ink/65">{t('paypalNote')}</p>
                        )}
                        {m.id === 'bank-transfer' && (
                          <p className="text-xs text-ink/65">{t('bankNote')}</p>
                        )}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>

            <div className="flex items-start gap-2.5 rounded-lg bg-bone-deep px-3.5 py-3 text-xs text-ink/65">
              <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-clay" />
              {t('demoNote')}
            </div>
          </Fieldset>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={submitting}
            className="w-full"
          >
            {submitting
              ? t('processing')
              : t('placeOrder', { amount: formatPrice(total, locale) })}
          </Button>
        </div>

        {/* Summary */}
        <aside className="lg:col-span-5 lg:col-start-8 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-border bg-surface p-6 card-shadow">
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              {t('orderSummary')}
            </div>
            <ul className="mt-4 space-y-3.5">
              {lines.map(({ product, qty }) => (
                <li key={product.slug} className="flex items-start gap-3">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-bone-deep">
                    <Image
                      src={product.images[0]}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover"
                      fallbackText={product.brand}
                      fallbackSeed={product.slug}
                    />
                    <span className="absolute -right-1.5 -top-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1 font-mono text-[10px] font-semibold text-bone tabular-nums">
                      {qty}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="line-clamp-2 text-sm font-medium leading-snug">
                      {pickLocale(product.name, locale)}
                    </div>
                    <div className="mt-1 font-mono text-xs tabular-nums text-muted-foreground" data-num>
                      {formatPrice(product.price * qty, locale)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <dl className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
              <div className="flex items-baseline justify-between">
                <dt className="text-ink/70">{tc('subtotal')}</dt>
                <dd className="font-mono tabular-nums" data-num>
                  {formatPrice(subtotal, locale)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between">
                <dt className="text-ink/70">{tc('shipping')}</dt>
                <dd className="font-mono tabular-nums" data-num>
                  {shipping === 0 ? tc('free') : formatPrice(shipping, locale)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between border-t border-border pt-3 text-lg font-semibold">
                <dt>{tc('total')}</dt>
                <dd className="font-mono tabular-nums" data-num>
                  {formatPrice(total, locale)}
                </dd>
              </div>
            </dl>

            <div className="mt-4 flex items-center gap-2 rounded-lg bg-bone-deep px-3.5 py-2.5 text-xs text-ink/70">
              <Truck className="h-4 w-4 shrink-0 text-clay" />
              <span>
                {t('deliveryEstimate')}: <strong>{estimate}</strong>
              </span>
            </div>
          </div>
        </aside>
      </form>
    </div>
  );
}

function Fieldset({
  step,
  label,
  children,
}: {
  step: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="space-y-3.5">
      <legend className="mb-3.5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-clay">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-clay/10 font-bold">
          {step}
        </span>
        {label}
      </legend>
      {children}
    </fieldset>
  );
}

function OptionCard({
  selected,
  onClick,
  Icon,
  title,
  note,
}: {
  selected: boolean;
  onClick: () => void;
  Icon: typeof Truck;
  title: string;
  note: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-start gap-3 rounded-xl border p-3.5 text-left transition-colors ${
        selected
          ? 'border-clay bg-clay/5 ring-1 ring-clay'
          : 'border-border bg-surface hover:border-ink/30'
      }`}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
          selected ? 'bg-clay text-bone' : 'bg-bone-deep text-ink'
        }`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <span>
        <span className="block text-sm font-semibold text-ink">{title}</span>
        <span className="mt-0.5 block text-xs text-muted-foreground">{note}</span>
      </span>
    </button>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3 text-sm last:border-none">
      <span className="text-muted-foreground">{label}</span>
      {children}
    </div>
  );
}
