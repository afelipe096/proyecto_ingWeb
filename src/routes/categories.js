const express = require('express');
const { getPool } = require('../config/database');

const router = express.Router();

router.get('/', async (_req, res, next) => {
  try {
    const [rows] = await getPool().execute(
      `SELECT c.id, c.name, c.slug, c.description, COUNT(p.id) AS product_count
       FROM categories c
       LEFT JOIN products p ON p.category_id = c.id AND p.is_active = TRUE
       GROUP BY c.id, c.name, c.slug, c.description
       ORDER BY c.name`
    );
    res.json({ data: rows });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
