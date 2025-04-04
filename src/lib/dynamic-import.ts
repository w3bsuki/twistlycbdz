import React from 'react';
import dynamic from 'next/dynamic';

// Define types for the component import function
type ComponentImportFunction = () => Promise<{ default: React.ComponentType<any> }>;

// Map of component names to their respective import functions
const componentMap: Record<string, ComponentImportFunction> = {
  BlogComponent: () => import('../components/features/blog/BlogComponent'),
  HeroComponent: () => import('../components/features/home/hero-section'),
  TestimonialsComponent: () => import('../components/features/home/testimonials'),
  CtaComponent: () => import('../components/features/home/cta-section'),
};

// Default loading component
const DefaultLoading = () => (
  <div className="flex items-center justify-center p-12">
    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
  </div>
);

// Options for dynamic import
type DynamicImportOptions = {
  ssr?: boolean;
  loading?: React.ComponentType;
  displayName?: string;
};

/**
 * Dynamically imports a component based on its name
 * @param componentName - Name of the component to import
 * @param options - Options for dynamic import (ssr, loading component)
 * @returns Dynamically imported component
 */
export function dynamicImport(
  componentName: string,
  options: DynamicImportOptions = {}
) {
  const { ssr = true, loading = DefaultLoading } = options;
  
  // Check if component exists in the map
  if (!componentMap[componentName]) {
    console.warn(`Component "${componentName}" not found in component map`);
    return dynamic(() => Promise.resolve(() => <div>Component not found</div>), {
      ssr,
      loading,
    });
  }
  
  // Import the component dynamically
  return dynamic(componentMap[componentName], {
    ssr,
    loading,
    displayName: options.displayName || componentName,
  });
}

/**
 * Creates a dynamically loaded component with TypeScript typing
 * @param componentName - Name of the component to import
 * @param options - Options for dynamic import
 * @returns Typed dynamic component
 * 
 * Example usage:
 * const DynamicHero = createDynamicComponent<HeroProps>('HeroComponent');
 */
export function createDynamicComponent<T = {}>(
  componentName: string,
  options: DynamicImportOptions = {}
) {
  return dynamicImport(componentName, options) as React.ComponentType<T>;
}

/**
 * Example usage:
 * 
 * const DynamicHeavyComponent = createDynamicComponent(
 *   () => import('@/components/features/heavy-component'),
 *   { 
 *     ssr: false,
 *     displayName: 'DynamicHeavyComponent'
 *   }
 * );
 */ 