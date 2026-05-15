# 🛍️ AFRIMA

> **Electronics & home goods at wholesale prices.**
> *Ordered online, delivered across Cameroon and Africa.*

A portfolio-grade demo of a modern online store for **electronics and home goods** — phones, laptops, TVs, appliances, kitchenware and furniture — built for the Cameroonian and African market. Full shopping flow: browse → cart → quantity → checkout → order confirmation.

## ✨ What's inside

- 🛒 **6 departments**, **42 products** — phones, computers, TV & audio, appliances, kitchen, furniture
- 💳 **Functional checkout** — cart with quantities, delivery details, payment method selection, order confirmation
- 📱 **Payments** — MTN MoMo, Orange Money, Visa / Mastercard, PayPal, bank transfer
- 🚚 **Delivery** — Cameroon in 1–4 days, the rest of Africa within 3 weeks
- ⚡ **Flash deals** with live countdown timers
- 🔎 Search, category filters & sorting, wishlist
- 🌐 **Bilingual FR / EN** via [next-intl](https://next-intl.dev) (default `fr`, `/en` for English)
- 💰 Prices in **FCFA (XAF)**
- 📱 Fully responsive with a mobile bottom nav and sticky add-to-cart
- 🚀 Static-first — product and category pages prerendered at build time

**No backend, no database, no real transactions** — checkout ends on a demo "order confirmed" screen.

## 🛠️ Stack

- **Next.js 16** · App Router · React 19.2
- **TypeScript** strict
- **TailwindCSS v4** (CSS-first config)
- **next-intl 4** for internationalization
- **framer-motion** for scroll / stagger animations
- **lucide-react** for iconography
- **@radix-ui** primitives (Dialog, Tabs, Sheet, Slot)
- **sonner** for toast notifications
- **next/image** + Unsplash CDN

## 🚀 Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) → French (default), or [http://localhost:3000/en](http://localhost:3000/en) for English.

## 🏗️ Build

```bash
npm run build
npm run start
```

## 📂 Project structure

```
app/
└── [locale]/                # Locale segment (fr | en)
    ├── layout.tsx           # Root layout, fonts, providers, header/footer
    ├── page.tsx             # Homepage (Hero → Categories → Deals → …)
    ├── products/[slug]      # Product detail
    ├── categories           # Category index
    ├── categories/[slug]    # Category browser with sort + filters
    ├── deals · cart · checkout · wishlist · search · about
    └── not-found.tsx
components/
├── home/                    # Homepage sections
├── product/                 # ProductCard, ProductDetail, AddToCartButton, …
├── category/                # CategoryProducts (sort + filter)
├── cart/                    # CartSheet, CartView, CheckoutView
├── layout/                  # Header, Footer, MegaMenu, MobileMenu, BottomNavMobile
├── shared/                  # PaymentMethods, CategoryIcon, PriceTag, CountdownTimer, …
└── ui/                      # Button, Badge, Input, Sheet, Dialog, Tabs primitives
data/                        # Static content — products, categories, reviews, deals, payment, shipping
i18n/                        # routing, request, navigation
messages/                    # fr.json, en.json — every UI string
lib/                         # types, constants, utils (cn, formatPrice, pickLocale)
proxy.ts                     # next-intl middleware (Next.js 16 renamed `middleware` → `proxy`)
```

## 🎨 Design system

- **Palette** — warm `bone` surfaces, `ink` text, an energetic `clay` orange brand colour, plus `ochre` / `gold` / `leaf` accents.
- **Typography** — **Fraunces** (display), **DM Sans** (body), **JetBrains Mono** (prices, timers, labels).
- **Components** — rounded product cards with hover lift, clean payment chips, a multi-step checkout.

## 🌍 Internationalization

- Default locale `fr` has no URL prefix (`/products/iphone-15-pro`).
- English uses `/en/products/iphone-15-pro`.
- The LocaleSwitcher in the header swaps locale while preserving the current path.
- All product, category and review copy is authored in both languages in `data/*.ts`.

## 🖼️ Image credits

Product images originate from [Unsplash](https://unsplash.com) under the [Unsplash License](https://unsplash.com/license). They are downloaded and served locally from `public/products/` — the app makes no external image requests. Used for demonstration only.

## ⚠️ Disclaimer

This is a **demo project**. No real payment is processed and no order is shipped — checkout ends on a demo confirmation screen. Products, prices and reviews are fictional.

## 👤 Credits

Co-creator: **Magne Takoukam Chloé Martine** · Built by **Idriss Jordane** · idrissjordane.dev

---

## 🇫🇷 À propos

AFRIMA est une démo de boutique en ligne d'**électronique et d'équipement maison** pour le marché camerounais et africain — téléphones, ordinateurs, TV, électroménager, cuisine et mobilier. Le parcours d'achat complet est fonctionnel : navigation → panier → quantité → paiement → confirmation de commande.

Paiement par MTN MoMo, Orange Money, Visa / Mastercard, PayPal ou virement bancaire. Prix en FCFA. Bilingue FR (par défaut) / EN, construit avec Next.js 16, Tailwind v4, framer-motion et next-intl.

**Aucun backend, aucune transaction réelle** — la commande se termine sur un écran de confirmation de démonstration.
