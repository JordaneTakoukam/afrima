import Image from 'next/image';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { ProductCard } from '@/components/product/ProductCard';
import { countries, countriesBySlug } from '@/data/countries';
import { getProductsByCountry } from '@/data/products';
import { artisans } from '@/data/artisans';
import { pickLocale } from '@/lib/utils';
import type { Locale } from '@/lib/types';

export function generateStaticParams() {
  return countries.flatMap((c) =>
    ['en', 'fr'].map((locale) => ({ locale, slug: c.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const c = countriesBySlug[slug];
  if (!c) return {};
  return {
    title: pickLocale(c.name, locale as Locale),
    description: pickLocale(c.description, locale as Locale),
  };
}

export default async function CountryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Country');
  const country = countriesBySlug[slug];
  if (!country) notFound();

  const products = getProductsByCountry(country.slug);
  const countryArtisans = artisans.filter((a) => a.country === country.slug);

  return (
    <>
      <section className="relative overflow-hidden border-b border-ink/10 bg-bone-deep">
        <div className="absolute inset-0">
          <Image
            src={country.heroImage}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="relative mx-auto max-w-[1440px] px-4 py-16 md:px-8 md:py-24">
          <div className="text-7xl md:text-9xl" aria-hidden>{country.flag}</div>
          <h1 className="mt-2 font-display text-6xl leading-[0.95] md:text-[12rem]">
            {pickLocale(country.name, locale as Locale)}
          </h1>
          {country.nameLocal ? (
            <div className="mt-2 font-display italic text-2xl text-ink/70">{country.nameLocal}</div>
          ) : null}
          <p className="mt-6 max-w-2xl text-ink/80 md:text-lg">
            {pickLocale(country.description, locale as Locale)}
          </p>
          <div className="mt-8 grid grid-cols-3 gap-6 max-w-md">
            <Stat n={String(country.regions.length)} label={t('regions', { count: country.regions.length })} />
            <Stat n={String(country.productCount)} label={t('products', { count: country.productCount })} />
            <Stat n={String(country.ethnicGroups.length)} label={t('ethnicGroups')} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-16 md:px-8">
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {country.regions.map((r) => (
            <span key={r} className="rounded-full border border-ink/20 px-3 py-1 text-xs font-mono uppercase tracking-wider text-ink/70">{r}</span>
          ))}
        </div>

        <h2 className="font-display text-3xl md:text-5xl">{t('explore', { name: pickLocale(country.name, locale as Locale) })}</h2>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} locale={locale as Locale} />
          ))}
        </div>
      </section>

      {countryArtisans.length ? (
        <section className="mx-auto max-w-[1440px] px-4 py-16 md:px-8">
          <h2 className="font-display text-3xl md:text-5xl">{t('featuredArtisans')}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {countryArtisans.slice(0, 3).map((a) => (
              <a key={a.slug} href={`/${locale === 'en' ? '' : 'fr/'}artisans/${a.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-bone-deep">
                  <Image src={a.photo} alt={a.name} fill sizes="33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="mt-3 font-display text-xl">{a.name}</div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-ink/60">{pickLocale(a.craft, locale as Locale)}</div>
              </a>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl text-ink md:text-4xl" data-num>{n}</div>
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50">{label}</div>
    </div>
  );
}
