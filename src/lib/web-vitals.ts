'use client';

import { 
  Metric, 
  onCLS, 
  onFCP, 
  onFID, 
  onINP, 
  onLCP, 
  onTTFB,
  ReportCallback 
} from 'web-vitals';
import { trackWebVital, WebVitalMetric } from './analytics';

// Define thresholds for Core Web Vitals as per Google's recommendations
const WEB_VITALS_THRESHOLDS = {
  CLS: { good: 0.1, poor: 0.25 }, // Cumulative Layout Shift
  FID: { good: 100, poor: 300 },  // First Input Delay (ms)
  LCP: { good: 2500, poor: 4000 }, // Largest Contentful Paint (ms)
  FCP: { good: 1800, poor: 3000 }, // First Contentful Paint (ms)
  TTFB: { good: 800, poor: 1800 }, // Time to First Byte (ms)
  INP: { good: 200, poor: 500 }    // Interaction to Next Paint (ms)
};

// Determine the rating based on the metric value and thresholds
export function getRating(name: WebVitalMetric, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = WEB_VITALS_THRESHOLDS[name];
  if (!threshold) return 'needs-improvement';
  
  if (value <= threshold.good) return 'good';
  if (value >= threshold.poor) return 'poor';
  return 'needs-improvement';
}

// Process a metric and send it to analytics
export function processMetric(metric: Metric, path: string): void {
  const { name, value, id } = metric;
  const metricName = name.toUpperCase() as WebVitalMetric;
  const rating = getRating(metricName, value);
  
  // Report the metric to analytics
  trackWebVital(metricName, value, path, rating);
  
  // Log in development for debugging
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vital] ${metricName}: ${value} (${rating})`);
  }
}

// Report all web vitals for a given path
export function reportWebVitals(path: string): void {
  try {
    // Handle browsers without performance reporting support
    if (typeof window === 'undefined' || !window.performance) {
      return;
    }
    
    const reportMetric: ReportCallback = (metric) => processMetric(metric, path);

    // Register all the web vitals metrics
    onCLS(reportMetric);
    onFID(reportMetric);
    onLCP(reportMetric);
    onFCP(reportMetric);
    onTTFB(reportMetric);
    onINP(reportMetric);
  } catch (error) {
    console.error('[Web Vitals] Error setting up metrics:', error);
  }
}

export default reportWebVitals; 