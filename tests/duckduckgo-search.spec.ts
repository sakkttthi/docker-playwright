import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Evasion: Remove navigator.webdriver flag to look like a normal browser
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', {
      get: () => undefined,
    });
  });
});

test('should perform a DuckDuckGo search and validate the results', async ({ page }) => {
  const searchQuery = 'Playwright Testing';

  // Navigate directly to the search query URL to avoid form submission issues in headless Chromium
  console.log(`Navigating directly to DuckDuckGo Search for "${searchQuery}"...`);
  await page.goto(`https://duckduckgo.com/?q=${encodeURIComponent(searchQuery)}`, {
    waitUntil: 'domcontentloaded'
  });

  // Verify the page title includes the search query
  await expect(page).toHaveTitle(new RegExp(searchQuery, 'i'));

  // Verify search results are displayed
  const searchResultsContainer = page.locator('.react-results--main, #links');
  await expect(searchResultsContainer).toBeVisible();

  // Verify there is at least one search result item
  const resultItems = page.locator('[data-testid="result"]');
  await expect(resultItems.first()).toBeVisible();

  // Log the title of the first search result to console
  const firstResultHeader = resultItems.first().locator('h2');
  const firstResultText = await firstResultHeader.innerText();
  console.log(`First DuckDuckGo Search Result: "${firstResultText}"`);
  await page.close();
});
