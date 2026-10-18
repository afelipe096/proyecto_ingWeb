const express = require('express');
const { randomUUID } = require('crypto');
const { getPool } = require('../config/database');

const router = express.Router();

router.post('/', async (req, res, next) => {
  const { fullName, email, phone = '', items, notes = '' } = req.body || {};

  if (typeof fullName !== 'string' || fullName.trim().length < 3 || fullName.length > 150) {
    return res.status(400).json({ error: 'Escribe un nombre válido.' });
  }
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 190) {
    return res.status(400).json({ error: 'Escribe un correo válido.' });
  }
  if (!Array.isArray(items) || items.length < 1 || items.length > 50) {
    return res.status(400).json({ error: 'El pedido debe incluir entre 1 y 50 referencias.' });
  }

  const normalized = new Map();
  for (const item of items) {
    const id = Number(item.productId);
    const quantity = Number(item.quantity);
    if (!Number.isInteger(id) || id < 1 || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
      return res.status(400).json({ error: 'Hay un producto o una cantidad no válida.' });
    }
    normalized.set(id, (normalized.get(id) || 0) + quantity);
  }

  const db = await getPool().getConnection();
  try {
    await db.beginTransaction();
    const productIds = [...normalized.keys()];
    const placeholders = productIds.map(() => '?').join(',');
    const [products] = await db.query(
      `SELECT id, name, price, stock, product_type
       FROM products WHERE is_active = TRUE AND id IN (${placeholders}) FOR UPDATE`,
      productIds
    );
    if (products.length !== productIds.length) {
      await db.rollback();
      return res.status(400).json({ error: 'Uno o más productos ya no están disponibles.' });
    }

    let subtotal = 0;
    for (const product of products) {
      const quantity = normalized.get(product.id);
      if (product.product_type === 'physical' && product.stock < quantity) {
        await db.rollback();
        return res.status(409).json({ error: `Existencias insuficientes para ${product.name}.` });
      }
      subtotal += Number(product.price) * quantity;
    }
    subtotal = Number(subtotal.toFixed(2));

    let customerId;
    const [customers] = await db.execute('SELECT id FROM customers WHERE email = ?', [email.trim().toLowerCase()]);
    if (customers.length) {
      customerId = customers[0].id;
      await db.execute('UPDATE customers SET full_name = ?, phone = ? WHERE id = ?', [fullName.trim(), String(phone).slice(0, 30), customerId]);
    } else {
      const [customerResult] = await db.execute(
        'INSERT INTO customers (full_name, email, phone) VALUES (?, ?, ?)',
        [fullName.trim(), email.trim().toLowerCase(), String(phone).slice(0, 30)]
      );
      customerId = customerResult.insertId;
    }

    const orderNumber = `NX-${Date.now().toString(36).toUpperCase()}-${randomUUID().slice(0, 6).toUpperCase()}`;
    const [orderResult] = await db.execute(
      `INSERT INTO orders (customer_id, order_number, status, payment_status, payment_method, subtotal, total, notes)
       VALUES (?, ?, 'pending', 'demo_pending', 'simulated', ?, ?, ?)`,
      [customerId, orderNumber, subtotal, subtotal, String(notes).slice(0, 500)]
    );

    for (const product of products) {
      const quantity = normalized.get(product.id);
      const lineTotal = Number((Number(product.price) * quantity).toFixed(2));
      await db.execute(
        `INSERT INTO order_items (order_id, product_id, product_name_snapshot, unit_price, quantity, line_total)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [orderResult.insertId, product.id, product.name, product.price, quantity, lineTotal]
      );
      if (product.product_type === 'physical') {
        await db.execute('UPDATE products SET stock = stock - ? WHERE id = ?', [quantity, product.id]);
      }
    }

    await db.commit();
    res.status(201).json({
      message: 'Pedido de demostración creado. No se realizó ningún cobro.',
      data: { orderNumber, status: 'pending', paymentStatus: 'demo_pending', total: subtotal }
    });
  } catch (error) {
    await db.rollback();
    next(error);
  } finally {
    db.release();
  }
});

module.exports = router;
