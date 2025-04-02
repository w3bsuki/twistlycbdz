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

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [isHovered, setIsHovered] = React.useState(false)
  
  return (
    <Link href={`/shop/${product.id}`}>
      <Card 
        className={cn(
          "group overflow-hidden border-0 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          <AspectRatio ratio={1} className="bg-muted">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" 
              style={{ backgroundImage: `url(${product.images[0]})` }} 
            />
            
            {/* Product badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
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
            <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm">
                <Heart className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm">
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          </AspectRatio>
        </div>
        
        <CardContent className="p-4">
          <div className="mb-2 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3 w-3",
                  i < Math.floor(product.rating) 
                    ? "fill-amber-500 text-amber-500" 
                    : "fill-muted text-muted"
                )}
              />
            ))}
            <span className="ml-1 text-xs text-muted-foreground">
              ({product.reviewCount})
            </span>
          </div>
          
          <h3 className="font-medium text-base mb-1 line-clamp-1">{product.name}</h3>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
            {product.description}
          </p>
          
          <div className="flex items-center gap-2">
            {product.discountPrice ? (
              <>
                <span className="font-semibold">${product.discountPrice.toFixed(2)}</span>
                <span className="text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="font-semibold">${product.price.toFixed(2)}</span>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <Button className="w-full" size="sm">
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
} 