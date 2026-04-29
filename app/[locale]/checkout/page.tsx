import { setRequestLocale } from 'next-intl/server';
import { CheckoutView } from '@/components/cart/CheckoutView';
import type { Locale } from '@/lib/types';

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CheckoutView locale={locale as Locale} />;
}
