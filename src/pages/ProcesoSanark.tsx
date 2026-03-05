import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import FadeIn from "@/components/shared/FadeIn";
import SectionDivider from "@/components/shared/SectionDivider";
import FloatingParticles from "@/components/shared/FloatingParticles";
import SanarkSymbol from "@/components/shared/SanarkSymbol";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import procesoVideo from "@/assets/proceso-sanark-video.mp4";

const phases = [
  {
    num: "01",
    title: "Detectar Estructuras Heredadas",
    desc: "Identificación profunda de los programas y patrones arraigados en tu psique y tu ADN que dictan cómo operas. Lo que no se ve, se repite. Aquí empieza a verse.",
  },
  {
    num: "02",
    title: "Diseño de Nuevas Estructuras",
    desc: "Conceptualización de marcos operativos completamente nuevos, alineados con lo que deseas crear. No se trata de mejorar lo viejo. Se trata de diseñar lo que viene.",
  },
  {
    num: "03",
    title: "Creación de la Nueva Estructura",
    desc: "Implementación y materialización activa de estos nuevos marcos. La estructura deja de ser una idea y empieza a tomar forma en tu realidad concreta.",
  },
  {
    num: "04",
    title: "Habitar la Nueva Estructura",
    desc: "Integración plena de la nueva forma de ser y operar. Lo que antes parecía inalcanzable se convierte en tu nuevo punto de partida.",
  },
];

const ProcesoSanark = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(heroProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.85]);
  const heroY = useTransform(heroProgress, [0, 1], [0, 120]);

  const phasesRef = useRef<HTMLElement>(null);
  const { scrollYProgress: phasesProgress } = useScroll({
    target: phasesRef,
    offset: ["start end", "end start"],
  });
  const phasesY = useTransform(phasesProgress, [0, 1], [60, -60]);

  const videoRef = useRef<HTMLElement>(null);
  const videoInView = useInView(videoRef, { once: false, margin: "-100px" });

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
      {/* Hero — cinematic entry */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(38_50%_48%/0.08)_0%,transparent_70%)]" />
        <FloatingParticles count={40} />

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-10 container mx-auto px-6 text-center max-w-4xl py-28"
        >
          <FadeIn>
            <SanarkSymbol size={100} className="mx-auto mb-8 opacity-50" />
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="font-body text-xs tracking-[0.5em] uppercase text-gold mb-8">
              Reconstrucción estructural
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light leading-[1.05] mb-8 text-shadow-gold">
              No viniste a mejorar.
              <br />
              <span className="gradient-text-gold font-medium">Viniste a reconstruirte.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.6}>
            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              12 sesiones para desmontar la arquitectura heredada que limita tu vida
              y edificar una estructura desde la que realmente quieres operar.
            </p>
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

      {/* Video section */}
      <section ref={videoRef} className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary/20" />
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <FadeIn>
            <p className="font-body text-xs tracking-[0.4em] uppercase text-gold text-center mb-6">
              Escúchalo
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <motion.div
              className="relative overflow-hidden border border-gold/20 glow-gold"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <video
                src={procesoVideo}
                controls
                playsInline
                className="w-full aspect-video object-cover"
                poster=""
              />
            </motion.div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="font-body text-sm text-muted-foreground text-center mt-6 italic max-w-2xl mx-auto">
              "Ha llegado el momento de que operes desde un lugar distinto."
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Intro */}
      <section className="py-28 md:py-36 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(38_50%_48%/0.03)_0%,transparent_50%)]" />
        <div className="container mx-auto px-6 max-w-3xl relative z-10">
          <FadeIn><SectionDivider /></FadeIn>
          <FadeIn delay={0.15}>
            <h2 className="font-display text-3xl md:text-5xl font-light text-center mt-12 mb-10">
              Más allá del cambio de hábitos
            </h2>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="space-y-6 font-body text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                El Proceso Sanark no es un programa de mejora personal. Es un proceso de
                reconfiguración estructural. Parte de la base revelada en la Lectura Estructural y
                trabajo directamente sobre los programas que sostienen tus patrones repetitivos.
              </p>
              <p>
                Puedes cambiar hábitos, rutinas, entornos. Pero si la estructura subyacente
                permanece intacta, las fugas volverán. Los ciclos se repetirán. El techo seguirá ahí.
              </p>
              <motion.p
                className="text-foreground font-medium text-lg md:text-xl text-center py-6"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                Este proceso existe para quienes están listos para intervenir en la raíz.
              </motion.p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Phases — interactive timeline */}
      <section ref={phasesRef} className="py-28 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(38_50%_48%/0.06)_0%,transparent_60%)]" />
        <FloatingParticles count={25} />
        <motion.div style={{ y: phasesY }} className="container mx-auto px-6 max-w-5xl relative z-10">
          <FadeIn>
            <h2 className="font-display text-3xl md:text-5xl font-light text-center mb-6">
              Las cuatro fases
            </h2>
            <p className="font-body text-sm text-muted-foreground text-center mb-16 max-w-xl mx-auto">
              Cada fase es un paso irreversible. No hay vuelta atrás porque no queda nada a lo que volver.
            </p>
          </FadeIn>

          {/* Vertical timeline */}
          <div className="relative">
            {/* Animated timeline line */}
            <motion.div
              className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/40 via-gold/20 to-transparent md:-translate-x-px hidden md:block"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "top" }}
            />

            <div className="space-y-12 md:space-y-0">
              {phases.map((phase, i) => (
                <FadeIn key={i} delay={i * 0.15} direction={i % 2 === 0 ? "left" : "right"}>
                  <motion.div
                    className={`relative md:w-1/2 ${i % 2 === 0 ? "md:pr-16" : "md:ml-auto md:pl-16"} mb-12`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Timeline dot */}
                    <motion.div
                      className={`hidden md:block absolute top-8 ${i % 2 === 0 ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"} w-3 h-3 rotate-45 border border-gold/60 bg-background z-10`}
                      whileInView={{ scale: [0, 1.3, 1] }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.2 + 0.5, duration: 0.5 }}
                    />

                    <div className="p-8 md:p-10 bg-card/80 backdrop-blur-sm border border-border/50 hover:border-gold/30 transition-all duration-500 hover:glow-gold">
                      <span className="font-display text-4xl md:text-5xl font-light text-gold/25 block mb-3">
                        {phase.num}
                      </span>
                      <h3 className="font-display text-xl md:text-2xl font-medium mb-3">{phase.title}</h3>
                      <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
                        {phase.desc}
                      </p>
                    </div>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Price box */}
      <section className="py-28 md:py-36 relative overflow-hidden">
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
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8 max-w-lg mx-auto">
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
              <p className="font-body text-xs text-muted-foreground tracking-wider mb-10">
                12 sesiones individuales 1:1
              </p>
              <a
                href="mailto:info@sanark.com?subject=Quiero%20iniciar%20el%20Proceso%20Sanark"
                className="group inline-flex items-center gap-3 font-body text-sm tracking-wider uppercase px-10 py-4 bg-gold text-background hover:bg-gold-light transition-all duration-500 font-medium"
              >
                Estoy listo. Quiero empezar.
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* Prerequisite */}
      <section className="py-28 md:py-36">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <FadeIn>
            <h2 className="font-display text-3xl md:text-5xl font-light mb-8">
              ¿Cómo empezar?
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-10">
              El Proceso Sanark comienza siempre con una Lectura Estructural. Es la lectura
              necesaria para saber exactamente desde dónde partes y qué estructuras están operando.
              Sin ese mapa, no hay intervención posible.
            </p>
          </FadeIn>
          <FadeIn delay={0.35}>
            <Link
              to="/lectura-estructural"
              className="group inline-flex items-center gap-3 font-body text-sm tracking-wider uppercase px-8 py-4 border border-gold/40 text-gold hover:bg-gold hover:text-background transition-all duration-500"
            >
              Comienza con tu Lectura Estructural
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* CTA — final */}
      <section ref={ctaRef} className="py-28 md:py-36 relative overflow-hidden">
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
            <p className="font-body text-base text-muted-foreground mb-12 max-w-xl mx-auto">
              Si ya hiciste tu Lectura Estructural y estás listo para el siguiente nivel, el
              Proceso Sanark es tu camino.
            </p>
          </FadeIn>
          <FadeIn delay={0.45}>
            <a
              href="mailto:info@sanark.com?subject=Información%20Proceso%20Sanark"
              className="group inline-flex items-center gap-3 font-body text-sm tracking-wider uppercase px-10 py-4 bg-gold text-background hover:bg-gold-light transition-all duration-500 font-medium"
            >
              Solicitar información
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default ProcesoSanark;
