'use client'

import React, { useState } from 'react'
import { ShoppingCart, Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/cart-context'
import { Product } from '@/types'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface AddToCartButtonProps {
  product: Product
  variant?: 'default' | 'outline' | 'secondary' | 'destructive' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
  showVariantSelector?: boolean
  variantOptions?: string[]
  quantity?: number
}

export function AddToCartButton({
  product,
  variant = 'default',
  size = 'default',
  className,
  showVariantSelector = false,
  variantOptions = [],
  quantity = 1
}: AddToCartButtonProps) {
  const { addItem, isLoading } = useCart()
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(
    variantOptions.length > 0 ? variantOptions[0] : undefined
  )
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariant)
    
    // Show success state temporarily
    setIsAdded(true)
    setTimeout(() => {
      setIsAdded(false)
    }, 2000)
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {showVariantSelector && variantOptions.length > 0 && (
        <div className="flex flex-col gap-2">
          <label htmlFor="variant-selector" className="text-sm font-medium">
            Select Option
          </label>
          <Select
            value={selectedVariant}
            onValueChange={setSelectedVariant}
            disabled={isLoading || isAdded}
          >
            <SelectTrigger id="variant-selector" className="w-full">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              {variantOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      
      <Button
        variant={variant}
        size={size}
        className={cn(
          "transition-all", 
          isAdded ? "bg-green-600 hover:bg-green-700" : ""
        )}
        onClick={handleAddToCart}
        disabled={isLoading || isAdded}
        aria-label={`Add ${product.name} to cart`}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Adding...
          </>
        ) : isAdded ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            Added to Cart
          </>
        ) : (
          <>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </>
        )}
      </Button>
    </div>
  )
} 