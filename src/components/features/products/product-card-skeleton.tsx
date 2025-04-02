/**
 * ProductCardSkeleton Component
 * 
 * A loading skeleton for product cards that matches the design of our ProductCard component.
 * Uses shadcn's Skeleton component for consistent loading states.
 */

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function ProductCardSkeleton() {
  return (
    <Card className="group relative overflow-hidden border-2 border-muted bg-background transition-all hover:border-muted/80">
      {/* Image Skeleton */}
      <div className="relative">
        <Skeleton className="aspect-square w-full" />
        {/* Badge Skeleton */}
        <div className="absolute left-2 top-2">
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        {/* Quick Actions Skeleton */}
        <div className="absolute right-2 top-2 flex flex-col gap-2">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-8 w-8 rounded-lg" />
        </div>
      </div>

      <CardContent className="p-4">
        {/* Category and Rating */}
        <div className="mb-2 flex items-center justify-between">
          <Skeleton className="h-4 w-20" />
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-12" />
          </div>
        </div>

        {/* Title */}
        <Skeleton className="mb-2 h-6 w-full" />

        {/* Description */}
        <div className="space-y-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>

        {/* Price and Action */}
        <div className="mt-4 flex items-center justify-between">
          <div className="space-y-1">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-10 w-28 rounded-lg" />
        </div>
      </CardContent>
    </Card>
  )
} 