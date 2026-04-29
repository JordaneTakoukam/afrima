import type { Metadata } from 'next';
import { Fraunces, DM_Sans, JetBrains_Mono } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Toaster } from 'sonner';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import { TopPromoBar } from '@/components/layout/TopPromoBar';
import { Footer } from '@/components/layout/Footer';
import { BottomNavMobile } from '@/components/layout/BottomNavMobile';
import { CartProvider } from '@/lib/cart-context';
import { WishlistProvider } from '@/lib/wishlist-context';
import '../globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz', 'SOFT'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: {
    default: 'AFRIMA — Authentic Africa, delivered.',
    template: '%s · AFRIMA',
  },
  description:
    'The Pan-African marketplace of authentic culture. 22 countries, 250+ artisans, direct prices.',
  metadataBase: new URL('https://afrima.demo'),
  openGraph: {
    siteName: 'AFRIMA',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${fraunces.variable} ${dmSans.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-screen bg-bone text-ink antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <CartProvider>
            <WishlistProvider>
              <TopPromoBar />
              <Header />
              <main id="main" className="min-h-[60vh]">
                {children}
              </main>
              <Footer />
              <BottomNavMobile />
              <Toaster theme="light" position="bottom-center" richColors closeButton />
            </WishlistProvider>
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
