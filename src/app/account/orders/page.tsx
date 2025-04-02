'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar, Package, Truck, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// Mock orders data
const mockOrders = [
  {
    id: 'ORD-45678',
    date: 'March 21, 2025',
    total: 129.99,
    status: 'Delivered',
    items: [
      { id: 'CBD-123', name: 'Full Spectrum CBD Oil', quantity: 1, price: 79.99 },
      { id: 'CBD-456', name: 'CBD Sleep Gummies', quantity: 1, price: 49.99 },
    ],
    tracking: 'USP12345678901',
  },
  {
    id: 'ORD-45612',
    date: 'March 15, 2025',
    total: 89.50,
    status: 'Processing',
    items: [
      { id: 'CBD-789', name: 'CBD Recovery Balm', quantity: 1, price: 49.99 },
      { id: 'CBD-101', name: 'CBD Calm Capsules', quantity: 1, price: 39.50 },
    ],
  },
  {
    id: 'ORD-45590',
    date: 'February 28, 2025',
    total: 154.97,
    status: 'Delivered',
    items: [
      { id: 'CBD-123', name: 'Full Spectrum CBD Oil', quantity: 1, price: 79.99 },
      { id: 'CBD-456', name: 'CBD Sleep Gummies', quantity: 1, price: 49.99 },
      { id: 'CBD-101', name: 'CBD Calm Capsules', quantity: 1, price: 24.99 },
    ],
    tracking: 'USP87654321009',
  },
  {
    id: 'ORD-45567',
    date: 'February 15, 2025',
    total: 109.98,
    status: 'Canceled',
    items: [
      { id: 'CBD-202', name: 'CBD Sport Performance Drops', quantity: 2, price: 54.99 },
    ],
  },
  {
    id: 'ORD-45523',
    date: 'January 29, 2025',
    total: 89.97,
    status: 'Delivered',
    items: [
      { id: 'CBD-303', name: 'CBD Pet Wellness Tincture', quantity: 1, price: 59.99 },
      { id: 'CBD-404', name: 'CBD Bath Bombs', quantity: 1, price: 29.98 },
    ],
    tracking: 'USP13579246801',
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
    case 'Canceled':
      return <Calendar className="h-5 w-5 text-red-500" />;
    default:
      return <Package className="h-5 w-5 text-gray-500" />;
  }
};

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Filter orders based on search and status
  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || order.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Your Orders</h2>
      
      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by order ID or product"
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Order List */}
      {filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="border rounded-lg overflow-hidden"
            >
              {/* Order Header */}
              <div className="bg-gray-50 p-4 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex items-center space-x-3">
                  <StatusIcon status={order.status} />
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                </div>
                
                <div className="space-y-1 text-right">
                  <div className="text-sm">
                    Total: <span className="font-semibold">${order.total.toFixed(2)}</span>
                  </div>
                  <span className={cn(
                    "text-xs py-1 px-2 rounded-full",
                    order.status === 'Delivered' ? "bg-green-100 text-green-800" : 
                    order.status === 'Processing' ? "bg-blue-100 text-blue-800" :
                    order.status === 'Shipped' ? "bg-orange-100 text-orange-800" :
                    "bg-red-100 text-red-800"
                  )}>
                    {order.status}
                  </span>
                </div>
              </div>
              
              {/* Order Items (collapsed preview) */}
              <div className="p-4">
                <p className="text-sm font-medium mb-2">
                  {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                </p>
                
                <div className="space-y-3">
                  {order.items.slice(0, 2).map(item => (
                    <div key={`${order.id}-${item.id}`} className="flex justify-between text-sm">
                      <div>
                        <span className="font-medium">{item.quantity}x</span> {item.name}
                      </div>
                      <div className="font-medium">${item.price.toFixed(2)}</div>
                    </div>
                  ))}
                  
                  {order.items.length > 2 && (
                    <p className="text-sm text-gray-500">
                      +{order.items.length - 2} more item{order.items.length - 2 > 1 ? 's' : ''}
                    </p>
                  )}
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between">
                  {order.tracking ? (
                    <Button variant="link" className="text-green-700 p-0 h-auto text-sm">
                      Track Order
                    </Button>
                  ) : (
                    <div></div>
                  )}
                  
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/account/orders/${order.id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No orders found matching your criteria.</p>
          <Button variant="outline" onClick={() => {setSearchQuery(''); setStatusFilter('all');}}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
} 