'use client';

import { Home, Search, Heart, ShoppingBag, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

export function BottomNavMobile() {
  const t = useTranslations('Nav');
  const pathname = usePathname();

  const items = [
    { href: '/', Icon: Home, label: t('home') },
    { href: '/search', Icon: Search, label: t('search') },
    { href: '/wishlist', Icon: Heart, label: t('wishlist') },
    { href: '/cart', Icon: ShoppingBag, label: t('cart') },
    { href: '/about', Icon: User, label: t('profile') },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 border-t border-ink/10 bg-bone/95 backdrop-blur supports-[backdrop-filter]:bg-bone/85">
      <ul className="flex items-stretch">
        {items.map(({ href, Icon, label }) => {
          const active = pathname === href;
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={cn(
                  'flex h-14 flex-col items-center justify-center gap-0.5 text-[10px] font-mono uppercase tracking-wider',
                  active ? 'text-clay' : 'text-ink/60',
                )}
              >
                <Icon className={cn('h-5 w-5 transition-transform', active && 'scale-110')} />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
