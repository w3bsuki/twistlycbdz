'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';
import useLazyLoad from '@/hooks/use-lazy-load';

interface LazyImageProps extends Omit<ImageProps, 'alt'> {
  /**
   * Alternative text for the image (required for accessibility)
   */
  alt: string;
  
  /**
   * Aspect ratio of the image container
   */
  aspectRatio?: 'square' | '16:9' | '4:3' | '3:2' | '1:1';
  
  /**
   * Class name for the image element
   */
  className?: string;
  
  /**
   * Class name for the wrapper div
   */
  wrapperClassName?: string;
  
  /**
   * Class applied when image is loaded
   */
  loadedClassName?: string;
  
  /**
   * Fallback image source in case the main image fails to load
   */
  fallbackSrc?: string;
  
  /**
   * Blur hash or base64 image placeholder to show while loading
   */
  blurDataURL?: string;
  
  /**
   * Whether to blur the placeholder
   */
  placeholder?: 'blur' | 'empty';
  
  /**
   * Root margin for intersection observer
   */
  rootMargin?: string;
  
  /**
   * Whether to skip lazy loading and load immediately
   * Set to true for images that are visible above the fold
   */
  loadImmediately?: boolean;
}

/**
 * LazyImage - Enhanced image component with advanced lazy loading
 * 
 * A wrapper around Next.js Image that:
 * 1. Lazy loads images properly based on viewport visibility
 * 2. Provides smooth loading transitions
 * 3. Handles errors with fallback images
 * 4. Uses proper image loading strategies based on image position
 * 
 * @example
 * ```tsx
 * // Below the fold image (lazy loaded)
 * <LazyImage
 *   src="/images/product.jpg"
 *   alt="Product image"
 *   aspectRatio="4:3"
 *   className="rounded-lg"
 * />
 * 
 * // Above the fold image (loaded immediately)
 * <LazyImage
 *   src="/images/hero.jpg"
 *   alt="Hero image"
 *   loadImmediately
 *   priority
 * />
 * ```
 */
export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  aspectRatio = '1:1',
  className,
  wrapperClassName,
  loadedClassName = 'opacity-100',
  fill = true,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  quality = 85,
  priority = false,
  fallbackSrc = '/images/placeholder.png',
  blurDataURL,
  placeholder,
  rootMargin = '200px',
  loadImmediately = false,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isError, setIsError] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  
  // Use our custom lazy loading hook
  const { ref, isLoaded } = useLazyLoad({
    rootMargin,
    loadImmediately: loadImmediately || priority,
  });

  // Handle image load error
  const handleError = () => {
    setIsError(true);
    setImgSrc(fallbackSrc);
  };
  
  // Handle successful load
  const handleLoad = () => {
    setHasLoaded(true);
  };

  // Calculate aspect ratio
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case 'square':
      case '1:1':
        return 'aspect-square';
      case '16:9':
        return 'aspect-video';
      case '4:3':
        return 'aspect-4/3';
      case '3:2':
        return 'aspect-3/2';
      default:
        return 'aspect-square';
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        'relative overflow-hidden bg-gray-100 dark:bg-gray-800',
        getAspectRatioClass(),
        wrapperClassName
      )}
    >
      {isLoaded && (
        <Image
          src={imgSrc}
          alt={alt}
          fill={fill}
          sizes={sizes}
          quality={quality}
          priority={priority}
          blurDataURL={blurDataURL}
          placeholder={placeholder}
          onError={handleError}
          onLoad={handleLoad}
          className={cn(
            'object-cover transition-opacity duration-500 opacity-0',
            hasLoaded && loadedClassName,
            isError ? 'object-contain p-4' : 'object-cover',
            className
          )}
          {...props}
        />
      )}
    </div>
  );
};

export default LazyImage; 