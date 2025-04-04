import React from 'react';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { CartProvider } from '@/context/cart-context'

// Import components from the correct locations
import { Navbar } from '@/components/common/layout/navbar';
import { FooterSection } from '@/components/ui/footer-section';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className={`${inter.className} min-h-screen flex flex-col`}>
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <FooterSection />
        </CartProvider>
      </div>
    </ThemeProvider>
  )
} 