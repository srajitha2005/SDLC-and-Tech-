const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.error('PAGE ERROR:', error.message));
  page.on('requestfailed', request => {
    console.log(`REQUEST FAILED: ${request.url()} ${request.failure().errorText}`);
  });

  try {
    await page.goto('http://localhost:4200', { waitUntil: 'networkidle0', timeout: 10000 });
  } catch (err) {
    console.error('GOTO ERROR:', err);
  }
  
  await browser.close();
})();
