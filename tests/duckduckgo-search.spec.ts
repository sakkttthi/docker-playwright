import { test, expect } from '@playwright/test';

test('should perform a Wikipedia search and validate the results', async ({ page }) => {
  const searchQuery = 'Playwright';

  console.log(`Navigating to Wikipedia homepage...`);
  await page.goto('https://www.wikipedia.org/', {
    waitUntil: 'domcontentloaded'
  });

  // Type the search query into the search input and submit
  console.log(`Searching for "${searchQuery}"...`);
  const searchInput = page.locator('#searchInput');
  await searchInput.fill(searchQuery);
  await searchInput.press('Enter');

  // Verify the page URL matches a wiki page
  console.log('Waiting for search results page to load...');
  await expect(page).toHaveURL(/.*wikipedia\.org\/wiki\/.*/i);

  // Verify search results are displayed (e.g. the main heading)
  const firstHeading = page.locator('#firstHeading');
  await expect(firstHeading).toBeVisible({ timeout: 10000 });
  await expect(firstHeading).toContainText(searchQuery);

  console.log(`Successfully verified Wikipedia page for: "${await firstHeading.innerText()}"`);
  await page.close();
});


