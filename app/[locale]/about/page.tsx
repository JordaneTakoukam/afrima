import { SafeImage as Image } from '@/components/shared/SafeImage';
import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Tag, ShieldCheck, Truck, Headphones, Phone, Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Link } from '@/i18n/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About' });
  return { title: t('title'), description: t('subtitle') };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('About');
  const tn = await getTranslations('Nav');

  const stats = [
    { value: t('stat1Value'), label: t('stat1Label') },
    { value: t('stat2Value'), label: t('stat2Label') },
    { value: t('stat3Value'), label: t('stat3Label') },
  ];
  const values = [
    { Icon: Tag, title: t('value1Title'), body: t('value1Body') },
    { Icon: ShieldCheck, title: t('value2Title'), body: t('value2Body') },
    { Icon: Truck, title: t('value3Title'), body: t('value3Body') },
    { Icon: Headphones, title: t('value4Title'), body: t('value4Body') },
  ];

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-bone-deep">
        <div className="mx-auto max-w-[1440px] px-4 py-16 md:px-8 md:py-24">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-clay">
            {t('kicker')}
          </div>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-[1.05] md:text-7xl">
            {t('title')}
          </h1>
          <p className="mt-5 max-w-2xl text-ink/75 md:text-lg">{t('subtitle')}</p>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto grid max-w-[1440px] grid-cols-1 gap-4 px-4 py-12 sm:grid-cols-3 md:px-8">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-surface p-6 card-shadow">
            <div className="font-display text-4xl font-semibold text-clay md:text-5xl" data-num>
              {s.value}
            </div>
            <div className="mt-1 text-sm text-ink/70">{s.label}</div>
          </div>
        ))}
      </section>

      {/* Mission */}
      <section className="mx-auto grid max-w-[1440px] items-center gap-10 px-4 py-12 md:grid-cols-2 md:px-8 md:py-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-bone-deep">
          <Image
            src="/products/photo-1556742049-0cfed4f6a45d.jpg"
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            fallbackText="AFRIMA"
          />
        </div>
        <div>
          <h2 className="font-display text-3xl font-semibold md:text-4xl">
            {t('missionTitle')}
          </h2>
          <p className="mt-4 text-ink/75 leading-relaxed md:text-lg">{t('missionBody')}</p>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-border bg-bone-deep">
        <div className="mx-auto max-w-[1440px] px-4 py-14 md:px-8 md:py-16">
          <h2 className="font-display text-3xl font-semibold md:text-4xl">
            {t('valuesTitle')}
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ Icon, title, body }) => (
              <div
                key={title}
                className="rounded-xl border border-border bg-surface p-5 card-shadow"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-clay/10 text-clay">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="mt-4 font-display text-lg font-semibold">{title}</div>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/70">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="mx-auto max-w-[1440px] px-4 py-14 md:px-8 md:py-20">
        <div className="rounded-2xl border border-border bg-ink px-6 py-12 text-bone md:px-12">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-semibold md:text-4xl">
                {t('contactTitle')}
              </h2>
              <p className="mt-3 text-bone/75">{t('contactBody')}</p>
              <ul className="mt-5 space-y-2 text-sm text-bone/85">
                <li className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-ochre" /> +237 6 90 00 00 00
                </li>
                <li className="flex items-center gap-2.5">
                  <MessageCircle className="h-4 w-4 text-ochre" /> WhatsApp +237 6 90 00 00 00
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-ochre" /> hello@afrima.cm
                </li>
              </ul>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Button asChild variant="primary" size="lg">
                <Link href="/categories">{tn('shopAll')}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-bone/30 bg-transparent text-bone hover:bg-bone hover:text-ink"
              >
                <Link href="/deals">{tn('deals')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
