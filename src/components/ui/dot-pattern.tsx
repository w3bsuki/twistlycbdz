"use client"

import { cn } from "@/lib/utils"

interface DotPatternProps {
  className?: string
  children?: React.ReactNode
}

export function DotPattern({ className, children }: DotPatternProps) {
  return (
    <div
      className={cn(
        "h-full w-full dark:bg-dot-white/[0.2] bg-dot-black/[0.2]",
        className
      )}
    >
      {children}
    </div>
  )
} 