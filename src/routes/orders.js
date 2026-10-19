const express = require('express');
const { randomUUID } = require('node:crypto');
const { getPool } = require('../config/database');

const router = express.Router();
const MAX_QUANTITY_PER_PRODUCT = 20;
const MAX_REFERENCES_PER_ORDER = 50;

router.post('/', async (req, res, next) => {
  const { fullName, email, phone = '', items, notes = '' } = req.body || {};

  if (typeof fullName !== 'string' || fullName.trim().length < 3 || fullName.trim().length > 150) {
    return res.status(400).json({ error: 'Escribe un nombre válido.' });
  }

  if (typeof email !== 'string' || email.length > 190 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ error: 'Escribe un correo válido.' });
  }

  if (!Array.isArray(items) || items.length < 1 || items.length > MAX_REFERENCES_PER_ORDER) {
    return res.status(400).json({ error: 'El pedido debe incluir entre 1 y 50 referencias.' });
  }

  const normalized = new Map();
  for (const item of items) {
    if (!item || typeof item !== 'object') {
      return res.status(400).json({ error: 'Hay un producto o una cantidad no válida.' });
    }

    const id = Number(item.productId);
    const quantity = Number(item.quantity);
    if (!Number.isSafeInteger(id) || id < 1 ||
        !Number.isSafeInteger(quantity) || quantity < 1 ||
        quantity > MAX_QUANTITY_PER_PRODUCT) {
      return res.status(400).json({ error: 'Hay un producto o una cantidad no válida.' });
    }

    const combinedQuantity = (normalized.get(id) || 0) + quantity;
    if (combinedQuantity > MAX_QUANTITY_PER_PRODUCT) {
      return res.status(400).json({ error: 'La cantidad acumulada por producto no puede superar 20 unidades.' });
    }
    normalized.set(id, combinedQuantity);
  }

  let db;
  let transactionStarted = false;
  try {
    db = await getPool().getConnection();
    await db.beginTransaction();
    transactionStarted = true;

    const productIds = [...normalized.keys()];
    const placeholders = productIds.map(() => '?').join(',');
    const [products] = await db.query(
      `SELECT id, name, price, stock, product_type
       FROM products
       WHERE is_active = TRUE AND id IN (${placeholders})
       FOR UPDATE`,
      productIds
    );

    if (products.length !== productIds.length) {
      await db.rollback();
      transactionStarted = false;
      return res.status(400).json({ error: 'Uno o más productos ya no están disponibles.' });
    }

    let subtotal = 0;
    for (const product of products) {
      const quantity = normalized.get(product.id);
      if (product.product_type === 'physical' && Number(product.stock) < quantity) {
        await db.rollback();
        transactionStarted = false;
        return res.status(409).json({ error: `Existencias insuficientes para ${product.name}.` });
      }
      subtotal += Number(product.price) * quantity;
    }
    subtotal = Number(subtotal.toFixed(2));

    const normalizedEmail = email.trim().toLowerCase();
    const [customers] = await db.execute(
      'SELECT id FROM customers WHERE email = ?',
      [normalizedEmail]
    );

    let customerId;
    if (customers.length) {
      customerId = customers[0].id;
      await db.execute(
        'UPDATE customers SET full_name = ?, phone = ? WHERE id = ?',
        [fullName.trim(), String(phone).slice(0, 30), customerId]
      );
    } else {
      const [customerResult] = await db.execute(
        'INSERT INTO customers (full_name, email, phone) VALUES (?, ?, ?)',
        [fullName.trim(), normalizedEmail, String(phone).slice(0, 30)]
      );
      customerId = customerResult.insertId;
    }

    const orderNumber = `NX-${Date.now().toString(36).toUpperCase()}-${randomUUID().slice(0, 6).toUpperCase()}`;
    const [orderResult] = await db.execute(
      `INSERT INTO orders
         (customer_id, order_number, status, payment_status, payment_method, subtotal, total, notes)
       VALUES (?, ?, 'pending', 'demo_pending', 'simulated', ?, ?, ?)`,
      [customerId, orderNumber, subtotal, subtotal, String(notes).slice(0, 500)]
    );

    for (const product of products) {
      const quantity = normalized.get(product.id);
      const lineTotal = Number((Number(product.price) * quantity).toFixed(2));

      await db.execute(
        `INSERT INTO order_items
           (order_id, product_id, product_name_snapshot, unit_price, quantity, line_total)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [orderResult.insertId, product.id, product.name, product.price, quantity, lineTotal]
      );

      if (product.product_type === 'physical') {
        await db.execute(
          'UPDATE products SET stock = stock - ? WHERE id = ?',
          [quantity, product.id]
        );
      }
    }

    await db.commit();
    transactionStarted = false;
    return res.status(201).json({
      message: 'Pedido de demostración creado. No se realizó ningún cobro.',
      data: {
        orderNumber,
        status: 'pending',
        paymentStatus: 'demo_pending',
        total: subtotal
      }
    });
  } catch (error) {
    if (db && transactionStarted) {
      try {
        await db.rollback();
      } catch (rollbackError) {
        console.error('No fue posible revertir la transacción:', rollbackError);
      }
    }
    return next(error);
  } finally {
    if (db) db.release();
  }
});

module.exports = router;
