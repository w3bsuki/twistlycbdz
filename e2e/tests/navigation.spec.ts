import { test, expect } from '@playwright/test';
import { DATA_TEST_ID } from '../../src/components/ui/data-testid';

test.describe('Navigation Tests', () => {
  test('can navigate to all main sections from the homepage', async ({ page }) => {
    await page.goto('/');

    // Test header navigation links
    const navLinks = page.getByTestId(DATA_TEST_ID.NAV_LINK);
    const linkCount = await navLinks.count();
    
    for (let i = 0; i < linkCount; i++) {
      const links = page.getByTestId(DATA_TEST_ID.NAV_LINK);
      const linkText = await links.nth(i).textContent();
      const href = await links.nth(i).getAttribute('href');
      
      if (!href || href === '#' || href.startsWith('mailto:') || href.startsWith('tel:')) {
        continue; // Skip non-navigation links
      }
      
      await links.nth(i).click();
      
      // Verify navigation succeeded
      await expect(page).toHaveURL(new RegExp(href.replace('/', '\\/') + '.*'));
      
      // Go back to homepage for next test
      await page.goto('/');
    }
  });
  
  test('user can click product card to view product details', async ({ page }) => {
    // Go to shop page
    await page.goto('/shop');
    
    // Click on the first product card
    const productCards = page.getByTestId(DATA_TEST_ID.PRODUCT_CARD);
    const firstProductTitle = await page.getByTestId(DATA_TEST_ID.PRODUCT_TITLE).first().textContent();
    
    await productCards.first().click();
    
    // Verify we're on a product detail page
    await expect(page).toHaveURL(/\/shop\/[^\/]+$/);
    
    // Verify the product title matches what we clicked
    const detailPageTitle = await page.getByTestId(DATA_TEST_ID.PRODUCT_TITLE).textContent();
    expect(detailPageTitle).toEqual(firstProductTitle);
    
    // Verify product detail elements are present
    await expect(page.getByTestId(DATA_TEST_ID.PRODUCT_DESCRIPTION)).toBeVisible();
    await expect(page.getByTestId(DATA_TEST_ID.PRODUCT_PRICE)).toBeVisible();
    await expect(page.getByTestId(DATA_TEST_ID.ADD_TO_CART_BUTTON)).toBeVisible();
  });
  
  test('can navigate to all category pages', async ({ page }) => {
    await page.goto('/');
    
    // Get all category links from navigation
    const categoryLinks = [
      '/shop',
      '/category/cbd-oils',
      '/category/cbd-gummies',
      '/category/cbd-topicals',
      '/category/pet-cbd'
    ];
    
    for (const link of categoryLinks) {
      await page.goto(link);
      
      // Verify page loaded successfully
      await expect(page.getByTestId(DATA_TEST_ID.CATEGORY_HERO)).toBeVisible();
      await expect(page.getByTestId(DATA_TEST_ID.CATEGORY_PRODUCTS)).toBeVisible();
      
      // Verify products are displayed
      const productCards = page.getByTestId(DATA_TEST_ID.PRODUCT_CARD);
      await expect(productCards.first()).toBeVisible();
    }
  });
  
  test('mobile menu works correctly', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/');
    
    // Open mobile menu
    const menuButton = page.getByTestId(DATA_TEST_ID.MOBILE_MENU_BUTTON);
    await menuButton.click();
    
    // Verify mobile menu is visible
    const mobileMenu = page.getByTestId(DATA_TEST_ID.MOBILE_MENU);
    await expect(mobileMenu).toBeVisible();
    
    // Click a navigation link
    const navLinks = mobileMenu.getByTestId(DATA_TEST_ID.NAV_LINK);
    const shopLink = navLinks.filter({ hasText: 'Shop' });
    await shopLink.click();
    
    // Verify navigation succeeded
    await expect(page).toHaveURL(/\/shop/);
    
    // Verify mobile menu is closed after navigation
    await expect(mobileMenu).not.toBeVisible();
  });
  
  test('footer links work correctly', async ({ page }) => {
    await page.goto('/');
    
    // Get footer element
    const footer = page.getByTestId(DATA_TEST_ID.FOOTER);
    
    // Get all links in footer
    const footerLinks = footer.locator('a');
    const linkCount = await footerLinks.count();
    
    // Test a sample of footer links (not all to keep test efficient)
    const maxLinksToTest = Math.min(3, linkCount);
    
    for (let i = 0; i < maxLinksToTest; i++) {
      const links = footer.locator('a');
      const href = await links.nth(i).getAttribute('href');
      
      if (!href || href === '#' || href.startsWith('mailto:') || href.startsWith('tel:')) {
        continue; // Skip non-navigation links
      }
      
      await links.nth(i).click();
      
      // Verify navigation succeeded
      await expect(page).toHaveURL(new RegExp(href.replace('/', '\\/') + '.*'));
      
      // Go back to homepage for next test
      await page.goto('/');
    }
  });
});

test.describe('Shopping Cart Functionality', () => {
  test('should add product to cart and verify cart updates', async ({ page }) => {
    // Go to a product page
    await page.goto('/shop');
    await page.locator('.product-card').first().click();
    
    // Wait for product page to load
    await page.waitForSelector('[data-testid="add-to-cart-button"]');
    
    // Get current cart count (might be 0 or null if no badge is shown)
    const initialCartCountText = await page.locator('[data-testid="cart-count"]').textContent() || '0';
    const initialCartCount = parseInt(initialCartCountText) || 0;
    
    // Add product to cart
    await page.locator('[data-testid="add-to-cart-button"]').click();
    
    // Check cart count increased
    await expect(async () => {
      const newCountText = await page.locator('[data-testid="cart-count"]').textContent() || '0';
      const newCount = parseInt(newCountText) || 0;
      expect(newCount).toBeGreaterThan(initialCartCount);
    }).toPass();
    
    // Open cart to verify product is there
    await page.locator('[data-testid="cart-button"]').click();
    
    // Verify cart opened and contains the product
    await expect(page.locator('[data-testid="cart-drawer"]')).toBeVisible();
    await expect(page.locator('[data-testid="cart-items"]')).toBeVisible();
    
    // Verify at least one cart item exists
    await expect(page.locator('[data-testid="cart-item"]')).toHaveCount(1);
  });
});

test.describe('Mobile Responsiveness', () => {
  // This test will run only on mobile devices
  test('mobile navigation menu should work correctly', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'This test is mobile-only');
    
    await page.goto('/');
    
    // Mobile menu should be collapsed initially
    await expect(page.locator('[data-testid="mobile-menu"]')).not.toBeVisible();
    
    // Open mobile menu
    await page.locator('[data-testid="mobile-menu-button"]').click();
    
    // Menu should be visible now
    await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible();
    
    // Mobile menu should have navigation items
    await expect(page.locator('[data-testid="mobile-menu"]').getByRole('link')).toHaveCount(5);
    
    // Click a category in the mobile menu
    await page.locator('[data-testid="mobile-menu"]').getByRole('link', { name: /health/i }).click();
    
    // Verify navigation worked
    await expect(page).toHaveURL(/.*health-and-wellness/);
  });
}); 