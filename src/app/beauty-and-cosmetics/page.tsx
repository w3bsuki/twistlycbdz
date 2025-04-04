import React from 'react'
import type { Metadata, Viewport } from 'next'
import { 
  CategoryHero, 
  CategoryBenefits, 
  CategoryFeaturedProducts, 
  CategoryTestimonials,
  CategoryFaq,
  CategoryCta,
  BeautyTheme 
} from '@/components/shared/category'
import { QualityPromiseSection } from './components/QualityPromiseSection'
import { CbdIngredientsSection } from './components/CbdIngredientsSection'
import { Newsletter } from '@/components/Newsletter'
import { beautyBenefitItems } from './data/benefits'
import { beautyProducts } from './data/products'
import { beautyTestimonials } from './data/testimonials'
import { beautyFaqs } from './data/faqs'

export const metadata: Metadata = {
  title: 'Beauty & Cosmetics CBD Products',
  description: 'Enhance your beauty routine with our premium CBD-infused cosmetics and beauty products for skin, hair, and anti-aging solutions.',
}

export const viewport: Viewport = {
  themeColor: "#a855f7", // Purple for beauty theme
  width: "device-width",
  initialScale: 1,
};

export default function BeautyAndCosmeticsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <CategoryHero 
        theme={BeautyTheme}
        title="CBD Beauty"
        highlightedText="& Cosmetics"
        description="Enhance your beauty routine with our premium CBD-infused products specially formulated to rejuvenate your skin and provide anti-aging benefits."
        primaryCta={{
          text: "Shop Beauty Products",
          href: "/shop/category/beauty"
        }}
        secondaryCta={{
          text: "Learn About CBD Beauty",
          href: "/blog/cbd-beauty-benefits"
        }}
        imageSrc="/images/logos/1.png"
        imageAlt="CBD Beauty Products"
      />
      <CategoryBenefits
        theme={BeautyTheme}
        sectionTitle="CBD Beauty Benefits"
        sectionDescription="Discover how CBD can transform your skincare routine with these powerful beauty benefits"
        benefits={beautyBenefitItems}
        ctaText="Browse All Beauty Products"
        ctaLink="/shop/category/beauty"
      />
      <CategoryFeaturedProducts
        theme={BeautyTheme}
        sectionTitle="Premium Beauty Products"
        sectionDescription="Specially formulated CBD for your skincare and beauty routine"
        products={beautyProducts}
        viewAllText="View All Beauty Products"
        viewAllLink="/shop/category/beauty"
      />
      <CbdIngredientsSection pageTheme={{
        colors: {
          primary: BeautyTheme.colors.primary,
          secondary: BeautyTheme.colors.accent,
          accent: 'purple-400',
          border: 'border-purple-200',
          borderHover: 'hover:border-purple-300',
          background: 'from-purple-50 to-white',
        },
        gradients: {
          section: 'bg-gradient-to-b from-purple-50 to-white',
          button: 'bg-gradient-to-r from-purple-600 to-purple-500',
        }
      }} />
      <CategoryTestimonials
        theme={BeautyTheme}
        sectionTitle="Beauty Transformations"
        sectionDescription="See how our CBD beauty products have transformed our customers' skincare routines"
        testimonials={beautyTestimonials}
        displayType="carousel"
      />
      <QualityPromiseSection pageTheme={{
        colors: {
          primary: BeautyTheme.colors.primary,
          secondary: BeautyTheme.colors.accent,
          accent: 'purple-400',
          border: 'border-purple-200',
          borderHover: 'hover:border-purple-300',
          background: 'from-purple-50 to-white',
        },
        gradients: {
          section: 'bg-gradient-to-b from-purple-50 to-white',
          button: 'bg-gradient-to-r from-purple-600 to-purple-500',
        }
      }} />
      <CategoryFaq
        theme={BeautyTheme}
        sectionTitle="Beauty & CBD Questions"
        sectionDescription="Learn more about how CBD can enhance your beauty routine"
        faqs={beautyFaqs}
        accordionType="multiple"
        showAiChat={true}
        aiChatTitle="Ask Our Beauty Expert"
        aiChatDescription="Have questions about CBD in your beauty routine? Our expert is here to help!"
      />
      <CategoryCta 
        theme={BeautyTheme}
        sectionTitle="Enhance Your Beauty Routine Today"
        sectionDescription="Discover premium CBD beauty products designed to revitalize your skin and provide powerful anti-aging benefits"
        ctaTitle="Ready for Radiant Skin?"
        ctaDescription="Browse our beauty collection or get personalized recommendations from our skincare experts"
        primaryCta={{
          text: "Shop Beauty Collection",
          href: "/shop/category/beauty"
        }}
        secondaryCta={{
          text: "Beauty Consultation",
          href: "/beauty-consultation"
        }}
        imageSrc="/images/logos/1.png"
        imageAlt="CBD Beauty Products Collection"
        badgeText="Beauty Essentials"
      />
      <Newsletter 
        title="Join Our Beauty Insider Newsletter"
        description="Get the latest beauty tips, skincare advice, and exclusive offers for your CBD beauty journey."
        buttonText="Subscribe"
        backgroundColor="bg-gradient-to-r from-purple-50 to-white"
        buttonClasses="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white"
      />
    </main>
  )
} 