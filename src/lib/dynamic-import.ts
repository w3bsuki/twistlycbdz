import { ComponentType } from 'react';
import dynamic from 'next/dynamic';

type ComponentImportMap = {
  [key: string]: () => Promise<{ default: ComponentType<any> }>;
};

const componentImports: ComponentImportMap = {
  // Add your component imports here
  BlogComponent: () => import('@/components/features/home/blog-section'),
  HeroComponent: () => import('@/components/sections/hero'),
  TestimonialsComponent: () => import('@/components/features/home/testimonials'),
  CtaComponent: () => import('@/components/shared/category/CategoryCta'),
  // Add more components as needed
};

/**
 * Dynamically imports a component by its name.
 * 
 * @param componentName - The name of the component to import
 * @param options - Options for the dynamic import (loading component, SSR settings, etc.)
 * @returns The dynamically imported component
 */
export function dynamicImport(
  componentName: string,
  options: {
    loading?: ComponentType;
    ssr?: boolean;
  } = {}
) {
  if (!componentImports[componentName]) {
    console.error(`Component "${componentName}" not found in import map`);
    return null;
  }

  return dynamic(componentImports[componentName], options);
}

export default dynamicImport;

/**
 * Creates an optimized, dynamically loaded component with proper TypeScript typing
 * @param loader Function that imports the component
 * @param options Configuration options for the dynamic import
 * @returns Dynamically loaded component with the same props as the original
 */
export function dynamicImport<T extends React.ComponentType<any>>(
  loader: () => Promise<{ default: T }>,
  options: DynamicImportOptions = {}
): React.ComponentType<React.ComponentProps<T>> {
  const {
    ssr = true,
    loading: LoadingComponent = DefaultLoading,
    displayName
  } = options;

  const DynamicComponent = dynamic(loader, {
    ssr,
    loading: LoadingComponent ? () => <LoadingComponent /> : undefined
  });

  if (displayName) {
    DynamicComponent.displayName = displayName;
  }

  return DynamicComponent;
}

/**
 * Default loading component
 */
const DefaultLoading: React.FC = () => (
  <div className="flex h-32 w-full items-center justify-center">
    <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-800" />
  </div>
);

/**
 * Example usage:
 * 
 * const DynamicHeavyComponent = dynamicImport(
 *   () => import('@/components/features/heavy-component'),
 *   { 
 *     ssr: false,
 *     displayName: 'DynamicHeavyComponent'
 *   }
 * );
 */ 