# Base de datos

La base de datos MySQL se crea ejecutando `schema.sql` desde MySQL Workbench o la consola MySQL.

Tablas del modelo inicial:
- `categories`: categorías del catálogo.
- `products`: productos, precio, existencia de demostración y estado.
- `customers`: datos mínimos del cliente del prototipo.
- `orders`: pedido y total.
- `order_items`: detalle de los productos incluidos en cada pedido.

## Exportación

En MySQL Workbench: Server → Data Export → seleccionar `nexora_gaming` → Export to Self-Contained File → Start Export. Entrega el archivo SQL exportado junto con el código fuente.

Solo usa información ficticia en las pruebas.