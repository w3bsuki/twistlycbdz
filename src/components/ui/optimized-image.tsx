'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<ImageProps, 'alt'> {
  alt: string;
  aspectRatio?: 'square' | '16:9' | '4:3' | '3:2' | '1:1';
  className?: string;
  wrapperClassName?: string;
  coverClassName?: string;
  fallbackSrc?: string;
  loading?: 'eager' | 'lazy';
}

/**
 * OptimizedImage - A wrapper around Next.js Image component with best practices
 * for performance and responsive behavior.
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  aspectRatio = '1:1',
  className,
  wrapperClassName,
  coverClassName,
  fill = true,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  quality = 85,
  priority = false,
  loading: loadingProp,
  fallbackSrc = '/images/2.png',
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isError, setIsError] = useState(false);
  // Determine loading strategy - use priority for above-the-fold images, lazy otherwise
  // Only apply if not explicitly specified by the loadingProp
  const loading = loadingProp || (priority ? undefined : 'lazy');

  // Handle image load error
  const handleError = () => {
    setIsError(true);
    setImgSrc(fallbackSrc);
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
      className={cn(
        'relative overflow-hidden bg-gray-100 dark:bg-gray-800',
        getAspectRatioClass(),
        wrapperClassName
      )}
    >
      <Image
        src={imgSrc}
        alt={alt}
        fill={fill}
        sizes={sizes}
        quality={quality}
        priority={priority}
        loading={loading}
        onError={handleError}
        className={cn(
          'object-cover transition-all',
          isError ? 'object-contain p-4' : 'object-cover',
          coverClassName,
          className
        )}
        {...props}
      />
    </div>
  );
}; 