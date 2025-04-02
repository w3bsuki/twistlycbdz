/**
 * Cart Context
 * 
 * Provides global cart state management for the Twistly CBD store.
 * Handles cart items, quantities, totals, and cart operations.
 */

'use client';

import React, { createContext, useContext, ReactNode, useState, useMemo, useCallback, useEffect } from 'react';
import { Product } from '@/lib/products';

// Product interface (to be moved to a types file later)
export interface CartItem extends Product {
  quantity: number;
}

// Define the cart state interface
interface CartState {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isOpen: boolean;
  isLoading: boolean;
  error: Error | null;
}

// Define the cart actions interface
interface CartActions {
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

// Combine state and actions for the full context value
interface CartContextValue extends CartState, CartActions {}

// Create the context with a default value
const CartContext = createContext<CartContextValue | undefined>(undefined);

// Provider props interface
interface CartProviderProps {
  children: ReactNode;
}

/**
 * Cart provider component that manages the shopping cart state
 */
export function CartProvider({ children }: CartProviderProps) {
  // State definitions
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Calculate derived state
  const itemCount = useMemo(() => {
    return items.reduce((count, item) => count + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [items]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('twistly-cart');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } catch (err) {
      console.error('Failed to load cart from localStorage:', err);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('twistly-cart', JSON.stringify(items));
    } catch (err) {
      console.error('Failed to save cart to localStorage:', err);
    }
  }, [items]);

  // Cart actions implementation
  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // If item exists, update its quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        return updatedItems;
      } else {
        // Otherwise, add new item
        return [...prevItems, { ...product, quantity }];
      }
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems(prevItems => {
      if (quantity <= 0) {
        return prevItems.filter(item => item.id !== productId);
      }
      
      return prevItems.map(item => 
        item.id === productId ? { ...item, quantity } : item
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const openCart = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Use memoization to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      // State
      items,
      itemCount,
      subtotal,
      isOpen,
      isLoading,
      error,
      // Actions
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
    }),
    [
      items, itemCount, subtotal, isOpen, isLoading, error,
      addItem, removeItem, updateQuantity, clearCart, openCart, closeCart
    ]
  );

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

/**
 * Custom hook to use the cart context
 * 
 * @example
 * ```tsx
 * const { items, addItem, removeItem } = useCart();
 * ```
 */
export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

// Selector hooks for performance optimization
export function useCartItemCount(): number {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartItemCount must be used within a CartProvider');
  }
  return context.itemCount;
}

export function useCartSubtotal(): number {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartSubtotal must be used within a CartProvider');
  }
  return context.subtotal;
}

export function useCartIsOpen(): boolean {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartIsOpen must be used within a CartProvider');
  }
  return context.isOpen;
} 