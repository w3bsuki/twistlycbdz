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

// Hybrid product testimonials data
const testimonials = [
  {
    quote: "The hybrid CBD and Lion's Mane tincture has dramatically improved my focus throughout the workday. I feel more productive and less mentally fatigued.",
    author: "Jennifer L.",
    role: "Software Developer",
    image: "/images/tincture2.png",
    rating: 5
  },
  {
    quote: "I've struggled with stress-induced inflammation for years. The CBD-Reishi blend has been a game-changer for both my mental calm and physical comfort.",
    author: "Marcus T.",
    role: "Teacher",
    image: "/images/tincture2.png",
    rating: 5
  },
  {
    quote: "The combination of Cordyceps and CBD in these capsules has noticeably improved my endurance during workouts and recovery afterward.",
    author: "Samantha R.",
    role: "Fitness Instructor",
    image: "/images/tincture2.png",
    rating: 4
  },
  {
    quote: "As someone dealing with chronic sleep issues, the CBD-Turkey Tail nighttime formula has significantly improved my sleep quality without feeling groggy the next day.",
    author: "David K.",
    role: "Business Consultant",
    image: "/images/tincture2.png",
    rating: 5
  },
  {
    quote: "The cognitive benefits of combining Lion's Mane with CBD are real. My focus and memory have improved, and I feel more mentally sharp throughout the day.",
    author: "Elena M.",
    role: "Graduate Student",
    image: "/images/tincture2.png",
    rating: 4
  }
]

export function TestimonialsSection({ pageTheme }: TestimonialsSectionProps) {
  return (
    <section className="py-6 relative overflow-hidden bg-gradient-to-b from-amber-50 to-white" id="testimonials">
      {/* Simple background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-10 w-60 h-60 bg-amber-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-60 h-60 bg-amber-50 rounded-full opacity-20 blur-3xl"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="bg-white/80 backdrop-blur-sm border border-amber-200 rounded-xl shadow-md p-4 overflow-hidden">
          <div className="text-center mb-4">
            <div className="inline-flex bg-gradient-to-br from-amber-50/80 to-white rounded-full border border-amber-200/40 shadow-sm p-1">
              <div className="bg-gradient-to-r from-amber-800 to-amber-700 text-white px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5 font-medium">
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Customer Stories</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3 mb-2">User Testimonials</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              Hear from people who have experienced the synergistic benefits of our CBD and mushroom blends
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
                <Card className="bg-white/70 shadow-sm border border-amber-100 h-full hover:border-amber-200 transition-colors">
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
                    <div className="flex items-center mt-auto pt-2 border-t border-amber-100">
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