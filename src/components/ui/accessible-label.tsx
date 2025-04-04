'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface VisuallyHiddenProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

/**
 * VisuallyHidden component shows content to screen readers but hides it visually
 */
export function VisuallyHidden({
  children,
  className,
  as: Component = 'span',
  ...props
}: VisuallyHiddenProps & React.HTMLAttributes<HTMLElement>) {
  return (
    <Component
      className={cn("sr-only", className)}
      {...props}
    >
      {children}
    </Component>
  );
}

interface AccessibleLabelProps {
  label: string;
  visualLabel?: React.ReactNode;
  children: React.ReactNode;
  id?: string;
  className?: string;
}

/**
 * AccessibleLabel provides a visible label with additional context for screen readers
 * Useful for components where the visual presentation needs to be different from the screen reader text
 */
export function AccessibleLabel({
  label,
  visualLabel,
  children,
  id,
  className,
  ...props
}: AccessibleLabelProps & Omit<React.HTMLAttributes<HTMLDivElement>, 'id'>) {
  const uniqueId = React.useId();
  const labelId = id || `accessible-label-${uniqueId}`;

  return (
    <div className={cn("relative", className)} {...props}>
      {/* Label visible to screen readers */}
      <VisuallyHidden as="label" id={labelId}>
        {label}
      </VisuallyHidden>
      
      {/* Visible label, if provided */}
      {visualLabel && (
        <div className="mb-2">
          {visualLabel}
        </div>
      )}
      
      {/* The actual content, associated with the label */}
      <div aria-labelledby={labelId}>
        {children}
      </div>
    </div>
  );
}

interface AccessibleDescriptionProps {
  description: string;
  visualDescription?: React.ReactNode;
  children: React.ReactNode;
  id?: string;
  className?: string;
}

/**
 * AccessibleDescription provides a description for screen readers
 * Useful for providing additional context that may not be apparent visually
 */
export function AccessibleDescription({
  description,
  visualDescription,
  children,
  id,
  className,
  ...props
}: AccessibleDescriptionProps & Omit<React.HTMLAttributes<HTMLDivElement>, 'id'>) {
  const uniqueId = React.useId();
  const descriptionId = id || `accessible-description-${uniqueId}`;

  return (
    <div className={cn("relative", className)} {...props}>
      {/* Description visible to screen readers */}
      <VisuallyHidden id={descriptionId}>
        {description}
      </VisuallyHidden>
      
      {/* Visible description, if provided */}
      {visualDescription && (
        <div className="mb-2 text-sm text-gray-600">
          {visualDescription}
        </div>
      )}
      
      {/* The actual content, associated with the description */}
      <div aria-describedby={descriptionId}>
        {children}
      </div>
    </div>
  );
} 