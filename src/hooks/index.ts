/**
 * Hooks Index
 * 
 * This file exports all custom hooks for easier imports throughout the application.
 * Import from '@/hooks' instead of individual files.
 */

// Export all hooks from a single point to simplify imports
export { useAnimationConfig, fadeInUpVariants, fadeInVariants, staggerContainerVariants, slideInLeftVariants, slideInRightVariants } from './use-animation-config';
export { useDebounce } from './use-debounce';
export { useIntersectionObserver } from './use-intersection-observer';
export { useLocalStorage } from './use-local-storage';
export { useAutoScroll } from './use-auto-scroll';
export { useIsMobile } from './use-mobile';
export { useMousePositionRef } from './use-mouse-position-ref';
export { useToast } from './use-toast';
export { useProductData } from './use-product-data';

// Common re-export pattern for hooks:
// 1. Export each hook from its own file
// 2. Re-export all hooks from index.ts
// This allows importing from a single location: import { useHook } from '@/hooks'
// While maintaining separation of concerns and code organization

// Usage examples:
// import { useDebounce, useIntersectionObserver } from '@/hooks';
// 
// const debouncedValue = useDebounce(value, 500);
// const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.5 });

// Product data hook for fetching and managing product data
export type { ProductFilter, ProductSortOption } from './use-product-data'

// LocalStorage hook for client-side persistence
// export { useLocalStorage } from './use-local-storage'
// etc. 