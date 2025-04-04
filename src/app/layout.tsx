import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Footer } from "@/components/common/layout/footer"
import { Navbar } from '@/components/common/layout/navbar'
import { Providers } from "@/components/providers"
import { CartProvider } from '@/context/cart-context'
import { Toaster } from '@/components/ui/toaster'
import { SkipToContent, MainContentArea } from '@/components/ui/skip-to-content'
import { SkipLinkTargets } from '@/lib/accessibility'
import { inter } from '@/lib/fonts'
import { PerformanceMonitor } from '@/components/metrics/performance-monitor'

export const metadata: Metadata = {
  title: {
    default: "Twistly CBD - Premium CBD Products",
    template: "%s | Twistly CBD"
  },
  description: "Premium CBD products for health, wellness, beauty, and pets. High-quality, lab-tested CBD oils, tinctures, gummies and topicals.",
  keywords: ["CBD", "Hemp", "Wellness", "Health", "Pet CBD", "Beauty", "Organic"],
  authors: [{ name: "Twistly CBD" }],
  creator: "Twistly CBD",
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://twistlycbd.com",
    title: "Twistly CBD - Premium CBD Products",
    description: "Premium CBD products for health, wellness, beauty, and pets. High-quality, lab-tested CBD oils, tinctures, gummies and topicals.",
    siteName: "Twistly CBD",
  },
  twitter: {
    card: "summary_large_image",
    title: "Twistly CBD - Premium CBD Products",
    description: "Premium CBD products for health, wellness, beauty, and pets. High-quality, lab-tested CBD oils, tinctures, gummies and topicals.",
    creator: "@twistlycbd",
  },
};

export const viewport: Viewport = {
  themeColor: "#22c55e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} light`} style={{ colorScheme: "light" }}>
      <head>
        {/* Resource hints for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="/images/logos/1.png" as="image" />
      </head>
      <body className="font-sans antialiased min-h-screen bg-background">
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
            <PerformanceMonitor />
          </CartProvider>
        </Providers>
      </body>
    </html>
  )
}
