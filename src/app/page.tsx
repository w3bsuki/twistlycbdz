import React from 'react';
import type { Viewport } from 'next';
import { HomePageHeroSection } from "@/components/sections/HomePageHeroSection";
import { ShoppingBag, Leaf } from "lucide-react";
import { CategoryHighlights } from '@/components/features/home/category-highlights';
import { FeaturedProducts } from '@/components/features/home/featured-products-optimized';
import { CBDBenefits } from '@/components/features/home/cbd-benefits';
import { Testimonials } from '@/components/features/home/testimonials';
import { DrTwistlySection } from '@/components/features/home/dr-twistly-section';
import { Container } from '@/components/ui/container'

export const viewport: Viewport = {
  themeColor: "#22c55e",
  width: "device-width",
  initialScale: 1,
};

export default function HomePage() {
  return (
    <main>
      {/* New Hero Section */}
      <HomePageHeroSection
        badge={{
          text: "New CBD Collection",
          action: {
            text: "View products",
            href: "/products",
          },
        }}
        title="Elevate Your Wellness Journey"
        description="Experience the natural benefits of our premium CBD products. Ethically sourced, third-party tested, and designed with love <3"
        actions={[
          {
            text: "Shop Collection",
            href: "/shop",
            variant: "default",
            icon: <ShoppingBag className="h-4 w-4" />,
          },
          {
            text: "Learn About CBD",
            href: "/learn",
            variant: "outline",
            icon: <Leaf className="h-4 w-4" />,
          },
        ]}
        imageSrc="/images/logo/1/twistly-logo.svg"
        imageAlt="Twistly CBD Logo"
      />
      
      {/* Category Highlights Section (Slider) */}
      <CategoryHighlights />
      
      <FeaturedProducts />
      
      {/* CBD Benefits Section */}
      <CBDBenefits />
      
      {/* Dr. Twistly AI Consultant Section */}
      <DrTwistlySection />
      
      <Testimonials />
    </main>
  );
}
