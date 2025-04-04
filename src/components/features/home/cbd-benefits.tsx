'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  Brain, 
  Heart, 
  Award, 
  Leaf, 
  Activity, 
  Bot, 
  MessageSquare, 
  DropletIcon, 
  Sparkles, 
  ShieldCheck, 
  Star,
  PawPrint,
  Moon,
  Zap,
  CheckCircle2,
  ScrollText,
  Microscope,
  ChevronRight,
  LucideProps,
  ShoppingCart,
  Check,
  ChevronLeft
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { cn } from '@/lib/utils'
import { Container } from '@/components/ui/container'
import { MiniDrTwistly } from '@/components/features/chat/mini-dr-twistly'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { useAnimationConfig } from '@/hooks/use-animation-config'

// Category-specific use cases
const categories = [
  {
    id: "wellness",
    name: "Health & Wellness",
    icon: <Heart className="h-5 w-5" />,
    color: "green",
    benefits: [
      "Reduce everyday stress and anxiety",
      "Support healthy sleep patterns",
      "Promote overall mind-body balance",
      "Aid in managing daily discomfort",
      "Support immune system function",
      "Enhance mental clarity and focus",
      "Promote a sense of calm and wellbeing",
      "Support cardiovascular health"
    ]
  },
  {
    id: "sport",
    name: "Sport & Recovery",
    icon: <Activity className="h-5 w-5" />,
    color: "blue",
    benefits: [
      "Accelerate post-workout recovery",
      "Soothe exercise-induced inflammation",
      "Support joint health and flexibility",
      "Enhance focus during training",
      "Improve muscle recovery time",
      "Reduce exercise-related soreness",
      "Support better mobility and range of motion",
      "Promote better endurance and stamina"
    ]
  },
  {
    id: "beauty",
    name: "Beauty & Cosmetics",
    icon: <Sparkles className="h-5 w-5" />,
    color: "purple",
    benefits: [
      "Reduce skin inflammation and redness",
      "Support natural collagen production",
      "Balance oil production for clearer skin",
      "Help protect against environmental damage",
      "Improve skin hydration and elasticity",
      "Minimize appearance of fine lines and wrinkles",
      "Support skin barrier function",
      "Promote a more even skin tone"
    ]
  },
  {
    id: "hybrid",
    name: "Hybrid & Mushrooms",
    icon: <DropletIcon className="h-5 w-5" />,
    color: "amber",
    benefits: [
      "Support cognitive function and clarity",
      "Enhance immune system response",
      "Promote cellular health and vitality",
      "Aid in stress adaptation and resilience",
      "Support long-term brain health",
      "Improve energy and natural vitality",
      "Promote better stress management",
      "Support memory and focus"
    ]
  },
  {
    id: "pet",
    name: "Pet CBD",
    icon: <PawPrint className="h-5 w-5" />,
    color: "orange",
    benefits: [
      "Ease anxiety during stressful situations",
      "Support joint health in aging pets",
      "Help promote calm behavior",
      "Maintain overall pet wellness",
      "Reduce age-related discomfort",
      "Support healthy skin and coat",
      "Aid in noise sensitivity and phobias",
      "Promote better digestive health"
    ]
  }
]

// Updated Science of CBD conditions
const cbdConditions = [
  {
    id: "anxiety",
    title: "Anxiety & Stress",
    icon: <Brain />,
    shortDesc: "May regulate mood and reduce anxiety symptoms",
    content: "CBD may interact with serotonin receptors in the brain, potentially helping to regulate mood and reduce symptoms of anxiety and stress. Studies have shown CBD might positively impact how your brain's receptors respond to serotonin.",
    color: "green",
    imageUrl: "/images/logos/1.png",
    pillars: ["Calming effect", "Stress reduction", "Mental clarity", "Improved relaxation", "Better stress response"]
  },
  {
    id: "pain",
    title: "Pain & Inflammation",
    icon: <Activity />,
    shortDesc: "Anti-inflammatory properties for pain relief",
    content: "CBD has anti-inflammatory properties and may influence endocannabinoid receptor activity, potentially reducing inflammation and interacting with neurotransmitters to alleviate chronic pain. This could be beneficial for conditions like arthritis and multiple sclerosis.",
    color: "blue",
    imageUrl: "/images/logos/1.png",
    pillars: ["Inflammation reduction", "Pain management", "Joint support", "Muscle recovery", "Nerve comfort"]
  },
  {
    id: "sleep",
    title: "Sleep & Insomnia",
    icon: <Moon />,
    shortDesc: "May improve sleep quality and duration",
    content: "By addressing underlying causes of sleep issues like anxiety or pain, CBD may help improve sleep quality and duration. Some studies suggest CBD might affect sleep cycles directly, potentially increasing overall sleep time and improving insomnia symptoms.",
    color: "purple",
    imageUrl: "/images/logos/1.png",
    pillars: ["Better sleep quality", "Easier to fall asleep", "More restful nights", "Consistent sleep cycles", "Wake feeling refreshed"]
  },
  {
    id: "focus",
    title: "Focus & Cognitive Function",
    icon: <Zap />,
    shortDesc: "Potential neuroprotective properties",
    content: "Research suggests CBD may have neuroprotective properties that could support brain health and cognitive function. By reducing inflammation and oxidative stress in the brain, CBD might help improve focus and clarity.",
    color: "amber",
    imageUrl: "/images/logos/1.png",
    pillars: ["Mental clarity", "Brain health", "Better focus", "Improved concentration", "Cognitive support"]
  },
  {
    id: "mood",
    title: "Depression & Mood",
    icon: <Heart />,
    shortDesc: "Potential antidepressant-like effects",
    content: "CBD may influence how your brain's chemical receptors respond to serotonin that's already present in your system. Some studies indicate CBD could have antidepressant-like effects, potentially helping to stabilize mood and improve overall well-being.",
    color: "orange",
    imageUrl: "/images/logos/1.png",
    pillars: ["Mood stabilization", "Emotional balance", "Sense of well-being", "Improved outlook", "Stress resilience"]
  },
  {
    id: "digestive",
    title: "Digestive Health",
    icon: <ShieldCheck />,
    shortDesc: "May support gut health and reduce inflammation",
    content: "CBD may help support digestive health by interacting with cannabinoid receptors in the digestive tract. Studies suggest it could reduce inflammation in the gut, potentially easing symptoms of digestive disorders and supporting a healthy gut microbiome.",
    color: "green",
    imageUrl: "/images/logos/1.png",
    pillars: ["Gut health", "Reduced irritation", "Better digestion", "Appetite regulation", "Microbiome support"]
  },
  {
    id: "skin",
    title: "Skin & Topical Benefits",
    icon: <Sparkles />,
    shortDesc: "Anti-inflammatory and antioxidant properties",
    content: "When applied topically, CBD can work with the endocannabinoid receptors in your skin to help reduce inflammation, balance oil production, and support skin health. Research indicates CBD's antioxidant properties may also help protect against environmental damage and support collagen production.",
    color: "purple",
    imageUrl: "/images/logos/1.png",
    pillars: ["Anti-Aging", "Acne Control", "Skin Recovery", "Radiant Glow", "Balanced Oil Production"]
  },
  {
    id: "pet",
    title: "Pet Health & Wellness",
    icon: <PawPrint />,
    shortDesc: "Support for pets' overall wellbeing",
    content: "CBD interacts with pets' endocannabinoid systems similarly to humans. Research suggests it may help manage anxiety, reduce discomfort, and support mobility in aging pets. The non-psychoactive nature of CBD makes it safe for pets when properly dosed.",
    color: "orange",
    imageUrl: "/images/logos/1.png",
    pillars: ["Anxiety relief", "Joint support", "Calm behavior", "Overall wellness", "Improved comfort"]
  },
  {
    id: "recovery",
    title: "Recovery & Muscle Relief",
    icon: <Activity />,
    shortDesc: "May aid post-workout recovery",
    content: "CBD may help accelerate recovery by reducing inflammation in muscles and joints after intense physical activity. Its potential anti-inflammatory properties could help minimize soreness and speed up the body's natural healing process.",
    color: "blue",
    imageUrl: "/images/logos/1.png",
    pillars: ["Faster recovery", "Reduced soreness", "Better mobility", "Post-workout support", "Inflammation control"]
  },
  {
    id: "performance",
    title: "Performance & Endurance",
    icon: <Zap />,
    shortDesc: "May support athletic performance",
    content: "By potentially reducing performance anxiety and helping manage pre-competition stress, CBD might contribute to better sports performance. Some athletes report improved focus and endurance when using CBD as part of their training regimen.",
    color: "blue",
    imageUrl: "/images/logos/1.png",
    pillars: ["Better focus", "Stress management", "Improved endurance", "Pre-workout support", "Mental clarity"]
  },
  {
    id: "anti-aging",
    title: "Anti-Aging & Longevity",
    icon: <Sparkles />,
    shortDesc: "Antioxidant and nourishing properties",
    content: "CBD's antioxidant properties may help combat free radicals that contribute to skin aging. When incorporated into skincare, it may help reduce the appearance of fine lines and support skin elasticity and firmness for a more youthful appearance.",
    color: "purple",
    imageUrl: "/images/logos/1.png",
    pillars: ["Wrinkle reduction", "Skin elasticity", "Collagen support", "Antioxidant protection", "Radiant complexion"]
  },
  {
    id: "hair-scalp",
    title: "Hair & Scalp Health",
    icon: <Sparkles />,
    shortDesc: "May support scalp health and hair growth",
    content: "CBD may help create a healthier environment for hair growth by soothing the scalp, reducing inflammation, and balancing oil production. Its moisturizing properties can help strengthen hair follicles and potentially reduce hair loss related to inflammation.",
    color: "purple",
    imageUrl: "/images/logos/1.png",
    pillars: ["Scalp soothing", "Hair strengthening", "Oil balance", "Reduced irritation", "Healthier follicles"]
  },
  {
    id: "immunity",
    title: "Immune Support",
    icon: <ShieldCheck />,
    shortDesc: "May help regulate immune response",
    content: "Research suggests CBD may have immunomodulatory effects that could help balance the immune system. By potentially reducing excessive inflammation, CBD might contribute to a more balanced immune response and overall immune health.",
    color: "amber",
    imageUrl: "/images/logos/1.png",
    pillars: ["Balanced response", "Inflammation control", "Stress reduction", "Cellular support", "Antioxidant properties"]
  },
  {
    id: "energy",
    title: "Energy & Vitality",
    icon: <Zap />,
    shortDesc: "May support natural energy levels",
    content: "By potentially improving sleep quality and reducing anxiety, CBD might indirectly support better natural energy levels throughout the day. Some users report feeling more balanced energy without the crashes associated with stimulants.",
    color: "amber",
    imageUrl: "/images/logos/1.png",
    pillars: ["Sustainable energy", "Better focus", "Reduced fatigue", "Natural balance", "Mental clarity"]
  },
  {
    id: "pet-anxiety",
    title: "Pet Anxiety & Stress",
    icon: <PawPrint />,
    shortDesc: "May help calm nervous pets",
    content: "CBD may help manage anxiety in pets during stressful situations like thunderstorms, fireworks, or separation. It interacts with their endocannabinoid system to potentially promote a sense of calm without sedating effects.",
    color: "orange",
    imageUrl: "/images/logos/1.png",
    pillars: ["Noise sensitivity help", "Calmer behavior", "Reduced stress", "Travel comfort", "Separation support"]
  },
  {
    id: "pet-mobility",
    title: "Pet Mobility & Joints",
    icon: <PawPrint />,
    shortDesc: "May support aging pets' joint health",
    content: "As pets age, CBD may help support better mobility and comfort by potentially reducing joint inflammation and discomfort. Many pet owners report their senior pets show improved activity levels and comfort when using CBD products.",
    color: "orange",
    imageUrl: "/images/logos/1.png",
    pillars: ["Joint support", "Easier movement", "Senior pet care", "Active lifestyle", "Comfort improvement"]
  },
  {
    id: "pet-wellness",
    title: "Pet Overall Wellness",
    icon: <PawPrint />,
    shortDesc: "Support for pets' general health",
    content: "CBD may contribute to your pet's overall wellness by supporting multiple body systems simultaneously. From healthy skin and coat to digestive comfort and immune function, CBD's balancing properties may benefit pets of all ages.",
    color: "orange",
    imageUrl: "/images/logos/1.png",
    pillars: ["Digestive support", "Skin & coat health", "Balanced behavior", "General vitality", "Overall comfort"]
  },
  {
    id: "pet-digestion",
    title: "Pet Digestive Health",
    icon: <PawPrint />,
    shortDesc: "Support for pet digestive comfort",
    content: "CBD may help support your pet's digestive system by interacting with cannabinoid receptors in their gut. Many pet owners report improvements in digestive issues, including reduced upset stomach and better overall digestive comfort.",
    color: "orange",
    imageUrl: "/images/logos/1.png",
    pillars: ["Digestive comfort", "Reduced sensitivity", "Better appetite", "Regular function", "Less digestive upset"]
  }
]

// Core facts about CBD
const cbdFacts = [
  {
    title: "Endocannabinoid System",
    icon: <Microscope className="h-5 w-5" />,
    description: "CBD works with your body's endocannabinoid system, which helps regulate many vital functions including sleep, mood, pain, and immune response."
  },
  {
    title: "Non-Psychoactive",
    icon: <Brain className="h-5 w-5" />,
    description: "Unlike THC, CBD doesn't cause a 'high' or alter your mental state, making it ideal for daily wellness without impairing function."
  },
  {
    title: "Natural Source",
    icon: <Leaf className="h-5 w-5" />,
    description: "Our CBD is extracted from premium hemp plants using clean CO2 extraction methods to preserve natural compounds and terpenes."
  },
  {
    title: "Third-Party Tested",
    icon: <Award className="h-5 w-5" />,
    description: "All our products undergo rigorous third-party lab testing to ensure purity, potency, and safety, with results available to view."
  }
]

// Custom icon component with color control
const BenefitIcon = ({ icon, className, color }: { icon: React.ReactNode, className?: string, color: string }) => {
  const colorClasses = {
    green: "bg-gradient-to-br from-green-500 to-green-600",
    blue: "bg-gradient-to-br from-blue-500 to-blue-600",
    purple: "bg-gradient-to-br from-purple-500 to-purple-600",
    amber: "bg-gradient-to-br from-amber-600 to-amber-700",
    orange: "bg-gradient-to-br from-orange-500 to-orange-600",
  }
  
  return (
    <div className={cn(
      "rounded-full p-2 text-white shadow-md flex items-center justify-center", 
      colorClasses[color as keyof typeof colorClasses],
      className
    )}>
      {React.cloneElement(icon as React.ReactElement, { className: "h-5 w-5" })}
    </div>
  )
}

// Add product recommendations based on conditions
const conditionProducts = {
  anxiety: {
    id: "cbd-calm-capsules",
    name: "CBD Calm Capsules",
    description: "Our CBD Calm Capsules deliver a precise dose of CBD combined with calming adaptogens to help you manage stress and maintain focus throughout your day.",
    price: 64.99,
    image: "/images/logos/1.png",
    benefits: ["Promotes calm without drowsiness", "Supports mental clarity", "Helps manage stress", "Supports mood balance"],
    rating: 4.6,
    reviewCount: 84
  },
  pain: {
    id: "cbd-recovery-balm",
    name: "CBD Recovery Balm",
    description: "This powerful recovery balm delivers targeted relief to sore muscles and joints with a potent combination of CBD, arnica, and menthol for cooling comfort.",
    price: 54.99,
    discountPrice: 49.99,
    image: "/images/logos/1.png",
    benefits: ["Targets muscle soreness", "Soothes joint discomfort", "Cooling sensation", "Absorbs quickly"],
    rating: 4.9,
    reviewCount: 156
  },
  sleep: {
    id: "cbd-sleep-gummies",
    name: "CBD Sleep Gummies",
    description: "Our CBD Sleep Gummies combine premium CBD with melatonin and calming herbs to promote restful sleep and help you wake up refreshed.",
    price: 49.99,
    image: "/images/logos/1.png",
    benefits: ["Promotes faster sleep onset", "Supports deeper sleep", "Helps regulate sleep cycles", "Non-habit forming"],
    rating: 4.7,
    reviewCount: 203
  },
  focus: {
    id: "cbd-sport-drops",
    name: "CBD Sport Performance Drops",
    description: "Formulated specifically for athletes, our Sport Performance Drops combine CBD with BCAAs and electrolytes to support recovery, endurance and optimal performance.",
    price: 74.99,
    discountPrice: 64.99,
    image: "/images/logos/1.png",
    benefits: ["Supports muscle recovery", "Enhances endurance", "Helps maintain focus", "Promotes joint mobility"],
    rating: 4.7,
    reviewCount: 118
  },
  mood: {
    id: "cbd-wellness-drops",
    name: "CBD Wellness Drops",
    description: "Our CBD Wellness Drops combine premium CBD with essential vitamins and adaptogens for a daily wellness boost that supports your body's natural balance.",
    price: 69.99,
    image: "/images/logos/1.png",
    benefits: ["Supports overall wellness", "Enhances daily energy", "Promotes immune function", "Helps maintain mental clarity"],
    rating: 4.6,
    reviewCount: 89
  },
  digestive: {
    id: "cbd-oil-full-spectrum",
    name: "Full Spectrum CBD Oil",
    description: "Our premium full-spectrum CBD oil is crafted from organically grown hemp plants, providing a complete profile of beneficial cannabinoids for maximum effectiveness.",
    price: 89.99,
    discountPrice: 79.99,
    image: "/images/logos/1.png",
    benefits: ["Promotes relaxation", "Supports healthy digestion", "Helps manage discomfort", "Supports overall wellness"],
    rating: 4.8,
    reviewCount: 124
  },
  skin: {
    id: "cbd-face-serum",
    name: "CBD Radiance Face Serum",
    description: "This luxurious face serum combines the power of CBD with hyaluronic acid and vitamin C to hydrate, brighten and rejuvenate your skin for a radiant complexion.",
    price: 79.99,
    image: "/images/logos/1.png",
    benefits: ["Hydrates and plumps skin", "Brightens complexion", "Reduces fine lines", "Calms redness and irritation"],
    rating: 4.8,
    reviewCount: 97
  },
  pet: {
    id: "cbd-pet-tincture",
    name: "CBD Pet Tincture",
    description: "Our specially formulated pet CBD tincture is designed with your furry friends in mind, providing gentle support for anxiety, joint discomfort, and overall wellness.",
    price: 59.99,
    discountPrice: 49.99,
    image: "/images/logos/1.png",
    benefits: ["Eases anxiety", "Supports joint health", "Promotes calm", "Easy to administer"],
    rating: 4.8,
    reviewCount: 112
  },
  recovery: {
    id: "cbd-recovery-cream",
    name: "CBD Muscle Recovery Cream",
    description: "This fast-absorbing recovery cream combines CBD with arnica, menthol and MSM to deliver targeted relief to sore muscles after intense workouts.",
    price: 59.99,
    image: "/images/logos/1.png",
    benefits: ["Fast-acting relief", "Cooling sensation", "Targets sore muscles", "No greasy residue"],
    rating: 4.8,
    reviewCount: 136
  },
  performance: {
    id: "cbd-performance-drops",
    name: "CBD Performance Drops",
    description: "Our specially formulated Performance Drops combine premium CBD with adaptogenic herbs to support focus, endurance and optimal athletic performance.",
    price: 79.99,
    image: "/images/logos/1.png",
    benefits: ["Pre-workout focus", "Improved stamina", "Clear thinking", "Fast absorption"],
    rating: 4.7,
    reviewCount: 89
  },
  "anti-aging": {
    id: "cbd-anti-aging-cream",
    name: "CBD Anti-Aging Cream",
    description: "This luxurious anti-aging formula harnesses the power of CBD with peptides and hyaluronic acid to reduce fine lines and restore skin's youthful appearance.",
    price: 89.99,
    discountPrice: 74.99,
    image: "/images/logos/1.png",
    benefits: ["Reduces fine lines", "Improves elasticity", "Deep hydration", "Brightens complexion"],
    rating: 4.9,
    reviewCount: 112
  },
  "hair-scalp": {
    id: "cbd-scalp-treatment",
    name: "CBD Scalp Treatment",
    description: "Our nourishing scalp treatment uses CBD to soothe irritation, balance oil production and create the optimal environment for healthy hair growth.",
    price: 64.99,
    image: "/images/logos/1.png",
    benefits: ["Soothes irritation", "Balances oil", "Strengthens follicles", "Promotes growth"],
    rating: 4.6,
    reviewCount: 74
  },
  immunity: {
    id: "cbd-immunity-drops",
    name: "CBD Immunity Drops",
    description: "Fortify your immune system with our potent blend of CBD, elderberry, zinc and vitamin C designed to support your body's natural defenses year-round.",
    price: 69.99,
    image: "/images/logos/1.png",
    benefits: ["Immune support", "Antioxidant rich", "Daily defense", "Natural ingredients"],
    rating: 4.7,
    reviewCount: 93
  },
  energy: {
    id: "cbd-energy-capsules",
    name: "CBD Energy Capsules",
    description: "Our innovative Energy Capsules combine CBD with B vitamins, adaptogens and natural caffeine for sustained energy without the crash or jitters.",
    price: 54.99,
    image: "/images/logos/1.png",
    benefits: ["Sustained energy", "No jitters", "Mental clarity", "Stress management"],
    rating: 4.8,
    reviewCount: 106
  },
  "pet-anxiety": {
    id: "pet-calming-treats",
    name: "Pet Calming Treats",
    description: "These delicious CBD-infused treats help pets stay calm during stressful situations like thunderstorms, fireworks, travel or separation anxiety.",
    price: 39.99,
    image: "/images/logos/1.png",
    benefits: ["Stress reduction", "Easy to administer", "No sedation", "Tasty formula"],
    rating: 4.9,
    reviewCount: 145
  },
  "pet-mobility": {
    id: "pet-joint-chews",
    name: "Pet Joint & Mobility Chews",
    description: "Support your aging pet's mobility with these CBD-infused soft chews containing glucosamine, chondroitin and MSM for comprehensive joint support.",
    price: 44.99,
    image: "/images/logos/1.png",
    benefits: ["Joint comfort", "Improved mobility", "Senior pet support", "Soft texture"],
    rating: 4.8,
    reviewCount: 128
  },
  "pet-wellness": {
    id: "pet-wellness-oil",
    name: "Pet Wellness CBD Oil",
    description: "Our premium pet wellness oil delivers the perfect daily dose of CBD to support your pet's overall health, from skin and coat to digestive comfort.",
    price: 54.99,
    discountPrice: 49.99,
    image: "/images/logos/1.png",
    benefits: ["Overall wellness", "Skin & coat health", "Digestive support", "All ages"],
    rating: 4.7,
    reviewCount: 116
  },
  "pet-digestion": {
    id: "pet-digest-support",
    name: "Pet Digestive Support Drops",
    description: "Our specialized CBD digestive formula helps maintain your pet's digestive health with a gentle blend of CBD, prebiotics, and digestive enzymes for optimal gut function.",
    price: 49.99,
    image: "/images/logos/1.png",
    benefits: ["Soothes digestive discomfort", "Promotes healthy digestion", "Supports microbiome", "Easy to administer"],
    rating: 4.7,
    reviewCount: 84
  }
}

// Organize conditions by category
const categoryConditions = {
  health: [
    "anxiety",
    "mood", 
    "sleep",
    "digestive",
    "pain"
  ],
  sport: [
    "pain", 
    "focus",
    "recovery",
    "performance",
    "energy"
  ],
  beauty: [
    "skin",
    "anti-aging",
    "hair-scalp",
    "immunity",
    "mood"
  ],
  hybrid: [
    "focus",
    "mood",
    "immunity",
    "energy",
    "sleep"
  ],
  pet: [
    "pet",
    "pet-anxiety",
    "pet-mobility",
    "pet-wellness",
    "pet-digestion"
  ]
}

// Map categories to display names and icons
const categoryInfo = {
  health: {
    name: "Health",
    icon: <Heart className="h-4 w-4" />,
    color: "green"
  },
  sport: {
    name: "Sport",
    icon: <Activity className="h-4 w-4" />,
    color: "blue"
  },
  beauty: {
    name: "Beauty",
    icon: <Sparkles className="h-4 w-4" />,
    color: "purple"
  },
  hybrid: {
    name: "Hybrid",
    icon: <DropletIcon className="h-4 w-4" />,
    color: "amber"
  },
  pet: {
    name: "Pet",
    icon: <PawPrint className="h-4 w-4" />,
    color: "orange"
  }
}

// Update the getCategoryStyle function with border-based styling
function getCategoryStyle(category: string) {
  switch (category) {
    case 'health':
      return 'border-2 border-green-500 text-green-600 hover:bg-green-50 data-[state=active]:bg-green-500 data-[state=active]:text-white';
    case 'sport':
      return 'border-2 border-blue-500 text-blue-600 hover:bg-blue-50 data-[state=active]:bg-blue-500 data-[state=active]:text-white';
    case 'beauty':
      return 'border-2 border-purple-500 text-purple-600 hover:bg-purple-50 data-[state=active]:bg-purple-500 data-[state=active]:text-white';
    case 'hybrid':
      return 'border-2 border-amber-600 text-amber-600 hover:bg-amber-50 data-[state=active]:bg-amber-600 data-[state=active]:text-white';
    case 'pet':
      return 'border-2 border-orange-500 text-orange-600 hover:bg-orange-50 data-[state=active]:bg-orange-500 data-[state=active]:text-white';
    default:
      return 'border-2 border-green-500 text-green-600 hover:bg-green-50 data-[state=active]:bg-green-500 data-[state=active]:text-white';
  }
}

// Example article data
const articleData = [
  {
    title: "The Science of CBD and Anxiety",
    excerpt: "Discover how CBD interacts with your body's endocannabinoid system to help manage stress and anxiety.",
    image: "/images/logos/1.png",
    category: "wellness",
    url: "/blog/cbd-and-anxiety",
    date: "June 12, 2023"
  },
  {
    title: "CBD for Athletes: Recovery Benefits",
    excerpt: "Learn how CBD can help speed recovery, reduce inflammation, and improve performance for active individuals.",
    image: "/images/logos/1.png",
    category: "sport",
    url: "/blog/cbd-for-athletes",
    date: "May 28, 2023"
  },
  {
    title: "CBD in Skincare: Anti-Aging Properties",
    excerpt: "Explore the science behind CBD's potential to reduce signs of aging and improve skin health.",
    image: "/images/logos/1.png",
    category: "beauty",
    url: "/blog/cbd-skincare-benefits",
    date: "April 15, 2023"
  },
  {
    title: "CBD and Sleep: Natural Solutions",
    excerpt: "Find out how CBD may help improve sleep quality without the side effects of traditional sleep aids.",
    image: "/images/logos/1.png",
    category: "wellness",
    url: "/blog/cbd-sleep-solutions",
    date: "March 22, 2023"
  },
  {
    title: "CBD for Pets: What You Need to Know",
    excerpt: "Learn how CBD may benefit your furry friends and the proper dosing for different animals.",
    image: "/images/logos/1.png",
    category: "pet",
    url: "/blog/cbd-for-pets-guide",
    date: "February 10, 2023"
  }
];

// Define types for animation variants and carousel
interface AnimationVariants {
  hidden: object;
  visible: object;
}

interface AnimationConfig {
  getVariants: (variants: AnimationVariants) => AnimationVariants;
}

// Define carousel API type based on embla-carousel
interface CarouselApi {
  scrollNext: () => void;
  scrollPrev: () => void;
  scrollTo: (index: number) => void;
  canScrollNext: () => boolean;
  canScrollPrev: () => boolean;
}

export function CBDBenefits() {
  const [activeCategory, setActiveCategory] = useState<string>("wellness")
  const [selectedBenefit, setSelectedBenefit] = useState<{category: string, benefit: string, index: number} | null>(null)
  const [showDrTwistly, setShowDrTwistly] = useState<boolean>(false)
  const animConfig = useAnimationConfig ? useAnimationConfig() : { getVariants: (v: AnimationVariants) => v };
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi | null>(null);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  }

  // Get current category data
  const currentCategory = categories.find(cat => cat.id === activeCategory) || categories[0]
  
  // Function to get a relevant condition for a benefit
  const getRelevantCondition = (categoryId: string, benefitText: string) => {
    // Find conditions that match this category
    const relevantConditionIds = categoryConditions[categoryId as keyof typeof categoryConditions] || [];
    const conditions = relevantConditionIds.map(id => cbdConditions.find(c => c.id === id)).filter(Boolean);
    
    // Simple keyword matching to find most relevant condition
    const keywords = benefitText.toLowerCase().split(' ');
    
    let bestMatch = conditions[0];
    let bestScore = 0;
    
    conditions.forEach(condition => {
      if (!condition) return;
      
      let score = 0;
      // Check title
      keywords.forEach(word => {
        if (condition.title.toLowerCase().includes(word)) score += 2;
        if (condition.shortDesc.toLowerCase().includes(word)) score += 1;
        // Check pillars for matches
        condition.pillars.forEach(pillar => {
          if (pillar.toLowerCase().includes(word)) score += 1;
        });
      });
      
      if (score > bestScore) {
        bestScore = score;
        bestMatch = condition;
      }
    });
    
    return bestMatch;
  };

  // Filter articles by category
  const filteredArticles = articleData.filter(article => 
    activeCategory === "wellness" ? true : article.category === activeCategory
  );

  // Next/prev slide for the carousel
  const scrollNext = React.useCallback(() => {
    if (carouselApi) {
      carouselApi.scrollNext();
    }
  }, [carouselApi]);

  const scrollPrev = React.useCallback(() => {
    if (carouselApi) {
      carouselApi.scrollPrev();
    }
  }, [carouselApi]);

  return (
    <section className="w-full py-8 md:py-10 lg:py-12 bg-gradient-to-b from-emerald-50 to-white">
      {/* Background decoration - simplified for mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full opacity-30 blur-3xl bg-emerald-500/40"></div>
        <div className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full opacity-30 blur-3xl bg-emerald-500/30"></div>
      </div>
      
      {/* Main container - responsive approach */}
      <Container className="relative z-10 bg-white backdrop-blur-sm rounded-xl shadow-md border border-green-200/90 p-4 sm:p-5 lg:p-6 w-full mx-auto max-w-none">
        {/* Header with nested container design */}
        <div className="mb-4 sm:mb-5">
          {/* Nested container for the section header - matching category styling */}
          <div className="bg-gradient-to-b from-green-50/80 to-white p-3 sm:p-4 rounded-xl border border-green-100/80 shadow-sm relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20 blur-2xl bg-green-200/30"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full opacity-20 blur-2xl bg-emerald-100/30"></div>
            </div>
            
            {/* Dr. Twistly button - positioned in the top right corner */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowDrTwistly(true)}
                className="bg-white/90 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 shadow-sm flex items-center gap-1.5 px-3 py-1.5 h-auto text-xs sm:text-sm font-medium rounded-full"
              >
                <div className="h-5 w-5 rounded-full overflow-hidden relative">
                  <Image
                    src="/images/logos/1.png"
                    alt="Dr. Twistly"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="hidden sm:inline">Ask Dr. Twistly</span>
                <span className="sm:hidden">Dr. Twistly</span>
                <MessageSquare className="h-3 w-3 ml-0.5" />
              </Button>
            </div>
            
            <div className="text-center relative z-10">
              {/* Spinning logo with improved styling - INCREASED SIZE */}
              <div className="flex justify-center mb-2">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full relative bg-transparent transition-all duration-500 shadow-[0_10px_20px_rgba(var(--emerald-rgb)/0.15),_inset_0_0_0_1px_rgba(var(--emerald-rgb)/0.2)] p-0.5">
                  <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden bg-transparent after:absolute after:inset-0 after:rounded-full after:shadow-inner">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ 
                        duration: 20, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }}
                      className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center relative z-10"
                    >
                      <Image 
                        src="/images/logos/1.png" 
                        alt="Twistly CBD logo" 
                        width={36} 
                        height={36} 
                        className="drop-shadow-md" 
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
              
              <div className="relative z-10 px-4 py-3 inline-block rounded-lg bg-white/80 backdrop-blur-sm shadow-sm border border-gray-100/50 mb-3">
                <div className="inline-flex bg-gradient-to-br from-green-50/80 to-white rounded-full border border-green-200/40 shadow-sm p-1 mb-1.5">
                  <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1.5 text-xs font-medium">
                    <Sparkles className="h-3 w-3" />
                    <span>Natural Wellness</span>
                  </div>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 drop-shadow-sm">
                  Experience Natural Wellness
                </h2>
                <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mt-1">
                  Discover how our premium CBD products can enhance your daily wellness
                </p>
              </div>
              
              {/* Category tabs with added Dr Twistly button */}
              <div className="flex flex-col items-center gap-2">
                <Tabs 
                  defaultValue={activeCategory} 
                  onValueChange={setActiveCategory}
                  className="w-full max-w-xl mx-auto"
                >
                  <div className="flex justify-center">
                    <TabsList className="bg-white/80 backdrop-blur-sm border border-gray-100 p-1.5 rounded-lg shadow-sm mx-auto">
                      {categories.map((category) => (
                        <TabsTrigger 
                          key={category.id}
                          value={category.id}
                          className={`px-3 sm:px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-1.5
                            ${activeCategory === category.id 
                              ? `bg-${category.color}-500 text-white shadow-sm` 
                              : `text-gray-700 hover:bg-gray-50 hover:text-${category.color}-600`
                            }`}
                        >
                          {React.cloneElement(category.icon as React.ReactElement, { 
                            className: `h-4 w-4 ${activeCategory === category.id ? 'text-white' : `text-${category.color}-500`}`
                          })}
                          <span className="hidden sm:inline">{category.name}</span>
                          <span className="sm:hidden">{category.name.split('')[0]}</span>
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content container */}
        <div className="bg-gray-50/60 rounded-lg border-2 border-gray-100 p-2 sm:p-3 overflow-hidden mt-3 shadow-lg relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-gray-50/30 to-gray-100/30 z-[-1]"></div>
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h3 
              className="text-center text-sm sm:text-base font-medium text-gray-800 mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Explore <span className={`text-${currentCategory.color}-600 font-semibold`}>{currentCategory.name}</span> CBD Benefits
            </motion.h3>
          </motion.div>
        
          {/* Replace grid with carousel */}
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="py-1 px-1">
              {currentCategory.benefits.slice(0, 10).map((benefit, index) => (
                <CarouselItem key={index} className="basis-1/2 sm:basis-1/3 lg:basis-1/5 xl:basis-1/6">
                  <Dialog>
                    <DialogTrigger asChild>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className={cn(
                          "relative group overflow-hidden rounded-lg border-2 shadow-md cursor-pointer h-full",
                          "hover:shadow-xl transition-all duration-300 hover:-translate-y-1",
                          `border-${currentCategory.color}-200 hover:border-${currentCategory.color}-400 bg-gradient-to-b from-white to-${currentCategory.color}-50/20`
                        )}
                        onClick={() => setSelectedBenefit({category: currentCategory.id, benefit, index})}
                      >
                        {/* Decorative elements */}
                        <div className={cn(
                          "absolute top-0 right-0 w-20 h-20 -mr-10 -mt-10 rounded-full opacity-10 transition-opacity duration-300 group-hover:opacity-20",
                          `bg-${currentCategory.color}-500`
                        )}/>
                        
                        <div className="p-2 sm:p-3 flex flex-col h-full relative z-10">
                          <div className="flex flex-col items-center text-center">
                            <div className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mb-2 transition-all duration-200 shadow-sm",
                              `bg-${currentCategory.color}-100 group-hover:bg-${currentCategory.color}-500 group-hover:shadow-lg group-hover:shadow-${currentCategory.color}-100/50`
                            )}>
                              <Check className={cn(
                                "w-4 h-4 transition-colors duration-200",
                                `text-${currentCategory.color}-600 group-hover:text-white`
                              )} />
                            </div>
                            
                            <h3 className="text-xs sm:text-sm font-medium leading-tight text-gray-800 mb-1 group-hover:text-gray-900 transition-colors">{benefit}</h3>
                          </div>
                          
                          <div className="mt-auto flex items-center justify-center">
                            <div className={cn(
                              "flex items-center text-xs font-medium transition-all duration-200 gap-1",
                              `text-${currentCategory.color}-600 group-hover:text-${currentCategory.color}-700`
                            )}>
                              Learn more <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </DialogTrigger>
                    
                    <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-900 dark:border-gray-700">
                      {(() => {
                        const condition = getRelevantCondition(currentCategory.id, benefit);
                        if (!condition) return (
                          <>
                            <DialogHeader>
                              <DialogTitle className="text-xl">CBD Benefit</DialogTitle>
                              <DialogDescription className="text-base mt-2 dark:text-gray-300">
                                {benefit}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
                              <p className="text-gray-600 dark:text-gray-400">Loading benefit details...</p>
                            </div>
                          </>
                        );
                        
                        return (
                          <>
                            <DialogHeader>
                              <div className="flex items-center gap-3">
                                <BenefitIcon 
                                  icon={condition.icon} 
                                  color={currentCategory.color} 
                                />
                                <DialogTitle className="text-xl">{condition.title}</DialogTitle>
                              </div>
                              <DialogDescription className="text-base mt-2 dark:text-gray-300">
                                {benefit}
                              </DialogDescription>
                            </DialogHeader>
                            
                            <div className="mt-4 space-y-5">
                              <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">How CBD Helps:</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{condition.content}</p>
                              </div>
                              
                              <div>
                                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Key Benefits:</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {condition.pillars.map((pillar, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                      <div className={cn(
                                        "rounded-full p-1",
                                        `bg-${currentCategory.color}-100 dark:bg-${currentCategory.color}-900/30`
                                      )}>
                                        <CheckCircle2 className={cn(
                                          "h-3.5 w-3.5",
                                          `text-${currentCategory.color}-500 dark:text-${currentCategory.color}-400`
                                        )} />
                                      </div>
                                      <span className="text-sm text-gray-600 dark:text-gray-400">{pillar}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              {conditionProducts[condition.id] && (
                                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">Recommended Product:</h4>
                                  <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                                    <div className="relative w-16 h-16 bg-white dark:bg-gray-700 rounded-md p-1 shadow-sm">
                                      <Image
                                        src={conditionProducts[condition.id].image}
                                        alt={conditionProducts[condition.id].name}
                                        fill
                                        className="object-contain p-1"
                                        sizes="(max-width: 768px) 64px, 64px"
                                        loading="lazy"
                                      />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <h5 className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">
                                        {conditionProducts[condition.id].name}
                                      </h5>
                                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                                        {conditionProducts[condition.id].benefits[0]}
                                      </p>
                                      <div className="flex items-center gap-2 mt-1">
                                        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                          ${conditionProducts[condition.id].price.toFixed(2)}
                                        </span>
                                        <div className="flex">
                                          {[...Array(5)].map((_, i) => (
                                            <Star 
                                              key={i} 
                                              className={cn(
                                                "h-3 w-3",
                                                i < Math.floor(conditionProducts[condition.id].rating)
                                                  ? "text-yellow-400 fill-yellow-400"
                                                  : "text-gray-200 fill-gray-200 dark:text-gray-600 dark:fill-gray-600"
                                              )}
                                            />
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            <DialogFooter className="mt-4">
                              <Button asChild className={cn(
                                "w-full text-white",
                                `bg-${currentCategory.color}-600 hover:bg-${currentCategory.color}-700`
                              )}>
                                <Link href={`/shop/${condition.id}`}>
                                  <ShoppingCart className="h-4 w-4 mr-2" />
                                  Shop {condition.title} Products
                                </Link>
                              </Button>
                            </DialogFooter>
                          </>
                        );
                      })()}
                    </DialogContent>
                  </Dialog>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-center mt-2">
              <div className="flex items-center gap-1">
                <CarouselPrevious className="static h-8 w-8 rounded-full border border-gray-200 transform-none translate-y-0" />
                <CarouselNext className="static h-8 w-8 rounded-full border border-gray-200 transform-none translate-y-0" />
              </div>
            </div>
          </Carousel>
        </div>
        
        {/* Article Carousel Section - Make smaller */}
        <div className="mt-3 bg-gray-50/60 rounded-lg border-2 border-gray-100 p-2 overflow-hidden shadow-lg relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-gray-50/30 to-gray-100/30 z-[-1]"></div>
          
          <div className="p-1 bg-white/70 rounded-lg border border-gray-100/80 shadow-sm">
            <div className="flex items-center justify-between mb-2 px-2">
              <h3 className="text-xs sm:text-sm font-medium text-gray-800 flex items-center">
                <ScrollText className={`h-3.5 w-3.5 mr-1 text-${currentCategory.color}-500`} />
                <span>Related Articles</span>
              </h3>
              
              <div className="flex items-center gap-1">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-6 w-6 rounded-full border border-gray-200" 
                  onClick={scrollPrev}
                >
                  <ChevronLeft className="h-3 w-3" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-6 w-6 rounded-full border border-gray-200" 
                  onClick={scrollNext}
                >
                  <ChevronRight className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            <Carousel 
              setApi={setCarouselApi}
              className="w-full"
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent className="py-1">
                {filteredArticles.map((article, index) => (
                  <CarouselItem key={`article-${index}`} className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                    <Link href={article.url} className="block h-full">
                      <div className={cn(
                        "rounded-lg overflow-hidden bg-white border shadow-sm h-full flex flex-col transform transition-all duration-300 hover:shadow-md hover:-translate-y-1",
                        `border-${currentCategory.color}-200/50 hover:border-${currentCategory.color}-300`
                      )}>
                        <div className={cn(
                          "relative bg-gradient-to-br",
                          `from-${currentCategory.color}-50 to-white`
                        )}>
                          <AspectRatio ratio={5/3} className="w-full">
                            <Image
                              src={article.image}
                              alt={article.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                              loading="lazy"
                              quality={80}
                            />
                            <div className="absolute top-1 right-1">
                              <Badge className={cn(
                                "bg-white text-[9px] px-1.5 py-0.5",
                                `text-${currentCategory.color}-600 border-${currentCategory.color}-200`
                              )}>
                                {article.category === "wellness" ? "Health" : 
                                 article.category === "sport" ? "Sport" :
                                 article.category === "beauty" ? "Beauty" :
                                 article.category === "pet" ? "Pet" : "Hybrid"}
                              </Badge>
                            </div>
                          </AspectRatio>
                        </div>
                        
                        <div className="p-2 flex flex-col flex-1">
                          <h4 className="text-xs font-medium text-gray-900 mb-0.5 line-clamp-1">{article.title}</h4>
                          <p className="text-[10px] text-gray-600 line-clamp-1 flex-1">{article.excerpt}</p>
                          <div className="mt-1 flex items-center justify-between">
                            <span className="text-[8px] text-gray-500">{article.date}</span>
                            <span className={cn(
                              "text-[10px] font-medium flex items-center",
                              `text-${currentCategory.color}-600`
                            )}>
                              Read <ArrowRight className="h-2 w-2 ml-0.5" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
        
        {/* Dr Twistly Dialog */}
        <Dialog open={showDrTwistly} onOpenChange={setShowDrTwistly}>
          <DialogContent className="sm:max-w-[600px] p-0 gap-0 bg-white dark:bg-gray-900 dark:border-gray-700">
            <div className="bg-gradient-to-br from-emerald-50 to-white p-4 rounded-t-lg border-b border-emerald-100">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 relative rounded-full overflow-hidden border-2 border-emerald-200 shadow-sm">
                  <Image 
                    src="/images/logos/1.png" 
                    alt="Dr. Twistly" 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-emerald-800 text-lg">Dr. Twistly</h3>
                  <p className="text-xs text-gray-600">Your CBD Wellness Consultant</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 max-h-[70vh] overflow-y-auto">
              <MiniDrTwistly initialContext={`The user is viewing information about CBD benefits related to the ${currentCategory.name} category. They might have questions about specific benefits like ${currentCategory.benefits.slice(0, 3).join(', ')}, etc.`} />
            </div>
          </DialogContent>
        </Dialog>
      </Container>
    </section>
  )
}