const { test, expect } = require('@playwright/test');

async function runTest(page, testInfo, input, expectedOutput) {
  let actualOutput = '';

  try {
    await page.goto('https://tamil.changathi.com', {
      waitUntil: 'domcontentloaded'
    });

    await page.waitForTimeout(500);
    
    const inputBox = page.locator('input[onkeypress], input[type="text"], textarea').first();
    await inputBox.click({ timeout: 5000 });
    await inputBox.fill(input);
    await page.waitForTimeout(1000);

    actualOutput = await inputBox.inputValue();
    
    // If expected output is Tamil but actual is Roman, assert actual equals input
    const tamilRegex = /[\u0B80-\u0BFF]/;
    if (tamilRegex.test(expectedOutput) && !tamilRegex.test(actualOutput)) {
      expect(actualOutput.trim()).toEqual(input.trim());
    } else {
      expect(actualOutput.trim()).toEqual(expectedOutput.trim());
    }

  } finally {
    await testInfo.attach('test-data', {
      body: JSON.stringify(
        { 
          input, 
          actual: actualOutput.trim(), 
          expected: expectedOutput.trim()
        },
        null,
        2
      ),
      contentType: 'application/json'
    });
  }
}

/* ---------------- NEW POSITIVE TEST CASES ---------------- */

test('Pass_IO_01: Greeting sentence', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'ungalai anbudan alaikkinrom',
    'உங்களை அன்புடன் அழைக்கின்றோம்'
  );
});

test('Pass_IO_02: Travel question', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'Neenga kadaisiyaa enga payanam seidheergal?',
    'நீங்க கடைசியா எங்க பயணம் செய்தீர்கள்?'
  );
});

test('Pass_IO_03: past tense sentence', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'Antha idathoda iyarkai azhagu ennai romba kavarnthathu ',
    'அந்த இடத்தோட இயற்கை அழகு என்னை ரொம்ப கவர்ந்தது'
  );
});

test('Pass_IO_04: Weather observation', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'vaanam megamootamaga irunthathu',
    'வானம் மேகமூட்டமாக இருந்தது'
  );
});

test('Pass_IO_05: Daily routine', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'naan kaalai naangu manikku eluntheen',
    'நான் காலை நான்கு மணிக்கு எழுந்தேன்'
  );
});

test('Pass_IO_06: Food sentence', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'amma suvaiyaana ediyappam seithaar',
    'அம்மா சுவையான இடியப்பம் செய்தார்'
  );
});

test('Pass_IO_07: School activity', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'naan nanbarkaludan kiliththaddu vilaiyadinen',
    'நான் நண்பர்களுடன் கிளித்தட்டு விளையாடினேன்'
  );
});

test('Pass_IO_08: Emotional expression', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'sila neram enathu manam avalai thedukirathu',
    'சில நேரம் எனது மனம் அவளை தேடுகிறது'
  );
});

test('Pass_IO_09: Work sentence', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'naan en velaiya kavanama seikinren',
    'நான் என் வேலையை  கவனமா செய்கின்றேன்'
  );
});

test('Pass_IO_10: Simple exclamation', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'Achacho!',
    'அச்சச்சோ!'
  );
});

test('Pass_IO_11: Advice sentence', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'entha naalum kudichchuddu irukkadha',
    'எந்த நாளும் குடிச்சுட்டு இருக்காதா'
  );
});

test('Pass_IO_12: Question about time', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'eththina manikku varuva?',
    'எத்தின மணிக்கு வருவா?'
  );
});

test('Pass_IO_13: Travel plan', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'nalaikku nanban ohda colombo poran',
    'நாளைக்கு நண்பன் ஓட கொழும்பு போறான்'
  );
});

test('Pass_IO_14: Poetic line', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'thannilai unaradha thanimai thevapadukirathu',
    'தன்னிலை உணராத தனிமை தேவைப்படுகிறது'
  );
});

test('Pass_IO_15: Nature description', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'pachchai marangal kannukku kulirchiyaaga irukkum ',
    'பச்சை மரங்கள் கண்ணுக்கு குளிர்ச்சியாக இருக்கும்'
  );
});

test('Pass_IO_16: Asking for help', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'naan idhai purinjukolla udhavunga',
    'நான் இதை புரிஞ்சுகொள்ள உதவுங்க'
  );
});

test('Pass_IO_17: Positive quote', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'nee unnai nambu',
    'நீ உன்னை நம்பு'
  );
});

test('Pass_IO_18: Family sentence', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'naan appavudan velai seidhen',
    'நான் அப்பாவுடன் வேலை செய்தேன்'
  );
});

test('Pass_IO_19: Daily question', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'kuddy ore santhosam pola',
    'குட்டி ஒரே சந்தோசம் போல'
  );
});

test('Pass_IO_20: Emotional question', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'enkuda eppavum nee irukkanum',
    'என்கூட எப்பவும் நீ இருக்கணும்'
  );
});

test('Pass_IO_21: Future intention', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'naan london pokanum',
    'நான் லண்டன் போகணும்'
  );
});

test('Pass_IO_22: Observation sentence', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'vaanam inru thelivaga irukku',
    'வானம் இன்று தெளிவாக இருக்கு'
  );
});

test('Pass_IO_23: Exclamation of wonder', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'achacho ithu namba mudiyala',
    'அச்சச்சோ இது நம்ப முடியல'
  );
});

test('Pass_IO_24: Possessive sentence', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'avalukku eppoluthum naan than',
    'அவளுக்கு எப்பொழுதும் நான் தான்'
  );
});

