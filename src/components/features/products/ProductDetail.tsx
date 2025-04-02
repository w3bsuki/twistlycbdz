'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
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

  // Extract primary and accent colors based on product category
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

  const colors = getCategoryColors(product.category);

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
  };

  const toggleWishlist = () => {
    setIsWishlisted(prev => !prev);
    toast({
      title: isWishlisted ? 'Removed from Wishlist' : 'Added to Wishlist',
      description: `${product.name} has been ${isWishlisted ? 'removed from' : 'added to'} your wishlist.`,
    });
  };

  const handleShare = async () => {
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
  };

  return (
    <div className={cn("bg-white", className)}>
      <div className="container mx-auto px-4 py-6 md:py-8">
        <Link href="/shop" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4 md:mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shop
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Product Gallery */}
          <div className="space-y-3 md:space-y-4">
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
                <div className={`absolute top-4 left-4 z-10 rounded-full px-3 py-1.5 text-xs font-medium text-white bg-${colors.primary}-600`}
                     aria-label={`${product.discount}% discount`}>
                  Save {product.discount}%
                </div>
              )}
              
              {product.new && (
                <div className="absolute top-4 right-4 z-10 rounded-full px-3 py-1.5 text-xs font-medium text-white bg-indigo-600"
                     aria-label="New product">
                  New
                </div>
              )}
            </div>
            
            {/* Thumbnail Gallery - Improved for mobile */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2 snap-x -mx-1 px-1">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "relative h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 overflow-hidden rounded-md border bg-gray-100 transition-all snap-start",
                      selectedImage === index ? `border-${colors.primary}-500 ring-2 ring-${colors.primary}-200` : "border-gray-200 hover:border-gray-300"
                    )}
                    title={`View ${product.name} - Image ${index + 1}`}
                    aria-label={`View ${product.name} - Image ${index + 1}`}
                    aria-current={selectedImage === index ? "true" : "false"}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - Image ${index + 1}`}
                      fill
                      sizes="(max-width: 640px) 64px, 80px"
                      className="object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Information */}
          <div className="flex flex-col space-y-4 md:space-y-6">
            {/* Product header section */}
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
              <div className="flex items-center mt-1 mb-2">
                <div className="flex items-center" aria-label={getRatingAriaLabel(product.rating, product.reviewCount)}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4 mr-1",
                        i < Math.floor(product.rating)
                          ? `fill-${colors.primary}-500 text-${colors.primary}-500`
                          : "fill-gray-200 text-gray-200"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">
                  {product.rating.toFixed(1)} ({product.reviewCount})
                </span>
              </div>
            </div>
            
            {/* Price section */}
            <div className="flex items-center space-x-3">
              <span className="text-2xl sm:text-3xl font-bold text-gray-900" aria-label={getPriceAriaLabel(product.price)}>
                ${product.price.toFixed(2)}
              </span>
              
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through" aria-label={`Original price: ${getPriceAriaLabel(product.originalPrice)}`}>
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              
              {product.discount && (
                <span className={`text-sm font-medium text-${colors.primary}-600 px-2 py-1 bg-${colors.primary}-50 rounded-full`}>
                  {product.discount}% off
                </span>
              )}
            </div>
              
            {/* Stock & Shipping info */}
            <div className="flex flex-col space-y-2">
              <div className="flex items-center text-sm">
                <Check className={`h-4 w-4 mr-2 text-${colors.primary}-500`} aria-hidden="true" />
                <span className="text-gray-700">
                  {product.stock > 0 ? (
                    <>
                      <span className="font-medium">In Stock</span> - Ships within 1-2 business days
                    </>
                  ) : (
                    <span className="font-medium text-red-500">Out of Stock</span>
                  )}
                </span>
              </div>
              <div className="flex items-center text-sm">
                <Info className="h-4 w-4 mr-2 text-gray-400" aria-hidden="true" />
                <span className="text-gray-600">Free shipping on orders over $50</span>
              </div>
            </div>
            
            {/* Quantity & Add to cart */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 mt-2">
              <div className="flex items-center border rounded-md overflow-hidden">
                <button 
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="flex items-center justify-center w-10 h-10 bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <div className="w-12 h-10 flex items-center justify-center font-medium border-x">
                  <span aria-label={getQuantityAriaLabel(quantity)}>{quantity}</span>
                </div>
                <button 
                  onClick={incrementQuantity}
                  disabled={quantity >= (product.stock || 10)}
                  className="flex items-center justify-center w-10 h-10 bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              
              <div className="flex flex-1 w-full gap-2">
                <Button 
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className={cn("flex-1 text-white ", product.stock > 0 ? `bg-${colors.primary}-600 hover:bg-${colors.primary}-700` : "bg-gray-300 cursor-not-allowed")}
                  aria-label={`Add ${quantity} ${quantity === 1 ? 'item' : 'items'} to cart`}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" aria-hidden="true" />
                  Add to Cart
                </Button>
                
                <Button
                  onClick={toggleWishlist}
                  variant="outline"
                  className={cn(
                    "p-3", 
                    isWishlisted ? `border-${colors.primary}-600 text-${colors.primary}-600` : "border-gray-300 text-gray-700"
                  )}
                  aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
                  aria-pressed={isWishlisted}
                >
                  <Heart className={cn("h-5 w-5", isWishlisted && "fill-current")} />
                </Button>
                
                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="p-3 border-gray-300 text-gray-700"
                  aria-label={`Share ${product.name}`}
                >
                  <Share className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {/* Product description */}
            <div className="prose prose-sm max-w-none text-gray-700 mt-2">
              <p>{product.description}</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Size</span>
                <span className="text-sm font-medium">{product.details.size}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Concentration</span>
                <span className={`bg-${colors.primary}-100 text-${colors.primary}-700 text-sm font-medium px-2.5 py-0.5 rounded-md`}>
                  {product.details.concentration}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Availability</span>
                <span className={`flex items-center text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock > 0 ? (
                    <>
                      <Check className="mr-1 h-4 w-4" />
                      In Stock ({product.stock})
                    </>
                  ) : (
                    <>
                      <Info className="mr-1 h-4 w-4" />
                      Out of Stock
                    </>
                  )}
                </span>
              </div>
            </div>
            
            <div className="border-t pt-6 mt-2">
              <Tabs defaultValue="details">
                <TabsList className="w-full">
                  <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
                  <TabsTrigger value="usage" className="flex-1">Usage</TabsTrigger>
                  <TabsTrigger value="ingredients" className="flex-1">Ingredients</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="pt-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Benefits</h3>
                    <ul className="space-y-2">
                      {product.details.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <Check className={`mr-2 h-5 w-5 text-${colors.primary}-500 flex-shrink-0 mt-0.5`} />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {product.details.forWho && (
                      <>
                        <h3 className="text-lg font-medium text-gray-900 pt-2">For Who</h3>
                        <p className="text-gray-600">{product.details.forWho}</p>
                      </>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="usage" className="pt-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Recommended Usage</h3>
                      <p className="text-gray-600 mt-1">{product.details.usage}</p>
                    </div>
                    
                    {product.details.dosage && (
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Dosage</h3>
                        <p className="text-gray-600 mt-1">{product.details.dosage}</p>
                      </div>
                    )}
                    
                    {product.details.usageTime && (
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Best Time to Use</h3>
                        <p className="text-gray-600 mt-1">{product.details.usageTime}</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="ingredients" className="pt-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Ingredients</h3>
                    <ul className="space-y-1">
                      {product.details.ingredients.map((ingredient, index) => (
                        <li key={index} className="text-gray-600">{ingredient}</li>
                      ))}
                    </ul>
                    
                    {product.details.additionalInfo && (
                      <>
                        <h3 className="text-lg font-medium text-gray-900 pt-2">Additional Information</h3>
                        <p className="text-gray-600">{product.details.additionalInfo}</p>
                      </>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link 
                  key={relatedProduct.id} 
                  href={`/shop/${relatedProduct.id}`}
                  className="group"
                >
                  <div className="rounded-lg border bg-white overflow-hidden transition-all hover:shadow-md">
                    <div className="relative h-48 bg-gray-100">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-contain p-4 transition-all group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-gray-900">
                          {relatedProduct.discountPrice ? (
                            <>
                              ${relatedProduct.discountPrice.toFixed(2)}
                              <span className="ml-1 text-sm font-normal text-gray-500 line-through">${relatedProduct.price.toFixed(2)}</span>
                            </>
                          ) : (
                            `$${relatedProduct.price.toFixed(2)}`
                          )}
                        </span>
                        <div className="flex items-center">
                          <Star className={`h-4 w-4 fill-${colors.primary}-500 text-${colors.primary}-500`} />
                          <span className="ml-1 text-sm text-gray-600">{relatedProduct.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 