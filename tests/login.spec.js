import { test , expect} from '@playwright/test';
const data = require('../test-data/user.json')
const user = data.user
const password = data.password
test.describe('Which test user can login successfully', () => {
    user.forEach((u) => {
        test(`Login with ${u.username}`, async ({ page }) => {
            await page.goto('https://www.saucedemo.com/');
            await expect(page.getByText('Swag Labs')).toBeVisible();
            await page.locator('#user-name').fill(u.username);
            await page.locator('#password').fill(password);
            await page.locator('#login-button').click();
            await expect(page).toHaveURL(/inventory/);
        })
    })
});
test.describe('Validate login form', () => {
    test.beforeEach('Go to login page', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await expect(page.getByText('Swag Labs')).toBeVisible();
    })
    test('Validate no error message after login with valid username and password', async ({ page }) => {
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();
        await expect(page).toHaveURL(/inventory/);
        
    })
    test('Validate error message after login with valid username and invalid password', async ({ page }) => {
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('test');
        await page.locator('#login-button').click();
        await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
    })
    test('Validate error message after login with invalid username and valid password', async ({ page }) => {
        await page.locator('#user-name').fill('test');
        await page.locator('#password').fill('standard_user');
        await page.locator('#login-button').click();
        await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
    })
    test('Validate error message after login with invalid username and invalid password', async ({ page }) => {
        await page.locator('#user-name').fill('test');
        await page.locator('#password').fill('test');
        await page.locator('#login-button').click();
        await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
    })
    test('Validate error message after login with valid username and empty password', async ({ page }) => {
        await page.locator('#user-name').fill('standard_user');
        await expect(page.locator('#password')).toBeEmpty();
        await page.locator('#login-button').click();
        await expect(page.getByText('Epic sadface: Password is required')).toBeVisible();
    })
    test('Validate error message after login with empty username and valid password', async ({ page }) => {
        await expect(page.locator('#user-name')).toBeEmpty();
        await page.locator('#password').fill('test');
        await page.locator('#login-button').click();
        await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
    })
    test('Validate error message after login with empty username and empty password', async ({ page }) => {
        await expect(page.locator('#user-name')).toBeEmpty();
        await expect(page.locator('#password')).toBeEmpty();
        await page.locator('#login-button').click();
        await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
    })
})

