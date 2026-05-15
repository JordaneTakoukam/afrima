'use client';

import { Menu, ChevronRight, Tag, Info, LayoutGrid } from 'lucide-react';
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
import { CategoryIcon } from '@/components/shared/CategoryIcon';
import { categories } from '@/data/categories';
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
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-bone-deep"
        >
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-xs overflow-y-auto p-0">
        <VisuallyHidden>
          <SheetTitle>{t('menu')}</SheetTitle>
        </VisuallyHidden>

        <div className="border-b border-border px-5 py-5">
          <Logo size={32} showText />
        </div>

        <div className="px-3 py-4">
          <div className="px-2 font-mono text-[10px] uppercase tracking-[0.18em] text-clay">
            {t('categories')}
          </div>
          <ul className="mt-2 space-y-0.5">
            {categories.map((c) => (
              <li key={c.slug}>
                <SheetClose asChild>
                  <Link
                    href={`/categories/${c.slug}`}
                    className="flex items-center gap-3 rounded-lg px-2 py-2.5 hover:bg-bone-deep"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-clay/10 text-clay">
                      <CategoryIcon name={c.icon} size={18} />
                    </span>
                    <span className="flex-1 text-sm font-medium">
                      {pickLocale(c.name, locale)}
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>

          <div className="my-3 h-px bg-border" />

          <ul className="space-y-0.5">
            {[
              { href: '/categories', label: t('allProducts'), Icon: LayoutGrid },
              { href: '/deals', label: t('deals'), Icon: Tag },
              { href: '/about', label: t('about'), Icon: Info },
            ].map(({ href, label, Icon }) => (
              <li key={href}>
                <SheetClose asChild>
                  <Link
                    href={href}
                    className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm font-medium hover:bg-bone-deep"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-bone-deep text-ink">
                      <Icon className="h-4 w-4" />
                    </span>
                    {label}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>

          <div className="mt-4 border-t border-border px-2 pt-4">
            <LocaleSwitcher />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
