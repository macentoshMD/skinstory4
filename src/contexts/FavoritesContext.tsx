import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FavoriteItem {
  productId: string;
  variantId: string;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addToFavorites: (productId: string, variantId: string) => void;
  removeFromFavorites: (productId: string, variantId: string) => void;
  isFavorite: (productId: string, variantId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
}

interface FavoritesProviderProps {
  children: ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([
    // Some pre-populated favorites
    { productId: 'consumables-1', variantId: 'consumables-1-standard' },
    { productId: 'consumables-2', variantId: 'consumables-2-round' },
    { productId: 'consumables-3', variantId: 'consumables-3-m' },
    { productId: 'treatment-1', variantId: 'treatment-1-30' },
    { productId: 'sales-1', variantId: 'sales-1-150ml' },
  ]);

  const addToFavorites = (productId: string, variantId: string) => {
    setFavorites(prev => {
      const exists = prev.some(fav => fav.productId === productId && fav.variantId === variantId);
      if (!exists) {
        return [...prev, { productId, variantId }];
      }
      return prev;
    });
  };

  const removeFromFavorites = (productId: string, variantId: string) => {
    setFavorites(prev => 
      prev.filter(fav => !(fav.productId === productId && fav.variantId === variantId))
    );
  };

  const isFavorite = (productId: string, variantId: string) => {
    return favorites.some(fav => fav.productId === productId && fav.variantId === variantId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}