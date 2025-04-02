"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Grid2X2, ArrowRight } from "lucide-react";
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

interface FeaturedCollectionsCardProps {
  className?: string;
  collections?: typeof featuredCollections;
}

export const FeaturedCollectionsCard = ({ 
  className, 
  collections = featuredCollections 
}: FeaturedCollectionsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className={className}
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
            {collections.map((collection, index) => (
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
  );
}; 