# Actividad 6 — DOM, validación y Fetch API

## Propósito

Esta sección de Nexora Gaming & Tech implementa los conceptos de la Guía 06 de Ingeniería Web I: manipulación del DOM, validación de formularios en tiempo real, asincronía con async/await, consumo de una API REST pública y manejo de errores con try/catch.

## Ubicación

La funcionalidad está integrada en la página principal, dentro de la sección Laboratorio / Actividad 06 — Planifica tu próximo setup. La implementación se mantiene separada del catálogo y del carrito en public/js/actividad6.js.

## 1. Formulario y validación

El formulario contiene los tres campos solicitados por la guía:

| Campo | Tipo | Regla principal | Mensaje de validación |
|---|---|---|---|
| Nombre completo | Texto | Obligatorio, mínimo 3 caracteres | Solicita un nombre válido |
| Correo electrónico | Email | Obligatorio y con estructura de email válida | Solicita corregir el formato |
| Presupuesto estimado | Numérico | De 50.000 a 10.000.000 COP, en incrementos de 50.000 | Indica el límite o incremento necesario |

La función validateField revisa cada campo. Los eventos input y blur actualizan los mensajes y el atributo aria-invalid. Al enviar el formulario, se validan nuevamente todos los campos. Si los datos son correctos, se muestra una confirmación local: el formulario no envía ni almacena nombre, correo o presupuesto.

## 2. Consulta asíncrona de una API REST

La segunda parte utiliza Open-Meteo Geocoding API para buscar ciudades y devolver coincidencias con nombre, región, país, coordenadas y zona horaria.

**Endpoint:** https://geocoding-api.open-meteo.com/v1/search

**Parámetros:** name (texto de búsqueda), count=5, language=es y format=json.

Flujo implementado:

1. El usuario escribe al menos dos caracteres y envía la búsqueda.
2. JavaScript construye la URL con URLSearchParams.
3. La función del evento es asíncrona y espera fetch(url) con await.
4. Comprueba response.ok para detectar respuestas HTTP no exitosas.
5. Convierte la respuesta mediante await response.json().
6. Crea elementos del DOM con document.createElement y textContent; no inserta los valores recibidos como HTML.
7. Muestra resultados, ausencia de coincidencias o un mensaje de error.

Mientras se completa la solicitud, se actualiza el mensaje de estado y se deshabilita el botón. El bloque catch maneja los errores HTTP o de red, y finally restaura el botón.

## 3. Seguridad y alcance

La consulta externa solo transmite el texto de búsqueda de ciudad. Los datos del formulario de práctica permanecen en el navegador y no se guardan. La política CSP de Helmet autoriza solicitudes a https://geocoding-api.open-meteo.com y se incluye una atribución visible a la documentación de Open-Meteo.

La consulta geográfica es informativa y no equivale a una validación de cobertura de envíos de Nexora.

## 4. Cómo comprobar la actividad

1. Abrir la aplicación con npm run dev y entrar a http://localhost:3000/#cotiza-setup.
2. Escribir un nombre de un solo carácter para comprobar el mensaje de error; corregirlo y verificar que desaparezca.
3. Introducir un correo inválido y luego uno válido.
4. Probar un presupuesto inferior al mínimo, superior al máximo y uno dentro del rango.
5. Completar los tres campos correctamente y comprobar la confirmación sin envío de datos.
6. Buscar Bogotá en el módulo geográfico y revisar los resultados.
7. Probar una ciudad inexistente y comprobar el mensaje de ausencia de coincidencias.
8. Desactivar temporalmente la conexión o simular un error HTTP desde las herramientas del navegador para comprobar el mensaje de error.
9. Ejecutar npm run check y npm test.

## 5. Relación con la rúbrica

| Criterio de la guía | Implementación |
|---|---|
| Validación funcional (30%) | Tres campos con validación en eventos de entrada, mensajes claros y comprobación al enviar |
| Consumo de API con async/await (35%) | Petición Fetch a Open-Meteo y renderizado dinámico del resultado JSON |
| Manejo de errores (20%) | Verificación de response.ok, try/catch, estado de carga y respuesta vacía |
| Video en inglés (15%) | Guion independiente en docs/GUION-VIDEO-ACTIVIDAD-6.md |

## Referencias

- [Open-Meteo Geocoding API — documentación oficial](https://open-meteo.com/en/docs/geocoding-api)
- [MDN — Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [MDN — async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
