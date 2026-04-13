import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import FadeIn from "@/components/shared/FadeIn";
import SectionDivider from "@/components/shared/SectionDivider";
import FloatingParticles from "@/components/shared/FloatingParticles";
import SanarkSymbol from "@/components/shared/SanarkSymbol";
import ScrollTextReveal from "@/components/shared/ScrollTextReveal";
import StickyRevealSection from "@/components/shared/StickyRevealSection";
import { ArrowRight, Layers, Flame, Map, Activity, HeartHandshake, Zap, DollarSign, Sparkles } from "lucide-react";
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
      {/* Hero — cinematic entry, no rings */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(38_50%_48%/0.1)_0%,transparent_70%)]" />

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
            <p className="font-body text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto mb-6 leading-relaxed">
              Una sesión que va directo a lo que sostiene tus patrones.
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

      {/* Apple-style sticky text reveal — What is it */}
      <StickyRevealSection scrollHeight={1.8}>
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <SectionDivider />
          <h2 className="font-display text-4xl md:text-6xl font-light mt-12 mb-10">
            ¿Qué es una Lectura Estructural?
          </h2>
          <p className="font-body text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            Es una lectura que va más allá de los síntomas, las emociones o los
            comportamientos visibles. Accede a la capa más profunda de tu
            funcionamiento.
          </p>
        </div>
      </StickyRevealSection>

      {/* Apple-style word-by-word scroll reveal */}
      <section className="py-28 md:py-36 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(38_50%_48%/0.03)_0%,transparent_50%)]" />
        <div className="container mx-auto px-6 max-w-3xl relative z-10">
          <ScrollTextReveal
            text="Los programas heredados actúan en múltiples dimensiones — física, emocional, mental, conductual, relacional y social — y determinan tus resultados de forma silenciosa pero constante."
            className="font-display text-3xl md:text-5xl font-light text-center text-foreground"
            as="h2"
          />
          <div className="mt-16">
            <ScrollTextReveal
              text="La Lectura Estructural los hace visibles. Te muestra qué estructura estás habitando y por qué ciertos patrones se repiten sin importar lo que hagas."
              className="font-body text-lg md:text-xl text-foreground/60 text-center leading-relaxed"
              as="p"
            />
          </div>
        </div>
      </section>

      {/* What it reveals — cards with scale */}
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
                icon: Layers,
                title: "Tu arquitectura heredada",
                desc: "Los programas instalados antes de tu consciencia que dictan cómo gestionas tu energía, tus vínculos, tu salud y tus recursos. Lo que nunca elegiste pero que sigue operando.",
              },
              {
                icon: Flame,
                title: "Tus fugas activas",
                desc: "Los puntos exactos donde pierdes energía, claridad y dirección de forma cíclica. Las repeticiones que ningún hábito nuevo ni ningún propósito ha logrado detener.",
              },
              {
                icon: Map,
                title: "Tu mapa estructural completo",
                desc: "Una visión clara de cómo estos programas operan en cada dimensión de tu vida: física, emocional, mental, relacional, social y financiera.",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
              <FadeIn key={i} delay={i * 0.15}>
                <motion.div
                  className="relative p-8 bg-card/80 backdrop-blur-sm border border-border/50 h-full hover:border-gold/20 transition-all duration-500 hover:glow-gold overflow-hidden group"
                  whileHover={{ scale: 1.03, y: -6 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/5 to-gold/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  
                  <Icon size={22} className="text-gold/70 mb-5 relative z-10" />
                  <h3 className="font-display text-xl font-medium mb-4 relative z-10">{item.title}</h3>
                  <p className="font-body text-sm text-foreground/50 leading-relaxed relative z-10">{item.desc}</p>
                </motion.div>
              </FadeIn>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Vision — What changes */}
      <section className="py-28 md:py-36 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(38_50%_48%/0.05)_0%,transparent_60%)]" />
        <div className="container mx-auto px-6 max-w-3xl relative z-10 text-center">
          <FadeIn>
            <Sparkles size={22} className="text-gold/60 mx-auto mb-5" />
            <h2 className="font-display text-3xl md:text-4xl font-light mb-6">
              Cuando ves la estructura, dejas de repetirla
            </h2>
            <p className="font-body text-base text-foreground/50 leading-relaxed mb-10 max-w-xl mx-auto">
              La Lectura Estructural es el primer paso hacia una vida donde la energía que tienes, la salud que experimentas, la pareja que eliges y el dinero que produces responden a ti — no a un programa heredado.
            </p>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Activity, label: "Energía" },
              { icon: HeartHandshake, label: "Pareja" },
              { icon: Zap, label: "Salud" },
              { icon: DollarSign, label: "Finanzas" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="p-4 border border-border/30 bg-card/30 hover:border-gold/30 transition-all duration-500 group">
                    <Icon size={18} className="text-gold/60 mx-auto mb-2 group-hover:text-gold transition-colors" />
                    <p className="font-display text-xs tracking-[0.2em] uppercase text-foreground/60 group-hover:text-foreground/80 transition-colors">{item.label}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
          <FadeIn delay={0.4}>
            <p className="font-body text-sm text-foreground/40 mt-8">
              Con el <Link to="/proceso-sanark" className="text-gold hover:text-gold-light transition-colors">Proceso Sanark de 4 fases</Link>, cada área se transforma desde la raíz.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-28 md:py-36">
        <div className="container mx-auto px-6 max-w-3xl">
          <FadeIn>
            <h2 className="font-display text-3xl md:text-5xl font-light text-center mb-12">
              Para quién es
            </h2>
          </FadeIn>
          <ScrollTextReveal
            text="Para personas que ya han recorrido un camino significativo de autoconocimiento. Que han hecho terapia, coaching o trabajo personal. Y que saben — aunque no puedan nombrarlo — que hay una capa más profunda que aún no han tocado."
            className="font-body text-lg md:text-xl text-foreground/60 text-center leading-relaxed"
            as="p"
          />
          <FadeIn delay={0.3}>
            <motion.p
              className="text-foreground font-medium text-center py-8 font-display text-2xl md:text-3xl"
              whileHover={{ scale: 1.02 }}
            >
              No es para quien busca motivación. Es para quien busca la raíz.
            </motion.p>
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
              <p className="font-body text-sm text-foreground/50 leading-relaxed mb-8 max-w-lg mx-auto">
                Una sesión individual conmigo donde leo la arquitectura
                desde la que operas. Sin interpretaciones. Sin suposiciones. Solo lo que está activo.
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
              <p className="font-body text-xs text-foreground/40 tracking-wider mb-10">
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
