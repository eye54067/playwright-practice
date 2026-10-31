import { test , expect} from '@playwright/test';

test('Login page: Which test user can login successfully', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page.getByText('Swag Labs')).toBeVisible();
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page.getByText('Products')).toBeVisible();
});
test.describe('Login page: Validate login form', () => {
    test.beforeEach('Go to login page', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await expect(page.getByText('Swag Labs')).toBeVisible();
    })
    test('Login with valid username and password', async ({ page }) => {
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();
        await expect(page).toHaveURL(/inventory/);
        
    })
    test('Login with valid username and invalid password', async ({ page }) => {
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('test');
        await page.locator('#login-button').click();
        await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
    })
})

