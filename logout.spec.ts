import { test, expect } from '@playwright/test';

test('Logout Test', async ({ page }) => {
  await page.goto('/login');

  await page.fill('#Email', 'sanjaysrinivas2006@gmail.com');
  await page.fill('#Password', 'sanjay@25');
  await page.click('input[value="Log in"]');

  await page.click('a[href="/logout"]');

  await expect(page.locator('a[href="/login"]')).toBeVisible();
});
