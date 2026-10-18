const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8');

test('el proyecto tiene las piezas principales', () => {
  for (const file of [
    'src/server.js',
    'src/config/database.js',
    'src/routes/products.js',
    'src/routes/categories.js',
    'src/routes/orders.js',
    'public/index.html',
    'public/css/styles.css',
    'public/js/app.js',
    'database/schema.sql',
    'docs/ARQUITECTURA.md'
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
});

test('la API valida pedidos y calcula importes en el servidor', () => {
  const orders = read('src/routes/orders.js');
  assert.match(orders, /beginTransaction/);
  assert.match(orders, /commit\(\)/);
  assert.match(orders, /rollback\(\)/);
  assert.match(orders, /product\.price/);
  assert.match(orders, /payment_status/);
  assert.match(orders, /No se realizó ningún cobro/);
});

test('la interfaz incluye búsqueda, filtros y carrito', () => {
  const html = read('public/index.html');
  const js = read('public/js/app.js');
  for (const id of ['search-input', 'category-filter', 'sort-filter', 'cart-count', 'cart-drawer', 'checkout-form']) {
    assert.ok(html.includes('id="' + id + '"'), 'No se encontró el control ' + id);
  }
  assert.match(js, /localStorage/);
  assert.match(js, /renderProducts/);
  assert.match(js, /submitOrder/);
});

test('el ejemplo de entorno no contiene credenciales reales', () => {
  const example = read('.env.example');
  assert.match(example, /DB_PASSWORD=CAMBIA_ESTA_CLAVE/);
  assert.ok(!fs.existsSync(path.join(root, '.env')), 'No debe versionarse .env');
});

test('la documentación señala el alcance académico', () => {
  const readme = read('README.md');
  assert.match(readme, /prototipo académico/i);
  assert.match(readme, /no representa inventario real/i);
});
