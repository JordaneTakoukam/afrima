import { setRequestLocale } from 'next-intl/server';
import { CartView } from '@/components/cart/CartView';
import type { Locale } from '@/lib/types';

export default async function CartPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CartView locale={locale as Locale} />;
}
