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
    name: "Linda Thompson",
    location: "Denver, CO",
    pet: "Bella, 8-year-old Golden Retriever",
    text: "The CBD oil has made such a difference for Bella's joint pain. She's moving around like a puppy again! I'm so grateful.",
    rating: 5,
    avatar: "/images/logos/1.png",
  },
  {
    name: "Michael Davis",
    location: "Portland, OR",
    pet: "Max, 5-year-old German Shepherd",
    text: "Max used to hide during thunderstorms, but the calming treats have been a game-changer. He's so much more relaxed now.",
    rating: 5,
    avatar: "/images/logos/1.png",
  },
  {
    name: "Sarah Wilson",
    location: "Austin, TX",
    pet: "Oliver, 12-year-old Maine Coon",
    text: "My senior cat Oliver has been much more active since starting the joint support formula. Worth every penny!",
    rating: 4,
    avatar: "/images/logos/1.png",
  },
  {
    name: "Robert Johnson",
    location: "Seattle, WA",
    pet: "Cooper, 3-year-old Beagle Mix",
    text: "Cooper's separation anxiety has improved dramatically with the CBD drops. I can actually leave the house without him howling!",
    rating: 5,
    avatar: "/images/logos/1.png",
  },
  {
    name: "Jennifer Miller",
    location: "Chicago, IL",
    pet: "Luna, 6-year-old Siamese",
    text: "Luna's skin allergies were constant until we tried the CBD balm. Her fur is growing back and she's not itching anymore.",
    rating: 4,
    avatar: "/images/logos/1.png",
  },
  {
    name: "David Williams",
    location: "Miami, FL",
    pet: "Rocky, 10-year-old Labrador",
    text: "Rocky's quality of life has improved tremendously with the senior formula. He's more comfortable and happier in his golden years.",
    rating: 5,
    avatar: "/images/logos/1.png",
  },
];

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