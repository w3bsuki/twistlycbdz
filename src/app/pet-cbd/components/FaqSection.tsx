'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { HelpCircle } from 'lucide-react'
import { Container } from '@/components/ui/container'

interface FaqSectionProps {
  pageTheme: {
    colors: {
      primary: string;
      accent: string;
    }
  }
}

const faqs = [
  {
    question: "Is CBD safe for pets?",
    answer: "Yes, CBD is generally considered safe for pets when used appropriately. Our pet CBD products are specially formulated with pet-safe ingredients and contain no THC, the psychoactive compound found in cannabis. Always consult with your veterinarian before starting any new supplement regimen for your pet, especially if they have existing health conditions or are taking other medications."
  },
  {
    question: "How do I determine the right CBD dosage for my pet?",
    answer: "CBD dosing depends on your pet's weight, the condition being treated, and your pet's individual sensitivity. Our products come with detailed dosing guidelines based on weight. We recommend starting with a lower dose and gradually increasing until you see the desired effects. A general starting guideline is 0.25mg of CBD per pound of body weight twice daily, but always follow the specific instructions on the product packaging."
  },
  {
    question: "How long does it take for CBD to work in pets?",
    answer: "The time it takes for CBD to take effect varies depending on administration method and your pet's individual metabolism. For acute issues like anxiety during thunderstorms, effects may be noticeable within 30-60 minutes. For chronic conditions like joint pain or ongoing anxiety, it may take 2-4 weeks of consistent use to see significant improvements. Consistency is key when giving CBD to pets for long-term health issues."
  },
  {
    question: "What's the difference between pet CBD and human CBD products?",
    answer: "Pet-specific CBD products are formulated with concentrations and ingredients appropriate for animals. They often include pet-friendly flavors like bacon or fish to increase palatability. Human CBD products may contain ingredients that are harmful to pets (like certain essential oils or higher THC levels) and should never be given to animals. Always use products specifically designed for pets."
  },
  {
    question: "Will CBD make my pet high?",
    answer: "No, CBD will not make your pet high. All our pet CBD products contain less than 0.3% THC (the psychoactive compound in cannabis), which is not enough to cause any intoxicating effects. Our products focus on delivering the beneficial properties of CBD without any mind-altering effects, making them safe and appropriate for daily use in pets."
  },
  {
    question: "Can CBD interact with my pet's medications?",
    answer: "Yes, CBD can potentially interact with certain medications by affecting how they're metabolized in the liver. If your pet is taking any prescription medications, especially those with a \"grapefruit warning,\" it's important to consult with your veterinarian before starting CBD. This includes medications for seizures, heart conditions, anxiety, or pain management."
  },
  {
    question: "What conditions can CBD help with in pets?",
    answer: "CBD may help with various conditions in pets including anxiety (separation, noise phobias, travel), joint pain and inflammation from arthritis or age-related issues, mild seizures, digestive upset, and skin conditions. It's also being researched for its potential benefits in supporting pets with cancer symptoms and treatment side effects. While CBD can be beneficial, it's not a cure-all and should be part of a comprehensive health plan for your pet."
  },
  {
    question: "How should I store my pet's CBD products?",
    answer: "Store all CBD products in a cool, dry place away from direct sunlight. For oils and tinctures, refrigeration after opening can extend shelf life but isn't required. Always keep CBD products out of reach of children and pets to prevent accidental overconsumption. Check the specific storage instructions and expiration dates on each product for best results."
  },
]

export function FaqSection({ pageTheme }: FaqSectionProps) {
  return (
    <section className="py-6 relative overflow-hidden bg-gradient-to-b from-amber-50 to-white">
      {/* Simple background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-10 w-60 h-60 bg-amber-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-60 h-60 bg-amber-50 rounded-full opacity-20 blur-3xl"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="bg-white/80 backdrop-blur-sm border border-amber-200 rounded-xl shadow-md p-4 overflow-hidden">
          <div className="text-center mb-6">
            <div className="inline-flex bg-gradient-to-br from-amber-50/80 to-white rounded-full border border-amber-200/40 shadow-sm p-1">
              <div className="bg-gradient-to-r from-amber-600 to-amber-500 text-white px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5 font-medium">
                <HelpCircle className="h-3.5 w-3.5" />
                <span>FAQ</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3 mb-2">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-2 text-sm">
              Everything you need to know about CBD for your pets
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-amber-50/70 to-white rounded-xl border border-amber-200/40 shadow-sm p-3 md:p-5 max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-amber-200/70">
                  <AccordionTrigger className="text-left font-medium text-gray-900 hover:text-amber-700 py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 text-sm">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </Container>
    </section>
  )
} 