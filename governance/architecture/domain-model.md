---
type: architecture_domain_model
project: "sanark"
status: active
bounded_contexts:
  - name: booking
    description: "Flujo completo de reserva de sesiones de Lectura Estructural"
  - name: content
    description: "Páginas informativas y educativas sobre los servicios"
  - name: analytics
    description: "Tracking de comportamiento y dashboard de métricas"
shared_kernel:
  ui: "shadcn/ui components"
  layout: "Navbar, Footer, Layout"
---

# Domain Model: sanark

> Contextos acotados y kernel compartido

## Bounded Contexts

### 1. Booking (Reservas)

Responsable del flujo completo de reserva de sesiones de Lectura Estructural.

- **Entidades**: `LecturaRequest` (nombre, email, telefono, mensaje, estado, created_at)
- **Flujo**: Formulario → Edge Function → DB insert → Email confirmación + Email admin
- **Módulos**: `BookingFormDialog`, `send-booking-emails`, tabla `lectura_requests`

### 2. Content (Contenido)

Páginas informativas y educativas sobre los servicios de Sanark Studio.

- **Páginas**: Index, LecturaEstructural, LecturaIntroductoria, ProcesoSanark
- **Componentes visuales**: HeroBackground, ScrollTextReveal, VideoExplainer, FaqSection, Parallax
- **Legales**: PoliticaPrivacidad, AvisoLegal

### 3. Analytics (Métricas)

Tracking de comportamiento de usuarios y dashboard de métricas.

- **Módulos**: `lib/analytics.ts`, página `Analytics`
- **Datos**: Pageviews, eventos de interacción

## Shared Kernel

| Módulo | Alcance | Descripción |
|--------|---------|-------------|
| UI Library (ui/) | Global | 60+ componentes shadcn/ui compartidos por todos los contextos |
| Layout (layout/) | Global | Navbar, Footer, Layout wrapper — estructura visual común |
| Hooks (hooks/) | Global | use-mobile, use-toast — utilidades cross-context |
| Utils (lib/utils.ts) | Global | cn() para class merging, utilidades genéricas |
