'use client'

import React from 'react'

interface VisuallyHiddenProps {
  children: React.ReactNode
  as?: React.ElementType
  className?: string
}

/**
 * VisuallyHidden component that renders content that is visually hidden
 * but still accessible to screen readers and other assistive technologies.
 * Based on best practices for creating accessible visually hidden content.
 */
export function VisuallyHidden({
  children,
  as: Component = 'span',
  className,
  ...props
}: VisuallyHiddenProps & React.HTMLAttributes<HTMLElement>) {
  return (
    <Component
      className={className}
      style={{
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: '1px',
        margin: '-1px',
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        width: '1px',
        whiteSpace: 'nowrap',
        wordWrap: 'normal',
      }}
      {...props}
    >
      {children}
    </Component>
  )
} 