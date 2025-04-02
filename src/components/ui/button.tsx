'use client'

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-sm hover:shadow-md hover:from-green-700 hover:to-green-800",
        primary: "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-sm hover:shadow-md hover:from-green-700 hover:to-green-800",
        green: "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-sm hover:shadow-md hover:from-green-700 hover:to-green-800",
        blue: "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-sm hover:shadow-md hover:from-blue-700 hover:to-blue-800",
        purple: "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-sm hover:shadow-md hover:from-purple-700 hover:to-purple-800",
        amber: "bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-sm hover:shadow-md hover:from-amber-700 hover:to-amber-800",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        outlineGreen: "border border-green-200 text-green-700 hover:bg-green-50/50 hover:border-green-300",
        outlineBlue: "border border-blue-200 text-blue-700 hover:bg-blue-50/50 hover:border-blue-300",
        outlinePurple: "border border-purple-200 text-purple-700 hover:bg-purple-50/50 hover:border-purple-300",
        outlineAmber: "border border-amber-200 text-amber-700 hover:bg-amber-50/50 hover:border-amber-300",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        subtle: "bg-gray-100/80 hover:bg-gray-200/80 text-gray-800",
      },
      size: {
        default: "h-10 px-4 py-2",
        xs: "h-7 rounded-md px-2.5 text-xs",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-md px-10 text-base",
        icon: "h-9 w-9",
      },
      rounded: {
        default: "rounded-md",
        full: "rounded-full",
        none: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
