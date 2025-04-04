import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';
import { DATA_TEST_ID } from '../../src/components/ui/data-testid';

test.describe('Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    await injectAxe(page);
  });

  test('Home page has no accessibility violations', async ({ page }) => {
    await page.goto('/');
    await checkA11y(page);
    
    // Check skip link functionality
    const skipLink = page.getByTestId(DATA_TEST_ID.SKIP_TO_CONTENT);
    await expect(skipLink).toBeVisible();
    
    await skipLink.click();
    const mainContent = page.getByTestId(DATA_TEST_ID.MAIN_CONTENT);
    await expect(mainContent).toBeFocused();
  });

  test('Product page has no accessibility violations', async ({ page }) => {
    // Navigate to a product page
    await page.goto('/shop');
    const firstProduct = page.getByTestId(DATA_TEST_ID.PRODUCT_CARD).first();
    await firstProduct.click();
    
    // Check for accessibility issues
    await checkA11y(page);
    
    // Verify product information is accessible
    const productTitle = page.getByTestId(DATA_TEST_ID.PRODUCT_TITLE);
    const productPrice = page.getByTestId(DATA_TEST_ID.PRODUCT_PRICE);
    const productDescription = page.getByTestId(DATA_TEST_ID.PRODUCT_DESCRIPTION);
    
    await expect(productTitle).toBeVisible();
    await expect(productPrice).toBeVisible();
    await expect(productDescription).toBeVisible();
  });

  test('Checkout page has no accessibility violations', async ({ page }) => {
    // Add product to cart and go to checkout
    await page.goto('/shop');
    const firstProduct = page.getByTestId(DATA_TEST_ID.PRODUCT_CARD).first();
    await firstProduct.click();
    
    const addToCartButton = page.getByTestId(DATA_TEST_ID.ADD_TO_CART_BUTTON);
    await addToCartButton.click();
    
    const cartButton = page.getByTestId(DATA_TEST_ID.CART_BUTTON);
    await cartButton.click();
    
    const checkoutButton = page.getByTestId(DATA_TEST_ID.CHECKOUT_BUTTON);
    await checkoutButton.click();
    
    // Check for accessibility issues
    await checkA11y(page);
    
    // Verify form labels are properly associated with inputs
    const checkoutForm = page.getByTestId(DATA_TEST_ID.CHECKOUT_FORM);
    await expect(checkoutForm).toBeVisible();
  });

  test('Keyboard navigation works correctly', async ({ page }) => {
    await page.goto('/');
    
    // Navigate through main navigation using Tab
    await page.keyboard.press('Tab'); // Focus on skip link
    await expect(page.getByTestId(DATA_TEST_ID.SKIP_TO_CONTENT)).toBeFocused();
    
    await page.keyboard.press('Tab'); // Focus on first nav link
    const navLinks = page.getByTestId(DATA_TEST_ID.NAV_LINK);
    await expect(navLinks.first()).toBeFocused();
    
    // Tab through all navigation items
    let tabCount = 0;
    const maxTabs = 10; // Safety limit
    let cartButtonFound = false;
    
    while (tabCount < maxTabs) {
      await page.keyboard.press('Tab');
      tabCount++;
      
      try {
        const isFocused = await page.getByTestId(DATA_TEST_ID.CART_BUTTON).evaluate(el => {
          return el === document.activeElement;
        });
        
        if (isFocused) {
          cartButtonFound = true;
          break;
        }
      } catch (e) {
        // Element might not be found yet, continue
      }
    }
    
    expect(cartButtonFound).toBeTruthy();
  });

  test('Focus management in cart drawer', async ({ page }) => {
    await page.goto('/');
    
    // Open cart drawer
    const cartButton = page.getByTestId(DATA_TEST_ID.CART_BUTTON);
    await cartButton.click();
    
    // Focus should be trapped inside drawer
    const cartDrawer = page.getByTestId(DATA_TEST_ID.CART_DRAWER);
    await expect(cartDrawer).toBeVisible();
    
    // First focus should be on close button or first interactive element
    // Then tab through all elements and verify focus remains in drawer
    let isInDrawer = true;
    const maxTabs = 10;
    
    for (let i = 0; i < maxTabs; i++) {
      await page.keyboard.press('Tab');
      
      // Check if focus is still within the drawer
      isInDrawer = await cartDrawer.evaluate(drawer => {
        return drawer.contains(document.activeElement);
      });
      
      expect(isInDrawer).toBeTruthy();
    }
  });
}); 