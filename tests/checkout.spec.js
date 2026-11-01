import {test, expect} from '@playwright/test'
import data from '../test-data/user.json'
const user = data.user
const password = data.password

test.describe('Verify which test user can complete checkout', () => {
    user.forEach((u) => {
        test(`Checkout with ${u.username}`, async ({ page }) => {
            const error = page.locator('[data-test="error-button"]')
            await page.goto('https://www.saucedemo.com/');
            await expect(page.getByText('Swag Labs')).toBeVisible();
            await page.locator('#user-name').fill(u.username);
            await page.locator('#password').fill(password);
            await page.locator('#login-button').click();
            await expect(
                page.locator('[data-test="inventory-list"]')
                .or(page.locator('[data-test="error-button"]'))
            ).toBeVisible({ timeout: 15000 });
            test.skip(await page.locator('[data-test="error-button"]').isVisible(), `User ${u.username} cannot login, skipping checkout flow test`);
            await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
            await page.locator('#shopping_cart_container').click();
            await expect(page).toHaveURL(/cart/);
            await page.locator('[data-test="checkout"]').click();
            await expect(page).toHaveURL(/checkout-step-one/);
            await page.locator('[data-test="firstName"]').fill('Test');
            await page.locator('[data-test="lastName"]').fill('Test');
            await page.locator('[data-test="postalCode"]').fill('11111');
            await page.locator('[data-test="continue"]').click();
            await expect(page).toHaveURL(/checkout-step-two/);
            await page.locator('[data-test="finish"]').click();
            await expect(page).toHaveURL(/checkout-complete/);  
        })
    })
} )