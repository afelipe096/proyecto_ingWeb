CREATE DATABASE IF NOT EXISTS nexora_gaming
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE nexora_gaming;

CREATE TABLE IF NOT EXISTS categories (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(80) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  category_id INT UNSIGNED NOT NULL,
  name VARCHAR(150) NOT NULL,
  slug VARCHAR(170) NOT NULL UNIQUE,
  description TEXT,
  product_type ENUM('physical','digital') NOT NULL DEFAULT 'physical',
  price DECIMAL(12,2) NOT NULL,
  stock INT UNSIGNED NOT NULL DEFAULT 0,
  image_url VARCHAR(500),
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_products_category FOREIGN KEY (category_id) REFERENCES categories(id),
  CONSTRAINT chk_products_price CHECK (price >= 0)
);

CREATE TABLE IF NOT EXISTS customers (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(190) NOT NULL,
  phone VARCHAR(30),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_customers_email (email)
);

CREATE TABLE IF NOT EXISTS orders (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  customer_id INT UNSIGNED NOT NULL,
  order_number VARCHAR(40) NOT NULL UNIQUE,
  status ENUM('pending','confirmed','preparing','shipped','completed','cancelled') NOT NULL DEFAULT 'pending',
  payment_status ENUM('demo_pending','paid','failed','refunded') NOT NULL DEFAULT 'demo_pending',
  payment_method VARCHAR(50) NOT NULL DEFAULT 'simulated',
  subtotal DECIMAL(12,2) NOT NULL,
  total DECIMAL(12,2) NOT NULL,
  notes VARCHAR(500),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_orders_customer FOREIGN KEY (customer_id) REFERENCES customers(id),
  CONSTRAINT chk_orders_total CHECK (total >= 0)
);

CREATE TABLE IF NOT EXISTS order_items (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_id BIGINT UNSIGNED NOT NULL,
  product_id INT UNSIGNED NOT NULL,
  product_name_snapshot VARCHAR(150) NOT NULL,
  unit_price DECIMAL(12,2) NOT NULL,
  quantity INT UNSIGNED NOT NULL,
  line_total DECIMAL(12,2) NOT NULL,
  CONSTRAINT fk_items_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  CONSTRAINT fk_items_product FOREIGN KEY (product_id) REFERENCES products(id),
  CONSTRAINT chk_items_quantity CHECK (quantity > 0)
);

INSERT IGNORE INTO categories (name, slug, description) VALUES
('Juegos digitales','juegos-digitales','Juegos digitales y contenido de entretenimiento.'),
('Consolas y accesorios','consolas-accesorios','Consolas, mandos y accesorios.'),
('Audio y streaming','audio-streaming','Audífonos, micrófonos y cámaras.'),
('Monitores y pantallas','monitores-pantallas','Monitores, pantallas y accesorios visuales.'),
('Computadores y componentes','computadores-componentes','Equipos y componentes de computador.'),
('Sillas y escritorios','sillas-escritorios','Mobiliario para puestos gamer y de trabajo.'),
('Periféricos','perifericos','Teclados, ratones, alfombrillas y controles.'),
('Cables y energía','cables-energia','Cables, cargadores, hubs y regletas.'),
('Almacenamiento y redes','almacenamiento-redes','Discos, memorias, routers y adaptadores.'),
('Tarjetas de regalo','tarjetas-regalo','Tarjetas y saldo digital.');

-- Productos de prueba: valores ilustrativos, no representan precios ni stock comerciales.
INSERT IGNORE INTO products
(category_id, name, slug, description, product_type, price, stock, image_url, is_featured)
SELECT c.id, p.name, p.slug, p.description, p.product_type, p.price, p.stock, p.image_url, p.is_featured
FROM categories c
JOIN (
  SELECT 'juegos-digitales' category_slug, 'Tarjeta digital de entretenimiento' name, 'tarjeta-digital-entretenimiento' slug, 'Código digital de demostración. No se entrega un código real.' description, 'digital' product_type, 89900.00 price, 25 stock, 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=900&q=80' image_url, 1 is_featured
  UNION ALL SELECT 'consolas-accesorios','Control inalámbrico gamer','control-inalambrico-gamer','Control de demostración para consola y PC.','physical',259900.00,14,'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=900&q=80',1
  UNION ALL SELECT 'audio-streaming','Audífonos gamer con micrófono','audifonos-gamer-microfono','Audífonos de demostración con micrófono.','physical',189900.00,18,'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=900&q=80',1
  UNION ALL SELECT 'monitores-pantallas','Monitor gaming 27 pulgadas','monitor-gaming-27','Monitor de muestra para el catálogo académico.','physical',899900.00,7,'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=80',1
  UNION ALL SELECT 'computadores-componentes','Computador gaming de escritorio','computador-gaming-escritorio','Equipo ilustrativo para una tienda gaming.','physical',3499900.00,4,'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=900&q=80',1
  UNION ALL SELECT 'sillas-escritorios','Silla ergonómica gamer','silla-ergonomica-gamer','Silla de demostración para espacios de juego y estudio.','physical',799900.00,6,'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=900&q=80',1
  UNION ALL SELECT 'perifericos','Teclado mecánico RGB','teclado-mecanico-rgb','Teclado de prueba con iluminación RGB.','physical',229900.00,12,'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80',0
  UNION ALL SELECT 'cables-energia','Hub USB-C multipuerto','hub-usbc-multipuerto','Accesorio de conectividad de demostración.','physical',119900.00,20,'https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=900&q=80',0
  UNION ALL SELECT 'almacenamiento-redes','SSD externo 1 TB','ssd-externo-1tb','Almacenamiento externo de ejemplo.','physical',329900.00,10,'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=900&q=80',0
  UNION ALL SELECT 'tarjetas-regalo','Tarjeta de regalo digital','tarjeta-regalo-digital','Producto digital de demostración, sin saldo real.','digital',50000.00,30,'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80',0
) p ON p.category_slug = c.slug;
