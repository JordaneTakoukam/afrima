import { setRequestLocale } from 'next-intl/server';
import { WishlistView } from '@/components/wishlist/WishlistView';
import type { Locale } from '@/lib/types';

export default async function WishlistPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <WishlistView locale={locale as Locale} />;
}
