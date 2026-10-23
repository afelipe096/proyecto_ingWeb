# Plan de pruebas y resultados de automatización

## Entorno de pruebas

- Node.js 22 en el flujo automatizado.
- MySQL 8.4 temporal en GitHub Actions.
- Navegador Chromium controlado con Playwright para las capturas.
- Catálogo y pedidos con datos ficticios.

## Casos de prueba

| ID | Prueba | Resultado esperado | Ejecución |
|---|---|---|---|
| P-01 | Estado de la API | HTTP 200 y estado `ok` | Automatizada |
| P-02 | Consulta de categorías | HTTP 200 y lista de categorías | Automatizada |
| P-03 | Consulta de productos | HTTP 200 y lista de productos | Automatizada |
| P-04 | Correo inválido en un pedido | HTTP 400 y rechazo de la solicitud | Automatizada |
| P-05 | Pedido válido de demostración | HTTP 201 y número de orden | Automatizada |
| P-06 | Estado del pago | El pedido queda como `demo_pending` | Automatizada |
| P-07 | Métricas del panel | Indicadores consultados desde la API | Automatizada |
| P-08 | Sintaxis JavaScript | Ningún error de análisis sintáctico en los archivos revisados | GitHub Actions |
| P-09 | Estructura y esquema | Existencia de archivos, tablas y relaciones principales | Node.js test runner |
| P-10 | Interfaz | Capturas de inicio, catálogo, detalle, carrito y panel | Playwright |
| P-11 | Búsqueda | La búsqueda por texto muestra coincidencias | Playwright |
| P-12 | Filtro por categoría | El listado muestra artículos de la categoría seleccionada | Playwright |
| P-13 | Detalle del producto | El diálogo presenta la información y permite agregar el artículo al carrito | Playwright |
| P-14 | Carrito | El contador y el panel lateral reflejan el artículo agregado | Playwright |
| P-15 | Catálogo completo | La vista sin filtros contiene 20 productos de demostración | Playwright |
| P-16 | Validación en tiempo real | El nombre muestra un error inmediato cuando tiene menos de tres caracteres y el mensaje se actualiza al corregirse | Playwright |
| P-17 | Envío del formulario de laboratorio | Nombre, correo y presupuesto válidos muestran confirmación sin enviar ni almacenar datos personales | Playwright |
| P-18 | Renderizado de la API pública | Una respuesta JSON de geocodificación se representa dinámicamente en el DOM | Playwright con respuesta controlada |
| P-19 | Respuesta HTTP no exitosa | La interfaz muestra un mensaje y recupera el estado del botón cuando la API responde con error | Playwright con respuesta controlada |
| P-20 | Consulta real a Open-Meteo | La búsqueda de una ciudad devuelve resultados al usar conexión a internet | Verificación manual |

## Resultados

El flujo **Project checks** ha completado las comprobaciones de sintaxis y las pruebas de estructura. El flujo **End-to-end demo capture** ha ejecutado la aplicación junto a una instancia temporal de MySQL, ha registrado un pedido ficticio pendiente de pago ha comprobado la búsqueda, el filtro de categoría, el detalle de producto y el carrito, y ha generado capturas del frontend y del panel.

Con la Actividad 6 se incorporan pruebas de navegador para la validación del formulario, el renderizado de la respuesta JSON y el manejo de errores HTTP, usando respuestas controladas por Playwright para que las comprobaciones sean reproducibles. La consulta real a Open-Meteo debe verificarse con conexión a internet. Estas pruebas no incluyen pruebas de carga, auditoría de seguridad, pasarela de pagos ni validación comercial de los productos.

## Comandos disponibles

- `npm run check`: revisión de sintaxis de archivos JavaScript.
- `npm test`: pruebas estructurales con el ejecutor de pruebas nativo de Node.js.
- `npm run db:setup`: creación del esquema y carga de datos de demostración.
