import React from 'react'
import type { Metadata, Viewport } from 'next'
import { 
  CategoryHero, 
  CategoryBenefits, 
  CategoryFeaturedProducts, 
  CategoryTestimonials,
  CategoryFaq,
  CategoryCta,
  HealthTheme 
} from '@/components/shared/category'
import { AiChatSection } from './components/AiChatSection'
import { Newsletter } from '@/components/Newsletter'
import { cbdBenefits } from './data/benefits'
import { healthProducts } from './data/products'
import { healthTestimonials } from './data/testimonials'
import { healthFaqs } from './data/faqs'

export const metadata: Metadata = {
  title: 'Health & Wellness CBD Products',
  description: 'Explore our premium CBD products designed to support your wellness journey, including oils, tinctures, and supplements for overall health.',
}

export const viewport: Viewport = {
  themeColor: "#22c55e", // Green for health theme
  width: "device-width",
  initialScale: 1,
};

export default function HealthAndWellnessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <CategoryHero 
        theme={HealthTheme}
        title="CBD For"
        highlightedText="Health & Wellness"
        description="Enhance your daily wellness routine with our premium CBD products specially formulated to support your health goals naturally."
        primaryCta={{
          text: "Shop Health Products",
          href: "/shop/category/health"
        }}
        secondaryCta={{
          text: "Learn About CBD Benefits",
          href: "/blog/cbd-health-benefits"
        }}
        imageSrc="/images/logos/1.png"
        imageAlt="CBD Health Products"
      />
      <CategoryBenefits
        theme={HealthTheme}
        sectionTitle="CBD for Wellness"
        sectionDescription="CBD offers natural support for various aspects of your health without the side effects of many traditional options"
        benefits={cbdBenefits}
        ctaText="Browse All Wellness Products"
        ctaLink="/shop/category/health"
      />
      <CategoryFeaturedProducts
        theme={HealthTheme}
        sectionTitle="Premium Health Products"
        sectionDescription="Specially formulated CBD for your health and wellness journey"
        products={healthProducts}
        viewAllText="View All Health Products"
        viewAllLink="/shop/category/health"
      />
      <CategoryTestimonials
        theme={HealthTheme}
        sectionTitle="Real People, Real Results"
        sectionDescription="See how our CBD products have helped customers on their wellness journey"
        testimonials={healthTestimonials}
        displayType="grid"
      />
      <CategoryFaq
        theme={HealthTheme}
        sectionTitle="Your Health Questions Answered"
        sectionDescription="Learn more about how CBD can support your wellness journey"
        faqs={healthFaqs}
        accordionType="multiple"
        showAiChat={true}
        aiChatTitle="Ask Our Health AI Assistant"
        aiChatDescription="Have questions about CBD and your wellness? Our AI assistant is here to help!"
      />
      <CategoryCta 
        theme={HealthTheme}
        sectionTitle="Begin Your Wellness Journey Today"
        sectionDescription="Discover premium CBD products designed to help you achieve natural balance and improve your overall well-being."
        ctaTitle="Ready to Experience the Benefits?"
        ctaDescription="Browse our wellness collection or get personalized recommendations from our AI expert."
        primaryCta={{
          text: "Shop Wellness Collection",
          href: "/shop/category/wellness"
        }}
        secondaryCta={{
          text: "Ask AI Expert",
          href: "/ai-chat"
        }}
        imageSrc="/images/logos/1.png"
        imageAlt="CBD Wellness Products"
        badgeText="Take Action"
      />
      <Newsletter 
        title="Join Our Wellness Newsletter"
        description="Get the latest health tips, research, and exclusive offers for your wellness journey."
        buttonText="Subscribe"
        backgroundColor="bg-gradient-to-r from-emerald-50 to-white"
        buttonClasses="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white"
      />
    </main>
  )
} 