import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Locale } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format an FCFA (XAF) amount with locale-aware thousands separators. */
export function formatPrice(amount: number, locale: Locale = 'fr') {
  const formatter = new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
    maximumFractionDigits: 0,
  });
  return `${formatter.format(Math.round(amount))} FCFA`;
}

/** Compact number formatting (e.g. sold counts). */
export function formatCount(value: number, locale: Locale = 'fr') {
  return new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-US').format(value);
}

export function pickLocale<T>(value: { en: T; fr: T }, locale: Locale): T {
  return value[locale] ?? value.en;
}

export function discountPercent(price: number, original?: number): number | null {
  if (!original || original <= price) return null;
  return Math.round(((original - price) / original) * 100);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
