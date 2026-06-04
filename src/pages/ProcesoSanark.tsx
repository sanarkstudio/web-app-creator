import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import FadeIn from "@/components/shared/FadeIn";
import SectionDivider from "@/components/shared/SectionDivider";
import FloatingParticles from "@/components/shared/FloatingParticles";
import GenerativeParallax from "@/components/shared/GenerativeParallax";
import SanarkSymbol from "@/components/shared/SanarkSymbol";
import ScrollTextReveal from "@/components/shared/ScrollTextReveal";
import StickyRevealSection from "@/components/shared/StickyRevealSection";
import { ArrowRight, Search, Compass, Hammer, Home, Activity, HeartHandshake, Zap, DollarSign, Brain, Gem, Sparkles, Mail, CalendarCheck, MessageSquare, Lock } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import MobileStickyCTA from "@/components/shared/MobileStickyCTA";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { trackCtaClick } from "@/lib/analytics";
import BookingFormDialog from "@/components/shared/BookingFormDialog";

const phases = [
  {
    num: "01",
    icon: Search,
    title: "Detectar Estructuras Heredadas",
    desc: "Identificación profunda de los programas y patrones arraigados en tu psique y tu ADN que dictan cómo operas. Lo que no se ve, se repite. Aquí empieza a verse.",
  },
  {
    num: "02",
    icon: Compass,
    title: "Diseño de Nuevas Estructuras",
    desc: "Conceptualización de marcos operativos completamente nuevos, alineados con lo que deseas crear. No se trata de mejorar lo viejo. Se trata de diseñar lo que viene.",
  },
  {
    num: "03",
    icon: Hammer,
    title: "Creación de la Nueva Estructura",
    desc: "Implementación y materialización activa de estos nuevos marcos. La estructura deja de ser una idea y empieza a tomar forma en tu realidad concreta.",
  },
  {
    num: "04",
    icon: Home,
    title: "Habitar la Nueva Estructura",
    desc: "Integración plena de la nueva forma de ser y operar. Lo que antes parecía inalcanzable se convierte en tu nuevo punto de partida.",
  },
];

/** Golden SVG flowing path that connects phases */
const GoldenFlowPath = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.6, 0.3]);

  return (
    <div ref={ref} className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-20 hidden md:block pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 80 1000" preserveAspectRatio="none" fill="none">
        <defs>
          <filter id="golden-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="gold-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(38 50% 48%)" stopOpacity="0.1" />
            <stop offset="20%" stopColor="hsl(38 50% 48%)" stopOpacity="0.8" />
            <stop offset="50%" stopColor="hsl(38 60% 55%)" stopOpacity="1" />
            <stop offset="80%" stopColor="hsl(38 50% 48%)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(38 50% 48%)" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path
          d="M40 0 C40 120, 20 180, 40 250 S60 320, 40 400 S20 480, 40 500 S60 580, 40 650 S20 720, 40 750 S60 850, 40 900 L40 1000"
          stroke="hsl(38 50% 48% / 0.08)"
          strokeWidth="1"
        />
        <motion.path
          d="M40 0 C40 120, 20 180, 40 250 S60 320, 40 400 S20 480, 40 500 S60 580, 40 650 S20 720, 40 750 S60 850, 40 900 L40 1000"
          stroke="url(#gold-gradient)"
          strokeWidth="2"
          filter="url(#golden-glow)"
          style={{ pathLength }}
          strokeLinecap="round"
        />
        {[125, 375, 625, 875].map((cy, i) => (
          <motion.circle key={i} cx="40" cy={cy} r="5" fill="hsl(38 50% 48%)" style={{ opacity: glowOpacity }} filter="url(#golden-glow)" />
        ))}
      </svg>
    </div>
  );
};

const ProcesoSanark = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(heroProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.85]);
  const heroY = useTransform(heroProgress, [0, 1], [0, 120]);
  const heroBlur = useTransform(heroProgress, [0, 0.8, 1], [0, 0, 6]);

  const phasesRef = useRef<HTMLElement>(null);

  const lineRef = useRef(null);
  const lineInView = useInView(lineRef, { once: true, margin: "-100px" });

  const ctaRef = useRef<HTMLElement>(null);
  const { scrollYProgress: ctaProgress } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"],
  });
  const ctaGlow = useTransform(ctaProgress, [0, 0.5, 1], [0, 0.15, 0.03]);

  return (
    <Layout>
      <Helmet>
        <title>Proceso Sanark · 12 sesiones · Ingeniería estructural de vida</title>
        <meta name="description" content="12 sesiones individuales 1:1 para detectar, diseñar, crear y habitar una nueva estructura. Desmantela los programas heredados que limitan tu vida. 2.000€ · Online." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://sanark.com/proceso-sanark" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sanark.com/proceso-sanark" />
        <meta property="og:title" content="Proceso Sanark — Lo que heredaste ya no tiene que dirigirte." />
        <meta property="og:description" content="12 sesiones 1:1 para desmontar la arquitectura heredada y edificar una estructura desde la que realmente quieres operar. Ingeniería estructural de vida." />
        <meta property="og:image" content="https://sanark.com/og-image-sanark.jpg" />
        <meta property="og:locale" content="es_ES" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Proceso Sanark · Ingeniería estructural de vida" />
        <meta name="twitter:description" content="12 sesiones 1:1 para detectar, diseñar, crear y habitar una nueva estructura. Desmantela los programas heredados que te limitan." />
        <meta name="twitter:image" content="https://sanark.com/og-image-sanark.jpg" />
      </Helmet>
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <GenerativeParallax density={70} intensity={0.85} />

        <motion.div
          style={{
            opacity: heroOpacity,
            scale: heroScale,
            y: heroY,
            filter: useTransform(heroBlur, (v) => `blur(${v}px)`),
          }}
          className="relative z-10 container mx-auto px-6 text-center max-w-4xl py-28"
        >
          <FadeIn>
            <SanarkSymbol size={100} className="mx-auto mb-8 opacity-50" />
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="font-body text-xs tracking-[0.5em] uppercase text-gold mb-8">
              Creación estructural
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light leading-[1.05] mb-6 text-shadow-gold">
              Lo que heredaste
              <br />
              <span className="gradient-text-gold font-medium">ya no tiene que dirigirte.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.6}>
            <p className="font-body text-base md:text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed">
              12 sesiones para desmontar la arquitectura heredada que limita tu vida
              y edificar una estructura desde la que realmente quieres operar.
            </p>
          </FadeIn>
          <FadeIn delay={0.85}>
            <div className="mt-12 flex flex-col items-center gap-4">
              <BookingFormDialog
                cta="Quiero edificar mi nueva estructura"
                location="proceso_sanark_hero"
                trigger={
                  <button className="group inline-flex items-center gap-3 font-body text-sm tracking-wider uppercase px-12 py-5 bg-gold text-background hover:bg-gold-light transition-all duration-500 font-semibold shadow-[0_0_40px_hsl(38_50%_48%/0.4)] hover:shadow-[0_0_60px_hsl(38_50%_48%/0.6)]">
                    Quiero edificar mi nueva estructura
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                }
              />
              <p className="font-body text-xs tracking-[0.2em] uppercase text-foreground/85">
                12 sesiones · 1:1 · Plazas limitadas
              </p>
            </div>
          </FadeIn>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-gold/50 to-transparent" />
        </motion.div>
      </section>

      {/* Reveal line */}
      <div ref={lineRef} className="flex justify-center py-4">
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
          initial={{ width: 0 }}
          animate={lineInView ? { width: "70%" } : {}}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Apple-style sticky reveal — Intro */}
      <StickyRevealSection scrollHeight={1.8}>
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <SectionDivider />
          <h2 className="font-display text-4xl md:text-6xl font-light mt-12 mb-8 leading-tight">
            Esto no es terapia.
            <br />
            <span className="gradient-text-gold">Es ingeniería estructural de vida.</span>
          </h2>
          <p className="font-body text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
            Parte de la base revelada en la Lectura Estructural y trabaja directamente
            sobre los programas que sostienen tus patrones repetitivos.
          </p>
        </div>
      </StickyRevealSection>

      {/* Apple-style word-by-word scroll reveal */}
      <section className="py-16 md:py-36 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(38_50%_48%/0.03)_0%,transparent_50%)]" />
        <div className="container mx-auto px-6 max-w-3xl relative z-10">
          <ScrollTextReveal
            text="Puedes cambiar hábitos, rutinas, entornos. Pero si la estructura subyacente permanece intacta, las fugas volverán. Los ciclos se repetirán. El techo seguirá ahí. Este proceso existe para quienes están listos para intervenir en la raíz."
            className="font-display text-2xl md:text-4xl font-light text-center text-foreground leading-snug"
            as="h2"
          />
        </div>
      </section>

      {/* Phases — golden flow timeline */}
      <section ref={phasesRef} className="py-16 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(38_50%_48%/0.06)_0%,transparent_60%)]" />
        <FloatingParticles count={25} />
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <FadeIn>
            <h2 className="font-display text-3xl md:text-5xl font-light text-center mb-6">
              Cuatro fases. Un solo propósito: crear desde cero.
            </h2>
            <p className="font-body text-sm text-foreground/90 text-center mb-20 max-w-xl mx-auto">
              Cada fase es un paso irreversible. No hay vuelta atrás porque no queda nada a lo que volver.
            </p>
          </FadeIn>

          <div className="relative">
            <GoldenFlowPath />
            {/* Desktop timeline */}
            <div className="hidden md:block space-y-24">
              {phases.map((phase, i) => (
                <FadeIn key={i} delay={i * 0.1} direction={i % 2 === 0 ? "left" : "right"}>
                  <motion.div
                    className={`relative md:w-[45%] ${i % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"}`}
                    whileHover={{ scale: 1.03, y: -4 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.div
                      className={`absolute top-10 ${i % 2 === 0 ? "right-0 w-[calc(55vw/2-50%)]" : "left-0 w-[calc(55vw/2-50%)]"} h-px bg-gradient-to-r ${i % 2 === 0 ? "from-transparent to-gold/30" : "from-gold/30 to-transparent"}`}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 + 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      style={{ transformOrigin: i % 2 === 0 ? "right" : "left" }}
                    />
                    <div className="relative p-10 bg-card/80 backdrop-blur-sm border border-border/50 hover:border-gold/40 transition-all duration-500 hover:glow-gold overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/5 to-gold/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                      <span className="font-display text-6xl font-light text-gold/20 block mb-3 relative z-10">{phase.num}</span>
                      <phase.icon size={20} className="text-gold mb-3 relative z-10" />
                      <h3 className="font-display text-2xl font-medium mb-3 relative z-10">{phase.title}</h3>
                      <p className="font-body text-base text-foreground/80 leading-relaxed relative z-10">{phase.desc}</p>
                    </div>
                  </motion.div>
                </FadeIn>
              ))}
            </div>

            {/* Mobile carousel */}
            <div className="md:hidden -mx-6">
              <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent className="px-6">
                  {phases.map((phase, i) => (
                    <CarouselItem key={i} className="basis-[88%] pl-4">
                      <div className="relative p-6 bg-card/80 backdrop-blur-sm border border-gold/20 h-full min-h-[260px]">
                        <span className="font-display text-5xl font-light text-gold/20 block mb-2">{phase.num}</span>
                        <phase.icon size={20} className="text-gold mb-3" />
                        <h3 className="font-display text-lg font-medium mb-2">{phase.title}</h3>
                        <p className="font-body text-sm text-foreground/85 leading-relaxed">{phase.desc}</p>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
              <p className="mt-4 text-center font-body text-[10px] tracking-[0.25em] uppercase text-gold/50">Desliza por las 4 fases →</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision — What becomes possible */}
      <section className="py-16 md:py-36 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(38_50%_48%/0.04)_0%,transparent_60%)]" />
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <FadeIn>
            <Sparkles size={22} className="text-gold mx-auto mb-5" />
            <h2 className="font-display text-3xl md:text-5xl font-light text-center mb-6 leading-tight">
              Lo que se abre cuando la estructura cambia
            </h2>
            <p className="font-body text-base text-foreground/90 text-center mb-14 max-w-2xl mx-auto">
              Después de las 4 fases, estas áreas dejan de estar gobernadas por lo heredado. Tú decides cómo operan.
            </p>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { icon: Activity, area: "Energía", text: "Vitalidad constante que no depende de fuerza de voluntad. Tu cuerpo deja de colapsar en ciclos que nunca elegiste." },
              { icon: HeartHandshake, area: "Pareja", text: "Relaciones que eliges desde la plenitud, no desde el vacío. El patrón de atraer lo mismo con distinto rostro se detiene." },
              { icon: Zap, area: "Salud", text: "Un cuerpo que responde a ti. Sin la carga emocional heredada que se expresaba como dolor, enfermedad o agotamiento crónico." },
              { icon: DollarSign, area: "Finanzas", text: "El dinero deja de fugarse. El techo invisible que frenaba tu expansión se disuelve porque ya no opera la estructura que lo sostenía." },
              { icon: Brain, area: "Claridad", text: "Pensamiento limpio, decisiones nítidas. Sin el ruido mental de un sistema operativo que no te pertenece." },
              { icon: Gem, area: "Propósito", text: "Tus metas se materializan porque nacen de una estructura nueva — no de la fuerza ni de la repetición." },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <FadeIn key={i} delay={i * 0.08}>
                  <motion.div
                    className="p-5 bg-card/50 backdrop-blur-sm border border-border/30 hover:border-gold/30 transition-all duration-500 group"
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon size={18} className="text-gold mb-2 group-hover:text-gold-light transition-colors" />
                    <p className="font-display text-xs tracking-[0.2em] uppercase text-gold/80 mb-1">{item.area}</p>
                    <p className="font-body text-sm text-foreground/90 leading-relaxed group-hover:text-foreground/85 transition-colors">{item.text}</p>
                  </motion.div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 md:py-16 relative">
        <div className="container mx-auto px-6 max-w-3xl relative z-10">
          <FadeIn>
            <motion.div
              className="flex flex-col md:flex-row items-center justify-center gap-0 divide-y md:divide-y-0 md:divide-x divide-gold/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {[
                { num: "12", label: "sesiones individuales" },
                { num: "4", label: "fases irreversibles" },
                { num: "1", label: "estructura nueva" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex-1 text-center px-8 md:px-12 py-6 md:py-0"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.15,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <p className="font-display text-5xl md:text-6xl font-light text-gold mb-2">
                    {item.num}
                  </p>
                  <p className="font-body text-xs tracking-[0.25em] uppercase text-foreground/60">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* Price box */}

      <section className="py-16 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(38_50%_48%/0.06)_0%,transparent_60%)]" />
        <FloatingParticles count={12} />
        <div className="container mx-auto px-6 max-w-3xl relative z-10">
          <FadeIn>
            <motion.div
              className="relative p-12 md:p-16 bg-card/80 backdrop-blur-sm border border-gold/20 text-center hover:border-gold/40 transition-all duration-500 glow-gold"
              whileInView={{ scale: [0.95, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <SanarkSymbol size={40} className="opacity-40" />
              </div>
              <p className="font-body text-xs tracking-[0.4em] uppercase text-gold mb-6">
                Proceso completo
              </p>
              <h3 className="font-display text-2xl md:text-3xl font-light mb-4">
                12 sesiones · 4 fases · 1 transformación
              </h3>
              <p className="font-body text-sm text-foreground/90 leading-relaxed mb-8 max-w-lg mx-auto">
                Doce sesiones individuales conmigo donde trabajo directamente sobre tu estructura heredada.
                Detectar, diseñar, crear y habitar. Cada fase es un paso irreversible hacia una nueva forma de operar.
              </p>
              <motion.p
                className="font-display text-5xl md:text-6xl font-light text-gold mb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                2.000€
              </motion.p>
              <p className="font-body text-xs text-foreground/85 tracking-wider mb-8">
                12 sesiones individuales 1:1 · Online
              </p>

              {/* Qué pasa después de reservar */}
              <div className="text-left max-w-md mx-auto mb-10 border-t border-border/40 pt-8">
                <p className="font-body text-xs tracking-[0.3em] uppercase text-gold/80 mb-5 text-center">
                  Qué pasa después de reservar
                </p>
                <ul className="space-y-4">
                {[
                  { icon: Mail, text: "Recibes un email de confirmación con los detalles del proceso y las opciones de pago." },
                  { icon: CalendarCheck, text: "Una vez confirmado, agendamos juntos las 12 sesiones según tu disponibilidad." },
                  { icon: MessageSquare, text: "Cada sesión es una videollamada privada conmigo. Sin grupos. Sin fórmulas genéricas." },
                  { icon: Lock, text: "Todo lo que se trabaja queda entre nosotros. Confidencialidad absoluta." },
                ].map(({ icon: Icon, text }, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <Icon size={16} className="text-gold mt-0.5 shrink-0" />
                      <p className="font-body text-sm text-foreground/85 leading-relaxed">{text}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <BookingFormDialog
                cta="Estoy listo. Quiero empezar."
                location="proceso_sanark_price_box"
                trigger={
                  <button className="group inline-flex items-center gap-3 font-body text-sm tracking-wider uppercase px-12 py-5 bg-gold text-background hover:bg-gold-light transition-all duration-500 font-semibold shadow-[0_0_40px_hsl(38_50%_48%/0.4)] hover:shadow-[0_0_60px_hsl(38_50%_48%/0.6)]">
                    Estoy listo. Quiero empezar.
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                }
              />
              <p className="mt-5 font-body text-sm text-foreground/90">
                Plazas limitadas · Te respondo personalmente en 24h
              </p>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* Prerequisite */}
      <section className="py-16 md:py-36">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <FadeIn>
            <h2 className="font-display text-3xl md:text-5xl font-light mb-8">
              Sin el mapa, no hay territorio que construir.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="font-body text-base md:text-lg text-foreground/80 leading-relaxed mb-10">
              El Proceso Sanark parte siempre de una Lectura Estructural. No como requisito — como punto de
              partida real. Sin saber exactamente qué estructura está activa en ti, cualquier intervención trabaja
              en la oscuridad.
            </p>
          </FadeIn>
          <FadeIn delay={0.35}>
            <Link
              to="/lectura-estructural"
              onClick={() => trackCtaClick("Comienza con tu Lectura Estructural", "proceso_sanark_prerequisite")}
              className="group inline-flex items-center gap-3 font-body text-sm tracking-wider uppercase px-8 py-4 border border-gold/40 text-gold hover:bg-gold hover:text-background transition-all duration-500"
            >
              Comienza con tu Lectura Estructural
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* CTA — final */}
      <section ref={ctaRef} className="py-16 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary/30" />
        <motion.div
          className="absolute inset-0"
          style={{
            background: useTransform(ctaGlow, (v) => `radial-gradient(ellipse at center, hsl(38 50% 48% / ${v}) 0%, transparent 60%)`),
          }}
        />
        <FloatingParticles count={20} />
        <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
          <FadeIn>
            <SanarkSymbol size={70} className="mx-auto mb-8 opacity-40" />
          </FadeIn>
          <FadeIn delay={0.15}>
            <h2 className="font-display text-3xl md:text-5xl font-light mb-8 leading-tight">
              No se trata de ser mejor.
              <br />
              <span className="text-gold">Se trata de operar desde otro lugar.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="font-body text-base text-foreground/80 mb-12 max-w-xl mx-auto">
              Si ya tienes el mapa, lo siguiente es construir el territorio. Doce sesiones para que la estructura nueva deje de ser idea y se vuelva tu forma natural de operar.
            </p>
          </FadeIn>
          <FadeIn delay={0.45}>
            <BookingFormDialog
              cta="Dar el siguiente paso estructural"
              location="proceso_sanark_final_cta"
              trigger={
                <button className="group inline-flex items-center gap-3 font-body text-sm tracking-wider uppercase px-10 py-4 bg-gold text-background hover:bg-gold-light transition-all duration-500 font-medium">
                  Dar el siguiente paso estructural
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              }
            />
          </FadeIn>
        </div>
      </section>
      <div className="md:hidden h-20" aria-hidden />
      <MobileStickyCTA cta="Reservar Proceso · 2.000€" location="proceso_sanark_sticky" meta="12 sesiones · 1:1 · Plazas limitadas" />
    </Layout>
  );
};

export default ProcesoSanark;
