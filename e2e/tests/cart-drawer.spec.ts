import { test, expect } from '@playwright/test';
import { DATA_TEST_ID } from '../../src/components/ui/data-testid';

test.describe('Cart Drawer Functionality', () => {
  test('cart drawer opens when clicking the cart button', async ({ page }) => {
    await page.goto('/');
    
    // Click the cart button
    const cartButton = page.getByTestId(DATA_TEST_ID.CART_BUTTON);
    await cartButton.click();
    
    // Verify cart drawer is opened
    const cartDrawer = page.getByTestId(DATA_TEST_ID.CART_DRAWER);
    await expect(cartDrawer).toBeVisible();
    
    // Verify empty cart message is displayed (assuming cart is empty)
    const emptyCartMessage = page.getByTestId(DATA_TEST_ID.EMPTY_CART_MESSAGE);
    await expect(emptyCartMessage).toBeVisible();
  });
  
  test('can add product to cart and see it in cart drawer', async ({ page }) => {
    // Navigate to a product
    await page.goto('/shop');
    await page.getByTestId(DATA_TEST_ID.PRODUCT_CARD).first().click();
    
    // Add to cart
    const addToCartButton = page.getByTestId(DATA_TEST_ID.ADD_TO_CART_BUTTON);
    await addToCartButton.click();
    
    // Open cart drawer
    const cartButton = page.getByTestId(DATA_TEST_ID.CART_BUTTON);
    await cartButton.click();
    
    // Verify cart contains the product
    const cartItem = page.getByTestId(DATA_TEST_ID.CART_ITEM).first();
    await expect(cartItem).toBeVisible();
    
    // Verify the cart badge shows the correct count
    const cartCount = page.getByTestId(DATA_TEST_ID.CART_COUNT);
    await expect(cartCount).toBeVisible();
    await expect(cartCount).toContainText('1');
  });
  
  test('can change quantity of item in cart drawer', async ({ page }) => {
    // Add a product to cart first
    await page.goto('/shop');
    await page.getByTestId(DATA_TEST_ID.PRODUCT_CARD).first().click();
    await page.getByTestId(DATA_TEST_ID.ADD_TO_CART_BUTTON).click();
    
    // Open cart drawer
    await page.getByTestId(DATA_TEST_ID.CART_BUTTON).click();
    
    // Get initial subtotal
    const initialSubtotal = await page.getByTestId(DATA_TEST_ID.CART_SUBTOTAL).textContent();
    
    // Increase item quantity
    const increaseButton = page.getByTestId(DATA_TEST_ID.CART_ITEM_INCREASE).first();
    await increaseButton.click();
    
    // Verify quantity is now 2
    const quantity = page.getByTestId(DATA_TEST_ID.CART_ITEM_QUANTITY).first();
    await expect(quantity).toContainText('2');
    
    // Verify subtotal has increased
    const updatedSubtotal = await page.getByTestId(DATA_TEST_ID.CART_SUBTOTAL).textContent();
    expect(updatedSubtotal).not.toEqual(initialSubtotal);
    
    // Decrease quantity
    const decreaseButton = page.getByTestId(DATA_TEST_ID.CART_ITEM_DECREASE).first();
    await decreaseButton.click();
    
    // Verify quantity is back to 1
    await expect(quantity).toContainText('1');
    
    // Verify subtotal matches initial amount again
    const finalSubtotal = await page.getByTestId(DATA_TEST_ID.CART_SUBTOTAL).textContent();
    expect(finalSubtotal).toEqual(initialSubtotal);
  });
  
  test('can remove item from cart', async ({ page }) => {
    // Add a product to cart first
    await page.goto('/shop');
    await page.getByTestId(DATA_TEST_ID.PRODUCT_CARD).first().click();
    await page.getByTestId(DATA_TEST_ID.ADD_TO_CART_BUTTON).click();
    
    // Open cart drawer
    await page.getByTestId(DATA_TEST_ID.CART_BUTTON).click();
    
    // Verify cart has an item
    await expect(page.getByTestId(DATA_TEST_ID.CART_ITEM)).toBeVisible();
    
    // Remove the item
    const removeButton = page.getByTestId(DATA_TEST_ID.REMOVE_CART_ITEM).first();
    await removeButton.click();
    
    // Verify cart is now empty
    await expect(page.getByTestId(DATA_TEST_ID.EMPTY_CART_MESSAGE)).toBeVisible();
    await expect(page.getByTestId(DATA_TEST_ID.CART_ITEM)).not.toBeVisible();
  });
  
  test('cart drawer can be closed', async ({ page }) => {
    await page.goto('/');
    
    // Open cart drawer
    await page.getByTestId(DATA_TEST_ID.CART_BUTTON).click();
    
    // Verify cart drawer is visible
    const cartDrawer = page.getByTestId(DATA_TEST_ID.CART_DRAWER);
    await expect(cartDrawer).toBeVisible();
    
    // Close the cart drawer (press Escape key)
    await page.keyboard.press('Escape');
    
    // Verify drawer is closed
    await expect(cartDrawer).not.toBeVisible();
  });
  
  test('checkout button navigates to checkout page', async ({ page }) => {
    // Add a product to cart first
    await page.goto('/shop');
    await page.getByTestId(DATA_TEST_ID.PRODUCT_CARD).first().click();
    await page.getByTestId(DATA_TEST_ID.ADD_TO_CART_BUTTON).click();
    
    // Open cart drawer
    await page.getByTestId(DATA_TEST_ID.CART_BUTTON).click();
    
    // Click checkout button
    const checkoutButton = page.getByTestId(DATA_TEST_ID.CHECKOUT_BUTTON);
    await checkoutButton.click();
    
    // Verify we are on checkout page
    await expect(page).toHaveURL(/\/checkout/);
    
    // Verify checkout elements are visible
    await expect(page.getByTestId(DATA_TEST_ID.CHECKOUT_FORM)).toBeVisible();
    await expect(page.getByTestId(DATA_TEST_ID.ORDER_SUMMARY)).toBeVisible();
  });
}); 