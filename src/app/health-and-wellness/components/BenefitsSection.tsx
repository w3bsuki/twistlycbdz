'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Moon, Brain, Activity, Leaf, Shield, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { cbdBenefits } from '../data/benefits'

interface BenefitsSectionProps {
  pageTheme?: {
    colors: {
      primary: string;
      accent: string;
      border: string;
    }
  }
}

// Function to get the correct icon component based on name
const getIconByName = (iconName: string, className?: string) => {
  switch (iconName) {
    case 'heart':
      return <Heart className={className || "h-4.5 w-4.5 text-green-500"} />;
    case 'moon':
      return <Moon className={className || "h-4.5 w-4.5 text-green-500"} />;
    case 'brain':
      return <Brain className={className || "h-4.5 w-4.5 text-green-500"} />;
    case 'activity':
      return <Activity className={className || "h-4.5 w-4.5 text-green-500"} />;
    case 'leaf':
      return <Leaf className={className || "h-4.5 w-4.5 text-green-500"} />;
    case 'shield':
      return <Shield className={className || "h-4.5 w-4.5 text-green-500"} />;
    default:
      return <Heart className={className || "h-4.5 w-4.5 text-green-500"} />;
  }
};

export function BenefitsSection({ pageTheme }: BenefitsSectionProps) {
  return (
    <section 
      className="py-6 relative overflow-hidden bg-gradient-to-b from-green-50 to-white"
      id="wellness-benefits"
    >
      {/* Simple background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-10 w-60 h-60 bg-green-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-60 h-60 bg-emerald-50 rounded-full opacity-20 blur-3xl"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-xl shadow-md p-4 overflow-hidden">
          <div className="text-center mb-4">
            <div className="inline-flex bg-gradient-to-br from-green-50/80 to-white rounded-full border border-green-200/40 shadow-sm p-1">
              <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5 font-medium">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Wellness Benefits</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-3 mb-2">Support Your Natural Balance</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-4 text-sm md:text-base leading-relaxed">
              Explore how high-quality CBD can contribute to your daily wellness routine and overall health
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {cbdBenefits.map((benefit) => (
              <div
                key={benefit.title}
                className="h-full"
              >
                {/* Outer container with gradient and border */}
                <div 
                  className="bg-gradient-to-br rounded-lg border border-opacity-40 h-full shadow-sm p-2 flex"
                  style={{
                    backgroundImage: 'linear-gradient(to bottom right, rgba(220, 252, 231, 0.5), rgba(255, 255, 255, 0.95))',
                    borderColor: 'rgba(134, 239, 172, 0.4)'
                  }}
                >
                  <Card className="h-full border-l-[3px] border-green-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 w-full flex flex-col" 
                    style={{
                      background: 'linear-gradient(to bottom right, white, #ecfdf5)'
                    }}
                  >
                    <CardContent className="p-3 flex flex-col h-full">
                      <div className="flex items-start gap-2.5 mb-2">
                        <div className="h-9 w-9 rounded-full bg-green-50 flex items-center justify-center shrink-0 shadow-sm">
                          {getIconByName(benefit.iconName, "h-4.5 w-4.5 text-green-500")}
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-bold text-gray-900 mb-0.5">{benefit.title}</h3>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-500">
                              <span className="font-medium text-green-500">{benefit.stats.satisfaction}</span> satisfaction
                            </span>
                            <span className="mx-1 text-gray-300">•</span>
                            <span className="text-xs text-gray-500">
                              <span className="font-medium text-green-500">{benefit.stats.timeToEffect}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-xs mb-2 flex-grow h-[4rem] overflow-hidden">{benefit.description}</p>
                      
                      <div className="mt-auto">
                        <div className="h-px w-full bg-gradient-to-r from-green-200/40 via-green-100 to-green-200/40 my-1.5"></div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full justify-between px-1 py-1 text-green-500 hover:bg-opacity-10 hover:bg-green-50"
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
          
          <div className="flex justify-center mt-4 pt-3 border-t border-green-100">
            <div className="bg-gradient-to-br from-green-50/80 to-white rounded-full border border-green-200/40 shadow-sm p-1 px-2">
              <Button 
                variant="outline" 
                size="sm"
                className="border-green-200/80 text-green-700 hover:bg-green-50 hover:text-green-800 rounded-full px-2.5 py-1.5"
                asChild
              >
                <a href="/learn/cbd-science" className="flex items-center text-xs whitespace-nowrap">
                  Learn more about CBD science
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 ml-1">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
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