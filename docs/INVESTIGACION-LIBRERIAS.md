# Librerías JavaScript y su uso en el desarrollo web

## Propósito

La selección de librerías para Nexora Gaming & Tech se basa en las responsabilidades de la aplicación: exponer una API web, acceder a MySQL, gestionar la configuración del entorno, establecer cabeceras HTTP y representar métricas.

## Librerías seleccionadas

| Librería | Uso en el proyecto | Criterio de selección |
|---|---|---|
| Express | Rutas HTTP y middleware de la API | Organización clara de endpoints y manejo de solicitudes de Node.js |
| mysql2 | Acceso a MySQL | Consultas parametrizadas y API basada en promesas |
| dotenv | Variables de entorno | Separación de la configuración local del código fuente |
| Helmet | Cabeceras HTTP y política de seguridad de contenido | Configuración de medidas de seguridad en aplicaciones Express |
| cors | Política de acceso cross-origin | Control de orígenes externos permitidos |
| Chart.js | Gráfica de productos por categoría | Visualización de datos agregados en el panel |

## Aplicación en Nexora

Express organiza las rutas de categorías, productos, pedidos y métricas. mysql2 conecta el servidor con las tablas relacionales y permite usar consultas parametrizadas. dotenv carga la configuración del entorno, mientras que Helmet define cabeceras y reglas de seguridad de contenido. CORS permanece restringido a los orígenes declarados en la configuración. Chart.js se utiliza para representar la cantidad de productos por categoría en el panel.

La interfaz también utiliza APIs nativas del navegador, entre ellas Fetch API, localStorage, FormData e Intl.NumberFormat.

## Criterios de evaluación

- Compatibilidad con el ecosistema Node.js.
- Documentación pública de instalación y uso.
- Encaje con una responsabilidad definida del proyecto.
- Disponibilidad del código y posibilidad de revisión.
- Integración con las demás partes de la aplicación.
- Complejidad adecuada para pruebas y mantenimiento.

## Relevancia en la industria

La documentación oficial y los repositorios públicos facilitan evaluar estas herramientas, comprobar sus interfaces y revisar sus cambios. Express y Chart.js publican documentación de uso; mysql2, dotenv, Helmet y cors mantienen sus fuentes y materiales técnicos en repositorios públicos.

La presencia de documentación, código fuente y actividad de mantenimiento permite evaluar la viabilidad técnica de una librería, pero no representa por sí sola una cuota de mercado. Las afirmaciones cuantitativas sobre adopción requieren métricas identificables, como descargas de un periodo definido o resultados de encuestas de desarrolladores.

## Conclusión

Las librerías seleccionadas cubren funciones concretas de servidor, persistencia, configuración, seguridad y visualización. La combinación mantiene visible la integración entre el frontend, la API REST y la base de datos, y permite examinar las responsabilidades principales del sistema.

## Referencias

- Chart.js. (s. f.). *Chart.js documentation*. https://www.chartjs.org/docs/latest/
- Express. (s. f.). *Express web framework*. https://expressjs.com/
- expressjs. (s. f.). *cors* [Repositorio de software]. GitHub. https://github.com/expressjs/cors
- Helmet. (s. f.). *Helmet documentation*. https://helmetjs.github.io/
- motdotla. (s. f.). *dotenv* [Repositorio de software]. GitHub. https://github.com/motdotla/dotenv
- sidorares. (s. f.). *node-mysql2* [Repositorio de software]. GitHub. https://github.com/sidorares/node-mysql2

Fecha de consulta de las referencias: 18 de octubre de 2026.
