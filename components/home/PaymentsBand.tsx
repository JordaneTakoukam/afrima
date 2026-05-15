import { useLocale, useTranslations } from 'next-intl';
import { ShieldCheck } from 'lucide-react';
import { PaymentMethods } from '@/components/shared/PaymentMethods';
import type { Locale } from '@/lib/types';

export function PaymentsBand() {
  const t = useTranslations('Payments');
  const locale = useLocale() as Locale;

  return (
    <section className="bg-ink text-bone">
      <div className="mx-auto grid max-w-[1440px] items-center gap-8 px-4 py-20 md:grid-cols-12 md:px-8 md:py-28">
        <div className="md:col-span-5">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-ochre">
            {t('kicker')}
          </div>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight md:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-3 text-bone/70">{t('subtitle')}</p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-bone/15 bg-bone/5 px-3.5 py-2 text-sm text-bone/85">
            <ShieldCheck className="h-4 w-4 text-leaf" />
            {t('secured')}
          </div>
        </div>
        <div className="md:col-span-7 md:border-l md:border-bone/10 md:pl-10">
          <PaymentMethods locale={locale} tone="dark" className="gap-3" />
        </div>
      </div>
    </section>
  );
}
