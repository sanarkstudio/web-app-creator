import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import BookingFormDialog from "@/components/shared/BookingFormDialog";
import FadeIn from "@/components/shared/FadeIn";
import SectionDivider from "@/components/shared/SectionDivider";
import FloatingParticles from "@/components/shared/FloatingParticles";
import GenerativeParallax from "@/components/shared/GenerativeParallax";
import SanarkSymbol from "@/components/shared/SanarkSymbol";
import StickyRevealSection from "@/components/shared/StickyRevealSection";
import ScrollProgress from "@/components/shared/ScrollProgress";
import SectionConnector from "@/components/shared/SectionConnector";
import { ArrowRight, Layers, Flame, Map, Activity, HeartHandshake, Zap, DollarSign, Sparkles, Mail, CalendarCheck, MessageSquare, Lock, Footprints, Users, Eye } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import MobileExpandable from "@/components/shared/MobileExpandable";
import MobileStickyCTA from "@/components/shared/MobileStickyCTA";
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
      <ScrollProgress />
      <Helmet>
        <title>Lectura Estructural 1:1 · 90 min · 180€ | Sanark</title>
        <meta name="description" content="Sesión individual de 90 minutos donde leo la arquitectura que opera por debajo de tu consciencia y te muestro exactamente por qué se repite lo que se repite." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://sanark.com/lectura-estructural" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sanark.com/lectura-estructural" />
        <meta property="og:title" content="Lectura Estructural | Sanark — No lo que te pasa. Sino lo que lo sostiene." />
        <meta property="og:description" content="Sesión 1:1 de 90 minutos. Leo la arquitectura heredada que dirige tu cuerpo, tus relaciones, tus emociones y tu dinero. 180€ · Online · Plazas limitadas." />
        <meta property="og:image" content="https://sanark.com/og-image-sanark.jpg" />
        <meta property="og:locale" content="es_ES" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Lectura Estructural | Sanark" />
        <meta name="twitter:description" content="Sesión 1:1 de 90 minutos para ver la arquitectura que opera por debajo de tu consciencia. 180€ · Online." />
        <meta name="twitter:image" content="https://sanark.com/og-image-sanark.jpg" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Lectura Estructural",
          "provider": {
            "@type": "Person",
            "name": "Juan Carlos Sánchez Velázquez",
            "url": "https://sanark.com"
          },
          "description": "Sesión individual de 90 minutos donde se lee la arquitectura heredada que dirige el cuerpo, las emociones, las relaciones y el dinero del cliente.",
          "offers": {
            "@type": "Offer",
            "price": "180",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/LimitedAvailability"
          },
          "url": "https://sanark.com/lectura-estructural",
          "serviceType": "Decodificación Estructural de Vida",
          "areaServed": "ES",
          "availableChannel": {
            "@type": "ServiceChannel",
            "serviceType": "Online"
          }
        })}</script>
      </Helmet>
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
            <div className="flex justify-center mb-6 md:mb-10">
              <SanarkSymbol size={130} className="opacity-50 w-20 h-20 md:w-[130px] md:h-[130px]" />
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <motion.p
              className="font-body text-[10px] md:text-xs tracking-[0.35em] md:tracking-[0.5em] uppercase text-gold mb-5 md:mb-8"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              El punto de partida
            </motion.p>
          </FadeIn>

          <FadeIn delay={0.5}>
            <h1 className="font-display text-3xl md:text-6xl lg:text-7xl font-light leading-[1.1] md:leading-[1.05] mb-5 md:mb-6 text-shadow-gold">
              Lectura Estructural
            </h1>
          </FadeIn>

          <FadeIn delay={0.7}>
            <p className="font-body text-base md:text-lg text-foreground/85 max-w-2xl mx-auto mb-5 leading-relaxed">
              <span className="md:hidden">90 minutos. Veo la estructura invisible que dirige tu vida.</span>
              <span className="hidden md:inline">En 90 minutos veo la estructura invisible que dirige tu cuerpo, tus emociones, tus relaciones y tu dinero — y te muestro exactamente por qué se repite lo que se repite.</span>
            </p>
          </FadeIn>

          <FadeIn delay={0.85}>
            <motion.p
              className="font-display text-lg md:text-2xl font-light text-foreground max-w-xl mx-auto leading-snug mb-7 md:mb-8"
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
            <motion.a
              href="#reservar"
              onClick={() => trackCtaClick("Ver qué estructura opera en mí", "lectura_estructural_hero")}
              className="group relative inline-flex items-center gap-3 font-body text-xs md:text-sm tracking-wider uppercase px-8 md:px-12 py-4 md:py-5 bg-gold text-background hover:bg-gold-light transition-colors duration-500 font-semibold overflow-hidden"
              animate={{
                boxShadow: [
                  "0 0 30px hsl(38 50% 48% / 0.35)",
                  "0 0 55px hsl(38 50% 48% / 0.6)",
                  "0 0 30px hsl(38 50% 48% / 0.35)",
                ],
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-background/25 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000" />
              <span className="relative z-10 inline-flex items-center gap-3">
                Ver qué estructura opera en mí
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a>
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

      {/* Sticky reveal — what it is */}
      <StickyRevealSection scrollHeight={1.3}>
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <SectionDivider />
          <h2 className="font-display text-3xl md:text-6xl font-light mt-8 md:mt-12 mb-6 md:mb-8 leading-tight">
            <span className="gradient-text-gold">¿Qué es una Lectura Estructural?</span>
          </h2>
          <p className="font-body text-lg md:text-2xl text-foreground/90 max-w-2xl mx-auto leading-relaxed">
            Es la lectura precisa de eso que te hace volver a lo mismo aunque juraste que no lo harías. El motivo no está en lo que sientes ni en lo que piensas.
          </p>
          <p className="font-body text-base md:text-lg text-foreground/70 max-w-xl mx-auto leading-relaxed mt-4 md:mt-5">
            Es leer la capa más profunda: la subestructura de tu sistema, donde se activan los programas que heredaste sin elegirlos y que hoy condicionan cada decisión, cada vínculo y cada resultado.
          </p>
          <p className="font-body text-base md:text-lg text-foreground/70 max-w-xl mx-auto leading-relaxed italic mt-3 md:mt-4">
            Es trabajar con lo que realmente está activo — no con lo que crees que te pasa.
          </p>
        </div>
      </StickyRevealSection>

      {/* Inherited structure — cinematic, clean reveal */}
      <section className="py-16 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(38_50%_48%/0.05)_0%,transparent_60%)]" />
        <div className="container mx-auto px-6 max-w-3xl relative z-10 flex flex-col items-center text-center">
          <FadeIn>
            <span className="font-body text-xs md:text-sm tracking-[0.3em] uppercase text-gold/80 mb-6 md:mb-8 block">
              Lo que heredaste sin elegirlo
            </span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="font-display text-2xl md:text-5xl font-light text-foreground leading-tight">
              No solo tu <span className="text-gold">sistema familiar</span>. También tu{" "}
              <span className="text-gold">cultura</span>, tu <span className="text-gold">época</span> y tu{" "}
              <span className="text-gold">entorno</span> inscribieron programas que hoy actúan en automático.
            </h2>
          </FadeIn>

          <motion.div
            className="flex flex-wrap justify-center gap-2.5 md:gap-3 my-8 md:my-12 max-w-2xl"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
            }}
          >
            {["Física", "Emocional", "Mental", "Conductual", "Relacional", "Social"].map((dim) => (
              <motion.span
                key={dim}
                variants={{
                  hidden: { opacity: 0, y: 12, scale: 0.9 },
                  show: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.06, borderColor: "hsl(38 50% 48% / 0.5)" }}
                className="font-body text-xs md:text-sm tracking-wide text-foreground/75 border border-gold/20 rounded-full px-4 py-1.5 md:px-5 md:py-2 bg-secondary/40 cursor-default"
              >
                {dim}
              </motion.span>
            ))}
          </motion.div>

          <FadeIn delay={0.3}>
            <p className="font-display text-xl md:text-3xl font-light text-foreground/90 leading-snug max-w-2xl mx-auto">
              La Lectura los hace visibles — y te muestra por qué ciertos patrones se
              repiten sin importar lo que hagas.
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionConnector />

      {/* What it reveals — compact cards like home style */}
      <section ref={revealRef} className="py-14 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(38_50%_48%/0.06)_0%,transparent_60%)]" />
        <FloatingParticles count={25} />
        <motion.div style={{ scale: revealScale }} className="container mx-auto px-6 max-w-5xl relative z-10">
          {(() => {
            const reveals = [
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
            ];
            return (
              <>
                <FadeIn>
                  <h2 className="font-display text-2xl md:text-5xl font-light text-center mb-3 md:mb-4">
                    Lo que revela
                  </h2>
                  <p className="font-body text-base md:text-lg text-foreground/85 text-center mb-10 md:mb-14 tracking-wide max-w-2xl mx-auto">
                    Lo que ninguna otra lectura te ha mostrado
                  </p>
                </FadeIn>

                {/* Desktop */}
                <div className="hidden md:grid md:grid-cols-3 gap-5">
                  {reveals.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <FadeIn key={i} delay={i * 0.15}>
                        <motion.div
                          className="relative p-6 bg-card/50 backdrop-blur-sm border border-border/30 h-full hover:border-gold/30 transition-all duration-500 overflow-hidden group"
                          whileHover={{ y: -4 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/5 to-gold/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                          <Icon size={18} className="text-gold mb-3 relative z-10 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-3" />
                          <h3 className="font-display text-lg font-medium mb-3 relative z-10">{item.title}</h3>
                          <p className="font-body text-base text-foreground/85 leading-relaxed relative z-10">{item.desc}</p>
                        </motion.div>
                      </FadeIn>
                    );
                  })}
                </div>

                {/* Mobile carousel */}
                <div className="md:hidden -mx-6">
                  <Carousel opts={{ align: "start" }} className="w-full">
                    <CarouselContent className="px-6">
                      {reveals.map((item, i) => {
                        const Icon = item.icon;
                        return (
                          <CarouselItem key={i} className="basis-[85%] pl-4">
                            <div className="p-5 bg-card/60 backdrop-blur-sm border border-border/40 h-full min-h-[200px]">
                              <Icon size={20} className="text-gold mb-3" />
                              <h3 className="font-display text-base font-medium mb-2">{item.title}</h3>
                              <p className="font-body text-sm text-foreground/85 leading-relaxed">{item.desc}</p>
                            </div>
                          </CarouselItem>
                        );
                      })}
                    </CarouselContent>
                  </Carousel>
                  <p className="mt-4 text-center font-body text-[10px] tracking-[0.25em] uppercase text-gold/50">Desliza →</p>
                </div>
              </>
            );
          })()}
        </motion.div>
      </section>

      {/* Horizontal reveal — disruptive animation */}
      <section className="py-14 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(38_50%_48%/0.05)_0%,transparent_60%)]" />
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <FadeIn>
            <Sparkles size={20} className="text-gold mx-auto mb-4 md:mb-5" />
            <h2 className="font-display text-2xl md:text-4xl font-light text-center mb-4 md:mb-5 leading-tight">
              <span className="md:hidden">Sales con un mapa que antes no tenías</span>
              <span className="hidden md:inline">Después de tu Lectura, sales con un mapa que antes no tenías</span>
            </h2>
            <p className="font-body text-base md:text-xl text-foreground/85 text-center mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
              <span className="md:hidden">Te llevas evidencia precisa de tu propia arquitectura.</span>
              <span className="hidden md:inline">No te llevas teoría ni motivación. Te llevas evidencia precisa de tu propia arquitectura — qué la sostiene, dónde se fuga y por qué tus intentos previos no la han movido.</span>
            </p>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-5">
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
                    className="relative p-4 md:p-6 bg-card/50 backdrop-blur-sm border border-border/30 h-full hover:border-gold/30 transition-all duration-500 overflow-hidden group"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/5 to-gold/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3 relative z-10">
                      <Icon size={16} className="text-gold transition-transform duration-500 group-hover:scale-125 group-hover:rotate-3" />
                      <p className="font-display text-[10px] md:text-xs tracking-[0.2em] uppercase text-gold/80">{item.label}</p>
                    </div>
                    <p className="font-body text-sm md:text-base text-foreground/85 leading-relaxed relative z-10">{item.text}</p>
                  </motion.div>
                </FadeIn>
              );
            })}
          </div>

          <FadeIn delay={0.4}>
            <p className="font-body text-base md:text-lg text-foreground/85 mt-8 md:mt-10 text-center max-w-2xl mx-auto leading-relaxed">
              Verlo es el primer corte. Transformarlo es el trabajo del <Link to="/proceso-sanark" className="text-gold hover:text-gold-light transition-colors">Proceso Sanark de 4 fases</Link>.
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionConnector />

      {/* ¿Para quién es? */}
      <section className="py-16 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(38_50%_48%/0.06)_0%,transparent_60%)]" />
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <FadeIn>
            <span className="font-body text-xs md:text-sm tracking-[0.3em] uppercase text-gold/80 mb-4 block text-center">
              Antes de reservar
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-light text-center mb-10 md:mb-14">
              ¿Para quién es?
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-4 md:gap-5">
            {[
              { icon: Footprints, text: "Has recorrido un camino real de autoconocimiento." },
              { icon: Users, text: "Has hecho terapia, coaching o trabajo personal." },
              { icon: Eye, text: "Intuyes que hay una capa más honda que aún no has tocado." },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <FadeIn key={i} delay={i * 0.12}>
                  <motion.div
                    className="relative p-6 md:p-7 bg-card/50 backdrop-blur-sm border border-border/30 h-full hover:border-gold/30 transition-all duration-500 overflow-hidden group"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/5 to-gold/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <Icon size={20} className="text-gold mb-4 relative z-10 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-3" />
                    <p className="font-display text-lg md:text-xl font-light text-foreground/90 leading-snug relative z-10">
                      {item.text}
                    </p>
                  </motion.div>
                </FadeIn>
              );
            })}
          </div>

          <FadeIn delay={0.3}>
            <p className="font-display text-xl md:text-3xl font-light text-foreground/90 leading-snug max-w-2xl mx-auto text-center mt-12 md:mt-16">
              No es para quien necesita motivación. Es para quien busca un{" "}
              <span className="text-gold">cambio desde la raíz</span>.
            </p>
          </FadeIn>
        </div>
      </section>

      <SectionConnector />

      {/* Price box */}
      <section ref={ctaRef} id="reservar" className="py-14 md:py-32 relative overflow-hidden scroll-mt-24">
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
              <p className="font-body text-base md:text-lg text-foreground/85 leading-relaxed mb-8 max-w-lg mx-auto">
                Una sesión individual donde leo la arquitectura
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
              <p className="font-body text-xs text-foreground/85 tracking-wider mb-8">
                Sesión única 1:1 · 90 minutos · Online
              </p>

              {/* Qué pasa después de reservar */}
              <div className="text-left max-w-md mx-auto mb-10 border-t border-border/40 pt-8">
                <p className="font-body text-xs tracking-[0.3em] uppercase text-gold/80 mb-5 text-center">
                  Qué pasa después de reservar
                </p>
                <ul className="space-y-4">
                  {[
                    { icon: CalendarCheck, text: "Una vez confirmado el pago, te envío las fechas disponibles para agendar." },
                    { icon: MessageSquare, text: "El día de la sesión, conectamos por videollamada privada durante 90 minutos." },
                  ].map(({ icon: Icon, text }, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <Icon size={16} className="text-gold mt-0.5 shrink-0" />
                      <p className="font-body text-sm text-foreground/85 leading-relaxed">{text}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <BookingFormDialog
                cta="Sí. Quiero ver mi estructura."
                location="lectura_estructural_page"
                trigger={
                  <motion.button
                    className="group relative inline-flex items-center gap-3 font-body text-sm tracking-wider uppercase px-12 py-5 bg-gold text-background hover:bg-gold-light transition-colors duration-500 font-semibold overflow-hidden"
                    animate={{
                      boxShadow: [
                        "0 0 30px hsl(38 50% 48% / 0.35)",
                        "0 0 55px hsl(38 50% 48% / 0.6)",
                        "0 0 30px hsl(38 50% 48% / 0.35)",
                      ],
                    }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-background/25 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000" />
                    <span className="relative z-10 inline-flex items-center gap-3">
                      Sí. Quiero ver mi estructura.
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.button>
                }
              />
              <p className="mt-5 font-body text-sm text-foreground/90">
                Plazas limitadas · Te respondo personalmente en 24h
              </p>
            </motion.div>
          </FadeIn>
        </div>
      </section>
      <div className="md:hidden h-20" aria-hidden />
      <MobileStickyCTA cta="Reservar · 180€" location="lectura_estructural_sticky" meta="90 min · 1:1 · Plazas limitadas" />
    </Layout>
  );
};

export default LecturaEstructural;
