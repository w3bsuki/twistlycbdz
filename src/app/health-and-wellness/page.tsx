'use client'

import React from 'react'
import { 
  CategoryHero, 
  CategoryBenefits, 
  CategoryFeaturedProducts,
  CategoryTestimonials,
  HealthTheme 
} from '@/components/shared/category'
// Adjust imports to use a central index file
import {
  ConditionsTabs,
  CbdIngredientsSection,
  FaqSection,
  CtaSection
} from './components' // Assuming ./components/index.ts or similar exists
import { cbdBenefits } from './data/benefits'
import { healthProducts } from './data/products'
import { healthTestimonials } from './data/testimonials'

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
      <CategoryBenefits
        theme={HealthTheme}
        sectionTitle="Support Your Natural Balance"
        sectionDescription="Explore how high-quality CBD can contribute to your daily wellness routine and overall health"
        benefits={cbdBenefits}
        ctaText="Learn more about CBD science"
        ctaLink="/learn/cbd-science"
      />
      <CategoryFeaturedProducts
        theme={HealthTheme}
        sectionTitle="Wellness CBD Products"
        sectionDescription="Our health collection features CBD formulations designed specifically for wellness and natural health support"
        products={healthProducts}
        viewAllText="View All Health Products"
        viewAllLink="/shop?category=health"
      />
      <ConditionsTabs pageTheme={pageTheme} />
      <CbdIngredientsSection pageTheme={pageTheme} />
      <CategoryTestimonials
        theme={HealthTheme}
        sectionTitle="Customer Testimonials"
        sectionDescription="Read what our customers are saying about how our CBD products have improved their well-being"
        testimonials={healthTestimonials}
        displayType="slider"
      />
      <CtaSection pageTheme={pageTheme} />
      <FaqSection pageTheme={pageTheme} />
    </main>
  )
} 