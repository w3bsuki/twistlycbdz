'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { PawPrint, ArrowRight } from 'lucide-react'

interface CtaSectionProps {
  pageTheme: {
    colors: {
      primary: string;
      accent: string;
    }
  }
}

export function CtaSection({ pageTheme }: CtaSectionProps) {
  return (
    <section className="py-12 relative overflow-hidden bg-gradient-to-br from-amber-100/50 to-white">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-0 -left-20 w-80 h-80 bg-amber-50 rounded-full opacity-30 blur-3xl"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="bg-white/80 backdrop-blur-sm border border-amber-200/50 rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="p-6 md:p-8 lg:p-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="max-w-lg"
              >
                <div className="inline-flex bg-amber-50 rounded-full border border-amber-100 px-3 py-1 mb-4">
                  <span className="text-amber-700 text-sm font-medium flex items-center">
                    <PawPrint className="h-3.5 w-3.5 mr-1.5" /> For Your Furry Friends
                  </span>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Give Your Pets the Natural Support They Deserve
                </h2>
                
                <p className="text-gray-600 mb-6">
                  Our premium pet CBD products are formulated to help your beloved companions live their happiest, healthiest lives. From anxiety and stress relief to joint support and overall wellness, we have solutions for pets of all ages and sizes.
                </p>
                
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-600">Veterinarian-formulated for safety and efficacy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-600">THC-free, ensuring no psychoactive effects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-600">Third-party lab tested for purity and potency</span>
                  </li>
                </ul>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white border-none">
                    <Link href="/products/category/pet-cbd">
                      Shop Pet CBD Products <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-50">
                    <Link href="/blog/category/pet-wellness">
                      Read Pet Wellness Guides
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
            
            <div className="relative h-64 md:h-full min-h-[320px]">
              <Image
                src="/images/pet-cbd-cta.jpg" 
                alt="Happy pets with CBD products"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-transparent mix-blend-multiply"></div>
              
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/60 to-transparent">
                <div className="text-white">
                  <p className="text-lg font-semibold">30-Day Satisfaction Guarantee</p>
                  <p className="text-sm opacity-90">If you don't see improvements in your pet's quality of life, we'll refund your purchase</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
} 