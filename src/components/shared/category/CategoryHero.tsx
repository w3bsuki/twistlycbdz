'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { cn } from '@/lib/utils'

export interface CategoryTheme {
  name: string;
  colors: {
    primary: string;
    accent: string;
    border: string;
    background: string;
    gradientFrom: string;
    gradientTo: string;
    buttonText: string;
    buttonBg: string;
    buttonHoverBg: string;
    outlineBorder: string;
    outlineText: string;
    outlineHoverBg: string;
  }
}

export interface CategoryHeroProps {
  theme: CategoryTheme;
  title: string;
  highlightedText: string;
  description: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta: {
    text: string;
    href: string;
  };
  imageSrc: string;
  imageAlt: string;
  className?: string;
}

export function CategoryHero({
  theme,
  title,
  highlightedText,
  description,
  primaryCta,
  secondaryCta,
  imageSrc,
  imageAlt,
  className
}: CategoryHeroProps) {
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
        "absolute top-40 right-10 w-60 h-60 rounded-full opacity-20 blur-3xl",
        colors.background === 'green-100' ? 'bg-green-100' :
        colors.background === 'amber-100' ? 'bg-amber-100' :
        colors.background === 'blue-100' ? 'bg-blue-100' :
        colors.background === 'purple-100' ? 'bg-purple-100' :
        colors.background === 'indigo-100' ? 'bg-indigo-100' :
        'bg-gray-100'
      ),
      
      bgDecorationAccent: cn(
        "absolute bottom-20 left-10 w-60 h-60 rounded-full opacity-20 blur-3xl",
        colors.accent === 'emerald-500' ? 'bg-emerald-50' :
        colors.accent === 'amber-500' ? 'bg-amber-50' :
        colors.accent === 'blue-500' ? 'bg-blue-50' :
        colors.accent === 'purple-500' ? 'bg-purple-50' :
        colors.accent === 'violet-500' ? 'bg-violet-50' :
        'bg-gray-50'
      ),
      
      cardBorder: cn(
        "bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 overflow-hidden border",
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
        "px-4 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 font-medium text-white bg-gradient-to-r",
        colors.primary === 'green-600' ? 'from-green-600 to-emerald-500' :
        colors.primary === 'amber-600' ? 'from-amber-600 to-amber-500' :
        colors.primary === 'blue-600' ? 'from-blue-600 to-blue-500' :
        colors.primary === 'purple-600' ? 'from-purple-600 to-purple-500' :
        colors.primary === 'indigo-600' ? 'from-indigo-600 to-violet-500' :
        'from-gray-600 to-gray-500'
      ),
      
      titleHighlight: cn(
        "bg-clip-text text-transparent bg-gradient-to-r",
        colors.primary === 'green-600' ? 'from-green-700 to-green-500' :
        colors.primary === 'amber-600' ? 'from-amber-700 to-amber-500' :
        colors.primary === 'blue-600' ? 'from-blue-700 to-blue-500' :
        colors.primary === 'purple-600' ? 'from-purple-700 to-purple-500' :
        colors.primary === 'indigo-600' ? 'from-indigo-700 to-violet-500' :
        'from-gray-700 to-gray-500'
      ),
      
      primaryButton: cn(
        "text-white",
        colors.buttonBg === 'green-600' ? 'bg-green-600 hover:bg-green-700' :
        colors.buttonBg === 'amber-600' ? 'bg-amber-600 hover:bg-amber-700' :
        colors.buttonBg === 'blue-600' ? 'bg-blue-600 hover:bg-blue-700' :
        colors.buttonBg === 'purple-600' ? 'bg-purple-600 hover:bg-purple-700' :
        colors.buttonBg === 'indigo-600' ? 'bg-indigo-600 hover:bg-indigo-700' :
        'bg-gray-600 hover:bg-gray-700'
      ),
      
      secondaryButton: cn(
        colors.outlineBorder === 'green-200' ? 'border-green-200 text-green-700 hover:bg-green-50' :
        colors.outlineBorder === 'amber-200' ? 'border-amber-200 text-amber-700 hover:bg-amber-50' :
        colors.outlineBorder === 'blue-200' ? 'border-blue-200 text-blue-700 hover:bg-blue-50' :
        colors.outlineBorder === 'purple-200' ? 'border-purple-200 text-purple-700 hover:bg-purple-50' :
        colors.outlineBorder === 'indigo-200' ? 'border-indigo-200 text-indigo-700 hover:bg-indigo-50' :
        'border-gray-200 text-gray-700 hover:bg-gray-50'
      ),
      
      imageGlow: cn(
        "absolute -bottom-6 left-0 right-0 mx-auto w-[90%] h-16 blur-3xl rounded-full opacity-70 bg-gradient-to-r",
        colors.gradientFrom === 'green-50' ? 'from-green-100 to-green-50/50' :
        colors.gradientFrom === 'amber-50' ? 'from-amber-100 to-amber-50/50' :
        colors.gradientFrom === 'blue-50' ? 'from-blue-100 to-blue-50/50' :
        colors.gradientFrom === 'purple-50' ? 'from-purple-100 to-purple-50/50' :
        colors.gradientFrom === 'indigo-50' ? 'from-indigo-100 to-indigo-50/50' :
        'from-gray-100 to-gray-50/50'
      )
    };
  };
  
  const classes = getClasses();

  return (
    <section className={cn(classes.section, className)}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={classes.bgDecorationPrimary}></div>
        <div className={classes.bgDecorationAccent}></div>
      </div>
      
      <Container className="relative z-10">
        <div className={classes.cardBorder}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center lg:text-left"
            >
              <div className={classes.badgeOuter}>
                <div className={classes.badgeInner}>
                  <span>{theme.name}</span>
                </div>
              </div>
              
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-3 mb-2">
                {title} <span className={classes.titleHighlight}>{highlightedText}</span>
              </h1>
              
              <p className="text-gray-600 text-sm md:text-base mb-4 max-w-xl mx-auto lg:mx-0">
                {description}
              </p>
              
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <Button 
                  className={classes.primaryButton}
                  size="sm" 
                  asChild
                >
                  <Link href={primaryCta.href}>
                    {primaryCta.text}
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  className={classes.secondaryButton}
                  size="sm"
                  asChild
                >
                  <Link href={secondaryCta.href}>
                    {secondaryCta.text}
                  </Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative h-[250px] lg:h-[300px] flex justify-center"
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-contain"
              />
              <div className={classes.imageGlow}></div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
} 