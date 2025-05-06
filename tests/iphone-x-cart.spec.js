const { test, expect } = require('@playwright/test');

test('Add iPhone X to cart and verify in cart', async ({ page }) => {
  // Navigate to login page
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  // Fill in login credentials (using demo credentials from the site)
  await page.fill('#username', 'rahulshettyacademy');
  await page.fill('#password', 'learning');
  await page.click('#signInBtn');

  // Wait for navigation to shop page
  await page.waitForURL('**/angularpractice/shop');

  // Find the iPhone X card and click 'Add'
  const productCards = page.locator('.card.h-100');
  const count = await productCards.count();
  let found = false;
  for (let i = 0; i < count; i++) {
    const title = await productCards.nth(i).locator('h4 a').textContent();
    if (title && title.includes('iphone X')) {
      await productCards.nth(i).locator('button.btn.btn-info').click();
      found = true;
      break;
    }
  }
  expect(found).toBeTruthy();

  // Go to cart
  await page.click('a.nav-link.btn.btn-primary');

  // Confirm iPhone X is in the cart
  const cartItems = page.locator('h4.media-heading');
  const cartCount = await cartItems.count();
  let inCart = false;
  for (let i = 0; i < cartCount; i++) {
    const cartTitle = await cartItems.nth(i).textContent();
    if (cartTitle && cartTitle.includes('iphone X')) {
      inCart = true;
      break;
    }
  }
  expect(inCart).toBeTruthy();

  // Optionally, proceed to checkout and confirm
  // await page.click('button.btn.btn-success');
});
