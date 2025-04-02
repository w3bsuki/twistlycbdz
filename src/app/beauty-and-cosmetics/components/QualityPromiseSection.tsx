'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Sparkles, ArrowRight } from 'lucide-react' // Using Sparkles as in original

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

interface QualityPromiseSectionProps {
  pageTheme: PageTheme;
}

export function QualityPromiseSection({ pageTheme }: QualityPromiseSectionProps) {
  // Theme setup (simplified, using accent)
  const accentColor = pageTheme.colors.accent || 'fuchsia-400' 
  const accentColorName = accentColor.split('-')[0] // e.g., fuchsia
  const accentLight = `${accentColorName}-50`
  const accentLighter = `${accentColorName}-100`
  const accentLightest = `${accentColorName}-200`
  const accentMedium = `${accentColorName}-500` // For text/icons
  const accentDark = `${accentColorName}-600`
  const accentDarker = `${accentColorName}-700` // Adjusted for better contrast
  
  // Standard section variables (using accent base for decoration)
  const sectionBg = `bg-gradient-to-b from-white to-${accentLight}` // Adjusted gradient direction for variety
  const borderLight = `border-${accentLightest}` // Use accent-based border for wrapper
  const buttonGradient = pageTheme.gradients.button // Keep main button gradient

  return (
    // MATCH: Standard Section Styling (Padding, BG, Decorations)
    <section className={`py-6 relative overflow-hidden ${sectionBg}`}>
      {/* Decorations using accent color base */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-40 left-10 w-60 h-60 bg-${accentLighter} rounded-full opacity-20 blur-3xl`}></div>
        <div className={`absolute bottom-20 right-10 w-60 h-60 bg-${accentColorName}-50 rounded-full opacity-20 blur-3xl`}></div>
      </div>

      <Container className="relative z-10 max-w-5xl"> {/* Ensure consistent max-width */}
        {/* MATCH: Standard Container Wrapper (using accent border) */}
        <div className={`bg-white/80 backdrop-blur-sm ${borderLight} rounded-xl shadow-md p-4 overflow-hidden`}>
          {/* Keep internal structure: motion.div with flex layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            // Removed background/border from here - now part of outer wrapper
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="md:w-2/3">
                {/* Use accent colors for title/icon */}
                <h3 className={`text-lg font-bold mb-1.5 flex items-center gap-1.5 text-${accentDarker}`}> 
                  <Sparkles className={`h-4.5 w-4.5 text-${accentDark}`} />
                  Pure Ingredients, Proven Results
                </h3>
                <p className="text-gray-600 text-xs mb-2.5">
                  Our beauty products feature clean, plant-based ingredients and rigorously tested CBD for gentle, effective skincare you can trust.
                </p>
                {/* Use accent colors for badges */}
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="outline" className={`bg-white border-${accentLightest} text-${accentDarker} text-[10px]`}>Clean Formula</Badge>
                  <Badge variant="outline" className={`bg-white border-${accentLightest} text-${accentDarker} text-[10px]`}>Lab Tested CBD</Badge>
                  <Badge variant="outline" className={`bg-white border-${accentLightest} text-${accentDarker} text-[10px]`}>Cruelty-Free</Badge>
                  <Badge variant="outline" className={`bg-white border-${accentLightest} text-${accentDarker} text-[10px]`}>Natural Botanicals</Badge>
                </div>
              </div>
              <Button size="sm" className={`${buttonGradient} text-white text-xs h-8 px-3 mt-3 md:mt-0`}>
                <Link href="/lab-results" className="flex items-center">
                  View Lab Results <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
} 