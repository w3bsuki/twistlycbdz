'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Sparkles, Droplet, Shield, Sun, Leaf } from 'lucide-react' // Keep Beauty icons

// Define Theme interface
interface PageTheme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    border: string;
    borderHover: string;
    background: string;
  };
  gradients: {
    section: string;
    button: string;
  };
}

interface BenefitsSectionProps {
  pageTheme: PageTheme;
}

// Static data for beauty benefits - Keep Beauty data
const beautyBenefits = [
  {
    title: "Anti-Aging Properties",
    description: "CBD's antioxidant properties may help combat free radicals that cause signs of aging like fine lines and wrinkles.",
    icon: Sparkles,
    stats: { // Add placeholder stats structure if needed, or adjust styling
      satisfaction: "94%",
      timeToEffect: "Daily use"
    }
  },
  {
    title: "Balanced Hydration",
    description: "CBD may help regulate oil production, making it beneficial for both dry and oily skin types.",
    icon: Droplet,
    stats: {
      satisfaction: "91%",
      timeToEffect: "Immediate"
    }
  },
  {
    title: "Reduced Inflammation",
    description: "The anti-inflammatory properties of CBD can help calm redness, irritation, and conditions like acne and eczema.",
    icon: Shield,
    stats: {
      satisfaction: "93%",
      timeToEffect: "Days to weeks"
    }
  },
  {
    title: "UV Protection Support",
    description: "When combined with SPF, CBD may provide additional support against environmental damage and UV rays.",
    icon: Sun,
    stats: {
      satisfaction: "88%",
      timeToEffect: "Consistent use"
    }
  },
  {
    title: "Natural Ingredients",
    description: "Our CBD beauty products are formulated with clean, natural ingredients without harsh chemicals or synthetic fragrances.",
    icon: Leaf,
    stats: {
      satisfaction: "97%",
      timeToEffect: "N/A"
    }
  }
]

export function BenefitsSection({ pageTheme }: BenefitsSectionProps) {
  // Use theme colors dynamically
  const primaryColor = pageTheme.colors.primary || 'pink-600'
  const primaryColorNum = primaryColor.split('-')[1] // e.g., '600'
  const primaryColorName = primaryColor.split('-')[0] // e.g., 'pink'

  const primaryLight = `${primaryColorName}-50`
  const primaryLighter = `${primaryColorName}-100`
  const primaryLightest = `${primaryColorName}-200`
  const primaryMedium = `${primaryColorName}-500`
  const primaryDark = `${primaryColorName}-700`
  const sectionBg = pageTheme.gradients.section || `bg-gradient-to-b from-${primaryLight} to-white`
  const borderLighter = `border-${primaryLighter}`
  const borderLight = `border-${primaryLightest}`
  const borderMedium = `border-${primaryMedium}`
  const textPrimaryMedium = `text-${primaryMedium}`
  const textPrimaryDark = `text-${primaryDark}`
  const buttonGradient = pageTheme.gradients.button

  return (
    <section 
      className={`py-6 relative overflow-hidden ${sectionBg}`} // MATCH: Sport padding & background
      id="beauty-benefits"
    >
      {/* MATCH: Sport background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-40 right-10 w-60 h-60 bg-${primaryLighter} rounded-full opacity-20 blur-3xl`}></div>
        <div className={`absolute bottom-20 left-10 w-60 h-60 bg-${primaryColorName}-50 rounded-full opacity-20 blur-3xl`}></div> {/* Use base color -50 */} 
      </div>
      
      <Container className="relative z-10">
        {/* MATCH: Sport backdrop wrapper */}
        <div className={`bg-white/80 backdrop-blur-sm ${borderLight} rounded-xl shadow-md p-4 overflow-hidden`}>
          {/* MATCH: Sport title section structure & spacing */}
          <div className="text-center mb-4">
            <div className={`inline-flex bg-gradient-to-br from-${primaryLight}/80 to-white rounded-full border ${borderLight}/40 shadow-sm p-1`}>
              <div className={`${buttonGradient} text-white px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5 font-medium`}>
                <Sparkles className="h-3.5 w-3.5" /> {/* Use Sparkles icon */} 
                <span>Beauty Benefits</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-3 mb-2">Unlock Your Natural Radiance</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-4 text-sm md:text-base leading-relaxed">
              Experience the rejuvenating power of CBD for healthier, glowing skin.
            </p>
          </div>
          
          {/* MATCH: Sport grid structure & gap */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {beautyBenefits.map((benefit) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="h-full" // MATCH: Sport wrapper
                >
                  {/* MATCH: Sport outer gradient wrapper */}
                  <div 
                    className={`bg-gradient-to-br rounded-lg border border-opacity-40 h-full shadow-sm p-2 flex border-${primaryColorName}-200/60`} // Adjusted border color slightly
                    style={{
                      backgroundImage: `linear-gradient(to bottom right, rgba(255, 255, 255, 0.95), ${primaryColorName === 'pink' ? 'rgba(253, 232, 242, 0.6)' : primaryColorName === 'purple' ? 'rgba(243, 232, 255, 0.6)' : 'rgba(239, 246, 255, 0.6)'})` // Use theme color softly
                    }}
                  >
                    {/* MATCH: Sport Card Structure (border-left, bg, padding) */}
                    <Card className={`h-full border-l-[3px] ${borderLight} rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 w-full flex flex-col bg-gradient-to-br from-white to-${primaryLight}/50`}
                    >
                      <CardContent className="p-3 flex flex-col h-full"> {/* MATCH: p-3 */} 
                        <div className="flex items-start gap-2.5 mb-2"> {/* MATCH: gap & margin */} 
                          {/* MATCH: Sport Icon container */}
                          <div className={`h-9 w-9 rounded-full bg-${primaryLight} flex items-center justify-center shrink-0 shadow-sm`}>
                            <div className={textPrimaryMedium}>
                              <IconComponent className="h-4.5 w-4.5" /> {/* MATCH: Icon size */}
                            </div>
                          </div>
                          
                          {/* MATCH: Sport Title & Stats structure */}
                          <div>
                            <h3 className="text-sm font-bold text-gray-900 mb-0.5">{benefit.title}</h3>
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-gray-500">
                                <span className={`font-medium ${textPrimaryMedium}`}>{benefit.stats.satisfaction}</span> satisfaction
                              </span>
                              <span className="mx-1 text-gray-300">•</span>
                              <span className="text-xs text-gray-500">
                                <span className={`font-medium ${textPrimaryMedium}`}>{benefit.stats.timeToEffect}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {/* MATCH: Sport Description structure (fixed height) */}
                        <p className="text-gray-600 text-xs mb-2 flex-grow h-[4rem] overflow-hidden">{benefit.description}</p>
                        
                        {/* MATCH: Sport Footer structure (Separator & Button) */}
                        <div className="mt-auto">
                          <div className={`h-px w-full bg-gradient-to-r from-${primaryLightest}/40 via-${primaryLighter}/80 to-${primaryLightest}/40 my-1.5`}></div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className={`w-full justify-between px-1 py-1 ${textPrimaryMedium} hover:bg-opacity-10 hover:bg-${primaryLight}`}
                            asChild
                          >
                            <a href="#featured-products" className="flex items-center text-xs">
                              View related products
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 ml-1">
                                <path d="m9 18 6-6-6-6"/>
                              </svg>
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )
            })}
          </div>
          
          {/* MATCH: Sport Bottom Button Structure */}
          <div className={`flex justify-center mt-4 pt-3 border-t ${borderLighter}`}>
            <div className={`bg-gradient-to-br from-${primaryLight}/80 to-white rounded-full border ${borderLight}/40 shadow-sm p-1 px-2`}>
              <Button 
                variant="outline" 
                size="sm"
                className={`${borderLight}/80 ${textPrimaryDark} hover:bg-${primaryLight} hover:${textPrimaryDark} rounded-full px-2.5 py-1.5`}
                asChild
              >
                {/* Link to a relevant beauty blog post or guide */}
                <a href="/blog/cbd-beauty-guide" className="flex items-center">
                  Learn more about beauty benefits
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1.5 h-3.5 w-3.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
} 