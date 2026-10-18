# Plan de pruebas y registro

## Entorno previsto
- Node.js LTS
- MySQL Server y MySQL Workbench
- Navegador actualizado
- Variables de entorno configuradas a partir de .env.example

## Casos manuales

| ID | Caso | Pasos | Resultado esperado |
|---|---|---|---|
| P-01 | Salud de API | Abrir /api/health | JSON con status: ok |
| P-02 | Catálogo | Abrir el inicio | Se muestran productos de la API o catálogo de reserva |
| P-03 | Búsqueda | Buscar “monitor” | Solo aparecen coincidencias |
| P-04 | Filtro | Seleccionar categoría | Catálogo filtrado |
| P-05 | Ordenamiento | Seleccionar precio ascendente | Productos ordenados por precio |
| P-06 | Carrito | Agregar producto y cambiar cantidad | Contador y subtotal se actualizan |
| P-07 | Cantidad excesiva | Superar el stock de demostración | La interfaz rechaza la cantidad |
| P-08 | Pedido inválido | Enviar un correo no válido | El formulario o API rechaza el dato |
| P-09 | Pedido válido | Configurar MySQL y crear pedido de prueba | Orden y detalles guardados; sin cobro |
| P-10 | Stock insuficiente | Pedir unidades por encima del stock físico | API responde conflicto y no crea pedido parcial |
| P-11 | Base no configurada | Intentar consultar API | La interfaz informa de la reserva del catálogo; la persistencia no se finge |
| P-12 | Móvil | Revisar pantalla estrecha | Navegación y tarjetas se adaptan |

## Resultados
Completar esta sección únicamente después de ejecutar cada caso. No marcar pruebas como aprobadas sin haberlas ejecutado.

| Caso | Resultado | Evidencia / fecha |
|---|---|---|
| Pendiente de ejecución local | Pendiente | Completar durante la comprobación final |

## Pruebas automatizadas
El comando npm test comprueba condiciones estáticas y artefactos esenciales. No reemplaza pruebas manuales con MySQL, navegador ni pruebas de integración de extremo a extremo.
