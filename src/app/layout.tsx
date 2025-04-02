import './globals.css'
import type { Metadata } from 'next'
import { Footer } from "@/components/common/layout/footer"
import { Navbar } from '@/components/common/layout/navbar'
import { Providers } from "@/components/providers"
import { CartProvider } from '@/context/cart-context'
import { Toaster } from '@/components/ui/toaster'
import { SkipToContent, MainContentArea } from '@/components/ui/skip-to-content'
import { SkipLinkTargets } from '@/lib/accessibility'
import { Inter } from 'next/font/google'

// Define the Inter font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Twistly CBD',
  description: 'Premium CBD products for wellness, beauty, and pet health.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth light" style={{ colorScheme: "light" }}>
      <head>
        {/* Add any head elements here */}
      </head>
      <body className={`font-sans antialiased min-h-screen bg-background ${inter.variable}`}>
        <Providers>
          <CartProvider>
            <div className="flex min-h-screen flex-col">
              <SkipToContent />
              <header>
                <div id={SkipLinkTargets.NAVIGATION}>
                  <Navbar />
                </div>
              </header>
              <MainContentArea className="flex-1">
                {children}
              </MainContentArea>
              <Footer />
            </div>
            <Toaster />
          </CartProvider>
        </Providers>
      </body>
    </html>
  )
}
