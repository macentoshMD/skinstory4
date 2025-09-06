import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  brand: string;
  category: 'sales' | 'treatment' | 'consumables';
  pricePerUnit: number;
  packSize: number;
  unit: string;
  quantity: number;
}

interface OrderCartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalValue: () => number;
}

const OrderCartContext = createContext<OrderCartContextType | null>(null);

export function useOrderCart() {
  const context = useContext(OrderCartContext);
  if (!context) {
    throw new Error('useOrderCart must be used within OrderCartProvider');
  }
  return context;
}

interface OrderCartProviderProps {
  children: ReactNode;
}

export function OrderCartProvider({ children }: OrderCartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity: number) => {
    if (quantity <= 0) return;

    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }
      
      return [...prev, { ...item, quantity }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalValue = () => {
    return cartItems.reduce((total, item) => total + (item.pricePerUnit * item.packSize * item.quantity), 0);
  };

  return (
    <OrderCartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getTotalItems,
        getTotalValue,
      }}
    >
      {children}
    </OrderCartContext.Provider>
  );
}