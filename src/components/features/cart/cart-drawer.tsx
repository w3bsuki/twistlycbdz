'use client';

import React from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2, ChevronRight } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function CartDrawer() {
  const { 
    items, 
    itemCount: totalItems, 
    subtotal: totalPrice, 
    updateQuantity, 
    removeItem, 
    isOpen, 
    openCart,
    closeCart
  } = useCart();
  
  // Calculate values for cart summary
  const subtotal = totalPrice;
  const shipping = totalPrice > 50 ? 0 : 4.99;
  const tax = subtotal * 0.08; // Assuming 8% tax rate
  const discount = 0; // Placeholder for discount logic
  const total = subtotal + shipping + tax - discount;
  
  // Toggle cart function
  const toggleCart = (open: boolean) => {
    if (open) {
      openCart();
    } else {
      closeCart();
    }
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="inline-block"
      >
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-black hover:text-gray-700 hover:bg-gray-50 relative rounded-full h-10 w-10"
          aria-label="Open shopping cart"
          onClick={openCart}
        >
          <ShoppingCart className="h-5 w-5" />
          <AnimatePresence>
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="absolute -top-1 -right-1 bg-green-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
              >
                {totalItems}
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>
      
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col bg-white border-l border-gray-200 p-0">
        <div className="p-6">
          <SheetHeader className="mb-6">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-xl font-bold tracking-tight text-gray-900">Your Cart</SheetTitle>
              <div className="bg-gray-100 rounded-full px-3 py-1 text-sm font-medium text-gray-700">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </div>
            </div>
          </SheetHeader>
          
          {!items?.length ? (
            <div className="flex flex-col items-center justify-center py-16">
              <motion.div 
                className="bg-gray-100 p-6 rounded-full mb-5"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ShoppingCart className="h-10 w-10 text-gray-400" />
              </motion.div>
              <motion.h3 
                className="text-lg font-semibold tracking-tight mb-2 text-gray-900"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                Your cart is empty
              </motion.h3>
              <motion.p 
                className="text-gray-500 text-center mb-8 max-w-xs"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                Looks like you haven't added any products to your cart yet.
              </motion.p>
              <SheetClose asChild>
                <Link href="/shop">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button className="bg-green-700 hover:bg-green-800 font-medium">
                      Browse Products
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </motion.div>
                </Link>
              </SheetClose>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto -mx-6 px-6" style={{ maxHeight: 'calc(100vh - 300px)' }}>
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <motion.div 
                      key={item.id} 
                      className="p-4 bg-gray-50 rounded-lg border border-gray-100"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      <div className="flex gap-4">
                        <Link href={`/shop/${item.id}`} className="shrink-0">
                          <motion.div 
                            className="relative h-20 w-20 overflow-hidden rounded-md border border-gray-100 bg-white"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Image 
                              src={item.image} 
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </motion.div>
                        </Link>
                        
                        <div className="flex-1 min-w-0">
                          <Link href={`/shop/${item.id}`}>
                            <h4 className="font-medium text-gray-900 hover:text-green-700 transition-colors tracking-tight line-clamp-1">
                              {item.name}
                            </h4>
                          </Link>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {item.details?.size && (
                              <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">
                                {item.details.size}
                              </span>
                            )}
                            {item.details?.concentration && (
                              <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                                {item.details.concentration}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center border rounded-md bg-white">
                              <motion.button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1.5 text-gray-600 hover:bg-gray-50"
                                aria-label="Decrease quantity"
                                whileTap={{ scale: 0.9 }}
                                transition={{ duration: 0.1 }}
                              >
                                <Minus className="h-3 w-3" />
                              </motion.button>
                              <span className="px-3 text-sm font-medium">{item.quantity}</span>
                              <motion.button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1.5 text-gray-600 hover:bg-gray-50"
                                disabled={item.quantity >= (item.stock || 10)}
                                aria-label="Increase quantity"
                                whileTap={{ scale: 0.9 }}
                                transition={{ duration: 0.1 }}
                              >
                                <Plus className="h-3 w-3" />
                              </motion.button>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-gray-900">
                                ${((item.discountPrice || item.price) * item.quantity).toFixed(2)}
                              </span>
                              <motion.button
                                onClick={() => removeItem(item.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                aria-label="Remove item"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
        
        {items?.length > 0 && (
          <div className="mt-auto border-t border-gray-200 bg-gray-50 p-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Discount</span>
                  <span className="text-red-600 font-medium">-${discount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (8%)</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shipping > 0 ? `$${shipping.toFixed(2)}` : (
                    <span className="text-green-600">Free</span>
                  )}
                </span>
              </div>
              
              <div className="pt-3 border-t border-gray-200 mt-2">
                <div className="flex justify-between font-medium text-base">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">${total.toFixed(2)}</span>
                </div>
                {subtotal < 50 && (
                  <p className="text-xs text-green-600 mt-1">
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping
                  </p>
                )}
              </div>
              
              <div className="space-y-3 pt-4">
                <SheetClose asChild>
                  <Link href="/checkout" className="w-full">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="w-full"
                    >
                      <Button className="w-full bg-green-700 hover:bg-green-800" onClick={closeCart}>
                        Checkout
                      </Button>
                    </motion.div>
                  </Link>
                </SheetClose>
                
                <SheetClose asChild>
                  <Link href="/shop" className="w-full">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="w-full"
                    >
                      <Button variant="outline" className="w-full">
                        Continue Shopping
                      </Button>
                    </motion.div>
                  </Link>
                </SheetClose>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
} 