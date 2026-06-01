import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import BookingFormDialog from "@/components/shared/BookingFormDialog";
import FadeIn from "@/components/shared/FadeIn";
import SectionDivider from "@/components/shared/SectionDivider";
import FloatingParticles from "@/components/shared/FloatingParticles";
import GenerativeParallax from "@/components/shared/GenerativeParallax";
import SanarkSymbol from "@/components/shared/SanarkSymbol";
import ScrollTextReveal from "@/components/shared/ScrollTextReveal";
import StickyRevealSection from "@/components/shared/StickyRevealSection";
import VideoExplainer from "@/components/shared/VideoExplainer";
import FaqSection from "@/components/shared/FaqSection";
import { ArrowRight, Flame, Heart, DollarSign, Brain, Users, Zap, ShieldOff, Eye, Target, Sparkles, Activity, HeartHandshake, Gem, TrendingUp } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import MobileExpandable from "@/components/shared/MobileExpandable";
import { trackCtaClick } from "@/lib/analytics";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import juanCarlosImg from "@/assets/juan-carlos.jpg";

const identItems = [
  {
    icon: Zap,
    text: "Tu cuerpo lleva tiempo avisando: agotamiento que el descanso no repara, tensiones que vuelven, malestares o síntomas que nadie termina de nombrar.",
  },
  {
    icon: Heart,
    text: "Tus vínculos cambian de rostro pero repiten la misma forma. Pareja, familia, amistades, trabajo — distintos escenarios, las mismas dinámicas, los mismos desencuentros.",
  },
  {
    icon: DollarSign,
    text: "Tu relación con el dinero tiene un límite invisible. Te cuesta generar lo que querrías, o lo generas y no se queda — algo en tu estructura no lo deja expandirse.",
  },
  {
    icon: Brain,
    text: "Tu mente no descansa. Analizas, anticipas, dudas — y cuando llega el momento de decidir, el ruido pesa más que la claridad.",
  },
  {
    icon: Users,
    text: "En tus relaciones das más de lo que recibes. Sostienes, cumples, te adaptas, callas — y por dentro hay un desgaste que pocos ven.",
  },
  {
    icon: ShieldOff,
    text: "Has recorrido caminos — terapia, formaciones, prácticas, procesos — y aun así sientes que algo esencial sigue sin moverse.",
  },
  {
    icon: Flame,
    text: "Por fuera todo funciona, por dentro algo no se calma. Ansiedad, vacío, desconexión, hartazgo — y ya no distingues qué es tuyo y qué heredaste.",
  },
  {
    icon: Target,
    text: "Sabes hacia dónde quieres ir, pero algo se interpone justo antes de llegar. No es falta de voluntad ni de recursos — es una estructura que no lo permite.",
  },
];

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const heroBlur = useTransform(scrollYProgress, [0, 0.8, 1], [0, 0, 8]);

  const solutionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: solutionProgress } = useScroll({
    target: solutionRef,
    offset: ["start end", "end start"],
  });
  const solutionScale = useTransform(solutionProgress, [0, 0.5, 1], [0.95, 1, 0.98]);

  const bioRef = useRef<HTMLElement>(null);
  const { scrollYProgress: bioProgress } = useScroll({
    target: bioRef,
    offset: ["start end", "end start"],
  });
  const bioTextX = useTransform(bioProgress, [0, 0.5], [60, 0]);
  const bioTextOpacity = useTransform(bioProgress, [0, 0.4], [0, 1]);

  const identRef = useRef<HTMLElement>(null);
  const { scrollYProgress: identProgress } = useScroll({
    target: identRef,
    offset: ["start end", "end start"],
  });
  const identScale = useTransform(identProgress, [0, 0.4], [0.9, 1]);

  const lineRef = useRef(null);
  const lineInView = useInView(lineRef, { once: true, margin: "-100px" });

  const finalRef = useRef<HTMLElement>(null);
  const { scrollYProgress: finalProgress } = useScroll({
    target: finalRef,
    offset: ["start end", "end start"],
  });
  const finalGlow = useTransform(finalProgress, [0, 0.5, 1], [0, 0.12, 0.04]);

  return (
    <Layout>
      <Helmet>
        <title>Decodificación Estructural de Vida | Sanark</title>
        <meta name="description" content="Descubre la arquitectura heredada que dirige tu vida. Lectura Estructural 1:1 de 90 minutos con Juan Carlos Sánchez Velázquez." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://sanark.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sanark.com/" />
        <meta property="og:title" content="Tu vida no se repite por azar. Se repite por estructura." />
        <meta property="og:description" content="Decodificación Estructural de Vida. Una metodología para ver la arquitectura heredada que opera bajo tu consciencia y comenzar a construir una nueva." />
        <meta property="og:image" content="https://sanark.com/og-image-sanark.jpg" />
        <meta property="og:locale" content="es_ES" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tu vida no se repite por azar. Se repite por estructura." />
        <meta name="twitter:description" content="Decodificación Estructural de Vida. Una metodología para ver la arquitectura heredada que opera bajo tu consciencia." />
        <meta name="twitter:image" content="https://sanark.com/og-image-sanark.jpg" />
      </Helmet>
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <GenerativeParallax density={80} intensity={1} />

        <motion.div
          style={{
            opacity: heroOpacity,
            scale: heroScale,
            y: heroY,
            filter: useTransform(heroBlur, (v) => `blur(${v}px)`),
          }}
          className="relative z-10 container mx-auto px-6 text-center max-w-5xl"
        >
          <FadeIn delay={0}>
            <div className="flex justify-center mb-6 md:mb-10">
              <SanarkSymbol size={140} className="opacity-50 w-20 h-20 md:w-[140px] md:h-[140px]" />
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="font-body text-[10px] md:text-xs tracking-[0.35em] md:tracking-[0.5em] uppercase text-gold mb-5 md:mb-8">
              Decodificación Estructural de Vida
            </p>
          </FadeIn>

          <FadeIn delay={0.6}>
            <h1 className="font-display text-3xl md:text-6xl lg:text-7xl font-light leading-[1.1] md:leading-[1.05] mb-5 md:mb-6 text-shadow-gold">
              Tu vida no se repite por azar.
              <br />
              <span className="gradient-text-gold font-medium">Se repite por estructura.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.8}>
            <p className="font-body text-base md:text-lg text-foreground/85 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed">
              <span className="md:hidden">No es falta de voluntad. Es una arquitectura heredada. Hoy puedes verla.</span>
              <span className="hidden md:inline">No es falta de voluntad ni de información. Es una arquitectura heredada operando bajo tu consciencia. Hoy puedes verla — y comenzar a construir una nueva.</span>
            </p>
          </FadeIn>

          <FadeIn delay={1}>
            <div className="flex justify-center items-center">
              <Link
                to="/lectura-basica"
                onClick={() => trackCtaClick("Ver mi estructura gratis", "home_hero")}
                className="group inline-flex items-center gap-3 font-body text-xs md:text-sm tracking-wider uppercase px-8 md:px-12 py-4 md:py-5 bg-gold text-background hover:bg-gold-light transition-all duration-500 font-semibold shadow-[0_0_40px_hsl(38_50%_48%/0.4)] hover:shadow-[0_0_60px_hsl(38_50%_48%/0.6)]"
              >
                <span className="md:hidden">Ver mi estructura · Gratis</span>
                <span className="hidden md:inline">Ver mi estructura · Gratis en 15 preguntas</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
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

      {/* Video explainer — 60-90s */}
      <VideoExplainer />

      {/* Apple-style sticky reveal — Problem */}
      <StickyRevealSection scrollHeight={2}>
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <SectionDivider />
          <h2 className="font-display text-3xl md:text-6xl lg:text-7xl font-light mt-8 md:mt-12 mb-6 md:mb-10 leading-tight">
            Has cambiado hábitos
            <br />
            <span className="gradient-text-gold my-[2px]">pero el patrón permanece</span>
          </h2>
          <p className="font-body text-lg md:text-2xl text-foreground/85 max-w-2xl mx-auto leading-relaxed">
            <span className="md:hidden">Hay una capa más profunda que nadie te ha mostrado: la estructura desde la que operas.</span>
            <span className="hidden md:inline">No es que no hayas avanzado. Es que hay una capa más profunda que nadie te ha mostrado: la estructura desde la que operas.</span>
          </p>
        </div>
      </StickyRevealSection>

      {/* Apple-style word-by-word reveal */}
      <section className="py-16 md:py-36 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(38_50%_48%/0.04)_0%,transparent_50%)]" />
        <div className="container mx-auto px-6 max-w-3xl relative z-10">
          <ScrollTextReveal
            text="Un programa heredado, inscrito en tu sistema antes de que tuvieras palabras para nombrarlo. Esa estructura decide cómo gestionas tu energía, cómo te relacionas, qué permites y qué no. Y mientras siga ahí, cualquier cambio será temporal."
            className="font-display text-xl md:text-4xl font-light text-center text-foreground leading-snug"
            as="h2"
          />
        </div>
      </section>

      {/* Solution — the path */}
      <section ref={solutionRef} className="py-20 md:py-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(38_50%_48%/0.06)_0%,transparent_60%)]" />
        <FloatingParticles count={20} />
        <motion.div style={{ scale: solutionScale }} className="container mx-auto px-6 max-w-5xl relative z-10">
          <FadeIn>
            <div className="flex justify-center mb-5 md:mb-6">
              <Eye size={28} className="text-gold/60" />
            </div>
            <p className="font-body text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase text-gold text-center mb-5 md:mb-6">
              Lo que hago
            </p>
            <h2 className="font-display text-2xl md:text-5xl font-light text-center mb-10 md:mb-16 leading-tight">
              Revelar lo que se esconde
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
            <FadeIn delay={0.15}>
              <Link
                to="/lectura-estructural"
                onClick={() => trackCtaClick("Entrar a la Lectura", "home_solution_card")}
                className="group block p-6 md:p-10 bg-card/80 backdrop-blur-sm border border-border/50 hover:border-gold/30 transition-all duration-500 hover:glow-gold h-full"
              >
                <Flame size={22} className="text-gold mb-3 md:mb-4" />
                <p className="font-body text-[10px] md:text-xs tracking-[0.3em] uppercase text-gold mb-3 md:mb-4">Paso 1</p>
                <h3 className="font-display text-xl md:text-3xl font-light mb-3 md:mb-4">Lectura Estructural</h3>
                <p className="font-body text-sm text-foreground/80 leading-relaxed mb-5 md:mb-6">
                  <span className="md:hidden">Lectura profunda de la estructura desde la que operas hoy.</span>
                  <span className="hidden md:inline">Una lectura profunda que revela la estructura desde la que operas: qué programas heredados dirigen tu vida física, emocional, relacional y financiera.</span>
                </p>
                <span className="inline-flex items-center gap-2 text-gold text-xs md:text-sm font-body tracking-wider uppercase group-hover:gap-4 transition-all duration-300">
                  Entrar a la Lectura <ArrowRight size={14} />
                </span>
              </Link>
            </FadeIn>
            <FadeIn delay={0.3}>
              <Link
                to="/proceso-sanark"
                onClick={() => trackCtaClick("Conocer el proceso", "home_solution_card")}
                className="group block p-6 md:p-10 bg-card/80 backdrop-blur-sm border border-border/50 hover:border-gold/30 transition-all duration-500 hover:glow-gold h-full"
              >
                <Zap size={22} className="text-gold mb-3 md:mb-4" />
                <p className="font-body text-[10px] md:text-xs tracking-[0.3em] uppercase text-gold mb-3 md:mb-4">Paso 2</p>
                <h3 className="font-display text-xl md:text-3xl font-light mb-3 md:mb-4">Proceso Sanark</h3>
                <p className="font-body text-sm text-foreground/80 leading-relaxed mb-5 md:mb-6">
                  <span className="md:hidden">12 sesiones para crear y habitar una nueva estructura.</span>
                  <span className="hidden md:inline">12 sesiones individuales para detectar, diseñar, crear y habitar una nueva estructura. No se trata de mejorar la versión actual. Se trata de operar desde otro lugar.</span>
                </p>
                <span className="inline-flex items-center gap-2 text-gold text-xs md:text-sm font-body tracking-wider uppercase group-hover:gap-4 transition-all duration-300">
                  Conocer el proceso <ArrowRight size={14} />
                </span>
              </Link>
            </FadeIn>
          </div>
        </motion.div>
      </section>

      {/* Identification — with icons */}
      <section ref={identRef} className="py-20 md:py-48 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(38_50%_48%/0.03)_0%,transparent_60%)]" />
        <motion.div
          style={{ scale: identScale }}
          className="container mx-auto px-6 max-w-4xl relative z-10"
        >
          <FadeIn>
            <h2 className="font-display text-2xl md:text-5xl font-light mb-4 md:mb-6 leading-tight text-center">
              El patrón que se repite
            </h2>
            <p className="font-body text-base md:text-lg text-foreground/80 text-center mb-10 md:mb-16 tracking-wide max-w-2xl mx-auto">
              Diferentes áreas de tu vida, una misma estructura operando por debajo.
            </p>
          </FadeIn>

          {/* Desktop: grid 2 columnas */}
          <div className="hidden md:grid md:grid-cols-2 gap-6">
            {identItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <FadeIn key={i} delay={i * 0.1}>
                  <motion.div
                    className="flex gap-5 p-6 bg-card/50 backdrop-blur-sm border border-border/30 hover:border-gold/30 transition-all duration-500 cursor-default group h-full"
                    whileHover={{ x: 6, borderColor: "hsl(38 50% 48% / 0.4)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex-shrink-0 mt-1">
                      <Icon size={22} strokeWidth={1.75} className="text-gold group-hover:text-gold-light transition-colors duration-300" />
                    </div>
                    <p className="font-body text-base md:text-lg text-foreground/90 leading-relaxed group-hover:text-foreground transition-colors duration-300">
                      {item.text}
                    </p>
                  </motion.div>
                </FadeIn>
              );
            })}
          </div>

          {/* Mobile: carousel swipeable */}
          <div className="md:hidden -mx-6">
            <Carousel opts={{ align: "start", loop: false }} className="w-full">
              <CarouselContent className="px-6">
                {identItems.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <CarouselItem key={i} className="basis-[85%] pl-4">
                      <div className="flex gap-4 p-5 bg-card/60 backdrop-blur-sm border border-border/40 h-full min-h-[180px]">
                        <div className="flex-shrink-0 mt-1">
                          <Icon size={22} strokeWidth={1.75} className="text-gold" />
                        </div>
                        <p className="font-body text-sm text-foreground/80 leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </Carousel>
            <p className="mt-4 text-center font-body text-[10px] tracking-[0.25em] uppercase text-gold/50">
              Desliza →
            </p>
          </div>

          <FadeIn delay={0.7}>
            <div className="mt-12 md:mt-16 p-6 md:p-8 border border-gold/20 bg-card/30 backdrop-blur-sm text-center">
              <SanarkSymbol size={36} className="mx-auto mb-4 md:mb-5 opacity-40" />
              <p className="font-display text-lg md:text-2xl text-foreground/90 font-light leading-relaxed mb-2">
                Si estás listo para acceder a un nivel más avanzado —
              </p>
              <p className="font-display text-lg md:text-2xl font-light leading-relaxed">
                el de crear desde una estructura nueva —{" "}
                <span className="text-gold font-medium">este es tu punto de entrada.</span>
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.85}>
            <div className="mt-8 md:mt-10 text-center">
              <BookingFormDialog
                cta="Reservar mi Lectura Estructural"
                location="home_identification"
                trigger={
                  <button className="group inline-flex items-center gap-3 font-body text-xs md:text-sm tracking-wider uppercase px-6 md:px-12 py-4 md:py-5 bg-gold text-background hover:bg-gold-light transition-all duration-500 font-semibold shadow-[0_0_40px_hsl(38_50%_48%/0.35)] hover:shadow-[0_0_60px_hsl(38_50%_48%/0.55)]">
                    <span className="md:hidden">Reservar mi Lectura</span>
                    <span className="hidden md:inline">Reservar mi Lectura Estructural</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                }
              />
              <p className="mt-4 font-body text-xs md:text-sm text-foreground/90">
                90 minutos · 1:1 · 180€ · Acceso inmediato a tu arquitectura
              </p>
            </div>
          </FadeIn>
        </motion.div>
      </section>

      {/* Quien dirige — Juan Carlos (trust before possibility) */}
      <section ref={bioRef} className="py-20 md:py-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(38_50%_48%/0.04)_0%,transparent_50%)]" />
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <FadeIn>
            <p className="font-body text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase text-gold text-center mb-8 md:mb-14">
              Quién soy
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <FadeIn delay={0.15}>
              <div className="relative max-w-xs md:max-w-none mx-auto">
                <div className="aspect-[3/4] overflow-hidden border border-border/40 bg-surface-elevated">
                  <img
                    src={juanCarlosImg}
                    alt="Juan Carlos Sánchez Velázquez — fundador de Sanark"
                    className="w-full h-full object-cover transition-transform duration-[1.4s] ease-out hover:scale-[1.04]"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-gold/30 -z-10" />
                <div className="absolute -top-4 -left-4 w-16 h-16 border border-gold/20 -z-10" />
              </div>
            </FadeIn>
            <motion.div style={{ x: bioTextX, opacity: bioTextOpacity }}>
              <FadeIn delay={0.3}>
                <div>
                  <h2 className="font-display text-2xl md:text-4xl font-light mb-2">Juan Carlos</h2>
                  <p className="font-body text-xs md:text-sm text-gold tracking-wider mb-6 md:mb-8">Sánchez Velázquez</p>
                  <MobileExpandable
                    preview={
                      <p className="font-body text-sm md:text-base text-foreground/85 leading-relaxed">
                        Desde hace 15 años aprendiendo a leer el lenguaje del inconsciente. En lo que dice la gente, en lo que no dice, en sus cuerpos, en sus relaciones, en las vidas que se repetían a pesar de todo.{" "}
                        <span className="text-foreground font-medium">No es un misterio romántico: es una arquitectura con reglas precisas.</span> Y una vez que sabes cómo leerla, no hay vuelta atrás.
                      </p>
                    }
                    extra={
                      <div className="space-y-4 md:space-y-5 font-body text-sm md:text-base text-foreground/80 leading-relaxed md:mt-5">
                        <p>
                          Empecé acompañando a personas en crisis. Luego parejas al borde. Luego familias enteras. Y algo empezó a repetirse: todos llegaban con un problema distinto, pero debajo había el mismo patrón estructural operando. El inconsciente habla en lo que dices y en lo que omites, en síntomas, en repeticiones, en lo que "no sabes por qué" vuelve a pasar. Mi trabajo es enseñarte a leer ese lenguaje, para que puedas dejar de ser víctima de lo que no entiendes y empezar a operar desde la estructura consciente.
                        </p>
                        <p className="text-foreground/45 text-xs md:text-sm italic border-l-2 border-gold/30 pl-4">
                          "No voy a decirte lo que quieres escuchar. Voy a mostrarte lo que necesitas ver."
                        </p>
                      </div>
                    }
                  />
                </div>
              </FadeIn>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision — What's possible */}
      <section className="py-20 md:py-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(38_50%_48%/0.06)_0%,transparent_60%)]" />
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <FadeIn>
            <Sparkles size={24} className="text-gold/60 mx-auto mb-5 md:mb-6" />
            <p className="font-body text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase text-gold text-center mb-5 md:mb-6">
              Lo que es posible
            </p>
            <h2 className="font-display text-2xl md:text-5xl font-light text-center mb-5 md:mb-6 leading-tight">
              ¿Y si pudieras elegir desde dónde operas?
            </h2>
            <p className="font-body text-base md:text-xl text-foreground/85 text-center mb-10 md:mb-16 max-w-2xl mx-auto leading-relaxed">
              <span className="md:hidden">Con el Proceso Sanark de 4 fases, cada área deja de estar determinada por lo heredado.</span>
              <span className="hidden md:inline">No es una ilusión. Es una decisión estructural. Con el Proceso Sanark de 4 fases, cada una de estas áreas deja de estar determinada por lo heredado.</span>
            </p>
          </FadeIn>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
            {[
              { icon: Activity, area: "Energía", text: "La vitalidad que deseas, sin depender de ciclos de agotamiento que no elegiste." },
              { icon: HeartHandshake, area: "Pareja", text: "Relaciones que construyes desde la elección, no desde la carencia heredada." },
              { icon: Zap, area: "Salud", text: "Un cuerpo que responde a ti, no a los programas de enfermedad, cansancio o dolor que cargas." },
              { icon: DollarSign, area: "Finanzas", text: "Abundancia real, sin el techo invisible que frena cada vez que estás a punto de expandirte." },
              { icon: Brain, area: "Claridad mental", text: "Decisiones nítidas, sin el ruido de un sistema operativo que no te pertenece." },
              { icon: Gem, area: "Propósito", text: "Metas que se materializan porque nacen de una estructura nueva, no de la fuerza de voluntad." },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <FadeIn key={i} delay={i * 0.08}>
                  <motion.div
                    className="p-4 md:p-6 bg-card/50 backdrop-blur-sm border border-border/30 hover:border-gold/30 transition-all duration-500 group h-full"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon size={22} strokeWidth={1.75} className="text-gold mb-2 md:mb-3 group-hover:text-gold-light transition-colors" />
                    <p className="font-display text-[10px] md:text-sm tracking-[0.2em] uppercase text-gold/80 mb-2">{item.area}</p>
                    <p className="font-body text-sm md:text-base text-foreground/90 leading-relaxed group-hover:text-foreground transition-colors">{item.text}</p>
                  </motion.div>
                </FadeIn>
              );
            })}
          </div>

          <FadeIn delay={0.5}>
            <div className="mt-10 md:mt-14 text-center">
              <Link
                to="/proceso-sanark"
                onClick={() => trackCtaClick("Conoce las 4 fases del proceso", "home_vision")}
                className="group inline-flex items-center gap-3 font-body text-xs md:text-sm tracking-wider uppercase px-6 md:px-8 py-3 md:py-4 border border-gold/40 text-gold hover:bg-gold hover:text-background transition-all duration-500"
              >
                <span className="md:hidden">Ver las 4 fases</span>
                <span className="hidden md:inline">Conoce las 4 fases del proceso</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Lectura Básica — primera experiencia gratuita */}
      <section className="py-16 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(38_50%_48%/0.06)_0%,transparent_60%)]" />
        <div className="container mx-auto px-6 max-w-3xl relative z-10">
          <FadeIn>
            <div className="relative p-7 md:p-12 border border-gold/25 bg-card/40 backdrop-blur-sm hover:border-gold/50 transition-all duration-500 text-center">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-background border border-gold/40">
                <p className="font-body text-[10px] md:text-xs tracking-[0.3em] uppercase text-gold">Gratis · 15 preguntas</p>
              </div>
              <Sparkles size={22} className="text-gold/70 mx-auto mb-5 mt-2" strokeWidth={1.5} />
              <h2 className="font-display text-2xl md:text-4xl font-light mb-4 md:mb-5 leading-tight">
                Antes de reservar,
                <br />
                <span className="gradient-text-gold">ve el patrón con tus propios ojos.</span>
              </h2>
              <p className="font-body text-base md:text-lg text-foreground/85 leading-relaxed max-w-xl mx-auto mb-7 md:mb-9">
                <span className="md:hidden">15 preguntas. Al terminar, recibes una primera lectura del patrón que se repite en tu vida. Sin coste, sin compromiso. En minutos vas a ver algo que llevas años sin poder nombrar.</span>
                <span className="hidden md:inline">15 preguntas. Al terminar, recibes una primera lectura del patrón estructural que se repite en tu vida. La misma mirada que aplico en sesión. Sin coste, sin compromiso. En minutos vas a ver algo que llevas años sin poder nombrar.</span>
              </p>
              <Link
                to="/lectura-basica"
                onClick={() => trackCtaClick("Empezar mi Lectura gratis", "home_lectura_basica")}
                className="group inline-flex items-center gap-3 font-body text-xs md:text-sm tracking-wider uppercase px-8 md:px-10 py-4 bg-gold text-background hover:bg-gold-light transition-all duration-500 font-semibold shadow-[0_0_30px_hsl(38_50%_48%/0.3)] hover:shadow-[0_0_50px_hsl(38_50%_48%/0.5)]"
              >
                Empezar mi Lectura gratis
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="mt-5 font-body text-xs text-foreground/70">Resultado inmediato</p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 md:py-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(38_50%_48%/0.08)_0%,transparent_60%)]" />
        <FloatingParticles count={20} />
        <div className="container mx-auto px-6 max-w-3xl relative z-10">
          <FadeIn>
            <Flame size={24} className="text-gold/60 mx-auto mb-5 md:mb-6" />
            <p className="font-body text-[10px] md:text-xs tracking-[0.35em] md:tracking-[0.5em] uppercase text-gold text-center mb-5 md:mb-6">
              Entrada
            </p>
            <h2 className="font-display text-2xl md:text-5xl font-light text-center mb-6 md:mb-8 leading-tight">
              Una sesión. Una lectura.
              <br />
              <span className="gradient-text-gold">Todo cambia de lugar.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="font-body text-base md:text-xl text-foreground/85 text-center max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed">
              <span className="md:hidden">En 90 minutos leo la arquitectura desde la que operas. La estructura que sigue dirigiendo tu vida aunque hayas trabajado en ti durante años.</span>
              <span className="hidden md:inline">En 90 minutos leo la arquitectura desde la que operas. La estructura que heredaste y que sigue dirigiendo tu vida aunque hayas trabajado en ti durante años. No es terapia. Es una lectura.</span>
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="p-6 md:p-10 bg-card/80 backdrop-blur-sm border border-border/50 hover:border-gold/30 transition-all duration-500 text-center hover:glow-gold">
              <h3 className="font-display text-xl md:text-3xl font-light mb-3 md:mb-4">Lectura Estructural</h3>
              <p className="font-body text-sm md:text-base text-foreground/85 leading-relaxed mb-6 md:mb-8 max-w-xl mx-auto">
                <span className="md:hidden">Una sesión única donde leo la arquitectura activa desde la que operas hoy.</span>
                <span className="hidden md:inline">Una sesión única donde leo la arquitectura activa desde la que operas hoy — la estructura que heredaste y que sigue dirigiendo tu vida aunque hayas trabajado en ti durante años.</span>
              </p>
              <BookingFormDialog
                cta="Reservar mi Lectura · 180€"
                location="home_entry"
                trigger={
                  <button className="group inline-flex items-center gap-3 font-body text-xs md:text-sm tracking-wider uppercase px-8 md:px-12 py-4 md:py-5 bg-gold text-background hover:bg-gold-light transition-all duration-500 font-semibold shadow-[0_0_40px_hsl(38_50%_48%/0.4)] hover:shadow-[0_0_60px_hsl(38_50%_48%/0.6)]">
                    <span className="md:hidden">Reservar mi Lectura · 180€</span>
                    <span className="hidden md:inline">Reservar mi Lectura Estructural · 180€</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                }
              />
              <p className="mt-4 font-body text-xs md:text-sm text-foreground/90">90 minutos · 1:1 · Plazas limitadas cada mes</p>
            </div>
          </FadeIn>
        </div>
      </section>


      {/* FAQ */}
      <FaqSection />

      {/* Final CTA */}
      <section ref={finalRef} className="py-20 md:py-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary/30" />
        <motion.div
          className="absolute inset-0"
          style={{
            background: useTransform(finalGlow, (v) => `radial-gradient(ellipse at center, hsl(38 50% 48% / ${v}) 0%, transparent 60%)`),
          }}
        />
        <FloatingParticles count={25} />
        <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
          <FadeIn>
            <SanarkSymbol size={80} className="mx-auto mb-6 md:mb-8 opacity-40 w-14 h-14 md:w-20 md:h-20" />
          </FadeIn>
          <FadeIn delay={0.15}>
            <h2 className="font-display text-2xl md:text-5xl font-light mb-6 md:mb-8 leading-tight">
              El punto de partida es siempre el mismo:
              <br />
              <span className="text-gold">ver lo que aún no has visto.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="font-body text-base md:text-xl text-foreground/85 mb-8 md:mb-10 max-w-xl mx-auto leading-relaxed">
              Reserva tu Lectura Estructural y descubre qué arquitectura opera por debajo de tus decisiones.
            </p>
          </FadeIn>
          <FadeIn delay={0.25}>
            <div className="inline-flex items-center justify-center gap-6 mb-8 md:mb-10 px-8 md:px-10 py-5 md:py-6 border border-gold/20 bg-card/40 backdrop-blur-sm">
              <div className="text-center">
                <p className="font-body text-[10px] tracking-[0.3em] uppercase text-gold/80 mb-2">Lectura Estructural</p>
                <p className="font-display text-2xl md:text-4xl font-light text-gold mb-1">180€</p>
                <p className="font-body text-xs text-foreground/90">90 minutos · 1:1</p>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <BookingFormDialog
                cta="Reservar mi sesión 1:1"
                location="home_final"
                trigger={
                  <button className="group inline-flex items-center gap-3 font-body text-xs md:text-sm tracking-wider uppercase px-8 md:px-12 py-4 md:py-5 bg-gold text-background hover:bg-gold-light transition-all duration-500 font-semibold shadow-[0_0_40px_hsl(38_50%_48%/0.4)] hover:shadow-[0_0_60px_hsl(38_50%_48%/0.6)]">
                    <span className="md:hidden">Reservar mi sesión · 180€</span>
                    <span className="hidden md:inline">Reservar mi Lectura Estructural · 180€</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                }
              />
            </div>
            <p className="mt-5 font-body text-xs md:text-sm text-foreground/90">
              Te respondo personalmente en 24h · Confidencialidad absoluta
            </p>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
