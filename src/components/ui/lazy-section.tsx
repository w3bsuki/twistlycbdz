'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import useLazyLoad from '@/hooks/use-lazy-load';

interface LazySkeletonProps {
  className?: string;
  height?: string | number;
  children?: React.ReactNode;
}

/**
 * Default skeleton component shown while the lazy content is loading
 */
const DefaultSkeleton: React.FC<LazySkeletonProps> = ({ 
  className, 
  height = "20rem",
  children
}) => (
  <div 
    className={cn(
      "animate-pulse bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden",
      className
    )} 
    style={{ height }}
  >
    {children}
  </div>
);

interface LazySectionProps {
  /**
   * The content to be lazily loaded
   */
  children: React.ReactNode;
  
  /**
   * Component to display while the section is loading
   * Defaults to a simple skeleton loader
   */
  placeholder?: React.ReactNode;
  
  /**
   * Additional class name for the section wrapper
   */
  className?: string;
  
  /**
   * Height of the placeholder. Only used with the default skeleton.
   */
  placeholderHeight?: string | number;
  
  /**
   * Threshold value for the Intersection Observer
   * (0-1) what percentage of the element needs to be visible
   */
  threshold?: number;
  
  /**
   * Root margin for the Intersection Observer
   * A positive value will start loading before the element is visible
   */
  rootMargin?: string;
  
  /**
   * Whether to load the content immediately without lazy loading
   * Useful for critical content or for SSR
   */
  loadImmediately?: boolean;
  
  /**
   * ID for the section, useful for accessibility and testing
   */
  id?: string;
  
  /**
   * Data attribute for testing
   */
  dataTestId?: string;
}

/**
 * LazySection - A component that lazily loads its children when they are about to become visible
 * 
 * This is useful for below-the-fold content that doesn't need to be loaded 
 * immediately when the page loads, improving initial load performance.
 * 
 * @example
 * ```tsx
 * <LazySection>
 *   <HeavyComponent />
 * </LazySection>
 * ```
 */
export const LazySection: React.FC<LazySectionProps> = ({
  children,
  placeholder,
  className,
  placeholderHeight = "20rem",
  threshold = 0.1,
  rootMargin = "200px",
  loadImmediately = false,
  id,
  dataTestId,
}) => {
  const { ref, isLoaded } = useLazyLoad({
    threshold,
    rootMargin,
    loadImmediately,
  });

  return (
    <section
      ref={ref}
      className={cn("relative", className)}
      id={id}
      data-testid={dataTestId}
    >
      {isLoaded ? (
        children
      ) : (
        placeholder || (
          <DefaultSkeleton height={placeholderHeight} />
        )
      )}
    </section>
  );
};

export default LazySection; 