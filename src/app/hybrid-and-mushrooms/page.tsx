import React from 'react'
import type { Metadata, Viewport } from 'next'
import { 
  CategoryHero, 
  CategoryBenefits, 
  CategoryFeaturedProducts, 
  CategoryTestimonials,
  CategoryFaq,
  CategoryCta,
  HybridTheme 
} from '@/components/shared/category'
import { MushroomTableSection } from './components/MushroomTableSection'
import { ResearchSection } from './components/ResearchSection'
import { Newsletter } from '@/components/Newsletter'
import { hybridBenefitItems } from './data/benefits'
import { hybridProducts } from './data/products'
import { hybridTestimonials } from './data/testimonials'
import { hybridFaqs } from './data/faqs'

export const metadata: Metadata = {
  title: 'Hybrid & Mushroom Products',
  description: 'Discover our innovative hybrid CBD and functional mushroom products, combining the benefits of CBD with adaptogenic mushrooms.',
}

export const viewport: Viewport = {
  themeColor: "#8b5cf6", // Purple/blue for hybrid theme
  width: "device-width",
  initialScale: 1,
};

export default function HybridAndMushroomsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <CategoryHero 
        theme={HybridTheme}
        title="CBD +"
        highlightedText="Functional Mushrooms"
        description="Discover our unique blends combining the benefits of premium CBD with adaptogenic mushrooms for enhanced wellness support."
        primaryCta={{
          text: "Shop Hybrid Products",
          href: "/shop/category/hybrid"
        }}
        secondaryCta={{
          text: "Learn About Mushrooms",
          href: "/blog/functional-mushrooms"
        }}
        imageSrc="/images/tincture2.png"
        imageAlt="CBD and Mushroom Products"
      />
      <CategoryBenefits
        theme={HybridTheme}
        sectionTitle="The Power of Synergy"
        sectionDescription="Discover how combining CBD with functional mushrooms unlocks a unique spectrum of wellness benefits for mind and body"
        benefits={hybridBenefitItems}
        ctaText="Browse All Hybrid Products"
        ctaLink="/shop/category/hybrid"
      />
      <CategoryFeaturedProducts
        theme={HybridTheme}
        sectionTitle="Hybrid CBD & Mushroom Blends"
        sectionDescription="Our hybrid collection features premium CBD formulations enhanced with functional mushrooms for targeted benefits"
        products={hybridProducts}
        viewAllText="View All Hybrid Products"
        viewAllLink="/shop/category/hybrid"
      />
      <MushroomTableSection pageTheme={{
        colors: {
          primary: HybridTheme.colors.primary,
          accent: HybridTheme.colors.accent,
          border: 'border-indigo-200',
          borderHover: 'hover:border-indigo-300',
          background: 'from-indigo-50 to-white',
        },
        gradients: {
          section: 'bg-gradient-to-b from-indigo-50 to-white',
          button: 'bg-gradient-to-r from-indigo-600 to-indigo-500',
        }
      }} />
      <ResearchSection pageTheme={{
        colors: {
          primary: HybridTheme.colors.primary,
          accent: HybridTheme.colors.accent,
          border: 'border-indigo-200',
          borderHover: 'hover:border-indigo-300',
          background: 'from-indigo-50 to-white',
        },
        gradients: {
          section: 'bg-gradient-to-b from-indigo-50 to-white',
          button: 'bg-gradient-to-r from-indigo-600 to-indigo-500',
        }
      }} />
      <CategoryTestimonials
        theme={HybridTheme}
        sectionTitle="User Testimonials"
        sectionDescription="Hear from people who have experienced the synergistic benefits of our CBD and mushroom blends"
        testimonials={hybridTestimonials}
        displayType="carousel"
      />
      <CategoryFaq
        theme={HybridTheme}
        sectionTitle="Frequently Asked Questions"
        sectionDescription="Find answers to common questions about our CBD and functional mushroom hybrid products"
        faqs={hybridFaqs}
        accordionType="multiple"
        showAiChat={true}
        aiChatTitle="Ask Our Mushroom Experts"
        aiChatDescription="Have questions about which mushroom-CBD combination is right for your needs? Our experts are here to help!"
      />
      <CategoryCta 
        theme={HybridTheme}
        sectionTitle="Elevate Your Wellness Journey"
        sectionDescription="Experience the synergistic benefits of CBD and functional mushrooms in our premium hybrid formulations"
        ctaTitle="Ready to Discover the Synergy?"
        ctaDescription="Browse our hybrid collection or get personalized recommendations from our mushroom wellness experts"
        primaryCta={{
          text: "Shop Hybrid Collection",
          href: "/shop/category/hybrid"
        }}
        secondaryCta={{
          text: "Expert Consultation",
          href: "/mushroom-consultation"
        }}
        imageSrc="/images/tincture2.png"
        imageAlt="CBD and Mushroom Products Collection"
        badgeText="Synergistic Wellness"
      />
      <Newsletter 
        title="Join Our Mushroom & CBD Newsletter"
        description="Get the latest research, wellness tips, and exclusive offers for your functional mushroom and CBD journey."
        buttonText="Subscribe"
        backgroundColor="bg-gradient-to-r from-indigo-50 to-white"
        buttonClasses="bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white"
      />
    </main>
  )
} 