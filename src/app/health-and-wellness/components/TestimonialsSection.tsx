'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, MessageSquare } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/ui/container'
import { InfiniteSlider } from '@/components/ui/infinite-slider'

interface TestimonialsSectionProps {
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

// Wellness testimonials data
const testimonials = [
  {
    quote: "I've struggled with sleep issues for years. The CBD Sleep Formula has made a noticeable difference in how quickly I fall asleep and how rested I feel the next day.",
    author: "Rachel K.",
    role: "Teacher",
    image: "/images/tincture2.png",
    rating: 5
  },
  {
    quote: "As someone dealing with chronic stress, the Full Spectrum CBD Oil has become an essential part of my daily wellness routine. I feel more balanced and centered.",
    author: "Daniel M.",
    role: "Software Engineer",
    image: "/images/tincture2.png",
    rating: 5
  },
  {
    quote: "The Wellness Plus CBD has been a game-changer for my overall well-being. I've noticed improved focus during the day and better relaxation in the evenings.",
    author: "Sophia L.",
    role: "Healthcare Professional",
    image: "/images/tincture2.png",
    rating: 4
  },
  {
    quote: "After trying several CBD brands, I've found that this one offers the most consistent quality and effectiveness for managing my daily stress levels.",
    author: "James T.",
    role: "Business Owner",
    image: "/images/tincture2.png",
    rating: 5
  },
  {
    quote: "The Broad Spectrum CBD Oil has helped me maintain mental clarity and focus throughout my workday without any drowsiness.",
    author: "Emma R.",
    role: "Marketing Executive",
    image: "/images/tincture2.png",
    rating: 4
  }
]

export function TestimonialsSection({ pageTheme }: TestimonialsSectionProps) {
  return (
    <section className="py-6 relative overflow-hidden bg-gradient-to-b from-green-50 to-white" id="testimonials">
      {/* Simple background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-10 w-60 h-60 bg-green-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-60 h-60 bg-emerald-50 rounded-full opacity-20 blur-3xl"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-xl shadow-md p-4 overflow-hidden">
          <div className="text-center mb-4">
            <div className="inline-flex bg-gradient-to-br from-green-50/80 to-white rounded-full border border-green-200/40 shadow-sm p-1">
              <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5 font-medium">
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Success Stories</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3 mb-2">Customer Testimonials</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              Read what our customers are saying about how our CBD products have improved their well-being
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
                <Card className="bg-white/70 shadow-sm border border-green-100 h-full hover:border-green-200 transition-colors">
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
                    <div className="flex items-center mt-auto pt-2 border-t border-green-100">
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