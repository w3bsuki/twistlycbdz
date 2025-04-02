'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { Container } from '@/components/ui/container'
import { Star, Check, ArrowRight } from 'lucide-react'

// Define Theme interface
interface PageTheme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    border: string;
    borderHover: string;
    background: string;
  };
  gradients: {
    section: string;
    button: string;
  };
}

interface FeaturedProductsProps {
  pageTheme: PageTheme;
}

// Static data for beauty products
const beautyProducts = [
  {
    id: "face-serum",
    name: "CBD Face Serum",
    strength: "500mg CBD",
    image: "/images/tincture2.png",
    price: "$59.99",
    rating: 4.9,
    reviews: 104,
    description: "Anti-aging face serum with CBD and hyaluronic acid",
    benefits: ["Anti-aging", "Hydration", "Radiance"],
    featured: true
  },
  {
    id: "facial-cream",
    name: "CBD Facial Cream",
    strength: "300mg CBD",
    image: "/images/tincture2.png",
    price: "$49.99",
    rating: 4.8,
    reviews: 87,
    description: "Nourishing facial cream with CBD and botanical extracts",
    benefits: ["Nourishing", "Calming", "Even tone"],
    featured: true
  },
  {
    id: "body-lotion",
    name: "CBD Body Lotion",
    strength: "750mg CBD",
    image: "/images/tincture2.png",
    price: "$44.99",
    rating: 4.7,
    reviews: 76,
    description: "Full-body moisturizing lotion with CBD and essential oils",
    benefits: ["Full-body", "Moisturizing", "Soothing"],
    featured: true
  },
  {
    id: "lip-balm",
    name: "CBD Lip Balm",
    strength: "50mg CBD",
    image: "/images/tincture2.png",
    price: "$12.99",
    rating: 4.6,
    reviews: 112,
    description: "Hydrating lip balm with CBD and vitamin E",
    benefits: ["Hydrating", "Protective", "Healing"],
    featured: true
  },
  {
    id: "bath-bombs",
    name: "CBD Bath Bombs",
    strength: "100mg CBD/bomb",
    image: "/images/tincture2.png",
    price: "$24.99",
    rating: 4.8,
    reviews: 65,
    description: "Relaxing bath bombs with CBD and lavender",
    benefits: ["Relaxing", "Skin softening", "Aromatherapy"],
    featured: false
  }
]

export function FeaturedProducts({ pageTheme }: FeaturedProductsProps) {
  const primaryColor = pageTheme.colors.primary || 'pink-600'
  const primaryColorName = primaryColor.split('-')[0]
  const primaryLight = `${primaryColorName}-50`
  const primaryLighter = `${primaryColorName}-100`
  const primaryLightest = `${primaryColorName}-200`
  const primaryMedium = `${primaryColorName}-500`
  const primaryDark = `${primaryColorName}-700`

  const sectionBg = `bg-gradient-to-b from-${primaryLight} to-white`
  const borderLight = `border-${primaryLightest}`
  const borderMedium = `border-${primaryMedium}`
  const borderLighter = `border-${primaryLighter}`
  const buttonGradient = pageTheme.gradients.button
  const textPrimaryMedium = `text-${primaryMedium}`
  const textPrimaryDark = `text-${primaryDark}`
  const bgPrimaryLight = `bg-${primaryLight}`
  const bgPrimaryLighter = `bg-${primaryLighter}`
  const bgPrimary = `bg-${primaryColor}`
  const hoverBgPrimary = `hover:bg-${primaryDark}`
  const hoverTextPrimary = `hover:${textPrimaryDark}`

  return (
    <section className={`py-6 relative overflow-hidden ${sectionBg}`} id="featured-products">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-40 right-10 w-60 h-60 bg-${primaryLighter} rounded-full opacity-20 blur-3xl`}></div>
        <div className={`absolute bottom-20 left-10 w-60 h-60 bg-${primaryColorName}-50 rounded-full opacity-20 blur-3xl`}></div>
      </div>
      
      <Container className="relative z-10">
        <div className={`bg-white/80 backdrop-blur-sm ${borderLight} rounded-xl shadow-md p-4 overflow-hidden`}>
          <div className="text-center mb-4">
            <div className={`inline-flex bg-gradient-to-br from-${primaryLight}/80 to-white rounded-full border ${borderLight}/40 shadow-sm p-1`}>
              <div className={`${buttonGradient} text-white px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5 font-medium`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                <span>Featured Products</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3 mb-2">Explore Our CBD Beauty Line</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-4 text-sm">
              High-quality CBD skincare and cosmetics for your daily beauty ritual.
            </p>
          </div>
          
          <div className={`bg-gradient-to-br from-${primaryLight}/70 to-white rounded-xl border ${borderLight}/40 shadow-sm p-3 mb-4 overflow-hidden`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {beautyProducts.filter(product => product.featured).map((product) => (
                <Link href={`/shop/${product.id}`} key={product.id} className="group">
                  <Card className={`h-full ${borderLight} ${pageTheme.colors.borderHover || 'hover:border-pink-300'} overflow-hidden bg-white transition-all duration-200 hover:shadow-md`}>
                    <div className={`relative pt-[70%] bg-gradient-to-b from-${primaryLight} to-white`}>
                      <div className="absolute inset-0 p-4 transition-transform duration-300 group-hover:scale-103">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <Badge className={`absolute top-2 right-2 ${bgPrimary} ${hoverBgPrimary} text-white text-xs`}>
                        {product.strength}
                      </Badge>
                    </div>
                    
                    <CardContent className="p-2.5">
                      <div className="flex justify-between items-start gap-1 mb-1">
                        <h3 className={`font-medium text-gray-900 group-hover:${textPrimaryDark} transition-colors text-sm line-clamp-1`}>
                          {product.name}
                        </h3>
                        <span className={`font-bold ${textPrimaryDark} text-sm whitespace-nowrap`}>{product.price}</span>
                      </div>
                      
                      <p className="text-xs text-gray-500 mb-1.5 line-clamp-1">{product.description}</p>
                      
                      <div className="flex gap-1.5 mb-1.5 flex-wrap">
                        {product.benefits.slice(0, 2).map((benefit, i) => (
                          <Badge key={i} variant="outline" className={`${bgPrimaryLight} ${textPrimaryDark} text-xs ${borderLighter} px-1.5 py-0 rounded-full`}>
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center pt-1 border-t border-gray-100">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={i < Math.floor(product.rating) ? "h-3 w-3 text-yellow-400 fill-yellow-400" : "h-3 w-3 text-gray-200 fill-gray-200"}
                            />
                          ))}
                          <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                        </div>
                        <Button variant="ghost" size="sm" className={`${textPrimaryDark} ${hoverTextPrimary} hover:${bgPrimaryLight} h-7 w-7 p-0`}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          <div className={`mt-3 pt-3 border-t ${borderLighter}`}>
            <div className={`bg-gradient-to-br from-${primaryLight}/70 to-white rounded-xl border ${borderLight}/40 shadow-sm p-3 overflow-hidden`}>
              <InfiniteSlider gap={8} className="w-full py-1">
                {beautyProducts.map((product, index) => (
                  <motion.div 
                    key={`slider-${index}`} 
                    className="relative group w-[140px]"
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  >
                    <AspectRatio ratio={1} className={`bg-white rounded-lg border ${borderLighter} shadow-sm`}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-2 scale-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent rounded-lg opacity-80 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-1.5 text-left">
                        <p className="text-white text-[10px] font-medium leading-tight">{product.name}</p>
                        <Badge variant="outline" className="mt-0.5 text-[7px] bg-white/10 text-white border-white/20 p-0 h-3">
                          {product.strength}
                        </Badge>
                      </div>
                    </AspectRatio>
                  </motion.div>
                ))}
              </InfiniteSlider>
              
              <div className="flex justify-center mt-3">
                <div className={`bg-gradient-to-br from-${primaryLight}/80 to-white rounded-full border ${borderLight}/40 shadow-sm p-1 px-2 inline-block`}>
                  <Button variant="outline" className={`${borderLight} ${textPrimaryDark} hover:${bgPrimaryLight} rounded-full h-7 text-xs px-2.5`} asChild>
                    <Link href="/shop/category/beauty">
                      <span className="flex items-center">
                        View All Beauty Products
                        <ArrowRight className="ml-1.5 h-3 w-3" />
                      </span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
} 