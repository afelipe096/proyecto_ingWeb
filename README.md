# Nexora Gaming & Tech

Aplicación web de comercio electrónico para la consulta de productos de tecnología y gaming. El proyecto se desarrolla en el marco de Ingeniería Web del SEMILLERO UMB SOFT de la Universidad Manuela Beltrán.

## Descripción

Nexora organiza en un único catálogo productos digitales, periféricos y equipos tecnológicos. La interfaz permite consultar productos, filtrar por categoría, buscar por texto, ordenar resultados, administrar un carrito y registrar pedidos de demostración.

## Objetivo

Desarrollar una aplicación web que integre una interfaz de comercio electrónico, una API REST y una base de datos relacional, aplicando HTML5, CSS3, JavaScript y herramientas del entorno Node.js.

## Categorías del catálogo

- Juegos digitales
- Consolas y accesorios
- Audio y streaming
- Monitores y pantallas
- Computadores y componentes
- Sillas y escritorios
- Periféricos
- Cables y energía
- Almacenamiento y redes
- Tarjetas de regalo

El catálogo contiene 20 productos de demostración con precios y existencias ilustrativos.

## Funcionalidades principales

- Catálogo de productos organizado por categorías, con una vista detallada de cada artículo.
- Búsqueda por nombre, descripción o categoría.
- Filtro por categoría y ordenamiento por nombre o precio.
- Carrito con cantidades, eliminación de productos y cálculo de subtotal.
- Formulario y registro transaccional de pedidos de demostración.
- Validación en el servidor de productos, cantidades, precios y existencias.
- Panel de indicadores de catálogo, pedidos e inventario.
- Diseño responsive para escritorio y dispositivos móviles.
- Exportación SQL del esquema y los datos iniciales del catálogo.

## Tecnologías

| Capa | Tecnología | Responsabilidad |
|---|---|---|
| Interfaz | HTML5, CSS3, JavaScript | Navegación, catálogo, filtros y carrito |
| API | Node.js, Express | Rutas HTTP y lógica de aplicación |
| Persistencia | MySQL, mysql2 | Productos, categorías, clientes y pedidos |
| Visualización | Chart.js | Gráfica de productos por categoría |
| Configuración | dotenv | Variables de entorno |
| Seguridad HTTP | Helmet, CORS | Cabeceras y política de orígenes |
| Verificación | Node.js test runner, GitHub Actions | Pruebas de estructura, sintaxis e integración |

## Arquitectura

La solución se organiza en tres capas lógicas:

1. **Frontend:** muestra las vistas y envía solicitudes mediante Fetch API.
2. **Backend:** valida los datos y expone endpoints REST mediante Express.
3. **Base de datos:** conserva categorías, productos, clientes, pedidos y detalles.

El carrito se mantiene en el almacenamiento local del navegador. Al registrar un pedido, el servidor consulta nuevamente los precios y existencias y guarda la operación mediante una transacción SQL.

## Estructura del repositorio

```text
public/                 Interfaz de la tienda y panel de métricas
  css/                  Hojas de estilos
  js/                   Lógica del navegador
src/                    Servidor, configuración y rutas de API
  config/               Conexión a MySQL
  routes/               Productos, categorías, pedidos y métricas
database/               Esquema y volcado SQL inicial
docs/                   Requisitos, diagramas y documentación
scripts/                Preparación de base de datos y pruebas de integración
tests/                  Pruebas automatizadas
.github/workflows/      Validaciones automáticas
```

## Ejecución local

Requisitos: Node.js LTS y MySQL Server.

1. Descargar o clonar el repositorio.
2. Ejecutar `database/schema.sql` en MySQL Workbench o preparar el esquema mediante el comando `npm run db:setup`.
3. Copiar `.env.example` a `.env` e indicar las credenciales locales de MySQL. El archivo `.env` está excluido del repositorio.
4. Instalar las dependencias con `npm install`.
5. Ejecutar las validaciones mediante `npm run check` y `npm test`.
6. Iniciar el servidor con `npm run dev`.
7. Consultar la aplicación en `http://localhost:3000`.

El endpoint `GET /api/health` expone el estado básico del servidor.

## Rutas principales de la API

| Método | Ruta | Función |
|---|---|---|
| GET | `/api/health` | Estado del servicio |
| GET | `/api/categories` | Listado de categorías |
| GET | `/api/products` | Consulta, búsqueda y filtros de productos |
| GET | `/api/products/:id` | Detalle de un producto |
| POST | `/api/orders` | Registro de un pedido de demostración |
| GET | `/api/admin/summary` | Indicadores de catálogo y pedidos |

## Base de datos

El modelo incluye cinco tablas: `categories`, `products`, `customers`, `orders` y `order_items`. Los archivos `database/schema.sql` y `database/nexora_gaming_export.sql` contienen la definición relacional y los datos iniciales.

## Documentación

- [Requisitos y alcance](docs/REQUISITOS.md)
- [Mapa de navegación](docs/MAPA-NAVEGACION.md)
- [Arquitectura de software](docs/ARQUITECTURA.md)
- [Modelo entidad-relación](docs/MODELO-ER.md)
- [Investigación de librerías JavaScript](docs/INVESTIGACION-LIBRERIAS.md)
- [Plan de pruebas](docs/PRUEBAS.md)
- [Manual de instalación](docs/USO-LOCAL.md)
- [Guion de sustentación](docs/GUION-SUSTENTACION.md)
- [Documentación de base de datos](database/README.md)

## Alcance del prototipo

Los precios, existencias y productos son datos ilustrativos. Los pedidos se registran con estado de pago pendiente de demostración y no se realizan cobros ni se entregan claves digitales reales. La autenticación, los roles administrativos, la integración logística, la facturación electrónica y las pasarelas de pago no están incluidos en esta versión.
