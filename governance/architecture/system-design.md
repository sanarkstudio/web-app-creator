---
type: architecture_design
project: "sanark"
status: active
layers:
  - name: presentation
    description: "React SPA — páginas, componentes, routing"
  - name: integration
    description: "Cliente Supabase, analytics, hooks"
  - name: backend
    description: "Supabase Edge Functions, DB"
---

# System Design: sanark

> C4 Level 2 — Descomposición de componentes

## Architecture Overview

Arquitectura de SPA clásica con separación clara entre presentación (React), integración (Supabase client) y backend serverless (Supabase Edge Functions). No hay SSR — todo el rendering es client-side. El estado se gestiona con TanStack React Query para datos del servidor y React state local para UI.

## Components

| Component | Responsibility | Technology |
|-----------|---------------|------------|
| Router (App.tsx) | Definición de rutas y providers globales | React Router v6 |
| Layout (layout/) | Estructura visual: Navbar, Footer, wrapper | React + Tailwind |
| Pages (pages/) | Vistas por ruta: Index, LecturaEstructural, LecturaIntroductoria, ProcesoSanark, legales, analytics | React + Helmet |
| Shared Components (shared/) | Componentes reutilizables: BookingFormDialog, FadeIn, Parallax, Particles, FAQ, Video | React + Framer Motion |
| UI Library (ui/) | Primitivas de diseño: Button, Dialog, Form, Input, etc. | shadcn/ui (Radix) |
| Supabase Client (integrations/) | Inicialización y tipos del cliente Supabase | @supabase/supabase-js |
| Analytics (lib/analytics.ts) | Tracking de eventos y pageviews | Custom |
| Edge Function (supabase/functions/) | Procesamiento de reservas: validación, persistencia, envío de emails | Deno (Supabase Functions) |

## Key Decisions

1. **SPA sin SSR**: Simplicidad de deploy (static files en Vercel), suficiente para un sitio de servicios con bajo volumen de contenido dinámico.
2. **shadcn/ui**: Componentes accesibles y personalizables sin vendor lock-in — se copian al proyecto, no se instalan como dependencia.
3. **Supabase como backend completo**: Evita mantener un servidor propio. DB + Auth + Functions en un solo servicio.
4. **Lovable Email API**: Integración existente del scaffolding original. Evaluar migración a Resend en el futuro.
5. **Framer Motion para animaciones**: Experiencia visual premium sin comprometer rendimiento.
