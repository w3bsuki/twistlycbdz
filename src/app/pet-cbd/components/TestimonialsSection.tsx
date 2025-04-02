'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

interface TestimonialsSectionProps {
  pageTheme: {
    colors: {
      primary: string;
      accent: string;
    }
  }
}

const testimonials = [
  {
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    name: "Sarah M.",
    location: "Denver, CO",
    pet: "Golden Retriever, 8 years",
    text: "My dog's anxiety during thunderstorms was so severe that nothing seemed to help. Since starting your CBD oil, he's noticeably calmer. He still knows the storm is there, but doesn't panic anymore. It's been life-changing for both of us!",
    rating: 5,
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/42.jpg",
    name: "Michael T.",
    location: "Portland, OR",
    pet: "Senior Tabby Cat, 14 years",
    text: "After trying multiple joint supplements for my aging cat with no success, I was skeptical about CBD. Within two weeks of using your pet drops, she's jumping onto her favorite windowsill again! I'm amazed at the difference.",
    rating: 5,
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    name: "Jennifer L.",
    location: "Austin, TX",
    pet: "Beagle Mix, 6 years",
    text: "My rescue dog had severe separation anxiety, making it impossible to leave the house without him destroying something. The CBD treats have made such a difference that I can now leave for work without worrying about coming home to destruction.",
    rating: 4,
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/71.jpg",
    name: "Robert K.",
    location: "Chicago, IL",
    pet: "Maine Coon, 10 years",
    text: "My cat has been dealing with inflammatory issues, and your CBD oil has been the only thing that has consistently helped. I've noticed a huge improvement in his comfort level and activity. Thank you for creating such a quality product!",
    rating: 5,
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    name: "Amanda P.",
    location: "Seattle, WA",
    pet: "French Bulldog, 4 years",
    text: "My Frenchie has always been high-energy and sometimes struggles to settle down at night. The CBD treats have been the perfect addition to our evening routine. He calms down much faster and sleeps better throughout the night.",
    rating: 5,
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/29.jpg",
    name: "David W.",
    location: "Phoenix, AZ",
    pet: "Siamese Cat, 7 years",
    text: "After a recent move, my cat was really struggling with the transition. She was hiding constantly and not eating well. Your CBD drops helped her adjust much faster than I expected. We're back to normal in just a couple of weeks!",
    rating: 4,
  }
]

export function TestimonialsSection({ pageTheme }: TestimonialsSectionProps) {
  return (
    <section className="py-6 relative overflow-hidden bg-gradient-to-b from-amber-50 to-white">
      {/* Simple background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-10 w-60 h-60 bg-amber-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-60 h-60 bg-amber-50 rounded-full opacity-20 blur-3xl"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="bg-white/80 backdrop-blur-sm border border-amber-200 rounded-xl shadow-md p-4 overflow-hidden">
          <div className="text-center mb-4">
            <div className="inline-flex bg-gradient-to-br from-amber-50/80 to-white rounded-full border border-amber-200/40 shadow-sm p-1">
              <div className="bg-gradient-to-r from-amber-600 to-amber-500 text-white px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5 font-medium">
                <Star className="h-3.5 w-3.5 fill-current" />
                <span>Customer Stories</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3 mb-2">See How Our Products Help Pets Thrive</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-4 text-sm">
              Real stories from pet owners who have seen remarkable improvements in their pets' health and wellbeing
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-amber-50/70 to-white rounded-xl border border-amber-200/40 shadow-sm p-3 overflow-hidden">
            <Carousel
              opts={{ align: "start", loop: true }}
              className="w-full"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 p-1.5">
                    <Card className="h-full border-amber-100 bg-white shadow-sm">
                      <CardContent className="p-4 h-full flex flex-col">
                        <div className="flex items-start mb-3">
                          <Avatar className="h-10 w-10 border border-amber-200">
                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                            <AvatarFallback className="bg-amber-100 text-amber-700">
                              {testimonial.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="ml-3 flex-1">
                            <p className="font-medium text-gray-900 text-sm">{testimonial.name}</p>
                            <p className="text-gray-500 text-xs">{testimonial.location}</p>
                            <p className="text-amber-600 text-xs italic">{testimonial.pet}</p>
                          </div>
                          <div className="text-amber-500">
                            <Quote className="h-5 w-5 rotate-180 opacity-80" />
                          </div>
                        </div>
                        
                        <div className="flex mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-3.5 w-3.5 ${
                                i < testimonial.rating 
                                ? "fill-amber-400 text-amber-400" 
                                : "text-gray-200 fill-gray-200"
                              }`} 
                            />
                          ))}
                        </div>
                        
                        <p className="text-gray-600 text-sm flex-1">
                          &ldquo;{testimonial.text}&rdquo;
                        </p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-4 gap-2">
                <CarouselPrevious className="position-static relative border-amber-200 hover:bg-amber-50 text-amber-700" />
                <CarouselNext className="position-static relative border-amber-200 hover:bg-amber-50 text-amber-700" />
              </div>
            </Carousel>
          </div>
        </div>
      </Container>
    </section>
  )
} 