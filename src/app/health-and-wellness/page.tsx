'use client'

import React from 'react'
import { CategoryHero, HealthTheme } from '@/components/shared/category'
// Adjust imports to use a central index file
import {
  BenefitsSection,
  FeaturedProducts,
  ConditionsTabs,
  CbdIngredientsSection,
  FaqSection,
  TestimonialsSection,
  CtaSection
} from './components' // Assuming ./components/index.ts or similar exists

// Theme configuration for health & wellness page (using green shades)
const pageTheme = {
  colors: {
    primary: 'green-600',
    secondary: 'emerald-500',
    accent: 'teal-400',
    border: 'border-green-200',
    borderHover: 'hover:border-green-300',
    background: 'from-green-50 to-white',
  },
  gradients: {
    section: 'bg-gradient-to-b from-green-50 to-white',
    button: 'bg-gradient-to-r from-green-600 to-emerald-500',
  }
}

export default function HealthAndWellnessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <CategoryHero 
        theme={HealthTheme}
        title="Find Your"
        highlightedText="Natural Balance"
        description="Discover our premium CBD wellness products designed to help you manage stress, improve sleep, and enhance your overall well-being."
        primaryCta={{
          text: "Shop Wellness Products",
          href: "/shop/category/health"
        }}
        secondaryCta={{
          text: "Learn About CBD Benefits",
          href: "/blog/cbd-for-wellness"
        }}
        imageSrc="/images/tincture2.png"
        imageAlt="CBD Health and Wellness Products"
      />
      <BenefitsSection pageTheme={pageTheme} />
      <FeaturedProducts pageTheme={pageTheme} />
      <ConditionsTabs pageTheme={pageTheme} />
      <CbdIngredientsSection pageTheme={pageTheme} />
      <TestimonialsSection pageTheme={pageTheme} />
      <CtaSection pageTheme={pageTheme} />
      <FaqSection pageTheme={pageTheme} />
    </main>
  )
} 