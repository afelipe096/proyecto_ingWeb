const express = require('express');
const { getPool } = require('../config/database');

const router = express.Router();

// Panel de métricas de solo lectura para demostración académica.
// Antes de publicar funciones administrativas, agrega autenticación y autorización.
router.get('/summary', async (_req, res, next) => {
  try {
    const pool = getPool();
    const [[products]] = await pool.execute('SELECT COUNT(*) AS total FROM products WHERE is_active = TRUE');
    const [[categories]] = await pool.execute('SELECT COUNT(*) AS total FROM categories');
    const [[orders]] = await pool.execute('SELECT COUNT(*) AS total FROM orders');
    const [[sales]] = await pool.execute(
      `SELECT COALESCE(SUM(total), 0) AS total
       FROM orders WHERE status <> 'cancelled' AND payment_status = 'paid'`
    );
    const [[stock]] = await pool.execute(
      'SELECT COALESCE(SUM(stock), 0) AS units FROM products WHERE is_active = TRUE'
    );
    res.json({
      data: {
        totalProducts: products.total,
        totalCategories: categories.total,
        totalOrders: orders.total,
        paidSales: Number(sales.total),
        unitsInStock: stock.units
      },
      note: 'El panel no reemplaza un sistema administrativo protegido.'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
