# Guion de sustentación — máximo 10 minutos

Ajustar el guion con los nombres reales de los integrantes. No afirmar que una funcionalidad funciona hasta comprobarla en la ejecución.

## 0:00–1:15 · Presentación y problema

“Presentamos Nexora Gaming & Tech, un prototipo de comercio electrónico centrado en productos tecnológicos y gaming. La idea es reunir en una sola interfaz categorías como juegos digitales, consolas, computadores, periféricos, audio, pantallas, sillas y conectividad. El usuario puede explorar el catálogo, encontrar productos y organizar una selección en el carrito. Para esta entrega nos concentramos en la experiencia de navegación, la estructura de software y el registro de pedidos de demostración.”

## 1:15–2:00 · Objetivos y alcance

“El objetivo es desarrollar una tienda web con HTML5, CSS3 y JavaScript, un backend Node.js con Express y persistencia en MySQL. El alcance incluye catálogo, búsqueda, filtros, ordenamiento, carrito y registro de pedidos de prueba. No se procesa ningún pago real ni se entregan códigos auténticos de juegos.”

## 2:00–5:30 · Demostración

1. Mostrar la página de inicio y sus secciones.
2. Entrar al catálogo y demostrar búsqueda por una palabra.
3. Filtrar por una categoría y ordenar por precio.
4. Agregar uno o dos productos al carrito, cambiar la cantidad y explicar el subtotal.
5. Abrir el formulario del pedido y demostrar validación de campos.
6. Si el servidor y MySQL están configurados, enviar el pedido y mostrar el número de confirmación.
7. Si la base de datos todavía no está configurada, mostrar el fallback del catálogo y explicar honestamente que la persistencia requiere ejecutar el servidor y el script SQL.

## 5:30–7:30 · Arquitectura y navegación

“Separamos la solución en tres capas lógicas. La interfaz se ejecuta en el navegador; consume una API REST de Express; y el backend consulta MySQL. Esto evita exponer credenciales de base de datos en el navegador. El mapa de navegación representa el recorrido desde el inicio y el catálogo hasta el carrito y el registro del pedido.”

## 7:30–8:45 · Decisiones técnicas

“Elegimos JavaScript para la interacción del catálogo y carrito. Express organiza los endpoints REST; mysql2 permite conectarnos con MySQL usando consultas parametrizadas. Dotenv mantiene las credenciales fuera del código versionado y Helmet ayuda a configurar cabeceras de seguridad. El carrito usa localStorage, mientras que precios y existencias del pedido se verifican de nuevo en el servidor.”

## 8:45–9:40 · Aprendizajes y limitaciones

“El aprendizaje principal fue integrar la interfaz con una API y una base de datos, separar responsabilidades y validar los datos tanto en cliente como en servidor. El proyecto sigue siendo un prototipo: no cuenta con pasarela de pago ni con autenticación de administrador. Estas serían mejoras futuras antes de utilizar información o transacciones reales.”

## 9:40–10:00 · Cierre

“En conclusión, Nexora demuestra el flujo base de una tienda tecnológica: explorar el catálogo, seleccionar productos y crear un pedido de demostración. Gracias.”

## Comprobaciones antes de grabar

- Ejecutar el servidor desde un entorno local y verificar `/api/health`.
- Comprobar búsqueda, filtros, carrito y validación.
- Conectar MySQL, insertar datos iniciales y crear un pedido de prueba.
- Revisar ortografía, datos de autores y nombre del equipo.
- Grabar pantalla con voz clara, sin mostrar contraseñas ni datos personales.
