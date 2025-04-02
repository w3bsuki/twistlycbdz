'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Info, Beaker, ChevronDown, Plus, Dumbbell } from 'lucide-react'
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

// CBD ingredients data with sport-specific benefits
const cbdIngredients = [
  {
    name: "CBD (Cannabidiol)",
    scientificName: "C21H30O2",
    image: "/images/tincture2.png",
    benefits: ["Recovery acceleration", "Inflammation reduction", "Pain management"],
    description: "The primary non-psychoactive cannabinoid in hemp that offers powerful recovery benefits for athletes without causing a high or affecting performance.",
    effects: "Works with the endocannabinoid system to reduce exercise-induced inflammation, manage pain, and promote faster recovery between training sessions."
  },
  {
    name: "CBG (Cannabigerol)",
    scientificName: "C21H32O2",
    image: "/images/tincture2.png",
    benefits: ["Muscle recovery", "Anti-inflammatory", "Energy support"],
    description: "Known as the 'mother cannabinoid' that shows promise for athletes looking to enhance recovery and maintain peak performance.",
    effects: "Research suggests CBG may help reduce muscle inflammation after intense exercise and support overall physical resilience and energy levels."
  },
  {
    name: "CBN (Cannabinol)",
    scientificName: "C21H26O2",
    image: "/images/tincture2.png",
    benefits: ["Sleep optimization", "Recovery enhancement", "Stress reduction"],
    description: "A mildly psychoactive cannabinoid that forms when THC ages and oxidizes, excellent for athlete sleep and recovery formulations.",
    effects: "Known for promoting deep, restorative sleep—essential for athletes' recovery, muscle repair, and performance optimization."
  },
  {
    name: "CBC (Cannabichromene)",
    scientificName: "C21H30O2",
    image: "/images/tincture2.png",
    benefits: ["Joint support", "Post-workout recovery", "Analgesic effects"],
    description: "A non-psychoactive cannabinoid that works synergistically with other cannabinoids to enhance recovery and pain management for athletes.",
    effects: "Shows promise for managing exercise-induced discomfort, supporting joint health, and enhancing the body's natural recovery mechanisms."
  },
  {
    name: "CBDA (Cannabidiolic Acid)",
    scientificName: "C22H30O4",
    image: "/images/tincture2.png",
    benefits: ["Enhanced COX-2 inhibition", "Inflammation control", "Nausea reduction"],
    description: "The raw, unheated form of CBD found naturally in the hemp plant before decarboxylation, with unique benefits for athletes.",
    effects: "Research suggests it may have stronger anti-inflammatory effects through superior COX-2 enzyme inhibition, similar to NSAIDs but without digestive side effects."
  },
  {
    name: "CBGA (Cannabigerolic Acid)",
    scientificName: "C22H32O4",
    image: "/images/tincture2.png",
    benefits: ["Metabolic support", "Energy regulation", "Recovery enhancement"],
    description: "The acidic precursor to CBG and the first cannabinoid formed in the plant, showing promise for athletic performance support.",
    effects: "May help regulate metabolism and energy production during intense training, potentially supporting athletic endurance and recovery."
  },
  {
    name: "Beta-Caryophyllene",
    scientificName: "C15H24",
    image: "/images/tincture2.png",
    benefits: ["Targeted inflammation relief", "Pain reduction", "Digestive health"],
    description: "A terpene that acts as a cannabinoid, directly activating CB2 receptors without psychoactive effects—ideal for athletes.",
    effects: "Provides targeted anti-inflammatory benefits specifically for peripheral inflammation from training, without central nervous system effects."
  }
];

export function CbdIngredientsSection({ pageTheme }: CbdIngredientsSectionProps) {
  return (
    <section id="cbd-ingredients" className="py-6 relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-10 w-60 h-60 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-60 h-60 bg-cyan-50 rounded-full opacity-20 blur-3xl"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-xl shadow-md p-4 overflow-hidden">
          <div className="text-center mb-4">
            <div className="inline-flex bg-gradient-to-br from-blue-50/80 to-white rounded-full border border-blue-200/40 shadow-sm p-1">
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5 font-medium">
                <Dumbbell className="h-3.5 w-3.5" />
                <span>Sport Science</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3 mb-2">
              Performance-Enhancing Cannabinoids
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-3 text-sm md:text-base">
              Discover how our premium CBD ingredients are formulated to support athletic performance, recovery, and overall fitness goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            <Accordion type="single" collapsible className="w-full">
              {cbdIngredients.map((ingredient, index) => (
                <AccordionItem 
                  key={ingredient.name} 
                  value={ingredient.name}
                  className={cn(
                    "bg-white/80 border border-blue-100 rounded-lg overflow-hidden mb-2",
                    "data-[state=open]:bg-gradient-to-r data-[state=open]:from-blue-50/80 data-[state=open]:to-white",
                    "hover:border-blue-200 transition-all duration-200"
                  )}
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline group">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <div className="hidden sm:block relative h-10 w-10 rounded-full overflow-hidden bg-blue-50 border border-blue-100">
                          <Image 
                            src={ingredient.image} 
                            alt={ingredient.name} 
                            fill 
                            className="object-cover"
                          />
                        </div>
                        <div className="text-left">
                          <h3 className="font-medium text-gray-900 text-sm sm:text-base group-hover:text-blue-700 transition-colors">
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
                            className="bg-blue-50 text-blue-700 text-[10px] border-blue-100 py-0 h-4 hidden sm:inline-flex"
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
                          <h4 className="text-sm font-medium text-gray-900 mb-1">Athletic Benefits</h4>
                          <ul className="list-disc list-inside space-y-0.5">
                            {ingredient.benefits.map((benefit, i) => (
                              <li key={i} className="text-sm text-gray-700">{benefit}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-1">Sport Application</h4>
                          <p className="text-sm text-gray-600">{ingredient.description}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-1">Performance Impact</h4>
                        <p className="text-sm text-gray-600 mb-2">{ingredient.effects}</p>
                        <div className="bg-gradient-to-r from-blue-50 to-white rounded-lg border border-blue-100 p-3 flex items-start gap-2">
                          <Info className="h-4 w-4 text-blue-700 mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-gray-600">
                            Our sport formulations feature optimal concentrations of {ingredient.name} to maximize recovery benefits without compromising performance or testing regulations.
                          </p>
                        </div>
                        <Button 
                          size="sm" 
                          className="mt-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white"
                        >
                          <Plus className="h-3.5 w-3.5 mr-1.5" />
                          {ingredient.name.split(' ')[0]} Sport Products
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div className="text-center mt-4">
            <Badge variant="outline" className="bg-blue-50/80 text-blue-700 border-blue-200 px-2.5 py-1">
              <Info className="h-3.5 w-3.5 mr-1.5" />
              <span className="text-xs">All our sport formulations are third-party tested and designed to comply with professional sports testing regulations.</span>
            </Badge>
          </div>
        </div>
      </Container>
    </section>
  );
} 