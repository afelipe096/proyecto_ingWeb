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
| P-10 | Interfaz | Capturas de inicio, catálogo y panel | Playwright |

## Resultados

El flujo **Project checks** ha completado las comprobaciones de sintaxis y las pruebas de estructura. El flujo **End-to-end demo capture** ha ejecutado la aplicación junto a una instancia temporal de MySQL, ha registrado un pedido ficticio pendiente de pago y ha generado capturas del frontend y del panel.

Estas pruebas verifican el recorrido automatizado definido para el prototipo. No incluyen pruebas de carga, auditoría de seguridad, pasarela de pagos ni validación comercial de los productos.

## Comandos disponibles

- `npm run check`: revisión de sintaxis de archivos JavaScript.
- `npm test`: pruebas estructurales con el ejecutor de pruebas nativo de Node.js.
- `npm run db:setup`: creación del esquema y carga de datos de demostración.
