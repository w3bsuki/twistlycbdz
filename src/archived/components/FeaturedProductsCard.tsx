"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";
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

interface FeaturedProductsCardProps {
  className?: string;
  products?: typeof featuredProducts;
}

export const FeaturedProductsCard = ({ 
  className, 
  products = featuredProducts 
}: FeaturedProductsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className={className}
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
            {products.map((product, index) => (
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
  );
}; 