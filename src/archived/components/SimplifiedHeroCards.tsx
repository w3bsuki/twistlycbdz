"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, ChevronRight, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeaturedCollectionsCard } from "./FeaturedCollectionsCard";

// Hero CTA buttons component
export const SimplifiedHeroCards = () => {
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
        
        {/* Featured Collections */}
        <FeaturedCollectionsCard className="w-full mb-6" />
      </div>
    </section>
  );
}; 