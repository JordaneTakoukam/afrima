import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 1 EUR ≈ 655.957 FCFA — fixed XAF/EUR peg
const EUR_TO_FCFA = 655.957;

export function eurToFcfa(eur: number): number {
  return Math.round((eur * EUR_TO_FCFA) / 50) * 50; // round to nearest 50 FCFA
}

export function formatPrice(amountEur: number, locale: 'en' | 'fr' = 'en') {
  const fcfa = eurToFcfa(amountEur);
  const formatter = new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
    maximumFractionDigits: 0,
  });
  return `${formatter.format(fcfa)} FCFA`;
}

export function pickLocale<T>(
  value: { en: T; fr: T },
  locale: 'en' | 'fr',
): T {
  return value[locale] ?? value.en;
}

export function discountPercent(price: number, original?: number): number | null {
  if (!original || original <= price) return null;
  return Math.round(((original - price) / original) * 100);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
