# Nexora Gaming & Tech

Tienda web académica de productos tecnológicos y gaming desarrollada para la actividad de sustentación de proyecto de Ingeniería Web — SEMILLERO UMB SOFT, Universidad Manuela Beltrán.

## Objetivo

Construir una tienda de comercio electrónico con catálogo organizado por categorías, búsqueda y filtros, carrito de compras, creación de pedidos de demostración y un área administrativa básica. El proyecto permite evidenciar el uso de HTML5, CSS3, JavaScript, Node.js, Express y MySQL.

## Categorías

- Juegos digitales y tarjetas de regalo
- Consolas y accesorios
- Controles, teclados, ratones y audífonos
- Sillas, escritorios y monitores
- Computadores y componentes
- Cables, cargadores y conectividad
- Almacenamiento, redes y streaming

## Tecnologías

- Frontend: HTML5, CSS3, JavaScript y Chart.js.
- Backend: Node.js y Express.
- Base de datos: MySQL.
- API: REST, con validación en servidor.

## Estado inicial

El repositorio inicia con la estructura y especificación del proyecto. La información de productos que se agregue para demostración debe identificarse como datos de prueba; no representa inventario real ni una pasarela de pago conectada.

## Ejecución local

1. Instala Node.js LTS y MySQL Server.
2. Crea una base de datos ejecutando el script `database/schema.sql`.
3. Copia `.env.example` a `.env` y configura la conexión de tu entorno.
4. Instala dependencias con `npm install`.
5. Ejecuta `npm run dev` para desarrollo o `npm start` para ejecución normal.
6. Abre `http://localhost:3000`.

## Documentación académica

- [Alcance y requisitos](docs/REQUISITOS.md)
- [Mapa de navegación](docs/MAPA-NAVEGACION.md)
- [Arquitectura](docs/ARQUITECTURA.md)
- [Guion de sustentación](docs/GUION-SUSTENTACION.md)
- [Base de datos](database/README.md)

## Importante

Esta aplicación es un prototipo académico. Antes de manejar pagos reales, datos personales o pedidos reales se deben incorporar autenticación segura, autorización, protección de datos, gestión de inventario transaccional y un proveedor de pagos certificado.