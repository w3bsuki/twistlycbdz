'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import React from 'react';

interface InfiniteSliderProps {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  speed?: number | "slow" | "medium" | "fast";
  direction?: "left" | "right";
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
  pauseOnHover?: boolean;
}

export function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  speed,
  direction,
  reverse = false,
  className,
  itemClassName,
  pauseOnHover = false,
}: InfiniteSliderProps) {
  // Handle string speed values
  let effectiveDuration = duration;
  if (typeof speed === 'number') {
    effectiveDuration = (60 / speed) * 15;
  } else if (speed === 'slow') {
    effectiveDuration = 60;
  } else if (speed === 'medium') {
    effectiveDuration = 30;
  } else if (speed === 'fast') {
    effectiveDuration = 15;
  }
  
  // Handle direction prop - it overrides reverse
  const isReverse = direction === 'right' ? true : direction === 'left' ? false : reverse;

  return (
    <div className={cn('overflow-hidden', className)}>
      <motion.div
        className="flex w-max"
        animate={{
          x: isReverse ? [0, -50 + '%'] : [-50 + '%', 0],
        }}
        transition={{
          duration: effectiveDuration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        style={{
          gap: `${gap}px`,
          willChange: 'transform',
        }}
      >
        {itemClassName ? React.Children.map(children, child => 
          React.isValidElement(child) ? 
            React.cloneElement(child, { 
              className: cn(child.props.className, itemClassName) 
            }) : child
        ) : children}
        {itemClassName ? React.Children.map(children, child => 
          React.isValidElement(child) ? 
            React.cloneElement(child, { 
              className: cn(child.props.className, itemClassName) 
            }) : child
        ) : children}
      </motion.div>
    </div>
  );
} 