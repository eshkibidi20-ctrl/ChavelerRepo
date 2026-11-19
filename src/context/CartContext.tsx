import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { CartItemDto, TourPackageDto } from '@/types/travel';

interface CartContextValue {
  items: CartItemDto[];
  count: number;
  total: number;
  addItem: (packageItem: TourPackageDto, travelDate: string, adults: number, children: number) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, patch: Partial<Pick<CartItemDto, 'adults' | 'children'>>) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = 'chaveler-trip-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItemDto[]>(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) as CartItemDto[] : [];
  });

  useEffect(() => localStorage.setItem(storageKey, JSON.stringify(items)), [items]);

  const value = useMemo<CartContextValue>(() => ({
    items,
    count: items.reduce((sum, item) => sum + item.adults + item.children, 0),
    total: items.reduce((sum, item) => sum + item.package.promoPrice * item.adults + item.package.promoPrice * 0.5 * item.children, 0),
    addItem: (packageItem, travelDate, adults, children) => setItems((current) => [...current.filter((item) => item.id !== packageItem.id), { id: packageItem.id, package: packageItem, travelDate, adults, children }]),
    removeItem: (id) => setItems((current) => current.filter((item) => item.id !== id)),
    updateItem: (id, patch) => setItems((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item)),
    clear: () => setItems([]),
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
