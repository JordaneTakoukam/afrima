# 🌍 AFRIMA

> **The Pan-African Marketplace of Authentic Culture.**
> *Authentic Africa. Unbeatable prices. Direct from artisans.*

A static, portfolio-grade demo of a premium pan-African marketplace celebrating identity, culture and authenticity across **22 African countries**. Combining editorial storytelling with modern e-commerce patterns.

![hero](https://images.unsplash.com/photo-1551830820-330a71b99659?w=1200&q=80)

## ✨ What's inside

- 🌍 **22 African countries** (Cameroon, Nigeria, Senegal, Morocco, Ghana, Mali, Kenya, Ethiopia, South Africa…)
- 🛍️ **7 categories** + **48+ curated products** with full cultural context
- 👐 **10 artisan portraits** with bios, signature crafts, quotes
- 📰 **5 long-form cultural stories** (Bogolan, Kente, Dogon masks, Shea butter, Berber rugs)
- ⚡ **Flash deals** with live countdown timers
- 🌐 **Bilingual EN / FR** via [next-intl](https://next-intl.dev) (default `en`, `/fr` for French)
- 🛒 Cart, wishlist, search, product detail pages — all functional in mock mode
- 📱 Fully responsive with mobile bottom nav, sticky CTAs
- 🎨 Editorial design system — Fraunces × DM Sans × JetBrains Mono, terre palette, Adinkra patterns
- 🚀 100% static — all pages prerendered as static HTML

**~200 routes generated at build time.** Zero backend, zero database, zero API.

## 🛠️ Stack

- **Next.js 16** · App Router · Turbopack · React 19.2
- **TypeScript** strict
- **TailwindCSS v4** (CSS-first config)
- **next-intl 4** for internationalization
- **framer-motion** for stagger / scroll animations
- **lucide-react** for iconography
- **@radix-ui** primitives (Dialog, Tabs, Sheet, Slot, Scroll-area)
- **sonner** for toast notifications
- **next/image** + Unsplash CDN

## 🚀 Quick start

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) → English (default), or [http://localhost:3000/fr](http://localhost:3000/fr) for French.

## 🏗️ Build

```bash
pnpm build
pnpm start
```

## 📂 Project structure

```
app/
└── [locale]/                # Locale segment (en | fr)
    ├── layout.tsx           # Root layout, fonts, providers, header/footer
    ├── page.tsx             # Homepage (Hero → FlashDeals → CountryGrid → …)
    ├── products/[slug]
    ├── countries/[slug]
    ├── categories/[slug]
    ├── artisans/[slug]
    ├── culture/[slug]
    ├── deals · cart · wishlist · search · about
    └── not-found.tsx
components/
├── home/                    # All homepage sections
├── product/                 # ProductCard, ProductCardEditorial, ProductDetail, etc.
├── layout/                  # Header, Footer, MegaMenu, MobileMenu, BottomNavMobile, LocaleSwitcher
├── shared/                  # AdinkraPattern, CountdownTimer, RatingStars, PriceTag, …
├── cart/ · search/          # Page-specific clients
└── ui/                      # Button, Badge, Input, Sheet, Dialog, Tabs primitives
data/                        # All static content (countries, products, artisans, stories, deals, reviews)
i18n/                        # routing, request, navigation
messages/                    # en.json, fr.json — every UI string
lib/                         # types, utils (cn, formatPrice, pickLocale)
proxy.ts                     # next-intl middleware (Next.js 16 renamed `middleware` → `proxy`)
```

## 🎨 Design system

- **Palette** — `bone` / `ink` / `earth` for editorial sections + `clay` / `ochre` / `gold` / `leaf` / `berry` for commercial accents.
- **Typography** — **Fraunces** (display, italic), **DM Sans** (body), **JetBrains Mono** (prices, timers, badges).
- **Patterns** — inline SVG Adinkra symbols at low opacity, paper-grain noise overlay.
- **Editorial moves** — asymmetric hero, rotated cards, ink borders, tabular numerals on every price/timer.
- **Temu energy** — flash-deal countdowns, "only X left" pills, sold counts, social-proof badges, stacked product badges — *but kept tasteful*.

## 🌍 Internationalization

- Default locale `en` has no URL prefix (`/products/royal-toghu-dress`).
- French uses `/fr/products/royal-toghu-dress`.
- LocaleSwitcher in header swaps between the two while preserving the current path.
- All product / artisan / story copy is authored in both languages directly in `data/*.ts`.

## 🖼️ Image credits

All images are sourced from [Unsplash](https://unsplash.com) under the [Unsplash License](https://unsplash.com/license). Photos are used for demonstration only.

## ⚠️ Disclaimer

This is a **static portfolio demo**. No real transactions, no real artisans were contacted, no backend exists. Every product, artisan and review is fictional but inspired by real African crafts and traditions.

## 📄 License

MIT — Demo project.

## 👤 Author

**Idriss Jordane** · idrissjordane.dev

---

## 🇫🇷 À propos

AFRIMA est une démo de portfolio — un marché pan-africain premium célébrant l'identité, la culture et l'authenticité de 22 pays. Tout est statique, multilingue (EN par défaut, FR via `/fr`), et construit avec Next.js 16, Tailwind v4, framer-motion et next-intl.

Chaque produit, artisan et histoire raconte une vraie tradition (Toghu Bamileke, Kente Ashanti, masques Dogon, karité, tapis berbères…) tout en gardant une grammaire e-commerce moderne — flash deals, badges de stock, étoiles, comptes vendus, panier — sans tomber dans le côté agressif.

**Aucun backend, aucune transaction réelle.**
