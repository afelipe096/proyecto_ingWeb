# Manual de instalación y ejecución local

## Requisitos

- Node.js LTS.
- MySQL Server.
- Visual Studio Code u otro editor.
- Navegador web actualizado.

## Instalación

1. Clonar el repositorio o descargar el código fuente.
2. Abrir la carpeta del proyecto en el editor.
3. Crear las tablas y cargar el catálogo inicial. El script `database/schema.sql` puede ejecutarse desde MySQL Workbench.
4. Crear el archivo local `.env` a partir de `.env.example`.
5. Configurar el host, el puerto, el usuario, la contraseña y el nombre de la base de datos según la instalación de MySQL.
6. Instalar las dependencias ejecutando `npm install`.
7. Verificar el código con `npm run check` y ejecutar las pruebas con `npm test`.
8. Iniciar la aplicación con `npm run dev`.
9. Abrir `http://localhost:3000`.

## Preparación automatizada de la base de datos

Con MySQL disponible y las credenciales locales configuradas en `.env`, el comando `npm run db:setup` ejecuta el esquema y los datos iniciales contenidos en `database/schema.sql`.

## Direcciones locales

- Tienda: `http://localhost:3000`
- Panel de métricas: `http://localhost:3000/admin.html`
- Estado de la API: `http://localhost:3000/api/health`

## Pedido de demostración

El formulario del carrito recoge nombre, correo, teléfono opcional y notas. La API vuelve a consultar los precios y las existencias antes de crear el pedido. La orden y sus detalles se registran dentro de una transacción y el estado de pago queda establecido como `demo_pending`. No se realiza un cobro.

## Exportación de la base de datos

Desde MySQL Workbench, la opción **Server → Data Export** permite seleccionar el esquema `nexora_gaming` y exportarlo a un archivo SQL autocontenido. El repositorio incluye `database/nexora_gaming_export.sql` con el esquema y el catálogo inicial de demostración.

## Errores frecuentes

| Mensaje o síntoma | Causa habitual |
|---|---|
| `ECONNREFUSED` | MySQL no está iniciado o el puerto de conexión no coincide. |
| `Access denied` | Las credenciales configuradas no corresponden al servidor MySQL. |
| `Unknown database` | El esquema todavía no se ha creado. |
| El catálogo no carga desde la API | El servidor o la conexión con MySQL no están disponibles. |
| Las imágenes no se muestran | Las imágenes externas requieren conexión a internet. |

## Consideraciones del prototipo

Los datos del catálogo son ilustrativos. El panel de métricas es una vista de demostración sin autenticación y presenta indicadores del conjunto de datos de prueba. El sistema no incorpora procesamiento de pagos ni entrega de códigos digitales reales.
