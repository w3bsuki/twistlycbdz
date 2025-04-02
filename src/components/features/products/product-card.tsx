import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/products';
import { cn } from '@/lib/utils';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { 
  ShoppingCart, Check, Heart, Eye, Award, Star, Clock, User, Droplet, Info 
} from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { useToast } from "@/hooks/use-toast";
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
  DialogTitle 
} from '@/components/ui/dialog';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  featured = false,
  className,
}) => {
  const { id, name, price, rating, image, category, tags, discount, new: isNew, featured: isFeatured, reviewCount, potency } = product;
  const { addItem } = useCart();
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [activeInfo, setActiveInfo] = useState<{
    title: string;
    content: string;
  } | null>(null);
  
  const discountedPrice = discount ? price - (price * discount) / 100 : price;
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAdding(true);
    
    try {
      addItem(product, 1);
      
      toast({
        title: "Added to cart",
        description: `${name} has been added to your cart.`,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "There was an error adding this item to your cart.",
        variant: "destructive",
      });
    }
    
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
      title: "Added to wishlist",
      description: `${name} has been added to your wishlist.`,
    });
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Quick view functionality would go here
  };
  
  // Get product info buttons
  const getInfoButtons = () => {
    const buttons = [];
    
    if (product.details?.forWho) {
      buttons.push({
        id: 'who',
        label: 'Who is it for',
        icon: <User className="h-3 w-3" />,
        content: product.details.forWho
      });
    }
    
    if (product.details?.dosage) {
      buttons.push({
        id: 'dosage',
        label: 'Dosage',
        icon: <Droplet className="h-3 w-3" />,
        content: product.details.dosage
      });
    }
    
    if (product.details?.usageTime) {
      buttons.push({
        id: 'time',
        label: 'When to use',
        icon: <Clock className="h-3 w-3" />,
        content: product.details.usageTime
      });
    }
    
    if (product.details?.additionalInfo) {
      buttons.push({
        id: 'info',
        label: 'More info',
        icon: <Info className="h-3 w-3" />,
        content: product.details.additionalInfo
      });
    }
    
    return buttons;
  };
  
  const handleInfoButtonClick = (e: React.MouseEvent, infoTitle: string, infoContent: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    setActiveInfo({
      title: infoTitle,
      content: infoContent
    });
    
    setInfoDialogOpen(true);
  };
  
  // Ensure we have a valid product image 
  const getProductImage = (product: Product) => {
    if (!product.image || product.image.includes('placeholder')) {
      // Use tincture2.png as fallback
      return "/images/tincture2.png";
    }
    return product.image;
  };

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
      >
        <div className="absolute right-3 top-3 z-10 flex flex-col gap-2">
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white dark:bg-gray-900/80 dark:hover:bg-gray-900"
            onClick={handleWishlist}
          >
            <Heart className="h-4 w-4" />
            <span className="sr-only">Add to wishlist</span>
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white dark:bg-gray-900/80 dark:hover:bg-gray-900"
            onClick={handleQuickView}
          >
            <Eye className="h-4 w-4" />
            <span className="sr-only">Quick view</span>
          </Button>
        </div>

        <Link href={`/shop/${id}`} className="relative overflow-hidden bg-gray-100 dark:bg-gray-800">
          <div className="aspect-square overflow-hidden">
            <OptimizedImage
              src={getProductImage(product)}
              alt={name}
              aspectRatio="square"
              priority={featured}
              className={cn(
                "object-cover transition-transform duration-500",
                isHovering ? "scale-110" : "scale-100"
              )}
            />
          </div>
          
          <div className="absolute left-2 top-2 flex flex-col gap-1">
            {discount > 0 && (
              <Badge variant="destructive" className="px-2 py-1 text-xs font-medium">
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
        
        <div className="flex grow flex-col p-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-indigo-600 dark:text-indigo-400">{category}</span>
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{rating}</span>
              {reviewCount && (
                <span className="text-xs text-gray-500 dark:text-gray-400">({reviewCount})</span>
              )}
            </div>
          </div>
          
          <Link href={`/shop/${id}`} className="group-hover:text-indigo-600 mb-2">
            <h3 className="font-medium text-gray-900 transition-colors dark:text-gray-100 line-clamp-1">
              {name}
            </h3>
          </Link>
          
          {potency && (
            <div className="mb-3">
              <span className="inline-block rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                {potency}mg CBD
              </span>
            </div>
          )}
          
          {/* Benefits */}
          <div className="mb-4 mt-auto space-y-1.5">
            {product.details?.benefits.slice(0, 3).map((benefit, index) => (
              <div key={index} className="flex items-start">
                <div className="mr-1.5 mt-0.5 rounded-full bg-green-50 p-0.5">
                  <Check className="h-3 w-3 text-green-600" />
                </div>
                <span className="text-xs text-gray-600">{benefit}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex items-center justify-between gap-2">
            {/* Price section */}
            <div className="flex flex-col">
              {discount ? (
                <>
                  <span className="text-xs text-gray-500 line-through">${price.toFixed(2)}</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${discountedPrice.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="font-semibold text-gray-900 dark:text-white">${price.toFixed(2)}</span>
              )}
            </div>

            {/* Add to cart button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="sm"
                variant={isAdding ? "green" : "primary"}
                rounded="full"
                onClick={handleAddToCart}
              >
                {isAdding ? (
                  <Check className="mr-1 h-4 w-4" />
                ) : (
                  <ShoppingCart className="mr-1 h-4 w-4" />
                )}
                {isAdding ? "Added" : "Add to Cart"}
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Info Dialog */}
      <Dialog open={infoDialogOpen} onOpenChange={setInfoDialogOpen}>
        {activeInfo && (
          <DialogContent className="sm:max-w-[500px] p-6 bg-white border border-gray-200">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-gray-900">
                {activeInfo.title}
              </DialogTitle>
              <p className="text-sm text-gray-500 mt-1">
                For {name}
              </p>
            </DialogHeader>
            
            <div className="mt-4 text-gray-700">
              <p className="whitespace-pre-line">{activeInfo.content}</p>
            </div>
            
            <DialogFooter className="mt-6">
              <Button
                variant="outlineGreen"
                rounded="full"
                onClick={() => setInfoDialogOpen(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}; 