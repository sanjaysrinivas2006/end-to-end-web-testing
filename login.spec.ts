import { test, expect } from '@playwright/test';

test.describe('Login Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('Valid Login', async ({ page }) => {
    await page.fill('#Email', 'sanjaysrinivas2006@gmail.com');
    await page.fill('#Password', 'sanjay@25');
    await page.click('input[value="Log in"]');

    
    await expect(page.locator('text=Log out')).toBeVisible();
  });

  test('Invalid Login - Wrong Password', async ({ page }) => {
    await page.fill('#Email', 'sanjaysrinivas2006@gmail.com');
    await page.fill('#Password', 'wrongpassword');
    await page.click('input[value="Log in"]');

    await expect(page.locator('.validation-summary-errors'))
      .toContainText('Login was unsuccessful');
  });

  test('Invalid Login - Empty Fields', async ({ page }) => {
    await page.click('input[value="Log in"]');

    await expect(page.locator('.validation-summary-errors'))
      .toBeVisible();
  });

  test('Remember Me Login', async ({ page }) => {
    await page.fill('#Email', 'sanjaysrinivas2006@gmail.com');
    await page.fill('#Password', 'sanjay@25');
    await page.check('#RememberMe');
    await page.click('input[value="Log in"]');

    
    await expect(page.locator('text=Log out')).toBeVisible();
  });

});
