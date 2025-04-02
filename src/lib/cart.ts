import { Product } from '@/lib/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
}

export const initialCartState: CartState = {
  items: [],
  itemCount: 0,
  subtotal: 0,
  discount: 0,
  tax: 0,
  shipping: 0,
  total: 0,
};

// Helper functions for cart operations
export const addToCart = (cart: CartState, product: Product, quantity: number = 1): CartState => {
  if (!product || !product.id) {
    console.error('Invalid product provided to addToCart');
    return { ...initialCartState };
  }

  if (quantity <= 0) {
    console.warn('Attempted to add item with quantity <= 0');
    return cart;
  }
  
  // Ensure cart is not null/undefined
  if (!cart) {
    console.warn('Cart is null or undefined, using initialCartState');
    cart = { ...initialCartState };
  }
  
  // Ensure cart has valid items array
  if (!Array.isArray(cart.items)) {
    console.warn('Cart items is not an array, initializing empty array');
    cart = { ...cart, items: [] };
  }
  
  console.log('addToCart called with:', { productId: product.id, productName: product.name, quantity });
  
  const existingItemIndex = cart.items.findIndex(item => item?.product?.id === product.id);
  let newItems = [...cart.items];
  
  if (existingItemIndex >= 0) {
    // Update quantity if item already exists
    newItems[existingItemIndex] = {
      ...newItems[existingItemIndex],
      quantity: newItems[existingItemIndex].quantity + quantity
    };
    console.log('Updated existing item quantity', newItems[existingItemIndex].quantity);
  } else {
    // Add new item
    newItems.push({ product, quantity });
    console.log('Added new item to cart');
  }
  
  const updatedCart = recalculateCart(cart, newItems);
  console.log('Cart after adding item:', updatedCart);
  return updatedCart;
};

export const updateCartItemQuantity = (cart: CartState, productId: string, quantity: number): CartState => {
  if (!cart || !Array.isArray(cart.items)) {
    console.warn('Invalid cart in updateCartItemQuantity');
    return { ...initialCartState };
  }
  
  if (!productId) {
    console.error('Invalid productId provided to updateCartItemQuantity');
    return cart;
  }
  
  if (quantity <= 0) {
    return removeFromCart(cart, productId);
  }
  
  const newItems = cart.items.map(item => 
    item?.product?.id === productId ? { ...item, quantity } : item
  );
  
  return recalculateCart(cart, newItems);
};

export const removeFromCart = (cart: CartState, productId: string): CartState => {
  if (!cart || !Array.isArray(cart.items)) {
    console.warn('Invalid cart in removeFromCart');
    return { ...initialCartState };
  }
  
  if (!productId) {
    console.error('Invalid productId provided to removeFromCart');
    return cart;
  }
  
  const newItems = cart.items.filter(item => item?.product?.id !== productId);
  return recalculateCart(cart, newItems);
};

export const clearCart = (): CartState => {
  return { ...initialCartState };
};

// Helper to recalculate cart totals
const recalculateCart = (cart: CartState, items: CartItem[]): CartState => {
  try {
    // Ensure items is an array
    if (!Array.isArray(items)) {
      console.warn('Items is not an array in recalculateCart');
      items = [];
    }
    
    const itemCount = items.reduce((total, item) => {
      if (!item || typeof item.quantity !== 'number') return total;
      return total + item.quantity;
    }, 0);
    
    const subtotal = items.reduce((total, item) => {
      if (!item?.product) return total;
      
      // Use discountPrice if available, otherwise calculate from price and discount percentage
      const price = item.product.discountPrice || 
                   (item.product.discount ? 
                    item.product.price - (item.product.price * item.product.discount / 100) : 
                    item.product.price);
      
      return total + (price * item.quantity);
    }, 0);
    
    // Assuming tax is 7%
    const tax = subtotal * 0.07;
    
    // Free shipping over $100, otherwise $5.99
    const shipping = subtotal > 100 ? 0 : 5.99;
    
    // Calculate total
    const total = subtotal + tax + shipping - (cart?.discount || 0);
    
    console.log('Recalculated cart:', { itemCount, subtotal, tax, shipping, total });
    
    return {
      items,
      itemCount,
      subtotal,
      tax,
      shipping,
      discount: cart?.discount || 0,
      total
    };
  } catch (error) {
    console.error('Error in recalculateCart:', error);
    return { ...initialCartState, items };
  }
}; 