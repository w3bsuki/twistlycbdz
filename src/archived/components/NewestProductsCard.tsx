"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

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

interface NewestProductsCardProps {
  className?: string;
  products?: typeof newestProducts;
}

export const NewestProductsCard = ({ 
  className, 
  products = newestProducts 
}: NewestProductsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className={className}
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
            {products.map((product, index) => (
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
  );
}; 