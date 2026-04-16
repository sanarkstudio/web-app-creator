import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import FadeIn from "@/components/shared/FadeIn";
import SectionDivider from "@/components/shared/SectionDivider";
import FloatingParticles from "@/components/shared/FloatingParticles";
import HeroBackground from "@/components/shared/HeroBackground";
import SanarkSymbol from "@/components/shared/SanarkSymbol";
import ScrollTextReveal from "@/components/shared/ScrollTextReveal";
import StickyRevealSection from "@/components/shared/StickyRevealSection";
import { ArrowRight, Flame, Heart, DollarSign, Brain, Users, Zap, ShieldOff, Eye, Target, Sparkles, Activity, HeartHandshake, Gem, TrendingUp } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

const identItems = [
  {
    icon: Zap,
    text: "Tu cuerpo habla antes que tú. Fatiga crónica, tensión que no se va, enfermedades, síntomas que nadie explica.",
  },
  {
    icon: Heart,
    text: "Atraes las mismas relaciones con distinto rostro. El patrón cambia de nombre, pero no de forma.",
  },
  {
    icon: DollarSign,
    text: "Produces, generas, facturas — pero el dinero no se queda. Algo en tu estructura lo expulsa antes de que puedas sostenerlo.",
  },
  {
    icon: Brain,
    text: "Piensas demasiado, decides poco. El ruido mental te paraliza cuando más claridad necesitas.",
  },
  {
    icon: Users,
    text: "Cuidas a todos menos a ti. Das hasta vaciarte y después no entiendes por qué te sientes solo.",
  },
  {
    icon: ShieldOff,
    text: "Has probado todo — terapia, coaching, meditación — y algo fundamental sigue sin moverse.",
  },
  {
    icon: Flame,
    text: "Algo dentro de ti no descansa. Ansiedad sin causa, tristeza sin motivo, una sensación de vacío que no se llena con nada externo — y que aprendiste a esconder.",
  },
  {
    icon: Target,
    text: "Sabes exactamente lo que quieres crear, pero te saboteas justo antes de lograrlo. No es falta de disciplina — es una estructura que no te deja llegar.",
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
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(38_50%_48%/0.08)_0%,transparent_70%)]" />
        
        {/* Pulsing radial glow */}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,hsl(38_50%_48%/0.12)_0%,transparent_50%)]"
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_60%,hsl(38_40%_40%/0.06)_0%,transparent_40%)]"
          animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        
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
              <SanarkSymbol size={140} className="opacity-50" />
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="font-body text-xs tracking-[0.5em] uppercase text-gold mb-8">
              Decodificación Estructural de Vida
            </p>
          </FadeIn>

          <FadeIn delay={0.6}>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light leading-[1.05] mb-8 text-shadow-gold">
              Lo que eres hoy
              <br />
              <span className="gradient-text-gold font-medium">no lo decidiste tú.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.8}>
            <p className="font-body text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto mb-14 leading-relaxed">
              Has invertido años en conocerte. Y aun así, ciertos patrones siguen intactos.
              No es un problema de voluntad. Es un problema de estructura.
            </p>
          </FadeIn>

          <FadeIn delay={1}>
            <Link
              to="/lectura-estructural"
              className="group inline-flex items-center gap-3 font-body text-sm tracking-wider uppercase px-10 py-4 bg-gold text-background hover:bg-gold-light transition-all duration-500 font-medium"
            >
              Quiero ver lo que no veo
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
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

      {/* Apple-style sticky reveal — Problem */}
      <StickyRevealSection scrollHeight={2}>
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <SectionDivider />
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-light mt-12 mb-10 leading-tight">
            Has cambiado hábitos
            <br />
            <span className="gradient-text-gold my-[2px]">pero el patrón permanece</span>
          </h2>
          <p className="font-body text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            No es que no hayas avanzado. Es que hay una capa más profunda que nadie te ha
            mostrado: la estructura desde la que operas.
          </p>
        </div>
      </StickyRevealSection>

      {/* Apple-style word-by-word reveal */}
      <section className="py-28 md:py-36 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(38_50%_48%/0.04)_0%,transparent_50%)]" />
        <div className="container mx-auto px-6 max-w-3xl relative z-10">
          <ScrollTextReveal
            text="Un programa heredado, inscrito en tu sistema antes de que tuvieras palabras para nombrarlo. Esa estructura decide cómo gestionas tu energía, cómo te relacionas, qué permites y qué no. Y mientras siga ahí, cualquier cambio será temporal."
            className="font-display text-2xl md:text-4xl font-light text-center text-foreground leading-snug"
            as="h2"
          />
        </div>
      </section>

      {/* Solution — the path */}
      <section ref={solutionRef} className="py-32 md:py-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(38_50%_48%/0.06)_0%,transparent_60%)]" />
        <FloatingParticles count={20} />
        <motion.div style={{ scale: solutionScale }} className="container mx-auto px-6 max-w-5xl relative z-10">
          <FadeIn>
            <div className="flex justify-center mb-6">
              <Eye size={28} className="text-gold/60" />
            </div>
            <p className="font-body text-xs tracking-[0.4em] uppercase text-gold text-center mb-6">
              Lo que hago
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-light text-center mb-16 leading-tight">
              Revelar lo que se esconde de tu psiquismo
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeIn delay={0.15}>
              <Link
                to="/lectura-estructural"
                className="group block p-10 bg-card/80 backdrop-blur-sm border border-border/50 hover:border-gold/30 transition-all duration-500 hover:glow-gold h-full"
              >
                <Flame size={22} className="text-gold mb-4" />
                <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4">Paso 1</p>
                <h3 className="font-display text-2xl md:text-3xl font-light mb-4">Lectura Estructural</h3>
                <p className="font-body text-sm text-foreground/50 leading-relaxed mb-6">
                  Una lectura profunda que revela la estructura desde la que operas: qué programas
                  heredados dirigen tu vida física, emocional, relacional y financiera.
                </p>
                <span className="inline-flex items-center gap-2 text-gold text-sm font-body tracking-wider uppercase group-hover:gap-4 transition-all duration-300">
                  Accede a tu lectura <ArrowRight size={14} />
                </span>
              </Link>
            </FadeIn>
            <FadeIn delay={0.3}>
              <Link
                to="/proceso-sanark"
                className="group block p-10 bg-card/80 backdrop-blur-sm border border-border/50 hover:border-gold/30 transition-all duration-500 hover:glow-gold h-full"
              >
                <Zap size={22} className="text-gold mb-4" />
                <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4">Paso 2</p>
                <h3 className="font-display text-2xl md:text-3xl font-light mb-4">Proceso Sanark</h3>
                <p className="font-body text-sm text-foreground/50 leading-relaxed mb-6">
                  12 sesiones individuales para detectar, diseñar, crear y habitar una nueva estructura.
                  No se trata de mejorar la versión actual. Se trata de operar desde otro lugar.
                </p>
                <span className="inline-flex items-center gap-2 text-gold text-sm font-body tracking-wider uppercase group-hover:gap-4 transition-all duration-300">
                  Conocer el proceso <ArrowRight size={14} />
                </span>
              </Link>
            </FadeIn>
          </div>
        </motion.div>
      </section>

      {/* Identification — with icons */}
      <section ref={identRef} className="py-32 md:py-48 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(38_50%_48%/0.03)_0%,transparent_60%)]" />
        <motion.div
          style={{ scale: identScale }}
          className="container mx-auto px-6 max-w-4xl relative z-10"
        >
          <FadeIn>
            <h2 className="font-display text-3xl md:text-5xl font-light mb-6 leading-tight text-center">
              El patron que se repite
            </h2>
            <p className="font-body text-sm text-foreground/40 text-center mb-16 tracking-wide">
              Diferentes áreas de tu vida, una misma estructura operando
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {identItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <FadeIn key={i} delay={i * 0.1}>
                  <motion.div
                    className="flex gap-5 p-6 bg-card/50 backdrop-blur-sm border border-border/30 hover:border-gold/30 transition-all duration-500 cursor-default group"
                    whileHover={{ x: 6, borderColor: "hsl(38 50% 48% / 0.4)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex-shrink-0 mt-1">
                      <Icon size={20} className="text-gold/70 group-hover:text-gold transition-colors duration-300" />
                    </div>
                    <p className="font-body text-sm md:text-base text-foreground/70 leading-relaxed group-hover:text-foreground/90 transition-colors duration-300">
                      {item.text}
                    </p>
                  </motion.div>
                </FadeIn>
              );
            })}
          </div>

          <FadeIn delay={0.7}>
            <div className="mt-16 p-8 border border-gold/20 bg-card/30 backdrop-blur-sm text-center">
              <SanarkSymbol size={36} className="mx-auto mb-5 opacity-40" />
              <p className="font-display text-xl md:text-2xl text-foreground/90 font-light leading-relaxed mb-2">
                Si estás listo para acceder a un nivel más avanzado —
              </p>
              <p className="font-display text-xl md:text-2xl font-light leading-relaxed">
                el de crear desde una estructura nueva —{" "}
                <span className="text-gold font-medium">este es tu punto de entrada.</span>
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.85}>
            <div className="mt-10 text-center">
              <Link
                to="/lectura-estructural"
                className="group inline-flex items-center gap-3 font-body text-sm tracking-wider uppercase px-10 py-4 border border-gold/40 text-gold hover:bg-gold hover:text-background transition-all duration-500"
              >
                Deja de repetir. Empieza a ver.
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
        </motion.div>
      </section>

      {/* Quien dirige — Juan Carlos (trust before possibility) */}
      <section ref={bioRef} className="py-32 md:py-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(38_50%_48%/0.04)_0%,transparent_50%)]" />
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <FadeIn>
            <p className="font-body text-xs tracking-[0.4em] uppercase text-gold text-center mb-14">
              El arquitecto detrás del proceso
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <FadeIn delay={0.15}>
              <div className="relative">
                <div className="aspect-[3/4] overflow-hidden border border-border/40 bg-surface-elevated flex items-center justify-center">
                  <div className="text-center px-8">
                    <SanarkSymbol size={80} className="mx-auto mb-6 opacity-30" />
                    <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground">
                      Foto próximamente
                    </p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-gold/20 -z-10" />
              </div>
            </FadeIn>
            <motion.div style={{ x: bioTextX, opacity: bioTextOpacity }}>
              <FadeIn delay={0.3}>
                <div>
                  <h2 className="font-display text-3xl md:text-4xl font-light mb-2">Juan Carlos</h2>
                  <p className="font-body text-sm text-gold tracking-wider mb-8">Sánchez Velázquez</p>
                  <div className="space-y-5 font-body text-base text-foreground/60 leading-relaxed">
                    <p>
                      14 años trabajando con lo que la mayoría no ve.{" "}
                      <span className="text-foreground font-medium">He acompañado a cientos de personas,
                      parejas, familias, grupos y empresas</span> a identificar los programas heredados
                      que operan por debajo de su consciencia — y a crear estructuras nuevas desde las
                      que vivir, relacionarse y producir.
                    </p>
                    <p>
                      No ofrezco motivación ni acompañamiento emocional. Trabajo directo sobre la
                      arquitectura invisible que dirige tu vida. Mi trabajo termina cuando tu estructura
                      se sostiene sola.
                    </p>
                    <p className="text-foreground/40 text-sm italic border-l-2 border-gold/30 pl-4">
                      "No vengo a decirte lo que quieres escuchar. Vengo a mostrarte lo que necesitas ver."
                    </p>
                  </div>
                </div>
              </FadeIn>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision — What's possible */}
      <section className="py-32 md:py-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(38_50%_48%/0.06)_0%,transparent_60%)]" />
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <FadeIn>
            <Sparkles size={24} className="text-gold/60 mx-auto mb-6" />
            <p className="font-body text-xs tracking-[0.4em] uppercase text-gold text-center mb-6">
              Lo que es posible
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-light text-center mb-6 leading-tight">
              ¿Y si pudieras elegir desde dónde operas?
            </h2>
            <p className="font-body text-base text-foreground/50 text-center mb-16 max-w-2xl mx-auto">
              No es un deseo. Es una decisión estructural. Con el Proceso Sanark de 4 fases, cada una de estas áreas deja de estar determinada por lo heredado.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
                    className="p-6 bg-card/50 backdrop-blur-sm border border-border/30 hover:border-gold/30 transition-all duration-500 group h-full"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon size={20} className="text-gold/70 mb-3 group-hover:text-gold transition-colors" />
                    <p className="font-display text-sm tracking-[0.2em] uppercase text-gold/80 mb-2">{item.area}</p>
                    <p className="font-body text-sm text-foreground/60 leading-relaxed group-hover:text-foreground/80 transition-colors">{item.text}</p>
                  </motion.div>
                </FadeIn>
              );
            })}
          </div>

          <FadeIn delay={0.5}>
            <div className="mt-14 text-center">
              <Link
                to="/proceso-sanark"
                className="group inline-flex items-center gap-3 font-body text-sm tracking-wider uppercase px-8 py-4 border border-gold/40 text-gold hover:bg-gold hover:text-background transition-all duration-500"
              >
                Conoce las 4 fases del proceso
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-32 md:py-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(38_50%_48%/0.08)_0%,transparent_60%)]" />
        <FloatingParticles count={20} />
        <div className="container mx-auto px-6 max-w-3xl relative z-10">
          <FadeIn>
            <Flame size={24} className="text-gold/60 mx-auto mb-6" />
            <p className="font-body text-xs tracking-[0.5em] uppercase text-gold text-center mb-6">
              Entrada
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-light text-center mb-8 leading-tight">
              Todo comienza con una sola sesión.
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="font-body text-base md:text-lg text-foreground/60 text-center max-w-2xl mx-auto mb-12 leading-relaxed">
              90 minutos para ver con claridad desde dónde estás operando.
              No es terapia. No es coaching. No es nada que hayas probado antes.
              Es la puerta de entrada a todo mi sistema de decodificación estructural.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="p-10 bg-card/80 backdrop-blur-sm border border-border/50 hover:border-gold/30 transition-all duration-500 text-center hover:glow-gold">
              <h3 className="font-display text-2xl md:text-3xl font-light mb-4">Lectura Estructural</h3>
              <p className="font-body text-sm text-foreground/50 leading-relaxed mb-8 max-w-xl mx-auto">
                Una sesión única donde leo la arquitectura activa desde la que operas hoy — la estructura
                que heredaste y que sigue dirigiendo tu vida aunque hayas trabajado en ti durante años.
              </p>
              <Link
                to="/lectura-estructural"
                className="group inline-flex items-center gap-3 font-body text-sm tracking-wider uppercase px-10 py-4 bg-gold text-background hover:bg-gold-light transition-all duration-500 font-medium"
              >
                Quiero ver lo que no veo
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>


      {/* Final CTA */}
      <section ref={finalRef} className="py-32 md:py-48 relative overflow-hidden">
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
            <SanarkSymbol size={80} className="mx-auto mb-8 opacity-40" />
          </FadeIn>
          <FadeIn delay={0.15}>
            <h2 className="font-display text-3xl md:text-5xl font-light mb-8 leading-tight">
              El punto de partida es siempre el mismo:
              <br />
              <span className="text-gold">ver lo que aún no has visto.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="font-body text-base text-foreground/60 mb-10 max-w-xl mx-auto">
              Empieza con una lectura introductoria gratuita. Descubre en minutos qué estructura opera por debajo de tus decisiones.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/lectura-introductoria"
                className="group inline-flex items-center gap-3 font-body text-sm tracking-wider uppercase px-10 py-4 bg-gold text-background hover:bg-gold-light transition-all duration-500 font-medium"
              >
                Lectura gratuita
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/lectura-estructural"
                className="group inline-flex items-center gap-3 font-body text-sm tracking-wider uppercase px-10 py-4 border border-gold/40 text-gold hover:bg-gold hover:text-background transition-all duration-500"
              >
                Lectura completa
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
