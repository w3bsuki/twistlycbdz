'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Trash2, Plus, Minus, Heart, ArrowRight, Loader2, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-context';
import Image from 'next/image';
import Link from 'next/link';
import { generateCartScreenReaderText } from '@/lib/accessibility';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet';

// Sample suggested products
const suggestedProducts = [
  {
    id: 'cbd-oil-1',
    name: 'CBD Oil Tincture',
    price: 49.99,
    image: '/images/logos/1.png',
    slug: 'cbd-oil-tincture',
    category: 'Wellness'
  },
  {
    id: 'cbd-cream-1',
    name: 'CBD Pain Relief Cream',
    price: 35.99,
    image: '/images/logos/1.png', 
    slug: 'cbd-pain-relief-cream',
    category: 'Sport'
  },
  {
    id: 'cbd-gummies-1',
    name: 'CBD Sleep Gummies',
    price: 29.99,
    image: '/images/logos/1.png',
    slug: 'cbd-sleep-gummies',
    category: 'Wellness'
  }
];

export function CartDrawer() {
  const { 
    items, 
    savedItems, 
    subtotal, 
    itemCount, 
    isLoading,
    error,
    removeItem, 
    updateQuantity, 
    saveForLater, 
    moveToCart, 
    removeSavedItem,
    openCart,
    closeCart,
    isOpen,
    addItem
  } = useCart();
  
  const [logoRotate, setLogoRotate] = useState(0);
  
  // Animate logo continuously
  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setLogoRotate(prev => prev + 30);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    updateQuantity(id, quantity);
  };

  // Fix for cart issue when saving items for later
  const handleSaveForLater = (id: string) => {
    try {
      saveForLater(id);
    } catch (error) {
      console.error("Error saving item for later:", error);
    }
  };

  // Fix for cart issue when moving items to cart
  const handleMoveToCart = (id: string) => {
    try {
      moveToCart(id);
    } catch (error) {
      console.error("Error moving item to cart:", error);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => open ? openCart() : closeCart()}>
      <SheetTrigger asChild>
        <Button 
          type="button"
          variant="outline" 
          size="icon"
          className="relative h-9 w-9 rounded-full bg-white border-green-200 hover:bg-green-50 hover:text-green-700 transition-colors"
          aria-label={generateCartScreenReaderText(itemCount)}
        >
          <ShoppingCart className="h-[18px] w-[18px]" />
          {itemCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-medium bg-green-600 text-white p-0 border border-white"
            >
              {itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="bottom" 
        className="max-w-md mx-auto rounded-t-xl p-0 max-h-[85vh] border-t border-x border-gray-200"
      >
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-2 mb-1"></div>
        
        {/* Centered spinning logo */}
        <motion.div 
          animate={{ rotate: logoRotate }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
        >
          <div className="bg-white rounded-full p-1 shadow-md border border-gray-200">
            <Image
              src="/images/logos/1.png"
              alt="Twistly CBD"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
        </motion.div>
        
        <SheetHeader className="p-4 border-b sticky top-0 bg-background z-10">
          <div className="flex justify-between items-center">
            <SheetTitle className="font-medium text-left">Your Cart {itemCount > 0 && `(${itemCount})`}</SheetTitle>
            
            <div className="flex items-center gap-3">
              {isLoading && <Loader2 className="h-4 w-4 animate-spin ml-2" />}
            </div>
          </div>
        </SheetHeader>
        
        {error && (
          <Alert variant="destructive" className="m-4 mt-0">
            <AlertDescription className="text-xs">
              {error}. Please try again or refresh the page.
            </AlertDescription>
          </Alert>
        )}
        
        {!isLoading && itemCount === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 px-4 text-center min-h-[30vh]">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 p-4 rounded-full mb-4"
            >
              <ShoppingCart className="h-10 w-10 text-gray-400" />
            </motion.div>
            <h3 className="text-lg font-medium mb-1">Your cart is empty</h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs">
              Looks like you haven't added anything to your cart yet. Browse our products to get started.
            </p>
            <SheetClose asChild>
              <Button size="lg" variant="default" className="bg-green-600 hover:bg-green-700 rounded-full">
                <Link href="/shop" className="flex items-center">
                  Continue Shopping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </SheetClose>
            
            {/* Product suggestions for empty cart */}
            <div className="w-full mt-10">
              <h4 className="text-base font-medium mb-4 flex items-center justify-center">
                <Sparkles className="h-4 w-4 mr-2 text-amber-500" />
                Recommended Products
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {suggestedProducts.slice(0, 2).map(product => (
                  <motion.div
                    key={product.id}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm"
                  >
                    <div className="p-2">
                      <div className="aspect-square relative mb-2">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain p-2"
                          sizes="(max-width: 768px) 50vw, 33vw"
                          loading="lazy"
                        />
                      </div>
                      <h5 className="text-xs font-medium line-clamp-1">{product.name}</h5>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs font-medium">${product.price.toFixed(2)}</span>
                        <Button 
                          size="sm"
                          variant="outline"
                          className="h-7 w-7 p-0 rounded-full border-green-200 hover:bg-green-50 hover:text-green-700"
                          onClick={() => {
                            addItem({...product, images: [product.image], rating: 4.5, stock: 10}, 1);
                          }}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          !isLoading && (
            <>
              <ScrollArea 
                className="flex-1 overflow-y-auto" 
                style={{maxHeight: "40vh"}}
              >
                <ul className="divide-y" aria-label="Cart items">
                  {items.map(item => (
                    <motion.li 
                      key={item.id} 
                      className="p-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex gap-3">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border bg-muted">
                          <Image
                            src={item.images[0]}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between text-sm font-medium">
                            <h4 className="text-foreground line-clamp-2">
                              <Link href={`/product/${item.slug}`} className="hover:underline">
                                {item.name}
                              </Link>
                            </h4>
                            <p className="ml-4 shrink-0 text-muted-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                          {item.selectedVariant && (
                            <p className="mt-1 text-xs text-muted-foreground">
                              {item.selectedVariant}
                            </p>
                          )}
                          <div className="mt-2 flex justify-between">
                            <div className="flex items-center border rounded-md h-7">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-7 w-7"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                aria-label={`Decrease quantity of ${item.name}`}
                                disabled={isLoading}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="px-1 text-xs font-medium">{item.quantity}</span>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-7 w-7"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                aria-label={`Increase quantity of ${item.name}`}
                                disabled={isLoading}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="flex gap-1">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="h-7 w-7 text-muted-foreground hover:text-primary"
                                onClick={() => handleSaveForLater(item.id)}
                                aria-label={`Save ${item.name} for later`}
                                disabled={isLoading}
                              >
                                <Heart className="h-3 w-3" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="h-7 w-7 text-muted-foreground hover:text-destructive"
                                onClick={() => removeItem(item.id)}
                                aria-label={`Remove ${item.name} from cart`}
                                disabled={isLoading}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>

                {savedItems?.length > 0 && (
                  <div className="px-4 pt-4 pb-4 border-t border-dashed border-gray-200 mt-2">
                    <h4 className="text-sm font-medium mb-3 flex items-center">
                      <Heart className="h-4 w-4 mr-1.5 text-gray-400" />
                      Saved for Later ({savedItems.length})
                    </h4>
                    <ul className="divide-y divide-gray-100" aria-label="Saved items">
                      {savedItems.map(item => (
                        <motion.li 
                          key={item.id} 
                          className="py-3 first:pt-0"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex gap-3">
                            <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border bg-muted">
                              <Image
                                src={item.images[0]}
                                alt={item.name}
                                width={48}
                                height={48}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                            <div className="flex flex-1 flex-col min-w-0">
                              <div className="flex justify-between text-sm">
                                <h4 className="font-medium line-clamp-1">
                                  <Link href={`/product/${item.slug}`} className="hover:underline">
                                    {item.name}
                                  </Link>
                                </h4>
                                <p className="ml-2 shrink-0 text-muted-foreground">${item.price.toFixed(2)}</p>
                              </div>
                              <div className="mt-1 flex gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="h-7 text-xs rounded-full px-3 border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800"
                                  onClick={() => handleMoveToCart(item.id)}
                                  aria-label={`Move ${item.name} to cart`}
                                  disabled={isLoading}
                                >
                                  Move to Cart
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="h-7 w-7 text-muted-foreground hover:text-destructive rounded-full"
                                  onClick={() => removeSavedItem(item.id)}
                                  aria-label={`Remove ${item.name} from saved items`}
                                  disabled={isLoading}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Product Recommendations Section */}
                {itemCount > 0 && (
                  <div className="px-4 pt-4 pb-4 border-t border-gray-200 mt-2">
                    <h4 className="text-sm font-medium mb-3 flex items-center">
                      <Sparkles className="h-4 w-4 mr-1.5 text-amber-500" />
                      You might also like
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {suggestedProducts.map(product => (
                        <motion.div
                          key={product.id}
                          whileHover={{ y: -3, transition: { duration: 0.2 } }}
                          className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                        >
                          <div className="p-2">
                            <div className="aspect-square relative mb-1.5">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-contain p-1"
                                sizes="(max-width: 768px) 33vw, 20vw"
                                loading="lazy"
                              />
                              <Badge className="absolute top-0 right-0 text-[8px] bg-green-600 px-1.5 py-0.5">
                                {product.category}
                              </Badge>
                            </div>
                            <h5 className="text-xs font-medium line-clamp-1">{product.name}</h5>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-xs font-medium">${product.price.toFixed(2)}</span>
                              <Button 
                                size="sm"
                                variant="outline"
                                className="h-6 w-6 p-0 rounded-full border-green-200 hover:bg-green-50 hover:text-green-700"
                                onClick={() => {
                                  addItem({...product, images: [product.image], rating: 4.5, stock: 10}, 1);
                                }}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </ScrollArea>

              {itemCount > 0 && (
                <div className="p-4 border-t bg-gradient-to-b from-white to-gray-50 sticky bottom-0 z-10 rounded-b-xl">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm mb-4">
                    <span className="text-muted-foreground">Shipping:</span>
                    <span>Calculated at checkout</span>
                  </div>
                  
                  <SheetClose asChild>
                    <Button 
                      asChild 
                      size="lg" 
                      className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full shadow-sm transition-all duration-200 hover:shadow"
                    >
                      <Link href="/checkout" className="flex items-center justify-center">
                        Proceed to Checkout
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </SheetClose>
                </div>
              )}
            </>
          )
        )}
      </SheetContent>
    </Sheet>
  );
} 