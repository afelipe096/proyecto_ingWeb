const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

async function main() {
  const root = path.resolve(__dirname, '..');
  const htmlPath = path.join(root, 'poster', 'poster.html');
  const outputPath = path.join(root, 'poster', 'Poster_Nexora_Gaming_Tech_UMB.pdf');

  if (!fs.existsSync(htmlPath)) {
    throw new Error('No se encontró la fuente poster/poster.html');
  }

  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  try {
    const page = await browser.newPage({
      viewport: { width: 800, height: 1000 },
      deviceScaleFactor: 1
    });
    await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'load', timeout: 15000 });
    await page.emulateMedia({ media: 'print' });

    const poster = page.locator('.poster');
    await poster.waitFor({ state: 'visible', timeout: 5000 });
    const dimensions = await poster.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return { width: Math.round(rect.width), height: Math.round(rect.height) };
    });
    if (dimensions.width !== 800 || dimensions.height !== 1000) {
      throw new Error('El póster debe ocupar 800 × 1000 píxeles. Dimensiones detectadas: ' + JSON.stringify(dimensions));
    }

    await page.pdf({
      path: outputPath,
      width: '800px',
      height: '1000px',
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: false,
      margin: { top: '0', right: '0', bottom: '0', left: '0' }
    });
    const stats = fs.statSync(outputPath);
    if (stats.size < 5000) {
      throw new Error('El PDF generado tiene un tamaño inesperadamente pequeño: ' + stats.size);
    }
    console.log('Póster generado correctamente:', outputPath, '(' + stats.size + ' bytes)');
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error('No fue posible generar el póster PDF:', error);
  process.exitCode = 1;
});
