const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport to a good resolution
  await page.setViewport({ width: 1280, height: 800 });

  const artifactDir = 'C:\\Users\\theja\\.gemini\\antigravity\\brain\\6196058a-6f2c-470c-976f-3a4f5d2e28af';

  // 1. Capture Home Page
  console.log('Navigating to Home...');
  await page.goto('http://localhost:4200/', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(artifactDir, 'homepage.png') });
  console.log('Homepage screenshot saved.');

  // 2. Capture Course List Page
  console.log('Navigating to Course List...');
  await page.goto('http://localhost:4200/courses', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(artifactDir, 'courses.png') });
  console.log('Courses page screenshot saved.');

  await browser.close();
})();
