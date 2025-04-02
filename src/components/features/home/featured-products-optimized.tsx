/**
 * FeaturedProducts Component (Optimized)
 * 
 * Enhanced version of the original FeaturedProducts component that maintains the same
 * visual design but uses our new hooks for improved performance and state management.
 */

"use client";

import React, { useState, useCallback, useMemo, memo } from "react";
import { ChevronRight, AlertCircle, ShoppingCart, Heart, Star, Eye, Info, Droplet, Check, ArrowRight, Sparkles, Package, BadgePercent, Award, Tag, Grid2X2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/products";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/cart-context";
import { useProductData } from "@/hooks/use-product-data";
import { useAnimationConfig, fadeInUpVariants, staggerContainerVariants } from "@/hooks";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { Container } from "@/components/ui/container";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// Type for product categories
type ProductCategory = 'all' | 'health' | 'beauty' | 'sport' | 'hybrid' | 'pet';

// Get color for category - memoized utility function
const getCategoryColor = (category: string): string => {
  switch(category) {
    case 'health': return 'green';
    case 'beauty': return 'purple';
    case 'sport': return 'blue';
    case 'hybrid': return 'amber';
    case 'pet': return 'indigo';
    default: return 'green';
  }
};

// Memoized section header component
const ProductsHeader = memo(function ProductsHeader({
  activeCategory,
  handleCategoryChange,
  animConfig
}: {
  activeCategory: ProductCategory,
  handleCategoryChange: (category: ProductCategory) => void,
  animConfig: ReturnType<typeof useAnimationConfig>
}) {
  return (
    <motion.div 
      {...animConfig.getMotionProps({
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true },
        variants: fadeInUpVariants,
      })}
      className="mb-5 sm:mb-6"
    >
      {/* Nested container for the section header - matching category styling */}
      <div className="bg-gradient-to-b from-green-50/80 to-white p-3 sm:p-4 rounded-xl border border-green-100/80 shadow-sm relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20 blur-2xl bg-green-200/30"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full opacity-20 blur-2xl bg-emerald-100/30"></div>
        </div>
        
        <div className="text-center relative z-10">
          {/* Spinning logo with improved styling */}
          <div className="flex justify-center mb-1 sm:mb-1.5">
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full relative bg-transparent transition-all duration-500 shadow-[0_10px_20px_rgba(var(--emerald-rgb)/0.15),_inset_0_0_0_1px_rgba(var(--emerald-rgb)/0.2)] p-0.5">
              <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden bg-transparent after:absolute after:inset-0 after:rounded-full after:shadow-inner">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 20, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center relative z-10"
                >
                  <Sparkles className="h-6 w-6 text-emerald-500 drop-shadow-md" />
                </motion.div>
              </div>
            </div>
          </div>
          
          <div className="relative z-10 px-3 py-1.5 inline-block rounded-lg bg-white/80 backdrop-blur-sm shadow-sm border border-gray-100/50 mb-4">
            <div className="inline-flex bg-gradient-to-br from-green-50/80 to-white rounded-full border border-green-200/40 shadow-sm p-1 mb-1.5">
              <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1.5 text-xs font-medium">
                <Sparkles className="h-3 w-3" />
                <span>Premium Selection</span>
              </div>
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 drop-shadow-sm">
              Featured Products
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto mt-0.5 sm:mt-1">
              Premium CBD products for your wellness journey
            </p>
          </div>
          
          {/* Category Tabs */}
          <Tabs 
            defaultValue="all" 
            value={activeCategory}
            onValueChange={(value) => handleCategoryChange(value as ProductCategory)}
            className="w-full max-w-xl mx-auto"
          >
            <div className="flex justify-center">
              <TabsList className="bg-white/80 backdrop-blur-sm border border-gray-100 p-1 rounded-lg shadow-sm mx-auto">
                <TabsTrigger 
                  value="all"
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200
                    ${activeCategory === 'all' 
                      ? 'bg-green-500 text-white shadow-sm' 
                      : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  All Products
                </TabsTrigger>
                
                <TabsTrigger 
                  value="health"
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200
                    ${activeCategory === 'health' 
                      ? 'bg-green-500 text-white shadow-sm' 
                      : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  Health & Wellness
                </TabsTrigger>
                
                <TabsTrigger 
                  value="beauty"
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200
                    ${activeCategory === 'beauty' 
                      ? 'bg-purple-500 text-white shadow-sm' 
                      : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  Beauty
                </TabsTrigger>
                
                <TabsTrigger 
                  value="sport"
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200
                    ${activeCategory === 'sport' 
                      ? 'bg-blue-500 text-white shadow-sm' 
                      : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  Sports
                </TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </div>
      </div>
    </motion.div>
  );
});

// Product card item animations
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

// Memoized product card component for better performance
const ProductCard = memo(function ProductCard({
  product, 
  handleQuickView, 
  handleAddToCart,
  animConfig
}: {
  product: Product, 
  handleQuickView: (product: Product) => void, 
  handleAddToCart: (product: Product, event: React.MouseEvent) => void,
  animConfig: ReturnType<typeof useAnimationConfig>
}) {
  const categoryColor = getCategoryColor(product.category);
  
  return (
    <motion.div
      variants={animConfig.getVariants(itemVariants)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="h-full"
    >
      <Card 
        className={`group h-full overflow-hidden border-2 relative transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer
          border-${categoryColor}-100 hover:border-${categoryColor}-200 dark:border-${categoryColor}-900 dark:hover:border-${categoryColor}-800`}
        onClick={() => handleQuickView(product)}
      >
        {/* Product badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {product.bestSeller && (
            <Badge className="bg-amber-500 text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1">
              <Award className="h-3 w-3" />
              <span>Best Seller</span>
            </Badge>
          )}
          {product.new && (
            <Badge className="bg-blue-500 text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1">
              <Package className="h-3 w-3" />
              <span>New Arrival</span>
            </Badge>
          )}
          {product.discount && (
            <Badge className="bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1">
              <BadgePercent className="h-3 w-3" />
              <span>{product.discount}% Off</span>
            </Badge>
          )}
        </div>
        
        {/* Quick view button */}
        <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="icon" 
                  variant="secondary" 
                  className="h-8 w-8 rounded-full shadow-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuickView(product);
                  }}
                  aria-label={`Quick view ${product.name}`}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Quick View</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        {/* Product image */}
        <div className="relative overflow-hidden rounded-t-lg">
          <AspectRatio ratio={1} className="w-full">
            <Image
              src="/images/logos/1.png"
              alt={product.name}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </AspectRatio>
        </div>
        
        <CardContent className="p-5 flex flex-col space-y-4">
          {/* Category badge */}
          <div className="flex justify-between items-start">
            <Badge 
              variant="outline" 
              className={`text-xs border-${categoryColor}-200 bg-${categoryColor}-50 text-${categoryColor}-700 dark:border-${categoryColor}-900 dark:bg-${categoryColor}-900/30 dark:text-${categoryColor}-400`}
            >
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </Badge>
            
            <div className="flex" aria-label={`Rated ${product.rating} out of 5 stars with ${product.reviewCount} reviews`}>
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={cn(
                    "h-3.5 w-3.5",
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-200 fill-gray-200"
                  )}
                  aria-hidden="true"
                />
              ))}
              <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
            </div>
          </div>
          
          {/* Product name and description */}
          <div>
            <h3 className={`font-semibold text-base text-gray-900 group-hover:text-${categoryColor}-700 transition-colors mb-1`}>
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
          </div>
          
          {/* Benefits */}
          <div className="space-y-1.5">
            {product.details?.benefits?.slice(0, 2).map((benefit, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <div className={`rounded-full p-0.5 text-${categoryColor}-600 flex-shrink-0 mt-0.5`}>
                  <Check className="h-3 w-3" />
                </div>
                <span className="text-xs text-gray-600">{benefit}</span>
              </div>
            ))}
          </div>
          
          {/* Price and actions */}
          <div className="mt-auto pt-3 flex justify-between items-center border-t border-gray-100">
            <div className="flex flex-col">
              {product.discountPrice ? (
                <>
                  <span className="text-xs text-gray-500 line-through">${product.price.toFixed(2)}</span>
                  <span className={`font-bold text-${categoryColor}-700`}>${product.discountPrice.toFixed(2)}</span>
                </>
              ) : (
                <span className={`font-bold text-${categoryColor}-700`}>${product.price.toFixed(2)}</span>
              )}
            </div>
            
            <Button
              size="sm"
              className={`bg-${categoryColor}-600 hover:bg-${categoryColor}-700 text-white text-xs h-8`}
              onClick={(e) => handleAddToCart(product, e)}
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingCart className="h-3.5 w-3.5 mr-1" />
              Add to Cart
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
});

// Main component
export function FeaturedProducts() {
  // State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [api, setApi] = useState<any>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [topPicksApi, setTopPicksApi] = useState<any>(null);
  const [newestProductsApi, setNewestProductsApi] = useState<any>(null);
  
  // Hooks
  const { toast } = useToast();
  const { addItem } = useCart();
  const animConfig = useAnimationConfig();
  
  // Enhanced auto-scrolling effect for carousel with pause on hover
  React.useEffect(() => {
    if (!api) return;

    // Set up an interval to advance the carousel every 2 seconds
    const interval = setInterval(() => {
      if (!isPaused) {
        api.scrollNext();
      }
    }, 2000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [api, isPaused]);

  // Auto-scrolling for Top Picks carousel
  React.useEffect(() => {
    if (!topPicksApi) return;

    const interval = setInterval(() => {
      topPicksApi.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [topPicksApi]);

  // Auto-scrolling for Newest Products carousel
  React.useEffect(() => {
    if (!newestProductsApi) return;

    const interval = setInterval(() => {
      newestProductsApi.scrollNext();
    }, 3500);

    return () => clearInterval(interval);
  }, [newestProductsApi]);

  // Use our custom hook for product data
  const { 
    products, 
    isLoading, 
    error: hasError, 
    updateFilters,
    refetch 
  } = useProductData({
    initialFilters: {},
    featured: true,
    limit: 8
  });

  // Handle category change
  const handleCategoryChange = useCallback((category: ProductCategory) => {
    setActiveCategory(category);
    if (category === 'all') {
      updateFilters({ category: undefined });
    } else {
      updateFilters({ category });
    }
  }, [updateFilters]);
  
  // Show quick view dialog for a product
  const handleQuickView = useCallback((product: Product) => {
    setSelectedProduct(product);
    setQuickViewOpen(true);
  }, []);
  
  // Add to cart handler
  const handleAddToCart = useCallback((product: Product, event: React.MouseEvent) => {
    event.stopPropagation();
    
    try {
      addItem(product, 1);
      
      toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart.`,
        variant: "default",
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Error",
        description: "There was a problem adding this item to your cart.",
        variant: "destructive",
      });
    }
  }, [addItem, toast]);

  // Get filtered products - now handled by the hook
  const filteredProducts = useMemo(() => {
    return products || [];
  }, [products]);

  if (isLoading) {
    return <FeaturedProductsSkeleton />;
  }

  if (hasError) {
    return (
      <section className="w-full py-12 md:py-16 bg-background" aria-labelledby="error-heading">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center p-8 border border-red-200 rounded-lg bg-red-50">
            <AlertCircle className="h-10 w-10 text-red-500 mb-4" aria-hidden="true" />
            <h2 id="error-heading" className="text-2xl font-semibold text-red-700 mb-2">
              Unable to Load Products
            </h2>
            <p className="text-gray-600 mb-4">
              We're having trouble loading our featured products. Please try again later.
            </p>
            <Button 
              onClick={() => refetch()}
              className="bg-red-600 hover:bg-red-700"
            >
              Retry
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-8 md:py-10 lg:py-12 bg-gradient-to-b from-green-50 to-white">
      {/* Background decoration - simplified for mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-16 -right-16 w-80 h-80 rounded-full opacity-30 blur-3xl bg-green-500/40"></div>
        <div className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full opacity-30 blur-3xl bg-emerald-500/30"></div>
      </div>
      
      {/* Main container - responsive approach */}
      <Container className="relative z-10 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-green-200/90 p-3 sm:p-4 lg:p-5 w-full max-w-6xl mx-auto">
        {/* Header with nested container design */}
        <div className="mb-5 sm:mb-6">
          {/* Nested container for the section header - matching category styling */}
          <div className="bg-gradient-to-b from-green-50/80 to-white p-3 sm:p-4 rounded-xl border border-green-100/80 shadow-sm relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20 blur-2xl bg-green-200/30"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full opacity-20 blur-2xl bg-emerald-100/30"></div>
            </div>
            
            <div className="text-center relative z-10">
              {/* Spinning logo with improved styling */}
              <div className="flex justify-center mb-1 sm:mb-1.5">
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full relative bg-transparent transition-all duration-500 shadow-[0_10px_20px_rgba(var(--emerald-rgb)/0.15),_inset_0_0_0_1px_rgba(var(--emerald-rgb)/0.2)] p-0.5">
                  <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden bg-transparent after:absolute after:inset-0 after:rounded-full after:shadow-inner">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ 
                        duration: 20, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }}
                      className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center relative z-10"
                    >
                      <Image 
                        src="/images/logos/1.png" 
                        alt="Twistly CBD" 
                        width={40} 
                        height={40} 
                        className="w-full h-full object-contain drop-shadow-md" 
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
              
              <div className="relative z-10 px-3 py-1.5 inline-block rounded-lg bg-white/80 backdrop-blur-sm shadow-sm border border-gray-100/50 mb-4">
                <div className="inline-flex bg-gradient-to-br from-green-50/80 to-white rounded-full border border-green-200/40 shadow-sm p-1 mb-1.5">
                  <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1.5 text-xs font-medium">
                    <Sparkles className="h-3 w-3" />
                    <span>Premium Selection</span>
                  </div>
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 drop-shadow-sm">
                  Featured Products
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto mt-0.5 sm:mt-1">
                  Premium CBD products for your wellness journey
                </p>
              </div>
              
              {/* Category Tabs */}
              <Tabs 
                defaultValue="all" 
                value={activeCategory}
                onValueChange={(value) => handleCategoryChange(value as ProductCategory)}
                className="w-full max-w-xl mx-auto"
              >
                <div className="flex justify-center">
                  <TabsList className="bg-white/80 backdrop-blur-sm border border-gray-100 p-1 rounded-lg shadow-sm mx-auto">
                    <TabsTrigger 
                      value="all"
                      className={cn(
                        "px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition-all duration-200",
                        activeCategory === 'all' 
                          ? 'bg-emerald-500 text-white shadow-sm' 
                          : 'text-gray-700 hover:bg-gray-50'
                      )}
                    >
                      All
                    </TabsTrigger>
                    <TabsTrigger 
                      value="health"
                      className={cn(
                        "px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition-all duration-200",
                        activeCategory === 'health' 
                          ? 'bg-green-500 text-white shadow-sm' 
                          : 'text-gray-700 hover:bg-gray-50'
                      )}
                    >
                      Health
                    </TabsTrigger>
                    <TabsTrigger 
                      value="beauty"
                      className={cn(
                        "px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition-all duration-200",
                        activeCategory === 'beauty' 
                          ? 'bg-purple-500 text-white shadow-sm' 
                          : 'text-gray-700 hover:bg-gray-50'
                      )}
                    >
                      Beauty
                    </TabsTrigger>
                    <TabsTrigger 
                      value="sport"
                      className={cn(
                        "px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition-all duration-200",
                        activeCategory === 'sport' 
                          ? 'bg-blue-500 text-white shadow-sm' 
                          : 'text-gray-700 hover:bg-gray-50'
                      )}
                    >
                      Sports
                    </TabsTrigger>
                    <TabsTrigger 
                      value="hybrid"
                      className={cn(
                        "px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition-all duration-200",
                        activeCategory === 'hybrid' 
                          ? 'bg-amber-500 text-white shadow-sm' 
                          : 'text-gray-700 hover:bg-gray-50'
                      )}
                    >
                      Hybrid
                    </TabsTrigger>
                    <TabsTrigger 
                      value="pet"
                      className={cn(
                        "px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition-all duration-200",
                        activeCategory === 'pet' 
                          ? 'bg-indigo-500 text-white shadow-sm' 
                          : 'text-gray-700 hover:bg-gray-50'
                      )}
                    >
                      Pet CBD
                    </TabsTrigger>
                  </TabsList>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
        
        {/* Main content container - optimized for all devices */}
        <div className="bg-gradient-to-br from-emerald-50/70 to-white dark:from-emerald-900/10 dark:to-neutral-900 rounded-lg border border-emerald-200/60 dark:border-emerald-800/20 p-1.5 sm:p-2 overflow-hidden mt-2 shadow-md">
          {/* Responsive grid layout for main product sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3 mb-2 sm:mb-3">
            {/* Top picks container - Full width on mobile, Left column on desktop */}
            <div className="bg-gradient-to-br from-emerald-50/80 to-white dark:from-emerald-900/10 dark:to-neutral-900 rounded-lg border border-emerald-200/60 dark:border-emerald-800/20 p-2 overflow-hidden shadow-md">
              <div className="flex items-center justify-between mb-1.5 px-2">
                <h3 className="text-xs sm:text-sm font-medium text-neutral-900 dark:text-white flex items-center">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 flex items-center justify-center mr-1.5 shadow-sm">
                    <Star className="h-2 w-2 text-white" />
                  </div>
                  Top Picks
                </h3>
                <Link href="/shop/featured" className="text-xs sm:text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1 px-2 py-0.5 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-full">
                  View
                  <ArrowRight className="h-2.5 w-2.5" />
                </Link>
              </div>
              
              {/* Convert grid to carousel */}
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                setApi={setTopPicksApi}
                className="w-full"
              >
                <CarouselContent className="py-1 px-1">
                  {filteredProducts.slice(0, 3).map((product) => (
                    <CarouselItem key={product.id} className="basis-1/2 sm:basis-1/3">
                      <div 
                        className={cn(
                          "relative flex flex-col h-full rounded-lg bg-white/90 overflow-hidden cursor-pointer",
                          "border-2 hover:border-gray-200/90",
                          `border-${getCategoryColor(product.category)}-200/50`,
                          "transition-all duration-300 ease-in-out min-h-[250px]",
                          "shadow-[0_4px_10px_rgba(0,0,0,0.05)]",
                          "hover:shadow-lg hover:translate-y-[-2px]"
                        )}
                        onClick={() => handleQuickView(product)}
                      >
                        {/* Product badges */}
                        {(product.bestSeller || product.new) && (
                          <div className="absolute top-1 right-1 z-10">
                            {product.bestSeller && (
                              <div className="bg-amber-500 text-white w-3.5 h-3.5 rounded-full flex items-center justify-center">
                                <Star className="h-2 w-2 text-white" />
                              </div>
                            )}
                            {product.new && !product.bestSeller && (
                              <div className="bg-blue-500 text-white w-3.5 h-3.5 rounded-full flex items-center justify-center">
                                <span className="text-[7px] font-bold">N</span>
                              </div>
                            )}
                          </div>
                        )}
                        
                        {/* Product image */}
                        <div className="relative overflow-hidden rounded-t-lg">
                          <AspectRatio ratio={1} className="w-full">
                            <Image
                              src="/images/logos/1.png"
                              alt={product.name}
                              fill
                              className="object-contain transition-transform duration-300 group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </AspectRatio>
                        </div>
                        
                        {/* Product content */}
                        <div className="p-1.5 flex flex-col flex-1">
                          <h3 className="text-xs sm:text-sm font-medium text-gray-900 mb-0.5 line-clamp-1">{product.name}</h3>
                          <div className="flex items-center mb-0.5">
                            <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400 mr-0.5" />
                            <span className="text-[9px] text-gray-500">{product.rating}</span>
                          </div>
                          
                          <div className="mt-auto flex items-center justify-between">
                            <div className={cn("font-semibold text-xs", `text-${getCategoryColor(product.category)}-700`)}>
                              ${product.price.toFixed(2)}
                            </div>
                            <button
                              className={cn(
                                "p-1 rounded-full",
                                `bg-${getCategoryColor(product.category)}-100`,
                                `hover:bg-${getCategoryColor(product.category)}-200`,
                                "transition-colors"
                              )}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(product, e);
                              }}
                              aria-label={`Add ${product.name} to cart`}
                            >
                              <ShoppingCart className={cn("h-2.5 w-2.5", `text-${getCategoryColor(product.category)}-600`)} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
            
            {/* Newest Products container - Full width on mobile, Right column on desktop */}
            <div className="bg-gradient-to-br from-blue-50/80 to-white dark:from-blue-900/10 dark:to-neutral-900 rounded-lg border border-blue-200/60 dark:border-blue-800/20 p-2 overflow-hidden shadow-md">
              <div className="flex items-center justify-between mb-1.5 px-2">
                <h3 className="text-xs sm:text-sm font-medium text-neutral-900 dark:text-white flex items-center">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center mr-1.5 shadow-sm">
                    <Tag className="h-2 w-2 text-white" />
                  </div>
                  Newest Products
                </h3>
                <Link href="/shop/new-arrivals" className="text-xs sm:text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1 px-2 py-0.5 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-full">
                  View
                  <ArrowRight className="h-2.5 w-2.5" />
                </Link>
              </div>
              
              {/* Convert grid to carousel */}
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                setApi={setNewestProductsApi}
                className="w-full"
              >
                <CarouselContent className="py-1 px-1">
                  {newestProducts.slice(0, 6).map((product, index) => (
                    <CarouselItem key={`new-${index}`} className="basis-1/2 sm:basis-1/3">
                      <div 
                        className="relative flex flex-col h-full rounded-lg bg-white/90 overflow-hidden cursor-pointer border-2 hover:border-gray-200/90 border-blue-200/50 transition-all duration-300 ease-in-out min-h-[250px] shadow-[0_4px_10px_rgba(0,0,0,0.05)] hover:shadow-lg hover:translate-y-[-2px]"
                        onClick={() => window.location.href = `/product/${product.id}`}
                      >
                        {/* Product badge */}
                        <div className="absolute top-1 right-1 z-10">
                          <div className="bg-blue-500 text-white w-3.5 h-3.5 rounded-full flex items-center justify-center">
                            <span className="text-[7px] font-bold">N</span>
                          </div>
                        </div>
                        
                        {/* Product image */}
                        <div className="relative overflow-hidden rounded-t-lg">
                          <AspectRatio ratio={1} className="w-full">
                            <Image
                              src="/images/logos/1.png"
                              alt={product.name}
                              fill
                              className="object-contain transition-transform duration-300 group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </AspectRatio>
                        </div>
                        
                        {/* Product content */}
                        <div className="p-1.5 flex flex-col flex-1">
                          <h4 className="text-xs sm:text-sm font-medium text-gray-900 mb-0.5 line-clamp-1">{product.name}</h4>
                          <div className="text-[9px] text-gray-500 mb-0.5 line-clamp-1">{product.strength}</div>
                          
                          <div className="mt-auto flex items-center justify-between">
                            <div className="font-semibold text-xs text-blue-700">{product.price}</div>
                            <div className="flex items-center">
                              <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400 mr-0.5" />
                              <span className="text-[9px] text-gray-500">{product.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
          
          {/* More Products Carousel - Optimized for all screen sizes */}
          <div className="bg-gradient-to-br from-amber-50/80 to-white dark:from-amber-900/10 dark:to-neutral-900 rounded-lg border border-amber-200/60 dark:border-amber-800/20 p-1.5 sm:p-2 overflow-hidden mb-2 shadow-md">
            <InfiniteSlider direction="right" speed="slow" className="py-1">
              {filteredProducts.slice(3, 11).map((product) => (
                <div 
                  key={`more-${product.id}`}
                  className="bg-white rounded-lg border-2 border-amber-100/50 shadow-[0_2px_8px_rgba(0,0,0,0.05)] flex flex-col h-full overflow-hidden cursor-pointer mx-1.5 min-h-[100px] w-[100px] sm:w-[130px] hover:shadow-md hover:border-amber-200/80 transition-all duration-300"
                  onClick={() => handleQuickView(product)}
                >
                  <div className="relative pt-0.5 px-0.5">
                    <AspectRatio ratio={1} className="w-full">
                      <Image
                        src="/images/logos/1.png"
                        alt={product.name}
                        fill
                        className="object-contain"
                        priority={true}
                      />
                    </AspectRatio>
                  </div>
                  <div className="p-0.5 text-center">
                    <h4 className="text-[10px] sm:text-xs font-medium text-gray-900 line-clamp-1">{product.name}</h4>
                    <div className="font-semibold text-[10px] sm:text-xs text-emerald-600">${product.price.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </InfiniteSlider>
          </div>
        </div>
      </Container>
      
      {/* Quick view dialog */}
      {selectedProduct && (
        <Dialog open={quickViewOpen} onOpenChange={setQuickViewOpen}>
          <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-white dark:bg-gray-900">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Product image */}
              <div className="relative bg-gradient-to-br from-${getCategoryColor(selectedProduct.category)}-50 to-white dark:from-${getCategoryColor(selectedProduct.category)}-900/30 dark:to-gray-900 p-6">
                <AspectRatio ratio={1} className="w-full max-w-md mx-auto">
                  <Image
                    src="/images/logos/1.png"
                    alt={selectedProduct.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-contain"
                    priority
                  />
                </AspectRatio>
                
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {selectedProduct.bestSeller && (
                    <Badge className="bg-amber-500 text-white">Best Seller</Badge>
                  )}
                  {selectedProduct.new && (
                    <Badge className="bg-blue-500 text-white">New</Badge>
                  )}
                </div>
              </div>
              
              {/* Product details */}
              <div className="p-6 flex flex-col h-full">
                <DialogHeader className="mb-4">
                  <div className="flex justify-between items-start">
                    <DialogTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      {selectedProduct.name}
                    </DialogTitle>
                    <Badge variant="outline" className={`border-${getCategoryColor(selectedProduct.category)}-200 bg-${getCategoryColor(selectedProduct.category)}-50 text-${getCategoryColor(selectedProduct.category)}-700`}>
                      {selectedProduct.category.charAt(0).toUpperCase() + selectedProduct.category.slice(1)}
                    </Badge>
                  </div>
                  <DialogDescription className="text-base mt-1 dark:text-gray-400">
                    {selectedProduct.description}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-5 flex-1">
                  {/* Ratings */}
                  <div className="flex items-center" aria-label={`Rated ${selectedProduct.rating} out of 5 stars with ${selectedProduct.reviewCount} reviews`}>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={cn(
                            "h-4 w-4",
                            i < Math.floor(selectedProduct.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-200 fill-gray-200 dark:text-gray-700 dark:fill-gray-700"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                      {selectedProduct.rating} ({selectedProduct.reviewCount} reviews)
                    </span>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center space-x-3">
                    {selectedProduct.discountPrice ? (
                      <>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          ${selectedProduct.discountPrice.toFixed(2)}
                        </span>
                        <span className="text-lg text-gray-500 line-through">
                          ${selectedProduct.price.toFixed(2)}
                        </span>
                        <Badge variant="destructive">
                          {Math.round(((selectedProduct.price - selectedProduct.discountPrice) / selectedProduct.price) * 100)}% OFF
                        </Badge>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${selectedProduct.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  
                  {/* Benefits */}
                  {selectedProduct.details?.benefits && (
                    <div className="space-y-1.5">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Key Benefits</h4>
                      <ul className="space-y-1.5">
                        {selectedProduct.details.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className={`rounded-full p-0.5 text-${getCategoryColor(selectedProduct.category)}-600 dark:text-${getCategoryColor(selectedProduct.category)}-400 flex-shrink-0 mt-0.5`}>
                              <Check className="h-4 w-4" />
                            </div>
                            <span className="text-sm text-gray-700 dark:text-gray-300">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Usage */}
                  {selectedProduct.details?.usage && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Recommended Usage</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                        {selectedProduct.details.usage}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button 
                    className={`bg-${getCategoryColor(selectedProduct.category)}-600 hover:bg-${getCategoryColor(selectedProduct.category)}-700 text-white`}
                    onClick={(e) => {
                      handleAddToCart(selectedProduct, e);
                      setQuickViewOpen(false);
                    }}
                    aria-label={`Add ${selectedProduct.name} to cart`}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Link href={`/shop/${selectedProduct.id}`}>
                    <Button variant="outline" className="w-full">
                      View Full Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}

/**
 * Loading skeleton for the FeaturedProducts component
 */
function FeaturedProductsSkeleton() {
  return (
    <section className="w-full py-20 md:py-28 relative" aria-label="Loading featured products">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <Skeleton className="h-8 w-40 rounded-full mb-4" />
          <Skeleton className="h-12 w-64 rounded-lg mb-4" />
          <Skeleton className="h-4 w-full max-w-md mb-2" />
          <Skeleton className="h-4 w-full max-w-sm mb-8" />
          <Skeleton className="h-12 w-full max-w-xl rounded-lg" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col overflow-hidden rounded-lg border-2 border-gray-100 h-full">
              <Skeleton className="h-52 w-full" />
              <div className="p-5 space-y-4">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-16 rounded-md" />
                  <Skeleton className="h-4 w-20 rounded-md" />
                </div>
                <Skeleton className="h-5 w-full rounded-md" />
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-3/4 rounded-md" />
                <div className="flex justify-between items-center pt-3">
                  <Skeleton className="h-5 w-16 rounded-md" />
                  <Skeleton className="h-8 w-24 rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-16">
          <Skeleton className="h-12 w-48 rounded-full" />
        </div>
      </div>
    </section>
  );
}

// Sample collections data
const featuredCollections = [
  {
    id: "oils-tinctures",
    name: "Oils & Tinctures",
    image: "/images/tincture.png",
    productCount: 12,
    description: "Premium CBD oils for daily wellness"
  },
  {
    id: "edibles",
    name: "Edibles & Gummies",
    image: "/images/gummies.png", 
    productCount: 8,
    description: "Delicious CBD treats and gummies"
  },
  {
    id: "topicals",
    name: "Topicals & Balms",
    image: "/images/balm.png",
    productCount: 6,
    description: "Targeted relief for muscles and skin"
  },
  {
    id: "pet-products",
    name: "Pet CBD",
    image: "/images/pet-oil.png",
    productCount: 5,
    description: "CBD products formulated for pets"
  },
  {
    id: "bundles",
    name: "Value Bundles",
    image: "/images/bundle.png",
    productCount: 4,
    description: "Save with our curated product sets"
  },
  {
    id: "wellness",
    name: "Wellness",
    image: "/images/wellness.png",
    productCount: 10,
    description: "Support your daily wellness routine"
  }
];

// Newest products data
const newestProducts = [
  {
    id: "cbd-relief-roll-on",
    name: "CBD Relief Roll-On",
    strength: "500mg",
    image: "/images/products/tincture-2.png",
    price: "$34.99",
    rating: 4.9,
    reviews: 23,
  },
  {
    id: "cbd-recovery-balm",
    name: "CBD Recovery Balm",
    strength: "1000mg",
    image: "/images/products/tincture-2.png",
    price: "$54.99",
    rating: 4.7,
    reviews: 17,
  },
  {
    id: "cbd-focus-tincture",
    name: "CBD Focus Tincture",
    strength: "1500mg",
    image: "/images/products/tincture-2.png",
    price: "$69.99",
    rating: 4.8,
    reviews: 12,
  },
  {
    id: "cbd-bath-bombs",
    name: "CBD Bath Bombs",
    strength: "100mg/bomb",
    image: "/images/products/tincture-2.png",
    price: "$24.99",
    rating: 4.6,
    reviews: 32,
  },
  {
    id: "cbd-protein-powder",
    name: "CBD Protein Powder",
    strength: "25mg/serving",
    image: "/images/products/tincture-2.png",
    price: "$49.99",
    rating: 4.5,
    reviews: 9,
  },
  {
    id: "cbd-face-serum",
    name: "CBD Face Serum",
    strength: "250mg",
    image: "/images/products/tincture-2.png",
    price: "$45.99",
    rating: 4.9,
    reviews: 14,
  },
]; 