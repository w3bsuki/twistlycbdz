'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Bot, ShoppingCart, Leaf } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { cn } from '@/lib/utils'
import { CategoryTheme } from './CategoryHero'

export interface CategoryCtaProps {
  theme: CategoryTheme;
  sectionTitle?: string;
  sectionDescription?: string;
  ctaTitle: string;
  ctaDescription: string;
  primaryCta: {
    text: string;
    href: string;
    icon?: React.ReactNode;
  };
  secondaryCta?: {
    text: string;
    href: string;
    icon?: React.ReactNode;
  };
  imageSrc: string;
  imageAlt: string;
  badgeText?: string;
  badgeIcon?: React.ReactNode;
  className?: string;
}

export function CategoryCta({
  theme,
  sectionTitle = "Take Action",
  sectionDescription = "Discover premium CBD products designed to improve quality of life",
  ctaTitle = "Ready to Experience the Benefits?",
  ctaDescription = "Browse our collection or get personalized recommendations from our experts.",
  primaryCta,
  secondaryCta,
  imageSrc,
  imageAlt,
  badgeText = "Take Action",
  badgeIcon = <Leaf className="h-3.5 w-3.5" />,
  className
}: CategoryCtaProps) {
  // Default icons if not provided
  const primaryIcon = primaryCta.icon || <ShoppingCart className="ml-1.5 h-4 w-4" />;
  const secondaryIcon = secondaryCta?.icon || <Bot className="ml-1.5 h-4 w-4" />;

  // Map theme color properties to actual tailwind classes
  const getClasses = () => {
    const { colors } = theme;
    
    return {
      section: cn(
        "py-6 relative overflow-hidden",
        colors.gradientFrom === 'green-50' ? 'bg-gradient-to-b from-green-50 to-white' :
        colors.gradientFrom === 'amber-50' ? 'bg-gradient-to-b from-amber-50 to-white' :
        colors.gradientFrom === 'blue-50' ? 'bg-gradient-to-b from-blue-50 to-white' :
        colors.gradientFrom === 'purple-50' ? 'bg-gradient-to-b from-purple-50 to-white' :
        colors.gradientFrom === 'indigo-50' ? 'bg-gradient-to-b from-indigo-50 to-white' :
        'bg-gradient-to-b from-gray-50 to-white'
      ),
      
      bgDecorationPrimary: cn(
        "absolute top-40 left-10 w-60 h-60 rounded-full opacity-20 blur-3xl",
        colors.background === 'green-100' ? 'bg-green-100' :
        colors.background === 'amber-100' ? 'bg-amber-100' :
        colors.background === 'blue-100' ? 'bg-blue-100' :
        colors.background === 'purple-100' ? 'bg-purple-100' :
        colors.background === 'indigo-100' ? 'bg-indigo-100' :
        'bg-gray-100'
      ),
      
      bgDecorationAccent: cn(
        "absolute bottom-20 right-10 w-60 h-60 rounded-full opacity-20 blur-3xl",
        colors.accent === 'emerald-500' ? 'bg-emerald-50' :
        colors.accent === 'amber-500' ? 'bg-amber-50' :
        colors.accent === 'blue-500' ? 'bg-blue-50' :
        colors.accent === 'purple-500' ? 'bg-purple-50' :
        colors.accent === 'violet-500' ? 'bg-violet-50' :
        'bg-gray-50'
      ),
      
      cardBorder: cn(
        "bg-white/80 backdrop-blur-sm border rounded-xl shadow-md p-4 overflow-hidden",
        colors.border === 'green-200' ? 'border-green-200' :
        colors.border === 'amber-200' ? 'border-amber-200' :
        colors.border === 'blue-200' ? 'border-blue-200' :
        colors.border === 'purple-200' ? 'border-purple-200' :
        colors.border === 'indigo-200' ? 'border-indigo-200' :
        'border-gray-200'
      ),
      
      badgeOuter: cn(
        "inline-flex bg-gradient-to-br to-white rounded-full shadow-sm p-1 border",
        colors.gradientFrom === 'green-50' ? 'from-green-50/80 border-green-200/40' :
        colors.gradientFrom === 'amber-50' ? 'from-amber-50/80 border-amber-200/40' :
        colors.gradientFrom === 'blue-50' ? 'from-blue-50/80 border-blue-200/40' :
        colors.gradientFrom === 'purple-50' ? 'from-purple-50/80 border-purple-200/40' :
        colors.gradientFrom === 'indigo-50' ? 'from-indigo-50/80 border-indigo-200/40' :
        'from-gray-50/80 border-gray-200/40'
      ),
      
      badgeInner: cn(
        "px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5 font-medium text-white bg-gradient-to-r",
        colors.primary === 'green-600' ? 'from-green-600 to-emerald-500' :
        colors.primary === 'amber-600' ? 'from-amber-600 to-amber-500' :
        colors.primary === 'blue-600' ? 'from-blue-600 to-blue-500' :
        colors.primary === 'purple-600' ? 'from-purple-600 to-purple-500' :
        colors.primary === 'indigo-600' ? 'from-indigo-600 to-violet-500' :
        'from-gray-600 to-gray-500'
      ),
      
      ctaContainer: cn(
        "bg-gradient-to-r rounded-lg p-6 shadow-lg text-white",
        colors.primary === 'green-600' ? 'from-green-600 to-emerald-500' :
        colors.primary === 'amber-600' ? 'from-amber-600 to-amber-500' :
        colors.primary === 'blue-600' ? 'from-blue-600 to-blue-500' :
        colors.primary === 'purple-600' ? 'from-purple-600 to-purple-500' :
        colors.primary === 'indigo-600' ? 'from-indigo-600 to-violet-500' :
        'from-gray-600 to-gray-500'
      ),
      
      primaryButton: cn(
        "bg-white hover:bg-opacity-90",
        colors.primary === 'green-600' ? 'text-green-800 hover:bg-green-50' :
        colors.primary === 'amber-600' ? 'text-amber-800 hover:bg-amber-50' :
        colors.primary === 'blue-600' ? 'text-blue-800 hover:bg-blue-50' :
        colors.primary === 'purple-600' ? 'text-purple-800 hover:bg-purple-50' :
        colors.primary === 'indigo-600' ? 'text-indigo-800 hover:bg-indigo-50' :
        'text-gray-800 hover:bg-gray-50'
      ),
      
      secondaryButton: cn(
        "border-white/50 text-white hover:bg-white/10"
      ),
      
      ctaText: cn(
        colors.primary === 'green-600' ? 'text-green-100' :
        colors.primary === 'amber-600' ? 'text-amber-100' :
        colors.primary === 'blue-600' ? 'text-blue-100' :
        colors.primary === 'purple-600' ? 'text-purple-100' :
        colors.primary === 'indigo-600' ? 'text-indigo-100' :
        'text-gray-100'
      )
    };
  };
  
  const classes = getClasses();

  return (
    <section 
      className={cn(classes.section, className)}
      id={`${theme.name.toLowerCase().replace(/[&\s]+/g, '-')}-cta`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={classes.bgDecorationPrimary}></div>
        <div className={classes.bgDecorationAccent}></div>
      </div>
      
      <Container className="relative z-10">
        <div className={classes.cardBorder}>
          <div className="text-center mb-4">
            <div className={classes.badgeOuter}>
              <div className={classes.badgeInner}>
                {badgeIcon}
                <span>{badgeText}</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3 mb-2">{sectionTitle}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base mb-4">
              {sectionDescription}
            </p>
          </div>
          
          <div className={classes.ctaContainer}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">{ctaTitle}</h3>
                <p className={cn("text-sm mb-4", classes.ctaText)}>
                  {ctaDescription}
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button 
                    className={classes.primaryButton} 
                    size="sm" 
                    asChild
                  >
                    <Link href={primaryCta.href}>
                      {primaryCta.text}
                      {primaryIcon}
                    </Link>
                  </Button>
                  
                  {secondaryCta && (
                    <Button 
                      variant="outline"
                      className={classes.secondaryButton} 
                      size="sm"
                      asChild
                    >
                      <Link href={secondaryCta.href}>
                        {secondaryCta.text}
                        {secondaryIcon}
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
              <div className="flex justify-center md:justify-end">
                <div className="relative h-[150px] w-[150px]">
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className="object-contain filter drop-shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
} 