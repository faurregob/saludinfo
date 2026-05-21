// ═══════════════════════════════════════════════════════
//  V I E W  — Renderizado del DOM
//  SaludInfo Colombia · Arquitectura MVC
// ═══════════════════════════════════════════════════════

const View = {

  /**
   * Renderiza las tarjetas de EPS en el grid
   * @param {Array} epsArr - Array de objetos EPS
   */
  renderEPS(epsArr) {
    const grid = document.getElementById('eps-grid');
    if (!epsArr.length) {
      grid.innerHTML = '<p class="text-muted p-4">No se encontraron resultados.</p>';
      return;
    }
    grid.innerHTML = epsArr.map(e => `
      <div class="col">
        <div class="eps-card fade-up" onclick="Controller.openEPSModal(${e.id})" role="button" tabindex="0" aria-label="Ver detalles de ${e.nombre}">
          <div class="d-flex align-items-center gap-3 mb-3">
            <div class="eps-logo" style="background:${e.color}">${e.abbr}</div>
            <div>
              <h3 class="mb-0">${e.nombre}</h3>
              <span class="eps-type">${e.tipo}</span>
            </div>
          </div>
          <div class="eps-info">
            <p class="mb-2">${e.descripcion}</p>
            <p class="mb-1"><strong>📞 Línea:</strong> ${e.linea}</p>
            <p class="mb-0"><strong>📍 Cobertura:</strong> ${e.sedes}</p>
          </div>
          <div class="d-flex flex-wrap gap-1 mt-3">
            ${e.servicios.slice(0, 3).map(s => `<span class="tag">${s}</span>`).join('')}
            <span class="tag info-tag">Ver más →</span>
          </div>
        </div>
      </div>
    `).join('');
  },

  /**
   * Renderiza las tarjetas de IPS en el grid
   * @param {Array} ipsArr - Array de objetos IPS
   */
  renderIPS(ipsArr) {
    const grid = document.getElementById('ips-grid');
    const colorMap = {
      primaria:     '#1a8c6e',
      especializada: '#0a4f6e',
      urgencias:    '#c0392b'
    };
    grid.innerHTML = ipsArr.map(i => `
      <div class="col">
        <div class="ips-card fade-up">
          <div class="ips-card-type" style="color:${colorMap[i.tipo]}">${i.tipo.toUpperCase()}</div>
          <h3>${i.nombre}</h3>
          <p class="mb-2">${i.descripcion}</p>
          <p class="mb-0" style="font-size:0.8rem;color:var(--col-muted);">
            <strong>EPS que la cubren:</strong> ${i.eps.join(', ')}
          </p>
        </div>
      </div>
    `).join('');
  },

  /**
   * Renderiza el listado de sedes y puebla el select de EPS si se indica
   * @param {Array} sedesArr  - Array de sedes a mostrar
   * @param {Array|null} epsOpts - Opciones de EPS para el select (solo en init)
   */
  renderSedes(sedesArr, epsOpts) {
    if (epsOpts) {
      const sel = document.getElementById('sedes-eps');
      // Limpiar opciones previas (excepto la default)
      while (sel.options.length > 1) sel.remove(1);
      epsOpts.forEach(e => {
        const op = document.createElement('option');
        op.value = e;
        op.textContent = e;
        sel.appendChild(op);
      });
    }

    const list = document.getElementById('sedes-list');
    if (!sedesArr.length) {
      list.innerHTML = '<p class="text-muted">No se encontraron sedes con los filtros seleccionados.</p>';
      return;
    }

    list.innerHTML = sedesArr.map(s => `
      <div class="col">
        <div class="sede-card fade-up">
          <div class="d-flex align-items-start justify-content-between gap-2 mb-2">
            <h3>${s.nombre}</h3>
            <span class="${s.abierto ? 'badge-open' : 'badge-closed'}">${s.abierto ? '✓ Abierto' : '✗ Cerrado'}</span>
          </div>
          <div class="sede-row">
            <svg width="14" height="14" fill="none" stroke="var(--col-secondary)" stroke-width="2" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>
            </svg>
            ${s.ciudad} — ${s.direccion}
          </div>
          <div class="sede-row">
            <svg width="14" height="14" fill="none" stroke="var(--col-secondary)" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
            </svg>
            ${s.horario}
          </div>
          <div class="sede-row">
            <svg width="14" height="14" fill="none" stroke="var(--col-secondary)" stroke-width="2" viewBox="0 0 24 24">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 012 1.18 2 2 0 014 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/>
            </svg>
            ${s.telefono}
          </div>
          <div class="d-flex flex-wrap gap-1 mt-2">
            ${s.servicios.map(sv => `<span class="tag">${sv}</span>`).join('')}
          </div>
          <div style="font-size:0.8rem;color:var(--col-muted);margin-top:0.4rem;"><strong>EPS:</strong> ${s.eps}</div>
          <div class="sede-acciones">
            <button class="btn-sede-mapa" onclick="MapaController.verUbicacion(${s.id})">
              📍 Ver ubicación
            </button>
          </div>
        </div>
      </div>
    `).join('');
  },

  /**
   * Renderiza pasos y canales para agendar citas
   * @param {Array} pasos   - Pasos numerados
   * @param {Array} canales - Canales disponibles
   */
  renderCitas(pasos, canales) {
    document.getElementById('citas-steps').innerHTML = pasos.map(p => `
      <div class="step-item fade-up">
        <div class="step-num">${p.num}</div>
        <div class="step-content">
          <h4>${p.titulo}</h4>
          <p>${p.desc}</p>
        </div>
      </div>
    `).join('');

    document.getElementById('canales-list').innerHTML = canales.map(c => `
      <div class="canal-item">
        <div class="canal-icon">${c.icon}</div>
        <div>
          <h4>${c.nombre}</h4>
          <p>${c.desc}</p>
        </div>
      </div>
    `).join('');
  },

  /**
   * Renderiza las preguntas frecuentes con acordeón
   * @param {Array} faqArr - Array de preguntas y respuestas
   */
  renderFAQ(faqArr) {
    document.getElementById('faq-list').innerHTML = faqArr.map((f, i) => `
      <div class="faq-item" id="faq-${i}">
        <div class="faq-question" onclick="Controller.toggleFAQ(${i})" role="button" tabindex="0" aria-expanded="false">
          <span>${f.pregunta}</span>
          <span class="arrow" aria-hidden="true">▼</span>
        </div>
        <div class="faq-answer">${f.respuesta}</div>
      </div>
    `).join('');
  },

  /**
   * Muestra el modal con contenido dinámico
   * @param {string} title    - Título del modal
   * @param {string} bodyHTML - HTML del cuerpo del modal
   */
  showModal(title, bodyHTML) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-body').innerHTML = bodyHTML;
    document.getElementById('modal-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  /** Cierra el modal */
  closeModal() {
    document.getElementById('modal-overlay').classList.remove('open');
    document.body.style.overflow = '';
  },

  /**
   * Actualiza el enlace activo en la barra de navegación
   * @param {string} section - ID de la sección activa
   */
  setActiveNav(section) {
    document.querySelectorAll('.nav-link[data-section]').forEach(a => {
      a.classList.toggle('active', a.dataset.section === section);
    });
  }
};
