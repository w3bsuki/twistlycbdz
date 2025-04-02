'use client'

import React from 'react'
import { 
  HeroSection, 
  BenefitsSection, 
  FeaturedProducts, 
  ResearchSection, 
  TestimonialsSection, 
  CtaSection,
  FaqSection,
  CbdIngredientsSection
} from './components'

// Theme configuration for sport page
const pageTheme = {
  colors: {
    primary: 'blue-600',
    secondary: 'cyan-500',
    accent: 'amber-400',
    border: 'border-blue-200',
    borderHover: 'hover:border-blue-300',
    background: 'from-blue-50 to-white',
  },
  gradients: {
    section: 'bg-gradient-to-b from-blue-50 to-white',
    button: 'bg-gradient-to-r from-blue-600 to-blue-500',
  }
}

export default function SportAndRecoveryPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <HeroSection pageTheme={pageTheme} />
      <BenefitsSection pageTheme={pageTheme} />
      <FeaturedProducts pageTheme={pageTheme} />
      <ResearchSection pageTheme={pageTheme} />
      <CbdIngredientsSection pageTheme={pageTheme} />
      <TestimonialsSection pageTheme={pageTheme} />
      <CtaSection pageTheme={pageTheme} />
      <FaqSection pageTheme={pageTheme} />
    </main>
  )
} 