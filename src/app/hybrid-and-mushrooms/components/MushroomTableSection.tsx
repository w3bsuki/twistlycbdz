'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Info, Beaker, ChevronDown, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/ui/container'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

interface MushroomTableSectionProps {
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

// Functional mushroom data
const functionalMushrooms = [
  {
    name: "Lion's Mane",
    scientificName: "Hericium erinaceus",
    image: "/images/tincture2.png",
    benefits: ["Cognitive function", "Nerve regeneration", "Mental clarity"],
    description: "Known for its remarkable brain-boosting properties, Lion's Mane may stimulate nerve growth factor (NGF) production, supporting brain health and cognitive function.",
    cbdSynergy: "When combined with CBD, Lion's Mane creates a powerful nootropic effect, enhancing mental clarity while CBD reduces anxiety that can impair cognitive function."
  },
  {
    name: "Reishi",
    scientificName: "Ganoderma lucidum",
    image: "/images/tincture2.png",
    benefits: ["Stress reduction", "Immune modulation", "Sleep support"],
    description: "Known as the 'mushroom of immortality', Reishi is a powerful adaptogen that helps the body cope with stress and supports immune function.",
    cbdSynergy: "CBD enhances Reishi's calming effects, creating a synergistic solution for stress management and improved sleep quality."
  },
  {
    name: "Chaga",
    scientificName: "Inonotus obliquus",
    image: "/images/tincture2.png",
    benefits: ["Immune support", "Antioxidant", "Anti-inflammatory"],
    description: "A potent antioxidant powerhouse that supports immune health and reduces inflammation throughout the body.",
    cbdSynergy: "Combined with CBD's anti-inflammatory properties, Chaga creates a comprehensive approach to immune system support and inflammation management."
  },
  {
    name: "Cordyceps",
    scientificName: "Cordyceps militaris",
    image: "/images/tincture2.png",
    benefits: ["Energy", "Endurance", "Respiratory support"],
    description: "Traditionally used to boost energy and athletic performance by improving oxygen utilization and cellular energy production.",
    cbdSynergy: "While Cordyceps enhances energy and performance, CBD helps manage exercise-induced inflammation for better recovery."
  },
  {
    name: "Shiitake",
    scientificName: "Lentinula edodes",
    image: "/images/tincture2.png",
    benefits: ["Immune health", "Cardiovascular support", "Cellular health"],
    description: "Rich in polysaccharides that support immune function and overall cellular health with powerful antioxidant properties.",
    cbdSynergy: "The combination creates a whole-body wellness approach, supporting immune regulation while CBD adds stress-relief benefits."
  },
  {
    name: "Maitake",
    scientificName: "Grifola frondosa",
    image: "/images/tincture2.png",
    benefits: ["Metabolic health", "Immune support", "Adaptogenic"],
    description: "Known as 'hen of the woods', Maitake contains unique beta-glucans that support metabolic health and immune function.",
    cbdSynergy: "CBD enhances Maitake's adaptogenic properties, helping to maintain homeostasis while supporting overall wellness."
  },
  {
    name: "Turkey Tail",
    scientificName: "Trametes versicolor",
    image: "/images/tincture2.png",
    benefits: ["Immune defense", "Gut health", "Cellular support"],
    description: "One of the most researched medicinal mushrooms with powerful immunomodulating properties and prebiotic benefits.",
    cbdSynergy: "Together with CBD, Turkey Tail creates a powerful defense system, supporting both immune and gut health—the foundation of overall wellness."
  }
];

export function MushroomTableSection({ pageTheme }: MushroomTableSectionProps) {
  return (
    <section id="learn-more" className="py-6 relative overflow-hidden bg-gradient-to-b from-amber-50 to-white">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-10 w-60 h-60 bg-amber-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-60 h-60 bg-amber-50 rounded-full opacity-20 blur-3xl"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="bg-white/80 backdrop-blur-sm border border-amber-200 rounded-xl shadow-md p-4 overflow-hidden">
          <div className="text-center mb-4">
            <div className="inline-flex bg-gradient-to-br from-amber-50/80 to-white rounded-full border border-amber-200/40 shadow-sm p-1">
              <div className="bg-gradient-to-r from-amber-800 to-amber-700 text-white px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5 font-medium">
                <Beaker className="h-3.5 w-3.5" />
                <span>Mushroom Spotlight</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3 mb-2">
              Meet the Functional Fungi
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-3 text-sm md:text-base">
              Explore the unique benefits of each functional mushroom used in our hybrid blends and how they synergize with CBD.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            <Accordion type="single" collapsible className="w-full">
              {functionalMushrooms.map((mushroom, index) => (
                <AccordionItem 
                  key={mushroom.name} 
                  value={mushroom.name}
                  className={cn(
                    "bg-white/80 border border-amber-100 rounded-lg overflow-hidden mb-2",
                    "data-[state=open]:bg-gradient-to-r data-[state=open]:from-amber-50/80 data-[state=open]:to-white",
                    "hover:border-amber-200 transition-all duration-200"
                  )}
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline group">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <div className="hidden sm:block relative h-10 w-10 rounded-full overflow-hidden bg-amber-50 border border-amber-100">
                          <Image 
                            src={mushroom.image} 
                            alt={mushroom.name} 
                            fill 
                            className="object-cover"
                          />
                        </div>
                        <div className="text-left">
                          <h3 className="font-medium text-gray-900 text-sm sm:text-base group-hover:text-amber-800 transition-colors">
                            {mushroom.name}
                          </h3>
                          <p className="text-xs text-gray-500 italic">{mushroom.scientificName}</p>
                        </div>
                      </div>
                      <div className="flex gap-1 flex-wrap ml-2 sm:ml-0">
                        {mushroom.benefits.map((benefit, i) => (
                          <Badge 
                            key={i} 
                            variant="outline" 
                            className="bg-amber-50 text-amber-700 text-[10px] border-amber-100 py-0 h-4 hidden sm:inline-flex"
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
                          <h4 className="text-sm font-medium text-gray-900 mb-1">Key Benefits</h4>
                          <ul className="list-disc list-inside space-y-0.5">
                            {mushroom.benefits.map((benefit, i) => (
                              <li key={i} className="text-sm text-gray-700">{benefit}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-1">Description</h4>
                          <p className="text-sm text-gray-600">{mushroom.description}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-1">CBD Synergy</h4>
                        <p className="text-sm text-gray-600 mb-2">{mushroom.cbdSynergy}</p>
                        <div className="bg-gradient-to-r from-amber-50 to-white rounded-lg border border-amber-100 p-3 flex items-start gap-2">
                          <Info className="h-4 w-4 text-amber-700 mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-gray-600">
                            Our unique formulation process maximizes the benefits of both {mushroom.name} and CBD, creating a synergistic effect that enhances overall effectiveness.
                          </p>
                        </div>
                        <Button 
                          size="sm" 
                          className="mt-3 bg-gradient-to-r from-amber-800 to-amber-700 hover:from-amber-700 hover:to-amber-600 text-white"
                        >
                          <Plus className="h-3.5 w-3.5 mr-1.5" />
                          Shop {mushroom.name} Products
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div className="text-center mt-4">
            <Badge variant="outline" className="bg-amber-50/80 text-amber-700 border-amber-200 px-2.5 py-1">
              <Info className="h-3.5 w-3.5 mr-1.5" />
              <span className="text-xs">Our mushroom extracts are professionally cultivated, rigorously tested, and combined with premium CBD for maximum efficacy.</span>
            </Badge>
          </div>
        </div>
      </Container>
    </section>
  );
} 