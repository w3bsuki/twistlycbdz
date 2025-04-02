/**
 * Shared Component Prop Types
 * 
 * This file contains standardized prop type definitions that can be reused
 * across multiple components for consistency.
 */

import { ReactNode } from 'react'

/**
 * Base props that most components should include
 */
export interface BaseComponentProps {
  /** Optional CSS class name to override styles */
  className?: string
  /** Optional unique identifier */
  id?: string
  /** Optional ARIA label for accessibility */
  ariaLabel?: string
  /** Optional test ID for testing */
  testId?: string
}

/**
 * Standard color scheme options used across components
 */
export type ColorScheme = 'green' | 'blue' | 'purple' | 'amber' | 'default'

/**
 * Props related to color theming
 */
export interface ThemeProps {
  /** Color scheme to use for the component */
  colorScheme?: ColorScheme
}

/**
 * Props for components that have titles and subtitles
 */
export interface HeadingProps {
  /** Main title text */
  title?: string
  /** Secondary subtitle text */
  subtitle?: string
}

/**
 * Props for handling actions like button clicks
 */
export interface ActionProps {
  /** Function to call when primary action is triggered */
  onAction?: () => void
  /** Text for the primary action button */
  actionText?: string
  /** URL to navigate to when action is triggered */
  actionHref?: string
  /** Whether the action should open in a new tab */
  actionOpenNewTab?: boolean
}

/**
 * Props for components that have secondary actions
 */
export interface SecondaryActionProps {
  /** Function to call when secondary action is triggered */
  onSecondaryAction?: () => void
  /** Text for the secondary action button */
  secondaryActionText?: string
  /** URL to navigate to when secondary action is triggered */
  secondaryActionHref?: string
  /** Whether the secondary action should open in a new tab */
  secondaryActionOpenNewTab?: boolean
}

/**
 * Props for components that can expand/collapse
 */
export interface ExpandableProps {
  /** Whether the component is expanded by default */
  defaultExpanded?: boolean
  /** Whether the component is expanded (controlled) */
  expanded?: boolean
  /** Function to call when expanded state changes */
  onExpandedChange?: (expanded: boolean) => void
}

/**
 * Props for components that can be animated
 */
export interface AnimationProps {
  /** Whether to animate the component */
  animate?: boolean
  /** Delay before animation starts (in seconds) */
  animationDelay?: number
  /** Duration of the animation (in seconds) */
  animationDuration?: number
  /** Whether to run the animation only once when the component enters the viewport */
  animateOnce?: boolean
}

/**
 * Props for components that contain children
 */
export interface ChildrenProps {
  /** React children to render within the component */
  children?: ReactNode
}

/**
 * Props for components that can have different sizes
 */
export interface SizeProps {
  /** Size of the component */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

/**
 * Props for components that display products
 */
export interface ProductDisplayProps {
  /** Number of products to display */
  limit?: number
  /** Whether to show product ratings */
  showRatings?: boolean
  /** Whether to show the add to cart button */
  showAddToCart?: boolean
  /** Whether to show badges (sale, new, etc.) */
  showBadges?: boolean
}

/**
 * Standard product object structure used in product displays
 */
export interface Product {
  /** Unique product identifier */
  id: string
  /** Product name */
  name: string
  /** Product description */
  description?: string
  /** Product slug for URL */
  slug?: string
  /** Product image URL */
  image: string
  /** Product price as string (formatted) */
  price: string
  /** Original price before discount */
  originalPrice?: string
  /** Product rating (0-5) */
  rating?: number
  /** Number of reviews */
  reviewCount?: number
  /** Product category */
  category?: string
  /** Whether the product is featured */
  featured?: boolean
  /** Product variants */
  variants?: ProductVariant[]
  /** Product attributes */
  attributes?: Record<string, string>
  /** Whether the product is in stock */
  inStock?: boolean
  /** Product tags */
  tags?: string[]
}

/**
 * Standard product variant structure
 */
export interface ProductVariant {
  /** Variant ID */
  id: string
  /** Variant name */
  name: string
  /** Variant price */
  price?: string
  /** Whether the variant is in stock */
  inStock?: boolean
  /** Variant attributes */
  attributes?: Record<string, string>
}

/**
 * Standard testimonial structure for reviews and testimonials
 */
export interface Testimonial {
  /** Author name */
  author: string
  /** Author title or role */
  role?: string
  /** Author image URL */
  imageUrl?: string
  /** Testimonial text */
  text: string
  /** Rating (0-5) */
  rating?: number
  /** Date of the testimonial */
  date?: string
} 