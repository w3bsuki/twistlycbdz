'use client';

import { MoveRight, ShoppingCart } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Link from "next/link";

function Hero() {
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="grid grid-cols-1 gap-8 items-center md:grid-cols-2">
          <div className="flex gap-4 flex-col">
            <div>
              <Badge variant="outline" className="text-green-600 border-green-300">Premium CBD</Badge>
            </div>
            <div className="flex gap-4 flex-col">
              <h1 className="text-5xl md:text-7xl max-w-lg tracking-tighter text-left font-regular text-green-900">
                Natural Wellness Vitality
              </h1>
              <p className="text-xl leading-relaxed tracking-tight text-green-700 max-w-md text-left">
                Experience the power of nature with our premium CBD products. Sourced from organic hemp and crafted for optimal wellness, beauty, and performance.
              </p>
            </div>
            <div className="flex flex-row gap-4">
              <Button asChild size="lg" className="gap-4" variant="outline">
                <Link href="/learn">
                  Learn about hemp <MoveRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="lg" className="gap-4 bg-green-600 hover:bg-green-700">
                <Link href="/shop">
                  Shop CBD <ShoppingCart className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="relative overflow-hidden rounded-xl">
              <AspectRatio ratio={1} className="bg-green-50">
                <div className="absolute inset-0 flex items-center justify-center hover:bg-green-100/80 transition-colors">
                  <span className="text-xl font-semibold text-green-800">Health</span>
                </div>
              </AspectRatio>
            </div>
            <div className="relative overflow-hidden rounded-xl row-span-2">
              <AspectRatio ratio={2/1} className="bg-red-50">
                <div className="absolute inset-0 flex items-center justify-center hover:bg-red-100/80 transition-colors">
                  <span className="text-xl font-semibold text-red-800">Sport</span>
                </div>
              </AspectRatio>
            </div>
            <div className="relative overflow-hidden rounded-xl">
              <AspectRatio ratio={1} className="bg-yellow-50">
                <div className="absolute inset-0 flex items-center justify-center hover:bg-yellow-100/80 transition-colors">
                  <span className="text-xl font-semibold text-yellow-800">Beauty</span>
                </div>
              </AspectRatio>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero }; 