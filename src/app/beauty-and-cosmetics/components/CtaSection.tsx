'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { ArrowRight, ShoppingCart, Bot, Sparkles } from 'lucide-react'

// Theme interface
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

interface CtaSectionProps {
  pageTheme: PageTheme;
}

export function CtaSection({ pageTheme }: CtaSectionProps) {
  // Theme setup
  const primaryColor = pageTheme.colors.primary || 'pink-600'
  const primaryColorName = primaryColor.split('-')[0]
  const primaryLight = `${primaryColorName}-50`
  const primaryLighter = `${primaryColorName}-100`
  const primaryLightest = `${primaryColorName}-200`
  const primaryDark = `${primaryColorName}-700`

  const sectionBg = `bg-gradient-to-b from-${primaryLight} to-white`
  const borderLight = `border-${primaryLightest}`
  const buttonGradient = pageTheme.gradients.button
  const textPrimaryDark = `text-${primaryDark}`
  const textOnButtonGradient = 'text-white' // Assuming button gradient is dark enough for white text
  const textOnButtonGradientLight = `text-${primaryColorName}-100` // Lighter text for contrast

  return (
    <section className={`py-6 relative overflow-hidden ${sectionBg}`} id="cta">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-40 left-10 w-60 h-60 bg-${primaryLighter} rounded-full opacity-20 blur-3xl`}></div>
        <div className={`absolute bottom-20 right-10 w-60 h-60 bg-${primaryColorName}-50 rounded-full opacity-20 blur-3xl`}></div>
      </div>
      
      <Container className="relative z-10">
        <div className={`bg-white/80 backdrop-blur-sm ${borderLight} rounded-xl shadow-md p-4 overflow-hidden`}>
          <div className="text-center mb-4">
            <div className={`inline-flex bg-gradient-to-br from-${primaryLight}/80 to-white rounded-full border ${borderLight}/40 shadow-sm p-1`}>
              <div className={`${buttonGradient} text-white px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5 font-medium`}>
                <Sparkles className="h-3.5 w-3.5" />
                <span>Get Started</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3 mb-2">Ready to Reveal Your Natural Radiance?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base mb-4">
              Explore our premium CBD-infused beauty products and discover the difference nature makes.
            </p>
          </div>
          
          <div className={`${buttonGradient} rounded-lg p-6 shadow-lg`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className={`text-xl font-semibold ${textOnButtonGradient} mb-3`}>Experience Glowing Skin</h3>
                <p className={`${textOnButtonGradientLight} text-sm mb-4`}>
                  Browse our curated beauty collection or get answers to your skincare questions.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button 
                    className={`bg-white ${textPrimaryDark} hover:bg-${primaryLight}`} 
                    size="sm" 
                    asChild
                  >
                    <Link href="/shop/category/beauty">
                      <span className="flex items-center">
                        Shop Beauty Collection
                        <ShoppingCart className="ml-1.5 h-4 w-4" />
                      </span>
                    </Link>
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-white/50 text-white hover:bg-white/10" 
                    size="sm"
                    asChild
                  >
                    <Link href="#faq">
                       <span className="flex items-center">
                         Ask Beauty Questions
                         <Bot className="ml-1.5 h-4 w-4" />
                       </span>
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex justify-center md:justify-end">
                <div className="relative h-[150px] w-[150px]">
                  <Image
                    src="/images/tincture2.png"
                    alt="CBD Beauty Products CTA"
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