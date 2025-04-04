import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ShoppingBag, Settings, LogOut, UserCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'My Account | Twistly CBD',
  description: 'View and manage your Twistly CBD account, orders, and preferences.',
}

export default function AccountPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Account</h1>
        
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
                    className="px-4 py-3 border-b border-gray-100 text-primary font-medium flex items-center gap-2 hover:bg-gray-50"
                  >
                    <UserCircle className="h-5 w-5" />
                    Account Overview
                  </Link>
                  <Link 
                    href="/account/orders" 
                    className="px-4 py-3 border-b border-gray-100 flex items-center gap-2 hover:bg-gray-50"
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
          
          {/* Account Content */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Account Overview</CardTitle>
                <CardDescription>Welcome back!</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium text-lg mb-2">Account Details</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="mb-1"><span className="font-medium">Name:</span> Jane Doe</p>
                    <p className="mb-1"><span className="font-medium">Email:</span> jane.doe@example.com</p>
                    <p><span className="font-medium">Member Since:</span> January 15, 2023</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Recent Orders</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-gray-500 text-center py-2">No recent orders found.</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Default Shipping Address</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-gray-500 text-center py-2">No shipping address on file.</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline">
                  <Link href="/account/settings">
                    Edit Profile
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 