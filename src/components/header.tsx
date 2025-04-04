import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DATA_TEST_ID } from './ui/data-testid';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartItemCount = 0; // This would be replaced with actual cart state

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const openCart = () => {
    // Implementation for opening cart
    console.log('Cart opened');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      data-testid={DATA_TEST_ID.HEADER}>
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              Twistly CBD
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/" data-testid={DATA_TEST_ID.NAV_LINK}>
              Home
            </Link>
            <Link href="/shop" data-testid={DATA_TEST_ID.NAV_LINK}>
              Shop
            </Link>
            <Link href="/category/cbd-oils" data-testid={DATA_TEST_ID.NAV_LINK}>
              Oils
            </Link>
            <Link href="/category/cbd-gummies" data-testid={DATA_TEST_ID.NAV_LINK}>
              Gummies
            </Link>
            <Link href="/category/cbd-topicals" data-testid={DATA_TEST_ID.NAV_LINK}>
              Topicals
            </Link>
            <Link href="/category/pet-cbd" data-testid={DATA_TEST_ID.NAV_LINK}>
              Pet CBD
            </Link>
          </nav>
        </div>
        
        {/* Mobile navigation */}
        {mobileMenuOpen ? (
          <button 
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
            onClick={toggleMobileMenu}
            aria-expanded="true"
            aria-label="Toggle navigation menu"
            data-testid={DATA_TEST_ID.MOBILE_MENU_BUTTON}
          >
            <X className="h-6 w-6" />
          </button>
        ) : (
          <button 
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
            onClick={toggleMobileMenu}
            aria-expanded="false"
            aria-label="Toggle navigation menu"
            data-testid={DATA_TEST_ID.MOBILE_MENU_BUTTON}
          >
            <Menu className="h-6 w-6" />
          </button>
        )}

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div 
            className="absolute inset-x-0 top-14 z-50 mt-px bg-background shadow-md md:hidden"
            data-testid={DATA_TEST_ID.MOBILE_MENU}
          >
            <div className="container py-4">
              <nav className="flex flex-col space-y-4">
                <Link href="/" 
                  className="text-lg font-medium" 
                  onClick={closeMobileMenu}
                  data-testid={DATA_TEST_ID.NAV_LINK}
                >
                  Home
                </Link>
                <Link href="/shop" 
                  className="text-lg font-medium" 
                  onClick={closeMobileMenu}
                  data-testid={DATA_TEST_ID.NAV_LINK}
                >
                  Shop
                </Link>
                <Link href="/category/cbd-oils" 
                  className="text-lg font-medium" 
                  onClick={closeMobileMenu}
                  data-testid={DATA_TEST_ID.NAV_LINK}
                >
                  Oils
                </Link>
                <Link href="/category/cbd-gummies" 
                  className="text-lg font-medium" 
                  onClick={closeMobileMenu}
                  data-testid={DATA_TEST_ID.NAV_LINK}
                >
                  Gummies
                </Link>
                <Link href="/category/cbd-topicals" 
                  className="text-lg font-medium" 
                  onClick={closeMobileMenu}
                  data-testid={DATA_TEST_ID.NAV_LINK}
                >
                  Topicals
                </Link>
                <Link href="/category/pet-cbd" 
                  className="text-lg font-medium" 
                  onClick={closeMobileMenu}
                  data-testid={DATA_TEST_ID.NAV_LINK}
                >
                  Pet CBD
                </Link>
              </nav>
            </div>
          </div>
        )}

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={openCart}
              aria-label="Shopping cart"
              data-testid={DATA_TEST_ID.CART_BUTTON}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span 
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground"
                  data-testid={DATA_TEST_ID.CART_COUNT}
                >
                  {cartItemCount}
                </span>
              )}
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
} 