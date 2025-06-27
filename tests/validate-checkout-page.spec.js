const { test, expect } = require('@playwright/test');

test('Validate checkout page after adding items to cart', async ({ page }) => {
  // Go to the login page
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  // Login as Student
  await page.fill('#username', 'rahulshettyacademy');
  await page.fill('#password', 'learning');
  await page.selectOption('select.form-control', { label: 'Student' });
  await page.click('#signInBtn');

  // Wait for navigation to the shop page
  await page.waitForURL('**/angularpractice/shop');

  // Add the first product to the cart
  const firstProduct = await page.$('.card-footer button');
  await firstProduct.click();

  // Click on the checkout button
  await page.click('.nav-link.btn.btn-primary');

  // Validate that we are on the checkout page
  await expect(page).toHaveURL(/.*checkout/);

  // Validate the presence of the checkout table
  await expect(page.locator('table.table')).toBeVisible();

  // Validate that at least one item is listed in the checkout table
  const checkoutRows = await page.$$('table.table tbody tr');
  expect(checkoutRows.length).toBeGreaterThan(0);

  // Optionally, print the product name in the checkout table
  for (const row of checkoutRows) {
    const productName = await row.$eval('td:nth-child(2)', el => el.textContent.trim());
    console.log('Checkout item:', productName);
  }
});
