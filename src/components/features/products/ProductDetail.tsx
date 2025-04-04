'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Heart, Share, Star, Check, Info, ArrowLeft, Plus, Minus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/context/cart-context';
import { cn } from '@/lib/utils';
import { getRatingAriaLabel, getPriceAriaLabel, getQuantityAriaLabel } from '@/lib/accessibility';
import { VisuallyHidden } from '@/components/ui/accessible-label';

interface ProductDetailsProps {
  product: Product;
  relatedProducts?: Product[];
  className?: string;
}

export function ProductDetail({ product, relatedProducts = [], className }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { toast } = useToast();
  const { addItem } = useCart();

  // Memoize category colors to prevent recalculation on each render
  const colors = useMemo(() => {
    const getCategoryColors = (category: Product['category']) => {
      switch (category) {
        case 'health':
          return {
            primary: 'green',
            accent: 'emerald',
            gradient: 'from-green-600 to-emerald-500'
          };
        case 'beauty':
          return {
            primary: 'purple',
            accent: 'fuchsia',
            gradient: 'from-purple-600 to-fuchsia-500'
          };
        case 'sport':
          return {
            primary: 'blue',
            accent: 'sky',
            gradient: 'from-blue-600 to-sky-500'
          };
        case 'hybrid':
          return {
            primary: 'amber',
            accent: 'yellow',
            gradient: 'from-amber-700 to-amber-600'
          };
        default:
          return {
            primary: 'gray',
            accent: 'slate',
            gradient: 'from-gray-600 to-slate-500'
          };
      }
    };
    
    return getCategoryColors(product.category);
  }, [product.category]);

  // Use callbacks for event handlers to prevent recreating functions on each render
  const incrementQuantity = useCallback(() => {
    if (quantity < (product.stock || 10)) {
      setQuantity(prev => prev + 1);
    }
  }, [quantity, product.stock]);

  const decrementQuantity = useCallback(() => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  }, [quantity]);

  const handleAddToCart = useCallback(() => {
    addItem(product, quantity);
    toast({
      title: 'Added to Cart',
      description: `${quantity} × ${product.name} added to your cart.`,
    });
  }, [addItem, product, quantity, toast]);

  const toggleWishlist = useCallback(() => {
    setIsWishlisted(prev => !prev);
    toast({
      title: isWishlisted ? 'Removed from Wishlist' : 'Added to Wishlist',
      description: `${product.name} has been ${isWishlisted ? 'removed from' : 'added to'} your wishlist.`,
    });
  }, [isWishlisted, product.name, toast]);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing product', error);
      }
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Link Copied',
        description: 'Product link copied to clipboard',
      });
    }
  }, [product.name, product.description, toast]);

  // Memoize the product gallery component
  const ProductGallery = useMemo(() => (
    <div className="space-y-3 md:space-y-4">
      <h2 className="sr-only">Product Gallery</h2>
      <div className="relative aspect-square overflow-hidden rounded-lg border bg-gray-100">
        <Image
          src={product.images[selectedImage] || product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          className="object-contain p-4"
          aria-describedby="selected-image-description"
        />
        <VisuallyHidden id="selected-image-description">
          Selected image {selectedImage + 1} of {product.images.length} for {product.name}
        </VisuallyHidden>
        
        {product.discount && (
          <div 
            className={`absolute top-4 left-4 z-10 rounded-full px-3 py-1.5 text-xs font-medium text-white bg-${colors.primary}-600`}
            aria-label={`${product.discount}% discount`}
          >
            Save {product.discount}%
          </div>
        )}
        
        {product.new && (
          <div 
            className="absolute top-4 right-4 z-10 rounded-full px-3 py-1.5 text-xs font-medium text-white bg-indigo-600"
            aria-label="New product"
          >
            New
          </div>
        )}
      </div>
      
      {/* Thumbnail Gallery - Improved for mobile */}
      {product.images.length > 1 && (
        <div 
          role="region" 
          aria-label="Product image thumbnails" 
          className="flex space-x-2 overflow-x-auto pb-2 snap-x scrollbar-thin scrollbar-thumb-gray-300 -mx-1 px-1"
        >
          {product.images.map((image, index) => {
            const isSelected = selectedImage === index;
            return (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={cn(
                  "relative aspect-square overflow-hidden rounded-md flex-shrink-0 w-16 sm:w-20",
                  isSelected 
                    ? `ring-2 ring-${colors.primary}-600` 
                    : "ring-1 ring-gray-200 hover:ring-gray-300"
                )}
                aria-label={`View ${product.name} thumbnail ${index + 1}${isSelected ? ' (selected)' : ''}`}
              >
                <Image
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 20vw, 10vw"
                  quality={80}
                  loading="lazy"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  ), [selectedImage, product.images, product.image, product.name, product.discount, product.new, colors.primary]);

  // Memoize the product details tabs
  const ProductTabs = useMemo(() => (
    <Tabs defaultValue="details" className="w-full mt-8">
      <TabsList className="w-full grid grid-cols-3 mb-4">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="usage">Usage</TabsTrigger>
        <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
      </TabsList>
      <TabsContent value="details" className="text-sm text-gray-600 leading-relaxed space-y-3">
        <p>{product.longDescription || product.description}</p>
        {product.features && (
          <ul className="list-disc pl-5 space-y-1 mt-3">
            {product.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        )}
      </TabsContent>
      <TabsContent value="usage" className="text-sm text-gray-600 leading-relaxed space-y-3">
        <p>{product.usage || "Apply as needed or as directed by your healthcare professional. Start with a small amount and adjust based on your body's response."}</p>
        <div className="bg-gray-50 p-3 rounded-md border border-gray-100 flex items-start mt-2">
          <Info className={`text-${colors.primary}-500 w-5 h-5 mt-0.5 mr-2 flex-shrink-0`} />
          <p className="text-xs">For topical use only. Avoid contact with eyes. Discontinue use if irritation occurs. Keep out of reach of children. Consult with a physician before use if you are pregnant or nursing.</p>
        </div>
      </TabsContent>
      <TabsContent value="ingredients" className="text-sm text-gray-600 leading-relaxed">
        <p className="mb-3">{product.ingredients || "Our products contain premium CBD extract along with natural ingredients. All products are lab tested for purity and potency."}</p>
        {product.ingredientList && (
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">Key Ingredients:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {product.ingredientList.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
        )}
      </TabsContent>
    </Tabs>
  ), [product.longDescription, product.description, product.features, product.usage, product.ingredients, product.ingredientList, colors.primary]);

  // Memoize related products section
  const RelatedProducts = useMemo(() => {
    if (relatedProducts.length === 0) return null;
    
    return (
      <div className="mt-12 pt-8 border-t">
        <h2 className="text-xl font-bold mb-4">You May Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.map((relProduct) => (
            <Link 
              href={`/shop/${relProduct.id}`} 
              key={relProduct.id}
              className="group block"
            >
              <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100 mb-2">
                <Image
                  src={relProduct.image}
                  alt={relProduct.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  loading="lazy"
                />
              </div>
              <h3 className="text-sm font-medium text-gray-900 group-hover:text-green-600 truncate">{relProduct.name}</h3>
              <p className="text-sm text-gray-500">${relProduct.price.toFixed(2)}</p>
            </Link>
          ))}
        </div>
      </div>
    );
  }, [relatedProducts]);

  return (
    <div className={cn("bg-white", className)}>
      <div className="container mx-auto px-4 py-6 md:py-8">
        <Link 
          href="/shop" 
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4 md:mb-6"
          aria-label="Return to shop page"
        >
          <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
          Back to Shop
        </Link>
        
        {/* Skip link for keyboard users */}
        <a href="#product-actions" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-4 focus:shadow-lg focus:outline-none">
          Skip to product actions
        </a>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Product Gallery */}
          {ProductGallery}
          
          {/* Product Information */}
          <div className="flex flex-col space-y-4 md:space-y-6">
            {/* Product header section */}
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
              <div className="flex flex-wrap items-center gap-2 mt-1 mb-2">
                <div className="flex items-center" aria-label={getRatingAriaLabel(product.rating, product.reviewCount)}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4 sm:h-5 sm:w-5",
                        i < Math.floor(product.rating) 
                          ? `fill-yellow-400 text-yellow-400` 
                          : i < product.rating 
                            ? "fill-yellow-400 text-yellow-400 fill-[50%]" 
                            : "fill-gray-200 text-gray-200"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.reviewCount} reviews)</span>
                
                {product.inStock && (
                  <span className="text-sm text-green-600 flex items-center ml-auto sm:ml-2" aria-live="polite">
                    <Check className="w-4 h-4 mr-1" aria-hidden="true" />
                    In Stock
                  </span>
                )}
              </div>
            </div>
            
            {/* Price section */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span 
                className="text-2xl font-bold text-gray-900" 
                aria-label={getPriceAriaLabel(product.price, product.discountPrice)}
              >
                ${product.discountPrice ? product.discountPrice.toFixed(2) : product.price.toFixed(2)}
              </span>
              
              {product.discountPrice && (
                <span className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
              )}
              
              {product.discountPrice && (
                <span className={`text-sm text-${colors.primary}-600 font-medium`}>
                  Save ${(product.price - product.discountPrice).toFixed(2)}
                </span>
              )}
            </div>
            
            {/* Stock & Shipping info */}
            <div className="flex flex-col space-y-2">
              <div className="flex items-center text-sm" role="status" aria-live="polite">
                <Check className={`h-4 w-4 mr-2 text-${colors.primary}-500`} aria-hidden="true" />
                <span className="text-gray-700">
                  {product.stock > 0 ? (
                    <>
                      <span className="font-medium">In Stock</span> - Ships within 1-2 business days
                    </>
                  ) : (
                    <>
                      <span className="font-medium">Out of Stock</span> - Pre-order available
                    </>
                  )}
                </span>
              </div>
              
              {product.freeShipping && (
                <div className="flex items-center text-sm">
                  <Check className={`h-4 w-4 mr-2 text-${colors.primary}-500`} aria-hidden="true" />
                  <span className="text-gray-700">
                    <span className="font-medium">Free Shipping</span> on orders over $50
                  </span>
                </div>
              )}
            </div>
            
            {/* Product details - cbd strength, size, etc */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              {product.strength && (
                <div className="border rounded p-3">
                  <div className="text-gray-500 mb-1">Strength</div>
                  <div className="font-medium">{product.strength}</div>
                </div>
              )}
              {product.size && (
                <div className="border rounded p-3">
                  <div className="text-gray-500 mb-1">Size</div>
                  <div className="font-medium">{product.size}</div>
                </div>
              )}
              {product.servings && (
                <div className="border rounded p-3">
                  <div className="text-gray-500 mb-1">Servings</div>
                  <div className="font-medium">{product.servings}</div>
                </div>
              )}
              {product.type && (
                <div className="border rounded p-3">
                  <div className="text-gray-500 mb-1">Type</div>
                  <div className="font-medium">{product.type}</div>
                </div>
              )}
            </div>
            
            {/* Quantity selector & Add to cart */}
            <div id="product-actions" className="mt-2">
              <div className="mb-4">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className={cn(
                      "rounded-l-md border border-r-0 p-2 focus:outline-none focus:ring-2 focus:ring-offset-2",
                      quantity <= 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50",
                      `focus:ring-${colors.primary}-500`
                    )}
                    aria-label="Decrease quantity"
                    aria-controls="quantity"
                  >
                    <Minus className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <input
                    id="quantity"
                    type="number"
                    min="1"
                    max={product.stock || 10}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock || 10, parseInt(e.target.value) || 1)))}
                    className="w-16 text-center border-t border-b p-2 focus:outline-none focus:ring-0 focus:border-gray-300 text-sm"
                    aria-label={getQuantityAriaLabel(quantity)}
                  />
                  <button
                    type="button"
                    onClick={incrementQuantity}
                    disabled={quantity >= (product.stock || 10)}
                    className={cn(
                      "rounded-r-md border border-l-0 p-2 focus:outline-none focus:ring-2 focus:ring-offset-2",
                      quantity >= (product.stock || 10) ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50",
                      `focus:ring-${colors.primary}-500`
                    )}
                    aria-label="Increase quantity"
                    aria-controls="quantity"
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={handleAddToCart} 
                  className={`bg-${colors.primary}-600 hover:bg-${colors.primary}-700 text-white w-full`}
                  size="lg"
                  aria-label={`Add ${quantity} ${product.name} to your cart`}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" aria-hidden="true" />
                  Add to Cart
                </Button>
                <div className="flex gap-2">
                  <Button 
                    onClick={toggleWishlist} 
                    variant="outline" 
                    size="lg"
                    aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
                  >
                    <Heart 
                      className={cn(
                        "h-5 w-5", 
                        isWishlisted ? `fill-${colors.primary}-500 text-${colors.primary}-500` : "text-gray-600"
                      )} 
                      aria-hidden="true"
                    />
                  </Button>
                  <Button 
                    onClick={handleShare} 
                    variant="outline" 
                    size="lg"
                    aria-label={`Share ${product.name}`}
                  >
                    <Share className="h-5 w-5 text-gray-600" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Product tabs section */}
            {ProductTabs}
          </div>
        </div>
        
        {/* Related products section */}
        {RelatedProducts}
      </div>
    </div>
  );
} 