import { test, expect } from '@playwright/test';
import { DATA_TEST_ID } from '../../src/components/ui/data-testid';

test.describe('Product and Cart Functionality', () => {
  test('displays all product categories', async ({ page }) => {
    await page.goto('/shop');
    
    // Verify category filters are present
    const categoryFilters = page.getByTestId(DATA_TEST_ID.CATEGORY_FILTERS);
    await expect(categoryFilters).toBeVisible();
    
    // Verify product cards are displayed
    const productCards = page.getByTestId(DATA_TEST_ID.PRODUCT_CARD);
    await expect(productCards.first()).toBeVisible();
    expect(await productCards.count()).toBeGreaterThan(0);
  });
  
  test('shows product details correctly', async ({ page }) => {
    await page.goto('/shop');
    
    // Click on first product
    const firstProduct = page.getByTestId(DATA_TEST_ID.PRODUCT_CARD).first();
    await firstProduct.click();
    
    // Verify product details
    await expect(page.getByTestId(DATA_TEST_ID.PRODUCT_TITLE)).toBeVisible();
    await expect(page.getByTestId(DATA_TEST_ID.PRODUCT_PRICE)).toBeVisible();
    await expect(page.getByTestId(DATA_TEST_ID.PRODUCT_DESCRIPTION)).toBeVisible();
    await expect(page.getByTestId(DATA_TEST_ID.ADD_TO_CART_BUTTON)).toBeVisible();
    
    // Verify related products section exists
    await expect(page.getByTestId(DATA_TEST_ID.RELATED_PRODUCTS)).toBeVisible();
  });
  
  test('can change product quantity and add to cart', async ({ page }) => {
    await page.goto('/shop');
    
    // Go to first product
    const firstProduct = page.getByTestId(DATA_TEST_ID.PRODUCT_CARD).first();
    await firstProduct.click();
    
    // Increase quantity
    const increaseButton = page.getByTestId(DATA_TEST_ID.INCREASE_QUANTITY);
    await increaseButton.click();
    await increaseButton.click();
    
    // Check quantity is now 3 (default 1 + 2 clicks)
    const quantityInput = page.getByTestId(DATA_TEST_ID.QUANTITY_INPUT);
    await expect(quantityInput).toHaveValue('3');
    
    // Add to cart
    const addToCartButton = page.getByTestId(DATA_TEST_ID.ADD_TO_CART_BUTTON);
    await addToCartButton.click();
    
    // Verify cart indicator shows items
    const cartCount = page.getByTestId(DATA_TEST_ID.CART_COUNT);
    await expect(cartCount).toBeVisible();
    await expect(cartCount).toContainText('3');
  });
  
  test('cart functionality works correctly', async ({ page }) => {
    // Add product to cart first
    await page.goto('/shop');
    await page.getByTestId(DATA_TEST_ID.PRODUCT_CARD).first().click();
    await page.getByTestId(DATA_TEST_ID.ADD_TO_CART_BUTTON).click();
    
    // Open cart
    const cartButton = page.getByTestId(DATA_TEST_ID.CART_BUTTON);
    await cartButton.click();
    
    // Verify cart opened
    const cartDrawer = page.getByTestId(DATA_TEST_ID.CART_DRAWER);
    await expect(cartDrawer).toBeVisible();
    
    // Verify cart contains the added product
    const cartItems = page.getByTestId(DATA_TEST_ID.CART_ITEMS);
    await expect(cartItems.getByTestId(DATA_TEST_ID.CART_ITEM).first()).toBeVisible();
    
    // Increase item quantity
    const increaseButton = cartItems.getByTestId(DATA_TEST_ID.CART_ITEM_INCREASE).first();
    await increaseButton.click();
    
    // Verify quantity increased
    const quantityDisplay = cartItems.getByTestId(DATA_TEST_ID.CART_ITEM_QUANTITY).first();
    await expect(quantityDisplay).toContainText('2');
    
    // Verify subtotal updated
    await expect(page.getByTestId(DATA_TEST_ID.CART_SUBTOTAL)).toBeVisible();
    
    // Remove item from cart
    const removeButton = cartItems.getByTestId(DATA_TEST_ID.REMOVE_CART_ITEM).first();
    await removeButton.click();
    
    // Verify cart is empty
    await expect(page.getByTestId(DATA_TEST_ID.EMPTY_CART_MESSAGE)).toBeVisible();
  });
  
  test('checkout button navigates to checkout page', async ({ page }) => {
    // Add product to cart
    await page.goto('/shop');
    await page.getByTestId(DATA_TEST_ID.PRODUCT_CARD).first().click();
    await page.getByTestId(DATA_TEST_ID.ADD_TO_CART_BUTTON).click();
    
    // Open cart
    await page.getByTestId(DATA_TEST_ID.CART_BUTTON).click();
    
    // Click checkout
    const checkoutButton = page.getByTestId(DATA_TEST_ID.CHECKOUT_BUTTON);
    await checkoutButton.click();
    
    // Verify redirect to checkout page
    await expect(page).toHaveURL(/\/checkout/);
    
    // Verify checkout form is displayed
    await expect(page.getByTestId(DATA_TEST_ID.CHECKOUT_FORM)).toBeVisible();
    await expect(page.getByTestId(DATA_TEST_ID.ORDER_SUMMARY)).toBeVisible();
  });
  
  test('cart persists after page navigation', async ({ page }) => {
    // Add product to cart
    await page.goto('/shop');
    await page.getByTestId(DATA_TEST_ID.PRODUCT_CARD).first().click();
    await page.getByTestId(DATA_TEST_ID.ADD_TO_CART_BUTTON).click();
    
    // Navigate to home page
    await page.goto('/');
    
    // Verify cart still has items
    const cartCount = page.getByTestId(DATA_TEST_ID.CART_COUNT);
    await expect(cartCount).toBeVisible();
    await expect(cartCount).not.toHaveText('0');
    
    // Open cart to verify item is still there
    await page.getByTestId(DATA_TEST_ID.CART_BUTTON).click();
    const cartItems = page.getByTestId(DATA_TEST_ID.CART_ITEMS);
    await expect(cartItems.getByTestId(DATA_TEST_ID.CART_ITEM).first()).toBeVisible();
  });
}); 