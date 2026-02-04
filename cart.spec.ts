import { test, expect } from '@playwright/test';

test.describe('Cart Tests', () => {

  test('Add Product to Cart', async ({ page }) => {
    await page.goto('/books');

    await page.locator('input[value="Add to cart"]').first().click();

    await page.waitForTimeout(1500);

    await page.click('a[href="/cart"]');

    await expect(page.locator('.cart-item-row')).toHaveCount(1);
  });

  test('Remove Product from Cart', async ({ page }) => {

    await page.goto('/books');
    await page.locator('input[value="Add to cart"]').first().click();

    await page.waitForTimeout(1500);
    await page.click('a[href="/cart"]');
    const removeCheckbox = page.locator('input[name^="removefromcart"]').first();
    await expect(removeCheckbox).toBeVisible();
    await removeCheckbox.click({ force: true });

    await page.locator('input[name="updatecart"]').click();

    await expect(page.locator('.order-summary-content'))
      .toContainText('Your Shopping Cart is empty!');
  });

});


