'use client'

import React from 'react'

// Import the section components
import { HeroSection } from './components/HeroSection'
import { BenefitsSection } from './components/BenefitsSection'
import { FeaturedProducts } from './components/FeaturedProducts'
import { ResearchSection } from './components/ResearchSection'
import { MushroomTableSection } from './components/MushroomTableSection'
import { TestimonialsSection } from './components/TestimonialsSection'
import { FaqSection } from './components/FaqSection'
import { CtaSection } from './components/CtaSection'

// Theme configuration for hybrid page
const pageTheme = {
  colors: {
    primary: 'amber-800',
    secondary: 'amber-600',
    accent: 'amber-400',
    border: 'border-amber-200',
    borderHover: 'hover:border-amber-300',
    background: 'from-amber-50 to-white',
  },
  gradients: {
    section: 'bg-gradient-to-b from-amber-50 to-white',
    button: 'bg-gradient-to-r from-amber-800 to-amber-700',
  }
}

export default function HybridAndMushroomsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <HeroSection pageTheme={pageTheme} />
      <BenefitsSection pageTheme={pageTheme} />
      <FeaturedProducts pageTheme={pageTheme} />
      <ResearchSection pageTheme={pageTheme} />
      <MushroomTableSection pageTheme={pageTheme} />
      <TestimonialsSection pageTheme={pageTheme} />
      <FaqSection pageTheme={pageTheme} />
      <CtaSection pageTheme={pageTheme} />
    </main>
  )
} 