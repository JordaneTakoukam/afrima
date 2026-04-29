import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { stories } from '@/data/stories';
import { pickLocale } from '@/lib/utils';
import type { Locale } from '@/lib/types';

export function CulturalStories() {
  const t = useTranslations('Stories');
  const locale = useLocale() as Locale;

  const items = stories.slice(0, 3);

  return (
    <section className="mx-auto max-w-[1440px] px-4 py-20 md:px-8">
      <SectionHeading
        kicker="Long reads"
        title={t('title')}
        subtitle={t('subtitle')}
        cta={
          <Link href="/culture" className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-ink/70 hover:text-clay">
            All stories <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        }
      />

      <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
        {items.map((s) => (
          <Link
            key={s.slug}
            href={`/culture/${s.slug}`}
            className="group flex flex-col gap-4"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-bone-deep">
              <Image
                src={s.cover}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-clay">
              {pickLocale(s.category, locale)}
            </div>
            <h3 className="font-display text-2xl leading-tight text-ink group-hover:text-clay md:text-3xl">
              {pickLocale(s.title, locale)}
            </h3>
            <p className="text-sm text-ink/70 line-clamp-3">{pickLocale(s.excerpt, locale)}</p>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink">
              {t('readStory')} <ArrowRight className="h-3.5 w-3.5" />
              <span className="ml-2 text-ink/40" data-num>
                {t('readTime', { minutes: s.readTime })}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
