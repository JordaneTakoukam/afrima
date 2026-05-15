import { useTranslations } from 'next-intl';
import { ShoppingCart, CreditCard, Truck } from 'lucide-react';
import { SectionHeading } from '@/components/shared/SectionHeading';

export function HowItWorks() {
  const t = useTranslations('HowItWorks');
  const steps = [
    { n: '01', Icon: ShoppingCart, title: t('step1Title'), body: t('step1Body') },
    { n: '02', Icon: CreditCard, title: t('step2Title'), body: t('step2Body') },
    { n: '03', Icon: Truck, title: t('step3Title'), body: t('step3Body') },
  ];

  return (
    <section className="mx-auto max-w-[1440px] px-4 py-14 md:px-8 md:py-28">
      <SectionHeading
        kicker={t('kicker')}
        title={t('title')}
        subtitle={t('subtitle')}
        align="center"
      />
      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
        {steps.map((s) => (
          <div
            key={s.n}
            className="relative overflow-hidden rounded-xl border border-border bg-surface p-6 card-shadow"
          >
            <span
              className="pointer-events-none absolute -right-2 -top-3 font-display text-7xl font-semibold text-bone-deep"
              data-num
              aria-hidden
            >
              {s.n}
            </span>
            <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-clay/10 text-clay">
              <s.Icon className="h-6 w-6" />
            </span>
            <h3 className="relative mt-4 font-display text-xl font-semibold">
              {s.title}
            </h3>
            <p className="relative mt-2 text-sm leading-relaxed text-ink/70">
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
