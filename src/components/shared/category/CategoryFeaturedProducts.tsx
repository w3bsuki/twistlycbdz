'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Star, ShoppingCart, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { cn } from '@/lib/utils'
import { CategoryTheme } from './CategoryHero'

export interface ProductItem {
  id: string;
  name: string;
  strength: string;
  image: string;
  price: string;
  rating: number;
  reviews: number;
  description: string;
  benefits: string[];
  badgeColor?: string;
  featured: boolean;
}

export interface CategoryFeaturedProductsProps {
  theme: CategoryTheme;
  sectionTitle: string;
  sectionDescription: string;
  products: ProductItem[];
  viewAllLink: string;
  viewAllText: string;
  className?: string;
}

export function CategoryFeaturedProducts({
  theme,
  sectionTitle,
  sectionDescription,
  products,
  viewAllLink,
  viewAllText,
  className
}: CategoryFeaturedProductsProps) {
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
      
      productGridContainer: cn(
        "bg-gradient-to-br rounded-xl border shadow-sm p-3 mb-4 overflow-hidden",
        colors.gradientFrom === 'green-50' ? 'from-green-50/70 to-white border-green-200/40' :
        colors.gradientFrom === 'amber-50' ? 'from-amber-50/70 to-white border-amber-200/40' :
        colors.gradientFrom === 'blue-50' ? 'from-blue-50/70 to-white border-blue-200/40' :
        colors.gradientFrom === 'purple-50' ? 'from-purple-50/70 to-white border-purple-200/40' :
        colors.gradientFrom === 'indigo-50' ? 'from-indigo-50/70 to-white border-indigo-200/40' :
        'from-gray-50/70 to-white border-gray-200/40'
      ),
      
      productCard: cn(
        "h-full border overflow-hidden bg-white transition-all duration-200 hover:shadow-md",
        colors.border === 'green-200' ? 'border-green-200 hover:border-green-300' :
        colors.border === 'amber-200' ? 'border-amber-200 hover:border-amber-300' :
        colors.border === 'blue-200' ? 'border-blue-200 hover:border-blue-300' :
        colors.border === 'purple-200' ? 'border-purple-200 hover:border-purple-300' :
        colors.border === 'indigo-200' ? 'border-indigo-200 hover:border-indigo-300' :
        'border-gray-200 hover:border-gray-300'
      ),
      
      productImageContainer: cn(
        "relative pt-[70%] bg-gradient-to-b",
        colors.gradientFrom === 'green-50' ? 'from-green-50 to-white' :
        colors.gradientFrom === 'amber-50' ? 'from-amber-50 to-white' :
        colors.gradientFrom === 'blue-50' ? 'from-blue-50 to-white' :
        colors.gradientFrom === 'purple-50' ? 'from-purple-50 to-white' :
        colors.gradientFrom === 'indigo-50' ? 'from-indigo-50 to-white' :
        'from-gray-50 to-white'
      ),
      
      productStrengthBadge: cn(
        "absolute top-2 right-2 text-white text-xs hover:bg-opacity-90",
        colors.primary === 'green-600' ? 'bg-green-600 hover:bg-green-700' :
        colors.primary === 'amber-600' ? 'bg-amber-600 hover:bg-amber-700' :
        colors.primary === 'blue-600' ? 'bg-blue-600 hover:bg-blue-700' :
        colors.primary === 'purple-600' ? 'bg-purple-600 hover:bg-purple-700' :
        colors.primary === 'indigo-600' ? 'bg-indigo-600 hover:bg-indigo-700' :
        'bg-gray-600 hover:bg-gray-700'
      ),
      
      productTitle: cn(
        "font-medium text-gray-900 transition-colors text-sm line-clamp-1",
        colors.primary === 'green-600' ? 'group-hover:text-green-700' :
        colors.primary === 'amber-600' ? 'group-hover:text-amber-700' :
        colors.primary === 'blue-600' ? 'group-hover:text-blue-700' :
        colors.primary === 'purple-600' ? 'group-hover:text-purple-700' :
        colors.primary === 'indigo-600' ? 'group-hover:text-indigo-700' :
        'group-hover:text-gray-700'
      ),
      
      productPrice: cn(
        "font-bold text-sm whitespace-nowrap",
        colors.primary === 'green-600' ? 'text-green-700' :
        colors.primary === 'amber-600' ? 'text-amber-700' :
        colors.primary === 'blue-600' ? 'text-blue-700' :
        colors.primary === 'purple-600' ? 'text-purple-700' :
        colors.primary === 'indigo-600' ? 'text-indigo-700' :
        'text-gray-700'
      ),
      
      benefitBadge: cn(
        "bg-opacity-10 text-xs border-opacity-30 px-1.5 py-0 rounded-full",
        colors.primary === 'green-600' ? 'bg-green-50 text-green-700 border-green-100' :
        colors.primary === 'amber-600' ? 'bg-amber-50 text-amber-700 border-amber-100' :
        colors.primary === 'blue-600' ? 'bg-blue-50 text-blue-700 border-blue-100' :
        colors.primary === 'purple-600' ? 'bg-purple-50 text-purple-700 border-purple-100' :
        colors.primary === 'indigo-600' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' :
        'bg-gray-50 text-gray-700 border-gray-100'
      ),
      
      cartButton: cn(
        "h-7 w-7 p-0 hover:bg-opacity-10",
        colors.primary === 'green-600' ? 'text-green-700 hover:text-green-800 hover:bg-green-50' :
        colors.primary === 'amber-600' ? 'text-amber-700 hover:text-amber-800 hover:bg-amber-50' :
        colors.primary === 'blue-600' ? 'text-blue-700 hover:text-blue-800 hover:bg-blue-50' :
        colors.primary === 'purple-600' ? 'text-purple-700 hover:text-purple-800 hover:bg-purple-50' :
        colors.primary === 'indigo-600' ? 'text-indigo-700 hover:text-indigo-800 hover:bg-indigo-50' :
        'text-gray-700 hover:text-gray-800 hover:bg-gray-50'
      ),
      
      carouselContainer: cn(
        "mt-3 pt-3 border-t",
        colors.border === 'green-200' ? 'border-green-100' :
        colors.border === 'amber-200' ? 'border-amber-100' :
        colors.border === 'blue-200' ? 'border-blue-100' :
        colors.border === 'purple-200' ? 'border-purple-100' :
        colors.border === 'indigo-200' ? 'border-indigo-100' :
        'border-gray-100'
      ),
      
      sliderContainer: cn(
        "bg-gradient-to-br rounded-xl border shadow-sm p-3 overflow-hidden",
        colors.gradientFrom === 'green-50' ? 'from-green-50/70 to-white border-green-200/40' :
        colors.gradientFrom === 'amber-50' ? 'from-amber-50/70 to-white border-amber-200/40' :
        colors.gradientFrom === 'blue-50' ? 'from-blue-50/70 to-white border-blue-200/40' :
        colors.gradientFrom === 'purple-50' ? 'from-purple-50/70 to-white border-purple-200/40' :
        colors.gradientFrom === 'indigo-50' ? 'from-indigo-50/70 to-white border-indigo-200/40' :
        'from-gray-50/70 to-white border-gray-200/40'
      ),
      
      sliderItemContainer: cn(
        "bg-white rounded-lg border shadow-sm",
        colors.border === 'green-200' ? 'border-green-100' :
        colors.border === 'amber-200' ? 'border-amber-100' :
        colors.border === 'blue-200' ? 'border-blue-100' :
        colors.border === 'purple-200' ? 'border-purple-100' :
        colors.border === 'indigo-200' ? 'border-indigo-100' :
        'border-gray-100'
      ),
      
      sliderOverlay: cn(
        "absolute inset-0 bg-gradient-to-t from-opacity-60 via-opacity-20 to-transparent rounded-lg opacity-80 transition-opacity duration-300",
        colors.primary === 'green-600' ? 'from-green-900 via-green-800' :
        colors.primary === 'amber-600' ? 'from-amber-900 via-amber-800' :
        colors.primary === 'blue-600' ? 'from-blue-900 via-blue-800' :
        colors.primary === 'purple-600' ? 'from-purple-900 via-purple-800' :
        colors.primary === 'indigo-600' ? 'from-indigo-900 via-indigo-800' :
        'from-gray-900 via-gray-800'
      ),
      
      viewAllButton: cn(
        "text-sm border rounded-full group hover:bg-opacity-10",
        colors.border === 'green-200' ? 'border-green-200 hover:border-green-300 hover:bg-green-50 text-green-700 hover:text-green-800' :
        colors.border === 'amber-200' ? 'border-amber-200 hover:border-amber-300 hover:bg-amber-50 text-amber-700 hover:text-amber-800' :
        colors.border === 'blue-200' ? 'border-blue-200 hover:border-blue-300 hover:bg-blue-50 text-blue-700 hover:text-blue-800' :
        colors.border === 'purple-200' ? 'border-purple-200 hover:border-purple-300 hover:bg-purple-50 text-purple-700 hover:text-purple-800' :
        colors.border === 'indigo-200' ? 'border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50 text-indigo-700 hover:text-indigo-800' :
        'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 hover:text-gray-800'
      )
    };
  };
  
  const classes = getClasses();
  
  // Get filtered featured products
  const featuredProducts = products.filter(product => product.featured);
  
  return (
    <section 
      className={cn(classes.section, className)}
      id={`${theme.name.toLowerCase().replace(/[&\s]+/g, '-')}-featured-products`}
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
                <ShoppingCart className="h-3.5 w-3.5" />
                <span>Featured Products</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-3 mb-2">{sectionTitle}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-4 text-sm md:text-base leading-relaxed">
              {sectionDescription}
            </p>
          </div>
          
          {/* Product Grid */}
          <div className={classes.productGridContainer}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {featuredProducts.map((product) => (
                <Link href={`/shop/${product.id}`} key={product.id} className="group">
                  <Card className={classes.productCard}>
                    <div className={classes.productImageContainer}>
                      <div className="absolute inset-0 p-4 transition-transform duration-300 group-hover:scale-103">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <Badge className={classes.productStrengthBadge}>
                        {product.strength}
                      </Badge>
                    </div>
                    
                    <CardContent className="p-2.5">
                      <div className="flex justify-between items-start gap-1 mb-1">
                        <h3 className={classes.productTitle}>
                          {product.name}
                        </h3>
                        <span className={classes.productPrice}>{product.price}</span>
                      </div>
                      
                      <p className="text-xs text-gray-500 mb-1.5 line-clamp-1">{product.description}</p>
                      
                      <div className="flex gap-1.5 mb-1.5 flex-wrap">
                        {product.benefits.slice(0, 2).map((benefit, i) => (
                          <Badge key={i} variant="outline" className={classes.benefitBadge}>
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
                        <Button variant="ghost" size="sm" className={classes.cartButton}>
                          <ShoppingCart className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Product Carousel */}
          <div className={classes.carouselContainer}>
            <div className={classes.sliderContainer}>
              <InfiniteSlider gap={8} className="w-full py-1">
                {products.map((product, index) => (
                  <motion.div 
                    key={`slider-${index}`} 
                    className="relative group w-[140px]"
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  >
                    <AspectRatio ratio={1} className={classes.sliderItemContainer}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-2 scale-90"
                      />
                      <div className={classes.sliderOverlay} />
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
            
            {/* View All Products Button */}
            <div className="flex justify-center mt-4">
              <Button
                variant="outline"
                size="sm"
                className={classes.viewAllButton}
                asChild
              >
                <Link href={viewAllLink} className="flex items-center">
                  {viewAllText}
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
} 