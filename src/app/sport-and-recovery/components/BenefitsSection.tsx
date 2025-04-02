'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { RotateCcw, Activity, Clock, Zap, Timer, Flame, Sparkles } from 'lucide-react'
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

// CBD sport benefits data
const sportBenefits = [
  {
    title: "Faster Recovery",
    description: "CBD may help reduce exercise-induced inflammation and promote faster recovery between training sessions.",
    icon: <RotateCcw className="h-4.5 w-4.5 text-blue-500" />,
    color: "bg-blue-50",
    iconColor: "text-blue-500",
    borderColor: "border-blue-100",
    hoverColor: "bg-blue-50",
    stats: {
      satisfaction: "95%",
      timeToEffect: "30-60 min"
    }
  },
  {
    title: "Reduced Inflammation",
    description: "Research suggests CBD has anti-inflammatory properties that may help manage pain and soreness after intense workouts.",
    icon: <Activity className="h-4.5 w-4.5 text-blue-500" />,
    color: "bg-blue-50",
    iconColor: "text-blue-500",
    borderColor: "border-blue-100",
    hoverColor: "bg-blue-50",
    stats: {
      satisfaction: "92%",
      timeToEffect: "45-90 min"
    }
  },
  {
    title: "Better Sleep",
    description: "CBD may improve sleep quality, which is essential for muscle recovery and athletic performance.",
    icon: <Clock className="h-4.5 w-4.5 text-blue-500" />,
    color: "bg-blue-50",
    iconColor: "text-blue-500",
    borderColor: "border-blue-100",
    hoverColor: "bg-blue-50",
    stats: {
      satisfaction: "89%",
      timeToEffect: "60-120 min"
    }
  },
  {
    title: "Improved Performance",
    description: "By promoting relaxation without sedation, CBD may help optimize your mental state for training and competition.",
    icon: <Zap className="h-4.5 w-4.5 text-blue-500" />,
    color: "bg-blue-50",
    iconColor: "text-blue-500",
    borderColor: "border-blue-100",
    hoverColor: "bg-blue-50",
    stats: {
      satisfaction: "87%",
      timeToEffect: "30-60 min"
    }
  },
  {
    title: "Reduced Exercise Stress",
    description: "CBD interacts with your endocannabinoid system to help manage the physical stress response from intense training.",
    icon: <Timer className="h-4.5 w-4.5 text-blue-500" />,
    color: "bg-blue-50",
    iconColor: "text-blue-500",
    borderColor: "border-blue-100",
    hoverColor: "bg-blue-50",
    stats: {
      satisfaction: "90%",
      timeToEffect: "15-45 min"
    }
  },
  {
    title: "Enhanced Endurance",
    description: "Some athletes report improved endurance and reduced exercise fatigue when incorporating CBD into their routine.",
    icon: <Flame className="h-4.5 w-4.5 text-blue-500" />,
    color: "bg-blue-50",
    iconColor: "text-blue-500",
    borderColor: "border-blue-100",
    hoverColor: "bg-blue-50",
    stats: {
      satisfaction: "85%",
      timeToEffect: "30-90 min"
    }
  }
]

export function BenefitsSection({ pageTheme }: BenefitsSectionProps) {
  return (
    <section 
      className="py-6 relative overflow-hidden bg-gradient-to-b from-blue-50 to-white"
      id="sport-benefits"
    >
      {/* Simple background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-10 w-60 h-60 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-60 h-60 bg-cyan-50 rounded-full opacity-20 blur-3xl"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-xl shadow-md p-4 overflow-hidden">
          <div className="text-center mb-4">
            <div className="inline-flex bg-gradient-to-br from-blue-50/80 to-white rounded-full border border-blue-200/40 shadow-sm p-1">
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5 font-medium">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Sport Benefits</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-3 mb-2">Why Athletes Choose CBD</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-4 text-sm md:text-base leading-relaxed">
              CBD offers natural support for athletic performance and recovery without the side effects of traditional methods
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {sportBenefits.map((benefit) => (
              <div
                key={benefit.title}
                className="h-full"
              >
                {/* Outer container with gradient and border */}
                <div 
                  className="bg-gradient-to-br rounded-lg border border-opacity-40 h-full shadow-sm p-2 flex"
                  style={{
                    backgroundImage: 'linear-gradient(to bottom right, rgba(219, 234, 254, 0.5), rgba(255, 255, 255, 0.95))',
                    borderColor: 'rgba(147, 197, 253, 0.4)'
                  }}
                >
                  <Card className="h-full border-l-[3px] border-blue-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 w-full flex flex-col" 
                    style={{
                      background: 'linear-gradient(to bottom right, white, #eff6ff)'
                    }}
                  >
                    <CardContent className="p-3 flex flex-col h-full">
                      <div className="flex items-start gap-2.5 mb-2">
                        <div className="h-9 w-9 rounded-full bg-blue-50 flex items-center justify-center shrink-0 shadow-sm">
                          <div className={benefit.iconColor}>
                            {benefit.icon}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-bold text-gray-900 mb-0.5">{benefit.title}</h3>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-500">
                              <span className="font-medium text-blue-500">{benefit.stats.satisfaction}</span> satisfaction
                            </span>
                            <span className="mx-1 text-gray-300">•</span>
                            <span className="text-xs text-gray-500">
                              <span className="font-medium text-blue-500">{benefit.stats.timeToEffect}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-xs mb-2 flex-grow h-[4rem] overflow-hidden">{benefit.description}</p>
                      
                      <div className="mt-auto">
                        <div className="h-px w-full bg-gradient-to-r from-blue-200/40 via-blue-100 to-blue-200/40 my-1.5"></div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full justify-between px-1 py-1 text-blue-500 hover:bg-opacity-10 hover:bg-blue-50"
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
          
          <div className="flex justify-center mt-4 pt-3 border-t border-blue-100">
            <div className="bg-gradient-to-br from-blue-50/80 to-white rounded-full border border-blue-200/40 shadow-sm p-1 px-2">
              <Button 
                variant="outline" 
                size="sm"
                className="border-blue-200/80 text-blue-700 hover:bg-blue-50 hover:text-blue-800 rounded-full px-2.5 py-1.5"
                asChild
              >
                <a href="/blog/cbd-for-athletes" className="flex items-center">
                  Learn more about sport benefits
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