'use client';

import { Heart, ShoppingBag } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';
import { CartSheet } from '@/components/cart/CartSheet';

export function HeaderCounts() {
  const t = useTranslations('Nav');
  const { count: cartCount, ready: cartReady } = useCart();
  const { items: wishlistItems, ready: wishReady } = useWishlist();
  const wishCount = wishlistItems.length;

  return (
    <>
      <Link
        href="/wishlist"
        className="relative inline-flex h-10 w-10 items-center justify-center rounded hover:bg-ink/5"
        aria-label={t('wishlist')}
      >
        <Heart className="h-5 w-5" />
        {wishReady && wishCount > 0 ? (
          <span className="absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-berry px-1 font-mono text-[10px] font-bold text-bone tabular-nums">
            {wishCount}
          </span>
        ) : null}
      </Link>
      <CartSheet>
        <button
          type="button"
          aria-label={t('cart')}
          className="relative inline-flex h-10 w-10 items-center justify-center rounded hover:bg-ink/5"
        >
          <ShoppingBag className="h-5 w-5" />
          {cartReady && cartCount > 0 ? (
            <span className="absolute -right-0.5 -top-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-clay px-1 font-mono text-[10px] font-bold text-bone tabular-nums">
              {cartCount}
            </span>
          ) : null}
        </button>
      </CartSheet>
    </>
  );
}
