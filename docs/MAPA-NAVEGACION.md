# Mapa de navegación

## Flujo principal

```mermaid
flowchart TD
    A[Inicio / Nexora] --> B[Catálogo]
    A --> C[Categorías]
    A --> D[Sobre nosotros]
    C --> E[Catálogo filtrado por categoría]
    B --> F[Buscar producto]
    B --> G[Filtrar categoría]
    B --> H[Ordenar productos]
    F --> I[Resultados]
    G --> I
    H --> I
    I --> J[Agregar al carrito]
    J --> K[Carrito lateral]
    K --> L[Editar cantidad / eliminar]
    L --> K
    K --> M[Formulario de pedido]
    M --> N[Pedido de demostración]
    N --> O[Confirmación con número de pedido]
```

## Descripción

- **Inicio:** presentación, accesos a categorías, productos destacados y descripción del proyecto.
- **Catálogo:** búsqueda por nombre/descripción, filtro por categoría y opciones de ordenamiento.
- **Categorías:** accesos rápidos que preseleccionan un filtro.
- **Carrito:** muestra referencias, cantidades y subtotal; permite modificar o retirar productos.
- **Formulario de pedido:** recoge nombre y correo, valida los campos y envía una solicitud a la API.
- **Confirmación:** comunica el número del pedido de prueba e indica que no se procesó ningún pago.
- **Sobre nosotros:** explica la finalidad del prototipo.

## Rutas de API

| Método | Ruta | Propósito |
|---|---|---|
| GET | `/api/health` | Verificar que el servidor está activo |
| GET | `/api/categories` | Consultar categorías |
| GET | `/api/products` | Listar, buscar y filtrar productos |
| GET | `/api/products/:id` | Consultar el detalle de un producto |
| POST | `/api/orders` | Crear un pedido de demostración |
| GET | `/api/admin/summary` | Consultar métricas de solo lectura |

El flujo dibujado representa la navegación funcional propuesta. La administración completa, autenticación y pago real no forman parte del alcance inicial.