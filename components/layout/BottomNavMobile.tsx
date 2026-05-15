'use client';

import { Home, Search, Heart, ShoppingBag, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';
import { cn } from '@/lib/utils';

export function BottomNavMobile() {
  const t = useTranslations('Nav');
  const pathname = usePathname();
  const { count: cartCount, ready: cartReady } = useCart();
  const { items: wishItems, ready: wishReady } = useWishlist();

  const items = [
    { href: '/', Icon: Home, label: t('home'), badge: 0 },
    { href: '/search', Icon: Search, label: t('search'), badge: 0 },
    { href: '/wishlist', Icon: Heart, label: t('wishlist'), badge: wishReady ? wishItems.length : 0 },
    { href: '/cart', Icon: ShoppingBag, label: t('cart'), badge: cartReady ? cartCount : 0 },
    { href: '/about', Icon: User, label: t('account'), badge: 0 },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 border-t border-border bg-bone/95 backdrop-blur supports-[backdrop-filter]:bg-bone/85">
      <ul className="flex items-stretch">
        {items.map(({ href, Icon, label, badge }) => {
          const active = pathname === href;
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={cn(
                  'flex h-14 flex-col items-center justify-center gap-0.5 font-mono text-[10px] uppercase tracking-wide',
                  active ? 'text-clay' : 'text-muted-foreground',
                )}
              >
                <span className="relative">
                  <Icon className={cn('h-5 w-5 transition-transform', active && 'scale-110')} />
                  {badge > 0 ? (
                    <span className="absolute -right-2 -top-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-clay px-1 font-mono text-[9px] font-bold text-bone tabular-nums">
                      {badge}
                    </span>
                  ) : null}
                </span>
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
