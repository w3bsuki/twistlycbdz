'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { Container } from '@/components/ui/container'
import { Star, MessageSquare } from 'lucide-react'

// Theme interface
interface PageTheme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    border: string;
    borderHover: string;
    background: string;
  };
  gradients: {
    section: string;
    button: string;
  };
}

interface TestimonialsSectionProps {
  pageTheme: PageTheme;
}

// Static data for testimonials
const testimonials = [
  {
    quote: "The CBD Face Serum has completely transformed my skin. After a month of use, my fine lines are visibly reduced and my skin looks more radiant than ever.",
    author: "Rebecca L.",
    role: "Beauty Enthusiast",
    image: "/images/tincture2.png",
    rating: 5
  },
  {
    quote: "I've struggled with sensitive skin for years. The CBD Facial Cream is the first product that hasn't caused irritation while still providing deep hydration.",
    author: "Daniel T.",
    role: "Skincare Minimalist",
    image: "/images/tincture2.png",
    rating: 5
  },
  {
    quote: "The CBD Body Lotion has been a game-changer for my dry skin. It absorbs quickly without feeling greasy and keeps my skin hydrated all day.",
    author: "Sophia K.",
    role: "Holistic Beauty Advocate",
    image: "/images/tincture2.png",
    rating: 4
  },
  // Add more if needed
]

export function TestimonialsSection({ pageTheme }: TestimonialsSectionProps) {
  // Theme setup
  const primaryColor = pageTheme.colors.primary || 'pink-600'
  const primaryColorName = primaryColor.split('-')[0]
  const primaryLight = `${primaryColorName}-50`
  const primaryLighter = `${primaryColorName}-100`
  const primaryLightest = `${primaryColorName}-200`

  const sectionBg = `bg-gradient-to-b from-${primaryLight} to-white`
  const borderLight = `border-${primaryLightest}`
  const borderLighter = `border-${primaryLighter}` // Defined for consistency
  const buttonGradient = pageTheme.gradients.button

  return (
    <section className={`py-6 relative overflow-hidden ${sectionBg}`} id="testimonials">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-40 right-10 w-60 h-60 bg-${primaryLighter} rounded-full opacity-20 blur-3xl`}></div>
        <div className={`absolute bottom-20 left-10 w-60 h-60 bg-${primaryColorName}-50 rounded-full opacity-20 blur-3xl`}></div>
      </div>
      
      <Container className="relative z-10">
        <div className={`bg-white/80 backdrop-blur-sm ${borderLight} rounded-xl shadow-md p-4 overflow-hidden`}>
          <div className="text-center mb-4">
            <div className={`inline-flex bg-gradient-to-br from-${primaryLight}/80 to-white rounded-full border ${borderLight}/40 shadow-sm p-1`}>
              <div className={`${buttonGradient} text-white px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5 font-medium`}>
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Real Results</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3 mb-2">Hear From Our Community</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              See how others are enhancing their beauty routine with CBD.
            </p>
          </div>

          <InfiniteSlider
            direction="right"
            speed="slow"
            pauseOnHover={true}
            className="py-2"
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="px-1.5 min-w-[280px] max-w-[320px]">
                <Card className={`bg-white/70 shadow-sm border ${borderLighter} h-full hover:${borderLight} transition-colors`}>
                  <CardContent className="p-4 flex flex-col h-full">
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          fill={i < testimonial.rating ? "currentColor" : "none"}
                          className={`h-3.5 w-3.5 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-700 italic mb-3 flex-grow">"{testimonial.quote}"</p>
                    <div className={`flex items-center mt-auto pt-2 border-t ${borderLighter}`}>
                      <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-100 mr-2 flex items-center justify-center">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.author}
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-xs text-gray-900">{testimonial.author}</p>
                        <p className="text-[11px] text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </InfiniteSlider>
        </div>
      </Container>
    </section>
  )
} 