'use client';

import { Heart } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { useWishlist } from '@/lib/wishlist-context';

export function WishlistButton({
  slug,
  className,
  size = 18,
  variant = 'circle',
}: {
  slug: string;
  className?: string;
  size?: number;
  variant?: 'circle' | 'plain';
}) {
  const t = useTranslations('Product');
  const { has, toggle } = useWishlist();
  const active = has(slug);

  const handle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggle(slug);
    if (added) toast.success(t('wishlistAdded'));
  };

  if (variant === 'plain') {
    return (
      <button
        onClick={handle}
        type="button"
        aria-pressed={active}
        aria-label={t('wishlist')}
        className={cn('text-ink/60 hover:text-berry transition-colors', className)}
      >
        <Heart size={size} className={active ? 'fill-berry text-berry' : ''} />
      </button>
    );
  }

  return (
    <button
      onClick={handle}
      type="button"
      aria-pressed={active}
      aria-label={t('wishlist')}
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center rounded-full bg-bone/95 text-ink shadow-sm backdrop-blur transition-all hover:scale-110 hover:bg-bone',
        active && 'text-berry',
        className,
      )}
    >
      <Heart size={size} className={active ? 'fill-berry text-berry' : ''} />
    </button>
  );
}
