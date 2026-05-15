import { useLocale, useTranslations } from 'next-intl';
import { Phone, Mail, MessageCircle, MapPin } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Logo } from '@/components/shared/Logo';
import { PaymentMethods } from '@/components/shared/PaymentMethods';
import type { Locale } from '@/lib/types';

export function Footer() {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Nav');
  const locale = useLocale() as Locale;

  return (
    <footer className="mt-20 border-t border-border bg-ink text-bone">
      <div className="mx-auto max-w-[1440px] px-4 pb-32 pt-16 md:px-8 md:pb-16">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand + contact */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2.5">
              <Logo size={36} />
              <span className="font-display text-2xl font-semibold tracking-tight">
                AFRIMA
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-bone/70">{t('tagline')}</p>
            <ul className="mt-5 space-y-2 text-sm text-bone/80">
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-ochre" />
                +237 6 90 00 00 00
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="h-4 w-4 text-ochre" />
                WhatsApp +237 6 90 00 00 00
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-ochre" />
                hello@afrima.cm
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-ochre" />
                Douala · Yaoundé, Cameroun
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <FooterTitle>{t('shop')}</FooterTitle>
            <FooterList>
              <Link href="/categories">{t('allProducts')}</Link>
              <Link href="/deals">{t('deals')}</Link>
              <Link href="/search">{t('newArrivals')}</Link>
              <Link href="/wishlist">{tNav('wishlist')}</Link>
            </FooterList>
          </div>

          <div className="md:col-span-2">
            <FooterTitle>{t('company')}</FooterTitle>
            <FooterList>
              <Link href="/about">{t('about')}</Link>
              <span>{t('contact')}</span>
              <span>{t('wholesale')}</span>
            </FooterList>
          </div>

          <div className="md:col-span-2">
            <FooterTitle>{t('help')}</FooterTitle>
            <FooterList>
              <span>{t('faq')}</span>
              <span>{t('delivery')}</span>
              <span>{t('returns')}</span>
              <span>{t('warranty')}</span>
            </FooterList>
          </div>

          <div className="md:col-span-2">
            <FooterTitle>{t('legal')}</FooterTitle>
            <FooterList>
              <span>{t('terms')}</span>
              <span>{t('privacy')}</span>
            </FooterList>
          </div>
        </div>

        {/* Payments */}
        <div className="mt-12 flex flex-col gap-3 border-t border-bone/10 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone/55">
            {t('payments')}
          </div>
          <PaymentMethods locale={locale} tone="dark" />
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col gap-3 border-t border-bone/10 pt-6 text-xs text-bone/55 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
            <span>{t('rights')}</span>
            <span aria-hidden className="hidden text-bone/25 sm:inline">
              ·
            </span>
            <span>{t('demo')}</span>
          </div>
          <div className="flex flex-col gap-1 font-mono uppercase tracking-[0.14em] sm:flex-row sm:items-center sm:gap-3">
            <span>
              {t('coCreator')}:{' '}
              <span className="text-bone/85">Magne Takoukam Chloé Martine</span>
            </span>
            <span aria-hidden className="hidden text-bone/25 sm:inline">
              ·
            </span>
            <span>
              {t('builtBy')}{' '}
              <a
                href="https://idrissjordane.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-bone underline-offset-4 hover:underline"
              >
                Idriss Jordane
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/45">
      {children}
    </div>
  );
}

function FooterList({ children }: { children: React.ReactNode }) {
  return (
    <ul className="mt-3 space-y-2 text-sm text-bone/80 [&_a:hover]:text-bone [&>li]:cursor-pointer [&>li:hover]:text-bone">
      {Array.isArray(children) ? (
        children.map((c, i) => <li key={i}>{c}</li>)
      ) : (
        <li>{children}</li>
      )}
    </ul>
  );
}
