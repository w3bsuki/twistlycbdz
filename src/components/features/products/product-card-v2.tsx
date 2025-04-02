/**
 * ProductCard Component
 * 
 * An optimized product card component with best practices for:
 * - Performance (memoization, callback optimization)
 * - Accessibility (proper ARIA attributes, keyboard navigation)
 * - Error handling (fallbacks for images and state)
 * - Integration with cart and preferences contexts
 */

'use client';

import React, { useState, useCallback, memo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/products';
import { cn } from '@/lib/utils';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { 
  ShoppingCart, Check, Heart, Eye, Award, Star, Clock, User, Droplet, Info 
} from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { useToast } from "@/components/ui/use-toast";
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';

/**
 * Props for the ProductCard component
 */
export interface ProductCardProps {
  /** The product data to display */
  product: Product;
  /** Whether this is a featured product (affects styling) */
  featured?: boolean;
  /** Additional CSS classes to apply */
  className?: string;
  /** Size variant of the card */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to show quick actions (add to cart, wishlist, etc.) */
  showQuickActions?: boolean;
  /** Optional custom click handler */
  onClick?: (product: Product) => void;
  /** Optional data-testid for testing */
  'data-testid'?: string;
}

/**
 * ProductCard - A component that displays product information in a card format
 * 
 * @example
 * ```tsx
 * <ProductCard 
 *   product={product} 
 *   featured 
 *   size="lg"
 * />
 * ```
 */
const ProductCard = memo(({
  product,
  featured = false,
  className,
  size = 'md',
  showQuickActions = true,
  onClick,
  'data-testid': testId,
}: ProductCardProps) => {
  // Destructure product properties
  const { 
    id, 
    name, 
    price, 
    rating, 
    image, 
    images, 
    category, 
    tags, 
    discount, 
    new: isNew, 
    featured: isFeatured, 
    reviewCount, 
    potency,
    details
  } = product;
  
  // Component state
  const [isHovering, setIsHovering] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [activeInfo, setActiveInfo] = useState<{
    title: string;
    content: string;
  } | null>(null);

  // Hooks
  const { addItem } = useCart();
  const { toast } = useToast();
  
  // Computed values
  const discountedPrice = discount ? price - (price * discount) / 100 : price;
  const productUrl = `/shop/${id}`;
  const productImage = image || images?.[0] || '/images/products/placeholder.png';
  
  /**
   * Handles adding the product to the cart
   */
  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAdding(true);
    
    try {
      addItem(product, 1);
      
      toast({
        title: "Added to cart",
        description: `${name} has been added to your cart.`,
        duration: 3000,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "There was an error adding this item to your cart.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      // Reset adding state after animation
      setTimeout(() => {
        setIsAdding(false);
      }, 1000);
    }
  }, [product, name, addItem, toast]);

  /**
   * Handles adding the product to the wishlist
   */
  const handleWishlist = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toast({
      title: "Added to wishlist",
      description: `${name} has been added to your wishlist.`,
      duration: 3000,
    });
  }, [name, toast]);

  /**
   * Handles quick view action
   */
  const handleQuickView = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Quick view functionality
    if (onClick) {
      onClick(product);
    }
  }, [product, onClick]);
  
  /**
   * Generates a list of info buttons based on product details
   */
  const getInfoButtons = useCallback(() => {
    const buttons = [];
    
    if (details?.forWho) {
      buttons.push({
        id: 'who',
        label: 'Who is it for',
        icon: <User className="h-3 w-3" />,
        content: details.forWho
      });
    }
    
    if (details?.dosage) {
      buttons.push({
        id: 'dosage',
        label: 'Dosage',
        icon: <Droplet className="h-3 w-3" />,
        content: details.dosage
      });
    }
    
    if (details?.usageTime) {
      buttons.push({
        id: 'time',
        label: 'When to use',
        icon: <Clock className="h-3 w-3" />,
        content: details.usageTime
      });
    }
    
    if (details?.additionalInfo) {
      buttons.push({
        id: 'info',
        label: 'More info',
        icon: <Info className="h-3 w-3" />,
        content: details.additionalInfo
      });
    }
    
    return buttons;
  }, [details]);
  
  /**
   * Handles info button click to show dialog
   */
  const handleInfoButtonClick = useCallback((e: React.MouseEvent, infoTitle: string, infoContent: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    setActiveInfo({
      title: infoTitle,
      content: infoContent
    });
    
    setInfoDialogOpen(true);
  }, []);

  /**
   * Get size-specific classes
   */
  const getSizeClasses = useCallback(() => {
    switch (size) {
      case 'sm':
        return 'p-3';
      case 'lg':
        return 'p-6';
      case 'md':
      default:
        return 'p-5';
    }
  }, [size]);

  return (
    <>
      <motion.div 
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-950",
          featured ? "h-full md:h-auto" : "h-full",
          className
        )}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        data-testid={testId}
        role="group"
        aria-label={`Product: ${name}`}
      >
        {/* Quick action buttons */}
        {showQuickActions && (
          <div className="absolute right-3 top-3 z-10 flex flex-col gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white dark:bg-gray-900/80 dark:hover:bg-gray-900"
                    onClick={handleWishlist}
                    aria-label="Add to wishlist"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add to wishlist</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white dark:bg-gray-900/80 dark:hover:bg-gray-900"
                    onClick={handleQuickView}
                    aria-label="Quick view"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Quick view</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}

        {/* Product image */}
        <Link href={productUrl} className="relative overflow-hidden bg-gray-100 dark:bg-gray-800">
          <div className="aspect-square overflow-hidden">
            <OptimizedImage
              src={productImage}
              alt={name}
              aspectRatio="square"
              priority={featured}
              className={cn(
                "object-cover transition-transform duration-500",
                isHovering ? "scale-110" : "scale-100"
              )}
            />
          </div>
          
          {/* Product badges */}
          <div className="absolute left-2 top-2 flex flex-col gap-1">
            {discount > 0 && (
              <Badge variant="destructive" className="px-2 py-1 text-xs font-medium" aria-label={`${discount}% discount`}>
                {discount}% OFF
              </Badge>
            )}
            {isNew && (
              <Badge variant="default" className="bg-blue-600 px-2 py-1 text-xs font-medium">
                NEW
              </Badge>
            )}
            {isFeatured && (
              <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200 px-2 py-1 text-xs font-medium">
                <Award className="mr-1 h-3 w-3" />
                Featured
              </Badge>
            )}
          </div>
        </Link>
        
        {/* Product details */}
        <div className={`flex grow flex-col ${getSizeClasses()}`}>
          {/* Category and ratings */}
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              {category}
            </span>
            {rating > 0 && (
              <div className="flex items-center gap-1" aria-label={`Rated ${rating} out of 5 stars`}>
                <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{rating}</span>
                {reviewCount > 0 && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">({reviewCount})</span>
                )}
              </div>
            )}
          </div>
          
          {/* Product name */}
          <Link href={productUrl} className="group-hover:text-indigo-600 mb-2">
            <h3 className="font-medium text-gray-900 transition-colors dark:text-gray-100 line-clamp-1">
              {name}
            </h3>
          </Link>
          
          {/* Product potency (if available) */}
          {potency && (
            <div className="mb-3">
              <span className="inline-block rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                {potency}mg CBD
              </span>
            </div>
          )}
          
          {/* Info buttons */}
          {getInfoButtons().length > 0 && (
            <div className="mb-3 flex flex-wrap gap-1">
              {getInfoButtons().map((button) => (
                <TooltipProvider key={button.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 rounded-full border-gray-200 px-2 text-xs dark:border-gray-800"
                        onClick={(e) => handleInfoButtonClick(e, button.label, button.content)}
                        aria-label={`View ${button.label} information`}
                      >
                        {button.icon}
                        <span className="ml-1">{button.label}</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Click for {button.label.toLowerCase()} details</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          )}
          
          {/* Price and add to cart */}
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              {discount > 0 ? (
                <>
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">${discountedPrice.toFixed(2)}</span>
                  <span className="text-sm text-gray-500 line-through dark:text-gray-400">${price.toFixed(2)}</span>
                </>
              ) : (
                <span className="text-lg font-semibold text-gray-900 dark:text-white">${price.toFixed(2)}</span>
              )}
            </div>
            
            <Button
              size="sm"
              variant="outline"
              className={cn(
                "gap-1 transition-all",
                isAdding && "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400"
              )}
              onClick={handleAddToCart}
              disabled={isAdding}
              aria-label={`Add ${name} to cart`}
            >
              {isAdding ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4" />
                  <span>Add</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.div>
      
      {/* Info dialog */}
      <Dialog open={infoDialogOpen} onOpenChange={setInfoDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{activeInfo?.title}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-700 dark:text-gray-300">{activeInfo?.content}</p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
});

// Display name for debugging
ProductCard.displayName = 'ProductCard';

export default ProductCard; 