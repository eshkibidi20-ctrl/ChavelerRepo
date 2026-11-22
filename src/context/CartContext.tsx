import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { CartItemDto, TourPackageDto } from '@/types/travel';

interface CartContextValue {
  items: CartItemDto[];
  count: number;
  total: number;
  addItem: (
    packageItem: TourPackageDto,
    travelDate: string,
    adults: number,
    children: number,
  ) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, patch: Partial<Pick<CartItemDto, 'adults' | 'children'>>) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = 'chaveler-trip-cart';

const getChildRate = (promoPrice: number) => Math.round(promoPrice * 0.5);

const loadInitialCart = (): CartItemDto[] => {
  try {
    const saved = window.localStorage.getItem(storageKey);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? (parsed as CartItemDto[]) : [];
  } catch {
    return [];
  }
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItemDto[]>(loadInitialCart);

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(items));
    } catch {
      // Ignore storage quota or restricted-mode write errors
    }
  }, [items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: items.reduce((sum, item) => sum + item.adults + item.children, 0),
      total: items.reduce(
        (sum, item) =>
          sum + item.package.promoPrice * item.adults + getChildRate(item.package.promoPrice) * item.children,
        0,
      ),
      addItem: (packageItem, travelDate, adults, children) => {
        const safeAdults = Math.max(1, adults);
        const safeChildren = Math.max(0, children);
        const entryId = `${packageItem.id}:${travelDate}`;

        setItems((current) => [
          ...current.filter((item) => item.id !== entryId),
          {
            id: entryId,
            package: packageItem,
            travelDate,
            adults: safeAdults,
            children: safeChildren,
          },
        ]);
      },
      removeItem: (id) => setItems((current) => current.filter((item) => item.id !== id)),
      updateItem: (id, patch) =>
        setItems((current) =>
          current.map((item) => {
            if (item.id !== id) return item;
            const nextAdults = patch.adults !== undefined ? Math.max(1, patch.adults) : item.adults;
            const nextChildren =
              patch.children !== undefined ? Math.max(0, patch.children) : item.children;
            return { ...item, adults: nextAdults, children: nextChildren };
          }),
        ),
      clear: () => setItems([]),
    }),
    [items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}