import { Badge } from '@/components/ui/Badge';
import { countriesBySlug } from '@/data/countries';
import { pickLocale } from '@/lib/utils';
import type { Locale } from '@/lib/types';

export function CountryBadge({ slug, locale }: { slug: string; locale: Locale }) {
  const country = countriesBySlug[slug];
  if (!country) return null;
  return (
    <Badge variant="bone">
      <span aria-hidden>{country.flag}</span>
      {pickLocale(country.name, locale)}
    </Badge>
  );
}
