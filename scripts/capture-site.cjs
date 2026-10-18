const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');

async function main() {
  const outputDir = path.join(__dirname, '..', 'artifacts');
  fs.mkdirSync(outputDir, { recursive: true });

  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  try {
    const page = await browser.newPage({
      viewport: { width: 1600, height: 1050 },
      deviceScaleFactor: 1
    });

    await page.goto('http://127.0.0.1:3000', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.locator('.product-card').first().waitFor({ timeout: 20000 });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(outputDir, 'storefront-home.png'), fullPage: false });

    await page.locator('#catalogo').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(outputDir, 'storefront-catalog.png'), fullPage: false });

    await page.goto('http://127.0.0.1:3000/admin.html', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.locator('#product-table tr').first().waitFor({ timeout: 20000 });
    await page.waitForTimeout(1200);
    await page.screenshot({ path: path.join(outputDir, 'admin-dashboard.png'), fullPage: false });

    console.log('Capturas creadas en', outputDir);
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error('Error capturando la aplicación:', error);
  process.exitCode = 1;
});
