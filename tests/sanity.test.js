const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8');

test('el proyecto incluye frontend, API, base de datos y documentación', () => {
  for (const file of [
    'src/server.js',
    'src/config/database.js',
    'src/routes/products.js',
    'src/routes/categories.js',
    'src/routes/orders.js',
    'public/index.html',
    'public/css/styles.css',
    'public/js/app.js',
    'public/js/actividad6.js',
    'docs/ACTIVIDAD-6-DOM-FETCH.md',
    'docs/GUION-VIDEO-ACTIVIDAD-6.md',
    'public/admin.html',
    'public/js/admin.js',
    'public/404.html',
    'database/schema.sql',
    'database/nexora_gaming_export.sql',
    'docs/ARQUITECTURA.md',
    'docs/INVESTIGACION-LIBRERIAS.md',
    'docs/MAPA-NAVEGACION.md'
  ]) {
    assert.ok(fs.existsSync(path.join(root, file)), 'Falta ' + file);
  }
});

test('el esquema declara las tablas principales y relaciones', () => {
  const schema = read('database/schema.sql');
  for (const table of ['categories', 'products', 'customers', 'orders', 'order_items']) {
    assert.match(schema, new RegExp('CREATE TABLE IF NOT EXISTS ' + table + '\\b'));
  }
  assert.match(schema, /FOREIGN KEY/);
  assert.match(schema, /utf8mb4/);
  assert.match(schema, /licencia-juego-independiente-demo/);
  assert.match(schema, /tarjeta-regalo-digital-100000/);
});

test('la API valida pedidos y gestiona la transacción', () => {
  const orders = read('src/routes/orders.js');
  assert.match(orders, /beginTransaction/);
  assert.match(orders, /commit\(\)/);
  assert.match(orders, /rollback\(\)/);
  assert.match(orders, /product\.price/);
  assert.match(orders, /payment_status/);
  assert.match(orders, /combinedQuantity/);
  assert.match(orders, /No se realizó ningún cobro/);
});

test('la interfaz incluye búsqueda, filtros y carrito', () => {
  const html = read('public/index.html');
  const js = read('public/js/app.js');
  for (const id of ['search-input', 'category-filter', 'sort-filter', 'cart-count', 'cart-drawer', 'checkout-form', 'product-detail-dialog']) {
    assert.ok(html.includes('id="' + id + '"'), 'No se encontró el control ' + id);
  }
  assert.match(js, /localStorage/);
  assert.match(js, /renderProducts/);
  assert.match(js, /submitOrder/);
  assert.match(js, /showProductDetail/);
  assert.match(js, /attachImageFallbacks/);
  assert.doesNotMatch(js, /onerror=/i);
});

test('el servidor define cabeceras de seguridad y limita CORS', () => {
  const server = read('src/server.js');
  assert.match(server, /helmet\(/);
  assert.match(server, /contentSecurityPolicy/);
  assert.match(server, /allowedOrigins/);
  assert.match(server, /disable\('x-powered-by'\)/);
});

test('el ejemplo de entorno no contiene credenciales reales', () => {
  const example = read('.env.example');
  assert.match(example, /DB_PASSWORD=CAMBIA_ESTA_CLAVE/);
  assert.match(example, /CORS_ORIGINS=/);
  assert.ok(!fs.existsSync(path.join(root, '.env')), 'No debe versionarse .env');
});

test('la documentación describe el alcance del prototipo sin instrucciones personales', () => {
  const readme = read('README.md');
  assert.match(readme, /prototipo/i);
  assert.match(readme, /datos ilustrativos/i);
  assert.match(readme, /nexora_gaming_export\.sql/);
  assert.doesNotMatch(readme, /ChatGPT|recomendación para ti|antes de entregar/i);
});


test('la Actividad 6 implementa validación en tiempo real y consulta asíncrona', () => {
  const html = read('public/index.html');
  const activity = read('public/js/actividad6.js');
  const server = read('src/server.js');
  for (const id of ['setup-name', 'setup-email', 'setup-budget', 'setup-form-status', 'location-search-form', 'location-results']) {
    assert.ok(html.includes('id="' + id + '"'), 'Falta el control de la actividad ' + id);
  }
  assert.match(activity, /querySelectorAll\('\[data-validate\]'\)/);
  assert.match(activity, /addEventListener\('input'/);
  assert.match(activity, /addEventListener\('submit'/);
  assert.match(activity, /async \(event\)/);
  assert.match(activity, /await fetch\(url/);
  assert.match(activity, /await response\.json\(\)/);
  assert.match(activity, /catch \(error\)/);
  assert.match(activity, /replaceChildren\(\)/);
  assert.match(activity, /aria-invalid/);
  assert.match(server, /https:\/\/geocoding-api\.open-meteo\.com/);
});
