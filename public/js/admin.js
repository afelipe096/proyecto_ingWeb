(() => {
  'use strict';
  const $ = (selector) => document.querySelector(selector);
  let chart;

  const money = (value) => new Intl.NumberFormat('es-CO', {
    style: 'currency', currency: 'COP', maximumFractionDigits: 0
  }).format(Number(value) || 0);

  const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);

  async function getJson(url) {
    const response = await fetch(url);
    const json = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(json.error || 'No fue posible consultar la API.');
    return json.data;
  }

  function showToast(message) {
    const element = $('#admin-toast');
    element.textContent = message;
    element.classList.add('show');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => element.classList.remove('show'), 2800);
  }

  function renderChart(categories) {
    const canvas = $('#category-chart');
    if (!window.Chart || !canvas) {
      $('#chart-message').hidden = false;
      $('#chart-message').textContent = 'Chart.js no se pudo cargar. Comprueba tu conexión a internet.';
      return;
    }
    if (chart) chart.destroy();
    chart = new window.Chart(canvas, {
      type: 'bar',
      data: {
        labels: categories.map((item) => item.name),
        datasets: [{
          label: 'Productos',
          data: categories.map((item) => Number(item.product_count) || 0),
          backgroundColor: categories.map((_item, index) => index % 2 ? 'rgba(142,220,246,.75)' : 'rgba(183,243,107,.8)'),
          borderRadius: 5,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: '#9299aa', maxRotation: 35, minRotation: 0, font: { size: 9 } }, grid: { display: false } },
          y: { beginAtZero: true, ticks: { color: '#9299aa', precision: 0, font: { size: 9 } }, grid: { color: 'rgba(255,255,255,.07)' } }
        }
      }
    });
  }

  function renderProducts(products) {
    $('#product-count').textContent = products.length + ' referencias';
    const table = $('#product-table');
    if (!products.length) {
      table.innerHTML = '<tr><td colspan="5" class="muted-message">No hay productos activos.</td></tr>';
      return;
    }
    table.innerHTML = products.map((product) => {
      const stock = Number(product.stock) || 0;
      const digital = product.product_type === 'digital';
      return '<tr>' +
        '<td><strong>' + escapeHtml(product.name) + '</strong></td>' +
        '<td>' + escapeHtml(product.category_name || '—') + '</td>' +
        '<td><span class="type-pill ' + (digital ? 'digital' : 'physical') + '">' + (digital ? 'Digital' : 'Físico') + '</span></td>' +
        '<td>' + money(product.price) + '</td>' +
        '<td><span class="stock ' + (stock < 5 && !digital ? 'low' : '') + '">' + stock + '</span></td>' +
        '</tr>';
    }).join('');
  }

  async function refresh() {
    $('#refresh').disabled = true;
    $('#refresh').textContent = '↻ Actualizando...';
    try {
      const results = await Promise.all([
        getJson('/api/admin/summary'),
        getJson('/api/categories'),
        getJson('/api/products')
      ]);
      const summary = results[0];
      const categories = results[1];
      const products = results[2];
      $('#stat-products').textContent = summary.totalProducts;
      $('#stat-categories').textContent = summary.totalCategories;
      $('#stat-orders').textContent = summary.totalOrders;
      $('#stat-stock').textContent = summary.unitsInStock;
      $('#stat-sales').textContent = money(summary.paidSales);
      $('#chart-message').hidden = true;
      renderChart(categories);
      renderProducts(products);
    } catch (error) {
      showToast(error.message + ' Comprueba que MySQL esté configurado.');
      $('#product-table').innerHTML = '<tr><td colspan="5" class="muted-message">No hay conexión con los datos de la API. Ejecuta el servidor y configura MySQL.</td></tr>';
      $('#chart-message').hidden = false;
      $('#chart-message').textContent = 'No se pudieron cargar los indicadores.';
    } finally {
      $('#refresh').disabled = false;
      $('#refresh').textContent = '↻ Actualizar datos';
    }
  }

  $('#refresh').addEventListener('click', refresh);
  refresh();
})();
