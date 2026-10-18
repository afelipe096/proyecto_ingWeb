# Manual de instalación y uso local

## Requisitos
- Node.js LTS instalado.
- MySQL Server instalado y en ejecución.
- Git para clonar el repositorio, o descargar un ZIP desde GitHub.
- Navegador moderno.

## Pasos
1. Clona el repositorio o descárgalo como ZIP.
2. Abre la carpeta en Visual Studio Code.
3. Abre MySQL Workbench y ejecuta el contenido de database/schema.sql.
4. Copia .env.example como .env en la raíz del proyecto.
5. Configura DB_USER, DB_PASSWORD y el resto de parámetros según tu MySQL local. No compartas el archivo .env ni lo subas a GitHub.
6. En la terminal ejecuta npm install.
7. Ejecuta npm run dev.
8. Abre http://localhost:3000.
9. Comprueba http://localhost:3000/api/health.
10. Para revisar métricas de inventario, abre http://localhost:3000/admin.html.

## Pedido de prueba
Agrega productos al carrito y completa nombre y correo ficticios. Si MySQL está configurado, el servidor verifica de nuevo los precios y existencias y registra el pedido. La respuesta debe indicar que no hubo cobro real.

## Exportación de base de datos
En MySQL Workbench selecciona Server → Data Export, marca el esquema nexora_gaming, elige exportar a archivo autocontenido, escribe un nombre como nexora_gaming_export.sql y ejecuta la exportación. Revisa el archivo y entrega el export editable con el código fuente.

## Errores frecuentes
- ECONNREFUSED: MySQL no está iniciado o el puerto está mal.
- Access denied: las credenciales locales son incorrectas.
- Unknown database: no se ejecutó database/schema.sql.
- Las imágenes externas no cargan: requieren internet; catálogo y controles textuales siguen disponibles.
- Los pedidos no se guardan: revisa la terminal y la conexión MySQL.

## Seguridad y alcance
Entrega educativa. No incluye inicio de sesión, roles administrativos, procesamiento de pagos, entrega de claves digitales ni una protección de datos apta para producción. Los endpoints de resumen son demostrativos.
