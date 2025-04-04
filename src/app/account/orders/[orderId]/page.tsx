import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingBag, Settings, LogOut, UserCircle, ArrowLeft, ChevronRight, Truck, CheckCircle } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

export const metadata: Metadata = {
  title: 'Order Details | Twistly CBD',
  description: 'View the details of your Twistly CBD order.',
}

// Generate static params for build
export function generateStaticParams() {
  // Define the order IDs that will be pre-rendered
  return [
    { orderId: 'ORD-12345' },
    { orderId: 'ORD-12344' }
  ];
}

// Mock order data - in a real app this would be fetched from API
const orderDetails = {
  id: 'ORD-12345',
  date: 'April 28, 2025',
  status: 'Delivered',
  total: 89.97,
  subtotal: 79.97,
  shipping: 10.00,
  tax: 0.00,
  items: [
    {
      id: 'PROD-1',
      name: 'CBD Oil Tincture',
      image: '/images/products/placeholder.jpg',
      price: 49.99,
      quantity: 1
    },
    {
      id: 'PROD-2',
      name: 'CBD Gummies',
      image: '/images/products/placeholder.jpg',
      price: 29.98,
      quantity: 1
    }
  ],
  shipping_address: {
    name: 'Jane Doe',
    address: '123 Main St',
    city: 'Portland',
    state: 'OR',
    zip: '97201',
    country: 'USA'
  },
  tracking: {
    number: 'TRK12345678',
    carrier: 'USPS',
    estimated_delivery: 'April 30, 2025',
    status: 'Delivered'
  }
};

export default function OrderDetailsPage({ params }: { params: { orderId: string } }) {
  const orderId = params.orderId;
  
  // In a real app, you would fetch the order based on the ID
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Link 
            href="/account/orders"
            className="flex items-center text-sm text-gray-500 hover:text-gray-800"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Orders
          </Link>
          <span className="text-gray-500">/</span>
          <span className="text-sm text-gray-700">{orderId}</span>
        </div>
        
        <h1 className="text-3xl font-bold mb-6">Order Details</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Account Navigation */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Account Menu</CardTitle>
                <CardDescription>Manage your account</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="flex flex-col">
                  <Link 
                    href="/account" 
                    className="px-4 py-3 border-b border-gray-100 flex items-center gap-2 hover:bg-gray-50"
                  >
                    <UserCircle className="h-5 w-5" />
                    Account Overview
                  </Link>
                  <Link 
                    href="/account/orders" 
                    className="px-4 py-3 border-b border-gray-100 text-primary font-medium flex items-center gap-2 hover:bg-gray-50"
                  >
                    <ShoppingBag className="h-5 w-5" />
                    Orders
                  </Link>
                  <Link 
                    href="/account/settings" 
                    className="px-4 py-3 border-b border-gray-100 flex items-center gap-2 hover:bg-gray-50"
                  >
                    <Settings className="h-5 w-5" />
                    Settings
                  </Link>
                  <button
                    className="px-4 py-3 text-left flex items-center gap-2 hover:bg-gray-50 text-red-600"
                  >
                    <LogOut className="h-5 w-5" />
                    Sign Out
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>
          
          {/* Order Details Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center">
                      {orderDetails.id}
                      <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                        orderDetails.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                        orderDetails.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {orderDetails.status}
                      </span>
                    </CardTitle>
                    <CardDescription>Ordered on {orderDetails.date}</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    Need Help?
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {orderDetails.tracking && (
                  <div className="bg-green-50 p-4 rounded-md mb-4 flex items-start">
                    {orderDetails.tracking.status === 'Delivered' ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                    ) : (
                      <Truck className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                    )}
                    <div>
                      <p className="font-medium text-green-800">
                        {orderDetails.tracking.status === 'Delivered' ? 'Delivered' : 'Estimated Delivery'}
                      </p>
                      <p className="text-sm text-green-700">
                        {orderDetails.tracking.status === 'Delivered' 
                          ? `Your order was delivered on ${orderDetails.tracking.estimated_delivery}` 
                          : `Expected delivery by ${orderDetails.tracking.estimated_delivery}`}
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        Tracking: {orderDetails.tracking.carrier} - {orderDetails.tracking.number}
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Order Items */}
                <div className="space-y-4">
                  <h3 className="font-medium">Items in this order</h3>
                  
                  {orderDetails.items.map((item) => (
                    <div key={item.id} className="flex gap-4 py-3 border-b">
                      <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden relative flex-shrink-0">
                        <Image 
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="font-medium">${item.price.toFixed(2)}</p>
                        </div>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Order Summary */}
                <div className="mt-6 pt-4 border-t">
                  <h3 className="font-medium mb-2">Order Summary</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${orderDetails.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>${orderDetails.shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${orderDetails.tax.toFixed(2)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-medium text-base">
                      <span>Total</span>
                      <span>${orderDetails.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href="/account/orders">
                    Back to Orders
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/shop">
                    Shop Again
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            
            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <p className="font-medium">{orderDetails.shipping_address.name}</p>
                  <p>{orderDetails.shipping_address.address}</p>
                  <p>{orderDetails.shipping_address.city}, {orderDetails.shipping_address.state} {orderDetails.shipping_address.zip}</p>
                  <p>{orderDetails.shipping_address.country}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 