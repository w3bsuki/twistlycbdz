'use client'

import * as React from "react";
import { Leaf, Sparkles, Dumbbell } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { Grid } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

interface Hero45Props {
  badge?: string;
  heading: string;
  imageSrc?: string;
  imageAlt?: string;
  features?: Feature[];
}

const Hero45 = ({
  badge = "Twistly CBD",
  heading = "Premium CBD Products for Every Lifestyle",
  imageSrc = "https://images.unsplash.com/photo-1591825505254-45cf88639e38?w=800&auto=format&fit=crop&q=60",
  imageAlt = "CBD Oil Products Display",
  features = [
    {
      icon: <Leaf className="h-auto w-5" />,
      title: "Natural Health",
      description:
        "Premium quality CBD products sourced from organic hemp, supporting your wellness journey naturally.",
      href: "/health",
    },
    {
      icon: <Sparkles className="h-auto w-5" />,
      title: "Beauty & Skincare",
      description:
        "CBD-infused beauty products that enhance your natural radiance and promote healthy, glowing skin.",
      href: "/beauty",
    },
    {
      icon: <Dumbbell className="h-auto w-5" />,
      title: "Sports Performance",
      description:
        "Specialized CBD formulations to support recovery, reduce inflammation, and enhance athletic performance.",
      href: "/sports",
    },
  ],
}: Hero45Props) => {
  return (
    <section className="py-12 md:py-24">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="mb-12 flex flex-col items-center gap-6 text-center">
          <Badge variant="outline">{badge}</Badge>
          <h1 className="text-4xl font-semibold lg:text-5xl max-w-2xl">{heading}</h1>
        </div>
        <div className="relative mx-auto">
          <div className="overflow-hidden rounded-xl">
            <AspectRatio ratio={16/9} className="bg-muted">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent"></div>
            </AspectRatio>
          </div>
          <div className="absolute -right-4 -top-4 -z-10 aspect-video h-72 w-96 opacity-40 [background-size:12px_12px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_100%)] sm:bg-[radial-gradient(hsl(var(--muted-foreground))_1px,transparent_1px)]"></div>
          <div className="absolute -left-4 -top-4 -z-10 aspect-video h-72 w-96 opacity-40 [background-size:12px_12px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_20%,transparent_100%)] sm:bg-[radial-gradient(hsl(var(--muted-foreground))_1px,transparent_1px)]"></div>
        </div>
        <div className="mx-auto mt-10 grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => (
            <Link 
              key={index} 
              href={feature.href}
              className="transition-transform hover:scale-105"
            >
              <Card className="h-full hover:bg-muted/50 transition-colors">
                <CardHeader>
                  <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-background drop-shadow-lg">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold">{feature.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Hero45 }; 