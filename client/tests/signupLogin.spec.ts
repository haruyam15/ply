import { test, expect } from '@playwright/test';

test.describe('Signup', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });
  test('should be able to sign up', async ({ page }) => {
    await page.route('http://localhost:8080/api/register', (route) => {
      const res = {
        status: 200,
        body: JSON.stringify({ message: '가입이 완료되었습니다.' }),
      };
      route.fulfill(res);
    });
    await page.route('http://localhost:8080/api/login', (route) => {
      const res = {
        status: 200,
        body: JSON.stringify({ message: 'Login successful' }),
      };
      route.fulfill(res);
    });

    await page.getByRole('button', { name: '로그인' }).click();
    await page.getByRole('button', { name: '회원가입' }).click();
    await page.getByRole('textbox', { name: '닉네임' }).fill('쑤밍');
    await page.getByRole('textbox', { name: '아이디' }).fill('ssuming');
    await page.locator('input[type="password"][id="password"]').fill('abc123!');
    await page.locator('input[type="password"][id="password2"]').fill('abc123!');
    await page.locator('input[type="checkbox"]#check').check();
    await page.getByRole('button', { name: '가입하기' }).click();

    await page.waitForTimeout(500);
    await expect(page.getByText('가입이 완료되었습니다.')).toBeVisible();

    await page.waitForTimeout(1000);

    await page.getByRole('textbox', { name: '아이디' }).fill('ssuming');
    await page.locator('input[type="password"]').fill('abc123!');
    await page.locator('#login').click();

    await page.waitForTimeout(500);
    await expect(page.getByText('환영합니다. 쑤밍님')).toBeVisible();
  });
});
