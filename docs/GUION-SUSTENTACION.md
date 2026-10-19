# Guion de sustentación — Nexora Gaming & Tech

**Duración total:** 10 minutos  
**Proyecto:** Plataforma web de comercio electrónico de tecnología y gaming  
**Tecnologías:** HTML5, CSS3, JavaScript, Node.js, Express y MySQL

## 0:00–1:15 | Presentación y problema

“Buenos días. Presentamos Nexora Gaming & Tech, una aplicación web orientada a la consulta y selección de productos tecnológicos y gaming. El catálogo reúne juegos digitales de demostración, consolas, controles, periféricos, audio, monitores, computadores, mobiliario, cables y accesorios.

El proyecto aborda la necesidad de organizar distintas categorías en una sola interfaz, con herramientas de búsqueda y filtrado y un flujo claro para seleccionar productos y registrar pedidos.”

## 1:15–2:00 | Objetivo y alcance

“El objetivo es desarrollar una aplicación web que integre el frontend, una API REST y una base de datos relacional. La interfaz está construida con HTML5, CSS3 y JavaScript; el servidor utiliza Node.js y Express; y MySQL almacena las categorías, productos, clientes y pedidos.

El alcance incluye el catálogo, los filtros, el carrito, el panel de métricas y el registro de pedidos de demostración. No se realizan cobros ni se entregan claves de juegos reales.”

## 2:00–5:30 | Demostración de la aplicación

**Página principal y catálogo.** La página de inicio presenta la identidad visual, las categorías y los productos destacados. En el catálogo se puede buscar por texto, filtrar por categoría y ordenar por nombre o precio.

**Detalle y carrito.** La ficha de producto presenta su descripción, categoría, precio y disponibilidad ilustrativa. Desde esa vista se puede agregar el artículo al carrito. El contador se actualiza y el carrito permite modificar cantidades o eliminar artículos; el subtotal se recalcula con base en la selección actual.

**Registro de pedido.** El formulario solicita nombre y correo. El servidor valida la información, consulta los precios y existencias en la base de datos y registra el pedido y sus detalles dentro de una transacción. La respuesta incluye un número de pedido y el estado de pago de demostración.

**Panel de métricas.** La vista administrativa muestra cantidades de productos, categorías, pedidos, existencias y una gráfica de productos por categoría.

## 5:30–7:30 | Arquitectura y navegación

“La solución se organiza en tres capas lógicas. La primera es el frontend, donde se encuentran las páginas, los estilos y la lógica de interacción. La segunda es el backend, desarrollado con Express, que expone endpoints REST y valida las solicitudes. La tercera es la persistencia, implementada en MySQL.

El navegador se comunica con la API mediante solicitudes HTTP y respuestas JSON. El servidor utiliza consultas parametrizadas para consultar y modificar los datos. El diagrama y el mapa de navegación representan la relación entre las pantallas y los componentes principales.”

## 7:30–8:45 | Decisiones técnicas

“HTML5 estructura el contenido y CSS3 establece el diseño responsive. JavaScript permite manejar la búsqueda, los filtros, el carrito y las solicitudes a la API. Express organiza las rutas del servidor; mysql2 conecta Node.js con MySQL; dotenv separa la configuración local del código fuente; y Helmet establece cabeceras de seguridad HTTP. Chart.js se utiliza en el panel para visualizar la distribución de productos por categoría.”

## 8:45–9:40 | Validación y limitaciones

“El proyecto cuenta con comprobaciones automáticas de sintaxis y estructura. El flujo de integración ejecuta la API con una base MySQL temporal, consulta productos y categorías, verifica el rechazo de datos inválidos y registra un pedido ficticio pendiente de pago. También se generan capturas del sitio en un navegador automatizado.

El alcance actual corresponde a un prototipo académico. No incluye autenticación administrativa, pasarela de pagos ni entrega real de productos digitales.”

## 9:40–10:00 | Cierre

“En conclusión, Nexora Gaming & Tech integra la navegación del catálogo, la gestión del carrito y el registro de pedidos de demostración en una arquitectura de tres capas. El proyecto aplica los conceptos de desarrollo web, consumo de API, persistencia relacional y validación de datos. Muchas gracias.”
