const { test, expect } = require('@playwright/test');

test('Login, add items to cart, checkout, and validate items', async ({ page }) => {
  // Go to the login page
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  // Fill in valid credentials
  await page.fill('#username', 'rahulshettyacademy');
  await page.fill('#password', 'learning');
  await page.selectOption('select.form-control', { label: 'Student' });
  await page.click('#signInBtn');

  // Wait for navigation to the shop page
  await page.waitForURL('**/angularpractice/shop');

  // Add all visible products to the cart
  const products = await page.$$('.card-footer button');
  for (const product of products) {
    await product.click();
  }

  // Click on the checkout button
  await page.click('.nav-link.btn.btn-primary');

  // Validate that items are added to the cart
  const cartItems = await page.$$('.media');
  expect(cartItems.length).toBeGreaterThan(0);

  // Optionally, print the names of the items in the cart
  for (const item of cartItems) {
    const itemName = await item.$eval('.media-body h4 a', el => el.textContent.trim());
    console.log('Cart item:', itemName);
  }
});
