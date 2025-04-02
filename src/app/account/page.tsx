'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, ShoppingBag, Clock, Package, CreditCard, Settings, ArrowRight, ShoppingCart } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Mock user data
const userData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  address: '123 Main Street, Apt 4B, New York, NY 10001',
  orderCount: 5,
  memberSince: 'March 2023',
};

// Mock recent orders
const recentOrders = [
  {
    id: 'ORD-45678',
    date: 'March 21, 2025',
    total: 129.99,
    status: 'Delivered',
    items: [
      { name: 'Full Spectrum CBD Oil', quantity: 1 },
      { name: 'CBD Sleep Gummies', quantity: 1 }
    ]
  },
  {
    id: 'ORD-45612',
    date: 'March 15, 2025',
    total: 89.50,
    status: 'Processing',
    items: [
      { name: 'CBD Recovery Balm', quantity: 1 },
      { name: 'CBD Calm Capsules', quantity: 1 }
    ]
  }
];

// Account overview cards
const accountCards = [
  {
    title: 'Personal Information',
    icon: User,
    description: 'Manage your personal details and preferences',
    link: '/account/settings',
    linkText: 'Edit Profile'
  },
  {
    title: 'Orders',
    icon: ShoppingCart,
    description: 'View and track your order history',
    link: '/account/orders',
    linkText: 'View Orders'
  },
  {
    title: 'Settings',
    icon: Settings,
    description: 'Update your password and notification preferences',
    link: '/account/settings?tab=security',
    linkText: 'Manage Settings'
  }
];

export default function AccountPage() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Welcome back, {userData.name}</h2>
      <p className="text-gray-500 mb-8">Member since {userData.memberSince}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {accountCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-gray-50 p-6 rounded-lg border"
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <card.icon className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="font-medium">{card.title}</h3>
            </div>
            <p className="text-gray-500 text-sm mb-4">{card.description}</p>
            <Link 
              href={card.link} 
              className="text-green-600 font-medium text-sm inline-flex items-center hover:text-green-700"
            >
              {card.linkText}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </motion.div>
        ))}
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Recent Orders</h3>
          <Link 
            href="/account/orders" 
            className="text-green-600 font-medium text-sm inline-flex items-center hover:text-green-700"
          >
            View All Orders
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="space-y-4">
          {recentOrders.map((order, index) => (
            <motion.div 
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
              className="border rounded-lg p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${order.total.toFixed(2)}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === "Delivered" ? "bg-green-100 text-green-800" : 
                    order.status === "Processing" ? "bg-blue-100 text-blue-800" : 
                    "bg-orange-100 text-orange-800"
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
              
              <div className="text-sm text-gray-500 mt-2">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between py-1">
                    <span>{item.name} × {item.quantity}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-3 pt-3 border-t flex justify-end">
                <Link
                  href={`/account/orders/${order.id}`}
                  className="text-green-600 font-medium text-sm inline-flex items-center hover:text-green-700"
                >
                  Order Details
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 