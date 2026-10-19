# Requisitos de software — Nexora Gaming & Tech

## Problema

El catálogo de una tienda de tecnología puede incluir productos digitales, computadores, componentes, periféricos, equipos de audio y accesorios de conectividad. Cuando estos elementos se presentan sin una organización clara, la búsqueda de productos y la comparación entre categorías se vuelven menos directas.

Nexora propone una interfaz unificada para consultar un catálogo de demostración, filtrar referencias, gestionar una selección en el carrito y registrar pedidos de prueba.

## Objetivo general

Desarrollar una aplicación web de comercio electrónico que integre catálogo, búsqueda, carrito de compras, registro de pedidos y almacenamiento relacional, aplicando tecnologías de desarrollo web.

## Objetivos específicos

1. Diseñar una interfaz adaptable mediante HTML5, CSS3 y JavaScript.
2. Organizar los productos por categoría y ofrecer búsqueda, filtros y ordenamiento.
3. Implementar una API REST con Node.js y Express.
4. Modelar y persistir las categorías, los productos, los clientes y los pedidos mediante MySQL.
5. Documentar el mapa de navegación, la arquitectura, las librerías y las pruebas del sistema.

## Alcance funcional

- Página de inicio y navegación por secciones.
- Catálogo organizado en nueve categorías y un conjunto de 20 productos de demostración.
- Búsqueda por nombre, descripción o categoría.
- Filtro por categoría y ordenamiento por precio o nombre.
- Vista detallada del producto seleccionado.
- Carrito con cantidades, eliminación de artículos y cálculo del subtotal.
- Formulario de pedido y registro transaccional en la base de datos.
- Consulta de categorías, productos individuales y métricas.
- Panel de indicadores con gráfica de productos por categoría.
- Mensajes de estado para la disponibilidad de la aplicación y del catálogo.

## Fuera del alcance actual

- Pasarela de pagos real.
- Emisión y entrega de claves auténticas de juegos digitales.
- Gestión de proveedores, envíos y logística.
- Autenticación, recuperación de contraseña y control de roles.
- Integración con inventarios de proveedores.
- Facturación electrónica y almacenamiento de datos de tarjetas.

## Requisitos funcionales

- **RF-01:** Mostrar los productos activos del catálogo.
- **RF-02:** Buscar productos por nombre o descripción.
- **RF-03:** Filtrar el catálogo por categoría.
- **RF-04:** Ordenar el catálogo por precio ascendente, precio descendente o nombre.
- **RF-05:** Agregar productos al carrito, modificar cantidades y eliminar artículos.
- **RF-06:** Calcular el subtotal de los artículos seleccionados.
- **RF-07:** Validar nombre y correo en el registro del pedido.
- **RF-08:** Validar en el servidor las referencias, cantidades, precios y existencias.
- **RF-09:** Registrar el pedido y sus detalles dentro de una transacción SQL.
- **RF-10:** Mantener separado el estado del pedido del estado del pago.
- **RF-11:** Consultar categorías y métricas de catálogo mediante la API.
- **RF-12:** Mostrar un estado adecuado cuando el catálogo remoto no está disponible.

## Requisitos no funcionales

- **RNF-01:** Interfaz responsive para escritorio y móvil.
- **RNF-02:** Consultas parametrizadas para los valores recibidos desde el cliente.
- **RNF-03:** Validación de datos tanto en el frontend como en el backend.
- **RNF-04:** Código dividido por responsabilidad y organizado por rutas.
- **RNF-05:** Credenciales excluidas del repositorio.
- **RNF-06:** Controles con etiquetas y estados accesibles.
- **RNF-07:** Persistencia transaccional de los pedidos y sus detalles.
- **RNF-08:** Identificación de los precios y existencias como datos ilustrativos.

## Criterios de aceptación

1. La página principal presenta el catálogo y las categorías.
2. La búsqueda, el filtro y el ordenamiento actualizan el conjunto de productos mostrado.
3. El carrito actualiza el contador y el subtotal cuando cambia la selección.
4. La API rechaza las entradas inválidas y registra un pedido válido de demostración.
5. La base de datos contiene las tablas relacionadas y el endpoint `GET /api/health` devuelve el estado del servicio.

## Librerías JavaScript

- **Express:** rutas y manejo de solicitudes HTTP.
- **mysql2:** conexión con MySQL y consultas parametrizadas.
- **dotenv:** configuración mediante variables de entorno.
- **Helmet:** cabeceras de seguridad HTTP y política de contenido.
- **cors:** control de solicitudes desde otros orígenes.
- **Chart.js:** visualización de productos por categoría en el panel.

## Limitaciones

El proyecto se presenta como un prototipo académico con catálogo de demostración y pedidos sin cobro. No incluye autenticación administrativa, pagos reales, entrega digital, logística ni facturación electrónica.
