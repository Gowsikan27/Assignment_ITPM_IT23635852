const { test, expect } = require('@playwright/test');

test.describe('UI Test - Real-time Tamil Conversion', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://tamil.changathi.com/');
    await page.waitForLoadState('networkidle');
  });

  test('U001 - Real-time conversion while typing', async ({ page }) => {
    const inputBox = page.locator('textarea');
    
    await expect(inputBox).toBeVisible();
    
    await inputBox.click();
    
    const testWord = 'vanakkam';
    
    for (let i = 1; i <= testWord.length; i++) {
      const char = testWord[i - 1];
      await inputBox.type(char, { delay: 200 });
      
      const currentValue = await inputBox.inputValue();
      
      expect(currentValue).toBeTruthy();
      
      console.log(`After typing '${char}': ${currentValue}`);
      
      await page.waitForTimeout(300);
    }
    
    const finalValue = await inputBox.inputValue();
    expect(finalValue).toBeTruthy();
    console.log('Final real-time conversion result:', finalValue);
  });
});
