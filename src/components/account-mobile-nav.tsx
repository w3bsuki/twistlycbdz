'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package, Settings, User, LogOut } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface AccountMobileNavProps {
  trigger: React.ReactNode;
}

// Account menu items
const menuItems = [
  {
    title: 'Overview',
    href: '/account',
    icon: User,
  },
  {
    title: 'Orders',
    href: '/account/orders',
    icon: Package,
  },
  {
    title: 'Settings',
    href: '/account/settings',
    icon: Settings,
  },
];

export function AccountMobileNav({ trigger }: AccountMobileNavProps) {
  const pathname = usePathname();
  
  // Check if current path matches menu item
  const isActive = (href: string) => {
    if (href === '/account') {
      return pathname === '/account';
    }
    return pathname.startsWith(href);
  };
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger}
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader className="mb-6">
          <SheetTitle>My Account</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-4">
          {menuItems.map((item) => (
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
          
          <Separator />
          
          <Button
            variant="outline"
            className="w-full justify-start gap-2 px-2 text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
} 