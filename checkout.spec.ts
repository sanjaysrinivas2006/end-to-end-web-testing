import { test, expect } from '@playwright/test';

test.describe('Checkout Tests', () => {

  test.beforeEach(async ({ page }) => {

    await page.goto('/login');
    await page.fill('#Email', 'sanjaysrinivas2006@gmail.com');
    await page.fill('#Password', 'sanjay@25');
    await page.click('input[value="Log in"]');

    await page.goto('/books');
    await page.locator('input[value="Add to cart"]').first().click();
    await page.waitForTimeout(1500);

   
    await page.goto('/cart');
  });

  test('Checkout Flow', async ({ page }) => {
    const termsCheckbox = page.locator('#termsofservice');
    await expect(termsCheckbox).toBeVisible();

    await termsCheckbox.click();
    await page.click('#checkout');

    
    await expect(page.locator('text=Billing address')).toBeVisible();
  });
test('Checkout Without Accepting Terms', async ({ page }) => {

  page.on('dialog', async dialog => {
    expect(dialog.message()).toContain('Please accept the terms of service');
    await dialog.accept();
  });

  await page.click('#checkout');
});


});
