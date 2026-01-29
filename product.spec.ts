import { test, expect } from '@playwright/test';

test.describe('Product Tests', () => {

  test('Search Product', async ({ page }) => {
    await page.goto('/');

    await page.fill('#small-searchterms', 'book');
    await page.press('#small-searchterms', 'Enter');

    await expect(page.locator('.product-item')).toBeVisible();
  });

  test('View Product Details', async ({ page }) => {
    await page.goto('/books');

    await page.locator('.product-title a').first().click();

    await expect(page.locator('.product-name')).toBeVisible();
  });

  

});
