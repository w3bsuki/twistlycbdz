'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Product } from '@/lib/products';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Heart, Eye, Star, Plus, Minus, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { handleKeyboardEvent, getRatingAriaLabel, getPriceAriaLabel } from '@/lib/accessibility';
import { VisuallyHidden } from '@/components/ui/accessible-label';

interface QuickViewModalProps {
  product: Product;
  trigger?: React.ReactNode;
  className?: string;
}

export function QuickViewModal({ product, trigger, className }: QuickViewModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem, openCart } = useCart();
  const { toast } = useToast();
  
  // Add a ref for better focus management
  const dialogContentRef = React.useRef<HTMLDivElement>(null);
  const firstFocusableRef = React.useRef<HTMLButtonElement>(null);

  const incrementQuantity = () => {
    if (quantity < (product.stock || 10)) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast({
      title: 'Added to Cart',
      description: `${quantity} × ${product.name} added to your cart.`,
    });
    // Reset quantity back to 1
    setQuantity(1);
  };

  const handleAddToCartAndView = () => {
    addItem(product, quantity);
    toast({
      title: 'Added to Cart',
      description: `${quantity} × ${product.name} added to your cart.`,
    });
    // Reset quantity back to 1
    setQuantity(1);
    // Open the cart
    openCart();
  };

  const handleToggleWishlist = () => {
    setIsWishlisted(prev => !prev);
    toast({
      title: isWishlisted ? 'Removed from Wishlist' : 'Added to Wishlist',
      description: `${product.name} has been ${isWishlisted ? 'removed from' : 'added to'} your wishlist.`,
    });
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'health': return 'green';
      case 'beauty': return 'purple';
      case 'sport': return 'blue';
      case 'hybrid': return 'amber';
      default: return 'gray';
    }
  };
  
  const color = getCategoryColor(product.category);

  // Handle dialog opening for better accessibility
  const handleDialogOpenChange = (open: boolean) => {
    if (open && dialogContentRef.current) {
      // Wait for dialog to be visible before focusing
      setTimeout(() => {
        if (firstFocusableRef.current) {
          firstFocusableRef.current.focus();
        }
      }, 100);
    }
  };

  return (
    <Dialog onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-2 top-2 bg-white/80 hover:bg-white z-10 rounded-full h-8 w-8"
            aria-label={`Quick view ${product.name}`}
          >
            <Eye className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent 
        ref={dialogContentRef}
        className={cn("w-full max-w-4xl p-0 flex flex-col md:flex-row", className)}
        aria-labelledby="product-quick-view-title"
      >
        {/* Product Image */}
        <div className="relative w-full md:w-1/2 aspect-square bg-gray-50">
          <Image 
            src={product.image} 
            alt={product.name}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          {product.discount && (
            <div 
              className={`absolute top-4 left-4 z-10 rounded-full px-3 py-1.5 text-xs font-medium text-white bg-${color}-600`}
              aria-label={`${product.discount}% discount`}
            >
              Save {product.discount}%
            </div>
          )}
        </div>
        
        {/* Product Details */}
        <div className="w-full md:w-1/2 p-6 flex flex-col">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-medium text-${color}-700 uppercase tracking-wide`}>
                {product.category}
              </span>
              <div 
                className="flex items-center"
                aria-label={getRatingAriaLabel(product.rating, product.reviewCount)}
              >
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < Math.floor(product.rating) 
                        ? `fill-${color}-500 text-${color}-500` 
                        : "fill-gray-200 text-gray-200"
                    )}
                    aria-hidden="true"
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {product.rating.toFixed(1)} ({product.reviewCount})
                </span>
              </div>
            </div>
            
            <h2 id="product-quick-view-title" className="text-xl font-bold text-gray-900 mb-2">{product.name}</h2>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{product.description}</p>
            
            <div className="flex items-center space-x-2 mb-4" aria-live="polite">
              {product.discountPrice ? (
                <>
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.discountPrice.toFixed(2)}
                  </span>
                  <span className="ml-2 text-sm font-normal text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <VisuallyHidden>
                    {getPriceAriaLabel(product.price, product.discountPrice)}
                  </VisuallyHidden>
                </>
              ) : (
                <span className="text-2xl font-bold text-gray-900" aria-label={getPriceAriaLabel(product.price)}>
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            <div className="space-y-3 mb-6">
              {product.details?.size && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Size</span>
                  <span className="text-sm">{product.details.size}</span>
                </div>
              )}
              
              {product.details?.concentration && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Concentration</span>
                  <span className={`bg-${color}-100 text-${color}-700 text-xs font-medium px-2.5 py-0.5 rounded-md`}>
                    {product.details.concentration}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <Tabs defaultValue="benefits">
            <TabsList className="w-full">
              <TabsTrigger value="benefits" className="flex-1">Benefits</TabsTrigger>
              <TabsTrigger value="usage" className="flex-1">Usage</TabsTrigger>
              <TabsTrigger value="ingredients" className="flex-1">Ingredients</TabsTrigger>
            </TabsList>
            
            <TabsContent value="benefits" className="h-32 overflow-y-auto">
              <ul className="space-y-2 py-2">
                {product.details?.benefits?.map((benefit, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <span className={`text-${color}-600 mr-2`}>•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
            
            <TabsContent value="usage" className="h-32 overflow-y-auto">
              <p className="text-sm text-gray-600 py-2">{product.details?.usage}</p>
            </TabsContent>
            
            <TabsContent value="ingredients" className="h-32 overflow-y-auto">
              <ul className="space-y-1 py-2">
                {product.details?.ingredients?.map((ingredient, index) => (
                  <li key={index} className="text-sm text-gray-600">{ingredient}</li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
          
          <div className="mt-auto">
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center border rounded-md" role="group" aria-label="Quantity selector">
                <button
                  ref={firstFocusableRef}
                  onClick={decrementQuantity}
                  onKeyDown={(e) => handleKeyboardEvent(e, decrementQuantity)}
                  disabled={quantity <= 1}
                  className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span 
                  className="px-4 text-gray-900 font-medium" 
                  aria-live="polite"
                  aria-label={`Quantity: ${quantity}`}
                >
                  {quantity}
                </span>
                <button
                  onClick={incrementQuantity}
                  onKeyDown={(e) => handleKeyboardEvent(e, incrementQuantity)}
                  disabled={quantity >= (product.stock || 10)}
                  className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              
              <motion.button
                onClick={handleToggleWishlist}
                onKeyDown={(e) => handleKeyboardEvent(e, handleToggleWishlist)}
                className={cn(
                  "p-2 rounded-full border",
                  isWishlisted 
                    ? "border-red-200 text-red-500 hover:bg-red-50" 
                    : "border-gray-200 text-gray-400 hover:bg-gray-50"
                )}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                aria-pressed={isWishlisted}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className={cn("h-5 w-5", isWishlisted && "fill-red-500")} />
              </motion.button>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Button 
                onClick={handleAddToCart}
                className={`bg-${color}-600 hover:bg-${color}-700 text-white`}
                disabled={product.stock <= 0}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              
              <Button
                onClick={handleAddToCartAndView}
                variant="outline"
                className="border-gray-300 hover:bg-gray-50"
                disabled={product.stock <= 0}
              >
                Add & View Cart
              </Button>
            </div>
            
            <div className="text-center mt-4">
              <Link href={`/shop/${product.id}`} className="text-sm text-gray-600 hover:text-gray-900 inline-flex items-center">
                View Full Details
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 