'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'afrima-wishlist-v1';

const WishlistCtx = createContext<{
  items: string[];
  ready: boolean;
  has: (slug: string) => boolean;
  toggle: (slug: string) => boolean;
  remove: (slug: string) => void;
  clear: () => void;
} | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, ready]);

  const value = useMemo(
    () => ({
      items,
      ready,
      has: (slug: string) => items.includes(slug),
      toggle: (slug: string) => {
        let added = false;
        setItems((prev) => {
          if (prev.includes(slug)) return prev.filter((s) => s !== slug);
          added = true;
          return [...prev, slug];
        });
        return added;
      },
      remove: (slug: string) => setItems((prev) => prev.filter((s) => s !== slug)),
      clear: () => setItems([]),
    }),
    [items, ready],
  );

  return <WishlistCtx.Provider value={value}>{children}</WishlistCtx.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistCtx);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
