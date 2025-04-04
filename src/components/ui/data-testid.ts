/**
 * Data TestID Constants
 * 
 * This file contains constants for data-testid attributes used throughout the application.
 * Using these constants instead of string literals ensures consistency between components
 * and test files, making test maintenance easier.
 */

// Navigation
export const DATA_TEST_ID = {
  // Layout
  HEADER: 'header',
  FOOTER: 'footer',
  MAIN_CONTENT: 'main-content',
  SKIP_LINK: 'skip-to-content',
  
  // Navigation
  NAV_LINK: 'nav-link',
  MOBILE_MENU: 'mobile-menu',
  MOBILE_MENU_BUTTON: 'mobile-menu-button',
  
  // Product
  PRODUCT_CARD: 'product-card',
  PRODUCT_IMAGE: 'product-image',
  PRODUCT_TITLE: 'product-title',
  PRODUCT_PRICE: 'product-price',
  PRODUCT_DESCRIPTION: 'product-description',
  PRODUCT_VARIANTS: 'product-variants',
  PRODUCT_RATING: 'product-rating',
  RELATED_PRODUCTS: 'related-products',
  CATEGORY_FILTERS: 'category-filters',
  
  // Cart
  CART_BUTTON: 'cart-button',
  CART_COUNT: 'cart-count',
  CART_DRAWER: 'cart-drawer',
  CART_ITEMS: 'cart-items',
  CART_ITEM: 'cart-item',
  CART_SUBTOTAL: 'cart-subtotal',
  CART_ITEM_QUANTITY: 'cart-item-quantity',
  CART_ITEM_INCREASE: 'cart-item-increase',
  CART_ITEM_DECREASE: 'cart-item-decrease',
  REMOVE_CART_ITEM: 'remove-cart-item',
  EMPTY_CART_MESSAGE: 'empty-cart-message',
  CHECKOUT_BUTTON: 'checkout-button',
  
  // Checkout
  CHECKOUT_FORM: 'checkout-form',
  ORDER_SUMMARY: 'order-summary',
  SHIPPING_INFO: 'shipping-info',
  PAYMENT_METHOD: 'payment-method',
  PLACE_ORDER_BUTTON: 'place-order-button',
  
  // Product Detail
  ADD_TO_CART_BUTTON: 'add-to-cart-button',
  QUANTITY_SELECTOR: 'quantity-selector',
  QUANTITY_INPUT: 'quantity-input',
  INCREASE_QUANTITY: 'increase-quantity',
  DECREASE_QUANTITY: 'decrease-quantity',
  
  // Category Pages
  CATEGORY_HERO: 'category-hero',
  CATEGORY_BENEFITS: 'category-benefits',
  CATEGORY_PRODUCTS: 'category-products',
  CATEGORY_TESTIMONIALS: 'category-testimonials',
  CATEGORY_FAQ: 'category-faq',
  CATEGORY_CTA: 'category-cta',
  
  // Performance Metrics
  PERFORMANCE_MONITOR: 'performance-monitor',
  
  // Accessibility
  SKIP_TO_CONTENT: 'skip-to-content',
};

export default DATA_TEST_ID; 