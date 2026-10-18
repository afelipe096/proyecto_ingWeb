# Modelo entidad–relación — Nexora Gaming & Tech

El siguiente diagrama documenta las relaciones del esquema MySQL inicial.

```mermaid
erDiagram
    CATEGORIES ||--o{ PRODUCTS : categoriza
    CUSTOMERS ||--o{ ORDERS : realiza
    ORDERS ||--|{ ORDER_ITEMS : contiene
    PRODUCTS ||--o{ ORDER_ITEMS : aparece_en

    CATEGORIES {
      int id PK
      varchar name
      varchar slug
    }
    PRODUCTS {
      int id PK
      int category_id FK
      varchar name
      decimal price
      int stock
      enum product_type
    }
    CUSTOMERS {
      int id PK
      varchar full_name
      varchar email UK
    }
    ORDERS {
      bigint id PK
      int customer_id FK
      varchar order_number UK
      enum status
      enum payment_status
      decimal total
    }
    ORDER_ITEMS {
      bigint id PK
      bigint order_id FK
      int product_id FK
      decimal unit_price
      int quantity
      decimal line_total
    }
```

## Justificación de las relaciones

- Una categoría puede agrupar muchos productos, pero un producto inicial pertenece a una categoría.
- Un cliente puede realizar varios pedidos.
- Cada pedido incluye uno o más detalles; cada detalle referencia un producto.
- Los detalles guardan el nombre y precio como fotografía histórica del producto para que los valores del pedido no dependan de cambios futuros en el catálogo.

## Limitación

Es el modelo relacional del prototipo académico. No incluye pasarela de pagos, facturación fiscal, proveedores, envíos ni usuarios con roles de administrador.
