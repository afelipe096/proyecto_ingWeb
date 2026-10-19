const assert = require('node:assert/strict');
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
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(outputDir, 'storefront-home.png'), fullPage: false });

    await page.locator('#search-input').fill('monitor');
    await page.waitForTimeout(250);
    assert.ok(await page.locator('.product-card').count() >= 1, 'La búsqueda debe mostrar coincidencias.');
    await page.locator('#search-input').fill('');
    await page.locator('#category-filter').selectOption('perifericos');
    await page.waitForTimeout(250);
    assert.ok(await page.locator('.product-card').count() >= 1, 'El filtro de categoría debe mostrar productos.');

    await page.locator('[data-detail]').first().click();
    await page.locator('#product-detail-dialog[open]').waitFor({ timeout: 5000 });
    await page.waitForTimeout(250);
    await page.screenshot({ path: path.join(outputDir, 'product-detail.png'), fullPage: false });

    await page.locator('[data-detail-add]').click();
    await page.locator('#product-detail-dialog').waitFor({ state: 'hidden', timeout: 5000 });
    assert.equal(await page.locator('#cart-count').textContent(), '1', 'Agregar desde el detalle debe actualizar el contador.');

    await page.locator('#open-cart').click();
    await page.locator('#cart-drawer.open').waitFor({ timeout: 5000 });
    await page.screenshot({ path: path.join(outputDir, 'shopping-cart.png'), fullPage: false });
    await page.locator('#close-cart').click();

    await page.locator('#show-all').click();
    await page.locator('#catalogo').scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    assert.equal(await page.locator('.product-card').count(), 20, 'El catálogo de demostración debe mostrar 20 productos.');
    await page.screenshot({ path: path.join(outputDir, 'storefront-catalog.png'), fullPage: false });

    await page.goto('http://127.0.0.1:3000/admin.html', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.locator('#product-table tr').first().waitFor({ timeout: 20000 });
    await page.waitForTimeout(900);
    await page.screenshot({ path: path.join(outputDir, 'admin-dashboard.png'), fullPage: false });

    console.log('Pruebas de interfaz correctas; capturas creadas en', outputDir);
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error('Error en la prueba de interfaz:', error);
  process.exitCode = 1;
});
