'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Activity, Clock, Zap, Timer, Flame, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

interface BenefitsSectionProps {
  pageTheme?: {
    colors: {
      primary: string;
      accent: string;
      border: string;
    }
  }
}

// CBD pet benefits data
const petBenefits = [
  {
    title: "Reduced Anxiety",
    description: "CBD may help reduce stress and anxiety in pets with separation anxiety, noise phobias, or general nervousness.",
    icon: <Heart className="h-4.5 w-4.5 text-amber-500" />,
    color: "bg-amber-50",
    iconColor: "text-amber-500",
    borderColor: "border-amber-100",
    hoverColor: "bg-amber-50",
    stats: {
      satisfaction: "93%",
      timeToEffect: "30-60 min"
    }
  },
  {
    title: "Joint Support",
    description: "CBD may help reduce inflammation and pain associated with arthritis and other joint problems in aging pets.",
    icon: <Activity className="h-4.5 w-4.5 text-amber-500" />,
    color: "bg-amber-50",
    iconColor: "text-amber-500",
    borderColor: "border-amber-100",
    hoverColor: "bg-amber-50",
    stats: {
      satisfaction: "90%",
      timeToEffect: "45-90 min"
    }
  },
  {
    title: "Improved Sleep",
    description: "CBD may help pets with insomnia or disrupted sleep patterns rest more comfortably through the night.",
    icon: <Clock className="h-4.5 w-4.5 text-amber-500" />,
    color: "bg-amber-50",
    iconColor: "text-amber-500",
    borderColor: "border-amber-100",
    hoverColor: "bg-amber-50",
    stats: {
      satisfaction: "87%",
      timeToEffect: "60-120 min"
    }
  },
  {
    title: "Digestive Health",
    description: "CBD interacts with receptors in the digestive tract and may help with symptoms of nausea, vomiting, and poor appetite.",
    icon: <Zap className="h-4.5 w-4.5 text-amber-500" />,
    color: "bg-amber-50",
    iconColor: "text-amber-500",
    borderColor: "border-amber-100",
    hoverColor: "bg-amber-50",
    stats: {
      satisfaction: "85%",
      timeToEffect: "30-60 min"
    }
  },
  {
    title: "Skin & Coat Health",
    description: "CBD's anti-inflammatory properties may help improve skin conditions like allergies, hot spots, and dry skin.",
    icon: <Timer className="h-4.5 w-4.5 text-amber-500" />,
    color: "bg-amber-50",
    iconColor: "text-amber-500",
    borderColor: "border-amber-100",
    hoverColor: "bg-amber-50",
    stats: {
      satisfaction: "88%",
      timeToEffect: "1-2 weeks"
    }
  },
  {
    title: "Seizure Management",
    description: "Some pet owners report a reduction in seizure frequency and severity when using CBD as part of their pet's care plan.",
    icon: <Flame className="h-4.5 w-4.5 text-amber-500" />,
    color: "bg-amber-50",
    iconColor: "text-amber-500",
    borderColor: "border-amber-100",
    hoverColor: "bg-amber-50",
    stats: {
      satisfaction: "91%",
      timeToEffect: "2-4 weeks"
    }
  }
]

export function BenefitsSection({ pageTheme }: BenefitsSectionProps) {
  return (
    <section 
      className="py-6 relative overflow-hidden bg-gradient-to-b from-amber-50 to-white"
      id="pet-benefits"
    >
      {/* Simple background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-10 w-60 h-60 bg-amber-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-60 h-60 bg-amber-50 rounded-full opacity-20 blur-3xl"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="bg-white/80 backdrop-blur-sm border border-amber-200 rounded-xl shadow-md p-4 overflow-hidden">
          <div className="text-center mb-4">
            <div className="inline-flex bg-gradient-to-br from-amber-50/80 to-white rounded-full border border-amber-200/40 shadow-sm p-1">
              <div className="bg-gradient-to-r from-amber-600 to-amber-500 text-white px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5 font-medium">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Pet Benefits</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-3 mb-2">Why Pet Owners Choose CBD</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-4 text-sm md:text-base leading-relaxed">
              CBD offers natural support for your pet's health and wellness without the side effects of many traditional medications
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {petBenefits.map((benefit) => (
              <div
                key={benefit.title}
                className="h-full"
              >
                {/* Outer container with gradient and border */}
                <div 
                  className="bg-gradient-to-br rounded-lg border border-opacity-40 h-full shadow-sm p-2 flex"
                  style={{
                    backgroundImage: 'linear-gradient(to bottom right, rgba(254, 243, 199, 0.5), rgba(255, 255, 255, 0.95))',
                    borderColor: 'rgba(252, 211, 77, 0.4)'
                  }}
                >
                  <Card className="h-full border-l-[3px] border-amber-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 w-full flex flex-col" 
                    style={{
                      background: 'linear-gradient(to bottom right, white, #fef9ec)'
                    }}
                  >
                    <CardContent className="p-3 flex flex-col h-full">
                      <div className="flex items-start gap-2.5 mb-2">
                        <div className="h-9 w-9 rounded-full bg-amber-50 flex items-center justify-center shrink-0 shadow-sm">
                          <div className={benefit.iconColor}>
                            {benefit.icon}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-bold text-gray-900 mb-0.5">{benefit.title}</h3>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-500">
                              <span className="font-medium text-amber-500">{benefit.stats.satisfaction}</span> satisfaction
                            </span>
                            <span className="mx-1 text-gray-300">•</span>
                            <span className="text-xs text-gray-500">
                              <span className="font-medium text-amber-500">{benefit.stats.timeToEffect}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-xs mb-2 flex-grow h-[4rem] overflow-hidden">{benefit.description}</p>
                      
                      <div className="mt-auto">
                        <div className="h-px w-full bg-gradient-to-r from-amber-200/40 via-amber-100 to-amber-200/40 my-1.5"></div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full justify-between px-1 py-1 text-amber-500 hover:bg-opacity-10 hover:bg-amber-50"
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
            ))}
          </div>
          
          <div className="flex justify-center mt-4 pt-3 border-t border-amber-100">
            <div className="bg-gradient-to-br from-amber-50/80 to-white rounded-full border border-amber-200/40 shadow-sm p-1 px-2">
              <Button 
                variant="outline" 
                size="sm"
                className="border-amber-200/80 text-amber-700 hover:bg-amber-50 hover:text-amber-800 rounded-full px-2.5 py-1.5"
                asChild
              >
                <a href="/shop/category/pet">
                  Browse All Pet CBD Products
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
} 