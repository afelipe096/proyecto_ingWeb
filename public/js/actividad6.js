(() => {
  'use strict';

  const setupForm = document.querySelector('#setup-quote-form');
  const locationForm = document.querySelector('#location-search-form');

  if (setupForm) {
    const fields = Array.from(setupForm.querySelectorAll('[data-validate]'));
    const status = document.querySelector('#setup-form-status');

    function validateField(field) {
      const value = field.value.trim();
      let message = '';

      if (field.id === 'setup-name') {
        if (!value) message = 'Escribe tu nombre.';
        else if (value.length < 3) message = 'El nombre debe tener al menos 3 caracteres.';
      }

      if (field.id === 'setup-email') {
        if (!value) message = 'Escribe tu correo electrónico.';
        else if (field.validity.typeMismatch) message = 'Ingresa un correo con formato válido.';
      }

      if (field.id === 'setup-budget') {
        const amount = Number(value);
        if (!value) message = 'Ingresa un presupuesto.';
        else if (!Number.isFinite(amount)) message = 'El presupuesto debe ser numérico.';
        else if (amount < Number(field.min)) message = 'El presupuesto mínimo es $50.000 COP.';
        else if (amount > Number(field.max)) message = 'El presupuesto máximo es $10.000.000 COP.';
        else if (field.validity.stepMismatch) message = 'Usa incrementos de $50.000 COP.';
      }

      field.setAttribute('aria-invalid', String(Boolean(message)));
      field.classList.toggle('field-invalid', Boolean(message));
      const error = document.querySelector('#' + field.id + '-error');
      if (error) error.textContent = message;
      return message === '';
    }

    fields.forEach((field) => {
      field.addEventListener('input', () => {
        validateField(field);
        status.textContent = '';
        status.className = 'status-message';
      });
      field.addEventListener('blur', () => validateField(field));
    });

    setupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const valid = fields.map(validateField).every(Boolean);
      if (!valid) {
        status.textContent = 'Revisa los campos marcados para continuar.';
        status.className = 'status-message is-error';
        const firstInvalid = fields.find((field) => field.getAttribute('aria-invalid') === 'true');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      status.textContent = 'Validación correcta. Esta demostración no envía ni guarda tus datos.';
      status.className = 'status-message is-success';
    });

    setupForm.addEventListener('reset', () => {
      window.setTimeout(() => {
        fields.forEach((field) => {
          field.setAttribute('aria-invalid', 'false');
          field.classList.remove('field-invalid');
          const error = document.querySelector('#' + field.id + '-error');
          if (error) error.textContent = '';
        });
        status.textContent = '';
        status.className = 'status-message';
      }, 0);
    });

    fields.forEach((field) => field.setAttribute('aria-invalid', 'false'));
  }

  if (locationForm) {
    const queryInput = document.querySelector('#location-query');
    const searchButton = document.querySelector('#location-search-button');
    const status = document.querySelector('#location-status');
    const resultsContainer = document.querySelector('#location-results');
    let latestRequest = 0;

    function setLocationStatus(message, state) {
      status.textContent = message;
      status.className = 'status-message' + (state ? ' is-' + state : '');
    }

    function createDetail(label, value) {
      const item = document.createElement('p');
      item.className = 'location-detail';
      const title = document.createElement('span');
      title.textContent = label;
      const content = document.createElement('strong');
      content.textContent = value;
      item.append(title, content);
      return item;
    }

    function renderLocations(locations) {
      resultsContainer.replaceChildren();
      locations.forEach((location) => {
        const card = document.createElement('article');
        card.className = 'location-card';
        const heading = document.createElement('h4');
        heading.textContent = location.name || 'Ubicación sin nombre';
        const subtitle = document.createElement('p');
        const regionParts = [location.admin1, location.country].filter(Boolean);
        subtitle.textContent = regionParts.join(', ') || 'Región no disponible';
        card.append(heading, subtitle);

        const latitude = Number(location.latitude);
        const longitude = Number(location.longitude);
        if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
          card.append(createDetail('Coordenadas', latitude.toFixed(3) + ', ' + longitude.toFixed(3)));
        }
        if (location.timezone) card.append(createDetail('Zona horaria', location.timezone));
        resultsContainer.append(card);
      });
    }

    locationForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const query = queryInput.value.trim();
      resultsContainer.replaceChildren();

      if (query.length < 2) {
        setLocationStatus('Escribe al menos dos caracteres para buscar una ciudad.', 'error');
        queryInput.focus();
        return;
      }

      const requestNumber = ++latestRequest;
      const originalLabel = searchButton.textContent;
      searchButton.disabled = true;
      searchButton.textContent = 'Buscando...';
      setLocationStatus('Consultando la API pública...', 'loading');

      try {
        const parameters = new URLSearchParams({
          name: query,
          count: '5',
          language: 'es',
          format: 'json'
        });
        const url = 'https://geocoding-api.open-meteo.com/v1/search?' + parameters.toString();
        const response = await fetch(url, { headers: { Accept: 'application/json' } });

        if (!response.ok) {
          throw new Error('La API respondió con el estado HTTP ' + response.status + '.');
        }

        const payload = await response.json();
        if (requestNumber !== latestRequest) return;

        if (!Array.isArray(payload.results) || payload.results.length === 0) {
          setLocationStatus('No encontramos resultados. Prueba con otra ciudad o agrega el país.', 'empty');
          return;
        }

        renderLocations(payload.results);
        setLocationStatus('Consulta completada: ' + payload.results.length + ' resultado(s).', 'success');
      } catch (error) {
        if (requestNumber === latestRequest) {
          console.error('Error al consultar Open-Meteo Geocoding API:', error);
          setLocationStatus('No fue posible consultar las ubicaciones. Verifica tu conexión e inténtalo de nuevo.', 'error');
        }
      } finally {
        if (requestNumber === latestRequest) {
          searchButton.disabled = false;
          searchButton.textContent = originalLabel;
        }
      }
    });
  }
})();