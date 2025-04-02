'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, ShoppingBag } from 'lucide-react';

export default function OrderSuccessPage() {
  // Use useState to store the order number and date
  const [orderNumber, setOrderNumber] = useState('------');
  const [orderDate, setOrderDate] = useState('--/--/----');
  
  // Use useEffect to set these values client-side only to avoid hydration mismatches
  useEffect(() => {
    setOrderNumber(`ORD-${Math.floor(100000 + Math.random() * 900000)}`);
    setOrderDate(new Date().toLocaleDateString());
  }, []);

  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. Your order has been successfully placed and will be processed soon.
            </p>
            
            <div className="bg-gray-50 rounded-md p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-500">Order Number:</span>
                <span className="text-sm font-medium">#{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Order Date:</span>
                <span className="text-sm font-medium">{orderDate}</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-8">
              We've sent a confirmation email with order details and tracking information to your email address.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <Link href="/shop">
                <Button variant="outline" className="w-full">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Button>
              </Link>
              <Link href="/account/orders">
                <Button className="w-full bg-green-700 hover:bg-green-800">
                  View Order
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 