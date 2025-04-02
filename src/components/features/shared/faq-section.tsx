'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import {
  BaseComponentProps,
  ColorScheme,
  HeadingProps,
  ThemeProps,
  ExpandableProps,
  AnimationProps
} from '@/types/component-props'

/**
 * Represents a single FAQ item with question and answer
 */
export interface FAQItem {
  /** The question text */
  question: string
  /** The answer text, can include HTML markup */
  answer: string
  /** Optional unique identifier */
  id?: string
}

/**
 * Props for the FAQSection component
 */
export interface FAQSectionProps extends BaseComponentProps, HeadingProps, ThemeProps, Pick<ExpandableProps, 'defaultExpanded'> {
  /** Array of FAQ items to display */
  faqs: FAQItem[]
  /** Value of the default expanded accordion item */
  defaultValue?: string
  /** Whether to show the background and shadow styling */
  withBackground?: boolean
  /** Whether to animate the section */
  animate?: boolean
  /** Maximum width of the FAQ container */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

/**
 * A responsive FAQ section component with accordion functionality
 */
export function FAQSection({
  faqs,
  title = "Frequently Asked Questions",
  subtitle,
  className,
  colorScheme = 'default',
  defaultValue,
  id,
  ariaLabel,
  withBackground = true,
  animate = true,
  maxWidth = 'md'
}: FAQSectionProps) {
  // Get the color scheme classes
  const getColorClasses = () => {
    switch (colorScheme) {
      case 'green':
        return {
          heading: 'text-green-800',
          subheading: 'text-green-600',
          accordionTitle: 'text-green-700',
          accordionOpen: 'text-green-500'
        }
      case 'blue':
        return {
          heading: 'text-blue-800',
          subheading: 'text-blue-600',
          accordionTitle: 'text-blue-700',
          accordionOpen: 'text-blue-500'
        }
      case 'purple':
        return {
          heading: 'text-purple-800',
          subheading: 'text-purple-600',
          accordionTitle: 'text-purple-700',
          accordionOpen: 'text-purple-500'
        }
      case 'amber':
        return {
          heading: 'text-amber-800',
          subheading: 'text-amber-600',
          accordionTitle: 'text-amber-700',
          accordionOpen: 'text-amber-500'
        }
      default:
        return {
          heading: 'text-gray-800',
          subheading: 'text-gray-600',
          accordionTitle: 'text-gray-700',
          accordionOpen: 'text-gray-500'
        }
    }
  }
  
  const colors = getColorClasses()

  // Determine max width class
  const getMaxWidthClass = () => {
    switch (maxWidth) {
      case 'sm':
        return 'max-w-2xl';
      case 'md':
        return 'max-w-4xl';
      case 'lg':
        return 'max-w-6xl';
      case 'xl':
        return 'max-w-7xl';
      case 'full':
        return '';
      default:
        return 'max-w-4xl';
    }
  }
  
  return (
    <section 
      id={id}
      aria-label={ariaLabel || "Frequently asked questions"} 
      className={cn("py-12", className)}
    >
      <div className={cn("container mx-auto px-4 md:px-6", getMaxWidthClass())}>
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
          initial={animate ? { opacity: 0, y: 20 } : { opacity: 1 }}
          whileInView={animate ? { opacity: 1, y: 0 } : undefined}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Accordion 
            type="single" 
            collapsible 
            defaultValue={defaultValue}
            className={cn(
              withBackground ? "bg-white rounded-lg shadow-sm" : ""
            )}
          >
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={faq.id || index} 
                value={faq.id || `item-${index}`}
                className={cn(
                  index === 0 && withBackground ? "rounded-t-lg" : "",
                  index === faqs.length - 1 && withBackground ? "rounded-b-lg" : ""
                )}
              >
                <AccordionTrigger className={colors.accordionTitle}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="text-gray-600 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
} 