import dynamic from 'next/dynamic';
import React from 'react';

interface DynamicImportOptions {
  /**
   * Enable/disable SSR for the imported component
   * Default: true
   */
  ssr?: boolean;
  
  /**
   * Custom loading component to show while the component is loading
   * Default: Minimal loading spinner
   */
  loading?: React.ComponentType<any> | null;
  
  /**
   * Optional display name for the loaded component (useful for debugging)
   */
  displayName?: string;
}

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