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
  /** Person's name or author */
  name: string;
  /** Person's role, title or occupation */
  role?: string;
  /** Person's location */
  location?: string;
  /** Pet's name (for pet testimonials) */
  pet?: string;
  /** Testimonial text content */
  text: string;
  /** Rating (1-5) */
  rating: number;
  /** Avatar image URL */
  avatar: string;
  
  // Support for different data formats (for backward compatibility)
  author?: string; // Alternate field for name
  quote?: string; // Alternate field for text
  content?: string; // Alternate field for text
  image?: string; // Alternate field for avatar
  avatarSrc?: string; // Alternate field for avatar
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
  // Process testimonials to normalize data format
  const normalizedTestimonials = React.useMemo(() => {
    return testimonials.map(testimonial => ({
      name: testimonial.name || testimonial.author || 'Happy Customer',
      role: testimonial.role || '',
      location: testimonial.location || '',
      pet: testimonial.pet || '',
      text: testimonial.text || testimonial.quote || testimonial.content || '',
      rating: testimonial.rating || 5,
      avatar: testimonial.avatar || testimonial.image || testimonial.avatarSrc || ''
    }));
  }, [testimonials]);
  
  // Memoized classes to avoid recalculation on every render
  const classes = React.useMemo(() => {
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
      
      starFilled: cn(
        "h-3.5 w-3.5",
        colors.primary === 'green-600' ? 'text-green-500' :
        colors.primary === 'amber-600' ? 'text-amber-500' :
        colors.primary === 'blue-600' ? 'text-blue-500' :
        colors.primary === 'purple-600' ? 'text-purple-500' :
        colors.primary === 'indigo-600' ? 'text-indigo-500' :
        'text-gray-500'
      ),
      
      starEmpty: "h-3.5 w-3.5 text-gray-300"
    };
  }, [theme]);
  
  // Render testimonial card with proper avatar fallbacks and normalized data
  const renderTestimonialCard = React.useCallback((testimonial: TestimonialItem, index: number) => {
    const name = testimonial.name || testimonial.author || 'Happy Customer';
    const text = testimonial.text || testimonial.quote || testimonial.content || '';
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    const avatarUrl = testimonial.avatar || testimonial.image || testimonial.avatarSrc || '';
    
    return (
      <Card className={classes.testimonialCard} key={index}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3 mb-3">
            <Avatar className={classes.avatar}>
              {avatarUrl ? (
                <AvatarImage src={avatarUrl} alt={`${name}'s avatar`} />
              ) : null}
              <AvatarFallback className={classes.avatarFallback}>
                {initials}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <p className="font-medium text-sm text-gray-900">{name}</p>
              {testimonial.role && (
                <p className="text-xs text-gray-500">{testimonial.role}</p>
              )}
              {testimonial.location && (
                <p className="text-xs text-gray-500">{testimonial.location}</p>
              )}
              {testimonial.pet && (
                <p className={classes.petInfo}>Pet: {testimonial.pet}</p>
              )}
            </div>
          </div>
          
          <div className="flex mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={i < testimonial.rating ? classes.starFilled : classes.starEmpty}
                aria-hidden="true"
              />
            ))}
            <span className="sr-only">{testimonial.rating} out of 5 stars</span>
          </div>
          
          <p className="text-xs text-gray-600 leading-relaxed">{text}</p>
        </CardContent>
      </Card>
    );
  }, [classes]);
  
  // Render quote-style testimonial with proper avatar fallbacks and normalized data
  const renderTestimonialQuote = React.useCallback((testimonial: TestimonialItem, index: number) => {
    const name = testimonial.name || testimonial.author || 'Happy Customer';
    const text = testimonial.text || testimonial.quote || testimonial.content || '';
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    const avatarUrl = testimonial.avatar || testimonial.image || testimonial.avatarSrc || '';
    
    return (
      <div className={cn("rounded-xl overflow-hidden", classes.testimonialQuoteCard)} key={index}>
        <div className="p-4">
          <Quote className={classes.quoteIcon} aria-hidden="true" />
          <p className="text-sm text-gray-600 leading-relaxed mt-1 mb-3">{text}</p>
          <div className={cn("pt-3 mt-3", classes.dividerBorder)}>
            <div className="flex items-center gap-2">
              <Avatar className={classes.avatar}>
                {avatarUrl ? (
                  <AvatarImage src={avatarUrl} alt={`${name}'s avatar`} />
                ) : null}
                <AvatarFallback className={classes.avatarFallback}>
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm text-gray-900">{name}</p>
                <div className="flex items-center gap-1">
                  {testimonial.pet ? (
                    <p className={classes.petInfo}>Pet: {testimonial.pet}</p>
                  ) : testimonial.role ? (
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  ) : testimonial.location ? (
                    <p className="text-xs text-gray-500">{testimonial.location}</p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }, [classes]);
  
  // Render testimonials based on display type and style
  const renderTestimonials = React.useCallback(() => {
    const renderItem = testimonialStyle === 'card' ? renderTestimonialCard : renderTestimonialQuote;
    
    if (displayType === 'carousel') {
      return (
        <Carousel className="w-full pt-2 pb-4">
          <CarouselContent className="-ml-2 md:-ml-4">
            {normalizedTestimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                {renderItem(testimonial, index)}
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="flex justify-center gap-2 mt-4">
            <CarouselPrevious className={classes.carouselButton} />
            <CarouselNext className={classes.carouselButton} />
          </div>
        </Carousel>
      );
    } else if (displayType === 'slider') {
      return (
        <div className="py-2">
          <InfiniteSlider 
            speed={30} 
            className="-mx-4"
            pauseOnHover={true}
          >
            {normalizedTestimonials.concat(normalizedTestimonials).map((testimonial, index) => (
              <div key={index} className="px-2 min-w-[280px] md:min-w-[320px] max-w-[320px] md:max-w-[350px]">
                {renderItem(testimonial, index)}
              </div>
            ))}
          </InfiniteSlider>
        </div>
      );
    }
    
    // Fallback to grid for any other display type
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-2">
        {normalizedTestimonials.map((testimonial, index) => (
          <div key={index}>
            {renderItem(testimonial, index)}
          </div>
        ))}
      </div>
    );
  }, [displayType, testimonialStyle, normalizedTestimonials, renderTestimonialCard, renderTestimonialQuote]);
  
  return (
    <section 
      className={cn(classes.section, className)}
      id={`${theme.name.toLowerCase().replace(/[&\s]+/g, '-')}-testimonials`}
      aria-labelledby="testimonials-section-title"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className={classes.bgDecorationPrimary}></div>
        <div className={classes.bgDecorationAccent}></div>
      </div>
      
      <Container className="relative z-10">
        <div className={classes.cardBorder}>
          <div className="text-center mb-6">
            <div className={classes.badgeOuter}>
              <div className={classes.badgeInner}>
                <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Testimonials</span>
              </div>
            </div>
            <h2 
              id="testimonials-section-title"
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-3 mb-2"
            >
              {sectionTitle}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-4 text-sm md:text-base leading-relaxed">
              {sectionDescription}
            </p>
          </div>
          
          <div>
            {normalizedTestimonials.length > 0 ? (
              renderTestimonials()
            ) : (
              <p className="text-center text-gray-500 py-8">No testimonials available</p>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
} 