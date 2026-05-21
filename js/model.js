// ═══════════════════════════════════════════════════════
//  M O D E L  — Datos de la aplicación
//  SaludInfo Colombia · Arquitectura MVC
// ═══════════════════════════════════════════════════════

const Model = {

  eps: [
    {
      id: 1, nombre: "EPS Sura", tipo: "Contributivo",
      color: "#003087", abbr: "S",
      descripcion: "Una de las EPS más grandes del país, con amplia red de clínicas propias y alta cobertura nacional.",
      linea: "01 8000 51 8000",
      web: "https://www.sura.com",
      app: "Mi Sura",
      sedes: "Bogotá, Medellín, Cali, Barranquilla y más de 40 ciudades",
      servicios: ["Medicina general", "Especialistas", "Urgencias 24h", "Odontología", "Telemedicina"],
      verificar: "Ingresa a minsalud.gov.co o llama a la línea nacional 01 8000 51 8000",
      calificacion: 4.2,
      tiempoEspera: "15–25 min promedio en consulta general",
      documentosCita: ["Documento de identidad", "Carné de afiliación", "Remisión médica (si aplica)", "Orden médica para laboratorio o imágenes"],
      requisitosAfiliacion: ["Contrato laboral vigente o declaración de ingresos", "Documento de identidad", "Formulario de afiliación diligenciado", "Pago de la primera cotización"]
    },
    {
      id: 2, nombre: "Sanitas EPS", tipo: "Contributivo",
      color: "#c8102e", abbr: "Sa",
      descripcion: "EPS con red propia de clínicas Colsanitas y enfoque en atención integral con altos estándares.",
      linea: "3 07 07 07",
      web: "https://www.keralty.com/es-co",
      app: "App Sanitas",
      sedes: "Bogotá, Medellín, Cali, Bucaramanga, Cúcuta",
      servicios: ["Medicina general", "Especialistas", "Hospitalización", "Cirugía", "Maternidad"],
      verificar: "Visita www.colsanitas.com o llama al 307 07 07 (Bogotá)",
      calificacion: 4.0,
      tiempoEspera: "20–30 min promedio en consulta general",
      documentosCita: ["Cédula de ciudadanía", "Carné Sanitas vigente", "Remisión o autorización previa", "Resultados de exámenes anteriores si aplica"],
      requisitosAfiliacion: ["Vinculación laboral activa", "Documento de identidad original", "Formulario de afiliación Sanitas", "Certificado de ingresos si es independiente"]
    },
    {
      id: 3, nombre: "Nueva EPS", tipo: "Contributivo",
      color: "#0066cc", abbr: "NE",
      descripcion: "EPS de origen público-privado con cobertura en los 32 departamentos del país.",
      linea: "01 8000 910 080",
      web: "https://www.nuevaeps.com.co",
      app: "Mi Nueva EPS",
      sedes: "Cobertura nacional — 32 departamentos",
      servicios: ["Consulta médica", "Hospitalización", "Urgencias", "Laboratorio", "Imágenes diagnósticas"],
      verificar: "Llama gratis al 01 8000 910 080 o consulta en www.nuevaeps.com.co",
      calificacion: 3.5,
      tiempoEspera: "30–45 min promedio en consulta general",
      documentosCita: ["Documento de identidad", "Número de afiliación", "Remisión médica vigente", "Carné de afiliación si lo tiene"],
      requisitosAfiliacion: ["Formulario único de afiliación", "Copia de cédula", "Soporte de pago de aportes", "Certificado laboral o RUT si es independiente"]
    },
    {
      id: 4, nombre: "Compensar EPS", tipo: "Contributivo",
      color: "#e31837", abbr: "C",
      descripcion: "EPS con presencia fuerte en Bogotá y Cundinamarca. Ofrece servicios de salud integrados a su caja de compensación.",
      linea: "307 7020",
      web: "https://compensar.com",
      app: "Mi Compensar",
      sedes: "Bogotá, Cundinamarca, Boyacá",
      servicios: ["Medicina general", "Especialidades", "Urgencias", "Odontología", "Optometría"],
      verificar: "Ingresa a www.compensar.com o llama al 307 7020 en Bogotá",
      calificacion: 4.3,
      tiempoEspera: "10–20 min promedio en consulta general",
      documentosCita: ["Cédula de ciudadanía", "Carné Compensar", "Remisión si va a especialista", "Resultados previos si aplica"],
      requisitosAfiliacion: ["Ser trabajador dependiente o independiente", "Formulario de afiliación Compensar", "Documento de identidad", "Último desprendible de pago o declaración de renta"]
    },
    {
      id: 5, nombre: "Famisanar EPS", tipo: "Contributivo",
      color: "#006738", abbr: "F",
      descripcion: "Resultado de la alianza entre Cafam y Colsubsidio, con fuerte presencia en la región central del país.",
      linea: "01 8000 11 4422",
      web: "https://www.famisanar.com.co",
      app: "Mi Famisanar",
      sedes: "Bogotá y Cundinamarca principalmente",
      servicios: ["Medicina familiar", "Especialistas", "Urgencias", "Cirugía ambulatoria", "Maternidad"],
      verificar: "Consulta en www.famisanar.com.co o llama al 01 8000 11 4422",
      calificacion: 3.8,
      tiempoEspera: "20–35 min promedio en consulta general",
      documentosCita: ["Documento de identidad", "Carné de afiliación Famisanar", "Orden médica o remisión", "Exámenes previos si el médico los solicitó"],
      requisitosAfiliacion: ["Contrato de trabajo o declaración de independiente", "Cédula de ciudadanía", "Formulario de afiliación diligenciado", "Pago de cotización inicial"]
    },
    {
      id: 6, nombre: "Coosalud EPS", tipo: "Subsidiado",
      color: "#ff6b00", abbr: "Co",
      descripcion: "Entidad cooperativa con amplia cobertura en el régimen subsidiado, principalmente en la Costa Caribe.",
      linea: "01 8000 518 388",
      web: "https://www.coosalud.com",
      app: "Coosalud App",
      sedes: "Bolívar, Sucre, Córdoba, Atlántico y otras regiones",
      servicios: ["Consulta médica", "Urgencias", "Hospitalización", "Medicamentos", "Vacunación"],
      verificar: "Llama al 01 8000 518 388 o visita tu alcaldía municipal",
      calificacion: 3.4,
      tiempoEspera: "35–50 min promedio en consulta general",
      documentosCita: ["Documento de identidad", "Carné SISBEN o resolución de afiliación", "Remisión si aplica"],
      requisitosAfiliacion: ["Clasificación SISBEN vigente", "Documento de identidad", "No estar afiliado a régimen contributivo", "Solicitud en alcaldía o secretaría de salud municipal"]
    },
    {
      id: 7, nombre: "Salud Total EPS", tipo: "Ambos",
      color: "#4a90d9", abbr: "ST",
      descripcion: "Opera en régimen contributivo y subsidiado con presencia en varias regiones del país.",
      linea: "01 8000 180 900",
      web: "https://www.saludtotal.com.co",
      app: "Salud Total App",
      sedes: "Bogotá, Llanos, Eje Cafetero, Santanderes",
      servicios: ["Medicina general", "Urgencias", "Hospitalización", "Especialistas", "Salud oral"],
      verificar: "Consulta en www.saludtotal.com.co o llama al 01 8000 180 900",
      calificacion: 3.6,
      tiempoEspera: "25–40 min promedio en consulta general",
      documentosCita: ["Cédula de ciudadanía", "Número de afiliado", "Remisión médica si requiere especialista", "Carné de afiliación vigente"],
      requisitosAfiliacion: ["Formulario de afiliación Salud Total", "Documento de identidad", "Soporte de cotización o clasificación SISBEN", "Certificado laboral si aplica"]
    },
    {
      id: 8, nombre: "Aliansalud EPS", tipo: "Contributivo",
      color: "#7b2d8b", abbr: "A",
      descripcion: "EPS enfocada en la región central, conocida por su servicio personalizado y atención al afiliado.",
      linea: "3 07 06 70",
      web: "https://www.aliansalud.com.co",
      app: "Aliansalud Digital",
      sedes: "Bogotá y principales ciudades",
      servicios: ["Consulta médica", "Especialistas", "Urgencias", "Hospitalización", "Laboratorio"],
      verificar: "Ingresa a www.aliansalud.com.co o llama al 307 06 70 en Bogotá",
      calificacion: 3.9,
      tiempoEspera: "15–25 min promedio en consulta general",
      documentosCita: ["Documento de identidad original", "Carné de afiliación Aliansalud", "Remisión médica vigente si aplica", "Resultados de exámenes previos"],
      requisitosAfiliacion: ["Contrato laboral o declaración de ingresos como independiente", "Cédula de ciudadanía", "Formulario de vinculación Aliansalud", "Pago primer mes de cotización"]
    }
  ],

  ips: [
    { id: 1, nombre: "Centro de Salud de Primer Nivel", tipo: "primaria", descripcion: "Atiende consultas de medicina general, vacunación, control prenatal y urgencias básicas. Es el primer contacto con el sistema de salud.", eps: ["Nueva EPS", "Compensar EPS", "Coosalud EPS"] },
    { id: 2, nombre: "Clínica Universitaria Colombia", tipo: "especializada", descripcion: "Hospital de alta complejidad con especialidades como cardiología, neurocirugía, oncología y trasplantes. Requiere remisión.", eps: ["Sanitas EPS", "EPS Sura"] },
    { id: 3, nombre: "Hospital Universitario San Ignacio", tipo: "especializada", descripcion: "Institución de tercer nivel con enfoque en investigación y docencia. Atiende casos de alta complejidad.", eps: ["Famisanar EPS", "Salud Total EPS"] },
    { id: 4, nombre: "UBA (Unidad Básica de Atención)", tipo: "primaria", descripcion: "Unidad básica donde se realiza triage, atención de urgencias menores, curaciones y programas de salud pública.", eps: ["Compensar EPS", "Famisanar EPS"] },
    { id: 5, nombre: "Servicio de Urgencias 24h", tipo: "urgencias", descripcion: "Disponible las 24 horas. No requiere cita previa. Por ley, toda EPS debe cubrir la atención inicial en urgencias.", eps: ["Todas las EPS"] },
    { id: 6, nombre: "Centro Médico Especializado", tipo: "especializada", descripcion: "Concentra múltiples especialidades médicas en un solo lugar: endocrinología, reumatología, dermatología, psiquiatría.", eps: ["EPS Sura", "Sanitas EPS", "Aliansalud EPS"] },
    { id: 7, nombre: "IPS Odontológica", tipo: "primaria", descripcion: "Centro de atención dental básica y especializada: odontología general, ortodoncia, periodoncia y cirugía oral.", eps: ["Compensar EPS", "EPS Sura", "Famisanar EPS"] },
    { id: 8, nombre: "Clínica de Urgencias y Trauma", tipo: "urgencias", descripcion: "Especializada en atención de emergencias, trauma y cuidado intensivo. Disponible sin cita previa.", eps: ["Nueva EPS", "Salud Total EPS", "EPS Sura"] }
  ],

  sedes: [
  { id: 1, nombre: "Clínica del Country", eps: "EPS Sura", ciudad: "Bogotá", direccion: "Cra. 16 #82-57, Chicó", horario: "24 horas", telefono: "530 0470", abierto: true, servicios: ["Urgencias", "Hospitalización", "Cirugía"], lat: 4.6677, lng: -74.0534 },
  { id: 2, nombre: "Colsanitas Centro Médico Norte", eps: "Sanitas EPS", ciudad: "Bogotá", direccion: "Calle 127 #20-79", horario: "Lun–Sáb 7am–8pm", telefono: "307 0707", abierto: true, servicios: ["Medicina general", "Especialistas", "Laboratorio"], lat: 4.7012, lng: -74.0565 },
  { id: 3, nombre: "Nueva EPS Sede Chapinero", eps: "Nueva EPS", ciudad: "Bogotá", direccion: "Cra. 13 #57-42", horario: "Lun–Vie 7am–5pm", telefono: "01 8000 910 080", abierto: false, servicios: ["Consulta médica", "Autorizaciones"], lat: 4.6414, lng: -74.0631 },
  { id: 4, nombre: "Compensar UBA Floresta", eps: "Compensar EPS", ciudad: "Bogotá", direccion: "Av. Calle 68 #77-29", horario: "Lun–Sáb 6am–10pm", telefono: "307 7020", abierto: true, servicios: ["Urgencias", "Medicina general", "Odontología"], lat: 4.6697, lng: -74.0891 },
  { id: 5, nombre: "Famisanar Kennedy", eps: "Famisanar EPS", ciudad: "Bogotá", direccion: "Calle 38 Sur #72C-20", horario: "Lun–Vie 7am–7pm", telefono: "01 8000 114 422", abierto: true, servicios: ["Medicina general", "Ginecología", "Pediatría"], lat: 4.6267, lng: -74.1502 },
  { id: 6, nombre: "Sura Clínica Las Vegas", eps: "EPS Sura", ciudad: "Medellín", direccion: "Calle 2 Sur #46-55, El Poblado", horario: "24 horas", telefono: "01 8000 51 8000", abierto: true, servicios: ["Urgencias", "Especialistas", "UCI"], lat: 6.2006, lng: -75.5732 },
  { id: 7, nombre: "Nueva EPS Cali Norte", eps: "Nueva EPS", ciudad: "Cali", direccion: "Av. 6N #24N-35", horario: "Lun–Vie 7am–6pm", telefono: "01 8000 910 080", abierto: false, servicios: ["Consulta", "Autorizaciones", "Laboratorio"], lat: 3.4516, lng: -76.5320 },
  { id: 8, nombre: "Coosalud Cartagena Centro", eps: "Coosalud EPS", ciudad: "Barranquilla", direccion: "Cra. 44 #30-50", horario: "Lun–Sáb 7am–5pm", telefono: "01 8000 518 388", abierto: true, servicios: ["Medicina general", "Vacunación", "Control prenatal"], lat: 10.9878, lng: -74.7889 }
],

  pasosCitas: [
    { num: 1, titulo: "Identifica tu EPS y tu IPS asignada", desc: "Antes de pedir cita, confirma cuál es tu EPS activa y cuál IPS te corresponde para el tipo de atención que necesitas." },
    { num: 2, titulo: "Elige el tipo de consulta", desc: "Determina si necesitas medicina general (sin remisión) o especialista (requiere remisión médica previa)." },
    { num: 3, titulo: "Selecciona el canal de tu EPS", desc: "Cada EPS tiene sus propios canales: app móvil, portal web, línea telefónica o presencial en sede." },
    { num: 4, titulo: "Ten a mano tu información", desc: "Número de cédula, carné de afiliación o código de afiliado, y la remisión si aplica." },
    { num: 5, titulo: "Confirma y anota tu cita", desc: "Guarda el número de confirmación, la fecha, hora, sede y nombre del médico asignado." }
  ],

  canales: [
    { icon: "📱", nombre: "App móvil", desc: "La mayoría de EPS tienen app. Busca la de tu EPS en App Store o Play Store." },
    { icon: "💻", nombre: "Portal web", desc: "Ingresa al sitio oficial de tu EPS y busca 'Agendar cita' en el menú." },
    { icon: "📞", nombre: "Línea telefónica", desc: "Llama a la línea de atención al usuario de tu EPS (disponible en la sección Mi EPS)." },
    { icon: "🏥", nombre: "Presencial en sede", desc: "Acércate a la sede de tu IPS asignada con tu documento de identidad." }
  ],

  faq: [
    { pregunta: "¿Cómo sé a qué EPS estoy afiliado?", respuesta: "Puedes verificarlo en el portal del Ministerio de Salud (minsalud.gov.co), llamando a la línea 01 8000 910 097 o consultando en la oficina de tu empleador si cotizas como trabajador dependiente. También puedes acercarte a cualquier sede de la Adres." },
    { pregunta: "¿Qué es el régimen contributivo y el subsidiado?", respuesta: "El régimen contributivo está compuesto por trabajadores con contrato, independientes con capacidad de pago y sus familias. El régimen subsidiado cubre a personas en situación de vulnerabilidad económica, financiado por el Estado." },
    { pregunta: "¿Puedo cambiar de EPS?", respuesta: "Sí. Puedes solicitar traslado de EPS una vez al año, durante los primeros 5 días hábiles de cualquier mes. El traslado se hace efectivo al mes siguiente. Debes cumplir mínimo 12 meses en tu EPS actual, salvo excepciones como deficiencia comprobada en el servicio." },
    { pregunta: "¿Qué hago si mi EPS no me autoriza un servicio?", respuesta: "Tienes el derecho de interponer una tutela si la EPS niega un servicio contemplado en el Plan de Beneficios en Salud (PBS). También puedes radicar una queja formal ante la Superintendencia Nacional de Salud a través del portal supersalud.gov.co o llamando al 01 8000 513 700." },
    { pregunta: "¿Las urgencias siempre están cubiertas?", respuesta: "Sí. Por ley colombiana, toda entidad de salud habilitada para urgencias debe atender a cualquier paciente independientemente de su EPS o si tiene carné. La atención inicial en urgencias no puede ser negada ni condicionada a pagos previos." },
    { pregunta: "¿Qué es una remisión médica?", respuesta: "Es un documento generado por tu médico general que justifica y autoriza la atención por un médico especialista o un servicio de mayor complejidad. Sin remisión, generalmente no puedes acceder directamente a especialistas dentro del sistema público." },
    { pregunta: "¿Cómo afilio a mis beneficiarios?", respuesta: "Puedes afiliar a tu cónyuge, compañero/a permanente, hijos menores de 25 años estudiantes, hijos con discapacidad y padres que dependan económicamente de ti. Debes presentar los documentos que acrediten el parentesco en la sede de tu EPS o a través de su portal digital." }
  ]
};
