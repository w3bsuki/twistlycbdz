'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface GridBackgroundProps {
  className?: string
  dotColor?: string
  size?: number
  opacity?: number
  dotSize?: number
  variant?: 'dots' | 'grid' | 'noise'
}

export function GridBackground({
  className,
  dotColor = "rgba(255, 255, 255, 0.2)",
  size = 40,
  opacity = 0.05,
  dotSize = 1,
  variant = 'grid'
}: GridBackgroundProps) {
  // Use SVG for grid pattern to support dark mode and dynamic colors
  const gridPattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'%3E%3Cpath fill='${encodeURIComponent(dotColor)}' d='M${size-dotSize},0 L${size},0 L${size},${dotSize} L${size-dotSize},${dotSize} L${size-dotSize},0 M0,${size-dotSize} L0,${size} L${dotSize},${size} L${dotSize},${size-dotSize} L0,${size-dotSize}'/%3E%3C/svg%3E")`
  
  const dotsPattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'%3E%3Ccircle fill='${encodeURIComponent(dotColor)}' cx='${size/2}' cy='${size/2}' r='${dotSize}'/%3E%3C/svg%3E")`
  
  // Static noise texture
  const noiseStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noisy' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noisy)' opacity='${opacity}'/%3E%3C/svg%3E")`
  }
  
  let style: React.CSSProperties = {}
  
  if (variant === 'grid') {
    style = { 
      backgroundImage: gridPattern,
      opacity
    }
  } else if (variant === 'dots') {
    style = { 
      backgroundImage: dotsPattern,
      opacity
    }
  } else if (variant === 'noise') {
    style = noiseStyle
  }

  return (
    <div className={cn('absolute inset-0 pointer-events-none', className)} style={style} />
  )
}
