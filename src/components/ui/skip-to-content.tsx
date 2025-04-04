'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { SkipLinkTargets } from '@/lib/accessibility';

interface SkipToContentProps {
  className?: string;
  mainContentId?: string;
}

/**
 * SkipToContent component provides a hidden link that becomes visible when focused,
 * allowing keyboard users to skip navigation and go directly to the main content.
 * 
 * This improves accessibility for screen reader users and keyboard-only navigation.
 */
export function SkipToContent({
  className,
  mainContentId = SkipLinkTargets.MAIN_CONTENT
}: SkipToContentProps) {
  return (
    <a
      href={`#${mainContentId}`}
      className={cn(
        "sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4",
        "bg-white text-gray-900 px-4 py-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-500",
        className
      )}
    >
      Skip to content
    </a>
  );
}

/**
 * MainContentArea component that sets the target for the skip link
 */
export function MainContentArea({
  children,
  id = SkipLinkTargets.MAIN_CONTENT,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { id?: string }) {
  return (
    <main id={id} tabIndex={-1} className={cn("outline-none", className)} {...props}>
      {children}
    </main>
  );
} 