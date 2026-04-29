---
type: architecture_context
project: "sanark"
status: active
tech_stack:
  frontend: "React 18 + TypeScript + Vite + Tailwind CSS"
  ui_library: "shadcn/ui (Radix primitives)"
  backend: "Supabase (PostgreSQL + Edge Functions)"
  email: "Lovable Transactional Email API"
  hosting: "Vercel (SPA static)"
  dns: "hostingwarlock.com (CNAME → Vercel)"
external_dependencies:
  - supabase
  - lovable-email-api
  - vercel
users:
  - visitantes
  - admin
governed_by:
  - guardrails.md
  - prd.md
---

# System Context: sanark

> C4 Level 1 — Sistema de reservas de Lectura Estructural

## Overview

Sanark es una SPA (Single Page Application) desplegada en Vercel que permite a visitantes conocer los servicios de Lectura Estructural de Sanark Studio y reservar sesiones. El backend se apoya en Supabase para persistencia de datos y edge functions para procesamiento de emails transaccionales.

## Context Diagram

```
┌──────────────┐       ┌─────────────────────┐       ┌──────────────────┐
│  Visitante   │──────►│    sanark.studio     │──────►│    Supabase      │
│  (browser)   │       │  (React SPA/Vercel)  │       │  (DB + Functions)│
└──────────────┘       └─────────────────────┘       └────────┬─────────┘
                                                              │
                                                              ▼
┌──────────────┐                                     ┌──────────────────┐
│    Admin     │◄────────────────────────────────────│  Lovable Email   │
│ (email inbox)│                                     │  API             │
└──────────────┘                                     └──────────────────┘
```

## External Interfaces

| System | Direction | Protocol | Description |
|--------|-----------|----------|-------------|
| Supabase DB | Bidireccional | HTTPS/REST | Persistencia de reservas (`lectura_requests`), auth |
| Supabase Edge Functions | Saliente | HTTPS | Procesamiento de formulario de reserva y envío de emails |
| Lovable Email API | Saliente | HTTPS | Envío de emails transaccionales (confirmación cliente + notificación admin) |
| Vercel | Hosting | HTTPS | Servicio de la SPA estática, CDN, SSL |
| hostingwarlock.com DNS | Infraestructura | DNS CNAME | Resolución de sanark.studio → Vercel |
