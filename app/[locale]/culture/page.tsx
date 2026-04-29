import { SafeImage as Image } from '@/components/shared/SafeImage';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { stories } from '@/data/stories';
import { pickLocale } from '@/lib/utils';
import type { Locale } from '@/lib/types';

export default async function CulturePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Culture');

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-16 md:px-8 md:py-20">
      <div className="font-mono text-xs uppercase tracking-[0.3em] text-clay">Long reads</div>
      <h1 className="mt-3 font-display text-5xl leading-tight md:text-7xl">{t('title')}</h1>
      <p className="mt-3 max-w-2xl text-ink/70 md:text-lg">{t('subtitle')}</p>

      <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-2">
        {stories.map((s, i) => (
          <Link key={s.slug} href={`/culture/${s.slug}`} className="group flex flex-col gap-4">
            <div className={`relative aspect-[5/4] overflow-hidden bg-bone-deep ${i === 0 ? 'md:col-span-2 md:aspect-[16/8]' : ''}`}>
              <Image
                src={s.cover}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-clay">{pickLocale(s.category, locale as Locale)}</div>
            <h2 className="font-display text-2xl leading-tight md:text-4xl">{pickLocale(s.title, locale as Locale)}</h2>
            <p className="text-ink/70 line-clamp-3">{pickLocale(s.excerpt, locale as Locale)}</p>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider">
              {t('readArticle')} <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
