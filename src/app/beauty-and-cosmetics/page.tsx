'use client'

import React from 'react'
import {
  HeroSection, 
  BenefitsSection, 
  FeaturedProducts, 
  TestimonialsSection, 
  QualityPromiseSection, 
  CtaSection,
  FaqSection,
  CbdIngredientsSection
} from './components'

// Theme configuration for beauty page (using pink shades)
const pageTheme = {
  colors: {
    primary: 'pink-600',
    secondary: 'rose-500',
    accent: 'fuchsia-400',
    border: 'border-pink-200',
    borderHover: 'hover:border-pink-300',
    background: 'from-pink-50 to-white',
  },
  gradients: {
    section: 'bg-gradient-to-b from-pink-50 to-white',
    button: 'bg-gradient-to-r from-pink-600 to-rose-500',
  }
}

export default function BeautyAndCosmeticsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <HeroSection pageTheme={pageTheme} />
      <BenefitsSection pageTheme={pageTheme} />
      <FeaturedProducts pageTheme={pageTheme} />
      <CbdIngredientsSection pageTheme={pageTheme} />
      <TestimonialsSection pageTheme={pageTheme} />
      <QualityPromiseSection pageTheme={pageTheme} />
      <CtaSection pageTheme={pageTheme} />
      <FaqSection pageTheme={pageTheme} />
    </main>
  )
} 