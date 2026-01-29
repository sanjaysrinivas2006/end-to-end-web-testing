import { test, expect } from '@playwright/test';

test.describe('Cart Tests', () => {

  test('Add Product to Cart', async ({ page }) => {
    await page.goto('/books');

    // Add first product
    await page.locator('input[value="Add to cart"]').first().click();

    // Wait for add-to-cart to complete
    await page.waitForTimeout(1500);

    // Go to cart
    await page.click('a[href="/cart"]');

    // Assert product exists in cart
    await expect(page.locator('.cart-item-row')).toHaveCount(1);
  });

  test('Remove Product from Cart', async ({ page }) => {

    // Step 1: Add product
    await page.goto('/books');
    await page.locator('input[value="Add to cart"]').first().click();

    // Wait for cart update
    await page.waitForTimeout(1500);

    // Step 2: Go to cart
    await page.click('a[href="/cart"]');

    // Step 3: Remove product (use click, not check)
    const removeCheckbox = page.locator('input[name^="removefromcart"]').first();
    await expect(removeCheckbox).toBeVisible();
    await removeCheckbox.click({ force: true });

    // Step 4: Update cart
    await page.locator('input[name="updatecart"]').click();

    // Step 5: Assert cart empty
    await expect(page.locator('.order-summary-content'))
      .toContainText('Your Shopping Cart is empty!');
  });

});
