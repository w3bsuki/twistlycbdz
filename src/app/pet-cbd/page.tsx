import React from 'react'
import { Metadata } from 'next'
import { 
  CategoryHero, 
  CategoryBenefits, 
  CategoryFeaturedProducts, 
  CategoryTestimonials,
  PetTheme 
} from '@/components/shared/category'
import { ResearchSection } from './components/ResearchSection'
import { CtaSection } from './components/CtaSection'
import { FaqSection } from './components/FaqSection'
import { CbdIngredientsSection } from './components/CbdIngredientsSection'
import { Newsletter } from '@/components/Newsletter'
import { petBenefits } from './data/benefits'
import { petProducts } from './data/products'
import { petTestimonials } from './data/testimonials'

export const metadata: Metadata = {
  title: 'Pet CBD - Twistly CBD',
  description: 'Premium CBD products specially formulated for your pets',
}

// Theme configuration for pet page
const pageTheme = {
  colors: {
    primary: 'amber-600',
    secondary: 'amber-500',
    accent: 'amber-400',
    border: 'border-amber-200',
    borderHover: 'hover:border-amber-300',
    background: 'from-amber-50 to-white',
  },
  gradients: {
    section: 'bg-gradient-to-b from-amber-50 to-white',
    button: 'bg-gradient-to-r from-amber-600 to-amber-500',
  }
}

export default function PetCBDPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <CategoryHero 
        theme={PetTheme}
        title="Premium CBD"
        highlightedText="For Your Beloved Pets"
        description="Help your pets live their best life with our premium THC-free CBD products designed specifically for their unique needs. Safe and effective for dogs, cats and more."
        primaryCta={{
          text: "Shop Pet Products",
          href: "/shop/category/pet"
        }}
        secondaryCta={{
          text: "Learn About CBD For Pets",
          href: "/blog/cbd-for-pets"
        }}
        imageSrc="/images/tincture2.png"
        imageAlt="CBD Products for Pets"
      />
      <CategoryBenefits
        theme={PetTheme}
        sectionTitle="Why Pet Owners Choose CBD"
        sectionDescription="CBD offers natural support for your pet's health and wellness without the side effects of many traditional medications"
        benefits={petBenefits}
        ctaText="Browse All Pet CBD Products"
        ctaLink="/shop/category/pet"
      />
      <CategoryFeaturedProducts
        theme={PetTheme}
        sectionTitle="Premium Pet CBD Products"
        sectionDescription="Specially formulated CBD for your pets' health and happiness"
        products={petProducts}
        viewAllText="View All Pet Products"
        viewAllLink="/shop/category/pet"
      />
      <ResearchSection pageTheme={pageTheme} />
      <CbdIngredientsSection pageTheme={pageTheme} />
      <CategoryTestimonials
        theme={PetTheme}
        sectionTitle="See How Our Products Help Pets Thrive"
        sectionDescription="Real stories from pet owners who have seen remarkable improvements in their pets' health and wellbeing"
        testimonials={petTestimonials}
        displayType="carousel"
      />
      <CtaSection pageTheme={pageTheme} />
      <FaqSection pageTheme={pageTheme} />
      <Newsletter 
        title="Join Our Pet Wellness Newsletter"
        description="Get the latest tips, research, and exclusive offers for your pet's CBD journey."
        buttonText="Subscribe"
        backgroundColor="bg-gradient-to-r from-amber-50 to-white"
        buttonClasses="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white"
      />
    </main>
  )
} 