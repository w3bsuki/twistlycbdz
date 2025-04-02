'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Package, Settings, CreditCard, LogOut, Menu } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { AccountMobileNav } from '@/components/account-mobile-nav';

interface MenuItem {
  title: string;
  href: string;
  icon: React.ElementType;
  description?: string;
}

// Account menu items
const mainMenuItems: MenuItem[] = [
  {
    title: 'Overview',
    href: '/account',
    icon: User,
    description: 'Your account information and recent orders'
  },
  {
    title: 'Orders',
    href: '/account/orders',
    icon: Package,
    description: 'Track and manage your orders'
  },
  {
    title: 'Settings',
    href: '/account/settings',
    icon: Settings,
    description: 'Manage your account settings and preferences'
  },
];

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  
  // Check if current path matches menu item (accounts for nested routes)
  const isActive = (href: string) => {
    if (href === '/account') {
      return pathname === '/account';
    }
    return pathname.startsWith(href);
  };
  
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:hidden mb-6">
        <AccountMobileNav 
          trigger={
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          } 
        />
      </div>
      
      <div className="flex flex-col gap-8 md:flex-row">
        {/* Desktop Sidebar - hidden on mobile */}
        <aside className="hidden md:block md:w-64 flex-shrink-0">
          <div className="sticky top-20">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">My Account</h2>
                <p className="text-sm text-muted-foreground mt-1">Manage your account and orders</p>
              </div>
              
              <Separator />
              
              <ScrollArea className="h-[calc(100vh-13rem)]">
                <div className="space-y-1">
                  {mainMenuItems.map((item) => (
                    <Button
                      key={item.href}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start gap-2 px-2",
                        isActive(item.href) ? "bg-muted font-medium" : "font-normal"
                      )}
                      asChild
                    >
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </Button>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 px-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </Button>
              </ScrollArea>
            </div>
          </div>
        </aside>
        
        {/* Main content */}
        <motion.main 
          className="flex-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white rounded-lg border shadow-sm p-6">
            {children}
          </div>
        </motion.main>
      </div>
    </div>
  );
} 