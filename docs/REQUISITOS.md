# Alcance y requisitos — Nexora Gaming & Tech

## Problema

Los compradores de tecnología y productos gamer suelen tener que navegar entre múltiples categorías y fichas de producto para encontrar accesorios compatibles con sus necesidades. El prototipo propone una interfaz unificada para explorar el catálogo, filtrar referencias, gestionar un carrito y registrar pedidos de demostración.

## Objetivo general

Desarrollar una aplicación web de comercio electrónico para explorar productos tecnológicos y gaming, con una interfaz intuitiva, un catálogo organizado y persistencia de productos y pedidos en una base de datos relacional.

## Objetivos específicos

1. Diseñar una interfaz responsive utilizando HTML5, CSS3 y JavaScript.
2. Organizar el catálogo por categoría y permitir búsquedas, filtros y ordenamiento.
3. Implementar una API REST con Node.js y Express.
4. Modelar la información en MySQL y permitir registrar pedidos de demostración.
5. Documentar el mapa de navegación, la arquitectura y las decisiones técnicas.

## Alcance funcional

- Página principal y navegación por secciones.
- Listado de productos con categorías.
- Búsqueda por nombre/descripción, filtro por categoría y ordenamiento por precio o nombre.
- Carrito con cantidades, eliminación de artículos y cálculo de subtotal.
- Formulario de pedido y registro de pedido de demostración en la base de datos.
- Consulta de categorías, productos individuales y métricas de solo lectura.
- Panel de demostración en admin.html con indicadores y gráfica de productos por categoría.
- Mensajes claros indicando que no se realizan cobros reales.

## Fuera del alcance inicial

- Pasarela de pagos real.
- Emisión o entrega de claves auténticas de juegos digitales.
- Integración con proveedores y logística.
- Inicio de sesión, recuperación de contraseña y roles administrativos completos.
- Inventario sincronizado con proveedores reales.
- Facturación electrónica y manejo de información de tarjetas.

## Requisitos funcionales

- RF-01: El sistema debe mostrar los productos activos del catálogo.
- RF-02: El usuario debe poder buscar por nombre o descripción.
- RF-03: El usuario debe poder filtrar el catálogo por categoría.
- RF-04: El usuario debe poder ordenar por precio ascendente/descendente o nombre.
- RF-05: El usuario debe poder agregar productos al carrito, cambiar cantidades y eliminar artículos.
- RF-06: El sistema debe calcular el subtotal del carrito.
- RF-07: El usuario debe poder enviar un formulario de pedido con nombre y correo válidos.
- RF-08: La API debe validar las referencias y cantidades recibidas y volver a calcular los importes desde la base de datos.
- RF-09: El sistema debe registrar el pedido y sus detalles en una transacción de base de datos.
- RF-10: El prototipo debe distinguir entre pedido creado y pago realizado.
- RF-11: La API debe exponer categorías y un resumen de métricas de lectura.
- RF-12: La interfaz debe informar cuando el servidor o la base de datos no estén disponibles.

## Requisitos no funcionales

- RNF-01: Diseño adaptable a pantallas de escritorio y móvil.
- RNF-02: Uso de consultas parametrizadas para los valores introducidos por el usuario.
- RNF-03: Validación en frontend y backend.
- RNF-04: Código organizado por responsabilidad, con rutas de API separadas.
- RNF-05: No publicar credenciales en el repositorio.
- RNF-06: La interfaz debe tener etiquetas, mensajes de estado y controles con nombres accesibles.
- RNF-07: Las operaciones de pedidos deben ejecutarse dentro de una transacción.
- RNF-08: Los datos de muestra y precios ilustrativos deben identificarse como tales.

## Criterios de aceptación (5)

1. La página principal muestra catálogo y categorías sin errores de JavaScript.
2. Buscar un término actualiza el listado; el filtro y el ordenamiento funcionan conjuntamente.
3. Agregar artículos actualiza el contador y el subtotal del carrito.
4. Una solicitud de pedido con datos válidos crea una orden y sus detalles; una solicitud inválida recibe un código de error apropiado.
5. El proyecto se puede configurar siguiendo el README y expone `GET /api/health` con estado `ok`.

## Librerías JavaScript y justificación

- Express: organizar rutas y respuestas HTTP del servidor.
- mysql2: conectar Node.js con MySQL y realizar consultas parametrizadas.
- dotenv: cargar configuración local desde variables de entorno.
- helmet: aplicar cabeceras HTTP de seguridad.
- cors: definir el comportamiento de solicitudes cross-origin; puede restringirse al dominio de despliegue.
- Chart.js: dibuja la gráfica de productos por categoría en el panel administrativo de demostración.

## Nota de seguridad

Antes de producción deben agregarse autenticación y autorización, límites de frecuencia, política CSP adecuada, validación de imágenes/URLs, política CORS restrictiva, protección de datos, monitoreo y pruebas automatizadas. La ruta de resumen administrativo es solo de demostración y no sustituye un panel protegido.