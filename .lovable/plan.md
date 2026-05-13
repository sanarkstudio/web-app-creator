# Optimización móvil — Home y páginas de servicio

## Objetivo
Reducir la sensación de "muro de texto" en móvil sin alterar la experiencia desktop (que ya funciona). Aplicar 4 técnicas combinadas: copys más cortos en móvil, acordeones, slides/carousel para bloques largos, y reescalado de tipografía/ritmo vertical.

## Diagnóstico actual (móvil)
Los problemas detectados al revisar `Index.tsx`, `LecturaEstructural.tsx` y `ProcesoSanark.tsx`:

1. **Padding vertical excesivo en móvil**: secciones con `py-28`, `py-32`, `py-48` aplican igual en mobile → los textos quedan flotando con demasiado aire entre uno y otro, obligando a scroll largo.
2. **Headings demasiado grandes para móvil**: `text-4xl` y `text-3xl` en H2 saturan la pantalla pequeña.
3. **Párrafos largos sin pausa visual**: secciones como el manifiesto del Home, la bio de Juan Carlos, los bloques de las 4 fases del Proceso, o los sticky reveal de Lectura Estructural se leen como texto continuo en vertical.
4. **Cards apiladas verticalmente**: en el Home las dos tarjetas (Lectura / Proceso) y los 6 bloques de identificación se apilan en columna → mucho scroll. Lo mismo con las 4 fases del Proceso.
5. **Copys idénticos a desktop**: en desktop el texto se equilibra con el ancho; en móvil se vuelve denso porque no hay versión recortada.

## Plan de cambios (solo móvil, breakpoints `< md`)

### 1. Ritmo vertical y tipografía global
Crear utilidades responsivas en `index.css` y aplicarlas a las secciones:
- `py-28 md:py-32` → `py-16 md:py-32` (reducir aire móvil ~45%)
- `py-32 md:py-48` → `py-20 md:py-48`
- Headings hero: `text-4xl md:text-6xl` → `text-3xl md:text-6xl`
- H2 secciones: `text-3xl md:text-5xl` → `text-2xl md:text-5xl`
- Body grande: `text-xl md:text-2xl` → `text-lg md:text-2xl`
- `leading-relaxed` en móvil → `leading-snug` para párrafos largos

### 2. Copys cortos en móvil (técnica `<span className="md:hidden">` / `<span className="hidden md:inline">`)
Reescribir versiones móviles más densas y directas en:
- **Home / Manifesto** (línea ~213): párrafo largo → versión 30% más corta en móvil
- **Home / Bio Juan Carlos**: 3 párrafos → 2 más cortos en móvil
- **Lectura Estructural / Sticky reveals**: cada panel reduce a 1 frase clave en móvil
- **Proceso Sanark / Descripción de cada fase**: subtítulos cortos en móvil, descripción completa en desktop

Implementación tipo:
```tsx
<p className="font-body ...">
  <span className="hidden md:inline">{copyDesktopLargo}</span>
  <span className="md:hidden">{copyMobileCorto}</span>
</p>
```

### 3. Acordeones "Leer más" en bloques densos
Componente nuevo `MobileExpandable.tsx` (solo activo en móvil):
- Muestra 2-3 líneas + botón "Leer más" con chevron
- En desktop pasa el contenido entero sin acordeón (`md:` reset)
- Aplicar a:
  - Bio extendida de Juan Carlos
  - Descripción larga de cada una de las 4 fases del Proceso Sanark
  - Bloques de "qué incluye" en Lectura Estructural
  - FAQs ya están en accordion → revisar que el tamaño de pregunta no rompa

### 4. Carousel/slides en grids densos (móvil)
Reemplazar grids verticales apiladas por un carousel horizontal swipeable en móvil usando el componente `Carousel` ya disponible en `src/components/ui/carousel.tsx`:
- **Home / 6 bloques de identificación** ("este es tu punto de entrada"): grid 2 cols en desktop → carousel 1.1 cards en móvil con dots/indicador
- **Proceso Sanark / 4 fases del GoldenFlowPath**: timeline vertical en desktop → carousel horizontal con snap en móvil
- **Lectura Estructural / Lo que recibes**: lista vertical → carousel de cards

Patrón:
```tsx
<div className="hidden md:grid md:grid-cols-2 gap-6">{/* desktop */}</div>
<div className="md:hidden">
  <Carousel>...</Carousel>
</div>
```

### 5. CTA siempre visible en móvil (bonus)
Sticky CTA inferior en móvil ("Reservar Lectura — 180€") en `LecturaEstructural` y `ProcesoSanark` — evita que el usuario scrollee hasta abajo. Oculto en desktop.

## Alcance por archivo

```text
src/pages/Index.tsx
  - Reescalar py-/text- responsivo en 8 secciones
  - Versiones móviles cortas en manifesto + bio
  - Carousel para los 6 bloques de identificación
  - Reordenar jerarquía visual hero (símbolo más pequeño en móvil)

src/pages/LecturaEstructural.tsx
  - Reescalar tipografía y padding
  - Acordeones "Leer más" en sticky reveals
  - Sticky CTA móvil
  - Acortar copys hero

src/pages/ProcesoSanark.tsx
  - Carousel móvil para las 4 fases
  - Acordeones en descripciones largas
  - Sticky CTA móvil
  - Reescalado tipográfico

src/components/shared/MobileExpandable.tsx (nuevo)
  - Componente reutilizable de "Leer más" mobile-only

src/index.css
  - Utilidades opcionales si surgen patrones repetidos
```

## Lo que NO se toca
- Versión desktop (queda exactamente igual)
- Copy/tono de marca (sigue 1ª persona, sin "reconstrucción"/"diagnóstico")
- Animaciones Framer Motion existentes
- Estructura de conversión (Pain → Trust → Possibility → CTA)
- Paleta de colores y tokens

## Detalle técnico (para revisión)
- Breakpoint único: `md` (768px). Todo lo móvil va sin prefix, todo lo desktop va con `md:`.
- El componente `MobileExpandable` usará `useState` + `Collapsible` de Radix (ya instalado).
- El `Carousel` ya existe en shadcn (`embla-carousel-react`) → cero dependencias nuevas.
- El sticky CTA usará `fixed bottom-0 md:hidden` con `safe-area-inset-bottom` para iPhone notch.
- QA: verificar a 360, 390 y 414px de ancho.

## Próximo paso si apruebas
Implemento en este orden: (1) reescalado global tipo/padding → ya da un salto visual grande, (2) MobileExpandable + aplicación en bio y fases, (3) Carousel móvil en los 3 grids densos, (4) sticky CTA, (5) versiones móviles cortas de copys clave.
