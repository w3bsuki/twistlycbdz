'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/ui/container'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { InteractiveHeroCards } from '@/components/sections/InteractiveHeroCards'

// Define interfaces for props, similar to the old CBDHeroSection
interface HeroAction {
  text: string;
  href: string;
  icon?: React.ReactNode;
  variant?: "default" | "outline" | "secondary";
}

interface HomePageHeroProps {
  badge?: {
    text: string;
    action?: {
      text: string;
      href: string;
    };
  };
  title: string;
  description: string;
  actions?: HeroAction[]; // Make actions optional since we're removing them
  imageSrc?: string; // Optional image source
  imageAlt?: string; // Optional image alt text
}

// Define a neutral/default theme for the homepage hero
const homePageTheme = {
  colors: {
    primary: 'green-600',
    secondary: 'green-700',
    accent: 'emerald-500',
    border: 'green-200',
    borderHover: 'green-300',
    textPrimary: 'text-green-700',
    bgLight: 'bg-green-50',
    bgGradient: 'from-green-50 to-white',
    buttonGradient: 'bg-gradient-to-r from-green-600 to-emerald-500',
    buttonText: 'text-white',
    buttonOutlineBorder: 'border-green-200',
    buttonOutlineText: 'text-green-700',
    buttonOutlineHoverBg: 'hover:bg-green-50',
  },
}

export function HomePageHeroSection({ 
  badge, 
  title, 
  description, 
  actions,
  imageSrc = "/images/logos/1.png",
  imageAlt = "Twistly CBD Logo" 
}: HomePageHeroProps) {
  
  return (
    <section className="relative bg-gradient-to-b from-green-50 to-white min-h-[90vh] sm:min-h-[85vh] flex items-start sm:items-center justify-center pt-4 pb-10">
      {/* Background decoration - simplified for mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full opacity-30 blur-3xl bg-green-500/40"></div>
        <div className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full opacity-30 blur-3xl bg-emerald-500/30"></div>
      </div>
      
      {/* Main container - optimized for mobile and desktop */}
      <Container className="relative z-10 bg-white/95 backdrop-blur-sm rounded-xl shadow-md border border-green-200/90 p-5 sm:p-8 w-full max-w-6xl mx-auto mt-2 mb-8">
        {/* Optional Badge */}
        {badge && (
          <div className="flex justify-center mb-4 sm:mb-6">
             <div className="inline-flex bg-gradient-to-br from-green-50/80 to-white rounded-full border border-green-200/40 shadow-sm p-1">
               <div className="bg-gradient-to-r from-green-600 to-emerald-500 px-3 py-1.5 rounded-full shadow-sm flex items-center gap-2">
                  <div className="relative h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ 
                        duration: 20, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }}
                      className="h-full w-full"
                    >
                      <Image
                        src="/images/logos/1.png"
                        alt="Twistly Logo"
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </motion.div>
                  </div>
                  <span className="font-normal text-white text-xs sm:text-sm">{badge.text}</span>
                  {badge.action && (
                    <Link href={badge.action.href} className="ml-2 text-white font-medium flex items-center text-sm">
                      {badge.action.text} <ArrowRight className="inline h-3.5 w-3.5 ml-0.5" />
                    </Link>
                  )}
               </div>
             </div>
          </div>
        )}

        {/* Content container */}
        <div className="text-center">
          {/* Title and description */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            {title}
          </h1>
          
          <p className="text-base sm:text-lg text-gray-700 mx-auto max-w-3xl mb-6 sm:mb-8">
            {description}
          </p>
          
          {/* Interactive Hero Cards */}
          <div className="mt-4 sm:mt-6">
            <InteractiveHeroCards />
          </div>
        </div>
      </Container>
    </section>
  )
} 