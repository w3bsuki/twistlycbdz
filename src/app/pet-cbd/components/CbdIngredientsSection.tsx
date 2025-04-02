'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { Check, Leaf } from 'lucide-react'

interface CbdIngredientsSectionProps {
  pageTheme: {
    colors: {
      primary: string;
      accent: string;
    }
  }
}

export function CbdIngredientsSection({ pageTheme }: CbdIngredientsSectionProps) {
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
                <Leaf className="h-3.5 w-3.5" />
                <span>Premium Ingredients</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3 mb-2">Quality You Can Trust</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-4 text-sm">
              We use only the highest quality ingredients in our pet CBD products
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="bg-gradient-to-br from-amber-50/70 to-white rounded-xl border border-amber-200/40 shadow-sm p-4 overflow-hidden order-2 md:order-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Our Standards for Pet Products</h3>
              
              <ul className="space-y-2.5">
                <li className="flex gap-3 items-start">
                  <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Organic Hemp Extract</p>
                    <p className="text-xs text-gray-600">Our CBD is extracted from organically grown hemp plants cultivated on American farms without the use of pesticides or harmful chemicals.</p>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">THC-Free Formula</p>
                    <p className="text-xs text-gray-600">Our pet products are THC-free, eliminating any risk of psychoactive effects that could be harmful to animals.</p>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Third-Party Lab Tested</p>
                    <p className="text-xs text-gray-600">Every batch is rigorously tested by independent laboratories for potency, purity, and safety.</p>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Pet-Safe Carrier Oils</p>
                    <p className="text-xs text-gray-600">We use MCT oil derived from coconuts, which is easily digestible for pets and helps with CBD absorption.</p>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">No Artificial Additives</p>
                    <p className="text-xs text-gray-600">Our products are free from artificial preservatives, colors, flavors, and sweeteners that could harm your pet.</p>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Vet-Formulated</p>
                    <p className="text-xs text-gray-600">Our pet products are developed in consultation with veterinarians to ensure they meet the specific needs of different animals.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="relative h-[300px] bg-gradient-to-br from-amber-50/70 to-white rounded-xl border border-amber-200/40 shadow-sm overflow-hidden order-1 md:order-2">
              <Image
                src="/images/tincture2.png"
                alt="Premium CBD Ingredients"
                fill
                className="object-contain p-6"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-50/90 via-transparent to-transparent flex items-end">
                <div className="w-full p-4 text-center">
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg border border-amber-100 p-3 shadow-sm">
                    <p className="text-amber-700 font-semibold text-sm">100% USA Grown Hemp</p>
                    <p className="text-xs text-gray-600">Our hemp is cultivated on American farms with strict quality control standards</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
} 