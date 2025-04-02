'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen } from 'lucide-react'

interface ResearchSectionProps {
  pageTheme: {
    colors: {
      primary: string;
      accent: string;
    }
  }
}

export function ResearchSection({ pageTheme }: ResearchSectionProps) {
  return (
    <section className="py-6 relative overflow-hidden bg-gradient-to-b from-amber-50 to-white">
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
                <BookOpen className="h-3.5 w-3.5" />
                <span>Pet CBD Research</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3 mb-2">Science Behind CBD for Pets</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-4 text-sm">
              The latest research on how cannabinoids work to support your pet's health and wellness
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-amber-50/70 to-white rounded-xl border border-amber-200/40 shadow-sm p-4 overflow-hidden">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">How CBD Works in Pets</h3>
                  
                  <ul className="space-y-3 mb-4">
                    <li className="flex gap-2.5 text-sm text-gray-600">
                      <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-amber-700 font-semibold text-xs">1</span>
                      </div>
                      <p className="flex-1">
                        <span className="font-medium text-gray-900">Endocannabinoid System:</span> Just like humans, pets have an endocannabinoid system (ECS) that helps maintain balance within their bodies.
                      </p>
                    </li>
                    <li className="flex gap-2.5 text-sm text-gray-600">
                      <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-amber-700 font-semibold text-xs">2</span>
                      </div>
                      <p className="flex-1">
                        <span className="font-medium text-gray-900">CBD Interaction:</span> CBD interacts with receptors in the ECS to help regulate pain, inflammation, anxiety, and other bodily functions.
                      </p>
                    </li>
                    <li className="flex gap-2.5 text-sm text-gray-600">
                      <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-amber-700 font-semibold text-xs">3</span>
                      </div>
                      <p className="flex-1">
                        <span className="font-medium text-gray-900">No Psychoactive Effects:</span> Unlike THC, CBD is non-psychoactive, meaning it won't make your pet "high" or intoxicated.
                      </p>
                    </li>
                    <li className="flex gap-2.5 text-sm text-gray-600">
                      <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-amber-700 font-semibold text-xs">4</span>
                      </div>
                      <p className="flex-1">
                        <span className="font-medium text-gray-900">Pet-Specific Formulations:</span> Our products are specifically formulated with appropriate concentrations and delivery methods for different pet species and sizes.
                      </p>
                    </li>
                  </ul>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="border-amber-200 text-amber-700 hover:bg-amber-50 w-full mt-2"
                  asChild
                >
                  <Link href="/blog/cbd-for-pets">
                    Read Our Research Guides
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="relative bg-gradient-to-br from-amber-50/70 to-white rounded-xl border border-amber-200/40 shadow-sm p-4 overflow-hidden">
              <div className="relative h-[250px] mb-3">
                <Image
                  src="/images/tincture2.png"
                  alt="Pet CBD Research"
                  fill
                  className="object-contain"
                />
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-3">
                  Our team works with veterinarians and animal health researchers to develop effective, safe CBD formulations for pets of all kinds.
                </p>
                
                <div className="grid grid-cols-3 gap-2 text-center mb-3">
                  <div className="bg-white border border-amber-100 rounded-lg p-2">
                    <p className="text-amber-600 font-bold text-lg">25+</p>
                    <p className="text-xs text-gray-500">Research Studies</p>
                  </div>
                  <div className="bg-white border border-amber-100 rounded-lg p-2">
                    <p className="text-amber-600 font-bold text-lg">12</p>
                    <p className="text-xs text-gray-500">Vet Consultants</p>
                  </div>
                  <div className="bg-white border border-amber-100 rounded-lg p-2">
                    <p className="text-amber-600 font-bold text-lg">5+</p>
                    <p className="text-xs text-gray-500">Years Research</p>
                  </div>
                </div>
                
                <Button
                  className="bg-amber-600 hover:bg-amber-700 text-white w-full"
                  size="sm"
                  asChild
                >
                  <Link href="/shop/category/pet">
                    Browse Science-Backed Products
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
} 