'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, ShoppingCart } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  BaseComponentProps,
  ColorScheme,
  HeadingProps,
  ThemeProps,
  ProductDisplayProps,
  Product as ProductType,
  AnimationProps
} from '@/types/component-props'

/**
 * Extended product type specific to this component
 */
export interface ProductGridItem extends Omit<ProductType, 'rating' | 'reviewCount'> {
  /** Product strength/dosage information */
  strength?: string
  /** Star rating (0-5) */
  rating: number
  /** Number of reviews */
  reviews?: number
  /** Benefits/features array */
  benefits?: string[]
  /** Custom badge color */
  badgeColor?: string
}

/**
 * Props for the ProductGrid component
 */
export interface ProductGridProps extends BaseComponentProps, HeadingProps, ThemeProps, Pick<ProductDisplayProps, 'limit'> {
  /** Array of products to display */
  products: ProductGridItem[]
  /** Number of columns to display on larger screens */
  columns?: 2 | 3 | 4
  /** Whether to show the "Add to Cart" button */
  showAddToCart?: boolean
  /** Whether to animate the grid items */
  animate?: boolean
  /** Custom button text for "Add to Cart" */
  addToCartText?: string
  /** Function called when "Add to Cart" is clicked */
  onAddToCart?: (product: ProductGridItem) => void
}

/**
 * A responsive product grid component for displaying product cards
 */
export function ProductGrid({
  products,
  title,
  subtitle,
  limit = 4,
  className,
  colorScheme = 'default',
  id,
  ariaLabel,
  columns = 4,
  showAddToCart = true,
  animate = true,
  addToCartText = "Add to Cart",
  onAddToCart
}: ProductGridProps) {
  const displayProducts = products.slice(0, limit)
  
  // Get the color scheme classes
  const getColorClasses = () => {
    switch (colorScheme) {
      case 'green':
        return {
          heading: 'text-green-800',
          subheading: 'text-green-600',
          badge: 'bg-green-600 hover:bg-green-700',
          button: 'bg-green-600 hover:bg-green-700',
          outline: 'border-green-600 text-green-600 hover:bg-green-50'
        }
      case 'blue':
        return {
          heading: 'text-blue-800',
          subheading: 'text-blue-600',
          badge: 'bg-blue-600 hover:bg-blue-700',
          button: 'bg-blue-600 hover:bg-blue-700',
          outline: 'border-blue-600 text-blue-600 hover:bg-blue-50'
        }
      case 'purple':
        return {
          heading: 'text-purple-800',
          subheading: 'text-purple-600',
          badge: 'bg-purple-600 hover:bg-purple-700',
          button: 'bg-purple-600 hover:bg-purple-700',
          outline: 'border-purple-600 text-purple-600 hover:bg-purple-50'
        }
      case 'amber':
        return {
          heading: 'text-amber-800',
          subheading: 'text-amber-600',
          badge: 'bg-amber-600 hover:bg-amber-700',
          button: 'bg-amber-600 hover:bg-amber-700',
          outline: 'border-amber-600 text-amber-600 hover:bg-amber-50'
        }
      default:
        return {
          heading: 'text-gray-800',
          subheading: 'text-gray-600',
          badge: 'bg-gray-600 hover:bg-gray-700',
          button: 'bg-gray-600 hover:bg-gray-700',
          outline: 'border-gray-600 text-gray-600 hover:bg-gray-50'
        }
    }
  }
  
  const colors = getColorClasses()
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  // Determine column classes based on columns prop
  const getColumnClasses = () => {
    switch (columns) {
      case 2:
        return "grid-cols-1 sm:grid-cols-2";
      case 3:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
      case 4:
      default:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
    }
  }

  // Handle add to cart click
  const handleAddToCart = (product: ProductGridItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };
  
  return (
    <section 
      id={id}
      aria-label={ariaLabel || "Product grid"} 
      className={cn("py-12", className)}
    >
      <div className="container mx-auto px-4 md:px-6">
        {(title || subtitle) && (
          <div className="text-center mb-8 md:mb-12">
            {subtitle && (
              <motion.p 
                className={cn("text-lg mb-2", colors.subheading)}
                initial={animate ? { opacity: 0, y: 10 } : { opacity: 1 }}
                whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {subtitle}
              </motion.p>
            )}
            
            {title && (
              <motion.h2 
                className={cn("text-2xl md:text-3xl lg:text-4xl font-bold", colors.heading)}
                initial={animate ? { opacity: 0, y: 10 } : { opacity: 1 }}
                whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {title}
              </motion.h2>
            )}
          </div>
        )}
        
        <motion.div 
          className={cn("grid gap-6", getColumnClasses())}
          variants={animate ? containerVariants : undefined}
          initial={animate ? "hidden" : "visible"}
          whileInView={animate ? "visible" : undefined}
          viewport={{ once: true }}
        >
          {displayProducts.map((product, index) => (
            <motion.div key={product.id || index} variants={animate ? itemVariants : undefined}>
              <Link href={`/shop/${product.slug || product.id || index}`}>
                <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-lg">
                  <div className="relative aspect-square overflow-hidden">
                    <Image 
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                    
                    {product.featured && (
                      <Badge className={cn("absolute top-2 left-2", product.badgeColor || colors.badge)}>
                        Featured
                      </Badge>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"
                          )}
                        />
                      ))}
                      {product.reviews && (
                        <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
                      )}
                    </div>
                    
                    <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                    
                    {product.strength && (
                      <p className="text-sm text-gray-500 mb-2">{product.strength}</p>
                    )}
                    
                    {product.description && (
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                    )}
                    
                    <div className="font-bold text-lg">{product.price}</div>
                  </CardContent>
                  
                  {showAddToCart && (
                    <CardFooter className="p-4 pt-0">
                      <Button 
                        className={cn("w-full", colors.button)} 
                        onClick={(e) => handleAddToCart(product, e)}
                      >
                        {addToCartText}
                        <ShoppingCart className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 