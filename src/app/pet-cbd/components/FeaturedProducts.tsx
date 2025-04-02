'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { InfiniteSlider } from '@/components/ui/infinite-slider'

interface FeaturedProductsProps {
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

// Pet CBD products
const petProducts = [
  {
    id: "dog-cbd-oil",
    name: "Calming CBD Oil for Dogs",
    strength: "300mg CBD",
    image: "/images/tincture2.png",
    price: "$44.99",
    rating: 4.9,
    reviews: 145,
    description: "Soothing formula to reduce anxiety and promote relaxation in dogs",
    benefits: ["Reduces anxiety", "Calms hyperactivity", "Eases noise phobias"],
    badgeColor: "bg-amber-600",
    featured: true
  },
  {
    id: "joint-treats",
    name: "Joint Support CBD Treats",
    strength: "5mg CBD/treat",
    image: "/images/tincture2.png",
    price: "$34.99",
    rating: 4.8,
    reviews: 117,
    description: "Delicious treats formulated for aging pets with joint discomfort",
    benefits: ["Supports mobility", "Eases joint pain", "Improves quality of life"],
    badgeColor: "bg-amber-600",
    featured: true
  },
  {
    id: "multi-pet-spray",
    name: "Multi-Pet CBD Spray",
    strength: "200mg CBD",
    image: "/images/tincture2.png",
    price: "$39.99",
    rating: 4.7,
    reviews: 98,
    description: "Easy-to-use spray for cats, dogs and other small pets",
    benefits: ["Versatile formula", "Easy application", "Fast absorption"],
    badgeColor: "bg-amber-700",
    featured: true
  },
  {
    id: "cat-drops",
    name: "Feline Comfort CBD Drops",
    strength: "150mg CBD",
    image: "/images/tincture2.png",
    price: "$32.99",
    rating: 4.6,
    reviews: 84,
    description: "Specially formulated for cats with a mild flavor they love",
    benefits: ["Cat-specific", "Stress reduction", "Supports older cats"],
    badgeColor: "bg-amber-500",
    featured: true
  },
  {
    id: "senior-pet",
    name: "Senior Pet Wellness CBD",
    strength: "500mg CBD",
    image: "/images/tincture2.png",
    price: "$54.99",
    rating: 4.8,
    reviews: 103,
    description: "Higher strength formula for aging pets with multiple needs",
    benefits: ["Comprehensive care", "Anti-inflammatory", "Supports vitality"],
    badgeColor: "bg-amber-800",
    featured: false
  }
]

export function FeaturedProducts({ pageTheme }: FeaturedProductsProps) {
  return (
    <section className="py-6 relative overflow-hidden bg-gradient-to-b from-amber-50 to-white" id="featured-products">
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
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                <span>Featured Products</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3 mb-2">Premium Pet CBD Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-4 text-sm">
              Specially formulated CBD for your pets' health and happiness
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-amber-50/70 to-white rounded-xl border border-amber-200/40 shadow-sm p-3 mb-4 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {petProducts.filter(product => product.featured).map((product) => (
                <Link href={`/shop/${product.id}`} key={product.id} className="group">
                  <Card className={`h-full border ${pageTheme.colors.border} ${pageTheme.colors.borderHover} overflow-hidden bg-white transition-all duration-200 hover:shadow-md`}>
                    <div className="relative pt-[70%] bg-gradient-to-b from-amber-50 to-white">
                      <div className="absolute inset-0 p-4 transition-transform duration-300 group-hover:scale-103">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <Badge className="absolute top-2 right-2 bg-amber-600 hover:bg-amber-700 text-white text-xs">
                        {product.strength}
                      </Badge>
                    </div>
                    
                    <CardContent className="p-2.5">
                      <div className="flex justify-between items-start gap-1 mb-1">
                        <h3 className="font-medium text-gray-900 group-hover:text-amber-700 transition-colors text-sm line-clamp-1">
                          {product.name}
                        </h3>
                        <span className="font-bold text-amber-700 text-sm whitespace-nowrap">{product.price}</span>
                      </div>
                      
                      <p className="text-xs text-gray-500 mb-1.5 line-clamp-1">{product.description}</p>
                      
                      <div className="flex gap-1.5 mb-1.5 flex-wrap">
                        {product.benefits.slice(0, 2).map((benefit, i) => (
                          <Badge key={i} variant="outline" className="bg-amber-50 text-amber-700 text-xs border-amber-100 px-1.5 py-0 rounded-full">
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
                        <Button variant="ghost" size="sm" className="text-amber-700 hover:text-amber-800 hover:bg-amber-50 h-7 w-7 p-0">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Product Carousel */}
          <div className="mt-3 pt-3 border-t border-amber-100">
            <div className="bg-gradient-to-br from-amber-50/70 to-white rounded-xl border border-amber-200/40 shadow-sm p-3 overflow-hidden">
              <InfiniteSlider gap={8} className="w-full py-1">
                {petProducts.map((product, index) => (
                  <motion.div 
                    key={`slider-${index}`} 
                    className="relative group w-[140px]"
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  >
                    <AspectRatio ratio={1} className="bg-white rounded-lg border border-amber-100 shadow-sm">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-2 scale-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-amber-900/60 via-amber-800/20 to-transparent rounded-lg opacity-80 transition-opacity duration-300" />
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
            </div>
            
            <div className="flex justify-center mt-3.5">
              <Button
                variant="outline"
                size="sm"
                className="border-amber-200 text-amber-700 hover:bg-amber-50"
                asChild
              >
                <Link href="/shop/category/pet">
                  View All Pet Products
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
} 