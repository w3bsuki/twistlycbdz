'use client'

import React, { useState, useRef, useEffect, memo, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, Heart, Activity, Sparkles, PawPrint, Leaf, ChevronRight, ChevronLeft, Star, Users2, CheckCircle, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Separator } from '@/components/ui/separator'
import { Container } from '@/components/ui/container'
import { useAnimationConfig } from '@/hooks'
import { MiniDrTwistly } from '@/components/features/chat/mini-dr-twistly'

// Category data with updated details - Moved to memo to prevent re-creation on render
const categories = [
  {
    title: "Health & Wellness",
    tagline: "Natural Balance",
    description: "Premium CBD solutions for stress relief, better sleep, and overall wellbeing.",
    image: "/images/tincture2.png", 
    moreImages: ["/images/tincture2.png", "/images/tincture2.png"],
    href: "/health-and-wellness",
    productCount: 24,
    featured: {
      name: "Full Spectrum CBD Oil",
      rating: 4.9,
      reviews: 128,
      price: "$59.99"
    },
    theme: {
      gradient: "from-green-50 via-green-100/80 to-green-50/40",
      hoverGradient: "from-green-100 to-green-50",
      accent: "bg-green-600",
      accentLight: "bg-green-100",
      accentDark: "bg-green-700",
      text: "text-green-800",
      textLight: "text-green-600",
      border: "border-green-200",
      borderHover: "hover:border-green-300",
      shadow: "shadow-green-500/15",
      button: "bg-green-600 hover:bg-green-700",
      bgHover: "hover:bg-green-50"
    },
    benefits: ["Sleep Support", "Stress Relief", "Pain Management", "Mental Clarity"],
    icon: <Heart className="h-5 w-5" />
  },
  {
    title: "Sport & Recovery",
    tagline: "Peak Performance",
    description: "Specialized formulas for athletes and active lifestyles.",
    image: "/images/tincture2.png",
    moreImages: ["/images/tincture2.png", "/images/tincture2.png"],
    href: "/sport-and-recovery",
    productCount: 18,
    featured: {
      name: "Sport Recovery Gel",
      rating: 4.8,
      reviews: 96,
      price: "$49.99"
    },
    theme: {
      gradient: "from-blue-50 via-blue-100/80 to-blue-50/40",
      hoverGradient: "from-blue-100 to-blue-50",
      accent: "bg-blue-600",
      accentLight: "bg-blue-100",
      accentDark: "bg-blue-700",
      text: "text-blue-800",
      textLight: "text-blue-600",
      border: "border-blue-200",
      borderHover: "hover:border-blue-300",
      shadow: "shadow-blue-500/15",
      button: "bg-blue-600 hover:bg-blue-700",
      bgHover: "hover:bg-blue-50"
    },
    benefits: ["Muscle Recovery", "Inflammation Reduction", "Joint Support", "Performance Enhancement"],
    icon: <Activity className="h-5 w-5" />
  },
  {
    title: "Beauty & Cosmetics",
    tagline: "Radiant Glow",
    description: "CBD-infused skincare for natural beauty enhancement.",
    image: "/images/tincture2.png",
    moreImages: ["/images/tincture2.png", "/images/tincture2.png"],
    href: "/beauty-and-cosmetics",
    productCount: 21,
    featured: {
      name: "CBD Face Serum",
      rating: 4.9,
      reviews: 84,
      price: "$69.99"
    },
    theme: {
      gradient: "from-purple-50 via-purple-100/80 to-purple-50/40",
      hoverGradient: "from-purple-100 to-purple-50",
      accent: "bg-purple-600",
      accentLight: "bg-purple-100",
      accentDark: "bg-purple-700",
      text: "text-purple-800",
      textLight: "text-purple-600",
      border: "border-purple-200",
      borderHover: "hover:border-purple-300",
      shadow: "shadow-purple-500/15",
      button: "bg-purple-600 hover:bg-purple-700",
      bgHover: "hover:bg-purple-50"
    },
    benefits: ["Anti-Aging", "Skin Hydration", "Acne Treatment", "Complexion Enhancement"],
    icon: <Sparkles className="h-5 w-5" />
  },
  {
    title: "Pet CBD",
    tagline: "Support for Pets",
    description: "Specially formulated CBD products designed for pets' wellness needs.",
    image: "/images/tincture2.png",
    moreImages: ["/images/tincture2.png", "/images/tincture2.png"],
    href: "/pet-cbd",
    productCount: 15,
    featured: {
      name: "Calming CBD Oil for Dogs",
      rating: 4.8,
      reviews: 76,
      price: "$44.99"
    },
    theme: {
      gradient: "from-amber-50 via-amber-100/80 to-amber-50/40",
      hoverGradient: "from-amber-100 to-amber-50",
      accent: "bg-amber-600",
      accentLight: "bg-amber-100",
      accentDark: "bg-amber-700",
      text: "text-amber-800",
      textLight: "text-amber-600",
      border: "border-amber-200",
      borderHover: "hover:border-amber-300",
      shadow: "shadow-amber-500/15",
      button: "bg-amber-600 hover:bg-amber-700",
      bgHover: "hover:bg-amber-50"
    },
    benefits: ["Anxiety Relief", "Joint Health", "Skin & Coat Care", "Digestive Support"],
    icon: <PawPrint className="h-5 w-5" />
  },
  {
    title: "Hybrid & Mushrooms",
    tagline: "Synergy Blends",
    description: "Innovative blends combining CBD with functional mushrooms for enhanced benefits.",
    image: "/images/tincture2.png",
    moreImages: ["/images/tincture2.png", "/images/tincture2.png"],
    href: "/hybrid-and-mushrooms",
    productCount: 12,
    featured: {
      name: "Mushroom & CBD Tincture",
      rating: 4.7,
      reviews: 64,
      price: "$79.99"
    },
    theme: {
      gradient: "from-amber-50 via-amber-100/80 to-amber-50/40",
      hoverGradient: "from-amber-100 to-amber-50",
      accent: "bg-amber-800",
      accentLight: "bg-amber-100",
      accentDark: "bg-amber-900",
      text: "text-amber-900",
      textLight: "text-amber-700",
      border: "border-amber-200",
      borderHover: "hover:border-amber-300",
      shadow: "shadow-amber-800/15",
      button: "bg-amber-800 hover:bg-amber-900",
      bgHover: "hover:bg-amber-50"
    },
    benefits: ["Immune Support", "Cognitive Function", "Energy Enhancement", "Stress Adaptation"],
    icon: <Leaf className="h-5 w-5" />
  }
];

// Add the recommendations map at the top of the file after categories
const recommendationsMap = {
  "Health & Wellness": [
    "People experiencing stress and anxiety",
    "Those with sleep difficulties",
    "Individuals with chronic discomfort",
    "Anyone seeking natural wellness solutions"
  ],
  "Sport & Recovery": [
    "Athletes and fitness enthusiasts",
    "People with active lifestyles",
    "Those experiencing muscle fatigue",
    "Anyone seeking faster recovery times"
  ],
  "Beauty & Cosmetics": [
    "Skincare enthusiasts",
    "Those concerned about aging",
    "People with problem skin conditions",
    "Anyone seeking natural beauty solutions"
  ],
  "Pet CBD": [
    "Pets with anxiety or nervousness",
    "Older pets with joint discomfort",
    "Animals with sensitive skin",
    "Pets with appetite or digestive issues"
  ],
  "Hybrid & Mushrooms": [
    "Those seeking enhanced benefits",
    "People interested in immune support",
    "Individuals seeking mental clarity",
    "Anyone wanting synergistic wellness effects"
  ]
};

// Optimized animation variants - memo to prevent recreation on render
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
  hover: { 
    scale: 1.03, 
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { type: "spring", stiffness: 400, damping: 25 }
  }
};

// Helper function to get benefit descriptions
function getBenefitDescription(category: string, benefit: string): string {
  const descriptions = {
    "Health & Wellness": {
      "Sleep Support": "Improve sleep quality and duration naturally",
      "Stress Relief": "Reduce anxiety and promote relaxation",
      "Pain Management": "Alleviate discomfort and inflammation",
      "Mental Clarity": "Enhance focus and cognitive function"
    },
    "Sport & Recovery": {
      "Muscle Recovery": "Accelerate post-workout recovery time",
      "Joint Support": "Maintain healthy, flexible joints",
      "Inflammation Reduction": "Combat exercise-induced inflammation",
      "Performance Enhancement": "Support endurance and training goals"
    },
    "Beauty & Cosmetics": {
      "Anti-Aging": "Reduce appearance of fine lines and wrinkles",
      "Skin Hydration": "Deeply moisturize and rejuvenate skin",
      "Acne Treatment": "Balance oil production and reduce breakouts",
      "Complexion Enhancement": "Even skin tone and promote radiance"
    },
    "Pet CBD": {
      "Anxiety Relief": "Keep pets calm during stressful situations",
      "Joint Health": "Support mobility in aging pets",
      "Skin & Coat Care": "Promote healthy skin and lustrous coat",
      "Digestive Support": "Help maintain healthy digestion"
    },
    "Hybrid & Mushrooms": {
      "Immune Support": "Fortify body's natural defense systems",
      "Cognitive Function": "Enhance mental clarity and focus",
      "Energy Enhancement": "Support sustainable natural energy",
      "Stress Adaptation": "Help body respond to environmental stresses"
    }
  };
  
  return descriptions[category]?.[benefit] || "Experience premium CBD benefits";
}

// Helper function to get recommendation descriptions
function getRecommendationDescription(category: string, index: number): string {
  const descriptions = {
    "Health & Wellness": [
      "Relief from everyday stress and anxiety",
      "Support for better sleep and restfulness",
      "Management of discomfort and recovery",
      "Enhance your daily wellness routine"
    ],
    "Sport & Recovery": [
      "Optimize your training and performance",
      "Support for active bodies and lifestyles",
      "Accelerate recovery between workouts",
      "Maintain peak physical condition"
    ],
    "Beauty & Cosmetics": [
      "Achieve that natural, healthy glow",
      "Combat signs of aging effectively",
      "Address problem skin conditions",
      "Incorporate CBD into your beauty routine"
    ],
    "Pet CBD": [
      "Help pets stay calm and comfortable",
      "Support aging pets' mobility and comfort",
      "Address skin irritations and coat health",
      "Support overall pet wellness naturally"
    ],
    "Hybrid & Mushrooms": [
      "Experience enhanced wellness benefits",
      "Support your body's natural defenses",
      "Achieve mental clarity and focus",
      "Benefit from nature's powerful synergy"
    ]
  };
  
  return descriptions[category]?.[index] || "Perfect match for your wellness needs";
}

// Helper to get initials for recommendation icons
function getInitial(text: string): string {
  return text.split(' ')[0][0] + (text.split(' ')[1]?.[0] || '');
}

// Memoized section header component for better performance
const SectionHeader = memo(function SectionHeader() {
  return (
    <div className="mb-5 sm:mb-6">
      {/* Nested container for the section header - matching card styling */}
      <div className="bg-gradient-to-b from-green-50/80 to-white p-3 sm:p-4 rounded-xl border border-green-100/80 shadow-sm relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20 blur-2xl bg-green-200/30"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full opacity-20 blur-2xl bg-emerald-100/30"></div>
        </div>
        
        <div className="text-center relative z-10">
          {/* Spinning Twistly Logo with improved styling */}
          <div className="flex justify-center mb-1 sm:mb-1.5">
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full relative bg-transparent transition-all duration-500 shadow-[0_10px_20px_rgba(var(--emerald-rgb)/0.15),_inset_0_0_0_1px_rgba(var(--emerald-rgb)/0.2)] p-0.5">
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
                  <Image 
                    src="/images/logos/1.png" 
                    alt="Twistly CBD" 
                    width={40} 
                    height={40} 
                    className="w-full h-full object-contain drop-shadow-md" 
                  />
                </motion.div>
              </div>
            </div>
          </div>
          
          <div className="relative z-10 px-3 py-1.5 inline-block rounded-lg bg-white/80 backdrop-blur-sm shadow-sm border border-gray-100/50">
            <div className="inline-flex bg-gradient-to-br from-green-50/80 to-white rounded-full border border-green-200/40 shadow-sm p-1 mb-1.5">
              <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1.5 text-xs font-medium">
                <Sparkles className="h-3 w-3" />
                <span>Specialized Categories</span>
              </div>
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 drop-shadow-sm">
              Explore Our CBD Categories
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto mt-0.5 sm:mt-1">
              Find the perfect CBD products for your specific wellness needs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

// Memoized slider content component to reduce re-renders
const SliderContent = memo(function SliderContent({ 
  category, 
  isReducedMotion 
}: { 
  category: typeof categories[0],
  isReducedMotion: boolean
}) {
  return (
    <div className="absolute inset-0 flex flex-col h-full">
      {/* Centered headline */}
      <div className="text-center pt-8 px-8 pb-3 relative z-10">
        <div className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center shadow-lg mx-auto mb-2",
          category.theme.accent
        )}>
          {React.cloneElement(category.icon, { 
            className: "h-6 w-6 text-white" 
          })}
        </div>
        <h3 className={cn(
          "text-xl md:text-2xl font-bold mb-1",
          category.theme.text
        )}>
          {category.title}
        </h3>
        <p className="text-gray-700 text-sm max-w-xl mx-auto">
          {category.description}
        </p>
      </div>
      
      {/* Two-card horizontal layout - MORE COMPACT */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 px-4 md:px-8 pb-5 relative z-10">
        {/* Left card: Key Benefits */}
        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-white/70 shadow-sm flex flex-col h-full relative overflow-hidden">
          <div className="flex items-start gap-2 mb-2">
            <div className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5",
              category.theme.accent
            )}>
              <span className="text-white text-xs font-bold">✓</span>
            </div>
            <h4 className={cn(
              "text-sm font-semibold",
              category.theme.text
            )}>
              Key Benefits
            </h4>
          </div>
          
          <ul className="grid gap-1.5 flex-1 relative">
            {category.benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <div className={cn(
                  "w-4 h-4 rounded-full flex items-center justify-center flex-none mt-0.5",
                  category.theme.accentLight
                )}>
                  <span className={cn(
                    "text-[10px] font-bold",
                    category.theme.text
                  )}>
                    {idx + 1}
                  </span>
                </div>
                <div>
                  <h5 className={cn(
                    "text-xs font-medium",
                    category.theme.text
                  )}>
                    {benefit}
                  </h5>
                  <p className="text-[10px] text-gray-500 mt-0.5 line-clamp-1">
                    {getBenefitDescription(category.title, benefit)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          
          <div className="mt-2 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-1.5">
              <div className={cn(
                "w-5 h-5 rounded-full flex items-center justify-center flex-none",
                category.theme.accent
              )}>
                <Star className="h-3 w-3 text-white fill-white" />
              </div>
              <div>
                <div className="flex items-center">
                  <span className="text-[10px] font-medium text-gray-700">Bestseller:</span>
                  <span className={cn(
                    "text-xs font-medium ml-1",
                    category.theme.text
                  )}>
                    {category.featured.name}
                  </span>
                </div>
                <div className="flex items-center mt-0.5">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-2 h-2",
                          i < Math.floor(category.featured.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-200"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-500 ml-1">
                    ({category.featured.reviews})
                  </span>
                  <span className="text-[10px] font-medium ml-1.5">
                    {category.featured.price}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right card: Recommended For */}
        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-white/70 shadow-sm flex flex-col h-full relative overflow-hidden">
          <div className="flex items-start gap-2 mb-2">
            <div className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5",
              category.theme.accent
            )}>
              <Users2 className="h-4 w-4 text-white" />
            </div>
            <h4 className={cn(
              "text-sm font-semibold",
              category.theme.text
            )}>
              Recommended For
            </h4>
          </div>
          
          <ul className="grid gap-1.5 flex-1 relative">
            {recommendationsMap[category.title].map((person, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <div className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center flex-none mt-0.5 text-xs font-medium",
                  category.theme.accent,
                  "text-white"
                )}>
                  {getInitial(person)}
                </div>
                <div>
                  <h5 className="text-xs font-medium text-gray-800">
                    {person}
                  </h5>
                  <p className="text-[10px] text-gray-500 mt-0.5 line-clamp-1">
                    {getRecommendationDescription(category.title, idx)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          
          <div className="mt-2 pt-2 border-t border-gray-100">
            <Button 
              asChild
              className={cn(
                "w-full",
                category.theme.button
              )}
              size="sm"
            >
              <Link href={category.href} className="flex items-center justify-center gap-1.5">
                <span>Explore Collection</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

// Memoized CategoryCard component for better performance
const CategoryCard = memo(function CategoryCard({ 
  category, 
  isReducedMotion 
}: { 
  category: typeof categories[0],
  isReducedMotion: boolean
}) {
  const animConfig = useAnimationConfig();
  
  return (
    <Link href={category.href} className="block h-full group">
      <motion.div 
        className={cn(
          "relative flex flex-col items-center h-full rounded-2xl bg-white overflow-hidden",
          "border-2",
          category.title === "Health & Wellness" ? "border-green-200/80 group-hover:border-green-500/80" : "",
          category.title === "Sport & Recovery" ? "border-blue-200/80 group-hover:border-blue-500/80" : "",
          category.title === "Beauty & Cosmetics" ? "border-purple-200/80 group-hover:border-purple-500/80" : "",
          category.title === "Pet CBD" ? "border-amber-200/80 group-hover:border-amber-500/80" : "",
          category.title === "Hybrid & Mushrooms" ? "border-amber-300/80 group-hover:border-amber-700/80" : "",
          "shadow-[0_10px_25px_-10px_rgba(0,0,0,0.05)]",
          category.title === "Health & Wellness" ? "group-hover:shadow-[0_15px_30px_-10px_rgba(22,163,74,0.2)]" : "",
          category.title === "Sport & Recovery" ? "group-hover:shadow-[0_15px_30px_-10px_rgba(37,99,235,0.2)]" : "",
          category.title === "Beauty & Cosmetics" ? "group-hover:shadow-[0_15px_30px_-10px_rgba(147,51,234,0.2)]" : "",
          category.title === "Pet CBD" ? "group-hover:shadow-[0_15px_30px_-10px_rgba(217,119,6,0.2)]" : "",
          category.title === "Hybrid & Mushrooms" ? "group-hover:shadow-[0_15px_30px_-10px_rgba(180,83,9,0.2)]" : "",
          "backdrop-blur-sm"
        )}
      >
        {/* Subtle gradient border instead of solid border */}
        <div className="absolute inset-0 p-px rounded-xl overflow-hidden">
          <div className={cn(
            "absolute inset-0 rounded-xl transition-opacity duration-300 opacity-60 group-hover:opacity-100",
            category.title === "Health & Wellness" ? "bg-gradient-to-tr from-green-200 via-green-100/60 to-green-50/40" : "",
            category.title === "Sport & Recovery" ? "bg-gradient-to-tr from-blue-200 via-blue-100/60 to-blue-50/40" : "",
            category.title === "Beauty & Cosmetics" ? "bg-gradient-to-tr from-purple-200 via-purple-100/60 to-purple-50/40" : "",
            category.title === "Pet CBD" ? "bg-gradient-to-tr from-amber-200 via-amber-100/60 to-amber-50/40" : "",
            category.title === "Hybrid & Mushrooms" ? "bg-gradient-to-tr from-amber-300 via-amber-200/60 to-amber-100/40" : ""
          )}></div>
        </div>

        {/* Product count badge - top right */}
        <div className="absolute top-3 right-3 z-20">
          <div className={cn(
            "px-2 py-0.5 rounded-full text-[10px] font-medium",
            "bg-white shadow-sm border",
            category.title === "Health & Wellness" ? "border-green-300 text-green-800" : "",
            category.title === "Sport & Recovery" ? "border-blue-300 text-blue-800" : "",
            category.title === "Beauty & Cosmetics" ? "border-purple-300 text-purple-800" : "",
            category.title === "Pet CBD" ? "border-amber-300 text-amber-800" : "",
            category.title === "Hybrid & Mushrooms" ? "border-amber-400 text-amber-900" : ""
          )}>
            {category.productCount} Products
          </div>
        </div>
        
        {/* Card top section with glass effect - FINAL */}
        <div className={cn(
          "w-full pt-8 pb-4 px-5 relative z-10 overflow-hidden",
          "bg-gradient-to-b",
          category.title === "Health & Wellness" ? "from-green-50/90 to-white" : "",
          category.title === "Sport & Recovery" ? "from-blue-50/90 to-white" : "",
          category.title === "Beauty & Cosmetics" ? "from-purple-50/90 to-white" : "",
          category.title === "Pet CBD" ? "from-amber-50/90 to-white" : "",
          category.title === "Hybrid & Mushrooms" ? "from-amber-100/90 to-white" : "",
          "rounded-t-xl"
        )}>
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className={cn(
              "absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-50 blur-xl",
              category.title === "Health & Wellness" ? "bg-green-300/50" : "",
              category.title === "Sport & Recovery" ? "bg-blue-300/50" : "",
              category.title === "Beauty & Cosmetics" ? "bg-purple-300/50" : "",
              category.title === "Pet CBD" ? "bg-amber-300/50" : "",
              category.title === "Hybrid & Mushrooms" ? "bg-amber-400/50" : ""
            )}></div>
            <div className={cn(
              "absolute -bottom-10 -left-10 w-32 h-32 rounded-full opacity-30 blur-2xl",
              category.title === "Health & Wellness" ? "bg-green-200/40" : "",
              category.title === "Sport & Recovery" ? "bg-blue-200/40" : "",
              category.title === "Beauty & Cosmetics" ? "bg-purple-200/40" : "",
              category.title === "Pet CBD" ? "bg-amber-200/40" : "",
              category.title === "Hybrid & Mushrooms" ? "bg-amber-300/40" : ""
            )}></div>
          </div>
          
          {/* Logo circle with improved effect */}
          <div className="relative z-10 flex justify-center">
            <div 
              className={cn(
                "w-20 h-20 rounded-full relative",
                "bg-transparent",
                "group-hover:scale-105 transition-all duration-500",
                `shadow-[0_10px_20px_rgba(var(--${category.theme.textLight.replace('text-', '').split('-')[0]}-rgb)/0.2),_inset_0_0_0_1px_rgba(var(--${category.theme.textLight.replace('text-', '').split('-')[0]}-rgb)/0.3)]`,
                "p-0.5 group-hover:shadow-lg"
              )}
            >
              <div className={cn(
                "w-full h-full rounded-full flex items-center justify-center overflow-hidden",
                "bg-transparent",
                "after:absolute after:inset-0 after:rounded-full after:shadow-inner"
              )}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 20, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  className="w-12 h-12 flex items-center justify-center relative z-10"
                >
                  <Image 
                    src="/images/logos/1.png" 
                    alt="Twistly CBD" 
                    width={48} 
                    height={48} 
                    className="w-full h-full object-contain drop-shadow-md" 
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
});

// Main component
export function CategoryHighlights() {
  const animConfig = useAnimationConfig();
  const prefersReducedMotion = useReducedMotion();

  // Custom formula card data
  const customCard = {
    title: "Custom Formula",
    description: "Personalized CBD solutions tailored specifically to your unique wellness needs.",
    href: "/custom",
    theme: {
      gradient: "from-teal-50 via-teal-100/80 to-teal-50/40",
      hoverGradient: "from-teal-100 to-teal-50",
      accent: "bg-teal-600",
      accentLight: "bg-teal-100",
      accentDark: "bg-teal-700",
      text: "text-teal-800",
      textLight: "text-teal-600",
      border: "border-teal-200",
      borderHover: "hover:border-teal-300",
      shadow: "shadow-teal-500/15",
      button: "bg-teal-600 hover:bg-teal-700",
      bgHover: "hover:bg-teal-50"
    },
    icon: <Sparkles className="h-5 w-5" />
  };

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-b from-green-50 to-white">
      {/* Background decoration - simplified for mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full opacity-30 blur-3xl bg-green-500/40"></div>
        <div className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full opacity-30 blur-3xl bg-emerald-500/30"></div>
      </div>
      
      {/* Main container - matching responsive approach */}
      <Container className="relative z-10 bg-white backdrop-blur-sm rounded-xl shadow-md border border-green-200/90 p-3 sm:p-4 lg:p-5 w-full mx-auto">
        {/* Section Header */}
        <SectionHeader />

        {/* Cards Container */}
        <div className="bg-gray-50/60 rounded-lg border-2 border-gray-100 p-2 sm:p-3 overflow-hidden mt-3 shadow-lg relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-gray-50/30 to-gray-100/30 z-[-1]"></div>
          <motion.div
            variants={animConfig.getVariants(containerVariants)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3"
            suppressHydrationWarning
          >
            {categories.map((category, index) => (
              <div key={category.title} className="overflow-hidden">
                <motion.div
                  variants={animConfig.getVariants(itemVariants)}
                  className="h-full"
                  suppressHydrationWarning
                >
                  {/* Nested container with neutral border and shadow - PURE WHITE */}
                  <div className="h-full p-1.5 bg-white rounded-xl border border-gray-100/80 shadow-sm">
                    <motion.div
                      className="h-full cursor-pointer" 
                      whileHover={{ 
                        boxShadow: `0 15px 30px -10px rgba(var(--${category.theme.textLight.replace('text-', '').split('-')[0]}-rgb)/0.2)`,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                      <Link href={category.href} className="block h-full group">
                        <div 
                          className={cn(
                            "relative flex flex-col items-center h-full rounded-lg bg-white overflow-hidden",
                            "transition-all duration-300 ease-out min-h-[220px] sm:min-h-[240px] md:min-h-[260px]",
                            "shadow-[0_10px_25px_-10px_rgba(0,0,0,0.05)]",
                            category.title === "Health & Wellness" ? "group-hover:shadow-[0_15px_30px_-10px_rgba(22,163,74,0.2)]" : "",
                            category.title === "Sport & Recovery" ? "group-hover:shadow-[0_15px_30px_-10px_rgba(37,99,235,0.2)]" : "",
                            category.title === "Beauty & Cosmetics" ? "group-hover:shadow-[0_15px_30px_-10px_rgba(147,51,234,0.2)]" : "",
                            category.title === "Pet CBD" ? "group-hover:shadow-[0_15px_30px_-10px_rgba(217,119,6,0.2)]" : "",
                            category.title === "Hybrid & Mushrooms" ? "group-hover:shadow-[0_15px_30px_-10px_rgba(180,83,9,0.2)]" : ""
                          )}
                        >
                          {/* Subtle gradient border instead of solid border */}
                          <div className="absolute inset-0 p-px rounded-xl overflow-hidden">
                            <div className={cn(
                              "absolute inset-0 rounded-xl transition-opacity duration-300 opacity-60 group-hover:opacity-100",
                              category.title === "Health & Wellness" ? "bg-gradient-to-tr from-green-200 via-green-100/60 to-green-50/40" : "",
                              category.title === "Sport & Recovery" ? "bg-gradient-to-tr from-blue-200 via-blue-100/60 to-blue-50/40" : "",
                              category.title === "Beauty & Cosmetics" ? "bg-gradient-to-tr from-purple-200 via-purple-100/60 to-purple-50/40" : "",
                              category.title === "Pet CBD" ? "bg-gradient-to-tr from-amber-200 via-amber-100/60 to-amber-50/40" : "",
                              category.title === "Hybrid & Mushrooms" ? "bg-gradient-to-tr from-amber-300 via-amber-200/60 to-amber-100/40" : ""
                            )}></div>
                          </div>

                          {/* Product count badge - top right */}
                          <div className="absolute top-3 right-3 z-20">
                            <div className={cn(
                              "px-2 py-0.5 rounded-full text-[10px] font-medium",
                              "bg-white shadow-sm border",
                              category.title === "Health & Wellness" ? "border-green-300 text-green-800" : "",
                              category.title === "Sport & Recovery" ? "border-blue-300 text-blue-800" : "",
                              category.title === "Beauty & Cosmetics" ? "border-purple-300 text-purple-800" : "",
                              category.title === "Pet CBD" ? "border-amber-300 text-amber-800" : "",
                              category.title === "Hybrid & Mushrooms" ? "border-amber-400 text-amber-900" : ""
                            )}>
                              {category.productCount} Products
                            </div>
                          </div>
                          
                          {/* Card top section with glass effect - FINAL */}
                          <div className={cn(
                            "w-full pt-5 pb-3 px-4 relative z-10 overflow-hidden",
                            "bg-gradient-to-b",
                            category.title === "Health & Wellness" ? "from-green-50/90 to-white" : "",
                            category.title === "Sport & Recovery" ? "from-blue-50/90 to-white" : "",
                            category.title === "Beauty & Cosmetics" ? "from-purple-50/90 to-white" : "",
                            category.title === "Pet CBD" ? "from-amber-50/90 to-white" : "",
                            category.title === "Hybrid & Mushrooms" ? "from-amber-100/90 to-white" : "",
                            "rounded-t-lg"
                          )}>
                            {/* Decorative elements */}
                            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                              <div className={cn(
                                "absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-50 blur-xl",
                                category.title === "Health & Wellness" ? "bg-green-300/50" : "",
                                category.title === "Sport & Recovery" ? "bg-blue-300/50" : "",
                                category.title === "Beauty & Cosmetics" ? "bg-purple-300/50" : "",
                                category.title === "Pet CBD" ? "bg-amber-300/50" : "",
                                category.title === "Hybrid & Mushrooms" ? "bg-amber-400/50" : ""
                              )}></div>
                              <div className={cn(
                                "absolute -bottom-10 -left-10 w-32 h-32 rounded-full opacity-30 blur-2xl",
                                category.title === "Health & Wellness" ? "bg-green-200/40" : "",
                                category.title === "Sport & Recovery" ? "bg-blue-200/40" : "",
                                category.title === "Beauty & Cosmetics" ? "bg-purple-200/40" : "",
                                category.title === "Pet CBD" ? "bg-amber-200/40" : "",
                                category.title === "Hybrid & Mushrooms" ? "bg-amber-300/40" : ""
                              )}></div>
                            </div>
                            
                            {/* Logo circle with improved effect */}
                            <div className="relative z-10 flex justify-center">
                              <div 
                                className={cn(
                                  "w-14 h-14 rounded-full relative sm:w-16 sm:h-16 md:w-20 md:h-20",
                                  "bg-transparent",
                                  "group-hover:scale-105 transition-all duration-500",
                                  `shadow-[0_10px_20px_rgba(var(--${category.theme.textLight.replace('text-', '').split('-')[0]}-rgb)/0.2),_inset_0_0_0_1px_rgba(var(--${category.theme.textLight.replace('text-', '').split('-')[0]}-rgb)/0.3)]`,
                                  "p-0.5 group-hover:shadow-lg"
                                )}
                              >
                                <div className={cn(
                                  "w-full h-full rounded-full flex items-center justify-center overflow-hidden",
                                  "bg-transparent",
                                  "after:absolute after:inset-0 after:rounded-full after:shadow-inner"
                                )}>
                                  <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ 
                                      duration: 20, 
                                      repeat: Infinity, 
                                      ease: "linear" 
                                    }}
                                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center relative z-10"
                                  >
                                    <Image 
                                      src="/images/logos/1.png" 
                                      alt="Twistly CBD" 
                                      width={48} 
                                      height={48} 
                                      className="w-full h-full object-contain drop-shadow-md" 
                                    />
                                  </motion.div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Content with glass morphism - FINAL */}
                          <div className={cn(
                            "px-4 py-3 text-center flex flex-col flex-1 justify-between w-full",
                            "relative overflow-hidden",
                            "bg-white rounded-b-lg"
                          )}>
                            {/* Subtle patterns */}
                            <div className="absolute inset-0 opacity-5">
                              <div className={cn(
                                "absolute top-0 right-0 w-32 h-32 rounded-full opacity-10",
                                category.title === "Health & Wellness" ? "bg-green-200" : "",
                                category.title === "Sport & Recovery" ? "bg-blue-200" : "",
                                category.title === "Beauty & Cosmetics" ? "bg-purple-200" : "",
                                category.title === "Pet CBD" ? "bg-amber-200" : "",
                                category.title === "Hybrid & Mushrooms" ? "bg-amber-300" : ""
                              )}></div>
                            </div>
                            
                            <div className="relative z-10">
                              <div className={cn(
                                "text-xs uppercase tracking-wider mb-1.5 font-medium",
                                category.theme.textLight
                              )}>
                                Category
                              </div>
                              <h3 className={cn(
                                "text-sm sm:text-base md:text-lg font-bold leading-tight mb-2",
                                category.theme.text
                              )}>
                                {category.title}
                              </h3>
                              
                              <p className="text-xs sm:text-sm text-gray-700 mb-3 line-clamp-2">{category.description}</p>
                            </div>
                            
                            <div className="w-full mt-auto relative z-10">
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full h-9 sm:h-10 rounded-lg",
                                  "bg-white shadow-sm group-hover:shadow-md",
                                  "relative overflow-hidden",
                                  "transition-all duration-300",
                                  "border-0 group-hover:bg-white"
                                )}
                              >
                                {/* Clean button border */}
                                <span className="absolute inset-0 rounded-xl border overflow-hidden">
                                  <span className={cn(
                                    "absolute inset-0 rounded-xl border transition-colors duration-300",
                                    category.title === "Health & Wellness" ? "border-green-100 group-hover:border-green-300" : "",
                                    category.title === "Sport & Recovery" ? "border-blue-100 group-hover:border-blue-300" : "",
                                    category.title === "Beauty & Cosmetics" ? "border-purple-100 group-hover:border-purple-300" : "",
                                    category.title === "Pet CBD" ? "border-amber-100 group-hover:border-amber-300" : "",
                                    category.title === "Hybrid & Mushrooms" ? "border-amber-200 group-hover:border-amber-400" : ""
                                  )}></span>
                                </span>
                                <span className={cn(
                                  "relative z-10 flex items-center justify-center gap-2 font-medium",
                                  category.title === "Health & Wellness" ? "text-green-700 group-hover:text-green-800" : "",
                                  category.title === "Sport & Recovery" ? "text-blue-700 group-hover:text-blue-800" : "",
                                  category.title === "Beauty & Cosmetics" ? "text-purple-700 group-hover:text-purple-800" : "",
                                  category.title === "Pet CBD" ? "text-amber-700 group-hover:text-amber-800" : "",
                                  category.title === "Hybrid & Mushrooms" ? "text-amber-800 group-hover:text-amber-900" : ""
                                )}>
                                  Explore
                                  <span className={cn(
                                    "transition-all duration-300 group-hover:translate-x-1",
                                    category.title === "Health & Wellness" ? "text-green-700" : "",
                                    category.title === "Sport & Recovery" ? "text-blue-700" : "",
                                    category.title === "Beauty & Cosmetics" ? "text-purple-700" : "",
                                    category.title === "Pet CBD" ? "text-amber-700" : "",
                                    category.title === "Hybrid & Mushrooms" ? "text-amber-800" : ""
                                  )}>
                                    →
                                  </span>
                                </span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
        
        {/* Dr. Twistly Banner - Fix the styling to match */}
        <div className="mt-4 max-w-3xl mx-auto bg-gray-50/60 rounded-lg border border-gray-100 overflow-hidden shadow-md relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-gray-50/30 to-gray-100/30 z-[-1]"></div>
          <div className="p-1 bg-white/70 rounded-xl border border-gray-100/80 shadow-sm backdrop-blur-md">
            <div className="bg-white rounded-lg shadow-sm relative overflow-hidden">
              {/* Subtle gradient border instead of solid green */}
              <div className="absolute inset-0 p-px rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 via-emerald-200/60 to-green-100/40 rounded-lg"></div>
              </div>
              <div className="relative z-[2]">
                <MiniDrTwistly />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
} 