'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Info, Beaker, ChevronDown, Plus, Leaf } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/ui/container'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

interface CbdIngredientsSectionProps {
  pageTheme: {
    colors: {
      primary: string;
      accent: string;
      border: string;
      borderHover: string;
      background: string;
    }
  }
}

// CBD ingredients data
const cbdIngredients = [
  {
    name: "CBD (Cannabidiol)",
    scientificName: "C21H30O2",
    image: "/images/tincture2.png", 
    benefits: ["Anti-inflammatory", "Pain relief", "Anxiety reduction"],
    description: "The primary non-psychoactive cannabinoid in hemp that offers a wide range of therapeutic benefits without causing a high.",
    effects: "Interacts with the endocannabinoid system to help regulate pain, mood, inflammation, and various bodily functions for natural balance."
  },
  {
    name: "CBG (Cannabigerol)",
    scientificName: "C21H32O2",
    image: "/images/tincture2.png",
    benefits: ["Neuroprotective", "Anti-bacterial", "Appetite stimulation"],
    description: "Known as the 'mother cannabinoid' because it's the precursor from which all other cannabinoids are synthesized in the plant.",
    effects: "Shows promising therapeutic potential for inflammatory bowel disease, glaucoma, and has powerful antibacterial properties."
  },
  {
    name: "CBN (Cannabinol)",
    scientificName: "C21H26O2",
    image: "/images/tincture2.png",
    benefits: ["Sleep support", "Pain relief", "Anti-inflammatory"],
    description: "A mildly psychoactive cannabinoid that forms when THC ages and oxidizes, often found in older cannabis.",
    effects: "Known for its sedative properties, making it excellent for sleep formulations and relaxation products."
  },
  {
    name: "CBC (Cannabichromene)",
    scientificName: "C21H30O2",
    image: "/images/tincture2.png",
    benefits: ["Pain reduction", "Anti-inflammatory", "Anti-viral"],
    description: "A non-psychoactive cannabinoid that works synergistically with other cannabinoids to enhance their therapeutic effects.",
    effects: "Shows promise for pain management, promoting brain health, and fighting inflammation through unique mechanisms."
  },
  {
    name: "CBDA (Cannabidiolic Acid)",
    scientificName: "C22H30O4",
    image: "/images/tincture2.png",
    benefits: ["Anti-nausea", "Anti-inflammatory", "Anti-anxiety"],
    description: "The raw, unheated form of CBD found naturally in the hemp plant before decarboxylation.",
    effects: "Research suggests it may have stronger anti-inflammatory effects than CBD for certain conditions and excellent nausea-fighting properties."
  },
  {
    name: "CBGA (Cannabigerolic Acid)",
    scientificName: "C22H32O4",
    image: "/images/tincture2.png",
    benefits: ["Metabolic support", "Neuroprotective", "Anti-bacterial"],
    description: "The acidic precursor to CBG and the first cannabinoid formed in the plant, making it the 'stem cell' of cannabinoids.",
    effects: "Shows promising research for metabolic disorders, bacterial infections, and oxidative stress protection."
  },
  {
    name: "CBT (Cannabicitran)",
    scientificName: "C21H30O2",
    image: "/images/tincture2.png",
    benefits: ["Anti-inflammatory", "Potential eye health", "Research ongoing"],
    description: "A rare cannabinoid still being researched for its therapeutic potential and unique properties.",
    effects: "Preliminary studies suggest it may have beneficial effects on eye health and work synergistically with other cannabinoids."
  }
];

export function CbdIngredientsSection({ pageTheme }: CbdIngredientsSectionProps) {
  return (
    <section id="cbd-ingredients" className="py-6 relative overflow-hidden bg-gradient-to-b from-green-50 to-white">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-10 w-60 h-60 bg-green-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-60 h-60 bg-emerald-50 rounded-full opacity-20 blur-3xl"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-xl shadow-md p-4 overflow-hidden">
          <div className="text-center mb-4">
            <div className="inline-flex bg-gradient-to-br from-green-50/80 to-white rounded-full border border-green-200/40 shadow-sm p-1">
              <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5 font-medium">
                <Leaf className="h-3.5 w-3.5" />
                <span>Wellness Science</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3 mb-2">
              Therapeutic Cannabinoids
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-3 text-sm md:text-base">
              Discover how our premium CBD ingredients are formulated to support your health and wellness goals naturally.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            <Accordion type="single" collapsible className="w-full">
              {cbdIngredients.map((ingredient, index) => (
                <AccordionItem 
                  key={ingredient.name} 
                  value={ingredient.name}
                  className={cn(
                    "bg-white/80 border border-green-100 rounded-lg overflow-hidden mb-2",
                    "data-[state=open]:bg-gradient-to-r data-[state=open]:from-green-50/80 data-[state=open]:to-white",
                    "hover:border-green-200 transition-all duration-200"
                  )}
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline group">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <div className="hidden sm:block relative h-10 w-10 rounded-full overflow-hidden bg-green-50 border border-green-100">
                          <Image 
                            src={ingredient.image} 
                            alt={ingredient.name} 
                            fill 
                            className="object-cover"
                          />
                        </div>
                        <div className="text-left">
                          <h3 className="font-medium text-gray-900 text-sm sm:text-base group-hover:text-green-700 transition-colors">
                            {ingredient.name}
                          </h3>
                          <p className="text-xs text-gray-500 italic">{ingredient.scientificName}</p>
                        </div>
                      </div>
                      <div className="flex gap-1 flex-wrap ml-2 sm:ml-0">
                        {ingredient.benefits.map((benefit, i) => (
                          <Badge 
                            key={i} 
                            variant="outline" 
                            className="bg-green-50 text-green-700 text-[10px] border-green-100 py-0 h-4 hidden sm:inline-flex"
                          >
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-1">Wellness Benefits</h4>
                          <ul className="list-disc list-inside space-y-0.5">
                            {ingredient.benefits.map((benefit, i) => (
                              <li key={i} className="text-sm text-gray-700">{benefit}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-1">Health Application</h4>
                          <p className="text-sm text-gray-600">{ingredient.description}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-1">Therapeutic Effects</h4>
                        <p className="text-sm text-gray-600 mb-2">{ingredient.effects}</p>
                        <div className="bg-gradient-to-r from-green-50 to-white rounded-lg border border-green-100 p-3 flex items-start gap-2">
                          <Info className="h-4 w-4 text-green-700 mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-gray-600">
                            Our wellness formulations feature optimal concentrations of {ingredient.name} to maximize therapeutic benefits while maintaining purity and potency.
                          </p>
                        </div>
                        <Button 
                          size="sm" 
                          className="mt-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white"
                        >
                          <Plus className="h-3.5 w-3.5 mr-1.5" />
                          {ingredient.name.split(' ')[0]} Wellness Products
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div className="text-center mt-4">
            <Badge variant="outline" className="bg-green-50/80 text-green-700 border-green-200 px-2.5 py-1">
              <Info className="h-3.5 w-3.5 mr-1.5" />
              <span className="text-xs">All our wellness formulations are third-party tested for purity, potency, and efficacy.</span>
            </Badge>
          </div>
        </div>
      </Container>
    </section>
  )
} 