import "./globals.css";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/common/layout/navbar";
import { Footer } from "@/components/common/layout/footer";
import { Providers } from "@/components/providers";
import { CartProvider } from "@/context/cart-context";

// Define the Inter font
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "Twistly CBD | Premium CBD Products for Health & Wellness",
  description: "Discover premium CBD products designed to enhance your wellness journey. From oils to topicals, we offer lab-tested, ethically sourced CBD for better health and wellness.",
  keywords: "CBD, wellness, health, hemp, organic CBD, CBD oil, topicals, edibles, premium CBD, natural remedies",
  authors: [{ name: "Twistly CBD" }],
  openGraph: {
    title: "Twistly CBD | Premium CBD Products for Health & Wellness",
    description: "Discover premium CBD products designed to enhance your wellness journey. Lab-tested, ethically sourced.",
    type: "website",
    url: "https://twistlycbd.com",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Twistly CBD products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Twistly CBD | Premium CBD Products",
    description: "Discover premium CBD products designed to enhance your wellness journey.",
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#22c55e" />
        <link rel="canonical" href="https://twistlycbd.com" />
      </head>
      <body className="font-sans antialiased min-h-screen bg-background">
        <Providers>
          <CartProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
