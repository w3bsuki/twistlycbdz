import { test, expect } from '@playwright/test';
import { DATA_TEST_ID } from '../../src/components/ui/data-testid';

// Define performance thresholds (milliseconds)
const PERFORMANCE_THRESHOLDS = {
  FCP: 1800, // First Contentful Paint
  PAGE_LOAD: 3000, // Total page load
  IMAGE_LOAD: 1500, // Image loading
  NAVIGATION: 1000, // Navigation operations
};

test.describe('Performance Tests', () => {
  test('measures First Contentful Paint', async ({ page }) => {
    // Enable performance metrics
    await page.goto('/');
    
    // Use the performance API to get FCP
    const fcpValue = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntriesByName('first-contentful-paint');
          if (entries.length > 0) {
            resolve(entries[0].startTime);
          }
        }).observe({ type: 'paint', buffered: true });
        
        // Resolve with a high value if FCP is not found after 5 seconds
        setTimeout(() => resolve(10000), 5000);
      });
    });
    
    // Log and assert FCP value
    console.log(`First Contentful Paint: ${fcpValue}ms`);
    expect(fcpValue).toBeLessThan(PERFORMANCE_THRESHOLDS.FCP);
  });
  
  test('loads product listings efficiently', async ({ page }) => {
    // Start performance measurement
    const navigationStart = Date.now();
    
    // Navigate to shop page
    await page.goto('/shop');
    
    // End performance measurement
    const navigationTime = Date.now() - navigationStart;
    console.log(`Shop page navigation time: ${navigationTime}ms`);
    
    // Assert navigation time
    expect(navigationTime).toBeLessThan(PERFORMANCE_THRESHOLDS.PAGE_LOAD);
    
    // Check time to load product cards
    const productStart = Date.now();
    await page.getByTestId(DATA_TEST_ID.PRODUCT_CARD).first().waitFor();
    const productLoadTime = Date.now() - productStart;
    
    console.log(`Product cards load time: ${productLoadTime}ms`);
    expect(productLoadTime).toBeLessThan(PERFORMANCE_THRESHOLDS.NAVIGATION);
  });
  
  test('verifies Core Web Vitals metrics are tracked', async ({ page }) => {
    await page.goto('/');
    
    // Wait for performance monitor to be available
    const perfMonitor = page.getByTestId(DATA_TEST_ID.PERFORMANCE_MONITOR);
    await expect(perfMonitor).toBeInTheDocument();
    
    // Verify metrics are tracked in console (indirect test)
    const consoleMessages = [];
    page.on('console', msg => {
      if (msg.text().includes('web_vital')) {
        consoleMessages.push(msg.text());
      }
    });
    
    // Perform some actions that would trigger layout shifts
    await page.goto('/shop');
    await page.getByTestId(DATA_TEST_ID.PRODUCT_CARD).first().click();
    
    // Give time for metrics to be collected
    await page.waitForTimeout(1000);
    
    // Indirect verification - we can't directly assert on the metrics values
    // but we can check if the tracking code is working
    expect(consoleMessages.length).toBeGreaterThan(0);
  });
  
  test('loads images efficiently with lazy loading', async ({ page }) => {
    // Navigate to a page with multiple images
    await page.goto('/shop');
    
    // Wait for first product image to be visible
    const firstImage = page.getByTestId(DATA_TEST_ID.PRODUCT_IMAGE).first();
    await expect(firstImage).toBeVisible();
    
    // Measure time to load visible images
    const startTime = Date.now();
    
    // Wait for all visible product images to load
    const visibleImages = await page.getByTestId(DATA_TEST_ID.PRODUCT_IMAGE).all();
    for (let i = 0; i < Math.min(4, visibleImages.length); i++) {
      await expect(visibleImages[i]).toBeVisible();
    }
    
    const loadTime = Date.now() - startTime;
    console.log(`Time to load visible images: ${loadTime}ms`);
    
    // Images should load quickly since they should be optimized
    expect(loadTime).toBeLessThan(PERFORMANCE_THRESHOLDS.IMAGE_LOAD);
    
    // Scroll down to trigger lazy loading of more images
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight);
    });
    
    // Wait for more images to become visible after scrolling
    await page.waitForTimeout(500);
    
    // Verify that more images are now visible
    const additionalImagesVisible = await page.getByTestId(DATA_TEST_ID.PRODUCT_IMAGE).count();
    expect(additionalImagesVisible).toBeGreaterThan(visibleImages.length);
  });
  
  test('navigation between pages is performant', async ({ page }) => {
    await page.goto('/');
    
    // Get navigation links
    const navLinks = page.getByTestId(DATA_TEST_ID.NAV_LINK);
    const linkCount = await navLinks.count();
    
    // Test navigation performance for a few links
    for (let i = 0; i < Math.min(3, linkCount); i++) {
      const links = page.getByTestId(DATA_TEST_ID.NAV_LINK);
      const href = await links.nth(i).getAttribute('href');
      
      if (!href || href === '#' || href.startsWith('mailto:') || href.startsWith('tel:')) {
        continue; // Skip non-navigation links
      }
      
      // Measure navigation time
      const startTime = Date.now();
      await links.nth(i).click();
      
      // Wait for page content to be visible
      await page.getByTestId(DATA_TEST_ID.MAIN_CONTENT).waitFor();
      
      const navTime = Date.now() - startTime;
      console.log(`Navigation to ${href} took: ${navTime}ms`);
      
      // Assert navigation performance
      expect(navTime).toBeLessThan(PERFORMANCE_THRESHOLDS.NAVIGATION);
      
      // Go back to homepage for next test
      await page.goto('/');
    }
  });
}); 