import React, { useState, useId } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/products';
import { cn, formatPrice } from '@/lib/utils';
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
  
  // Generate unique IDs for accessibility
  const productId = useId();
  const ratingId = useId();
  const priceId = useId();
  
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
        role="group"
        aria-labelledby={productId}
        aria-describedby={priceId}
      >
        <div className="absolute right-3 top-3 z-10 flex flex-col gap-2">
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-green-600 dark:bg-gray-900/80 dark:hover:bg-gray-900"
            onClick={handleWishlist}
            aria-label={`Add ${name} to wishlist`}
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-green-600 dark:bg-gray-900/80 dark:hover:bg-gray-900"
            onClick={handleQuickView}
            aria-label={`Quick view of ${name}`}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>

        <Link 
          href={`/shop/${id}`} 
          className="relative overflow-hidden bg-gray-100 dark:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 rounded-t-lg"
          aria-describedby={`${productId} ${priceId} ${ratingId}`}
        >
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

          {(isNew || discount || isFeatured) && (
            <div className="absolute left-3 top-3 flex flex-col gap-1">
              {isNew && (
                <Badge variant="secondary" className="bg-blue-500 hover:bg-blue-600 text-white">New</Badge>
              )}
              {discount && (
                <Badge variant="destructive">-{discount}%</Badge>
              )}
              {isFeatured && (
                <Badge variant="outline" className="bg-amber-500 hover:bg-amber-600 text-white border-amber-400">
                  <Award className="mr-1 h-3 w-3" />
                  Featured
                </Badge>
              )}
            </div>
          )}

          {category && (
            <div className="absolute bottom-3 left-3">
              <Badge 
                variant="outline" 
                className="bg-black/60 hover:bg-black/70 text-white backdrop-blur-sm border-white/10"
              >
                {category}
              </Badge>
            </div>
          )}

          <div 
            className={cn(
              "absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity",
              isHovering ? "opacity-100" : "opacity-0"
            )}
          >
            <span className="sr-only">View product details</span>
          </div>
        </Link>

        <div className="flex flex-1 flex-col p-4">
          <div className="mb-2 flex items-center gap-2">
            <div 
              className="flex items-center gap-0.5" 
              role="img" 
              aria-label={`Rated ${rating} out of 5 stars`}
              id={ratingId}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i} 
                  className={cn(
                    "h-4 w-4",
                    i < Math.floor(rating) 
                      ? "fill-yellow-400 text-yellow-400" 
                      : i < rating 
                        ? "fill-yellow-400/50 text-yellow-400/50" 
                        : "fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700"
                  )}
                  aria-hidden="true"
                />
              ))}
            </div>
            {reviewCount && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                ({reviewCount})
              </span>
            )}
          </div>

          <h3 
            id={productId}
            className="mb-1 line-clamp-1 text-lg font-medium text-gray-900 dark:text-gray-50"
          >
            {name}
          </h3>

          {potency && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              {potency}
            </p>
          )}

          <div className="mt-auto">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5" id={priceId}>
                <span className={cn(
                  "text-lg font-bold",
                  discount ? "text-red-600 dark:text-red-400" : "text-gray-900 dark:text-gray-50"
                )}>
                  {formatPrice(discountedPrice)}
                </span>
                {discount && (
                  <span className="text-sm text-gray-500 line-through dark:text-gray-400">
                    {formatPrice(price)}
                  </span>
                )}
              </div>

              <Button 
                size="sm" 
                variant={isAdding ? "success" : "default"}
                className={cn(
                  "h-8 w-8 rounded-full p-0",
                  isAdding ? "bg-green-600 text-white hover:bg-green-700" : "" 
                )}
                onClick={handleAddToCart}
                aria-label={`Add ${name} to cart`}
                disabled={isAdding}
              >
                {isAdding ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
              </Button>
            </div>

            {/* Additional info buttons */}
            {getInfoButtons().length > 0 && (
              <div className="flex flex-wrap gap-1">
                {getInfoButtons().map((btn) => (
                  <TooltipProvider key={btn.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="xs" 
                          className="h-6 rounded-full border-gray-200 px-2 text-xs text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                          onClick={(e) => handleInfoButtonClick(e, btn.label, btn.content)}
                          aria-label={`${btn.label} information for ${name}`}
                        >
                          {btn.icon}
                          <span className="ml-1">{btn.label}</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">{btn.content.substring(0, 60)}...</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Info dialog */}
      <Dialog open={infoDialogOpen} onOpenChange={setInfoDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{activeInfo?.title}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>{activeInfo?.content}</p>
          </div>
          <DialogFooter>
            <Button 
              onClick={() => setInfoDialogOpen(false)}
              className="w-full sm:w-auto"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}; 