(() => {
  'use strict';

  const state = { products: [], categories: [], cart: loadCart(), query: '', category: '', sort: 'featured' };
  const $ = (selector) => document.querySelector(selector);
  const money = (value) => new Intl.NumberFormat('es-CO', {
    style: 'currency', currency: 'COP', maximumFractionDigits: 0
  }).format(Number(value) || 0);

  function loadCart() {
    try {
      const saved = JSON.parse(localStorage.getItem('nexora-cart') || '[]');
      return Array.isArray(saved) ? saved.filter((item) =>
        Number.isInteger(item.productId) && Number.isInteger(item.quantity) &&
        item.productId > 0 && item.quantity > 0 && item.quantity <= 20
      ) : [];
    } catch {
      return [];
    }
  }

  function persistCart() {
    localStorage.setItem('nexora-cart', JSON.stringify(state.cart));
  }

  function toast(message) {
    const element = $('#toast');
    element.textContent = message;
    element.classList.add('show');
    clearTimeout(toast.timeout);
    toast.timeout = setTimeout(() => element.classList.remove('show'), 2600);
  }

  async function api(path, options = {}) {
    const response = await fetch(path, {
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      ...options
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(body.error || 'No se pudo completar la solicitud.');
    return body;
  }

  function fallbackCatalog() {
    const cats = [
      ['Juegos digitales', 'juegos-digitales'],
      ['Consolas y accesorios', 'consolas-accesorios'],
      ['Audio y streaming', 'audio-streaming'],
      ['Monitores y pantallas', 'monitores-pantallas'],
      ['Computadores y componentes', 'computadores-componentes'],
      ['Sillas y escritorios', 'sillas-escritorios'],
      ['Periféricos', 'perifericos'],
      ['Cables y energía', 'cables-energia'],
      ['Almacenamiento y redes', 'almacenamiento-redes'],
      ['Tarjetas de regalo', 'tarjetas-regalo']
    ];
    const assets = [
      ['Tarjeta digital de entretenimiento','tarjeta-digital-entretenimiento', 'Juegos digitales', 'juegos-digitales', 89900, 'digital', 'Código digital de demostración. No se entrega un código real.', 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&w=900&q=80', 25, true],
      ['Control inalámbrico gamer','control-inalambrico-gamer','Consolas y accesorios','consolas-accesorios',259900,'physical','Control de demostración para consola y PC.','https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=900&q=80',14,true],
      ['Audífonos gamer con micrófono','audifonos-gamer-microfono','Audio y streaming','audio-streaming',189900,'physical','Audífonos de demostración con micrófono.','https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=900&q=80',18,true],
      ['Monitor gaming 27 pulgadas','monitor-gaming-27','Monitores y pantallas','monitores-pantallas',899900,'physical','Monitor de muestra para el catálogo académico.','https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=80',7,true],
      ['Computador gaming de escritorio','computador-gaming-escritorio','Computadores y componentes','computadores-componentes',3499900,'physical','Equipo ilustrativo para una tienda gaming.','https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=900&q=80',4,true],
      ['Silla ergonómica gamer','silla-ergonomica-gamer','Sillas y escritorios','sillas-escritorios',799900,'physical','Silla de demostración para espacios de juego y estudio.','https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=900&q=80',6,true],
      ['Teclado mecánico RGB','teclado-mecanico-rgb','Periféricos','perifericos',229900,'physical','Teclado de prueba con iluminación RGB.','https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80',12,false],
      ['Hub USB-C multipuerto','hub-usbc-multipuerto','Cables y energía','cables-energia',119900,'physical','Accesorio de conectividad de demostración.','https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=900&q=80',20,false],
      ['SSD externo 1 TB','ssd-externo-1tb','Almacenamiento y redes','almacenamiento-redes',329900,'physical','Almacenamiento externo de ejemplo.','https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=900&q=80',10,false],
      ['Tarjeta de regalo digital','tarjeta-regalo-digital','Tarjetas de regalo','tarjetas-regalo',50000,'digital','Producto digital de demostración, sin saldo real.','https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80',30,false]
    ];
    return {
      categories: cats.map(([name, slug]) => ({ name, slug })),
      products: assets.map((p, index) => ({
        id: index + 1, name: p[0], slug: p[1], category_name: p[2], category_slug: p[3],
        price: p[4], product_type: p[5], description: p[6], image_url: p[7],
        stock: p[8], is_featured: p[9]
      }))
    };
  }

  async function loadCatalog() {
    try {
      const [productResponse, categoryResponse] = await Promise.all([
        api('/api/products'), api('/api/categories')
      ]);
      state.products = productResponse.data;
      state.categories = categoryResponse.data;
    } catch (error) {
      console.warn('No fue posible acceder a la API; se muestra catálogo local de demostración.', error.message);
      const fallback = fallbackCatalog();
      state.products = fallback.products;
      state.categories = fallback.categories;
      toast('Catálogo de demostración cargado. Conecta la base de datos para pedidos persistentes.');
    }
    renderCategories();
    renderFilters();
    renderProducts();
    renderCart();
  }

  function renderCategories() {
    const grid = $('#category-grid');
    const symbols = ['▣','▥','♫','▦','⌘','▤','⌨','⌁','◫','◇'];
    grid.innerHTML = state.categories.slice(0, 4).map((category, index) => `
      <button class="category-tile ${['category-games','category-setup','category-audio','category-hardware'][index % 4]}" data-category="${escapeHtml(category.slug)}">
        <span class="category-art">${symbols[index % symbols.length]}</span>
        <span><small>0${index + 1} / CATEGORÍA</small><strong>${escapeHtml(category.name)}</strong></span>
        <span class="category-arrow">↗</span>
      </button>`).join('');
    grid.querySelectorAll('[data-category]').forEach((button) => {
      button.addEventListener('click', () => {
        state.category = button.dataset.category;
        $('#category-filter').value = state.category;
        $('#catalogo').scrollIntoView({ behavior: 'smooth' });
        renderProducts();
      });
    });
  }

  function renderFilters() {
    const select = $('#category-filter');
    select.innerHTML = '<option value="">Todas las categorías</option>' +
      state.categories.map((category) =>
        `<option value="${escapeHtml(category.slug)}">${escapeHtml(category.name)}</option>`
      ).join('');
    select.value = state.category;
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, (character) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[character]);
  }

  function getVisibleProducts() {
    const query = state.query.trim().toLocaleLowerCase('es');
    let visible = state.products.filter((product) => {
      const matchQuery = !query || [product.name, product.description, product.category_name]
        .some((field) => String(field || '').toLocaleLowerCase('es').includes(query));
      const matchCategory = !state.category || product.category_slug === state.category;
      return matchQuery && matchCategory;
    });
    if (state.sort === 'price-asc') visible.sort((a, b) => Number(a.price) - Number(b.price));
    else if (state.sort === 'price-desc') visible.sort((a, b) => Number(b.price) - Number(a.price));
    else if (state.sort === 'name') visible.sort((a, b) => a.name.localeCompare(b.name, 'es'));
    else visible.sort((a, b) => Number(b.is_featured) - Number(a.is_featured));
    return visible;
  }

  function renderProducts() {
    const products = getVisibleProducts();
    $('#catalog-count').textContent = `${products.length} ${products.length === 1 ? 'producto' : 'productos'} disponibles`;
    if (!products.length) {
      $('#product-grid').innerHTML = '<div class="no-results">No encontramos productos con esos filtros. Prueba otra búsqueda.</div>';
      return;
    }
    $('#product-grid').innerHTML = products.map((product, index) => `
      <article class="product-card">
        <div class="product-image-wrap">
          <img src="${escapeHtml(product.image_url || '')}" alt="${escapeHtml(product.name)}" loading="lazy" onerror="this.style.opacity='.2';this.alt='Imagen no disponible'">
          ${product.product_type === 'digital' ? '<span class="product-badge digital">DIGITAL</span>' : (product.is_featured ? '<span class="product-badge">DESTACADO</span>' : '')}
          <span class="product-image-index">NX / ${String(index + 1).padStart(2, '0')}</span>
        </div>
        <div class="product-info">
          <div class="product-category">${escapeHtml(product.category_name || 'Tecnología')}</div>
          <h3>${escapeHtml(product.name)}</h3>
          <div class="product-description">${escapeHtml(product.description || 'Producto del catálogo de demostración.')}</div>
          <div class="product-meta"><strong class="product-price">${money(product.price)}</strong><span class="stock-label">${product.product_type === 'digital' ? 'Entrega digital demo' : `${Number(product.stock) || 0} en stock demo`}</span></div>
          <div class="product-actions"><button class="add-cart" data-add="${Number(product.id)}">+ Agregar al carrito</button><button class="product-detail" data-detail="${Number(product.id)}" aria-label="Ver información de ${escapeHtml(product.name)}">↗</button></div>
        </div>
      </article>`).join('');
    $('#product-grid').querySelectorAll('[data-add]').forEach((button) =>
      button.addEventListener('click', () => addToCart(Number(button.dataset.add))));
    $('#product-grid').querySelectorAll('[data-detail]').forEach((button) =>
      button.addEventListener('click', () => {
        const product = state.products.find((item) => item.id === Number(button.dataset.detail));
        if (product) toast(`${product.name} · ${money(product.price)} · Producto de demostración`);
      }));
  }

  function getCartDetails() {
    return state.cart.map((item) => {
      const product = state.products.find((entry) => entry.id === item.productId);
      return product ? { ...item, product, lineTotal: Number(product.price) * item.quantity } : null;
    }).filter(Boolean);
  }

  function addToCart(productId) {
    const product = state.products.find((entry) => entry.id === productId);
    if (!product) return toast('No encontramos ese producto.');
    const existing = state.cart.find((item) => item.productId === productId);
    const quantity = (existing?.quantity || 0) + 1;
    if (quantity > 20) return toast('Máximo 20 unidades por referencia en este prototipo.');
    if (product.product_type !== 'digital' && quantity > Number(product.stock)) {
      return toast('No hay suficientes unidades de demostración.');
    }
    if (existing) existing.quantity = quantity;
    else state.cart.push({ productId, quantity: 1 });
    persistCart();
    renderCart();
    toast(`${product.name} agregado al carrito`);
  }

  function changeQuantity(productId, delta) {
    const item = state.cart.find((entry) => entry.productId === productId);
    const product = state.products.find((entry) => entry.id === productId);
    if (!item || !product) return;
    const next = item.quantity + delta;
    if (next <= 0) state.cart = state.cart.filter((entry) => entry.productId !== productId);
    else if (next > 20 || (product.product_type !== 'digital' && next > Number(product.stock))) {
      toast('Cantidad superior a las existencias de demostración.');
      return;
    } else item.quantity = next;
    persistCart();
    renderCart();
  }

  function renderCart() {
    const count = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    $('#cart-count').textContent = count;
    $('#drawer-count').textContent = `(${count})`;
    const details = getCartDetails();
    const total = details.reduce((sum, item) => sum + item.lineTotal, 0);
    $('#cart-total').textContent = money(total);
    $('#checkout-total').textContent = money(total);
    $('#checkout-button').disabled = details.length === 0;
    if (!details.length) {
      $('#cart-items').innerHTML = '<div class="empty-cart"><span>⌑</span><h3>Tu carrito está en pausa</h3><p>Agrega productos para empezar a armar tu setup.</p></div>';
      return;
    }
    $('#cart-items').innerHTML = details.map(({ product, quantity, lineTotal }) => `
      <div class="cart-item">
        <img src="${escapeHtml(product.image_url || '')}" alt="" onerror="this.style.opacity='.2'">
        <div><h4>${escapeHtml(product.name)}</h4><small>${money(product.price)} c/u</small>
          <div class="quantity-control"><button data-quantity="${product.id}" data-delta="-1" aria-label="Restar una unidad">−</button><span>${quantity}</span><button data-quantity="${product.id}" data-delta="1" aria-label="Sumar una unidad">+</button></div>
        </div>
        <div class="cart-item-price">${money(lineTotal)}<button class="remove-item" data-remove="${product.id}">Eliminar</button></div>
      </div>`).join('');
    $('#cart-items').querySelectorAll('[data-quantity]').forEach((button) =>
      button.addEventListener('click', () => changeQuantity(Number(button.dataset.quantity), Number(button.dataset.delta))));
    $('#cart-items').querySelectorAll('[data-remove]').forEach((button) =>
      button.addEventListener('click', () => {
        state.cart = state.cart.filter((item) => item.productId !== Number(button.dataset.remove));
        persistCart();
        renderCart();
      }));
  }

  function openCart() {
    $('#cart-drawer').classList.add('open');
    $('#cart-drawer').setAttribute('aria-hidden', 'false');
    $('#cart-backdrop').classList.add('show');
    document.body.classList.add('drawer-open');
    $('#close-cart').focus();
  }
  function closeCart() {
    $('#cart-drawer').classList.remove('open');
    $('#cart-drawer').setAttribute('aria-hidden', 'true');
    $('#cart-backdrop').classList.remove('show');
    document.body.classList.remove('drawer-open');
  }

  async function submitOrder(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const details = getCartDetails();
    if (!details.length) return toast('Tu carrito está vacío.');
    const formData = new FormData(form);
    const payload = {
      fullName: String(formData.get('fullName') || ''),
      email: String(formData.get('email') || ''),
      phone: String(formData.get('phone') || ''),
      notes: String(formData.get('notes') || ''),
      items: details.map(({ product, quantity }) => ({ productId: product.id, quantity }))
    };
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    button.textContent = 'Registrando pedido...';
    try {
      const response = await api('/api/orders', { method: 'POST', body: JSON.stringify(payload) });
      state.cart = [];
      persistCart();
      renderCart();
      form.reset();
      $('#checkout-dialog').close();
      closeCart();
      toast(`Pedido ${response.data.orderNumber} creado. No se realizó ningún cobro.`);
      await loadCatalog();
    } catch (error) {
      toast(`No se pudo registrar el pedido: ${error.message}. Comprueba que el servidor y MySQL estén activos.`);
    } finally {
      button.disabled = false;
      button.textContent = 'Crear pedido de demostración';
    }
  }

  function bindEvents() {
    $('#search-input').addEventListener('input', (event) => {
      state.query = event.target.value;
      renderProducts();
    });
    $('#category-filter').addEventListener('change', (event) => {
      state.category = event.target.value;
      renderProducts();
    });
    $('#sort-filter').addEventListener('change', (event) => {
      state.sort = event.target.value;
      renderProducts();
    });
    $('#show-all').addEventListener('click', () => {
      state.category = '';
      state.query = '';
      $('#category-filter').value = '';
      $('#search-input').value = '';
      renderProducts();
    });
    $('#search-focus').addEventListener('click', () => {
      $('#catalogo').scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => $('#search-input').focus(), 350);
    });
    $('#open-cart').addEventListener('click', openCart);
    $('#close-cart').addEventListener('click', closeCart);
    $('#cart-backdrop').addEventListener('click', closeCart);
    $('#checkout-button').addEventListener('click', () => {
      closeCart();
      $('#checkout-dialog').showModal();
    });
    $('#close-checkout').addEventListener('click', () => $('#checkout-dialog').close());
    $('#checkout-form').addEventListener('submit', submitOrder);
    $('#newsletter-form').addEventListener('submit', (event) => {
      event.preventDefault();
      event.currentTarget.reset();
      toast('Esta suscripción es solo una demostración; no se enviaron correos.');
    });
    $('#menu-toggle').addEventListener('click', () => {
      const expanded = $('#menu-toggle').getAttribute('aria-expanded') === 'true';
      $('#menu-toggle').setAttribute('aria-expanded', String(!expanded));
      $('#main-nav').classList.toggle('open', !expanded);
    });
    $('#main-nav').querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      $('#main-nav').classList.remove('open');
      $('#menu-toggle').setAttribute('aria-expanded', 'false');
    }));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeCart();
    });
  }

  bindEvents();
  loadCatalog();
})();
