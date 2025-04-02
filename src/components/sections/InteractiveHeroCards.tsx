"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  ShoppingBag, 
  ChevronRight, 
  HeartPulse, 
  ArrowRight, 
  Star, 
  Grid, 
  Grid2X2,
  Sparkles,
  MessageSquareText,
  HomeIcon,
  BookOpen,
  Heart,
  Pill,
  Store,
  User
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

// Sample product data
const featuredProducts = [
  {
    id: "full-spectrum-cbd-oil",
    name: "Full Spectrum CBD Oil",
    strength: "1000mg",
    image: "/images/products/tincture-1.png",
    price: "$59.99",
    rating: 4.8,
    reviews: 124,
  },
  {
    id: "broad-spectrum-cbd-oil",
    name: "Broad Spectrum CBD Oil",
    strength: "750mg",
    image: "/images/products/tincture-2.png",
    price: "$49.99",
    rating: 4.6,
    reviews: 89,
  },
  {
    id: "cbd-gummies-mixed-fruit",
    name: "CBD Gummies Mixed Fruit",
    strength: "25mg/gummy",
    image: "/images/products/gummies-1.png",
    price: "$34.99",
    rating: 4.9,
    reviews: 156,
  },
  {
    id: "cbd-pain-cream",
    name: "CBD Pain Relief Cream",
    strength: "500mg",
    image: "/images/products/topical-1.png",
    price: "$44.99",
    rating: 4.7,
    reviews: 72,
  },
  {
    id: "cbd-sleep-capsules",
    name: "CBD Sleep Capsules",
    strength: "30mg/capsule",
    image: "/images/products/capsules-1.png",
    price: "$39.99",
    rating: 4.5,
    reviews: 63,
  },
  {
    id: "cbd-pet-tincture",
    name: "CBD Pet Tincture",
    strength: "300mg",
    image: "/images/products/pet-1.png",
    price: "$29.99",
    rating: 4.8,
    reviews: 47,
  },
];

// Newest products data
const newestProducts = [
  {
    id: "cbd-sleep-gummies",
    name: "CBD Sleep Gummies",
    strength: "50mg",
    image: "/images/products/gummies-2.png",
    price: "$39.99",
    rating: 4.9,
    reviews: 28,
    isNew: true,
  },
  {
    id: "cbd-recovery-balm",
    name: "CBD Recovery Balm",
    strength: "1000mg",
    image: "/images/products/topical-2.png",
    price: "$54.99",
    rating: 4.7,
    reviews: 17,
    isNew: true,
  },
  {
    id: "cbd-focus-tincture",
    name: "CBD Focus Tincture",
    strength: "1500mg",
    image: "/images/products/tincture-3.png",
    price: "$69.99",
    rating: 4.8,
    reviews: 12,
    isNew: true,
  },
  {
    id: "cbd-bath-bombs",
    name: "CBD Bath Bombs",
    strength: "100mg/bomb",
    image: "/images/products/bath-1.png",
    price: "$24.99",
    rating: 4.6,
    reviews: 32,
    isNew: true,
  },
  {
    id: "cbd-protein-powder",
    name: "CBD Protein Powder",
    strength: "25mg/serving",
    image: "/images/products/powder-1.png",
    price: "$49.99",
    rating: 4.5,
    reviews: 9,
    isNew: true,
  },
  {
    id: "cbd-face-serum",
    name: "CBD Face Serum",
    strength: "250mg",
    image: "/images/products/beauty-1.png",
    price: "$45.99",
    rating: 4.9,
    reviews: 14,
    isNew: true,
  },
];

// Sample collections data
const featuredCollections = [
  {
    id: "oils-tinctures",
    name: "Oils & Tinctures",
    image: "/images/tincture.png",
    productCount: 12,
    description: "Premium CBD oils for daily wellness"
  },
  {
    id: "edibles",
    name: "Edibles & Gummies",
    image: "/images/gummies.png", 
    productCount: 8,
    description: "Delicious CBD treats and gummies"
  },
  {
    id: "topicals",
    name: "Topicals & Balms",
    image: "/images/balm.png",
    productCount: 6,
    description: "Targeted relief for muscles and skin"
  },
  {
    id: "pet-products",
    name: "Pet CBD",
    image: "/images/pet-oil.png",
    productCount: 5,
    description: "CBD products formulated for pets"
  },
  {
    id: "bundles",
    name: "Value Bundles",
    image: "/images/bundle.png",
    productCount: 4,
    description: "Save with our curated product sets"
  },
  {
    id: "wellness",
    name: "Wellness",
    image: "/images/wellness.png",
    productCount: 10,
    description: "Support your daily wellness routine"
  }
];

// Hero CTA buttons component
export const InteractiveHeroCards = () => {
  return (
    <section className="w-full">
      <div className="container max-w-full mx-auto px-0">
        {/* CTA buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 mb-6">
          <Link href="/shop">
            <Button 
              size="lg" 
              className="w-full md:w-auto min-w-[180px] bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white border-0 shadow-md"
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Shop Products
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          
          <Link href="/health-and-wellness">
            <Button 
              size="lg" 
              variant="outline"
              className="w-full md:w-auto min-w-[180px] border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-400 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-950/50 transition-colors"
            >
              <HeartPulse className="mr-2 h-4 w-4" />
              Wellness Guide
            </Button>
          </Link>
        </div>
        
        {/* Featured Collections */}
        <div className="mb-6">
          <div className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-sm p-4 overflow-hidden">
            <div className="flex justify-between items-center mb-3 px-2">
              <h3 className="text-sm font-medium text-neutral-900 dark:text-white flex items-center">
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 flex items-center justify-center mr-2">
                  <Grid2X2 className="h-3 w-3 text-white" />
                </div>
                Featured Collections
              </h3>
              <div className="flex items-center">
                <Link href="/shop/collections" className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-2 px-3 py-1 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-full">
                  View All
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-50/70 to-white dark:from-emerald-900/10 dark:to-neutral-900 rounded-lg border border-emerald-100/40 dark:border-emerald-800/20 p-3 overflow-hidden">
              <InfiniteSlider gap={20} duration={50} className="py-2">
                {featuredCollections.map((collection, index) => (
                  <motion.div 
                    key={`collection-${index}`} 
                    className="relative group w-[240px] sm:w-[280px] md:w-[320px] lg:w-[400px]"
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  >
                    <Link href={`/shop/collections/${collection.id}`}>
                      <AspectRatio ratio={16/9} className="bg-white dark:bg-neutral-800 rounded-lg border border-emerald-100 dark:border-emerald-800/50 shadow-sm overflow-hidden">
                        <Image
                          src={collection.image}
                          alt={collection.name}
                          fill
                          className="object-cover scale-110 opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 via-emerald-800/40 to-emerald-900/10 rounded-lg" />
                        <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4">
                          <h4 className="text-white text-xs sm:text-sm font-semibold leading-tight">{collection.name}</h4>
                          <p className="text-white/80 text-[9px] sm:text-xs mt-1">{collection.productCount} products</p>
                        </div>
                      </AspectRatio>
                    </Link>
                  </motion.div>
                ))}
              </InfiniteSlider>
            </div>
            
            <div className="mt-4 flex justify-center">
              <Link href="/about/cbd-benefits">
                <div className="group inline-flex items-center gap-2 py-2 px-4 rounded-full transition-colors bg-emerald-50 dark:bg-emerald-950/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-900/50">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center">
                    <Sparkles className="h-2.5 w-2.5 text-white" />
                  </div>
                  <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300 group-hover:text-emerald-800 dark:group-hover:text-emerald-200 transition-colors">
                    See why CBD can help you
                  </span>
                  <ChevronRight className="ml-0.5 h-3 w-3 text-emerald-500 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};