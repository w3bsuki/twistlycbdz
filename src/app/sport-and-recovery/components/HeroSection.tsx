'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

interface HeroSectionProps {
  pageTheme: {
    colors: {
      primary: string;
      accent: string;
      border: string;
      background: string;
    }
  }
}

export function HeroSection({ pageTheme }: HeroSectionProps) {
  return (
    <section className="py-6 relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-10 w-60 h-60 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-60 h-60 bg-cyan-50 rounded-full opacity-20 blur-3xl"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-xl shadow-md p-4 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex bg-gradient-to-br from-blue-50/80 to-white rounded-full border border-blue-200/40 shadow-sm p-1">
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 font-medium">
                  <span>Sport & Recovery</span>
                </div>
              </div>
              
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-3 mb-2">
                Elevate Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">Performance & Recovery</span>
              </h1>
              
              <p className="text-gray-600 text-sm md:text-base mb-4 max-w-xl mx-auto lg:mx-0">
                Our sport-focused CBD products are formulated to help athletes and active individuals train harder, recover faster, and perform better.
              </p>
              
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white" 
                  size="sm" 
                  asChild
                >
                  <Link href="/shop/category/sport">
                    Shop Sport Products
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-blue-200 text-blue-700 hover:bg-blue-50" 
                  size="sm"
                  asChild
                >
                  <Link href="/blog/cbd-for-athletes">
                    Learn About CBD for Athletes
                  </Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative h-80 md:h-[400px] lg:h-[500px] w-full rounded-lg overflow-hidden"
            >
              <Image
                src="/images/logos/1.png"
                alt="Sport CBD products for enhanced performance and recovery"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
} 