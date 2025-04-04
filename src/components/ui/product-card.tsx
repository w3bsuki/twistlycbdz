'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, ShoppingCart, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Product } from '@/lib/products'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { VisuallyHidden } from '@/components/ui/visually-hidden'
import { DATA_TEST_ID } from './data-testid'

interface ProductCardProps {
  product: Product
  className?: string
  onAddToCart?: (productId: string) => void
  onAddToWishlist?: (productId: string) => void
}

export function ProductCard({ 
  product, 
  className,
  onAddToCart,
  onAddToWishlist 
}: ProductCardProps) {
  const [isHovered, setIsHovered] = React.useState(false)
  const cardRef = React.useRef<HTMLDivElement>(null)
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onAddToCart?.(product.id)
  }
  
  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onAddToWishlist?.(product.id)
  }
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Add keyboard navigation for quick action buttons
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      cardRef.current?.querySelector('a')?.click()
    }
  }
  
  return (
    <Card
      className="h-full overflow-hidden border-0 shadow-sm transition-all hover:shadow-md relative"
      tabIndex={0}
      role="group"
      aria-label={`Product: ${product.name}, Price: $${product.discountPrice || product.price}`}
      data-testid={DATA_TEST_ID.PRODUCT_CARD}
    >
      <Link 
        href={`/shop/${product.id}`} 
        className="block outline-none focus:ring-0"
        data-testid={DATA_TEST_ID.NAV_LINK}
      >
        <div className="relative">
          <AspectRatio ratio={1} className="bg-muted">
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{ backgroundImage: `url(${product.images[0]})` }} 
              aria-hidden="true"
              data-testid={DATA_TEST_ID.PRODUCT_IMAGE}
            />
            
            {/* Product badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1" aria-hidden="true">
              {product.bestSeller && (
                <Badge className="bg-amber-500 hover:bg-amber-600">Best Seller</Badge>
              )}
              {product.new && (
                <Badge className="bg-blue-500 hover:bg-blue-600">New</Badge>
              )}
              {product.discountPrice && (
                <Badge className="bg-red-500 hover:bg-red-600">Sale</Badge>
              )}
            </div>
            
            {/* Quick action buttons */}
            <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
              <Button 
                size="icon" 
                variant="secondary" 
                className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm"
                onClick={handleAddToWishlist}
                aria-label={`Add ${product.name} to wishlist`}
                tabIndex={0}
              >
                <Heart className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button 
                size="icon" 
                variant="secondary" 
                className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm"
                onClick={handleAddToCart}
                aria-label={`Add ${product.name} to cart`}
                tabIndex={0}
              >
                <ShoppingCart className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </AspectRatio>
        </div>
        
        <CardContent className="p-4">
          <div 
            className="mb-2 flex items-center gap-1" 
            aria-label={`Rating: ${product.rating} out of 5 stars, ${product.reviewCount} reviews`} 
            data-testid={DATA_TEST_ID.PRODUCT_RATING}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                )}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">
              ({product.reviewCount})
            </span>
          </div>
          
          <h3 className="font-medium text-base mb-1 line-clamp-1" data-testid={DATA_TEST_ID.PRODUCT_TITLE}>
            {product.name}
          </h3>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
            {product.shortDescription}
          </p>
          
          <div className="mt-auto font-medium" data-testid={DATA_TEST_ID.PRODUCT_PRICE}>
            {product.discountPrice ? (
              <div className="flex items-center gap-2">
                <span className="text-primary">${product.discountPrice}</span>
                <span className="text-muted-foreground line-through text-sm">
                  ${product.price}
                </span>
              </div>
            ) : (
              <span className="text-primary">${product.price}</span>
            )}
          </div>
        </CardContent>
      </Link>
      
      <CardFooter className="p-4 pt-0">
        <Button
          variant="default"
          className="w-full"
          size="sm"
          onClick={handleAddToCart}
          aria-label={`Add ${product.name} to cart, $${product.discountPrice || product.price}`}
          data-testid={DATA_TEST_ID.ADD_TO_CART_BUTTON}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
} 