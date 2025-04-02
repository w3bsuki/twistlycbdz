/**
 * useAnimationConfig - A hook for managing animation preferences and configurations
 * 
 * This hook provides consistent animation handling across the application,
 * with special consideration for users who prefer reduced motion.
 */

import { useReducedMotion, Variant, Variants, Transition, MotionProps } from 'framer-motion';
import { useMemo } from 'react';

// Config type to be returned from the hook
export type AnimationConfig = {
  // Whether animations should be reduced based on user preference
  shouldReduceMotion: boolean;
  
  // Get conditional variants based on reduced motion preference
  getVariants: <T extends Variants>(variants: T) => T;
  
  // Get motion props with SSR-safe configuration
  getMotionProps: (props: MotionProps) => MotionProps;
  
  // Get transition options based on preferences
  getTransition: (duration?: number) => Transition;
};

// Common animation variants for reuse
export const fadeInUpVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      duration: 0.5 
    } 
  }
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 1 }, // Start visible to fix hydration issues
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

export const slideInLeftVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: -20
  },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] 
    } 
  }
};

export const slideInRightVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: 20
  },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] 
    } 
  }
};

/**
 * Custom hook for animation configuration that respects reduced motion preferences
 * and provides consistent SSR-friendly animations
 */
export function useAnimationConfig(): AnimationConfig {
  // Check if user prefers reduced motion
  const shouldReduceMotion = useReducedMotion() ?? false;
  
  // Memoize the animation config to prevent unnecessary re-renders
  return useMemo(() => ({
    shouldReduceMotion,
    
    // Get variants based on reduced motion preference
    getVariants: <T extends Variants>(variants: T): T => {
      // If reduced motion is preferred, simplify animations
      if (shouldReduceMotion) {
        // Create a simplified version that only changes opacity with no transforms
        const simplifiedVariants = { ...variants };
        
        // Modify each animation state to be simpler
        Object.keys(simplifiedVariants).forEach(key => {
          const variant = simplifiedVariants[key as keyof T];
          if (typeof variant === 'object') {
            // Remove transform animations but keep opacity
            const simplified = { 
              ...variant,
              x: 0,
              y: 0,
              scale: 1,
              rotate: 0,
            };
            
            // Update the transition to be quicker
            if (simplified.transition) {
              simplified.transition = {
                ...simplified.transition,
                duration: Math.min(simplified.transition.duration || 0.2, 0.2)
              };
            }
            
            simplifiedVariants[key as keyof T] = simplified as Variant;
          }
        });
        
        return simplifiedVariants;
      }
      
      return variants;
    },
    
    // Get motion props with SSR-safe configuration
    getMotionProps: (props: MotionProps): MotionProps => {
      // Base props that work well with SSR
      const baseProps: MotionProps = {
        ...props,
        // Add SSR-specific props for better hydration
        initial: "hidden",
        animate: "visible",
        exit: "hidden",
        // This helps prevent hydration mismatches
        suppressHydrationWarning: true,
      };
      
      // If reduced motion is preferred, adjust the default props
      if (shouldReduceMotion) {
        return {
          ...baseProps,
          transition: {
            ...baseProps.transition,
            duration: 0.1,
          },
        };
      }
      
      return baseProps;
    },
    
    // Get transition options based on preferences
    getTransition: (duration = 0.5): Transition => {
      if (shouldReduceMotion) {
        return {
          duration: Math.min(duration * 0.5, 0.2),
          ease: "easeOut",
        };
      }
      
      return {
        duration,
        ease: [0.22, 1, 0.36, 1], // Custom ease curve
      };
    },
  }), [shouldReduceMotion]);
} 