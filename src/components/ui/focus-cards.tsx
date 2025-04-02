"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Link from "next/link";
import { Spotlight } from '@/components/ui/spotlight'
import { DIcons } from "dicons";

interface FocusCardsProps {
  cards: {
    title: string;
    src: string;
    href?: string;
  }[];
  className?: string;
}

export function FocusCards({ cards, className }: FocusCardsProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-0",
        className
      )}
    >
      {cards.map((card, idx) => {
        const CardWrapper = card.href ? Link : 'div';
        return (
          <CardWrapper
            key={idx}
            href={card.href || ''}
            className="relative cursor-pointer transform-gpu w-full max-w-md mx-auto"
          >
            <Card className="relative overflow-hidden border-0 bg-background/50 backdrop-blur-sm">
              <AspectRatio ratio={4/5}>
                <motion.div 
                  className="absolute inset-0"
                  whileHover="hover"
                  initial="initial"
                  animate="initial"
                >
                  <motion.div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${card.src})` }}
                    variants={{
                      hover: { scale: 1.05 },
                      initial: { scale: 1 }
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80"
                    variants={{
                      hover: { opacity: 1 },
                      initial: { opacity: 0.8 }
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col items-center text-center gap-4">
                    <motion.h3 
                      className="font-bold text-2xl md:text-3xl text-white"
                      variants={{
                        hover: { y: 0, opacity: 1 },
                        initial: { y: 5, opacity: 0.9 }
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {card.title}
                    </motion.h3>
                    {card.href && (
                      <motion.div
                        variants={{
                          hover: { y: 0, opacity: 1 },
                          initial: { y: 10, opacity: 0 }
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <Button 
                          variant="outline" 
                          size="lg" 
                          className="bg-white/10 hover:bg-white/20 border-white/20"
                        >
                          Explore <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </AspectRatio>
            </Card>
          </CardWrapper>
        );
      })}
    </div>
  );
} 