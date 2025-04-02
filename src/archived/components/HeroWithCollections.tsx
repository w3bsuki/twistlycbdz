"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  ShoppingBag, 
  ChevronRight, 
  HeartPulse, 
  ArrowRight, 
  Grid2X2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

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
export const HeroWithCollections = () => {
  return (
    <section className="py-2 w-full h-screen max-h-[80vh] overflow-hidden flex items-center">
      <div className="mx-auto w-full px-4 md:px-6 container">
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full md:w-auto"
          >
            <Link href="/shop">
              <Button 
                size="lg" 
                className="w-full md:w-auto min-w-[180px] bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white border-0 shadow-lg"
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
                className="w-full md:w-auto min-w-[180px] border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-400 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-950/50 transition-colors"
              >
                <HeartPulse className="mr-2 h-4 w-4" />
                Wellness Guide
              </Button>
            </Link>
          </motion.div>
        </div>
        
        {/* Featured Collections */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-0"
        >
          <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm p-2 overflow-hidden">
            <div className="flex justify-between items-center mb-2 px-1">
              <h3 className="text-sm font-medium text-neutral-900 dark:text-white flex items-center">
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 flex items-center justify-center mr-2">
                  <Grid2X2 className="h-3 w-3 text-white" />
                </div>
                Featured Collections
              </h3>
              <Link href="/shop/collections" className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center">
                View All
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-50/70 to-white dark:from-emerald-900/10 dark:to-neutral-900 rounded-lg border border-emerald-100/40 dark:border-emerald-800/20 p-2 overflow-hidden">
              <div className="h-[38vh] max-h-[340px] overflow-hidden">
                <InfiniteSlider gap={16} duration={50} className="py-1">
                  {featuredCollections.map((collection, index) => (
                    <motion.div 
                      key={`collection-${index}`} 
                      className="relative group w-[320px] md:w-[350px]"
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
              
              <div className="mt-2 flex justify-center">
                <Link href="/about/cbd-benefits">
                  <div className="group inline-flex items-center gap-2 py-1.5 px-4 rounded-full transition-colors bg-emerald-50 dark:bg-emerald-950/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 border border-emerald-100 dark:border-emerald-900/50">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center">
                      <Sparkles className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300 group-hover:text-emerald-800 dark:group-hover:text-emerald-200 transition-colors">
                      See why CBD can help you
                    </span>
                    <ChevronRight className="h-3 w-3 text-emerald-500 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 