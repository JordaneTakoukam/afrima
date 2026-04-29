import { SafeImage as Image } from '@/components/shared/SafeImage';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { stories, storiesBySlug } from '@/data/stories';
import { pickLocale } from '@/lib/utils';
import type { Locale } from '@/lib/types';

export function generateStaticParams() {
  return stories.flatMap((s) => ['en', 'fr'].map((locale) => ({ locale, slug: s.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const s = storiesBySlug[slug];
  if (!s) return {};
  return {
    title: pickLocale(s.title, locale as Locale),
    description: pickLocale(s.excerpt, locale as Locale),
  };
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Culture');
  const story = storiesBySlug[slug];
  if (!story) notFound();

  const others = stories.filter((s) => s.slug !== story.slug).slice(0, 2);
  const content = pickLocale(story.content, locale as Locale);

  return (
    <article className="mx-auto max-w-[1440px] px-4 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-clay">
          {pickLocale(story.category, locale as Locale)}
        </div>
        <h1 className="mt-3 font-display text-4xl leading-tight md:text-7xl">
          {pickLocale(story.title, locale as Locale)}
        </h1>
        <div className="mt-3 font-mono text-xs uppercase tracking-wider text-ink/50" data-num>
          {story.readTime} min · {story.publishedAt}
        </div>
      </div>

      <div className="relative mx-auto mt-10 aspect-[16/9] max-w-5xl overflow-hidden bg-bone-deep">
        <Image src={story.cover} alt="" fill sizes="100vw" className="object-cover" priority />
      </div>

      <div className="mx-auto mt-12 max-w-3xl prose-style">
        {content.split('\n\n').map((para, i) => {
          if (para.startsWith('## ')) {
            return (
              <h2 key={i} className="mt-12 font-display text-2xl md:text-4xl">{para.replace('## ', '')}</h2>
            );
          }
          return (
            <p key={i} className="mt-6 text-ink/85 leading-relaxed md:text-lg first:mt-0 first-of-type:first-letter:text-7xl first-of-type:first-letter:font-display first-of-type:first-letter:font-bold first-of-type:first-letter:text-clay first-of-type:first-letter:mr-2 first-of-type:first-letter:float-left first-of-type:first-letter:leading-[0.85]">{para}</p>
          );
        })}
      </div>

      <div className="mx-auto mt-20 max-w-5xl border-t border-ink/10 pt-10">
        <h2 className="font-display text-2xl md:text-3xl">{t('relatedStories')}</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {others.map((s) => (
            <Link key={s.slug} href={`/culture/${s.slug}`} className="group block">
              <div className="relative aspect-[16/9] overflow-hidden bg-bone-deep">
                <Image src={s.cover} alt="" fill sizes="50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="mt-3 font-display text-xl leading-tight group-hover:text-clay">
                {pickLocale(s.title, locale as Locale)}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
