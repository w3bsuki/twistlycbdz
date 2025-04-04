'use client';

import { useEffect, useState, useRef } from 'react';
import { useIntersectionObserver } from './use-intersection-observer';

interface UseLazyLoadOptions {
  /**
   * The threshold value between 0 and 1 indicating what percentage of the target element
   * must be visible before triggering the load. Default is 0.1 (10%).
   */
  threshold?: number;
  
  /**
   * Root margin value similar to CSS margin around the root. Default is '200px'.
   * A positive value (e.g., '200px') will start loading before the element is visible.
   */
  rootMargin?: string;
  
  /**
   * Whether lazy loading should be enabled. Default is true.
   */
  enabled?: boolean;
  
  /**
   * Skip intersection observer entirely and load content immediately.
   * Useful for critical content. Default is false.
   */
  loadImmediately?: boolean;
}

/**
 * A hook for lazily loading content when it's about to become visible in the viewport.
 * 
 * This is useful for below-the-fold content like images, videos, or heavy components
 * that don't need to be loaded immediately when the page loads.
 * 
 * @example
 * ```tsx
 * const { ref, isLoaded, load } = useLazyLoad();
 * 
 * return (
 *   <div ref={ref}>
 *     {isLoaded ? (
 *       <HeavyComponent />
 *     ) : (
 *       <Skeleton />
 *     )}
 *   </div>
 * );
 * ```
 */
export function useLazyLoad({
  threshold = 0.1,
  rootMargin = '200px',
  enabled = true,
  loadImmediately = false,
}: UseLazyLoadOptions = {}) {
  // Track if content has been loaded
  const [isLoaded, setIsLoaded] = useState(loadImmediately);
  
  // Manually handle load
  const load = () => setIsLoaded(true);
  
  // Use intersection observer to detect when element is near viewport
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
    enabled: enabled && !loadImmediately && !isLoaded,
    onIntersect: load,
  });
  
  // Immediately load if loadImmediately is true
  useEffect(() => {
    if (loadImmediately && !isLoaded) {
      setIsLoaded(true);
    }
  }, [loadImmediately, isLoaded]);
  
  // Effect to load when intersecting
  useEffect(() => {
    if (isIntersecting && !isLoaded) {
      setIsLoaded(true);
    }
  }, [isIntersecting, isLoaded]);
  
  return {
    ref,
    isLoaded,
    load,
    isIntersecting,
  };
}

export default useLazyLoad; 