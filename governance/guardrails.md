---
type: guardrails
version: "1.0.0"
---

# Guardrails: sanark

> Convenciones de código y arquitectura detectadas del codebase existente

---

## Guardrails Activos

### Code Quality

| ID | Level | Guardrail | Verification | Derived from |
|----|-------|-----------|--------------|--------------|
| GR-01 | must | TypeScript estricto — sin `any` implícito | `npx tsc --noEmit` | tsconfig.app.json (strict: true) |
| GR-02 | must | ESLint sin errores en todo el código | `npx eslint .` | eslint.config.js |
| GR-03 | must | Tests unitarios pasan antes de merge | `npx vitest run` | vitest.config.ts |
| GR-04 | should | Imports con alias `@/` en lugar de rutas relativas | Code review | vite.config.ts + tsconfig paths |
| GR-05 | must | Variables de entorno públicas usan prefijo `VITE_` | Code review | Vite convention |
| GR-06 | should | Componentes UI base en `src/components/ui/` (shadcn) — no modificar directamente | Code review | components.json |
| GR-07 | should | Componentes compartidos custom en `src/components/shared/` | Code review | Estructura existente |
| GR-08 | must | Páginas como componentes en `src/pages/` con ruta definida en `App.tsx` | Code review | React Router config |
| GR-09 | must | Formularios con React Hook Form + Zod para validación | Code review | BookingFormDialog pattern |
| GR-10 | should | Estilos con Tailwind CSS utility classes — evitar CSS custom salvo excepciones | Code review | tailwind.config.ts |
| GR-11 | must | No exponer secrets del servidor en variables `VITE_*` | Code review | Supabase client pattern |
| GR-12 | must | Sanitización de inputs en edge functions antes de persistir | Code review | send-booking-emails |

### Architecture

| ID | Level | Guardrail | Verification | Derived from |
|----|-------|-----------|--------------|--------------|
| GR-13 | must | SPA con React Router — sin SSR | Build output | vite.config.ts |
| GR-14 | must | Backend exclusivamente via Supabase (DB + Edge Functions) | Code review | integrations/supabase/ |
| GR-15 | should | Build tool: Vite con SWC plugin — no webpack | Build config | vite.config.ts |
| GR-16 | must | Deploy target: Vercel (static SPA) | Deploy config | Decisión de proyecto |
