'use client';

import { Menu } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
  VisuallyHidden,
} from '@/components/ui/Sheet';
import { Logo } from '@/components/shared/Logo';
import { categories } from '@/data/categories';
import { countries } from '@/data/countries';
import { pickLocale } from '@/lib/utils';
import { LocaleSwitcher } from './LocaleSwitcher';
import type { Locale } from '@/lib/types';

export function MobileMenu() {
  const t = useTranslations('Nav');
  const locale = useLocale() as Locale;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label={t('menu')}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded hover:bg-ink/5"
        >
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="overflow-y-auto p-6">
        <VisuallyHidden>
          <SheetTitle>{t('menu')}</SheetTitle>
        </VisuallyHidden>
        <div className="flex items-center gap-2">
          <Logo size={26} />
          <span className="font-display text-2xl italic">AFRIMA</span>
        </div>

        <div className="mt-6 space-y-6">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-clay">
              {t('categories')}
            </div>
            <ul className="mt-2 space-y-1">
              {categories.map((c) => (
                <li key={c.slug}>
                  <SheetClose asChild>
                    <Link
                      href={`/categories/${c.slug}`}
                      className="block py-1.5 text-sm hover:text-clay"
                    >
                      {pickLocale(c.name, locale)}
                    </Link>
                  </SheetClose>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-clay">
              {t('countries')}
            </div>
            <ul className="mt-2 grid grid-cols-2 gap-1">
              {countries.map((c) => (
                <li key={c.slug}>
                  <SheetClose asChild>
                    <Link
                      href={`/countries/${c.slug}`}
                      className="flex items-center gap-2 py-1 text-sm hover:text-clay"
                    >
                      <span aria-hidden>{c.flag}</span>
                      <span>{pickLocale(c.name, locale)}</span>
                    </Link>
                  </SheetClose>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-1">
            <SheetClose asChild>
              <Link href="/artisans" className="block py-2 text-sm font-medium hover:text-clay">
                {t('artisans')}
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/culture" className="block py-2 text-sm font-medium hover:text-clay">
                {t('stories')}
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/deals" className="block py-2 text-sm font-medium hover:text-clay">
                {t('deals')}
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/about" className="block py-2 text-sm font-medium hover:text-clay">
                {t('about')}
              </Link>
            </SheetClose>
          </div>

          <div className="pt-4 border-t border-ink/10">
            <LocaleSwitcher />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
