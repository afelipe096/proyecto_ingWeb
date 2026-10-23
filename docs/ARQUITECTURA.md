# Arquitectura de software

## Estilo arquitectónico

Nexora Gaming & Tech utiliza una arquitectura web de tres capas lógicas: presentación, aplicación y persistencia. El navegador no accede directamente a MySQL; consume una API REST implementada con Express, que procesa las solicitudes y ejecuta las consultas necesarias.

## Diagrama de componentes

```mermaid
flowchart TD
    U[Usuario / navegador]
    subgraph Frontend
      HTML[HTML5]
      CSS[CSS3 responsive]
      JS[JavaScript cliente]
      CART[Carrito en localStorage]
      LAB[Validación y sección de geocodificación]
      HTML --> JS
      CSS --- HTML
      JS --> CART
      JS --> LAB
    end
    subgraph Backend[Node.js y Express]
      STATIC[Servidor de archivos estáticos]
      API[API REST]
      VALID[Validación de entrada]
      ROUTES[Rutas de productos, categorías, pedidos y métricas]
      DBMOD[Conexión mysql2]
      API --> VALID --> ROUTES --> DBMOD
    end
    EXT[Open-Meteo Geocoding API]
    subgraph Persistencia
      MYSQL[(MySQL)]
      TABLES[Categorías, productos, clientes, pedidos y detalles]
      MYSQL --- TABLES
    end
    U --> HTML
    JS -- HTTP / JSON --> API
    LAB -- HTTPS / JSON con nombre de ciudad --> EXT
    STATIC --> HTML
    DBMOD -- SQL parametrizado --> MYSQL
```

## Comunicación entre capas

1. Express entrega los archivos de la interfaz.
2. JavaScript solicita categorías y productos mediante Fetch API.
3. La API valida los parámetros y responde en formato JSON.
4. El servidor vuelve a consultar precios y existencias cuando se registra un pedido.
5. MySQL almacena los datos y garantiza la consistencia de la operación mediante transacciones.
6. La sección Actividad 6 valida localmente el formulario de práctica y solicita coincidencias geográficas a Open-Meteo; la respuesta JSON se transforma en elementos del DOM sin recargar la página.

## Decisiones de diseño

- HTML5, CSS3 y JavaScript permiten mostrar directamente la estructura y la lógica del frontend.
- Express organiza los endpoints y centraliza el manejo de solicitudes.
- mysql2 proporciona la conexión entre Node.js y MySQL y admite consultas parametrizadas.
- Las transacciones agrupan la cabecera del pedido, los detalles y la actualización de existencias.
- El carrito se mantiene en localStorage; el precio definitivo se consulta en el backend.
- dotenv mantiene la configuración local fuera del código versionado.
- Helmet define cabeceras HTTP y una política de seguridad de contenido compatible con los recursos utilizados; connect-src permite específicamente la petición HTTPS a geocoding-api.open-meteo.com.
- La búsqueda geográfica es una integración externa de solo lectura. No envía el nombre, correo ni presupuesto del formulario; el usuario escribe el nombre de una ciudad como consulta independiente.
- La sección incluye atribución visible a Open-Meteo y maneja errores HTTP, fallos de red y respuestas sin resultados.
- CORS no habilita orígenes externos por defecto; los orígenes adicionales se configuran mediante la variable `CORS_ORIGINS`.

## Limitaciones

El panel de métricas es de lectura y no tiene autenticación ni control de roles. El prototipo no incorpora pasarela de pago, facturación electrónica, logística ni entrega de códigos digitales reales. Las imágenes y fuentes externas requieren conexión a internet.
