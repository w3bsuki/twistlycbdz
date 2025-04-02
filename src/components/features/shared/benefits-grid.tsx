'use client'

import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { 
  BaseComponentProps, 
  ColorScheme, 
  HeadingProps, 
  ThemeProps,
  AnimationProps
} from '@/types/component-props'

/**
 * Represents a single benefit item with title, description, and icon
 */
export interface Benefit {
  /** Title of the benefit */
  title: string
  /** Description text explaining the benefit */
  description: string
  /** Icon or image representing the benefit */
  icon: ReactNode
  /** Optional custom background color class */
  color?: string
}

/**
 * Props for the BenefitsGrid component
 */
export interface BenefitsGridProps extends BaseComponentProps, HeadingProps, ThemeProps {
  /** Array of benefit items to display */
  benefits: Benefit[]
  /** Number of columns on large screens (default: 4) */
  columns?: 2 | 3 | 4
  /** Whether to animate the items on view */
  animate?: boolean
}

/**
 * A grid layout component for displaying a list of benefits or features
 * with icons, titles, and descriptions
 */
export function BenefitsGrid({
  benefits,
  title,
  subtitle,
  className,
  colorScheme = 'default',
  columns = 4,
  animate = true,
  id,
  ariaLabel
}: BenefitsGridProps) {
  // Get the color scheme classes
  const getColorClasses = () => {
    switch (colorScheme) {
      case 'green':
        return {
          heading: 'text-green-800',
          subheading: 'text-green-600',
          cardBg: 'bg-green-50 border-green-100',
          title: 'text-green-700'
        }
      case 'blue':
        return {
          heading: 'text-blue-800',
          subheading: 'text-blue-600',
          cardBg: 'bg-blue-50 border-blue-100',
          title: 'text-blue-700'
        }
      case 'purple':
        return {
          heading: 'text-purple-800',
          subheading: 'text-purple-600',
          cardBg: 'bg-purple-50 border-purple-100',
          title: 'text-purple-700'
        }
      case 'amber':
        return {
          heading: 'text-amber-800',
          subheading: 'text-amber-600',
          cardBg: 'bg-amber-50 border-amber-100',
          title: 'text-amber-700'
        }
      default:
        return {
          heading: 'text-gray-800',
          subheading: 'text-gray-600',
          cardBg: 'bg-gray-50 border-gray-100',
          title: 'text-gray-700'
        }
    }
  }
  
  const colors = getColorClasses()
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  // Determine column classes based on columns prop
  const getColumnClasses = () => {
    switch (columns) {
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case 4:
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
    }
  }
  
  return (
    <section 
      id={id}
      aria-label={ariaLabel || "Benefits and features"} 
      className={cn("py-12", className)}
    >
      <div className="container mx-auto px-4 md:px-6">
        {(title || subtitle) && (
          <div className="text-center mb-8 md:mb-12">
            {subtitle && (
              <motion.p 
                className={cn("text-lg mb-2", colors.subheading)}
                initial={animate ? { opacity: 0, y: 10 } : { opacity: 1 }}
                whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {subtitle}
              </motion.p>
            )}
            
            {title && (
              <motion.h2 
                className={cn("text-2xl md:text-3xl lg:text-4xl font-bold", colors.heading)}
                initial={animate ? { opacity: 0, y: 10 } : { opacity: 1 }}
                whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {title}
              </motion.h2>
            )}
          </div>
        )}
        
        <motion.div 
          className={cn("grid gap-6", getColumnClasses())}
          variants={animate ? containerVariants : undefined}
          initial={animate ? "hidden" : "visible"}
          whileInView={animate ? "visible" : undefined}
          viewport={{ once: true }}
        >
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index} 
              variants={animate ? itemVariants : undefined}
              className={cn(
                "p-6 rounded-lg border transition-all duration-200 hover:shadow-md",
                benefit.color || colors.cardBg
              )}
            >
              <div className="mb-4">{benefit.icon}</div>
              <h3 className={cn("text-lg font-medium mb-2", colors.title)}>{benefit.title}</h3>
              <p className="text-gray-600 text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 