# PRD: sanark

> Product Requirements Document — Sanark Studio Web Platform

---

## Problem

Los profesionales de Lectura Estructural carecen de una plataforma digital que comunique el valor de su servicio, eduque al visitante sobre el proceso y permita la reserva autónoma con confirmación automatizada. Sin ella, dependen de canales manuales (WhatsApp, email directo) que generan fricción y pierden conversiones.

## Goals

- Ofrecer un sitio web profesional que comunique claramente el servicio de Lectura Estructural
- Automatizar el flujo completo de reserva: formulario → persistencia → email de confirmación → enlace de pago
- Proporcionar contenido educativo sobre el proceso y las modalidades del servicio
- Cumplir con requisitos legales (política de privacidad, aviso legal)
- Mantener métricas de uso a través de analytics integrado

---

## Requirements

### RF-01: Landing y Navegación

El sitio debe presentar una página de inicio con hero visual inmersivo, navegación clara a todas las secciones del servicio, y scroll-to-top automático entre rutas. Incluye navbar, footer y layout consistente.

### RF-02: Información del Servicio

Páginas dedicadas para Lectura Estructural (servicio principal, 90 min, 180€), Lectura Introductoria (modalidad de entrada), y Proceso Sanark (explicación metodológica). Cada página incluye FAQ y CTAs hacia la reserva.

### RF-03: Sistema de Reservas

Formulario modal (BookingFormDialog) con validación (nombre, email, teléfono, mensaje). Al enviar: persiste en tabla `lectura_requests` de Supabase, envía email de confirmación al cliente con enlace de pago, y notifica al admin (sanark.studio@gmail.com).

### RF-04: Emails Transaccionales

Edge function de Supabase (`send-booking-emails`) que procesa el formulario, sanitiza inputs, y envía dos emails vía API transaccional de Lovable: uno al cliente (confirmación + pago) y otro al admin (datos de la reserva).

### RF-05: Cumplimiento Legal

Páginas de Política de Privacidad y Aviso Legal accesibles desde el footer. Meta tags SEO gestionados con HelmetProvider.

### RF-06: Analytics

Dashboard de analytics accesible en `/analytics` para monitoreo de tráfico y comportamiento de usuarios.

### RF-07: Experiencia Visual

Efectos visuales inmersivos: parallax generativo, partículas flotantes, fade-in animations, scroll text reveal, horizontal scroll sections. Diseño responsive con soporte dark mode.

### RF-08: Anti-Indexación Temporal

Mientras el sitio esté en construcción, directivas `noindex, nofollow` en meta tags y `robots.txt` para evitar indexación prematura en motores de búsqueda.
