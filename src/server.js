require('dotenv').config();

const express = require('express');
const path = require('node:path');
const helmet = require('helmet');
const cors = require('cors');

const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');
const ordersRouter = require('./routes/orders');
const adminRouter = require('./routes/admin');

const app = express();
const PORT = Number(process.env.PORT || 3000);
const allowedOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.disable('x-powered-by');
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      baseUri: ["'self'"],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      formAction: ["'self'"],
      frameAncestors: ["'none'"],
      imgSrc: ["'self'", 'data:', 'https://images.unsplash.com'],
      objectSrc: ["'none'"],
      scriptSrc: ["'self'", 'https://cdn.jsdelivr.net'],
      styleSrc: ["'self'", 'https://fonts.googleapis.com'],
      connectSrc: ["'self'", 'https://geocoding-api.open-meteo.com'],
      upgradeInsecureRequests: null
    }
  }
}));

// La tienda y su API comparten origen. Solo se habilitan otros orígenes
// cuando se declaran explícitamente en CORS_ORIGINS.
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, Boolean(origin));
    return callback(null, false);
  },
  optionsSuccessStatus: 204
}));

app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: false, limit: '100kb' }));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Nexora Gaming & Tech' });
});

app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/admin', adminRouter);

app.use(express.static(path.join(__dirname, '..', 'public'), {
  index: 'index.html',
  extensions: ['html']
}));

app.use((req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'Ruta de API no encontrada.' });
  }
  return res.status(404).sendFile(path.join(__dirname, '..', 'public', '404.html'), (error) => {
    if (error && !res.headersSent) {
      res.status(404).type('text').send('Página no encontrada.');
    }
  });
});

app.use((error, _req, res, _next) => {
  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'El cuerpo de la solicitud no contiene JSON válido.' });
  }
  if (error.type === 'entity.too.large') {
    return res.status(413).json({ error: 'La solicitud supera el tamaño permitido.' });
  }
  console.error(error);
  return res.status(500).json({ error: 'Ocurrió un error interno al procesar la solicitud.' });
});

app.listen(PORT, () => {
  console.log(`Nexora Gaming & Tech disponible en http://localhost:${PORT}`);
});
