'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { hasGoodContrast, getContrastTextColor } from '@/lib/accessibility';

/**
 * Color object with hexcodes for light and dark variants
 */
interface ColorData {
  light: string;
  DEFAULT: string;
  dark: string;
}

/**
 * Map of color names to their hexcode values
 */
interface ColorMap {
  [key: string]: ColorData | string;
}

/**
 * Theme colors used in the application, with light and dark variants
 */
export const themeColors: ColorMap = {
  green: {
    light: '#86efac', // green-300
    DEFAULT: '#22c55e', // green-500
    dark: '#15803d', // green-700
  },
  blue: {
    light: '#93c5fd', // blue-300
    DEFAULT: '#3b82f6', // blue-500
    dark: '#1d4ed8', // blue-700
  },
  purple: {
    light: '#d8b4fe', // purple-300
    DEFAULT: '#a855f7', // purple-500
    dark: '#7e22ce', // purple-700
  },
  amber: {
    light: '#fcd34d', // amber-300
    DEFAULT: '#f59e0b', // amber-500
    dark: '#b45309', // amber-700
  },
  indigo: {
    light: '#a5b4fc', // indigo-300
    DEFAULT: '#6366f1', // indigo-500
    dark: '#4338ca', // indigo-700
  },
  gray: {
    light: '#d1d5db', // gray-300
    DEFAULT: '#6b7280', // gray-500
    dark: '#374151', // gray-700
  },
};

interface ContrastingTextProps {
  children: React.ReactNode;
  backgroundColor: string;
  shade?: 'light' | 'DEFAULT' | 'dark';
  className?: string;
}

/**
 * ContrastingText displays text with appropriate contrast against a given background color
 * 
 * @example
 * <ContrastingText backgroundColor="blue">Text on blue</ContrastingText>
 * <ContrastingText backgroundColor="green" shade="light">Text on light green</ContrastingText>
 */
export function ContrastingText({ 
  children, 
  backgroundColor, 
  shade = 'DEFAULT', 
  className 
}: ContrastingTextProps) {
  // Get the hex value for the background color
  const getColorHex = (): string => {
    const color = themeColors[backgroundColor] || backgroundColor;
    
    if (typeof color === 'object' && color !== null) {
      return color[shade] || color.DEFAULT;
    }
    
    return color as string;
  };

  const bgHex = getColorHex();
  const textColorClass = getContrastTextColor(bgHex);
  
  return (
    <span className={cn(textColorClass, className)}>
      {children}
    </span>
  );
}

interface ContrastBadgeProps {
  children: React.ReactNode;
  color: string; 
  shade?: 'light' | 'DEFAULT' | 'dark';
  className?: string;
}

/**
 * ContrastBadge displays a colored badge with text that has appropriate contrast
 * 
 * @example
 * <ContrastBadge color="green">Featured</ContrastBadge>
 * <ContrastBadge color="red" shade="light">Sale</ContrastBadge>
 */
export function ContrastBadge({ 
  children, 
  color, 
  shade = 'DEFAULT', 
  className 
}: ContrastBadgeProps) {
  // Get the bg class for the badge color
  const getBgColorClass = (): string => {
    return `bg-${color}-${shade === 'light' ? '300' : shade === 'dark' ? '700' : '500'}`;
  };
  
  // Determine hex value to calculate contrast
  const getColorHex = (): string => {
    const colorObj = themeColors[color];
    
    if (typeof colorObj === 'object' && colorObj !== null) {
      return colorObj[shade] || colorObj.DEFAULT;
    }
    
    // Default to a gray if color not found
    return '#6b7280';
  };
  
  const bgColorClass = getBgColorClass();
  const textColorClass = getContrastTextColor(getColorHex());
  
  return (
    <span 
      className={cn(
        bgColorClass,
        textColorClass,
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", 
        className
      )}
    >
      {children}
    </span>
  );
} 