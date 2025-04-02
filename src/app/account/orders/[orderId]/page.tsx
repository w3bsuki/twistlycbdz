'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Package, Truck, CheckCircle, Download, FileText } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Mock orders data - would come from API in real implementation
const mockOrders = [
  {
    id: 'ORD-45678',
    date: 'March 21, 2025',
    total: 129.99,
    status: 'Delivered',
    items: [
      { id: 'CBD-123', name: 'Full Spectrum CBD Oil', quantity: 1, price: 79.99, image: '/images/products/cbd-oil.jpg' },
      { id: 'CBD-456', name: 'CBD Sleep Gummies', quantity: 1, price: 49.99, image: '/images/products/cbd-gummies.jpg' },
    ],
    tracking: 'USP12345678901',
    address: {
      name: 'John Doe',
      line1: '123 Main St',
      line2: 'Apt 4B',
      city: 'Portland',
      state: 'OR',
      postal: '97201',
      country: 'United States'
    },
    payment: {
      method: 'Visa ending in 4242',
      subtotal: 129.98,
      shipping: 0,
      tax: 0,
      total: 129.99
    },
    timeline: [
      { date: 'March 21, 2025 - 2:30 PM', status: 'Delivered', message: 'Package delivered' },
      { date: 'March 19, 2025 - 8:45 AM', status: 'Shipped', message: 'Package in transit' },
      { date: 'March 18, 2025 - 3:15 PM', status: 'Processing', message: 'Preparing for shipment' },
      { date: 'March 17, 2025 - 10:22 AM', status: 'Order Placed', message: 'Order confirmed' },
    ]
  },
  {
    id: 'ORD-45612',
    date: 'March 15, 2025',
    total: 89.50,
    status: 'Processing',
    items: [
      { id: 'CBD-789', name: 'CBD Recovery Balm', quantity: 1, price: 49.99, image: '/images/products/cbd-balm.jpg' },
      { id: 'CBD-101', name: 'CBD Calm Capsules', quantity: 1, price: 39.50, image: '/images/products/cbd-capsules.jpg' },
    ],
    address: {
      name: 'John Doe',
      line1: '123 Main St',
      line2: 'Apt 4B',
      city: 'Portland',
      state: 'OR',
      postal: '97201',
      country: 'United States'
    },
    payment: {
      method: 'Visa ending in 4242',
      subtotal: 89.49,
      shipping: 0,
      tax: 0,
      total: 89.50
    },
    timeline: [
      { date: 'March 18, 2025 - 3:15 PM', status: 'Processing', message: 'Preparing for shipment' },
      { date: 'March 15, 2025 - 10:22 AM', status: 'Order Placed', message: 'Order confirmed' },
    ]
  },
  {
    id: 'ORD-45590',
    date: 'February 28, 2025',
    total: 154.97,
    status: 'Delivered',
    items: [
      { id: 'CBD-123', name: 'Full Spectrum CBD Oil', quantity: 1, price: 79.99, image: '/images/products/cbd-oil.jpg' },
      { id: 'CBD-456', name: 'CBD Sleep Gummies', quantity: 1, price: 49.99, image: '/images/products/cbd-gummies.jpg' },
      { id: 'CBD-101', name: 'CBD Calm Capsules', quantity: 1, price: 24.99, image: '/images/products/cbd-capsules.jpg' },
    ],
    tracking: 'USP87654321009',
    address: {
      name: 'John Doe',
      line1: '123 Main St',
      line2: 'Apt 4B',
      city: 'Portland',
      state: 'OR',
      postal: '97201',
      country: 'United States'
    },
    payment: {
      method: 'Visa ending in 4242',
      subtotal: 154.97,
      shipping: 0,
      tax: 0,
      total: 154.97
    },
    timeline: [
      { date: 'March 5, 2025 - 2:30 PM', status: 'Delivered', message: 'Package delivered' },
      { date: 'March 3, 2025 - 8:45 AM', status: 'Shipped', message: 'Package in transit' },
      { date: 'March 1, 2025 - 3:15 PM', status: 'Processing', message: 'Preparing for shipment' },
      { date: 'February 28, 2025 - 10:22 AM', status: 'Order Placed', message: 'Order confirmed' },
    ]
  },
];

// Status icon mapping
const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case 'Processing':
      return <Package className="h-5 w-5 text-blue-500" />;
    case 'Shipped':
      return <Truck className="h-5 w-5 text-orange-500" />;
    case 'Delivered':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'Order Placed':
      return <FileText className="h-5 w-5 text-purple-500" />;
    default:
      return <Package className="h-5 w-5 text-gray-500" />;
  }
};

export default function OrderDetailPage() {
  const { orderId } = useParams();
  
  // Find the order by ID
  const order = mockOrders.find(o => o.id === orderId);
  
  // If order doesn't exist, show 404
  if (!order) {
    notFound();
  }
  
  return (
    <div>
      <div className="flex items-center mb-6 gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/account/orders">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h2 className="text-xl font-semibold">Order {order.id}</h2>
        <span className={cn(
          "text-xs py-1 px-2 rounded-full ml-auto",
          order.status === 'Delivered' ? "bg-green-100 text-green-800" : 
          order.status === 'Processing' ? "bg-blue-100 text-blue-800" :
          order.status === 'Shipped' ? "bg-orange-100 text-orange-800" :
          "bg-red-100 text-red-800"
        )}>
          {order.status}
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Order Details and Items */}
        <div className="md:col-span-2 space-y-6">
          {/* Order Items */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium mb-4">Items</h3>
              
              <div className="space-y-4">
                {order.items.map(item => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      {/* In a real app, add real images */}
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Package className="h-8 w-8" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    
                    <div className="font-medium">
                      ${item.price.toFixed(2)}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              {/* Order Summary */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>${order.payment.subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span>{order.payment.shipping === 0 ? 'Free' : `$${order.payment.shipping.toFixed(2)}`}</span>
                </div>
                
                {order.payment.tax > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tax</span>
                    <span>${order.payment.tax.toFixed(2)}</span>
                  </div>
                )}
                
                <Separator className="my-2" />
                
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${order.payment.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Order Timeline */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium mb-4">Order Timeline</h3>
              
              <div className="space-y-4">
                {order.timeline.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="relative">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 border">
                        <StatusIcon status={event.status} />
                      </div>
                      
                      {index < order.timeline.length - 1 && (
                        <div className="absolute top-8 left-4 bottom-0 w-0.5 bg-gray-200"></div>
                      )}
                    </div>
                    
                    <div className="pb-6">
                      <p className="font-medium">{event.status}</p>
                      <p className="text-sm text-gray-500">{event.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar with Shipping and Payment Info */}
        <div className="space-y-6">
          {/* Tracking Information */}
          {order.tracking && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium mb-2">Tracking Information</h3>
                <p className="text-sm mb-3">{order.tracking}</p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`#`}>
                    <Truck className="h-4 w-4 mr-2" /> Track Order
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
          
          {/* Shipping Address */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium mb-2">Shipping Address</h3>
              <div className="text-sm">
                <p>{order.address.name}</p>
                <p>{order.address.line1}</p>
                {order.address.line2 && <p>{order.address.line2}</p>}
                <p>{order.address.city}, {order.address.state} {order.address.postal}</p>
                <p>{order.address.country}</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Payment Information */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium mb-2">Payment Information</h3>
              <p className="text-sm">{order.payment.method}</p>
              <p className="text-sm text-gray-500">Order Date: {order.date}</p>
            </CardContent>
          </Card>
          
          {/* Actions */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium mb-4">Order Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <Download className="h-4 w-4" /> Download Invoice
                </Button>
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <FileText className="h-4 w-4" /> Request Return
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 