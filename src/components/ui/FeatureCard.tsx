import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  link?: { text: string; href: string } | string;
  className?: string;
  theme?: {
    gradient: string;
    accent: string;
    border: string;
    text: string;
    textLight: string;
  };
}

export const FeatureCard = ({
  icon,
  title,
  description,
  link,
  className,
  theme = {
    gradient: "from-green-50 via-green-100/80 to-green-50/40",
    accent: "bg-green-600",
    border: "border-green-200",
    text: "text-green-800",
    textLight: "text-green-600",
  }
}: FeatureCardProps) => {
  const href = typeof link === 'string' ? link : link?.href;
  const linkText = typeof link === 'string' ? "Explore" : link?.text;

  const cardContent = (
    <>
      {/* Top gradient accent line */}
      <div className={cn("h-1.5 w-full rounded-t-xl", theme.accent)} />
      
      {/* Card content */}
      <div className="flex flex-col items-center text-center px-4 py-5">
        {/* Icon in circle */}
        <div className={cn(
          "size-14 rounded-full flex items-center justify-center mb-4",
          "bg-white/90 shadow-sm border",
          theme.border
        )}>
          {React.cloneElement(icon as React.ReactElement, { 
            className: cn("size-6", theme.textLight) 
          })}
        </div>
        
        {/* Title */}
        <h3 className={cn("text-base font-semibold mb-1.5", theme.text)}>
          {title}
        </h3>
        
        {/* Description if provided */}
        {description && (
          <p className="text-xs text-gray-600 mb-3 line-clamp-2">
            {description}
          </p>
        )}
        
        {/* Link with arrow */}
        {link && href && (
          <div className={cn(
            "mt-auto inline-flex items-center text-xs font-medium gap-1",
            theme.textLight
          )}>
            {linkText}
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </div>
        )}
      </div>
    </>
  );

  const cardClasses = cn(
    "rounded-xl border overflow-hidden transition-all duration-300",
    "bg-gradient-to-br shadow-sm", 
    theme.gradient,
    theme.border,
    "hover:shadow-md transform hover:-translate-y-1",
    "flex flex-col h-full",
    className
  );

  return href ? (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <Link href={href} className={cn(cardClasses, "group")}>
        {cardContent}
      </Link>
    </motion.div>
  ) : (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className={cardClasses}
    >
      {cardContent}
    </motion.div>
  );
}; 