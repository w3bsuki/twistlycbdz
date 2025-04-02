/**
 * Intersection Observer Hook
 * 
 * A custom hook that provides a simple abstraction over the IntersectionObserver API.
 * Useful for implementing infinite scroll, lazy loading, and detecting element visibility.
 */

import { useState, useEffect, useRef, useCallback } from 'react'

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  /** Whether the observer should be active */
  enabled?: boolean;
  /** Callback function for when the target element intersects */
  onIntersect?: () => void;
}

interface UseIntersectionObserverResult {
  /** Reference to attach to the target element */
  ref: React.RefObject<HTMLElement>;
  /** Whether the target element is currently intersecting */
  isIntersecting: boolean;
  /** The intersection ratio of the target element (0 to 1) */
  intersectionRatio: number;
  /** Manually reset the intersection state */
  reset: () => void;
}

/**
 * useIntersectionObserver - A custom hook for using the Intersection Observer API
 * 
 * @example
 * ```tsx
 * // Basic usage for infinite scroll
 * const { ref, isIntersecting } = useIntersectionObserver({
 *   onIntersect: loadMoreItems,
 *   threshold: 0.1
 * });
 * 
 * useEffect(() => {
 *   if (isIntersecting) {
 *     loadMoreItems();
 *   }
 * }, [isIntersecting]);
 * 
 * // Then in your JSX
 * <div ref={ref}>Loading more...</div>
 * ```
 */
export function useIntersectionObserver({
  root = null,
  rootMargin = '0px',
  threshold = 0,
  enabled = true,
  onIntersect,
}: UseIntersectionObserverOptions = {}): UseIntersectionObserverResult {
  // Create a ref for the target element
  const targetRef = useRef<HTMLElement>(null)
  
  // Track intersection state
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)
  
  // Reset intersection state
  const reset = useCallback(() => {
    setEntry(null)
  }, [])

  // Set up the intersection observer
  useEffect(() => {
    // Skip if disabled or if target ref is not set
    if (!enabled || !targetRef.current) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state with the latest entry
        setEntry(entry)
        
        // Call onIntersect callback if the element is intersecting
        if (entry.isIntersecting && onIntersect) {
          onIntersect()
        }
      },
      { root, rootMargin, threshold }
    )

    // Start observing the target element
    observer.observe(targetRef.current)

    // Clean up observer on unmount or when deps change
    return () => {
      observer.disconnect()
    }
  }, [enabled, root, rootMargin, threshold, onIntersect, targetRef.current])

  return {
    ref: targetRef,
    isIntersecting: entry?.isIntersecting || false,
    intersectionRatio: entry?.intersectionRatio || 0,
    reset,
  }
} 