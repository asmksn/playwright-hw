import { test, expect } from '@playwright/test';
import { log } from 'node:console';
import { text } from 'node:stream/consumers';

test.beforeEach(async ({ page }) => {
    await page.goto('/')
})

test('Update pet type', async ({ page }) => {
  await page.locator('[title="pettypes"]').click();
  await expect(page.getByRole('heading', { name: 'Pet Types'})).toBeVisible();

  const firstRow = page.locator('#pettypes tbody tr').first();

  async function renamePetType(from: string, to: string) {
    await firstRow.getByRole('button', { name: 'Edit'}).click();
    await expect(page.getByRole('heading', { name: 'Edit Pet Type' })).toBeVisible();
    await expect(page.locator('#name')).toHaveValue(from);
    await page.locator('#name').fill(to);
    await page.getByRole('button', { name: 'Update'}).click();
    await expect(firstRow.locator('input')).toHaveValue(to);
  }

  await renamePetType('cat', 'rabbit');
  await renamePetType('rabbit', 'cat');
});

// test('Update pet type', async ({ page }) => {
//     await page.locator('[title="pettypes"]').click()
//     await expect(page.locator('#pettypes')).toHaveId('pettypes');
//     const firstPet = page.getByRole ('button', {name: 'Edit'}).first()
//     await firstPet.click()
//     await expect(page.getByRole('heading', { name: 'Edit Pet Type' })).toBeVisible();

//     await expect(page.getByRole('textbox')).toHaveValue('cat');
//     await page.locator('#name').fill('rabbit')
//     await page.getByText('Update').click({ force: true })

//     await expect(page.locator('[id="0"]')).toHaveValue('rabbit');

//     await firstPet.click()
//     await expect(page.getByRole('heading', { name: 'Edit Pet Type' })).toBeVisible();

//     await expect(page.getByRole('textbox')).toHaveValue('rabbit');
//     await page.locator('#name').fill('cat')
//     await page.getByText('Update').click({ force: true })

//     await expect(page.locator('[id="0"]')).toHaveValue('cat');
// })
