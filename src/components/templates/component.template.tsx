/**
 * Component Template
 * 
 * This serves as a standard template for creating new components in the Twistly CBD project.
 * Follow this structure for consistency across the codebase.
 */

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

// Define component props with TypeScript interface
export interface ComponentTemplateProps {
  /** Primary content or children to render */
  children?: ReactNode
  /** Additional CSS classes to apply to the component */
  className?: string
  /** Determines the visual variant of the component */
  variant?: 'default' | 'outline' | 'secondary' | 'ghost'
  /** Whether the component is in a disabled state */
  disabled?: boolean
  /** Optional custom test ID for testing */
  'data-testid'?: string
}

/**
 * ComponentTemplate - A reusable UI component
 * 
 * @example
 * ```tsx
 * <ComponentTemplate variant="outline" className="mt-4">
 *   Content goes here
 * </ComponentTemplate>
 * ```
 */
export function ComponentTemplate({
  children,
  className,
  variant = 'default',
  disabled = false,
  'data-testid': testId,
}: ComponentTemplateProps) {
  return (
    <div
      className={cn(
        'component-base-style',
        {
          'component-default-variant': variant === 'default',
          'component-outline-variant': variant === 'outline',
          'component-secondary-variant': variant === 'secondary',
          'component-ghost-variant': variant === 'ghost',
          'component-disabled-state': disabled,
        },
        className
      )}
      data-testid={testId}
    >
      {children}
    </div>
  )
} 