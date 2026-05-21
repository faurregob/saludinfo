# SaludInfo 🏥
Plataforma web informativa sobre el sistema de salud colombiano (EPS e IPS).

> Proyecto académico — Desarrollo Front-End  
> Fundación Universitaria Compensar · 2026

## 📋 Descripción

SaludInfo es una SPA (Single Page Application) de carácter estrictamente informativo que centraliza datos sobre EPS, IPS y sedes de atención médica en Colombia, con el objetivo de reducir la desinformación y orientar a los ciudadanos hacia los servicios de salud correctos.

## ✨ Funcionalidades

- **Mi EPS** — Tarjetas informativas con buscador y filtro por régimen (Contributivo / Subsidiado)
- **Mi IPS** — Información sobre tipos de IPS y cómo identificar la asignada
- **Sedes** — Directorio de centros de atención con horarios, contacto y ubicación en Google Maps
- **Agendar cita** — Formulario con calendario interactivo, selección de horarios y confirmación por WhatsApp
- **Preguntas frecuentes** — Respuestas a dudas comunes sobre el sistema de salud

## 🛠️ Tecnologías

| Capa | Tecnología |
|------|-----------|
| Estructura | HTML5 |
| Estilos | SCSS + Bootstrap 5 |
| Lógica | JavaScript (Vanilla) — patrón MVC |
| Mapas | Google Maps Embed API |

## 🗂️ Arquitectura

El proyecto sigue el patrón **MVC en JavaScript puro**:

```
📁 SaludInfo/
├── index.html
├── js/
│   ├── model.js       # Datos de EPS, IPS y sedes
│   ├── view.js        # Manipulación del DOM
│   └── controller.js  # Lógica y navegación
└── scss/
    └── main.scss      # Estilos con variables globales
```

## 🚀 Demo

👉 [Ver proyecto en GitHub Pages](https://lauracalvog.github.io/-SaludInfo/)

## 👥 Autores

- Laura Calvo Gómez
- Freddy Alexander Urrego Beltrán

**Docente:** John Fredy Céspedes Beltrán
