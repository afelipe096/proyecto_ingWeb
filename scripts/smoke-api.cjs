const assert = require('node:assert/strict');

const BASE_URL = process.env.SMOKE_BASE_URL || 'http://127.0.0.1:3000';

async function getJson(path, options) {
  const response = await fetch(BASE_URL + path, options);
  const payload = await response.json();
  return { response, payload };
}

async function main() {
  const health = await getJson('/api/health');
  assert.equal(health.response.status, 200, 'La API de salud debe responder 200.');
  assert.equal(health.payload.status, 'ok', 'La API debe indicar estado ok.');

  const categories = await getJson('/api/categories');
  assert.equal(categories.response.status, 200, 'La API de categorías debe responder 200.');
  assert.ok(Array.isArray(categories.payload.data) && categories.payload.data.length >= 1,
    'Debe existir al menos una categoría en MySQL.');

  const products = await getJson('/api/products');
  assert.equal(products.response.status, 200, 'La API de productos debe responder 200.');
  assert.ok(Array.isArray(products.payload.data) && products.payload.data.length >= 1,
    'Debe existir al menos un producto en MySQL.');
  const product = products.payload.data.find((item) =>
    item.product_type === 'digital' || Number(item.stock) > 0
  );
  assert.ok(product, 'Debe existir un producto disponible para la prueba.');
  const email = 'ci-smoke-' + Date.now() + '@example.test';

  const invalid = await getJson('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: 'CI Test',
      email: 'correo-invalido',
      items: [{ productId: product.id, quantity: 1 }]
    })
  });
  assert.equal(invalid.response.status, 400, 'La API debe rechazar correos no válidos.');

  const order = await getJson('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: 'Cliente de prueba automatizada',
      email,
      phone: '',
      notes: 'Pedido ficticio generado por GitHub Actions para validar el flujo.',
      items: [{ productId: product.id, quantity: 1 }]
    })
  });

  assert.equal(order.response.status, 201, 'El pedido válido de prueba debe crearse.');
  assert.equal(order.payload.data.paymentStatus, 'demo_pending',
    'El pedido debe quedar pendiente de pago; esta prueba no cobra dinero.');
  assert.ok(order.payload.data.orderNumber, 'La API debe devolver un número de pedido.');
  assert.ok(Number(order.payload.data.total) >= 0, 'El servidor debe calcular un total.');

  const summary = await getJson('/api/admin/summary');
  assert.equal(summary.response.status, 200, 'El resumen debe consultar MySQL.');
  assert.ok(Number(summary.payload.data.totalOrders) >= 1, 'Debe reflejar al menos un pedido de prueba.');

  console.log(JSON.stringify({
    result: 'success',
    categoryCount: categories.payload.data.length,
    productCount: products.payload.data.length,
    demoOrder: order.payload.data.orderNumber,
    paymentStatus: order.payload.data.paymentStatus,
    message: 'API, validación, MySQL y registro transaccional comprobados.'
  }, null, 2));
}

main().catch((error) => {
  console.error('Prueba de integración fallida:', error);
  process.exitCode = 1;
});
