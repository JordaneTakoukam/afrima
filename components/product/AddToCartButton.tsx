'use client';

import { ShoppingBag, Check } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Button, type ButtonProps } from '@/components/ui/Button';
import { useCart } from '@/lib/cart-context';
import { pickLocale } from '@/lib/utils';
import type { Locale, Product } from '@/lib/types';

export function AddToCartButton({
  product,
  locale,
  size = 'md',
  variant = 'primary',
  fullWidth,
  iconOnly,
  qty = 1,
  label,
}: {
  product: Product;
  locale: Locale;
  size?: ButtonProps['size'];
  variant?: ButtonProps['variant'];
  fullWidth?: boolean;
  iconOnly?: boolean;
  qty?: number;
  label?: string;
}) {
  const t = useTranslations('Product');
  const { add } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const disabled = !product.inStock;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    add(product.slug, qty);
    toast.success(`${t('addedToast')} — ${pickLocale(product.name, locale)}`);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <Button
      onClick={handleClick}
      size={size}
      variant={variant}
      disabled={disabled}
      className={fullWidth ? 'w-full' : ''}
      type="button"
    >
      {justAdded ? <Check /> : <ShoppingBag />}
      {!iconOnly &&
        (disabled
          ? t('outOfStock')
          : justAdded
            ? t('added')
            : (label ?? t('addToCart')))}
    </Button>
  );
}
