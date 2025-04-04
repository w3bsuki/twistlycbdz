import React from 'react'
import type { Metadata, Viewport } from 'next'
import { 
  CategoryHero, 
  CategoryBenefits, 
  CategoryFeaturedProducts, 
  CategoryTestimonials,
  CategoryFaq,
  CategoryCta,
  PetTheme 
} from '@/components/shared/category'
import { ResearchSection } from './components/ResearchSection'
import { CbdIngredientsSection } from './components/CbdIngredientsSection'
import { Newsletter } from '@/components/Newsletter'
import { petBenefits } from './data/benefits'
import { petProducts } from './data/products'
import { petTestimonials } from './data/testimonials'
import { petFaqs } from './data/faqs'

export const metadata: Metadata = {
  title: 'Pet CBD Products',
  description: 'Premium CBD products specially formulated for pets to support their health, mobility, and anxiety relief.',
}

export const viewport: Viewport = {
  themeColor: "#f59e0b", // Amber for pet theme
  width: "device-width",
  initialScale: 1,
};

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
        imageSrc="/images/logos/1.png"
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
      <CategoryFaq
        theme={PetTheme}
        sectionTitle="Frequently Asked Questions"
        sectionDescription="Everything you need to know about CBD for your pets"
        faqs={petFaqs}
        accordionType="single"
        showAiChat={false}
      />
      <CategoryCta 
        theme={PetTheme}
        sectionTitle="Support Your Pet's Wellness Today"
        sectionDescription="Discover premium CBD products specially formulated for pets to improve their quality of life"
        ctaTitle="Ready to Help Your Pet Feel Better?"
        ctaDescription="Browse our pet collection or get personalized recommendations from our pet wellness experts"
        primaryCta={{
          text: "Shop Pet CBD Products",
          href: "/shop/category/pet"
        }}
        secondaryCta={{
          text: "Read Pet Wellness Guide",
          href: "/blog/pet-wellness"
        }}
        imageSrc="/images/pet-oil.png"
        imageAlt="Happy pets with CBD products"
        badgeText="Pet Wellness"
      />
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