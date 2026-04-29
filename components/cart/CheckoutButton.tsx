'use client';

import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';

export function CheckoutButton() {
  const t = useTranslations('Cart');
  return (
    <Button
      variant="ink"
      size="lg"
      className="mt-5 w-full"
      onClick={() => toast.info(t('checkoutDemo'))}
    >
      {t('checkout')}
    </Button>
  );
}
