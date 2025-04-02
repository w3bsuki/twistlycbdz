"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Book, Users, HeartPulse, Leaf, Info } from "lucide-react";

export const NavigationGrid = () => {
  const sections = [
    {
      title: "Shop",
      description: "Browse our premium CBD products",
      icon: <ShoppingBag className="h-5 w-5" />,
      href: "/shop",
      color: "from-emerald-500 to-emerald-600",
      bgColor: "from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/20",
      image: "/images/tincture2.png"
    },
    {
      title: "Health & Wellness",
      description: "CBD for your wellbeing",
      icon: <HeartPulse className="h-5 w-5" />,
      href: "/health-and-wellness",
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20",
      image: "/images/health.png"
    },
    {
      title: "Pet CBD",
      description: "Products for your furry friends",
      icon: <Leaf className="h-5 w-5" />,
      href: "/pet-cbd",
      color: "from-amber-500 to-amber-600",
      bgColor: "from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/20",
      image: "/images/pet.png"
    },
    {
      title: "Learn About CBD",
      description: "Education & resources",
      icon: <Info className="h-5 w-5" />,
      href: "/learn",
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20",
      image: "/images/learn.png"
    },
    {
      title: "Blog",
      description: "News & insights",
      icon: <Book className="h-5 w-5" />,
      href: "/blog",
      color: "from-pink-500 to-pink-600",
      bgColor: "from-pink-50 to-pink-100 dark:from-pink-900/30 dark:to-pink-800/20",
      image: "/images/blog.png"
    },
    {
      title: "About Us",
      description: "Our story & mission",
      icon: <Users className="h-5 w-5" />,
      href: "/about",
      color: "from-indigo-500 to-indigo-600",
      bgColor: "from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/20",
      image: "/images/about.png"
    }
  ];

  return (
    <section className="w-full py-8 md:py-16 relative overflow-hidden bg-white dark:bg-black">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-emerald-100/40 dark:bg-emerald-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-100/30 dark:bg-blue-900/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-screen-xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Discover Twistly CBD
            </h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Premium CBD products for every need
            </p>
          </motion.div>

          <div className="bg-neutral-50/80 dark:bg-neutral-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-neutral-200/60 dark:border-neutral-800/60 shadow-sm">
            <div className="container mx-auto max-w-5xl">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
                {sections.map((section, index) => (
                  <Link 
                    href={section.href} 
                    key={index}
                    className="group block"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      className={cn(
                        "relative h-full rounded-xl overflow-hidden border border-neutral-200/50 dark:border-neutral-800/50",
                        "bg-gradient-to-br", section.bgColor
                      )}
                    >
                      <div className="p-4 flex flex-col h-full">
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center mb-3",
                          "bg-gradient-to-r", section.color, "text-white"
                        )}>
                          {section.icon}
                        </div>
                        
                        <h3 className="font-semibold text-neutral-900 dark:text-white">
                          {section.title}
                        </h3>
                        
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 mb-3">
                          {section.description}
                        </p>
                        
                        <div className="mt-auto text-xs font-medium text-neutral-900 dark:text-white flex items-center">
                          <span className={cn(
                            "text-transparent bg-clip-text bg-gradient-to-r", 
                            section.color
                          )}>
                            Explore
                          </span>
                          <svg 
                            className={cn(
                              "ml-1 w-3.5 h-3.5 transform transition-transform duration-300",
                              "group-hover:translate-x-1",
                              "text-transparent bg-clip-text bg-gradient-to-r", 
                              section.color
                            )} 
                            viewBox="0 0 16 16" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M6.5 12.5L11 8L6.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 text-center"
            >
              <Link href="/shop">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white border-0 shadow-lg"
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Shop All Products
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}; 