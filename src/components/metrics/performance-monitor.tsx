'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import reportWebVitals from '@/lib/web-vitals';
import { trackPageView } from '@/lib/analytics';

/**
 * PerformanceMonitor - Invisible component that monitors page performance metrics
 * 
 * This component is designed to be included once in your app's layout to track
 * Core Web Vitals and other performance metrics for all pages.
 * 
 * It uses the web-vitals library to collect performance data and reports it
 * to your analytics service.
 */
export function PerformanceMonitor() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    // Track page view on route change
    trackPageView(pathname);
    
    // Report web vitals for the current page
    reportWebVitals(pathname);
    
    // Listen for errors and report them
    const handleError = (event: ErrorEvent) => {
      const errorMessage = event.message || 'Unknown error';
      const errorStack = event.error?.stack;
      
      // Log client-side errors through the analytics service
      if (errorMessage && errorMessage !== 'Script error.') {
        console.error('[Client Error]', errorMessage, errorStack);
        // You can uncomment this to track errors in production
        // trackError(errorMessage, 'client_error', { 
        //   stack: errorStack, 
        //   pathname
        // });
      }
    };

    // Add error event listener
    window.addEventListener('error', handleError);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, [pathname]);

  // This component doesn't render anything visible
  return null;
}

export default PerformanceMonitor; 