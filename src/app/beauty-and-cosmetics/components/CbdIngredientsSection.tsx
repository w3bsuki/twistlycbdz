'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Info, Sparkles, ChevronDown, Plus, Flower } from 'lucide-react'
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

// CBD ingredients data with beauty-specific benefits
const cbdIngredients = [
  {
    name: "CBD (Cannabidiol)",
    scientificName: "C21H30O2",
    image: "/images/tincture2.png",
    benefits: ["Anti-inflammatory", "Sebum regulation", "Antioxidant protection"],
    description: "A powerful non-psychoactive cannabinoid that helps calm skin irritation, reduce redness, and balance oil production for clearer complexion.",
    effects: "CBD's anti-inflammatory and antioxidant properties help protect skin from environmental stressors while promoting overall skin health and radiance."
  },
  {
    name: "CBG (Cannabigerol)",
    scientificName: "C21H32O2",
    image: "/images/tincture2.png",
    benefits: ["Antibacterial", "Brightening effect", "Skin balancing"],
    description: "Often called the 'stem cell cannabinoid', CBG shows promise in combating bacterial skin issues, regulating sebum, and promoting skin clarity.",
    effects: "Research suggests CBG has powerful antibacterial properties that may help with acne and skin infections while promoting a more even skin tone."
  },
  {
    name: "CBC (Cannabichromene)",
    scientificName: "C21H30O2",
    image: "/images/tincture2.png",
    benefits: ["Acne reduction", "Anti-aging", "Moisture retention"],
    description: "A non-psychoactive cannabinoid that works synergistically with other cannabinoids to promote skin healing and prevent moisture loss.",
    effects: "May help inhibit inflammation associated with acne while supporting skin's natural moisture barrier and cellular regeneration."
  },
  {
    name: "CBDA (Cannabidiolic Acid)",
    scientificName: "C22H30O4",
    image: "/images/tincture2.png",
    benefits: ["Potent anti-inflammatory", "Skin soothing", "Redness reduction"],
    description: "The raw, acidic form of CBD that offers enhanced anti-inflammatory benefits for sensitive or irritated skin conditions.",
    effects: "Research suggests CBDA may have even stronger anti-inflammatory effects than CBD for soothing reactive skin and reducing visible redness."
  },
  {
    name: "CBDV (Cannabidivarin)",
    scientificName: "C19H26O2",
    image: "/images/tincture2.png",
    benefits: ["Redness reduction", "Skin calming", "Sensitive skin support"],
    description: "A non-psychoactive cannabinoid similar to CBD that shows promise for sensitive, reactive skin types.",
    effects: "May help calm irritated skin conditions and reduce visible signs of inflammation while supporting the skin's natural barrier function."
  },
  {
    name: "Beta-Caryophyllene",
    scientificName: "C15H24",
    image: "/images/tincture2.png",
    benefits: ["Anti-aging", "Barrier repair", "Skin calming"],
    description: "A unique terpene that acts as a cannabinoid, activating CB2 receptors to help reduce signs of skin aging and environmental damage.",
    effects: "Provides targeted anti-inflammatory benefits to help repair and protect the skin barrier against environmental stressors and aging factors."
  },
  {
    name: "Terpineol",
    scientificName: "C10H18O",
    image: "/images/tincture2.png",
    benefits: ["Antioxidant", "Soothing fragrance", "Skin protection"],
    description: "A naturally occurring terpene in cannabis with a pleasant lilac scent and powerful antioxidant properties for skin health.",
    effects: "Helps neutralize free radicals that cause premature aging while providing a natural, calming scent profile to our beauty formulations."
  }
];

export function CbdIngredientsSection({ pageTheme }: CbdIngredientsSectionProps) {
  return (
    <section id="cbd-ingredients" className="py-6 relative overflow-hidden bg-gradient-to-b from-purple-50 to-white">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-10 w-60 h-60 bg-purple-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-60 h-60 bg-pink-50 rounded-full opacity-20 blur-3xl"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="bg-white/80 backdrop-blur-sm border border-purple-200 rounded-xl shadow-md p-4 overflow-hidden">
          <div className="text-center mb-4">
            <div className="inline-flex bg-gradient-to-br from-purple-50/80 to-white rounded-full border border-purple-200/40 shadow-sm p-1">
              <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5 font-medium">
                <Flower className="h-3.5 w-3.5" />
                <span>Beauty Ingredients</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3 mb-2">
              Skin-Transforming Cannabinoids
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-3 text-sm md:text-base">
              Discover the plant-powered ingredients in our beauty formulations that help reveal your skin's natural radiance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            <Accordion type="single" collapsible className="w-full">
              {cbdIngredients.map((ingredient, index) => (
                <AccordionItem 
                  key={ingredient.name} 
                  value={ingredient.name}
                  className={cn(
                    "bg-white/80 border border-purple-100 rounded-lg overflow-hidden mb-2",
                    "data-[state=open]:bg-gradient-to-r data-[state=open]:from-purple-50/80 data-[state=open]:to-white",
                    "hover:border-purple-200 transition-all duration-200"
                  )}
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline group">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <div className="hidden sm:block relative h-10 w-10 rounded-full overflow-hidden bg-purple-50 border border-purple-100">
                          <Image 
                            src={ingredient.image} 
                            alt={ingredient.name} 
                            fill 
                            className="object-cover"
                          />
                        </div>
                        <div className="text-left">
                          <h3 className="font-medium text-gray-900 text-sm sm:text-base group-hover:text-purple-700 transition-colors">
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
                            className="bg-purple-50 text-purple-700 text-[10px] border-purple-100 py-0 h-4 hidden sm:inline-flex"
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
                          <h4 className="text-sm font-medium text-gray-900 mb-1">Beauty Benefits</h4>
                          <ul className="list-disc list-inside space-y-0.5">
                            {ingredient.benefits.map((benefit, i) => (
                              <li key={i} className="text-sm text-gray-700">{benefit}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-1">Skincare Application</h4>
                          <p className="text-sm text-gray-600">{ingredient.description}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-1">Beauty Science</h4>
                        <p className="text-sm text-gray-600 mb-2">{ingredient.effects}</p>
                        <div className="bg-gradient-to-r from-purple-50 to-white rounded-lg border border-purple-100 p-3 flex items-start gap-2">
                          <Info className="h-4 w-4 text-purple-700 mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-gray-600">
                            Our beauty formulations use scientifically optimized concentrations of {ingredient.name} combined with complementary botanical extracts for enhanced efficacy.
                          </p>
                        </div>
                        <Button 
                          size="sm" 
                          className="mt-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white"
                        >
                          <Plus className="h-3.5 w-3.5 mr-1.5" />
                          {ingredient.name.split(' ')[0]} Beauty Products
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div className="text-center mt-4">
            <Badge variant="outline" className="bg-purple-50/80 text-purple-700 border-purple-200 px-2.5 py-1">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              <span className="text-xs">Our beauty formulations are dermatologist-tested, cruelty-free, and formulated without harsh chemicals or synthetic fragrances.</span>
            </Badge>
          </div>
        </div>
      </Container>
    </section>
  );
} 