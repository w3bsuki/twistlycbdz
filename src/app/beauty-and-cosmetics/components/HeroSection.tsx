'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

interface PageTheme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    border: string;
    borderHover: string;
    background: string;
  };
  gradients: {
    section: string;
    button: string;
  };
}

interface HeroSectionProps {
  pageTheme: PageTheme;
}

export function HeroSection({ pageTheme }: HeroSectionProps) {
  const primaryColor = pageTheme.colors.primary || 'pink-600'
  const secondaryColor = pageTheme.colors.secondary || 'rose-500'
  const primaryColorName = primaryColor.split('-')[0]

  const primaryLight = `${primaryColorName}-50`
  const primaryLighter = `${primaryColorName}-100`
  const primaryLightest = `${primaryColorName}-200`
  const primaryMedium = `${primaryColorName}-500`
  const primaryDark = `${primaryColorName}-700`
  const primaryDarker = `${primaryColorName}-800`
  
  const sectionBg = pageTheme.gradients.section || `bg-gradient-to-b from-${primaryLight} to-white`
  const borderLight = `border-${primaryLightest}`
  const buttonGradient = pageTheme.gradients.button || `bg-gradient-to-r from-${primaryColor} to-${secondaryColor}`
  const textGradient = `bg-gradient-to-r from-${primaryDark} to-${secondaryColor.replace('500','600')}`
  const buttonPrimaryBg = `bg-${primaryColor}`
  const buttonPrimaryHover = `hover:bg-${primaryDark}`

  return (
    <section className={`py-6 relative overflow-hidden ${sectionBg}`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-40 right-10 w-60 h-60 bg-${primaryLighter} rounded-full opacity-20 blur-3xl`}></div>
        <div className={`absolute bottom-20 left-10 w-60 h-60 bg-${primaryColorName}-50 rounded-full opacity-20 blur-3xl`}></div>
      </div>
      
      <Container className="relative z-10">
        <div className={`bg-white/80 backdrop-blur-sm ${borderLight} rounded-xl shadow-md p-4 overflow-hidden`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center lg:text-left"
            >
              <div className={`inline-flex bg-gradient-to-br from-${primaryLight}/80 to-white rounded-full border ${borderLight}/40 shadow-sm p-1`}>
                <div className={`${buttonGradient} text-white px-4 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 font-medium`}>
                  <span>Beauty & Cosmetics</span>
                </div>
              </div>
              
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-3 mb-2">
                Radiant Skin With
                <span className={`bg-clip-text text-transparent bg-gradient-to-r from-pink-700 to-rose-600`}>CBD Beauty</span>
              </h1>
              
              <p className={`text-gray-600 text-sm md:text-base mb-4 max-w-xl mx-auto lg:mx-0`}>
                Discover premium CBD-infused beauty products designed to nourish, protect, and rejuvenate your skin naturally.
              </p>
              
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <Button 
                  className={`${buttonPrimaryBg} ${buttonPrimaryHover} text-white`} 
                  size="sm" 
                  asChild
                >
                  <Link href="/shop/category/beauty">
                    <span className="flex items-center">
                      Shop Beauty Products
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </span>
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  className={`${borderLight} text-${primaryDark} hover:bg-${primaryLight}`} 
                  size="sm"
                  asChild
                >
                  <Link href="/blog/cbd-skincare-guide">
                    Learn About CBD Skincare
                  </Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative h-[250px] lg:h-[300px] flex justify-center mt-4 lg:mt-0"
            >
              <Image
                src="/images/tincture2.png"
                alt="CBD Beauty and Cosmetics Products"
                fill
                className="object-contain"
              />
              <div className={`absolute -bottom-6 left-0 right-0 mx-auto w-[90%] h-16 bg-gradient-to-r from-${primaryLighter} to-${primaryLight} blur-3xl rounded-full opacity-70`}></div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
} 