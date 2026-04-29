import type { Metadata, Viewport } from 'next';
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

const SITE_URL = 'https://afrima-app.vercel.app';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAF7F2' },
    { media: '(prefers-color-scheme: dark)', color: '#1C1917' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === 'fr';

  const title = isFr
    ? 'AFRIMA — L’Afrique authentique, livrée'
    : 'AFRIMA — Authentic Africa, delivered';
  const description = isFr
    ? 'Le marché pan-africain de la culture authentique. 22 pays, 250+ artisans, prix direct.'
    : 'The Pan-African marketplace of authentic culture. 22 countries, 250+ artisans, direct prices.';

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: '%s · AFRIMA',
    },
    description,
    applicationName: 'AFRIMA',
    keywords: [
      'African marketplace',
      'African crafts',
      'Toghu',
      'Kente',
      'Bogolan',
      'shea butter',
      'Berber rug',
      'African artisans',
      'pan-African',
      'fair trade',
      'marché africain',
      'artisanat africain',
    ],
    authors: [{ name: 'Idriss Jordane', url: 'https://idrissjordane.dev' }],
    creator: 'Idriss Jordane',
    publisher: 'AFRIMA',
    alternates: {
      canonical: '/',
      languages: {
        en: '/',
        fr: '/fr',
      },
    },
    openGraph: {
      type: 'website',
      siteName: 'AFRIMA',
      title,
      description,
      url: SITE_URL,
      locale: isFr ? 'fr_FR' : 'en_US',
      images: [
        {
          url: '/opengraph-image.png',
          width: 1200,
          height: 630,
          alt: 'AFRIMA — ' + title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@idrissjordane',
    },
    robots: {
      index: true,
      follow: true,
    },
    category: 'shopping',
  };
}

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
              <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-bone"
              >
                Skip to content
              </a>
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
