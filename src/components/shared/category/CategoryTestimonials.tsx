'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, Quote, MessageSquare } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import { CategoryTheme } from './CategoryHero'

export interface TestimonialItem {
  name: string;
  role?: string;
  location?: string;
  pet?: string;
  text: string;
  rating: number;
  avatar: string;
}

export interface CategoryTestimonialsProps {
  theme: CategoryTheme;
  sectionTitle: string;
  sectionDescription: string;
  testimonials: TestimonialItem[];
  displayType?: 'carousel' | 'slider';
  testimonialStyle?: 'card' | 'quote';
  className?: string;
}

export function CategoryTestimonials({
  theme,
  sectionTitle,
  sectionDescription,
  testimonials,
  displayType = 'carousel',
  testimonialStyle = 'card',
  className
}: CategoryTestimonialsProps) {
  // Map theme color properties to actual tailwind classes
  const getClasses = () => {
    const { colors } = theme;
    
    return {
      section: cn(
        "py-6 relative overflow-hidden",
        colors.gradientFrom === 'green-50' ? 'bg-gradient-to-b from-green-50 to-white' :
        colors.gradientFrom === 'amber-50' ? 'bg-gradient-to-b from-amber-50 to-white' :
        colors.gradientFrom === 'blue-50' ? 'bg-gradient-to-b from-blue-50 to-white' :
        colors.gradientFrom === 'purple-50' ? 'bg-gradient-to-b from-purple-50 to-white' :
        colors.gradientFrom === 'indigo-50' ? 'bg-gradient-to-b from-indigo-50 to-white' :
        'bg-gradient-to-b from-gray-50 to-white'
      ),
      
      bgDecorationPrimary: cn(
        "absolute top-40 right-10 w-60 h-60 rounded-full opacity-20 blur-3xl",
        colors.background === 'green-100' ? 'bg-green-100' :
        colors.background === 'amber-100' ? 'bg-amber-100' :
        colors.background === 'blue-100' ? 'bg-blue-100' :
        colors.background === 'purple-100' ? 'bg-purple-100' :
        colors.background === 'indigo-100' ? 'bg-indigo-100' :
        'bg-gray-100'
      ),
      
      bgDecorationAccent: cn(
        "absolute bottom-20 left-10 w-60 h-60 rounded-full opacity-20 blur-3xl",
        colors.accent === 'emerald-500' ? 'bg-emerald-50' :
        colors.accent === 'amber-500' ? 'bg-amber-50' :
        colors.accent === 'blue-500' ? 'bg-blue-50' :
        colors.accent === 'purple-500' ? 'bg-purple-50' :
        colors.accent === 'violet-500' ? 'bg-violet-50' :
        'bg-gray-50'
      ),
      
      cardBorder: cn(
        "bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 overflow-hidden border",
        colors.border === 'green-200' ? 'border-green-200' :
        colors.border === 'amber-200' ? 'border-amber-200' :
        colors.border === 'blue-200' ? 'border-blue-200' :
        colors.border === 'purple-200' ? 'border-purple-200' :
        colors.border === 'indigo-200' ? 'border-indigo-200' :
        'border-gray-200'
      ),
      
      badgeOuter: cn(
        "inline-flex bg-gradient-to-br to-white rounded-full shadow-sm p-1 border",
        colors.gradientFrom === 'green-50' ? 'from-green-50/80 border-green-200/40' :
        colors.gradientFrom === 'amber-50' ? 'from-amber-50/80 border-amber-200/40' :
        colors.gradientFrom === 'blue-50' ? 'from-blue-50/80 border-blue-200/40' :
        colors.gradientFrom === 'purple-50' ? 'from-purple-50/80 border-purple-200/40' :
        colors.gradientFrom === 'indigo-50' ? 'from-indigo-50/80 border-indigo-200/40' :
        'from-gray-50/80 border-gray-200/40'
      ),
      
      badgeInner: cn(
        "px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5 font-medium text-white bg-gradient-to-r",
        colors.primary === 'green-600' ? 'from-green-600 to-emerald-500' :
        colors.primary === 'amber-600' ? 'from-amber-600 to-amber-500' :
        colors.primary === 'blue-600' ? 'from-blue-600 to-blue-500' :
        colors.primary === 'purple-600' ? 'from-purple-600 to-purple-500' :
        colors.primary === 'indigo-600' ? 'from-indigo-600 to-violet-500' :
        'from-gray-600 to-gray-500'
      ),
      
      contentContainer: cn(
        "bg-gradient-to-br rounded-xl border shadow-sm p-3 overflow-hidden",
        colors.gradientFrom === 'green-50' ? 'from-green-50/70 to-white border-green-200/40' :
        colors.gradientFrom === 'amber-50' ? 'from-amber-50/70 to-white border-amber-200/40' :
        colors.gradientFrom === 'blue-50' ? 'from-blue-50/70 to-white border-blue-200/40' :
        colors.gradientFrom === 'purple-50' ? 'from-purple-50/70 to-white border-purple-200/40' :
        colors.gradientFrom === 'indigo-50' ? 'from-indigo-50/70 to-white border-indigo-200/40' :
        'from-gray-50/70 to-white border-gray-200/40'
      ),
      
      testimonialCard: cn(
        "h-full bg-white shadow-sm border",
        colors.border === 'green-200' ? 'border-green-100' :
        colors.border === 'amber-200' ? 'border-amber-100' :
        colors.border === 'blue-200' ? 'border-blue-100' :
        colors.border === 'purple-200' ? 'border-purple-100' :
        colors.border === 'indigo-200' ? 'border-indigo-100' :
        'border-gray-100'
      ),
      
      testimonialQuoteCard: cn(
        "bg-white/70 shadow-sm border h-full transition-colors",
        colors.border === 'green-200' ? 'border-green-100 hover:border-green-200' :
        colors.border === 'amber-200' ? 'border-amber-100 hover:border-amber-200' :
        colors.border === 'blue-200' ? 'border-blue-100 hover:border-blue-200' :
        colors.border === 'purple-200' ? 'border-purple-100 hover:border-purple-200' :
        colors.border === 'indigo-200' ? 'border-indigo-100 hover:border-indigo-200' :
        'border-gray-100 hover:border-gray-200'
      ),
      
      avatar: cn(
        "h-10 w-10 border",
        colors.border === 'green-200' ? 'border-green-200' :
        colors.border === 'amber-200' ? 'border-amber-200' :
        colors.border === 'blue-200' ? 'border-blue-200' :
        colors.border === 'purple-200' ? 'border-purple-200' :
        colors.border === 'indigo-200' ? 'border-indigo-200' :
        'border-gray-200'
      ),
      
      avatarFallback: cn(
        "text-opacity-70",
        colors.primary === 'green-600' ? 'bg-green-100 text-green-700' :
        colors.primary === 'amber-600' ? 'bg-amber-100 text-amber-700' :
        colors.primary === 'blue-600' ? 'bg-blue-100 text-blue-700' :
        colors.primary === 'purple-600' ? 'bg-purple-100 text-purple-700' :
        colors.primary === 'indigo-600' ? 'bg-indigo-100 text-indigo-700' :
        'bg-gray-100 text-gray-700'
      ),
      
      petInfo: cn(
        "text-xs italic",
        colors.primary === 'green-600' ? 'text-green-600' :
        colors.primary === 'amber-600' ? 'text-amber-600' :
        colors.primary === 'blue-600' ? 'text-blue-600' :
        colors.primary === 'purple-600' ? 'text-purple-600' :
        colors.primary === 'indigo-600' ? 'text-indigo-600' :
        'text-gray-600'
      ),
      
      quoteIcon: cn(
        "h-5 w-5 rotate-180 opacity-80",
        colors.primary === 'green-600' ? 'text-green-500' :
        colors.primary === 'amber-600' ? 'text-amber-500' :
        colors.primary === 'blue-600' ? 'text-blue-500' :
        colors.primary === 'purple-600' ? 'text-purple-500' :
        colors.primary === 'indigo-600' ? 'text-indigo-500' :
        'text-gray-500'
      ),
      
      dividerBorder: cn(
        "border-t",
        colors.border === 'green-200' ? 'border-green-100' :
        colors.border === 'amber-200' ? 'border-amber-100' :
        colors.border === 'blue-200' ? 'border-blue-100' :
        colors.border === 'purple-200' ? 'border-purple-100' :
        colors.border === 'indigo-200' ? 'border-indigo-100' :
        'border-gray-100'
      ),
      
      carouselButton: cn(
        "position-static relative border hover:bg-opacity-10",
        colors.border === 'green-200' ? 'border-green-200 hover:bg-green-50 text-green-700' :
        colors.border === 'amber-200' ? 'border-amber-200 hover:bg-amber-50 text-amber-700' :
        colors.border === 'blue-200' ? 'border-blue-200 hover:bg-blue-50 text-blue-700' :
        colors.border === 'purple-200' ? 'border-purple-200 hover:bg-purple-50 text-purple-700' :
        colors.border === 'indigo-200' ? 'border-indigo-200 hover:bg-indigo-50 text-indigo-700' :
        'border-gray-200 hover:bg-gray-50 text-gray-700'
      ),
    };
  };
  
  const classes = getClasses();

  // Render testimonials based on the display type and style
  const renderTestimonials = () => {
    if (displayType === 'carousel') {
      return (
        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 p-1.5">
                <Card className={classes.testimonialCard}>
                  <CardContent className="p-4 h-full flex flex-col">
                    <div className="flex items-start mb-3">
                      <Avatar className={classes.avatar}>
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback className={classes.avatarFallback}>
                          {testimonial.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-3 flex-1">
                        <p className="font-medium text-gray-900 text-sm">{testimonial.name}</p>
                        {testimonial.location && (
                          <p className="text-gray-500 text-xs">{testimonial.location}</p>
                        )}
                        {testimonial.role && (
                          <p className="text-gray-500 text-xs">{testimonial.role}</p>
                        )}
                        {testimonial.pet && (
                          <p className={classes.petInfo}>{testimonial.pet}</p>
                        )}
                      </div>
                      <div className="text-accent">
                        <Quote className={classes.quoteIcon} />
                      </div>
                    </div>
                    
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3.5 w-3.5 ${
                            i < testimonial.rating 
                            ? "fill-yellow-400 text-yellow-400" 
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
            <CarouselPrevious className={classes.carouselButton} />
            <CarouselNext className={classes.carouselButton} />
          </div>
        </Carousel>
      );
    } else {
      // Slider display type
      return (
        <InfiniteSlider
          direction="right"
          speed="slow"
          pauseOnHover={true}
          className="py-2"
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="px-1.5 min-w-[280px] max-w-[320px]">
              <Card className={classes.testimonialQuoteCard}>
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
                  <p className="text-xs text-gray-700 italic mb-3 flex-grow">&ldquo;{testimonial.text}&rdquo;</p>
                  <div className={`flex items-center mt-auto pt-2 ${classes.dividerBorder}`}>
                    <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-100 mr-2 flex items-center justify-center">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-xs text-gray-900">{testimonial.name}</p>
                      {testimonial.role && (
                        <p className="text-[11px] text-gray-500">{testimonial.role}</p>
                      )}
                      {testimonial.location && (
                        <p className="text-[11px] text-gray-500">{testimonial.location}</p>
                      )}
                      {testimonial.pet && (
                        <p className="text-[11px] italic text-gray-600">{testimonial.pet}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </InfiniteSlider>
      );
    }
  };
  
  return (
    <section 
      className={cn(classes.section, className)}
      id={`${theme.name.toLowerCase().replace(/[&\s]+/g, '-')}-testimonials`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={classes.bgDecorationPrimary}></div>
        <div className={classes.bgDecorationAccent}></div>
      </div>
      
      <Container className="relative z-10">
        <div className={classes.cardBorder}>
          <div className="text-center mb-4">
            <div className={classes.badgeOuter}>
              <div className={classes.badgeInner}>
                {displayType === 'carousel' ? (
                  <Star className="h-3.5 w-3.5 fill-current" />
                ) : (
                  <MessageSquare className="h-3.5 w-3.5" />
                )}
                <span>Customer Stories</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-3 mb-2">{sectionTitle}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-4 text-sm md:text-base leading-relaxed">
              {sectionDescription}
            </p>
          </div>
          
          <div className={classes.contentContainer}>
            {renderTestimonials()}
          </div>
        </div>
      </Container>
    </section>
  )
} 