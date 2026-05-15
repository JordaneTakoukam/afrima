'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from 'react';

export type CartItem = { slug: string; qty: number };
export type CartState = { items: CartItem[] };

type Action =
  | { type: 'add'; slug: string; qty?: number }
  | { type: 'remove'; slug: string }
  | { type: 'set-qty'; slug: string; qty: number }
  | { type: 'clear' }
  | { type: 'load'; state: CartState };

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case 'add': {
      const qty = action.qty ?? 1;
      const existing = state.items.find((i) => i.slug === action.slug);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.slug === action.slug ? { ...i, qty: i.qty + qty } : i,
          ),
        };
      }
      return { items: [...state.items, { slug: action.slug, qty }] };
    }
    case 'remove':
      return { items: state.items.filter((i) => i.slug !== action.slug) };
    case 'set-qty':
      return {
        items: state.items
          .map((i) => (i.slug === action.slug ? { ...i, qty: Math.max(0, action.qty) } : i))
          .filter((i) => i.qty > 0),
      };
    case 'clear':
      return { items: [] };
    case 'load':
      return action.state;
  }
}

type CartCtx = {
  items: CartItem[];
  count: number;
  ready: boolean;
  add: (slug: string, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartCtx | null>(null);

const KEY = 'afrima-cart-v1';

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(KEY);
      if (saved) dispatch({ type: 'load', state: JSON.parse(saved) });
    } catch {}
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client hydration from localStorage
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
    } catch {}
  }, [state, ready]);

  const value = useMemo<CartCtx>(
    () => ({
      items: state.items,
      count: state.items.reduce((s, i) => s + i.qty, 0),
      ready,
      add: (slug, qty) => dispatch({ type: 'add', slug, qty }),
      remove: (slug) => dispatch({ type: 'remove', slug }),
      setQty: (slug, qty) => dispatch({ type: 'set-qty', slug, qty }),
      clear: () => dispatch({ type: 'clear' }),
    }),
    [state, ready],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
