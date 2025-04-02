'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  BaseComponentProps,
  ThemeProps,
  SizeProps,
  ActionProps,
  AnimationProps
} from '@/types/component-props'

/**
 * Props for the CTASection component
 */
export interface CTASectionProps extends BaseComponentProps, ThemeProps, Pick<SizeProps, 'size'>, Pick<ActionProps, 'actionHref'> {
  /** Main heading text for the CTA */
  title: string
  /** Optional descriptive text */
  description?: string
  /** Text to display on the button */
  buttonText: string
  /** Function to call when the button is clicked */
  buttonAction?: () => void
  /** URL to navigate to when the button is clicked */
  buttonHref?: string
  /** Whether to center the content */
  centered?: boolean
  /** Whether to show an arrow icon in the button */
  withArrow?: boolean
  /** Whether to show a background color */
  withBackground?: boolean
  /** Whether to animate the section */
  animate?: boolean
  /** Maximum width of the CTA content */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'none'
}

/**
 * A versatile call-to-action section with customizable styling and behavior
 */
export function CTASection({
  title,
  description,
  buttonText,
  buttonAction,
  buttonHref,
  className,
  colorScheme = 'default',
  size = 'md',
  centered = true,
  withArrow = true,
  withBackground = false,
  id,
  ariaLabel,
  animate = true,
  maxWidth = 'md'
}: CTASectionProps) {
  // Get the color scheme classes
  const getColorClasses = () => {
    switch (colorScheme) {
      case 'green':
        return {
          heading: 'text-green-800',
          description: 'text-green-600',
          button: 'bg-green-600 hover:bg-green-700 text-white',
          background: 'bg-green-50'
        }
      case 'blue':
        return {
          heading: 'text-blue-800',
          description: 'text-blue-600',
          button: 'bg-blue-600 hover:bg-blue-700 text-white',
          background: 'bg-blue-50'
        }
      case 'purple':
        return {
          heading: 'text-purple-800',
          description: 'text-purple-600',
          button: 'bg-purple-600 hover:bg-purple-700 text-white',
          background: 'bg-purple-50'
        }
      case 'amber':
        return {
          heading: 'text-amber-800',
          description: 'text-amber-700',
          button: 'bg-amber-600 hover:bg-amber-700 text-white',
          background: 'bg-amber-50'
        }
      default:
        return {
          heading: 'text-gray-800',
          description: 'text-gray-600',
          button: 'bg-gray-800 hover:bg-gray-900 text-white',
          background: 'bg-gray-50'
        }
    }
  }
  
  const colors = getColorClasses()
  
  // Get size classes
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          container: 'py-8',
          heading: 'text-xl md:text-2xl',
          description: 'text-sm',
          button: 'text-sm'
        }
      case 'lg':
        return {
          container: 'py-16 md:py-20',
          heading: 'text-3xl md:text-4xl lg:text-5xl',
          description: 'text-lg md:text-xl',
          button: 'text-lg px-8 py-6'
        }
      case 'md':
      default:
        return {
          container: 'py-12',
          heading: 'text-2xl md:text-3xl',
          description: 'text-base md:text-lg',
          button: 'text-base'
        }
    }
  }
  
  const sizeClasses = getSizeClasses()

  // Get max width classes
  const getMaxWidthClass = () => {
    switch (maxWidth) {
      case 'sm':
        return 'max-w-xl';
      case 'md':
        return 'max-w-2xl';
      case 'lg':
        return 'max-w-4xl';
      case 'xl':
        return 'max-w-6xl';
      case 'none':
        return '';
      default:
        return 'max-w-2xl';
    }
  }
  
  return (
    <section 
      id={id}
      aria-label={ariaLabel || "Call to action"} 
      className={cn(
        sizeClasses.container,
        withBackground ? colors.background : '',
        className
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={animate ? { opacity: 0, y: 20 } : { opacity: 1 }}
          whileInView={animate ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={cn(
            centered ? "text-center" : "text-left",
            centered ? "mx-auto" : "",
            getMaxWidthClass()
          )}
        >
          <h2 className={cn(
            "font-bold mb-4", 
            sizeClasses.heading,
            colors.heading
          )}>
            {title}
          </h2>
          
          {description && (
            <p className={cn(
              "mb-6", 
              sizeClasses.description,
              colors.description
            )}>
              {description}
            </p>
          )}
          
          <Button
            className={cn(
              sizeClasses.button,
              colors.button
            )}
            onClick={buttonAction}
            asChild={!!buttonHref}
          >
            {buttonHref ? (
              <a href={buttonHref} target={buttonHref?.startsWith('http') ? '_blank' : undefined} rel={buttonHref?.startsWith('http') ? 'noopener noreferrer' : undefined}>
                {buttonText}
                {withArrow && <ArrowRight className="ml-2 h-5 w-5" />}
              </a>
            ) : (
              <>
                {buttonText}
                {withArrow && <ArrowRight className="ml-2 h-5 w-5" />}
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </section>
  )
} 