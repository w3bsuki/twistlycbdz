import React from 'react'
import type { Metadata, Viewport } from 'next'
import { 
  CategoryHero, 
  CategoryBenefits, 
  CategoryFeaturedProducts, 
  CategoryTestimonials,
  CategoryFaq,
  CategoryCta,
  SportTheme 
} from '@/components/shared/category'
import { ResearchSection } from './components/ResearchSection'
import { CbdIngredientsSection } from './components/CbdIngredientsSection'
import { Newsletter } from '@/components/Newsletter'
import { sportBenefitItems } from './data/benefits'
import { sportProducts } from './data/products'
import { sportTestimonials } from './data/testimonials'
import { sportFaqs } from './data/faqs'

export const metadata: Metadata = {
  title: 'Sport & Recovery CBD Products',
  description: 'Elevate your athletic performance and recovery with our CBD products specially formulated for athletes and active lifestyles.',
}

export const viewport: Viewport = {
  themeColor: "#3b82f6", // Blue for sport theme
  width: "device-width",
  initialScale: 1,
};

export default function SportAndRecoveryPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <CategoryHero 
        theme={SportTheme}
        title="CBD For"
        highlightedText="Sport & Recovery"
        description="Enhance your athletic performance and speed up your recovery with our premium CBD products formulated specifically for active individuals."
        primaryCta={{
          text: "Shop Sport Products",
          href: "/shop/category/sport"
        }}
        secondaryCta={{
          text: "Learn About CBD For Athletes",
          href: "/blog/cbd-for-athletes"
        }}
        imageSrc="/images/logos/1.png"
        imageAlt="CBD Sport Products"
      />
      <CategoryBenefits
        theme={SportTheme}
        sectionTitle="Why Athletes Choose CBD"
        sectionDescription="CBD offers natural support for athletic performance and recovery without the side effects of traditional methods"
        benefits={sportBenefitItems}
        ctaText="Browse All Sport Products"
        ctaLink="/shop/category/sport"
      />
      <CategoryFeaturedProducts
        theme={SportTheme}
        sectionTitle="Premium Sport Products"
        sectionDescription="Specially formulated CBD for athletes and active individuals"
        products={sportProducts}
        viewAllText="View All Sport Products"
        viewAllLink="/shop/category/sport"
      />
      <ResearchSection pageTheme={{
        colors: {
          primary: SportTheme.colors.primary,
          secondary: SportTheme.colors.accent,
          accent: 'blue-400',
          border: 'border-blue-200',
          borderHover: 'hover:border-blue-300',
          background: 'from-blue-50 to-white',
        },
        gradients: {
          section: 'bg-gradient-to-b from-blue-50 to-white',
          button: 'bg-gradient-to-r from-blue-600 to-blue-500',
        }
      }} />
      <CbdIngredientsSection pageTheme={{
        colors: {
          primary: SportTheme.colors.primary,
          secondary: SportTheme.colors.accent,
          accent: 'blue-400',
          border: 'border-blue-200',
          borderHover: 'hover:border-blue-300',
          background: 'from-blue-50 to-white',
        },
        gradients: {
          section: 'bg-gradient-to-b from-blue-50 to-white',
          button: 'bg-gradient-to-r from-blue-600 to-blue-500',
        }
      }} />
      <CategoryTestimonials
        theme={SportTheme}
        sectionTitle="Athlete Testimonials"
        sectionDescription="Hear from athletes who have incorporated our CBD products into their training"
        testimonials={sportTestimonials}
        displayType="carousel"
      />
      <CategoryFaq
        theme={SportTheme}
        sectionTitle="Frequently Asked Questions"
        sectionDescription="Common questions about CBD for athletes and active individuals"
        faqs={sportFaqs}
        accordionType="multiple"
        showAiChat={true}
        aiChatTitle="Ask Our Sport Experts"
        aiChatDescription="Have questions about CBD for your training routine? Our experts are here to help!"
      />
      <CategoryCta 
        theme={SportTheme}
        sectionTitle="Enhance Your Performance Today"
        sectionDescription="Discover premium CBD products designed specifically for athletes and active individuals"
        ctaTitle="Ready to Improve Your Recovery?"
        ctaDescription="Browse our sport collection or get personalized recommendations from our athletic performance experts"
        primaryCta={{
          text: "Shop Sport Collection",
          href: "/shop/category/sport"
        }}
        secondaryCta={{
          text: "Speak With Expert",
          href: "/sport-consultation"
        }}
        imageSrc="/images/logos/1.png"
        imageAlt="CBD Sport Products"
        badgeText="Athletic Performance"
      />
      <Newsletter 
        title="Join Our Sport & Recovery Newsletter"
        description="Get the latest training tips, research, and exclusive offers for your athletic journey."
        buttonText="Subscribe"
        backgroundColor="bg-gradient-to-r from-blue-50 to-white"
        buttonClasses="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white"
      />
    </main>
  )
} 