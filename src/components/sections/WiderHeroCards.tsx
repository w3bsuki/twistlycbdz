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
export const WiderHeroCards = () => {
  return (
    <section className="py-8 w-full">
      <div className="mx-auto w-full px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-5 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full md:w-auto"
          >
            <Link href="/shop">
              <Button 
                size="lg" 
                className="w-full md:w-auto min-w-[200px] bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white border-0 shadow-lg"
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Shop Products
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="w-full md:w-auto"
          >
            <Link href="/health-and-wellness">
              <Button 
                size="lg" 
                variant="outline"
                className="w-full md:w-auto min-w-[200px] border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-400 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-950/50 transition-colors"
              >
                <HeartPulse className="mr-2 h-4 w-4" />
                Wellness Guide
              </Button>
            </Link>
          </motion.div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 items-start mb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="w-full mx-auto"
          >
            <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm p-4 overflow-hidden h-full">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-medium text-neutral-900 dark:text-white flex items-center">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-400 to-purple-500 flex items-center justify-center mr-2">
                    <Star className="h-3 w-3 text-white" />
                  </div>
                  Newest Products
                </h3>
                <Link href="/shop/new" className="text-xs font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 flex items-center">
                  View All
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50/70 to-white dark:from-purple-900/10 dark:to-neutral-900 rounded-lg border border-purple-100/40 dark:border-purple-800/20 p-2 overflow-hidden">
                <InfiniteSlider gap={16} duration={35} reverse={true} className="py-1">
                  {newestProducts.map((product, index) => (
                    <motion.div 
                      key={`new-${index}`} 
                      className="relative group w-[300px]"
                      whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    >
                      <Link href={`/shop/${product.id}`}>
                        <AspectRatio ratio={1} className="bg-white dark:bg-neutral-800 rounded-lg border border-purple-100 dark:border-purple-800/50 shadow-sm">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain p-2 scale-90"
                          />
                          {product.isNew && (
                            <Badge className="absolute top-1 right-1 bg-purple-500 text-[8px] text-white px-1.5 py-0.5 rounded-full">NEW</Badge>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-purple-800/20 to-transparent rounded-lg opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
                          <div className="absolute bottom-0 left-0 right-0 p-2 text-left">
                            <p className="text-white text-xs font-medium leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-300">{product.name}</p>
                            <div className="flex items-center mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <Badge variant="outline" className="text-[8px] bg-white/10 text-white border-white/20 p-0 h-3.5">
                                {product.strength}
                              </Badge>
                              <span className="text-white text-[10px] font-bold ml-1">{product.price}</span>
                            </div>
                          </div>
                        </AspectRatio>
                      </Link>
                    </motion.div>
                  ))}
                </InfiniteSlider>
              </div>
            </div>
          </motion.div>
          
          {/* Featured Products Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="w-full"
          >
            <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm p-4 overflow-hidden h-full">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-medium text-neutral-900 dark:text-white flex items-center">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 flex items-center justify-center mr-2">
                    <ShoppingBag className="h-3 w-3 text-white" />
                  </div>
                  Featured Products
                </h3>
                <Link href="/shop" className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center">
                  View All
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
              
              <div className="bg-gradient-to-br from-emerald-50/70 to-white dark:from-emerald-900/10 dark:to-neutral-900 rounded-lg border border-emerald-100/40 dark:border-emerald-800/20 p-2 overflow-hidden">
                <InfiniteSlider gap={16} duration={40} className="py-1">
                  {featuredProducts.map((product, index) => (
                    <motion.div 
                      key={`slider-${index}`} 
                      className="relative group w-[300px]"
                      whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    >
                      <Link href={`/shop/${product.id}`}>
                        <AspectRatio ratio={1} className="bg-white dark:bg-neutral-800 rounded-lg border border-emerald-100 dark:border-emerald-800/50 shadow-sm">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain p-2 scale-90"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 via-emerald-800/20 to-transparent rounded-lg opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
                          <div className="absolute bottom-0 left-0 right-0 p-2 text-left">
                            <p className="text-white text-xs font-medium leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-300">{product.name}</p>
                            <div className="flex items-center mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <Badge variant="outline" className="text-[8px] bg-white/10 text-white border-white/20 p-0 h-3.5">
                                {product.strength}
                              </Badge>
                              <span className="text-white text-[10px] font-bold ml-1">{product.price}</span>
                            </div>
                          </div>
                        </AspectRatio>
                      </Link>
                    </motion.div>
                  ))}
                </InfiniteSlider>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Featured Collections */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mb-6"
        >
          <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm p-4 overflow-hidden">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium text-neutral-900 dark:text-white flex items-center">
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center mr-2">
                  <Grid2X2 className="h-3 w-3 text-white" />
                </div>
                Featured Collections
              </h3>
              <Link href="/shop/collections" className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center">
                View All
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50/70 to-white dark:from-blue-900/10 dark:to-neutral-900 rounded-lg border border-blue-100/40 dark:border-blue-800/20 p-2 overflow-hidden">
              <InfiniteSlider gap={20} duration={50} className="py-1">
                {featuredCollections.map((collection, index) => (
                  <motion.div 
                    key={`collection-${index}`} 
                    className="relative group w-[400px]"
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  >
                    <Link href={`/shop/collections/${collection.id}`}>
                      <AspectRatio ratio={16/9} className="bg-white dark:bg-neutral-800 rounded-lg border border-blue-100 dark:border-blue-800/50 shadow-sm overflow-hidden">
                        <Image
                          src={collection.image}
                          alt={collection.name}
                          fill
                          className="object-cover scale-110 opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-800/40 to-blue-900/10 rounded-lg" />
                        <div className="absolute inset-0 flex flex-col justify-end p-3">
                          <h4 className="text-white text-xs font-semibold leading-tight">{collection.name}</h4>
                          <p className="text-white/80 text-[9px] mt-0.5">{collection.productCount} products</p>
                        </div>
                      </AspectRatio>
                    </Link>
                  </motion.div>
                ))}
              </InfiniteSlider>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 