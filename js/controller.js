// ═══════════════════════════════════════════════════════
//  C O N T R O L L E R  — Lógica e interacciones
//  SaludInfo Colombia · Arquitectura MVC
// ═══════════════════════════════════════════════════════

const Controller = {

  /** Sección activa actualmente */
  currentSection: 'inicio',

  /**
   * Inicializa la aplicación: renderiza todos los datos del modelo
   */
  init() {
    View.renderEPS(Model.eps);
    View.renderIPS(Model.ips);

    const epsNames = [...new Set(Model.sedes.map(s => s.eps))];
    View.renderSedes(Model.sedes, epsNames);

    View.renderCitas(Model.pasosCitas, Model.canales);
    View.renderFAQ(Model.faq);

    // Manejar cierre de modal con tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') View.closeModal();
    });
  },

  /**
   * Navega a la sección indicada
   * @param {string} section - ID de la sección destino
   * @returns {boolean} false para evitar comportamiento por defecto del enlace
   */
  navigate(section) {
    const inicioSection = document.getElementById('inicio-section');

    // Mostrar u ocultar el hero
    inicioSection.style.display = section === 'inicio' ? 'block' : 'none';

    // Activar sección correspondiente
    document.querySelectorAll('.section-content').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(section);
    if (target) target.classList.add('active');

    View.setActiveNav(section);
    this.currentSection = section;

    // Scroll suave al top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Cerrar menú móvil de Bootstrap
    const navCollapse = document.getElementById('navbarNav');
    if (navCollapse && navCollapse.classList.contains('show')) {
      const toggler = document.querySelector('.navbar-toggler');
      if (toggler) toggler.click();
    }

    return false;
  },

  /**
   * Filtra las EPS por texto y tipo de régimen
   * @param {string} [query] - Texto de búsqueda (opcional, lee el input si no se pasa)
   */
  filterEPS(query) {
    const q    = (query !== undefined ? query : document.getElementById('eps-search-input').value).toLowerCase();
    const tipo = document.getElementById('eps-filter-type').value;

    const filtered = Model.eps.filter(e => {
      const matchText = e.nombre.toLowerCase().includes(q) || e.descripcion.toLowerCase().includes(q);
      const matchTipo = !tipo || e.tipo === tipo;
      return matchText && matchTipo;
    });

    View.renderEPS(filtered);
  },

  /**
   * Filtra las IPS por tipo (pestaña)
   * @param {string}      tipo - Tipo de IPS ('all' | 'primaria' | 'especializada' | 'urgencias')
   * @param {HTMLElement} btn  - Botón de pestaña que fue clicado
   */
  filterIPS(tipo, btn) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    const filtered = tipo === 'all' ? Model.ips : Model.ips.filter(i => i.tipo === tipo);
    View.renderIPS(filtered);
  },

  /**
   * Filtra sedes según ciudad y EPS seleccionadas
   */
  filterSedes() {
    const city = document.getElementById('sedes-city').value;
    const eps  = document.getElementById('sedes-eps').value;

    const filtered = Model.sedes.filter(s => {
      return (!city || s.ciudad === city) && (!eps || s.eps === eps);
    });

    View.renderSedes(filtered, null);
  },

  /**
   * Alterna la visibilidad de una pregunta frecuente
   * @param {number} index - Índice del item de FAQ
   */
  toggleFAQ(index) {
    const item = document.getElementById(`faq-${index}`);
    const isOpen = item.classList.contains('open');

    // Cerrar todos los ítems abiertos
    document.querySelectorAll('.faq-item.open').forEach(el => {
      el.classList.remove('open');
      el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });

    // Abrir el ítem seleccionado si estaba cerrado
    if (!isOpen) {
      item.classList.add('open');
      item.querySelector('.faq-question').setAttribute('aria-expanded', 'true');
    }
  },

  /**
   * Abre el modal con los detalles de una EPS
   * @param {number} id - ID de la EPS en el modelo
   */
  openEPSModal(id) {
    const e = Model.eps.find(x => x.id === id);
    if (!e) return;

    // Generar estrellas de calificación
    const estrellas = (cal) => {
      const llenas  = Math.floor(cal);
      const media   = cal % 1 >= 0.5 ? 1 : 0;
      const vacias  = 5 - llenas - media;
      return '★'.repeat(llenas) + (media ? '½' : '') + '☆'.repeat(vacias);
    };

    View.showModal(e.nombre, `
      <div class="eps-modal-header" style="border-left: 4px solid ${e.color}; padding-left: 1rem; margin-bottom: 1.2rem;">
        <div class="d-flex align-items-center gap-3">
          <div class="eps-logo" style="background:${e.color}">${e.abbr}</div>
          <div>
            <div class="eps-type">${e.tipo.toUpperCase()}</div>
            <p class="mb-0" style="font-size:0.88rem; color:var(--col-muted)">${e.descripcion}</p>
          </div>
        </div>
      </div>

      <!-- Calificación -->
      <div class="eps-modal-section">
        <h4 class="eps-modal-titulo">⭐ Calificación de usuarios</h4>
        <div class="eps-calificacion">
          <span class="eps-cal-numero">${e.calificacion}</span>
          <span class="eps-cal-estrellas" style="color:${e.color}">${estrellas(e.calificacion)}</span>
          <span class="eps-cal-max">/ 5.0</span>
        </div>
      </div>

      <!-- Tiempo de espera -->
      <div class="eps-modal-section">
        <h4 class="eps-modal-titulo">⏱️ Tiempo de espera promedio</h4>
        <p class="eps-modal-texto">${e.tiempoEspera}</p>
      </div>

      <!-- Documentos para cita -->
      <div class="eps-modal-section">
        <h4 class="eps-modal-titulo">📋 Documentos necesarios para citas</h4>
        <ul class="eps-modal-lista">
          ${e.documentosCita.map(d => `<li>${d}</li>`).join('')}
        </ul>
      </div>

      <!-- Requisitos de afiliación -->
      <div class="eps-modal-section">
        <h4 class="eps-modal-titulo">📝 Requisitos de afiliación</h4>
        <ul class="eps-modal-lista">
          ${e.requisitosAfiliacion.map(r => `<li>${r}</li>`).join('')}
        </ul>
      </div>

      <!-- Contacto -->
      <div class="eps-modal-section">
        <h4 class="eps-modal-titulo">📞 Línea de atención</h4>
        <p class="eps-modal-texto">${e.linea}</p>
      </div>

      <div class="eps-modal-section">
        <h4 class="eps-modal-titulo">🌐 Portal web</h4>
        <a href="${e.web}" target="_blank" rel="noopener" class="eps-modal-link">${e.web}</a>
      </div>

      <div class="eps-modal-section">
        <h4 class="eps-modal-titulo">📱 Aplicación móvil</h4>
        <p class="eps-modal-texto">${e.app}</p>
      </div>

      <div class="eps-modal-section">
        <h4 class="eps-modal-titulo">📍 Cobertura</h4>
        <p class="eps-modal-texto">${e.sedes}</p>
      </div>

      <div class="eps-modal-section">
        <h4 class="eps-modal-titulo">✅ Servicios incluidos</h4>
        <div class="d-flex flex-wrap gap-1">
          ${e.servicios.map(s => `<span class="tag">${s}</span>`).join('')}
        </div>
      </div>

      <div class="eps-modal-section">
        <h4 class="eps-modal-titulo">🔍 ¿Cómo verificar mi afiliación?</h4>
        <p class="eps-modal-texto">${e.verificar}</p>
      </div>
    `);
  },

  /**
   * Cierra el modal si el clic fue en el overlay o se llamó directamente
   * @param {MouseEvent} [event] - Evento de clic (opcional)
   */
  closeModal(event) {
    if (!event || event.target === document.getElementById('modal-overlay')) {
      View.closeModal();
    }
  }
};


// ═══════════════════════════════════════════════════════
//  C I T A  C O N T R O L L E R
//  Maneja el flujo del formulario de agendamiento
// ═══════════════════════════════════════════════════════

const CitaController = {

  // ── Estado interno ──
  pasoActual: 1,
  fechaSeleccionada: null,
  horaSeleccionada: null,
  mesActual: new Date().getMonth(),
  anioActual: new Date().getFullYear(),

  // Horas disponibles simuladas
  HORAS: ['07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
          '10:00', '10:30', '11:00', '14:00', '14:30', '15:00',
          '15:30', '16:00', '16:30', '17:00'],

  // Seed para simular ocupación consistente
  _ocupadoSeed(anio, mes, dia) {
    return ((anio * 31 + mes) * 31 + dia) % 3 === 0;
  },

  // ── Abrir / cerrar modal ──
  abrirModal() {
    // Poblar select de EPS desde el Model (siempre limpio)
    const selEps = document.getElementById('cita-eps');
    selEps.innerHTML = '<option value="">— Selecciona tu EPS —</option>';
    Model.eps.forEach(e => {
      const opt = document.createElement('option');
      opt.value = e.nombre;
      opt.textContent = e.nombre;
      selEps.appendChild(opt);
    });

    // Poblar select de sedes (siempre limpio)
    const selSede = document.getElementById('cita-sede');
    selSede.innerHTML = '<option value="">— Selecciona una sede —</option>';
    Model.sedes.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.nombre;
      opt.textContent = `${s.nombre} — ${s.ciudad}`;
      selSede.appendChild(opt);
    });

    this.irPaso(1);
    this.renderCalendario();
    document.getElementById('cita-modal-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  cerrarModal(event) {
    if (event && event.target !== document.getElementById('cita-modal-overlay')) return;
    if (this._enviando) return; // bloquear si WhatsApp está abriendo
    document.getElementById('cita-modal-overlay').classList.remove('open');
    document.body.style.overflow = '';
    this._resetForm();
  },

  _resetForm() {
    document.getElementById('cita-nombre').value = '';
    document.getElementById('cita-cedula').value = '';
    document.getElementById('cita-eps').value = '';
    document.getElementById('cita-sede').value = '';
    document.getElementById('cita-motivo').value = '';
    document.querySelectorAll('input[name="cita-tipo"]').forEach(r => r.checked = false);
    document.querySelectorAll('.cita-error').forEach(e => e.textContent = '');
    this.fechaSeleccionada = null;
    this.horaSeleccionada = null;
    document.getElementById('cita-horas-wrap').style.display = 'none';
    document.getElementById('cita-confirmacion').classList.add('hidden');
  },

  // ── Navegación entre pasos ──
  irPaso(num) {
    if (num > this.pasoActual && !this._validarPaso(this.pasoActual)) return;

    document.querySelectorAll('.cita-step').forEach(s => s.classList.add('hidden'));
    document.getElementById(`cita-step-${num}`).classList.remove('hidden');
    this.pasoActual = num;

    if (num === 3) this.renderCalendario();
  },

  // ── Validación por paso ──
  _validarPaso(paso) {
    let ok = true;
    const err = id => document.getElementById(id);

    const limpiar = (...ids) => ids.forEach(id => err(id).textContent = '');

    if (paso === 1) {
      limpiar('err-nombre', 'err-cedula', 'err-celular', 'err-eps');
      const nombre  = document.getElementById('cita-nombre').value.trim();
      const cedula  = document.getElementById('cita-cedula').value.trim();
      const celular = document.getElementById('cita-celular').value.trim();
      const eps     = document.getElementById('cita-eps').value;

      if (nombre.length < 3)          { err('err-nombre').textContent  = 'Ingresa tu nombre completo.'; ok = false; }
      if (!/^\d{6,12}$/.test(cedula)) { err('err-cedula').textContent  = 'Cédula inválida (solo números, 6-12 dígitos).'; ok = false; }
      if (!/^\d{10}$/.test(celular))  { err('err-celular').textContent = 'Ingresa un celular válido de 10 dígitos.'; ok = false; }
      if (!eps)                        { err('err-eps').textContent     = 'Selecciona tu EPS.'; ok = false; }
    }

    if (paso === 2) {
      limpiar('err-tipo', 'err-sede', 'err-motivo');
      const tipo   = document.querySelector('input[name="cita-tipo"]:checked');
      const sede   = document.getElementById('cita-sede').value;
      const motivo = document.getElementById('cita-motivo').value.trim();

      if (!tipo)              { err('err-tipo').textContent = 'Selecciona el tipo de consulta.'; ok = false; }
      if (!sede)              { err('err-sede').textContent = 'Selecciona una sede.'; ok = false; }
      if (motivo.length < 5) { err('err-motivo').textContent = 'Describe brevemente el motivo (mínimo 5 caracteres).'; ok = false; }
    }

    return ok;
  },

  // ── Calendario ──
  renderCalendario() {
    const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
                   'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    document.getElementById('cita-cal-titulo').textContent =
      `${meses[this.mesActual]} ${this.anioActual}`;

    const grid    = document.getElementById('cita-cal-grid');
    const hoy     = new Date();
    const primero = new Date(this.anioActual, this.mesActual, 1);
    const ultimo  = new Date(this.anioActual, this.mesActual + 1, 0).getDate();

    let html = '';

    // Espacios vacíos iniciales
    for (let i = 0; i < primero.getDay(); i++) {
      html += '<div class="cita-cal-celda vacio"></div>';
    }

    for (let d = 1; d <= ultimo; d++) {
      const fecha    = new Date(this.anioActual, this.mesActual, d);
      const esDom    = fecha.getDay() === 0;
      const esPasado = fecha < new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
      const esSelec  = this.fechaSeleccionada &&
                       this.fechaSeleccionada.getDate() === d &&
                       this.fechaSeleccionada.getMonth() === this.mesActual &&
                       this.fechaSeleccionada.getFullYear() === this.anioActual;

      let clase = 'cita-cal-celda';
      if (esPasado || esDom)               clase += ' no-disponible';
      else if (esSelec)                    clase += ' seleccionado';
      else if (this._ocupadoSeed(this.anioActual, this.mesActual, d)) clase += ' ocupado';
      else                                 clase += ' disponible';

      const clickable = !esPasado && !esDom;
      html += `<div class="${clase}" ${clickable ? `onclick="CitaController.seleccionarDia(${d})"` : ''}>${d}</div>`;
    }

    grid.innerHTML = html;
  },

  seleccionarDia(dia) {
    const fecha = new Date(this.anioActual, this.mesActual, dia);
    if (this._ocupadoSeed(this.anioActual, this.mesActual, dia)) {
      document.getElementById('err-fecha').textContent = 'Este día no tiene disponibilidad. Elige otra fecha.';
      return;
    }
    document.getElementById('err-fecha').textContent = '';
    this.fechaSeleccionada = fecha;
    this.horaSeleccionada  = null;
    this.renderCalendario();
    this._renderHoras(dia);
  },

  _renderHoras(dia) {
    const wrap  = document.getElementById('cita-horas-wrap');
    const grid  = document.getElementById('cita-horas-grid');

    // Simular algunas horas ocupadas según el día
    const ocupadas = this.HORAS.filter((_, i) => ((dia + i) % 4 === 0));

    grid.innerHTML = this.HORAS.map(h => {
      const estaOcupada = ocupadas.includes(h);
      const esSelec     = this.horaSeleccionada === h;
      const clase       = estaOcupada ? 'hora-chip ocupado' : esSelec ? 'hora-chip seleccionado' : 'hora-chip disponible';
      return `<button class="${clase}" ${estaOcupada ? 'disabled' : `onclick="CitaController.seleccionarHora('${h}')"`}>${h}</button>`;
    }).join('');

    wrap.style.display = 'block';
  },

  seleccionarHora(hora) {
    this.horaSeleccionada = hora;
    if (this.fechaSeleccionada) {
      this._renderHoras(this.fechaSeleccionada.getDate());
    }
  },

  mesAnterior() {
    if (this.mesActual === 0) { this.mesActual = 11; this.anioActual--; }
    else this.mesActual--;
    this.renderCalendario();
  },

  mesSiguiente() {
    if (this.mesActual === 11) { this.mesActual = 0; this.anioActual++; }
    else this.mesActual++;
    this.renderCalendario();
  },

  // ── Confirmar y abrir WhatsApp ──
  confirmarCita() {
  document.getElementById('err-fecha').textContent = '';
  document.getElementById('err-hora').textContent = '';

  if (!this.fechaSeleccionada) {
    document.getElementById('err-fecha').textContent = 'Selecciona una fecha disponible.';
    return;
  }
  if (!this.horaSeleccionada) {
    document.getElementById('err-hora').textContent = 'Selecciona una hora.';
    return;
  }

  const nombre = document.getElementById('cita-nombre').value.trim();
  const cedula = document.getElementById('cita-cedula').value.trim();
  const celular = document.getElementById('cita-celular').value.trim();
  const eps    = document.getElementById('cita-eps').value;
  const tipo   = document.querySelector('input[name="cita-tipo"]:checked').value;
  const sede   = document.getElementById('cita-sede').value;
  const motivo = document.getElementById('cita-motivo').value.trim();

  const fechaStr = this.fechaSeleccionada.toLocaleDateString('es-CO', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  const mensaje =
`🏥 *SOLICITUD DE CITA MÉDICA*
_SaludInfo Colombia_

👤 *Paciente:* ${nombre}
🪪 *Cédula:* ${cedula}
📱 *Celular:* +57${celular}

🏢 *EPS:* ${eps}
🩺 *Consulta:* ${tipo}
📍 *Sede:* ${sede}

📅 *Fecha:* ${fechaStr}
🕐 *Hora:* ${this.horaSeleccionada}
📝 *Motivo:* ${motivo}

_Mensaje generado desde SaludInfo Colombia_ 🌿`;

  
  const url = `https://wa.me/57${celular}?text=${encodeURIComponent(mensaje)}`;

  // 1. Cerrar modal inmediatamente
  document.getElementById('cita-modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
  this._resetForm();

  // 2. Abrir WhatsApp
  setTimeout(() => window.open(url, '_blank'), 200);

  // 3. Mostrar toast
  this._mostrarToast();
},

_mostrarToast() {
  const toast = document.getElementById('toast-notificacion');
  toast.classList.add('visible');
  setTimeout(() => toast.classList.remove('visible'), 15000);
},
};

// ═══════════════════════════════════════════════════════
//  M A P A  C O N T R O L L E R
//  Maneja la integración con Google Maps
// ═══════════════════════════════════════════════════════

const MapaController = {

  verUbicacion(id) {
    const sede = Model.sedes.find(s => s.id === id);
    if (!sede) return;

    const wrap = document.getElementById('mapa-wrap');
    const iframe = document.getElementById('mapa-iframe');

    // Actualizar info bar
    document.getElementById('mapa-info-nombre').textContent = sede.nombre;
    document.getElementById('mapa-info-dir').textContent = `${sede.direccion}, ${sede.ciudad}`;

    // Botón transporte público — Google Maps con modo transit
    const query = encodeURIComponent(`${sede.nombre}, ${sede.direccion}, ${sede.ciudad}, Colombia`);
    // document.getElementById('mapa-btn-transporte').href =
    //   `https://www.google.com/maps/dir/?api=1&destination=${query}&travelmode=transit`;

    // // Botón abrir en Google Maps
    // document.getElementById('mapa-btn-gmaps').href =
    //   `https://www.google.com/maps/search/?api=1&query=${query}`;

    // Cargar iframe con embed de Google Maps
    iframe.src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyAKkKOTOAvPTRf8pFE-v_1UNyFME4WgRks&q=${query}&zoom=16&language=es`;

    // Mostrar el mapa
    wrap.style.display = 'block';

    // Scroll suave hacia el mapa
    setTimeout(() => wrap.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  }
};




// ── Inicializar la app cuando el DOM esté listo ──
document.addEventListener('DOMContentLoaded', () => Controller.init());
