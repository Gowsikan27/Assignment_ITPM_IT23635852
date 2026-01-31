const { test, expect } = require('@playwright/test');

async function typeAndConvert(page, text) {
  const inputBox = page.locator('textarea');
  await inputBox.click();
  await inputBox.type(text, { delay: 100 });
  await inputBox.press(' ');
  await inputBox.press('Backspace');
  await page.waitForTimeout(800);
  return await inputBox.inputValue();
}

async function clearTextarea(page) {
  const inputBox = page.locator('textarea');
  await inputBox.click();
  await inputBox.press('Control+A');
  await inputBox.press('Delete');
  await page.waitForTimeout(300);
}

test.describe('Negative Functional Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://tamil.changathi.com/');
    await page.waitForLoadState('networkidle');
  });

  async function runTest(page, testInfo, input, expectedOutput) {
    let actualOutput = '';

    try {
      await page.goto('https://tamil.changathi.com', {
        waitUntil: 'domcontentloaded'
      });

      const inputBox = page.locator('textarea, input[type="text"]').first();
      await inputBox.click();
      await inputBox.fill('');
      await inputBox.type(input + ' ', { delay: 80 });
      await page.waitForTimeout(2000);

      actualOutput = await inputBox.inputValue();

      // Negative tests: Input should stay the same (NO conversion to Tamil)
      // If expectedOutput is empty string, we expect the input to remain unchanged
      if (expectedOutput === '') {
        // Input should stay as-is (no conversion happened)
        expect(actualOutput.trim()).toEqual(input.trim());
      } else {
        // expectedOutput has specific text - check if it's contained
        expect(actualOutput.trim()).toContain(expectedOutput);
      }

    } finally {
      await testInfo.attach('test-data', {
        body: JSON.stringify(
          { 
            input, 
            actual: actualOutput.trim(), 
            expected: expectedOutput || '<input unchanged - NO conversion>' 
          },
          null,
          2
        ),
        contentType: 'application/json'
      });
    }
  }

  /* ---------------- NEGATIVE TEST CASES (structure like positive) ---------------- */

  test('Fail_IO_N001: number handling ', async ({ page }, testInfo) => {
    await runTest(page, testInfo, 'naan 10 manikku veddukku poran', 'நான் 10 மணிக்கு வீட்டுக்கு போறேன்');
  });

  test('Fail_IO_N002: Continuous words', async ({ page }, testInfo) => {
    await runTest(page, testInfo, 'avaninnikkiyemootaiyeduthan', 'அவன்இன்றுமூட்டையைஎடுத்தான்');
  });

  test('Fail_IO_N003: Special Characters', async ({ page }, testInfo) => {
    await runTest(page, testInfo, 'enna@nadakkuthu', 'என்ன@நடக்குது');
  });

  test('Fail_IO_N004: past continuous meaning', async ({ page }, testInfo) => {
    await runTest(page, testInfo, 'naan night full ah padichutu irunthen', 'நான் நைட் full ah படிச்சுட்டு இருந்தேன் ');
  });

  test('Fail_IO_N005: Imperative polite form', async ({ page }, testInfo) => {
    await runTest(page, testInfo, 'please door close pannunga', 'தயவுசெய்து கதவை close பண்ணுங்க');
  });

  test('Fail_IO_N006: long sentence with future plan', async ({ page }, testInfo) => {
    const text = 'naan next year abroad poganum appuram job join pannuvan';
    await runTest(page, testInfo, text, 'நான் next year abroad போகணும் அப்புறம் job join பண்ணுவான்');
  });

  test('Fail_IO_N007: Long paragraph - second part', async ({ page }, testInfo) => {
    const text = 'Nee morning olumbi padipeer. Sometimes kaduppakuveeroo thiriyala. Bro Enna bro neee . Bro oru naal namma movie pakka pokanum.Naan Friday la erunthu gym poka poran evening la';
    await runTest(page, testInfo, text, 'நீ morning ஒலிம்பி  படிப்பீர். sometimes கடுப்பாக்குவீரோ தெரியல . bro என்ன bro நீ . bro ஒரு நாள் நம்ம movie  போவம்  .நான் friday ல இருந்து gym போக போறன் evening ல');
  });

  test('Fail_IO_N008: Long paragraph - third part', async ({ page }, testInfo) => {
    const text = 'Romba thurava pona than miss pannuvan. Eppa pakkathula than erukkuran. Just 15 minutes kaanum ummala pakka varathukku';
    await runTest(page, testInfo, text, 'ரொம்ப தூரம் போன தான் miss பண்ணுவன். இப்ப பக்கத்துல தான் இருக்குறன். just 15 minutes காணும் உங்களை பாக்க வாரத்துக்கு');
  });

  test('Fail_IO_N009: kg sentence', async ({ page }, testInfo) => {
    await runTest(page, testInfo, 'enakku 1kg sugar um 3kg thul um venum', 'எனக்கு 1kg sugar and 3kg தூள் வேணும்');
  });

  test('Fail_IO_N010: Formatting @ special characters', async ({ page }, testInfo) => {
    await runTest(page, testInfo, 'enoda gmail account gowsisiva@gmail.com', 'என்னோட gmail account gowsisiva@gmail.com');
  });

});

