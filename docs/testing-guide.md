# Twistly CBD Testing Guide

This guide outlines the testing strategy and provides guidelines for maintaining and extending tests for the Twistly CBD e-commerce application.

## Table of Contents

1. [Testing Architecture](#testing-architecture)
2. [End-to-End (E2E) Testing](#end-to-end-e2e-testing)
3. [Data-TestID Best Practices](#data-testid-best-practices)
4. [Running Tests](#running-tests)
5. [Adding New Tests](#adding-new-tests)
6. [Test Reports](#test-reports)
7. [Accessibility Testing](#accessibility-testing)

## Testing Architecture

The Twistly CBD application uses a comprehensive testing approach:

- **End-to-End (E2E) Tests**: Using Playwright to test complete user flows across the application
- **Accessibility Tests**: Using axe-playwright to ensure WCAG compliance
- **Performance Tests**: Measuring Core Web Vitals and other performance metrics

## End-to-End (E2E) Testing

E2E tests are located in the `e2e/tests` directory and are organized by functional area:

- `navigation.spec.ts`: Tests for navigation and routing
- `product-and-cart.spec.ts`: Tests for product browsing and cart functionality
- `accessibility.spec.ts`: Tests for accessibility compliance
- `performance.spec.ts`: Tests for performance metrics
- `cart-drawer.spec.ts`: Tests specific to the cart drawer functionality

### Test Structure

Each test file follows this structure:

```typescript
import { test, expect } from '@playwright/test';
import { DATA_TEST_ID } from '../../src/components/ui/data-testid';

test.describe('Feature Name', () => {
  test('should perform specific action', async ({ page }) => {
    // Test implementation
  });
  
  // More tests...
});
```

## Data-TestID Best Practices

We use a centralized approach to managing test selectors through the `DATA_TEST_ID` constants defined in `src/components/ui/data-testid.ts`.

### Using Data-TestID Constants

When adding elements that need to be tested:

1. **Import the constants**: 
   ```typescript
   import { DATA_TEST_ID } from '@/components/ui/data-testid';
   ```

2. **Apply to React components**:
   ```typescript
   <Button data-testid={DATA_TEST_ID.ADD_TO_CART_BUTTON}>Add to Cart</Button>
   ```

3. **When testing, use the same constants**:
   ```typescript
   const addToCartButton = page.getByTestId(DATA_TEST_ID.ADD_TO_CART_BUTTON);
   await addToCartButton.click();
   ```

### Adding New Data-TestID Constants

If you need to add a new data-testid:

1. Add the constant to `src/components/ui/data-testid.ts` in the appropriate section:
   ```typescript
   export const DATA_TEST_ID = {
     // Existing constants...
     
     // Add your new constant
     NEW_FEATURE_BUTTON: 'new-feature-button',
   };
   ```

2. Use the constant in your component and tests as described above.

## Running Tests

E2E tests can be run from the `e2e` directory using the following commands:

### All Tests

```bash
# From the project root
cd e2e
pnpm test
```

### Specific Test Files

```bash
# Run a specific test file
pnpm test accessibility.spec.ts

# Run tests with matching name
pnpm test -- -g "cart functionality"
```

### Running Tests with UI

For interactive debugging with the Playwright UI:

```bash
pnpm test:ui
```

### Headed Mode

To run tests in headed mode (visible browser):

```bash
pnpm test:headed
```

### Debug Mode

For step-by-step debugging:

```bash
pnpm test:debug
```

## Adding New Tests

When adding new tests:

1. Determine which test file to add to (or create a new one if it's a new feature area)
2. Use the `DATA_TEST_ID` constants for selectors
3. Follow existing patterns for setup, actions, and assertions
4. Keep tests focused on a single feature or user flow
5. Add descriptive test names following the pattern: `'should do something specific'`

Example:

```typescript
test('should filter products by category', async ({ page }) => {
  // Navigate to shop page
  await page.goto('/shop');
  
  // Find and click a category filter
  const categoryFilters = page.getByTestId(DATA_TEST_ID.CATEGORY_FILTERS);
  await categoryFilters.getByText('Oils').click();
  
  // Verify products are filtered
  const productCards = page.getByTestId(DATA_TEST_ID.PRODUCT_CARD);
  
  // Assert filtered results are visible
  await expect(productCards.first()).toBeVisible();
  
  // Additional assertions...
});
```

## Test Reports

After running tests, view the HTML report:

```bash
pnpm test:report
```

This will open the HTML report showing test results, including:
- Pass/fail status
- Test duration
- Error messages and stack traces
- Screenshots and videos of failures
- Trace files for debugging

## Accessibility Testing

Accessibility tests use axe-playwright to verify WCAG compliance:

```typescript
import { injectAxe, checkA11y } from 'axe-playwright';

test('page has no accessibility violations', async ({ page }) => {
  await page.goto('/some-page');
  await injectAxe(page);
  await checkA11y(page);
});
```

### Running Accessibility Tests Only

```bash
pnpm test accessibility.spec.ts
```

## Performance Testing

Performance tests verify Core Web Vitals and other metrics:

```typescript
test('measures First Contentful Paint', async ({ page }) => {
  await page.goto('/');
  
  // Measure FCP using Performance API
  const fcpValue = await page.evaluate(() => {
    // Performance measurement code
  });
  
  // Assert performance is within acceptable thresholds
  expect(fcpValue).toBeLessThan(THRESHOLDS.FCP);
});
```

## Best Practices for Test Maintenance

1. Keep selectors stable by using data-testid attributes
2. Write tests that are resilient to minor UI changes
3. Avoid hard-coded waits; use Playwright's auto-waiting features
4. Use test isolation—don't create dependencies between tests
5. Keep tests focused on user flows rather than implementation details
6. Update tests when requirements change 