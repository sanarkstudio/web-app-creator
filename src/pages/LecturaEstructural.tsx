import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import BookingFormDialog from "@/components/shared/BookingFormDialog";
import FadeIn from "@/components/shared/FadeIn";
import SectionDivider from "@/components/shared/SectionDivider";
import FloatingParticles from "@/components/shared/FloatingParticles";
import GenerativeParallax from "@/components/shared/GenerativeParallax";
import SanarkSymbol from "@/components/shared/SanarkSymbol";
import ScrollTextReveal from "@/components/shared/ScrollTextReveal";
import StickyRevealSection from "@/components/shared/StickyRevealSection";
import { ArrowRight, Layers, Flame, Map, Activity, HeartHandshake, Zap, DollarSign, Sparkles, Mail, CalendarCheck, MessageSquare, Lock } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { trackCtaClick } from "@/lib/analytics";

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
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <GenerativeParallax density={75} intensity={0.9} />

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
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light leading-[1.05] mb-6 text-shadow-gold">
              Lectura Estructural
            </h1>
          </FadeIn>

          <FadeIn delay={0.7}>
            <p className="font-body text-base md:text-lg text-foreground/70 max-w-2xl mx-auto mb-5 leading-relaxed">
              En 90 minutos veo la estructura invisible que dirige tu cuerpo, tus emociones, tus relaciones y tu dinero — y te muestro exactamente por qué se repite lo que se repite.
            </p>
          </FadeIn>

          <FadeIn delay={0.85}>
            <motion.p
              className="font-display text-xl md:text-2xl font-light text-foreground max-w-xl mx-auto leading-snug mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              No lo que te pasa.{" "}
              <span className="gradient-text-gold font-medium">Sino lo que lo sostiene.</span>
            </motion.p>
          </FadeIn>

          <FadeIn delay={1.1}>
            <a
              href="#reservar"
              onClick={() => trackCtaClick("Reservar mi Lectura", "lectura_estructural_hero")}
              className="group inline-flex items-center gap-3 font-body text-sm tracking-wider uppercase px-12 py-5 bg-gold text-background hover:bg-gold-light transition-all duration-500 font-semibold shadow-[0_0_40px_hsl(38_50%_48%/0.4)] hover:shadow-[0_0_60px_hsl(38_50%_48%/0.6)]"
            >
              Reservar mi Lectura
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
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

      {/* Sticky reveal — expanded text */}
      <StickyRevealSection scrollHeight={1.8}>
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <SectionDivider />
          <h2 className="font-display text-4xl md:text-6xl font-light mt-12 mb-10">
            <span className="gradient-text-gold">¿Qué es una Lectura Estructural?</span>
          </h2>
          <p className="font-body text-xl md:text-2xl text-foreground/75 max-w-2xl mx-auto leading-relaxed mb-6">
            Es una lectura que va más allá de los síntomas o las emociones visibles.
            Accede a la capa más profunda de tu funcionamiento — esa que determina
            por qué repites lo que repites, por qué te agotas siempre de la misma
            forma, por qué tus relaciones siguen un guión invisible y por qué el
            dinero se comporta siempre igual en tu vida.
          </p>
          <p className="font-body text-xl md:text-2xl text-foreground/75 max-w-2xl mx-auto leading-relaxed mb-6">
            No es terapia, no es coaching, no es interpretación. Es una decodificación
            precisa de los programas que tu sistema familiar inscribió en ti — programas
            que hoy operan en automático y que condicionan cada decisión, cada vínculo
            y cada resultado sin que seas consciente de ello.
          </p>
          <p className="font-body text-lg text-foreground/55 max-w-xl mx-auto leading-relaxed italic">
            Trabajo con lo que realmente está activo — no con lo que crees que te pasa.
          </p>
        </div>
      </StickyRevealSection>

      {/* Word-by-word scroll reveal */}
      <section className="py-28 md:py-36 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(38_50%_48%/0.03)_0%,transparent_50%)]" />
        <div className="container mx-auto px-6 max-w-3xl relative z-10">
          <ScrollTextReveal
            text="Los programas heredados actúan en múltiples dimensiones — física, emocional, mental, conductual, relacional y social — y determinan tus resultados de forma silenciosa pero constante."
            className="font-display text-2xl md:text-4xl font-light text-center text-foreground leading-snug"
            as="h2"
          />
          <div className="mt-16">
            <ScrollTextReveal
              text="La Lectura Estructural los hace visibles. Te muestra qué estructura estás habitando y por qué ciertos patrones se repiten sin importar lo que hagas."
              className="font-body text-xl md:text-2xl text-foreground/75 text-center leading-relaxed"
              as="p"
            />
          </div>
        </div>
      </section>

      {/* What it reveals — compact cards like home style */}
      <section ref={revealRef} className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(38_50%_48%/0.06)_0%,transparent_60%)]" />
        <FloatingParticles count={25} />
        <motion.div style={{ scale: revealScale }} className="container mx-auto px-6 max-w-5xl relative z-10">
          <FadeIn>
            <h2 className="font-display text-3xl md:text-5xl font-light text-center mb-4">
              Lo que revela
            </h2>
            <p className="font-body text-base md:text-lg text-foreground/65 text-center mb-14 tracking-wide max-w-2xl mx-auto">
              Lo que ninguna otra lectura te ha mostrado
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: Layers,
                title: "Tu arquitectura heredada",
                desc: "Los programas que tu sistema familiar instaló en ti — patrones, creencias y formas de funcionar que hoy dictan cómo gestionas tu energía, tus vínculos, tu salud y tus recursos.",
              },
              {
                icon: Flame,
                title: "Tus fugas activas",
                desc: "Los puntos exactos donde pierdes energía, claridad y dirección de forma cíclica. Las repeticiones que ningún hábito nuevo ha logrado detener.",
              },
              {
                icon: Map,
                title: "Tu mapa estructural",
                desc: "Una visión clara de cómo estos programas operan en cada dimensión de tu vida: física, emocional, mental, relacional, social y financiera.",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <FadeIn key={i} delay={i * 0.15}>
                  <motion.div
                    className="relative p-6 bg-card/50 backdrop-blur-sm border border-border/30 h-full hover:border-gold/30 transition-all duration-500 overflow-hidden group"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/5 to-gold/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <Icon size={18} className="text-gold mb-3 relative z-10" />
                    <h3 className="font-display text-lg font-medium mb-3 relative z-10">{item.title}</h3>
                    <p className="font-body text-base text-foreground/70 leading-relaxed relative z-10">{item.desc}</p>
                  </motion.div>
                </FadeIn>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Horizontal reveal — disruptive animation */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(38_50%_48%/0.05)_0%,transparent_60%)]" />
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <FadeIn>
            <Sparkles size={20} className="text-gold mx-auto mb-5" />
            <h2 className="font-display text-3xl md:text-4xl font-light text-center mb-5">
              Después de tu Lectura, sales con un mapa que antes no tenías
            </h2>
            <p className="font-body text-lg md:text-xl text-foreground/70 text-center mb-12 max-w-2xl mx-auto leading-relaxed">
              No te llevas teoría ni motivación. Te llevas evidencia precisa de tu propia arquitectura — qué la sostiene, dónde se fuga y por qué tus intentos previos no la han movido.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { icon: Activity, label: "Tu cuerpo", text: "Identificas el patrón energético que se repite y dónde tu sistema colapsa de forma cíclica." },
              { icon: HeartHandshake, label: "Tus vínculos", text: "Ves el guión invisible que se activa en tus relaciones — y por qué siempre acaba igual." },
              { icon: Zap, label: "Tu salud", text: "Reconoces qué emociones heredadas se están expresando como síntoma físico." },
              { icon: DollarSign, label: "Tu dinero", text: "Descubres el techo estructural que limita tus ingresos sin importar tu esfuerzo." },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <FadeIn key={i} delay={i * 0.12}>
                  <motion.div
                    className="relative p-6 bg-card/50 backdrop-blur-sm border border-border/30 h-full hover:border-gold/30 transition-all duration-500 overflow-hidden group"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/5 to-gold/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <div className="flex items-center gap-3 mb-3 relative z-10">
                      <Icon size={18} className="text-gold" />
                      <p className="font-display text-xs tracking-[0.2em] uppercase text-gold/80">{item.label}</p>
                    </div>
                    <p className="font-body text-base text-foreground/70 leading-relaxed relative z-10">{item.text}</p>
                  </motion.div>
                </FadeIn>
              );
            })}
          </div>

          <FadeIn delay={0.4}>
            <p className="font-body text-base md:text-lg text-foreground/65 mt-10 text-center max-w-2xl mx-auto leading-relaxed">
              Verlo es el primer corte. Transformarlo es el trabajo del <Link to="/proceso-sanark" className="text-gold hover:text-gold-light transition-colors">Proceso Sanark de 4 fases</Link>.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ¿Para quién es? */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-3xl">
          <FadeIn>
            <h2 className="font-display text-3xl md:text-5xl font-light text-center mb-12">
              ¿Para quién es?
            </h2>
          </FadeIn>
          <ScrollTextReveal
            text="¿Has recorrido un camino significativo de autoconocimiento? ¿Has hecho terapia, coaching o trabajo personal? ¿Sabes — aunque no puedas nombrarlo — que hay una capa más profunda que aún no has tocado?"
            className="font-body text-xl md:text-2xl text-foreground/75 text-center leading-relaxed"
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

      {/* Price box */}
      <section ref={ctaRef} id="reservar" className="py-24 md:py-32 relative overflow-hidden scroll-mt-24">
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
              <p className="font-body text-base md:text-lg text-foreground/70 leading-relaxed mb-8 max-w-lg mx-auto">
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
              <p className="font-body text-xs text-foreground/40 tracking-wider mb-8">
                Sesión única 1:1 · 90 minutos · Online
              </p>

              {/* Qué pasa después de reservar */}
              <div className="text-left max-w-md mx-auto mb-10 border-t border-border/40 pt-8">
                <p className="font-body text-xs tracking-[0.3em] uppercase text-gold/80 mb-5 text-center">
                  Qué pasa después de reservar
                </p>
                <ul className="space-y-4">
                  {[
                    { icon: Mail, text: "Recibes un email de confirmación con el enlace de pago seguro." },
                    { icon: CalendarCheck, text: "Una vez confirmado el pago, te envío las fechas disponibles para agendar." },
                    { icon: MessageSquare, text: "El día de la sesión, conectamos por videollamada privada durante 90 minutos." },
                    { icon: Lock, text: "Todo lo que se trabaje queda entre nosotros. Confidencialidad absoluta." },
                  ].map(({ icon: Icon, text }, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <Icon size={16} className="text-gold mt-0.5 shrink-0" />
                      <p className="font-body text-sm text-foreground/65 leading-relaxed">{text}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <BookingFormDialog
                cta="Reservar mi Lectura ahora"
                location="lectura_estructural_page"
                trigger={
                  <button className="group inline-flex items-center gap-3 font-body text-sm tracking-wider uppercase px-12 py-5 bg-gold text-background hover:bg-gold-light transition-all duration-500 font-semibold shadow-[0_0_40px_hsl(38_50%_48%/0.4)] hover:shadow-[0_0_60px_hsl(38_50%_48%/0.6)]">
                    Reservar mi Lectura ahora
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                }
              />
              <p className="mt-5 font-body text-sm text-foreground/50">
                Plazas limitadas · Te respondo personalmente en 24h
              </p>
            </motion.div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default LecturaEstructural;
