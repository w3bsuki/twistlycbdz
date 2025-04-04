import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingBag, Settings, LogOut, UserCircle, Package, ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'My Orders | Twistly CBD',
  description: 'View and track your order history at Twistly CBD.',
}

// Mock order data
const orders = [
  {
    id: 'ORD-12345',
    date: 'April 28, 2025',
    status: 'Delivered',
    total: 89.97,
    items: 3
  },
  {
    id: 'ORD-12344',
    date: 'April 15, 2025',
    status: 'Processing',
    total: 45.99,
    items: 1
  }
];

export default function OrdersPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>
        
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
          
          {/* Orders Content */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>View and track your orders</CardDescription>
              </CardHeader>
              <CardContent>
                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border rounded-md p-4 hover:border-primary transition-colors">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{order.id}</p>
                            <p className="text-sm text-gray-500">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${order.total.toFixed(2)}</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                              order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                              'bg-orange-100 text-orange-800'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <p className="text-sm text-gray-500">{order.items} {order.items === 1 ? 'item' : 'items'}</p>
                          <Link href={`/account/orders/${order.id}`}>
                            <Button variant="outline" size="sm" className="gap-1">
                              View Details
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <Package className="h-6 w-6 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                    <p className="text-gray-500 mb-4">You haven't placed any orders with us yet.</p>
                    <Button asChild>
                      <Link href="/shop">Start Shopping</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 