'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  BaseComponentProps,
  ActionProps,
  SecondaryActionProps,
  AnimationProps
} from '@/types/component-props'

/**
 * Props for the PetHeroSection component
 */
export interface HeroSectionProps extends BaseComponentProps, ActionProps, SecondaryActionProps {
  /** Main title displayed in the hero section */
  title?: string
  /** Subtitle that appears in the badge */
  subtitle?: string
  /** Descriptive text about the products/services */
  description?: string
  /** URL of the hero section image */
  imageUrl?: string
  /** Text for the primary action button */
  primaryButtonText?: string
  /** Function called when primary button is clicked */
  primaryButtonAction?: () => void
  /** Text for the secondary action button */
  secondaryButtonText?: string
  /** Function called when secondary button is clicked */
  secondaryButtonAction?: () => void
  /** Array of feature strings to display with checkmarks */
  features?: string[]
  /** Whether to animate the hero section elements */
  animate?: boolean
  /** Background color class for the hero section */
  bgColor?: string
  /** Color theme for buttons and accents */
  accentColor?: string
  /** Alt text for the hero image */
  imageAlt?: string
  /** Whether to show the gradient overlay on the image */
  imageOverlay?: boolean
}

/**
 * A hero section component specifically designed for pet-related content
 */
export function PetHeroSection({
  title = "Premium CBD Products for Pets",
  subtitle = "Naturally Supporting Your Pet's Wellness",
  description = "Our veterinarian-developed CBD formulations help manage your pet's anxiety, joint discomfort, and overall well-being with natural, THC-free ingredients they'll love.",
  imageUrl = "/images/pet-hero.jpg",
  primaryButtonText = "Shop Pet CBD",
  primaryButtonAction,
  secondaryButtonText = "Learn More",
  secondaryButtonAction,
  features = [
    "Vet-formulated for pets",
    "THC-free, safe formulations",
    "Third-party tested",
    "Made in the USA"
  ],
  id,
  className,
  ariaLabel,
  animate = true,
  bgColor = "bg-amber-50",
  accentColor = "amber",
  imageAlt = "Pet CBD products",
  imageOverlay = true
}: HeroSectionProps) {
  // Determine color classes based on accentColor
  const getColorClasses = () => {
    switch (accentColor) {
      case 'green':
        return {
          badge: "bg-green-600 text-white hover:bg-green-700",
          title: "text-green-900",
          button: "bg-green-600 hover:bg-green-700 text-white",
          buttonOutline: "border-green-600 text-green-600 hover:bg-green-50",
          icon: "text-green-600",
          overlay: "from-green-900/30"
        };
      case 'blue':
        return {
          badge: "bg-blue-600 text-white hover:bg-blue-700",
          title: "text-blue-900",
          button: "bg-blue-600 hover:bg-blue-700 text-white",
          buttonOutline: "border-blue-600 text-blue-600 hover:bg-blue-50",
          icon: "text-blue-600",
          overlay: "from-blue-900/30"
        };
      case 'purple':
        return {
          badge: "bg-purple-600 text-white hover:bg-purple-700",
          title: "text-purple-900",
          button: "bg-purple-600 hover:bg-purple-700 text-white",
          buttonOutline: "border-purple-600 text-purple-600 hover:bg-purple-50",
          icon: "text-purple-600",
          overlay: "from-purple-900/30"
        };
      case 'amber':
      default:
        return {
          badge: "bg-amber-600 text-white hover:bg-amber-700",
          title: "text-amber-900",
          button: "bg-amber-600 hover:bg-amber-700 text-white",
          buttonOutline: "border-amber-600 text-amber-600 hover:bg-amber-50",
          icon: "text-amber-600",
          overlay: "from-amber-900/30"
        };
    }
  };

  const colors = getColorClasses();

  return (
    <section 
      id={id}
      aria-label={ariaLabel || "Pet CBD products"}
      className={`relative overflow-hidden py-12 md:py-20 ${bgColor} ${className || ''}`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* Text content */}
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <motion.div
                initial={animate ? { opacity: 0, y: 20 } : { opacity: 1 }}
                animate={animate ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.5 }}
              >
                <Badge className={`${colors.badge} mb-2`}>{subtitle}</Badge>
              </motion.div>
              
              <motion.h1 
                className={`text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl/tight ${colors.title}`}
                initial={animate ? { opacity: 0, y: 20 } : { opacity: 1 }}
                animate={animate ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {title}
              </motion.h1>
              
              <motion.p 
                className="max-w-[600px] text-gray-600 md:text-xl dark:text-gray-400"
                initial={animate ? { opacity: 0, y: 20 } : { opacity: 1 }}
                animate={animate ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {description}
              </motion.p>
            </div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 min-[400px]:flex-row"
              initial={animate ? { opacity: 0, y: 20 } : { opacity: 1 }}
              animate={animate ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button 
                className={colors.button}
                onClick={primaryButtonAction}
              >
                {primaryButtonText} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              {secondaryButtonText && (
                <Button 
                  variant="outline" 
                  className={colors.buttonOutline}
                  onClick={secondaryButtonAction}
                >
                  {secondaryButtonText}
                </Button>
              )}
            </motion.div>
            
            <motion.div 
              className="flex flex-col gap-2 mt-4"
              initial={animate ? { opacity: 0, y: 20 } : { opacity: 1 }}
              animate={animate ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className={`h-5 w-5 ${colors.icon} flex-shrink-0`} />
                  <span className="text-gray-600">{feature}</span>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Image container */}
          <motion.div 
            className="flex items-center justify-center overflow-hidden rounded-lg"
            initial={animate ? { opacity: 0, x: 20 } : { opacity: 1 }}
            animate={animate ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative aspect-square w-full max-w-[500px] overflow-hidden rounded-xl">
              <Image 
                src={imageUrl} 
                alt={imageAlt} 
                fill
                className="object-cover"
                priority
              />
              {imageOverlay && (
                <div className={`absolute inset-0 bg-gradient-to-t ${colors.overlay} to-transparent`} />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 