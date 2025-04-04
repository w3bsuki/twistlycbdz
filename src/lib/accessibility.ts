/**
 * Accessibility utilities for Twistly CBD
 * 
 * This file contains helper functions and constants for improving
 * accessibility across the application.
 */

// Map of keyboard keys to their respective codes
export const Keys = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  TAB: 'Tab',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
};

/**
 * Helper function to handle keyboard events for interactive elements
 * Allows elements to be activated with both Enter and Space keys
 */
export const handleKeyboardEvent = (
  event: React.KeyboardEvent,
  callback: () => void
) => {
  if (event.key === Keys.ENTER || event.key === Keys.SPACE) {
    event.preventDefault();
    callback();
  }
};

/**
 * Generate screen reader text for product ratings
 */
export const getRatingAriaLabel = (rating: number, reviewCount: number) => {
  return `Rated ${rating.toFixed(1)} out of 5 stars based on ${reviewCount} ${reviewCount === 1 ? 'review' : 'reviews'}`;
};

/**
 * Generate screen reader text for price display
 */
export const getPriceAriaLabel = (price: number, discountPrice?: number) => {
  if (discountPrice) {
    const discountPercentage = Math.round(((price - discountPrice) / price) * 100);
    return `Original price ${price.toFixed(2)} dollars, now ${discountPrice.toFixed(2)} dollars, a savings of ${discountPercentage} percent`;
  }
  return `${price.toFixed(2)} dollars`;
};

/**
 * Generate screen reader text for cart item quantities
 */
export const getQuantityAriaLabel = (quantity: number, productName: string) => {
  return `${quantity} ${quantity === 1 ? 'item' : 'items'} of ${productName} in cart`;
};

/**
 * Generate screen reader text for cart totals
 */
export const getCartTotalAriaLabel = (subtotal: number, shipping: number, tax: number, discount: number, total: number) => {
  return `Cart subtotal: ${subtotal.toFixed(2)} dollars, 
  shipping: ${shipping === 0 ? 'free' : shipping.toFixed(2) + ' dollars'}, 
  tax: ${tax.toFixed(2)} dollars, 
  ${discount > 0 ? `discount: ${discount.toFixed(2)} dollars,` : ''} 
  total: ${total.toFixed(2)} dollars`;
};

/**
 * Generate skip link target IDs
 */
export const SkipLinkTargets = {
  MAIN_CONTENT: 'main-content',
  NAVIGATION: 'main-navigation',
  SEARCH: 'search',
  CART: 'cart',
};

/**
 * Check if a color has sufficient contrast against white
 * Basic check - a more comprehensive implementation would use WCAG contrast algorithms
 */
export const hasGoodContrast = (hexColor: string): boolean => {
  // Remove the hash if it exists
  const color = hexColor.replace('#', '');
  
  // Convert hex to RGB
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);
  
  // Calculate perceived brightness based on weighted RGB values
  // Formula from WCAG 2.0
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
  // Return true if the brightness is below threshold (darker colors)
  return brightness < 125;
};

/**
 * Create CSS class for text based on background color contrast
 */
export const getContrastTextColor = (bgColorHex: string): string => {
  return hasGoodContrast(bgColorHex) ? 'text-white' : 'text-gray-900';
};

// Screen reader text for cart
export function generateCartScreenReaderText(itemCount: number): string {
  if (itemCount === 0) {
    return "Your cart is empty";
  } else {
    return `Your cart contains ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`;
  }
}

export default {
  Keys,
  handleKeyboardEvent,
  getRatingAriaLabel,
  getPriceAriaLabel,
  getQuantityAriaLabel,
  getCartTotalAriaLabel,
  SkipLinkTargets,
  hasGoodContrast,
  getContrastTextColor,
  generateCartScreenReaderText,
}; 