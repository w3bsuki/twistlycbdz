'use client'

import React from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Container } from "@/components/ui/container"

export function BlogSectionSkeleton() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-white to-green-50 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />
      
      <Container>
        {/* Header Skeleton */}
        <div className="flex flex-col items-center mb-8">
          <Skeleton className="h-6 w-32 mb-3" />
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-5 w-full max-w-md" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {Array(3).fill(0).map((_, index) => (
            <BlogCardSkeleton key={index} />
          ))}
        </div>
        
        {/* Button Skeleton */}
        <div className="flex justify-center">
          <Skeleton className="h-10 w-40" />
        </div>
      </Container>
    </section>
  )
}

function BlogCardSkeleton() {
  return (
    <Card className="overflow-hidden h-full flex flex-col border border-green-100">
      {/* Image Area */}
      <Skeleton className="h-44 w-full rounded-none" />
      
      <CardContent className="flex-1 p-4">
        {/* Date and Time */}
        <div className="flex gap-3 mb-3">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        
        {/* Title */}
        <Skeleton className="h-6 w-full mb-3" />
        
        {/* Excerpt */}
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-3" />
        
        {/* Author */}
        <div className="flex items-center gap-2 mt-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <div>
            <Skeleton className="h-4 w-24 mb-1" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-4 py-3 bg-gray-50 border-t border-gray-100">
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-1.5">
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-5 w-12" />
          </div>
          <Skeleton className="h-4 w-20" />
        </div>
      </CardFooter>
    </Card>
  )
} 