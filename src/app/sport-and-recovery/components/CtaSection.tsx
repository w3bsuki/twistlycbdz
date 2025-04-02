'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Bot, ShoppingCart, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

interface CtaSectionProps {
  pageTheme: {
    colors: {
      primary: string;
      accent: string;
      border: string;
      background: string;
    }
    gradients: {
      button: string;
    }
  }
}

export function CtaSection({ pageTheme }: CtaSectionProps) {
  return (
    <section className="py-6 relative overflow-hidden bg-gradient-to-b from-blue-50 to-white" id="cta">
      {/* Simple background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-10 w-60 h-60 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-cyan-50 rounded-full opacity-20 blur-3xl"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-xl shadow-md p-4 overflow-hidden">
          <div className="text-center mb-4">
            <div className="inline-flex bg-gradient-to-br from-blue-50/80 to-white rounded-full border border-blue-200/40 shadow-sm p-1">
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5 font-medium">
                <Zap className="h-3.5 w-3.5" />
                <span>Take Action</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3 mb-2">Level Up Your Training Today</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base mb-4">
              Enhance your performance and recovery with our premium CBD products designed specifically for athletes.
            </p>
          </div>
          
          <div className={`bg-gradient-to-r ${pageTheme.gradients.button} rounded-lg p-6 shadow-lg`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Ready to Experience the Difference?</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Browse our specialized sport collection or get personalized recommendations from our AI expert.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button 
                    className="bg-white text-blue-800 hover:bg-blue-50" 
                    size="sm" 
                    asChild
                  >
                    <Link href="/shop/category/sport">
                      Shop Sport Collection
                      <ShoppingCart className="ml-1.5 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-white/50 text-white hover:bg-white/10" 
                    size="sm"
                    onClick={() => alert('AI Expert Modal Triggered')}
                  >
                    Ask AI Expert
                    <Bot className="ml-1.5 h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex justify-center md:justify-end">
                <div className="relative h-[150px] w-[150px]">
                  <Image
                    src="/images/tincture2.png"
                    alt="CBD Sport Products"
                    fill
                    className="object-contain filter drop-shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
} 