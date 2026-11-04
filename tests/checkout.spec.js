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
            await page.locator('#first-name').fill('Test');
            await page.locator('#last-name').fill('Test');
            await page.locator('#postal-code').fill('11111');
            await page.locator('#continue').click();
            await expect(page).toHaveURL(/checkout-step-two/);
            await page.locator('#finish').click();
            await expect(page).toHaveURL(/checkout-complete/);  
        })
    })
} )
test.describe('Validate mandatory fields of your information form in checkout', () => {
    user.forEach((u) => {
        test(`${u.username}: missing first name`, async ({ page }) => {
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
            await page.locator('#checkout').click();
            await expect(page).toHaveURL(/checkout-step-one/);
            await page.locator('#last-name').fill('Test');
            await page.locator('#postal-code').fill('11111');
            await expect(page.locator('#first-name')).toBeEmpty();
            await page.locator('#continue').click();
            await expect(page.getByText('Error: First Name is required')).toBeVisible();
        })
    })
    user.forEach((u) => {
        test(`${u.username}: missing last name`, async ({ page }) => {
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
            await page.locator('#checkout').click();
            await expect(page).toHaveURL(/checkout-step-one/);
            await expect(page.locator('#last-name')).toBeEmpty();
            await page.locator('#first-name').fill('Test');
            await page.locator('#postal-code').fill('11111');
            await page.locator('#continue').click();
            await expect(page.getByText('Error: Last Name is required')).toBeVisible();
        })
    })
    user.forEach((u) => {
        test(`${u.username}: missing postal code`, async ({ page }) => {
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
            await page.locator('#checkout').click();
            await expect(page).toHaveURL(/checkout-step-one/);
            await expect(page.locator('#postal-code')).toBeEmpty();
            await page.locator('#first-name').fill('Test');
            await page.locator('#last-name').fill('Test');
            await page.locator('#continue').click();
            await expect(page.getByText('Error: Postal Code is required')).toBeVisible();
        })
    })
    user.forEach((u) => {
        test(`${u.username}: missing first name and last name`, async ({ page }) => {
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
            await page.locator('#checkout').click();
            await expect(page).toHaveURL(/checkout-step-one/);
            await expect(page.locator('#first-name')).toBeEmpty();
            await expect(page.locator('#last-name')).toBeEmpty();
            await page.locator('#postal-code').fill('11111');
            await page.locator('#continue').click();
            await expect(page.getByText('Error: First Name is required')).toBeVisible();
        })
    })
    user.forEach((u) => {
        test(`${u.username}: missing last name and postal code`, async ({ page }) => {
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
            await page.locator('#checkout').click();
            await expect(page).toHaveURL(/checkout-step-one/);
            await expect(page.locator('#last-name')).toBeEmpty();
            await expect(page.locator('#postal-code')).toBeEmpty();
            await page.locator('#first-name').fill('test');
            await page.locator('#continue').click();
            await expect(page.getByText('Error: Last Name is required')).toBeVisible();
        })
    })
    user.forEach((u) => {
        test(`${u.username}: missing first name and postal code`, async ({ page }) => {
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
            await page.locator('#checkout').click();
            await expect(page).toHaveURL(/checkout-step-one/);
            await expect(page.locator('#first-name')).toBeEmpty();
            await expect(page.locator('#postal-code')).toBeEmpty();
            await page.locator('#last-name').fill('test');
            await page.locator('#continue').click();
            await expect(page.getByText('Error: First Name is required')).toBeVisible();
        })
    })
    user.forEach((u) => {
        test(`${u.username}: missing all mandatoy fields`, async ({ page }) => {
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
            await page.locator('#checkout').click();
            await expect(page).toHaveURL(/checkout-step-one/);
            await expect(page.locator('#first-name')).toBeEmpty();
            await expect(page.locator('#last-name')).toBeEmpty();
            await expect(page.locator('#postal-code')).toBeEmpty();
            await page.locator('#continue').click();
            await expect(page.getByText('Error: First Name is required')).toBeVisible();
        })
    })
})