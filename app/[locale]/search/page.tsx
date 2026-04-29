import { setRequestLocale } from 'next-intl/server';
import { SearchClient } from '@/components/search/SearchClient';
import type { Locale } from '@/lib/types';

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { locale } = await params;
  const { q } = await searchParams;
  setRequestLocale(locale);
  return <SearchClient initialQuery={q ?? ''} locale={locale as Locale} />;
}
