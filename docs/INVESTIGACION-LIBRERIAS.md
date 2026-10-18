# Revisión de librerías JavaScript y adopción en desarrollo web

## Propósito
La actividad académica pide investigar librerías de JavaScript y su aceptación en la industria de Ingeniería Web. Esta revisión resume las herramientas consideradas para Nexora Gaming & Tech y explica su adecuación al proyecto.

> Los sitios y repositorios oficiales comprueban la disponibilidad y la documentación de las herramientas, pero no demuestran por sí solos una cuota de mercado exacta. No se asignan porcentajes de adopción sin una fuente estadística verificable.

## Librerías seleccionadas

| Librería | Uso en Nexora | Motivo técnico | Fuente oficial |
|---|---|---|---|
| Express | Rutas HTTP del backend | Organiza una API web mediante rutas y middlewares. | https://expressjs.com/ |
| mysql2 | Comunicación Node.js–MySQL | Ofrece API de promesas y consultas parametrizadas. | https://github.com/sidorares/node-mysql2 |
| dotenv | Configuración local | Separa las credenciales y los parámetros del código versionado. | https://github.com/motdotla/dotenv |
| Helmet | Cabeceras HTTP | Ayuda a configurar cabeceras de seguridad para Express. | https://helmetjs.github.io/ |
| cors | Solicitudes entre distintos orígenes | Permite establecer una política de acceso cross-origin; debe restringirse para el despliegue. | https://github.com/expressjs/cors |
| Chart.js | Visualización de métricas | Representa datos mediante gráficos en canvas. | https://www.chartjs.org/ |

## Uso en la aplicación
- Express, mysql2, dotenv, Helmet y cors se declaran como dependencias del proyecto.
- Chart.js se carga desde una distribución CDN y se considera para las métricas visuales del panel. Se requiere conexión a internet para descargarla.
- La interfaz usa APIs nativas del navegador como fetch, localStorage, FormData e Intl.NumberFormat; no toda interacción necesita una librería externa.

## Aceptación y relevancia industrial
Express y Chart.js cuentan con documentación oficial pública. mysql2, dotenv, Helmet y cors mantienen código y documentación accesibles en GitHub. Estas señales facilitan evaluar las herramientas: se pueden consultar sus instrucciones, reproducir la instalación y revisar el código.

Para afirmar una aceptación cuantitativa se debe incluir una fuente concreta, fecha de consulta y métrica comparable, como descargas de npm durante un intervalo o una encuesta de desarrolladores. Los contadores cambian continuamente y no equivalen directamente al porcentaje de empresas que usan una herramienta. Esta revisión no inventa porcentajes ni rankings.

## Criterios de selección
1. Compatibilidad con Node.js y Express.
2. Documentación de instalación y uso.
3. Encaje con la responsabilidad técnica requerida.
4. Código y documentación públicos.
5. Complejidad adecuada para que el equipo pueda explicar y probar la solución.

## Conclusión
Se eligieron librerías especializadas para responsabilidades concretas. Para una entrega académica, esta selección permite mostrar el flujo frontend–API–base de datos sin ocultar la lógica detrás de un framework de interfaz. Una afirmación estadística sobre adopción industrial necesita datos verificables adicionales.

## Referencias web (consulta: 17 de octubre de 2026)
- Express. (s. f.). *Express — Node.js web application framework*. https://expressjs.com/
- Chart.js. (s. f.). *Chart.js documentation*. https://www.chartjs.org/docs/latest/
- sidorares. (s. f.). *node-mysql2* [Repositorio de software]. GitHub. https://github.com/sidorares/node-mysql2
- motdotla. (s. f.). *dotenv* [Repositorio de software]. GitHub. https://github.com/motdotla/dotenv
- Helmet. (s. f.). *Helmet documentation*. https://helmetjs.github.io/
- expressjs. (s. f.). *cors* [Repositorio de software]. GitHub. https://github.com/expressjs/cors
