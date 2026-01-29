import { test, expect } from '@playwright/test';

test.describe('Registration Tests', () => {

  test('Valid Registration', async ({ page }) => {
    await page.goto('/register');

    await page.check('#gender-male');
    await page.fill('#FirstName', 'Test');
    await page.fill('#LastName', 'User');
    await page.fill('#Email', `user${Date.now()}@email.com`);
    await page.fill('#Password', 'Test@1234');
    await page.fill('#ConfirmPassword', 'Test@1234');
    await page.click('#register-button');

    await expect(page.locator('.result')).toContainText('completed');
  });

  test('Registration with Existing Email', async ({ page }) => {
    await page.goto('/register');

    await page.fill('#FirstName', 'Test');
    await page.fill('#LastName', 'User');
    await page.fill('#Email', 'testuser@email.com');
    await page.fill('#Password', 'Test@1234');
    await page.fill('#ConfirmPassword', 'Test@1234');
    await page.click('#register-button');

    await expect(page.locator('.validation-summary-errors'))
      .toContainText('The specified email already exists');
  });

  test('Registration Empty Fields', async ({ page }) => {
    await page.goto('/register');
    await page.click('#register-button');

    await expect(page.locator('.field-validation-error').first()).toBeVisible();
  });

});
