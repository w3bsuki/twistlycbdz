'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight, BadgeCheck, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

const testimonials = [
  {
    id: 1,
    name: "Sarah T.",
    location: "Colorado",
    avatar: "/images/1.png",
    rating: 5,
    text: "I've struggled with anxiety for years. The CBD oil from Twistly has been a game-changer for me. I feel calmer and more focused throughout the day.",
    product: "Premium CBD Oil",
    verified: true,
    date: "March 15, 2024"
  },
  {
    id: 2,
    name: "Michael R.",
    location: "Oregon",
    avatar: "/images/2.png",
    rating: 5,
    text: "As an athlete, recovery is everything. The Sport Recovery balm has significantly reduced my muscle soreness after intense workouts. Highly recommend!",
    product: "Sport Recovery Balm",
    verified: true,
    date: "February 28, 2024"
  },
  {
    id: 3,
    name: "Jennifer L.",
    location: "California",
    avatar: "/images/3.png",
    rating: 4,
    text: "I've tried many CBD face serums, but this one truly stands out. My skin looks more radiant, and fine lines have visibly diminished after just a few weeks.",
    product: "CBD Face Serum",
    verified: true,
    date: "March 5, 2024"
  },
  {
    id: 4,
    name: "David W.",
    location: "Illinois",
    avatar: "/images/4.png",
    rating: 5,
    text: "My dog used to get really anxious during thunderstorms. The pet CBD oil has made a remarkable difference in his behavior. He's so much calmer now.",
    product: "Pet Calm CBD Oil",
    verified: true,
    date: "January 20, 2024"
  },
  {
    id: 5,
    name: "Emma S.",
    location: "New York",
    avatar: "/images/5.png",
    rating: 4,
    text: "The Cognitive Support capsules have improved my focus and mental clarity at work. I feel more productive and less mentally fatigued by the end of the day.",
    product: "Cognitive Support Capsules",
    verified: true,
    date: "March 12, 2024"
  },
  {
    id: 6,
    name: "Thomas K.",
    location: "Texas",
    avatar: "/images/2.png",
    rating: 5,
    text: "After struggling with sleep issues, I decided to try Twistly's CBD gummies. I'm now getting consistent, restful sleep for the first time in years.",
    product: "Sleep CBD Gummies",
    verified: true,
    date: "February 8, 2024"
  }
]

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  
  // Get indices for displayed testimonials
  const displayIndices = [];
  for (let i = 0; i < 3; i++) {
    displayIndices.push((activeIndex + i) % testimonials.length);
  }
  
  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-b from-amber-50 to-white">
      {/* Background decoration - simplified for mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full opacity-30 blur-3xl bg-amber-500/40"></div>
        <div className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full opacity-30 blur-3xl bg-amber-500/30"></div>
      </div>
      
      {/* Main container - matching responsive approach used in other sections */}
      <Container className="relative z-10 bg-white backdrop-blur-sm rounded-xl shadow-md border border-amber-200/90 p-3 sm:p-4 lg:p-5 w-full mx-auto">
        {/* Header with nested container design */}
        <div className="mb-5 sm:mb-6">
          {/* Nested container for the section header - matching category styling */}
          <div className="bg-gradient-to-b from-amber-50/80 to-white p-3 sm:p-4 rounded-xl border border-amber-100/80 shadow-sm relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20 blur-2xl bg-amber-200/30"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full opacity-20 blur-2xl bg-amber-100/30"></div>
            </div>
            
            <div className="text-center relative z-10">
              {/* Spinning logo with improved styling */}
              <div className="flex justify-center mb-1 sm:mb-1.5">
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full relative bg-transparent transition-all duration-500 shadow-[0_10px_20px_rgba(var(--amber-rgb)/0.15),_inset_0_0_0_1px_rgba(var(--amber-rgb)/0.2)] p-0.5">
                  <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden bg-transparent after:absolute after:inset-0 after:rounded-full after:shadow-inner">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ 
                        duration: 20, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }}
                      className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center relative z-10"
                    >
                      <Star className="h-6 w-6 text-amber-500 fill-amber-500 drop-shadow-md" />
                    </motion.div>
                  </div>
                </div>
              </div>
              
              <div className="relative z-10 px-3 py-1.5 inline-block rounded-lg bg-white/80 backdrop-blur-sm shadow-sm border border-gray-100/50 mb-4">
                <div className="inline-flex bg-gradient-to-br from-amber-50/80 to-white rounded-full border border-amber-200/40 shadow-sm p-1 mb-1.5">
                  <div className="bg-gradient-to-r from-amber-600 to-amber-500 text-white px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1.5 text-xs font-medium">
                    <Star className="h-3 w-3 fill-white" />
                    <span>Customer Love</span>
                  </div>
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 drop-shadow-sm">
                  What Our Customers Say
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto mt-0.5 sm:mt-1">
                  Don't just take our word for it. Hear from real customers who have experienced the benefits of our premium CBD products
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Featured testimonials carousel */}
        <div className="relative mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {displayIndices.map((index, i) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <TestimonialCard testimonial={testimonials[index]} featured={i === 0} />
              </motion.div>
            ))}
          </div>
          
          {/* Navigation controls */}
          <div className="flex items-center justify-center mt-6 gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full h-10 w-10 border-amber-200 text-amber-700 hover:bg-amber-50"
              onClick={goToPrev}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex gap-1.5">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all duration-300",
                    displayIndices.includes(index) 
                      ? "bg-amber-500" 
                      : "bg-amber-200"
                  )}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full h-10 w-10 border-amber-200 text-amber-700 hover:bg-amber-50"
              onClick={goToNext}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Marquee testimonials - automatically scrolling */}
        <div className="relative overflow-hidden py-4 bg-gradient-to-b from-amber-50/80 to-white rounded-xl border border-amber-100/80 shadow-sm">
          <div className="marquee-container">
            <div className="marquee-content flex gap-4 animate-marquee">
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <Card 
                  key={`${testimonial.id}-${index}`} 
                  className="min-w-[280px] border-amber-200 shadow-sm bg-white"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium text-amber-700">{testimonial.product}</span>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2 italic">"{testimonial.text}"</p>
                    <div className="flex items-center mt-2 justify-between">
                      <span className="text-xs text-gray-500">{testimonial.name}</span>
                      {testimonial.verified && (
                        <Badge variant="outline" className="h-4 px-1 text-[10px] bg-amber-50 border-amber-200 text-amber-700 flex items-center">
                          <BadgeCheck className="h-2.5 w-2.5 mr-0.5" />
                          Verified
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function TestimonialCard({ testimonial, featured = false }: { testimonial: typeof testimonials[0], featured?: boolean }) {
  return (
    <Card className={cn(
      "h-full overflow-hidden transition-all duration-300",
      featured 
        ? "border-amber-300 shadow-md hover:shadow-lg" 
        : "border-amber-200 shadow-sm hover:shadow-md",
      "hover:border-amber-300 bg-gradient-to-b from-white to-amber-50/80"
    )}>
      <CardContent className="p-6">
        <div className="flex items-start gap-3 mb-3">
          <Avatar className="w-10 h-10 border-2 border-amber-100">
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
            <AvatarFallback>{testimonial.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center">
              <span className="font-medium text-gray-900">{testimonial.name}</span>
              {testimonial.verified && (
                <BadgeCheck className="h-3.5 w-3.5 text-amber-500 ml-1" />
              )}
            </div>
            <div className="text-xs text-gray-500">{testimonial.location}</div>
          </div>
        </div>
        
        <div className="flex mb-3">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={cn(
                "w-4 h-4", 
                i < testimonial.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"
              )} 
            />
          ))}
        </div>
        
        <div className="relative">
          <Quote className="absolute -top-1 -left-1 w-6 h-6 text-amber-200 opacity-40" />
          <p className="text-gray-700 text-sm leading-relaxed relative z-10 pl-3">
            {testimonial.text}
          </p>
        </div>
        
        <div className="mt-4 pt-3 border-t border-amber-100/50 flex items-center justify-between">
          <span className="text-xs font-medium text-amber-700">{testimonial.product}</span>
          <span className="text-xs text-gray-500">{testimonial.date}</span>
        </div>
      </CardContent>
    </Card>
  )
}

// Add this to your global.css file if not already present
/*
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-marquee {
  animation: marquee 30s linear infinite;
}

@media (hover: hover) {
  .hover\:pause-animation:hover .animate-marquee {
    animation-play-state: paused;
  }
}
*/ 