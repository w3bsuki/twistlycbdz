/**
 * Analytics Service for Twistly CBD
 * 
 * This module provides a centralized way to track analytics events
 * including page views, ecommerce events, and performance metrics.
 */

// Define the possible analytics event types
export type AnalyticsEventType = 
  | 'page_view'
  | 'product_view'
  | 'add_to_cart'
  | 'remove_from_cart'
  | 'begin_checkout'
  | 'purchase'
  | 'web_vital'
  | 'error'
  | 'cta_click';

// Define the structure of an analytics event
interface AnalyticsEvent {
  type: AnalyticsEventType;
  payload: Record<string, any>;
  timestamp?: number;
}

// Define web vitals metric names
export type WebVitalMetric = 'CLS' | 'FID' | 'LCP' | 'FCP' | 'TTFB' | 'INP';

/**
 * Send an event to the analytics endpoint
 * This is a placeholder implementation - replace with your actual analytics service
 */
const sendToAnalyticsService = async (event: AnalyticsEvent): Promise<void> => {
  // Add timestamp if not already present
  const eventWithTimestamp = {
    ...event,
    timestamp: event.timestamp || Date.now(),
  };

  // In a production implementation, you would send this to your analytics service
  // For now, we'll just log it to the console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', eventWithTimestamp);
  }

  // Example implementation with fetch:
  // try {
  //   await fetch('/api/analytics', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(eventWithTimestamp),
  //   });
  // } catch (error) {
  //   console.error('Failed to send analytics event:', error);
  // }
};

/**
 * Track a page view event
 */
export const trackPageView = (url: string, referrer?: string): void => {
  sendToAnalyticsService({
    type: 'page_view',
    payload: {
      url,
      referrer: referrer || document.referrer,
      title: document.title,
    },
  });
};

/**
 * Track a product view event
 */
export const trackProductView = (productId: string, productName: string, price: number): void => {
  sendToAnalyticsService({
    type: 'product_view',
    payload: {
      productId,
      productName,
      price,
    },
  });
};

/**
 * Track an add to cart event
 */
export const trackAddToCart = (
  productId: string, 
  productName: string, 
  price: number, 
  quantity: number
): void => {
  sendToAnalyticsService({
    type: 'add_to_cart',
    payload: {
      productId,
      productName,
      price,
      quantity,
    },
  });
};

/**
 * Track an error event
 */
export const trackError = (errorMessage: string, errorCode?: string, errorContext?: Record<string, any>): void => {
  sendToAnalyticsService({
    type: 'error',
    payload: {
      errorMessage,
      errorCode,
      errorContext,
    },
  });
};

/**
 * Track a web vital metric
 */
export const trackWebVital = (
  metric: WebVitalMetric, 
  value: number, 
  path: string, 
  rating: 'good' | 'needs-improvement' | 'poor'
): void => {
  sendToAnalyticsService({
    type: 'web_vital',
    payload: {
      metric,
      value,
      path,
      rating,
      userAgent: navigator.userAgent,
    },
  });
};

/**
 * Track a CTA click event
 */
export const trackCTAClick = (ctaId: string, ctaText?: string, destination?: string): void => {
  sendToAnalyticsService({
    type: 'cta_click',
    payload: {
      ctaId,
      ctaText,
      destination,
    },
  });
};

/**
 * Get performance navigation information
 */
export const getPerformanceNavigationInfo = (): Record<string, any> => {
  if (typeof window === 'undefined' || !window.performance) {
    return {};
  }

  // Get navigation timing information
  const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  
  if (!navigationTiming) return {};

  return {
    dnsLookup: navigationTiming.domainLookupEnd - navigationTiming.domainLookupStart,
    tcpConnect: navigationTiming.connectEnd - navigationTiming.connectStart,
    requestTime: navigationTiming.responseStart - navigationTiming.requestStart,
    responseTime: navigationTiming.responseEnd - navigationTiming.responseStart,
    domInteractive: navigationTiming.domInteractive,
    domComplete: navigationTiming.domComplete,
    loadEvent: navigationTiming.loadEventEnd - navigationTiming.loadEventStart,
    networkLatency: navigationTiming.responseStart - navigationTiming.requestStart,
  };
};

// Export a default analytics object with all methods
export const analytics = {
  trackPageView,
  trackProductView,
  trackAddToCart,
  trackError,
  trackWebVital,
  trackCTAClick,
  getPerformanceNavigationInfo,
};

export default analytics; 