'use client';

import { useTranslations, useLocale } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { Link } from '@/i18n/navigation';
import { categories } from '@/data/categories';
import { countries } from '@/data/countries';
import { stories } from '@/data/stories';
import { pickLocale } from '@/lib/utils';
import type { Locale } from '@/lib/types';

type Trigger = 'categories' | 'countries' | 'stories' | null;
type Item = { label: string; trigger: Trigger; href?: string };

export function MegaMenu() {
  const t = useTranslations('Nav');
  const locale = useLocale() as Locale;
  const [open, setOpen] = useState<Trigger>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(null), 200);
  };

  useEffect(() => () => cancelClose(), []);

  const items: Item[] = [
    { label: t('categories'), trigger: 'categories' },
    { label: t('countries'), trigger: 'countries' },
    { label: t('artisans'), trigger: null, href: '/artisans' },
    { label: t('stories'), trigger: 'stories' },
    { label: t('deals'), trigger: null, href: '/deals' },
  ];

  return (
    <div
      className="relative flex items-center gap-1"
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
    >
      {items.map((it) =>
        it.href ? (
          <Link
            key={it.label}
            href={it.href}
            className="rounded px-3 py-2 text-sm font-medium text-ink/80 hover:text-ink hover:bg-ink/5"
            onMouseEnter={() => {
              cancelClose();
              setOpen(null);
            }}
          >
            {it.label}
          </Link>
        ) : (
          <button
            key={it.label}
            type="button"
            onMouseEnter={() => {
              cancelClose();
              setOpen(it.trigger);
            }}
            onFocus={() => {
              cancelClose();
              setOpen(it.trigger);
            }}
            onClick={() => setOpen((prev) => (prev === it.trigger ? null : it.trigger))}
            aria-expanded={open === it.trigger}
            className={`inline-flex items-center gap-1 rounded px-3 py-2 text-sm font-medium transition-colors ${
              open === it.trigger ? 'text-ink bg-ink/5' : 'text-ink/80 hover:text-ink hover:bg-ink/5'
            }`}
          >
            {it.label}
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform ${
                open === it.trigger ? 'rotate-180' : ''
              }`}
            />
          </button>
        ),
      )}

      {open ? (
        <div
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          className="fixed left-0 right-0 top-16 md:top-20 z-30 bg-bone border-y border-ink/10 shadow-2xl animate-in fade-in slide-in-from-top-1 duration-200"
        >
          <div className="mx-auto max-w-[1440px] px-4 py-8 md:px-8">
            {open === 'categories' ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-2">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/categories/${c.slug}`}
                    onClick={() => setOpen(null)}
                    className="group flex items-baseline gap-3 py-2 hover:text-clay"
                  >
                    <span className="font-mono text-[10px] text-ink/40">{c.numberLabel}</span>
                    <div>
                      <div className="font-display text-lg">{pickLocale(c.name, locale)}</div>
                      <div className="text-xs text-ink/60 line-clamp-1">
                        {pickLocale(c.description, locale)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : null}

            {open === 'countries' ? (
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {countries.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/countries/${c.slug}`}
                    onClick={() => setOpen(null)}
                    className="flex items-center gap-2 rounded p-2 text-sm hover:bg-ink/5"
                  >
                    <span aria-hidden className="text-xl">{c.flag}</span>
                    <span>{pickLocale(c.name, locale)}</span>
                  </Link>
                ))}
              </div>
            ) : null}

            {open === 'stories' ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stories.slice(0, 3).map((s) => (
                  <Link
                    key={s.slug}
                    href={`/culture/${s.slug}`}
                    onClick={() => setOpen(null)}
                    className="group flex flex-col gap-2"
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-bone-deep">
                      <img
                        src={s.cover}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-clay">
                      {pickLocale(s.category, locale)}
                    </div>
                    <div className="font-display text-lg leading-tight">
                      {pickLocale(s.title, locale)}
                    </div>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
