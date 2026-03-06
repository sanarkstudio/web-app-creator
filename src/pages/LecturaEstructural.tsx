import Layout from "@/components/layout/Layout";
import FadeIn from "@/components/shared/FadeIn";
import SectionDivider from "@/components/shared/SectionDivider";
import FloatingParticles from "@/components/shared/FloatingParticles";
import SanarkSymbol from "@/components/shared/SanarkSymbol";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

const LecturaEstructural = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(heroProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.85]);
  const heroY = useTransform(heroProgress, [0, 1], [0, 140]);
  const heroBlur = useTransform(heroProgress, [0, 0.8, 1], [0, 0, 8]);

  const lineRef = useRef(null);
  const lineInView = useInView(lineRef, { once: true, margin: "-100px" });

  const revealRef = useRef<HTMLElement>(null);
  const { scrollYProgress: revealProgress } = useScroll({
    target: revealRef,
    offset: ["start end", "end start"],
  });
  const revealScale = useTransform(revealProgress, [0, 0.5, 1], [0.92, 1, 0.98]);

  const ctaRef = useRef<HTMLElement>(null);
  const { scrollYProgress: ctaProgress } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"],
  });
  const ctaGlow = useTransform(ctaProgress, [0, 0.5, 1], [0, 0.15, 0.04]);

  return (
    <Layout>
      {/* Hero — cinematic slider-style entry */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(38_50%_48%/0.1)_0%,transparent_70%)]" />
        
        {/* Animated radial rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[1, 2, 3].map((ring) => (
            <motion.div
              key={ring}
              className="absolute rounded-full border border-gold/5"
              style={{
                width: `${ring * 30}vw`,
                height: `${ring * 30}vw`,
              }}
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 6 + ring * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: ring * 0.8,
              }}
            />
          ))}
        </div>

        <FloatingParticles count={60} />

        <motion.div
          style={{
            opacity: heroOpacity,
            scale: heroScale,
            y: heroY,
            filter: useTransform(heroBlur, (v) => `blur(${v}px)`),
          }}
          className="relative z-10 container mx-auto px-6 text-center max-w-4xl"
        >
          <FadeIn delay={0}>
            <div className="flex justify-center mb-10">
              <SanarkSymbol size={130} className="opacity-50" />
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <motion.p
              className="font-body text-xs tracking-[0.5em] uppercase text-gold mb-8"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              El punto de partida
            </motion.p>
          </FadeIn>

          <FadeIn delay={0.5}>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light leading-[1.05] mb-8 text-shadow-gold">
              Lectura Estructural
            </h1>
          </FadeIn>

          <FadeIn delay={0.7}>
            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed">
              Una lectura profunda que revela la estructura desde la que operas.
            </p>
          </FadeIn>

          <FadeIn delay={0.85}>
            <motion.p
              className="font-display text-2xl md:text-3xl font-light text-foreground max-w-xl mx-auto leading-snug"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              No lo que te pasa.{" "}
              <span className="gradient-text-gold font-medium">Sino lo que lo sostiene.</span>
            </motion.p>
          </FadeIn>
        </motion.div>

        {/* Scroll indicator */}
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

      {/* What is it — parallax section */}
      <section className="py-28 md:py-36 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(38_50%_48%/0.03)_0%,transparent_50%)]" />
        <div className="container mx-auto px-6 max-w-3xl relative z-10">
          <FadeIn><SectionDivider /></FadeIn>
          <FadeIn delay={0.15}>
            <h2 className="font-display text-3xl md:text-5xl font-light text-center mt-12 mb-10">
              ¿Qué es una Lectura Estructural?
            </h2>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="space-y-6 font-body text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Es una lectura que va más allá de los síntomas, las emociones o los
                comportamientos visibles. Accede a la capa más profunda de tu
                funcionamiento: los programas heredados que configuran tu manera de operar.
              </p>
              <p>
                Estos programas actúan en múltiples dimensiones —física, emocional, mental,
                conductual, relacional y social— y determinan tus resultados de forma silenciosa
                pero constante.
              </p>
              <motion.p
                className="text-foreground font-medium text-lg md:text-xl text-center py-6"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                La Lectura Estructural los hace visibles. Te muestra con precisión qué estructura
                estás habitando y por qué ciertos patrones se repiten sin importar lo que hagas.
              </motion.p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* What it reveals — slider-style cards */}
      <section ref={revealRef} className="py-28 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(38_50%_48%/0.06)_0%,transparent_60%)]" />
        <FloatingParticles count={25} />
        <motion.div style={{ scale: revealScale }} className="container mx-auto px-6 max-w-5xl relative z-10">
          <FadeIn>
            <h2 className="font-display text-3xl md:text-5xl font-light text-center mb-16">
              Lo que revela
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Tu arquitectura heredada",
                desc: "Los programas instalados antes de tu consciencia que dictan cómo gestionas tu energía, tus vínculos, tu salud y tus recursos. Lo que nunca elegiste pero que sigue operando.",
              },
              {
                title: "Tus fugas activas",
                desc: "Los puntos exactos donde pierdes energía, claridad y dirección de forma cíclica. Las repeticiones que ningún hábito nuevo, ninguna terapia ni ningún propósito ha logrado detener.",
              },
              {
                title: "Tu mapa estructural completo",
                desc: "Una visión precisa de cómo estos programas operan en cada dimensión de tu vida: física, emocional, mental, relacional, social y financiera.",
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <motion.div
                  className="relative p-8 bg-card/80 backdrop-blur-sm border border-border/50 h-full hover:border-gold/20 transition-all duration-500 hover:glow-gold overflow-hidden group"
                  whileHover={{ scale: 1.03, y: -6 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Gold sweep effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/5 to-gold/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  
                  <div className="w-8 h-px bg-gold mb-6 relative z-10" />
                  <h3 className="font-display text-xl font-medium mb-4 relative z-10">{item.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed relative z-10">{item.desc}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Who is it for — interactive list */}
      <section className="py-28 md:py-36">
        <div className="container mx-auto px-6 max-w-3xl">
          <FadeIn>
            <h2 className="font-display text-3xl md:text-5xl font-light text-center mb-12">
              Para quién es
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="space-y-6 font-body text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Para personas que ya han recorrido un camino significativo de autoconocimiento.
                Que han hecho terapia, coaching, trabajo personal o espiritual. Y que saben —aunque
                quizá no puedan nombrarlo— que hay una capa más profunda que aún no han tocado.
              </p>
              <motion.p
                className="text-foreground font-medium text-center py-4"
                whileHover={{ scale: 1.02 }}
              >
                No es para quien busca motivación. Es para quien busca la raíz.
              </motion.p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Price box — with dynamic glow */}
      <section ref={ctaRef} className="py-28 md:py-36 relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            background: useTransform(ctaGlow, (v) => `radial-gradient(ellipse at center, hsl(38 50% 48% / ${v}) 0%, transparent 60%)`),
          }}
        />
        <FloatingParticles count={15} />
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
                Sesión individual
              </p>
              <h3 className="font-display text-2xl md:text-3xl font-light mb-4">
                90 minutos · 1 lectura · Tu estructura al descubierto
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8 max-w-lg mx-auto">
                Una sesión individual conmigo donde leo con precisión la arquitectura
                desde la que operas. Sin interpretaciones. Sin suposiciones. Solo lo que está operando.
              </p>
              <motion.p
                className="font-display text-5xl md:text-6xl font-light text-gold mb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                180€
              </motion.p>
              <p className="font-body text-xs text-muted-foreground tracking-wider mb-10">
                Sesión única 1:1 · 90 minutos
              </p>
              <a
                href="mailto:info@sanark.com?subject=Quiero%20mi%20Lectura%20Estructural"
                className="group inline-flex items-center gap-3 font-body text-sm tracking-wider uppercase px-10 py-4 bg-gold text-background hover:bg-gold-light transition-all duration-500 font-medium"
              >
                Quiero mi Lectura Estructural
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default LecturaEstructural;
