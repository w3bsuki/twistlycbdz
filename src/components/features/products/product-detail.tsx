'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, Star, ShoppingCart, Check } from 'lucide-react';
import { type Product } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/cart-context';
import { useToast } from "@/hooks/use-toast";

interface ProductDetailProps {
  product: Product;
  relatedProducts?: Product[];
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ 
  product, 
  relatedProducts = [] 
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem, state } = useCart();
  const { toast } = useToast();

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    console.log('Add to cart clicked from product detail page for:', product.name, 'quantity:', quantity);
    setIsAdding(true);
    
    try {
      addItem(product, quantity);
      console.log('Added to cart, current cart state:', state?.items?.length || 0);
      
      toast({
        title: "Added to cart",
        description: `${quantity} ${quantity === 1 ? 'item' : 'items'} of ${product.name} has been added to your cart.`,
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

  return (
    <div className="container mx-auto px-4 py-10">
      <Link 
        href="/shop" 
        className="inline-flex items-center mb-6 text-sm font-medium text-gray-600 hover:text-green-700"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back to Shop
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={90}
            />
          </div>
          
          {/* Thumbnail gallery */}
          <div className="grid grid-cols-5 gap-2 mt-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={cn(
                  "relative aspect-square overflow-hidden rounded-md",
                  selectedImage === index ? "ring-2 ring-green-600" : "ring-1 ring-gray-200"
                )}
              >
                <Image
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 20vw, 10vw"
                  quality={80}
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product details */}
        <div>
          <div className="mb-4">
            <Badge className="mb-2 bg-green-100 text-green-800 hover:bg-green-200">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </Badge>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-4 h-4",
                      i < Math.floor(product.rating) 
                        ? "text-yellow-400 fill-yellow-400" 
                        : "text-gray-300"
                    )}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">{product.rating} ({product.reviewCount} reviews)</span>
              </div>
            </div>
            
            <div className="mb-6">
              {product.discount ? (
                <div className="flex items-center">
                  <p className="text-3xl font-bold text-gray-900">
                    ${(product.price - (product.price * (product.discount / 100))).toFixed(2)}
                  </p>
                  <p className="ml-3 text-xl text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </p>
                  <Badge className="ml-3 bg-red-100 text-red-800 hover:bg-red-200">
                    {product.discount}% OFF
                  </Badge>
                </div>
              ) : (
                <p className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
              )}
            </div>
            
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            <div>
              <div className="flex items-center mb-4">
                <span className="mr-3 text-sm font-medium text-gray-900">Size:</span>
                <span className="text-sm text-gray-600">{product.details.size}</span>
              </div>
              
              <div className="flex items-center mb-4">
                <span className="mr-3 text-sm font-medium text-gray-900">Concentration:</span>
                <span className="text-sm text-gray-600">{product.details.concentration}</span>
              </div>
              
              <div className="mb-4">
                <span className="block mb-2 text-sm font-medium text-gray-900">Quantity:</span>
                <div className="flex items-center border rounded-md w-fit">
                  <button
                    onClick={decreaseQuantity}
                    className="px-3 py-1 border-r text-gray-600 hover:bg-gray-100"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-1">{quantity}</span>
                  <button
                    onClick={increaseQuantity}
                    className="px-3 py-1 border-l text-gray-600 hover:bg-gray-100"
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="flex items-center text-sm mb-4">
                <span className={cn(
                  "flex items-center",
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                )}>
                  {product.stock > 0 ? (
                    <>
                      <span className="h-2 w-2 rounded-full bg-green-600 mr-1.5"></span>
                      In Stock
                    </>
                  ) : (
                    <>
                      <span className="h-2 w-2 rounded-full bg-red-600 mr-1.5"></span>
                      Out of Stock
                    </>
                  )}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                size="lg" 
                className={cn(
                  "flex items-center justify-center transition-all",
                  isAdding ? "bg-green-600 hover:bg-green-700" : "bg-green-700 hover:bg-green-800"
                )}
                disabled={product.stock === 0 || isAdding}
                onClick={handleAddToCart}
              >
                {isAdding ? (
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
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-green-700 text-green-700 hover:bg-green-50"
              >
                Buy Now
              </Button>
            </div>
          </div>
          
          {/* Product tabs */}
          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="mt-4 text-gray-600">
              <h3 className="font-medium mb-2">Product Details</h3>
              <p className="mb-3">{product.description}</p>
              <h4 className="font-medium mt-4 mb-2">How to Use</h4>
              <p>{product.details.usage}</p>
            </TabsContent>
            
            <TabsContent value="ingredients" className="mt-4 text-gray-600">
              <h3 className="font-medium mb-2">Ingredients</h3>
              <ul className="list-disc pl-5 space-y-1">
                {product.details.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </TabsContent>
            
            <TabsContent value="benefits" className="mt-4 text-gray-600">
              <h3 className="font-medium mb-2">Benefits</h3>
              <ul className="list-disc pl-5 space-y-1">
                {product.details.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}; 