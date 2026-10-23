# Activity 6 — Video script (English)

**Target duration:** 2 to 2 minutes 30 seconds  
**Topic:** DOM manipulation, real-time form validation, Fetch API, async/await and error handling.

## Script

Hello, this is Nexora Gaming and Tech. In this section, I will demonstrate the JavaScript concepts required for Activity 6: DOM manipulation, real-time form validation, and asynchronous requests.

First, the setup form has three required fields: a name, an email address, and a numeric budget. In the file public/js/actividad6.js, I select the fields with querySelectorAll and listen for the input and blur events. When the user types, JavaScript validates the value and updates the related error message in the DOM. The email field uses the browser's email validity check, and the budget must stay within the defined range. When the form is submitted, all fields are checked again. Valid data only displays a local confirmation; the form does not send or store personal information.

Second, the location search demonstrates Fetch API. The user enters a city, such as Bogotá, and submits the search. The code creates the request URL with URLSearchParams and calls an asynchronous function. The await fetch expression waits for the HTTP response. I check response.ok because a failed HTTP status does not automatically throw an error. Then, await response.json reads the JSON data.

The results are rendered dynamically with createElement and textContent, without reloading the page. While the request is running, the interface shows a loading message. If no locations match, it displays an empty-results message. The try/catch block handles network or HTTP errors, and finally restores the search button.

This section is separate from the store's catalog and cart, so the existing features remain independent. Thank you.
