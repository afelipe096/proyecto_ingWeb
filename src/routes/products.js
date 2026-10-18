const express = require('express');
const { getPool } = require('../config/database');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { q = '', category = '', featured = '', limit = '100' } = req.query;
    const safeLimit = Math.min(Math.max(Number.parseInt(limit, 10) || 100, 1), 200);
    const conditions = ['p.is_active = TRUE'];
    const params = [];

    if (String(q).trim()) {
      conditions.push('(p.name LIKE ? OR p.description LIKE ?)');
      const term = `%${String(q).trim().slice(0, 100)}%`;
      params.push(term, term);
    }
    if (String(category).trim()) {
      conditions.push('c.slug = ?');
      params.push(String(category).trim());
    }
    if (featured === 'true') conditions.push('p.is_featured = TRUE');

    const [rows] = await getPool().execute(
      `SELECT p.id, p.name, p.slug, p.description, p.product_type, p.price,
              p.stock, p.image_url, p.is_featured, c.name AS category_name,
              c.slug AS category_slug
       FROM products p JOIN categories c ON c.id = p.category_id
       WHERE ${conditions.join(' AND ')}
       ORDER BY p.is_featured DESC, p.created_at DESC
       LIMIT ${safeLimit}`,
      params
    );
    res.json({ data: rows });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id, 10);
    if (!Number.isInteger(id) || id < 1) return res.status(400).json({ error: 'Identificador inválido.' });
    const [rows] = await getPool().execute(
      `SELECT p.id, p.name, p.slug, p.description, p.product_type, p.price,
              p.stock, p.image_url, p.is_featured, c.name AS category_name,
              c.slug AS category_slug
       FROM products p JOIN categories c ON c.id = p.category_id
       WHERE p.id = ? AND p.is_active = TRUE`,
      [id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Producto no encontrado.' });
    res.json({ data: rows[0] });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
