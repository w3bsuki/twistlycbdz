/**
 * Cart Context
 * 
 * Provides global cart state management for the Twistly CBD store.
 * Handles cart items, quantities, totals, and cart operations.
 */

'use client';

import React, { createContext, ReactNode, useContext, useState, useMemo, useEffect } from 'react';
import { Product } from '@/types';

// Extended Product interface to include quantity
export interface CartItem extends Product {
  quantity: number;
  selectedVariant?: string;
}

// Cart State Interface
export interface CartState {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
  savedItems: CartItem[];
}

// Cart Actions Interface
export interface CartActions {
  addItem: (item: Product, quantity?: number, variant?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  saveForLater: (id: string) => void;
  moveToCart: (id: string) => void;
  removeSavedItem: (id: string) => void;
}

// Combined type for the context
export type CartContextType = CartState & CartActions;

// Create the context with default values
const CartContext = createContext<CartContextType | undefined>(undefined);

// LocalStorage keys
const CART_STORAGE_KEY = 'twistly-cart';
const SAVED_ITEMS_STORAGE_KEY = 'twistly-saved-items';

// Define custom error types for better error categorization
class CartError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CartError';
  }
}

class ItemNotFoundError extends CartError {
  constructor(itemId: string) {
    super(`Item with ID ${itemId} not found`);
    this.name = 'ItemNotFoundError';
  }
}

class QuantityError extends CartError {
  constructor(message: string) {
    super(message);
    this.name = 'QuantityError';
  }
}

// Provider component for cart functionality
export function CartProvider({ children }: { children: ReactNode }) {
  // State for cart items and UI
  const [items, setItems] = useState<CartItem[]>([]);
  const [savedItems, setSavedItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      const savedForLater = localStorage.getItem(SAVED_ITEMS_STORAGE_KEY);
      
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
      
      if (savedForLater) {
        setSavedItems(JSON.parse(savedForLater));
      }
    } catch (e) {
      console.error('Error loading cart from localStorage:', e);
      setError('Failed to load cart data. Please refresh the page.');
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Error saving cart to localStorage:', e);
      setError('Failed to save cart data.');
    }
  }, [items]);

  // Save savedItems to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem(SAVED_ITEMS_STORAGE_KEY, JSON.stringify(savedItems));
    } catch (e) {
      console.error('Error saving savedItems to localStorage:', e);
      setError('Failed to save items for later.');
    }
  }, [savedItems]);

  // Close cart on route changes
  useEffect(() => {
    const handleRouteChange = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [isOpen]);

  // Calculate derived values
  const itemCount = useMemo(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [items]);

  // Cart actions
  const addItem = (product: Product, quantity: number = 1, variant?: string) => {
    if (quantity < 1) {
      setError('Quantity must be at least 1');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      setItems(prevItems => {
        // Check if item already exists in cart
        const existingItemIndex = prevItems.findIndex(item => 
          item.id === product.id && 
          (variant ? item.selectedVariant === variant : !item.selectedVariant)
        );
        
        if (existingItemIndex >= 0) {
          // Update quantity of existing item
          return prevItems.map((item, index) =>
            index === existingItemIndex
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          // Add new item to cart
          const newItem: CartItem = {
            ...product,
            quantity,
            selectedVariant: variant
          };
          return [...prevItems, newItem];
        }
      });

      // Automatically open cart when adding items
      setIsOpen(true);
    } catch (e) {
      console.error('Error adding item to cart:', e);
      setError(`Failed to add ${product.name} to cart: ${e instanceof Error ? e.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const removeItem = (id: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const itemExists = items.some(item => item.id === id);
      if (!itemExists) {
        throw new ItemNotFoundError(id);
      }
      
      setItems(prevItems => prevItems.filter(item => item.id !== id));
    } catch (e) {
      console.error('Error removing item from cart:', e);
      if (e instanceof ItemNotFoundError) {
        setError(e.message);
      } else {
        setError(`Failed to remove item: ${e instanceof Error ? e.message : 'Unknown error'}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      setError('Quantity must be at least 1');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const itemExists = items.some(item => item.id === id);
      if (!itemExists) {
        throw new ItemNotFoundError(id);
      }
      
      setItems(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    } catch (e) {
      console.error('Error updating item quantity:', e);
      if (e instanceof ItemNotFoundError) {
        setError(e.message);
      } else if (e instanceof QuantityError) {
        setError(e.message);
      } else {
        setError(`Failed to update quantity: ${e instanceof Error ? e.message : 'Unknown error'}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = () => {
    setIsLoading(true);
    setError(null);
    
    try {
      setItems([]);
    } catch (e) {
      console.error('Error clearing cart:', e);
      setError('Failed to clear cart.');
    } finally {
      setIsLoading(false);
    }
  };

  const openCart = () => {
    setIsOpen(true);
  };

  const closeCart = () => {
    setIsOpen(false);
  };

  const saveForLater = (id: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const itemToSave = items.find(item => item.id === id);
      if (!itemToSave) {
        throw new ItemNotFoundError(id);
      }
      
      setSavedItems(prev => [...prev, itemToSave]);
      setItems(prev => prev.filter(item => item.id !== id));
    } catch (e) {
      console.error('Error saving item for later:', e);
      if (e instanceof ItemNotFoundError) {
        setError(e.message);
      } else {
        setError(`Failed to save item for later: ${e instanceof Error ? e.message : 'Unknown error'}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const moveToCart = (id: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const itemToMove = savedItems.find(item => item.id === id);
      if (!itemToMove) {
        throw new ItemNotFoundError(id);
      }
      
      setItems(prev => [...prev, itemToMove]);
      setSavedItems(prev => prev.filter(item => item.id !== id));
    } catch (e) {
      console.error('Error moving item to cart:', e);
      if (e instanceof ItemNotFoundError) {
        setError(e.message);
      } else {
        setError(`Failed to move item to cart: ${e instanceof Error ? e.message : 'Unknown error'}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const removeSavedItem = (id: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const itemExists = savedItems.some(item => item.id === id);
      if (!itemExists) {
        throw new ItemNotFoundError(id);
      }
      
      setSavedItems(prev => prev.filter(item => item.id !== id));
    } catch (e) {
      console.error('Error removing saved item:', e);
      if (e instanceof ItemNotFoundError) {
        setError(e.message);
      } else {
        setError(`Failed to remove saved item: ${e instanceof Error ? e.message : 'Unknown error'}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Combine state and actions for context value
  const value = {
    items,
    savedItems,
    itemCount,
    subtotal,
    isOpen,
    isLoading,
    error,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
    saveForLater,
    moveToCart,
    removeSavedItem
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook for accessing cart context
export function useCart(): CartContextType {
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