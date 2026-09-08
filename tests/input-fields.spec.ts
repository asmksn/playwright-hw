import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/')
})

test('Update pet type', async ({ page }) => {
  await page.getByRole('link', { name: 'Pet types' }).click(); 
  await expect(page.getByRole('heading')).toHaveText('Pet Types');

  const firstRow = page.locator('#pettypes tbody tr').first();

  // Update pet type from 'cat' to 'rabbit'
  await firstRow.getByRole('button', { name: 'Edit' }).click();
  await expect(page.getByRole('heading')).toHaveText('Edit Pet Type');
  await expect(page.locator('#name')).toHaveValue('cat');
  await page.locator('#name').fill('rabbit');
  await page.getByRole('button', { name: 'Update' }).click();
  await expect(firstRow.locator('input')).toHaveValue('rabbit');

  // change back to 'cat'
  await firstRow.getByRole('button', { name: 'Edit' }).click();
  await expect(page.getByRole('heading')).toHaveText('Edit Pet Type');
  await expect(page.locator('#name')).toHaveValue('rabbit');
  await page.locator('#name').fill('cat');
  await page.getByRole('button', { name: 'Update' }).click();
  await expect(firstRow.locator('input')).toHaveValue('cat');
});