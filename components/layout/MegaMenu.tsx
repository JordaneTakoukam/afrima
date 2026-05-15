'use client';

import { useTranslations, useLocale } from 'next-intl';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { categories } from '@/data/categories';
import { CategoryIcon } from '@/components/shared/CategoryIcon';
import { pickLocale } from '@/lib/utils';
import type { Locale } from '@/lib/types';

export function MegaMenu() {
  const t = useTranslations('Nav');
  const locale = useLocale() as Locale;
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 160);
  };
  useEffect(() => () => cancelClose(), []);

  const linkClass =
    'rounded-lg px-3 py-2 text-sm font-medium text-ink/75 transition-colors hover:bg-bone-deep hover:text-ink';

  return (
    <div className="flex items-center gap-1">
      <div
        className="relative"
        onMouseEnter={() => {
          cancelClose();
          setOpen(true);
        }}
        onMouseLeave={scheduleClose}
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className={`inline-flex items-center gap-1 ${linkClass} ${open ? 'bg-bone-deep text-ink' : ''}`}
        >
          {t('categories')}
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </button>

        {open ? (
          <div className="absolute left-0 top-full pt-2">
            <div className="w-[620px] rounded-xl border border-border bg-surface p-3 card-shadow">
              <div className="grid grid-cols-2 gap-1">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/categories/${c.slug}`}
                    onClick={() => setOpen(false)}
                    className="group flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-bone-deep"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-clay/10 text-clay transition-colors group-hover:bg-clay group-hover:text-bone">
                      <CategoryIcon name={c.icon} size={20} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-ink">
                        {pickLocale(c.name, locale)}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {pickLocale(c.tagline, locale)}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
              <Link
                href="/categories"
                onClick={() => setOpen(false)}
                className="mt-1 flex items-center justify-center gap-1.5 rounded-lg bg-ink px-3 py-2.5 font-mono text-[11px] uppercase tracking-wide text-bone hover:bg-ink-soft"
              >
                {t('viewAll')}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ) : null}
      </div>

      <Link href="/deals" className={linkClass}>
        {t('deals')}
      </Link>
      <Link href="/about" className={linkClass}>
        {t('about')}
      </Link>
    </div>
  );
}
