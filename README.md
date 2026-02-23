# 🚀 MicroDSI (M2-S10) | Framework de Transformación Organizacional

---
URL: https://dwp28.github.io/microdsi-m2s10-Daniel-Willson
---

![Version](https://img.shields.io/badge/Versi%C3%B3n-1.0.0-emerald)
![License](https://img.shields.io/badge/Licencia-MIT-violet)
![University](https://img.shields.io/badge/Instituci%C3%B3n-UNIE%20Universidad-blue)
![Developer](https://img.shields.io/badge/Developer-Daniel%20Willson-slate)

**MicroDSI** es una aplicación web interactiva diseñada para facilitar el aprendizaje y la implementación de sistemas de información bajo la metodología de micro-servicios y mejora de procesos. Esta herramienta permite a los usuarios navegar por tracks especializados, resolver casos prácticos y generar documentación técnica profesional de forma automatizada.

---

## 🎯 Propósito del Proyecto

El objetivo de este sistema es servir como puente entre la teoría de la gestión de servicios (ITSM, HR, Procurement) y la ejecución técnica. Proporciona una interfaz intuitiva para:

1.  **Aprender**: Micro-lecciones rápidas y enfocadas.
2.  **Practicar**: Guías paso a paso para la resolución de incidentes o flujos de trabajo.
3.  **Ejecutar**: Un laboratorio de procesos para priorizar y documentar el **SIPOC** de una organización.

---

## ✨ Funcionalidades Principales

### 💻 Sistema de Tracks Dinámico

La aplicación filtra todo su contenido basándose en el perfil seleccionado:

- **ITSM**: Gestión de servicios de TI y Service Desk.
- **HR**: Procesos de Onboarding y gestión del talento.
- **Procurement**: Ciclo de compras y gestión de proveedores.

### 🧪 Laboratorio de Procesos & SIPOC

Herramienta de nivel profesional para consultoría:

- **Inventario L1**: Registro de procesos con sistema de scoring (Impacto, Esfuerzo, Riesgo).
- **Priorización Top 5**: Identificación automática de los procesos con mayor potencial de automatización.
- **Constructor SIPOC**: Definición detallada de _Suppliers, Inputs, Process, Outputs y Customers_.
- **Análisis No-Alcance**: Gestión de expectativas para el MVP.

### 📥 Exportador de Entregables

Un motor de compilación que permite descargar todo el trabajo realizado en un archivo `.md` (Markdown) listo para ser integrado en repositorios de GitHub o documentación técnica oficial.

---

## 🏗️ Estructura del Proyecto

La aplicación sigue una arquitectura de sitio estático moderno, optimizado para rendimiento y facilidad de edición:

```text
📂 MicroDSI/
├── 📄 index.html        # Landing page y punto de entrada.
├── 📄 feed.html         # Módulo de aprendizaje (Micro-lecciones).
├── 📄 pista.html        # Módulo de práctica (Casos guiados).
├── 📄 lab.html          # Herramienta de trabajo (SIPOC & Exportación).
├── 📄 README.md         # Documentación del proyecto.
└── 📂 assets/
    ├── 🎨 styles.css    # Sistema de diseño, tokens y animaciones.
    └── ⚙️ app.js        # Lógica de negocio, estado y persistencia.
```

---

## 🛠️ Tecnologías Utilizadas

- **HTML5 & CSS3**: Diseño responsivo con arquitectura de variables y CSS Grid/Flexbox.
- **Vanilla JavaScript (ES6+)**: Lógica de filtrado, gestión de estado en local y exportación de archivos.
- **LocalStorage API**: Persistencia de datos para que no pierdas tu progreso al recargar.
- **Google Fonts**: Tipografía "Inter" para máxima legibilidad.

---

## 👤 Créditos y Autoría

Este proyecto ha sido desarrollado como parte del programa de estudios en:

- **Institución**: [UNIE Universidad](https://www.universidadunie.com/)
- **Estudiante**: Daniel Willson
- **GitHub**: [@dwp28](https://github.com/dwp28)

---

## 📝 Instrucciones de Uso

1.  **Clonar el repositorio**: `git clone https://github.com/dwp28/MicroDSI.git`
2.  **Abrir**: Ejecuta el archivo `index.html` en cualquier navegador moderno.
3.  **Interactuar**: Selecciona tu track, completa la simulación y utiliza el Laboratorio para generar tu informe final.

---

_Este proyecto representa la intersección entre el Diseño de Sistemas de Información (DSI) y la excelencia operativa._
