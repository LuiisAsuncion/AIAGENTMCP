const { test, expect } = require('@playwright/test');

test('Login as user and select Teacher role', async ({ page }) => {
  // Navigate to login page
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  // Fill in login credentials
  await page.fill('#username', 'user');
  await page.fill('#password', 'learning');

  // Select 'Teacher' from the dropdown
  await page.selectOption('select.form-control', { label: 'Teacher' });

  // Optionally, assert that 'Teacher' is selected
  const selected = await page.$eval('select.form-control', el => el.value);
  expect(selected).toBe('teach');

  // Click sign in (optional, if you want to proceed)
  // await page.click('#signInBtn');
});
