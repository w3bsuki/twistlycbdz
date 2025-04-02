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
import { healthProducts } from '../data/products'

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

export function FeaturedProducts({ pageTheme }: FeaturedProductsProps) {
  return (
    <section className="py-6 relative overflow-hidden bg-gradient-to-b from-green-50 to-white" id="featured-products">
      {/* Simple background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-10 w-60 h-60 bg-green-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-60 h-60 bg-emerald-50 rounded-full opacity-20 blur-3xl"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-xl shadow-md p-4 overflow-hidden">
          <div className="text-center mb-4">
            <div className="inline-flex bg-gradient-to-br from-green-50/80 to-white rounded-full border border-green-200/40 shadow-sm p-1">
              <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                <span>Featured Products</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3 mb-2">Wellness CBD Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-4 text-sm">
              Our health collection features CBD formulations designed specifically for wellness and natural health support.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50/70 to-white rounded-xl border border-green-200/40 shadow-sm p-3 mb-4 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {healthProducts.filter(product => product.featured).map((product) => (
                <Link href={`/shop/${product.id}`} key={product.id} className="group">
                  <Card className={`h-full border ${pageTheme.colors.border} ${pageTheme.colors.borderHover} overflow-hidden bg-white transition-all duration-200 hover:shadow-md`}>
                    <div className="relative pt-[70%] bg-gradient-to-b from-green-50 to-white">
                      <div className="absolute inset-0 p-4 transition-transform duration-300 group-hover:scale-103">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <Badge className="absolute top-2 right-2 bg-green-600 hover:bg-green-700 text-white text-xs">
                        {product.strength}
                      </Badge>
                    </div>
                    
                    <CardContent className="p-2.5">
                      <div className="flex justify-between items-start gap-1 mb-1">
                        <h3 className="font-medium text-gray-900 group-hover:text-green-700 transition-colors text-sm line-clamp-1">
                          {product.name}
                        </h3>
                        <span className="font-bold text-green-700 text-sm whitespace-nowrap">{product.price}</span>
                      </div>
                      
                      <p className="text-xs text-gray-500 mb-1.5 line-clamp-1">{product.description}</p>
                      
                      <div className="flex gap-1.5 mb-1.5 flex-wrap">
                        {product.benefits.slice(0, 2).map((benefit, i) => (
                          <Badge key={i} variant="outline" className="bg-green-50 text-green-700 text-xs border-green-100 px-1.5 py-0 rounded-full">
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
                        <Button variant="ghost" size="sm" className="text-green-700 hover:text-green-800 hover:bg-green-50 h-7 w-7 p-0">
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
          <div className="mt-3 pt-3 border-t border-green-100">
            <div className="bg-gradient-to-br from-green-50/70 to-white rounded-xl border border-green-200/40 shadow-sm p-3 overflow-hidden">
              <InfiniteSlider gap={8} className="w-full py-1">
                {healthProducts.map((product, index) => (
                  <motion.div 
                    key={`slider-${index}`} 
                    className="relative group w-[140px]"
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  >
                    <AspectRatio ratio={1} className="bg-white rounded-lg border border-green-100 shadow-sm">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-2 scale-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 via-green-800/20 to-transparent rounded-lg opacity-80 transition-opacity duration-300" />
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
          </div>
          
          {/* View All Products Button */}
          <div className="flex justify-center pt-4">
            <Button asChild variant="outline" className="text-sm border-green-200 hover:border-green-300 hover:bg-green-50 text-green-700 hover:text-green-800 rounded-full group">
              <Link href="/shop?category=health">
                <span>View All Health Products</span>
                <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
} 