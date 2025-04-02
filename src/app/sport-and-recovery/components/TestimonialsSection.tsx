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

// Athlete testimonials data
const testimonials = [
  {
    quote: "The Recovery CBD Balm is now a permanent part of my post-workout routine. It helps me bounce back faster after intense training sessions and keeps me performing at my best.",
    author: "Michael R.",
    role: "Professional Cyclist",
    image: "/images/tincture2.png",
    rating: 5
  },
  {
    quote: "As a marathon runner, recovery is everything. The Sport CBD Oil has made a noticeable difference in how quickly I recover between training runs. I'm a believer!",
    author: "Emma S.",
    role: "Marathon Runner",
    image: "/images/tincture2.png",
    rating: 5
  },
  {
    quote: "The Muscle Gel provides immediate relief after my CrossFit sessions. The cooling sensation combined with the CBD benefits is exactly what my muscles need.",
    author: "Jason T.",
    role: "CrossFit Athlete",
    image: "/images/tincture2.png",
    rating: 4
  },
  {
    quote: "I was skeptical at first, but the CBD capsules help me stay calm and focused before competitions. It's a game-changer for my mental preparation.",
    author: "Sarah K.",
    role: "Competitive Swimmer",
    image: "/images/tincture2.png",
    rating: 5
  },
  {
    quote: "Using the CBD Protein Powder post-workout has noticeably reduced my muscle soreness the next day. Great taste too!",
    author: "David L.",
    role: "Weightlifter",
    image: "/images/tincture2.png",
    rating: 4
  }
]

export function TestimonialsSection({ pageTheme }: TestimonialsSectionProps) {
  return (
    <section className="py-6 relative overflow-hidden bg-gradient-to-b from-blue-50 to-white" id="testimonials">
      {/* Simple background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-10 w-60 h-60 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-60 h-60 bg-cyan-50 rounded-full opacity-20 blur-3xl"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-xl shadow-md p-4 overflow-hidden">
          <div className="text-center mb-4">
            <div className="inline-flex bg-gradient-to-br from-blue-50/80 to-white rounded-full border border-blue-200/40 shadow-sm p-1">
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5 font-medium">
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Athlete Stories</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3 mb-2">Athlete Testimonials</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              Hear from athletes who have incorporated our CBD products into their training
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
                <Card className="bg-white/70 shadow-sm border border-blue-100 h-full hover:border-blue-200 transition-colors">
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
                    <div className="flex items-center mt-auto pt-2 border-t border-blue-100">
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