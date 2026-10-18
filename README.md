# Nexora Gaming & Tech

Tienda web académica de productos tecnológicos y gaming desarrollada para la actividad de sustentación de proyecto de Ingeniería Web — SEMILLERO UMB SOFT, Universidad Manuela Beltrán.

## Objetivo

Construir una tienda de comercio electrónico con catálogo organizado por categorías, búsqueda y filtros, carrito de compras, creación de pedidos de demostración y métricas administrativas de solo lectura. El proyecto evidencia el uso de HTML5, CSS3, JavaScript, Node.js, Express y MySQL.

## Categorías

- Juegos digitales y tarjetas de regalo
- Consolas y accesorios
- Controles, teclados, ratones y audífonos
- Sillas, escritorios y monitores
- Computadores y componentes
- Cables, cargadores, hubs y conectividad
- Almacenamiento, redes y streaming
- Componentes, periféricos y accesorios de oficina tecnológica

## Tecnologías

- Frontend: HTML5, CSS3 y JavaScript.
- Backend: Node.js y Express.
- Base de datos: MySQL, con consultas parametrizadas y transacciones.
- Librerías: mysql2, dotenv, Helmet y cors. Chart.js está previsto para visualizaciones de métricas.
- Pruebas: Node.js built-in test runner y comprobación de sintaxis.

## Funcionalidades

- Catálogo, búsqueda, filtro por categoría y ordenamiento.
- Carrito persistido localmente en el navegador.
- Validación de pedido, recálculo de importes desde la base de datos y guardado transaccional de pedidos de demostración.
- Resumen de inventario de solo lectura en la API.
- Diseño responsive y documentación técnica.

Los productos, precios, existencias y pedidos son datos de prueba académicos: no representan inventario real ni información comercial real. No se realizan cobros, no se conecta una pasarela de pagos y no se entregan claves reales de juegos.

## Ejecución local

1. Instala Node.js LTS y MySQL Server.
2. Crea las tablas y datos iniciales ejecutando el archivo database/schema.sql desde MySQL Workbench.
3. Copia .env.example a .env y configura la conexión local. No subas .env a GitHub.
4. Instala dependencias con npm install.
5. Ejecuta npm run check y npm test.
6. Ejecuta npm run dev.
7. Abre http://localhost:3000 y comprueba http://localhost:3000/api/health.

## Documentación académica

- [Alcance y requisitos](docs/REQUISITOS.md)
- [Mapa de navegación](docs/MAPA-NAVEGACION.md)
- [Arquitectura](docs/ARQUITECTURA.md)
- [Investigación de librerías JavaScript](docs/INVESTIGACION-LIBRERIAS.md)
- [Plan de pruebas](docs/PRUEBAS.md)
- [Manual de uso local](docs/USO-LOCAL.md)
- [Guion de sustentación](docs/GUION-SUSTENTACION.md)
- [Modelo de base de datos](database/README.md)

## Seguridad y alcance

Esta aplicación es un prototipo académico. Antes de manejar pagos reales o datos personales se deben incorporar autenticación y autorización, límites de solicitudes, política de seguridad de contenido apropiada, protección de datos y un proveedor de pagos certificado. El resumen administrativo no está protegido por login, por lo que no debe usarse con datos privados.
