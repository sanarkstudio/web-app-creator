import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import FadeIn from "@/components/shared/FadeIn";
import SectionDivider from "@/components/shared/SectionDivider";
import FloatingParticles from "@/components/shared/FloatingParticles";
import SanarkSymbol from "@/components/shared/SanarkSymbol";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import juanCarlosImg from "@/assets/juan-carlos-pro.jpg";

const Index = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Parallax for problem section
  const problemRef = useRef<HTMLElement>(null);
  const { scrollYProgress: problemProgress } = useScroll({
    target: problemRef,
    offset: ["start end", "end start"],
  });
  const problemY = useTransform(problemProgress, [0, 1], [60, -60]);

  // Parallax for bio section
  const bioRef = useRef<HTMLElement>(null);
  const { scrollYProgress: bioProgress } = useScroll({
    target: bioRef,
    offset: ["start end", "end start"],
  });
  const bioImageY = useTransform(bioProgress, [0, 1], [80, -40]);

  // Reveal line animation
  const lineRef = useRef(null);
  const lineInView = useInView(lineRef, { once: true, margin: "-100px" });

  return (
    <Layout>
      {/* Hero — immersive full-screen entry */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(38_50%_48%/0.06)_0%,transparent_70%)]" />
        <FloatingParticles count={35} />

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-10 container mx-auto px-6 text-center max-w-4xl"
        >
          <FadeIn delay={0}>
            <div className="flex justify-center mb-10">
              <SanarkSymbol size={140} className="opacity-60" />
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="font-body text-xs tracking-[0.5em] uppercase text-gold mb-8">
              Decodificación Estructural de Vida
            </p>
          </FadeIn>

          <FadeIn delay={0.6}>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light leading-[1.05] mb-8 text-shadow-gold">
              Lo que te frena no es visible.
              <br />
              <span className="gradient-text-gold font-medium">Pero yo sí lo veo.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.8}>
            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-14 leading-relaxed">
              Has trabajado en ti. Has invertido tiempo, energía y recursos. Pero ciertos patrones
              siguen ahí, intactos. No es un problema de voluntad. Es un problema de estructura.
            </p>
          </FadeIn>

          <FadeIn delay={1}>
            <Link
              to="/lectura-estructural"
              className="group inline-flex items-center gap-3 font-body text-sm tracking-wider uppercase px-10 py-4 bg-gold text-background hover:bg-gold-light transition-all duration-500 font-medium"
            >
              Muéstrame lo que no veo
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
        </motion.div>
      </section>

      {/* Reveal line */}
      <div ref={lineRef} className="flex justify-center py-4">
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
          initial={{ width: 0 }}
          animate={lineInView ? { width: "60%" } : {}}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Problem — the mirror */}
      <section ref={problemRef} className="py-28 md:py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(38_50%_48%/0.03)_0%,transparent_50%)]" />
        <motion.div style={{ y: problemY }} className="container mx-auto px-6 max-w-3xl relative z-10">
          <FadeIn>
            <SectionDivider />
          </FadeIn>
          <FadeIn delay={0.15}>
            <h2 className="font-display text-3xl md:text-5xl font-light text-center mt-12 mb-10 leading-tight">
              Has cambiado hábitos, pero el patrón permanece
            </h2>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="space-y-6 font-body text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Llevas años tomando decisiones conscientes. Has ido a terapia, has leído, has
                practicado. Y sin embargo, hay algo que se repite. Una forma de vincularte, una
                manera de sabotearte, un techo invisible que no logras atravesar.
              </p>
              <p>
                No es que no hayas avanzado. Es que hay una capa más profunda que nadie te ha
                mostrado: <span className="text-foreground font-medium">la estructura desde la que operas</span>.
              </p>
              <p>
                Un programa heredado, inscrito en tu sistema antes de que tuvieras palabras para
                nombrarlo. Esa estructura decide cómo gestionas tu energía, cómo te relacionas, qué
                permites y qué no. Y mientras siga ahí, cualquier cambio será temporal.
              </p>
            </div>
          </FadeIn>
        </motion.div>
      </section>

      {/* Solution — the path */}
      <section className="py-28 md:py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(38_50%_48%/0.05)_0%,transparent_60%)]" />
        <FloatingParticles count={15} />
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <FadeIn>
            <p className="font-body text-xs tracking-[0.4em] uppercase text-gold text-center mb-6">
              Lo que hago
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-light text-center mb-16 leading-tight">
              Revelo lo que sostiene todo lo demás
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeIn delay={0.15}>
              <Link
                to="/lectura-estructural"
                className="group block p-10 bg-card/80 backdrop-blur-sm border border-border/50 hover:border-gold/30 transition-all duration-500 hover:glow-gold h-full"
              >
                <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4">Paso 1</p>
                <h3 className="font-display text-2xl md:text-3xl font-light mb-4">Lectura Estructural</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
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
                <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4">Paso 2</p>
                <h3 className="font-display text-2xl md:text-3xl font-light mb-4">Proceso Sanark</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
                  12 sesiones individuales para detectar, diseñar, crear y habitar una nueva estructura.
                  No se trata de mejorar la versión actual. Se trata de operar desde otro lugar.
                </p>
                <span className="inline-flex items-center gap-2 text-gold text-sm font-body tracking-wider uppercase group-hover:gap-4 transition-all duration-300">
                  Conocer el proceso <ArrowRight size={14} />
                </span>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Identification — scroll-stopping mirror */}
      <section className="py-28 md:py-40 relative">
        <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
          <FadeIn>
            <h2 className="font-display text-3xl md:text-5xl font-light mb-14 leading-tight">
              Si esto te suena, no es casualidad
            </h2>
          </FadeIn>
          <div className="space-y-0">
            {[
              "Sientes que ya has hecho \"todo\" pero algo sigue sin encajar.",
              "Repites patrones en tus relaciones, tu salud o tus finanzas.",
              "Has avanzado mucho, pero hay un techo que no logras romper.",
              "Sabes que hay algo más profundo operando, pero no sabes qué es.",
              "Estás listo para dejar de trabajar sobre los síntomas.",
            ].map((text, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <motion.p
                  className="font-body text-base md:text-lg text-foreground/80 py-5 border-b border-border/20 last:border-0 cursor-default"
                  whileHover={{ x: 8, color: "hsl(38 50% 48%)" }}
                  transition={{ duration: 0.3 }}
                >
                  {text}
                </motion.p>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.6}>
            <div className="mt-14">
              <Link
                to="/lectura-estructural"
                className="group inline-flex items-center gap-3 font-body text-sm tracking-wider uppercase px-10 py-4 border border-gold/40 text-gold hover:bg-gold hover:text-background transition-all duration-500"
              >
                Deja de repetir. Empieza a ver.
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ENTRADA — Lectura Estructural */}
      <section className="py-28 md:py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(38_50%_48%/0.06)_0%,transparent_60%)]" />
        <FloatingParticles count={15} />
        <div className="container mx-auto px-6 max-w-3xl relative z-10">
          <FadeIn>
            <p className="font-body text-xs tracking-[0.5em] uppercase text-gold text-center mb-6">
              Entrada
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-light text-center mb-8 leading-tight">
              Todo comienza con una sola sesión.
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="font-body text-base md:text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12 leading-relaxed">
              90 minutos para ver con exactitud desde dónde estás operando.
              No es terapia. No es coaching. No es nada que hayas probado antes.
              Es el único punto de acceso a todo mi trabajo.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="p-10 bg-card/80 backdrop-blur-sm border border-border/50 hover:border-gold/30 transition-all duration-500 text-center hover:glow-gold">
              <h3 className="font-display text-2xl md:text-3xl font-light mb-4">Lectura Estructural</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto">
                Una sesión única donde leo la arquitectura activa desde la que operas hoy — la estructura
                que heredaste y que sigue dirigiendo tu vida aunque hayas trabajado en ti durante años.
              </p>
              <Link
                to="/lectura-estructural"
                className="group inline-flex items-center gap-3 font-body text-sm tracking-wider uppercase px-10 py-4 bg-gold text-background hover:bg-gold-light transition-all duration-500 font-medium"
              >
                Accede a tu estructura
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Quien dirige — Juan Carlos */}
      <section ref={bioRef} className="py-28 md:py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(38_50%_48%/0.04)_0%,transparent_50%)]" />
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <FadeIn>
            <p className="font-body text-xs tracking-[0.4em] uppercase text-gold text-center mb-14">
              Quien está detrás
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <FadeIn delay={0.15}>
              <motion.div style={{ y: bioImageY }} className="relative">
                <div className="aspect-[3/4] overflow-hidden border border-border/40">
                  <img
                    src={juanCarlosImg}
                    alt="Juan Carlos Sánchez Velázquez"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-gold/20 -z-10" />
              </motion.div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-light mb-2">Juan Carlos</h2>
                <p className="font-body text-sm text-gold tracking-wider mb-8">Sánchez Velázquez</p>
                <div className="space-y-5 font-body text-base text-muted-foreground leading-relaxed">
                  <p>
                    14 años leyendo lo que nadie más lee. No emociones, no creencias, no historias.{" "}
                    <span className="text-foreground font-medium">Estructuras.</span> Los programas heredados
                    que determinan cómo vives, decides, te vinculas y gestionas cada recurso que tienes.
                  </p>
                  <p>
                    He trabajado con cientos de personas que ya habían hecho todo: terapia, coaching,
                    meditación, constelaciones. Llegaron porque sabían que había algo más profundo
                    operando. Y tenían razón.
                  </p>
                  <p>
                    Mi enfoque no se parece a nada que hayas probado. No interpreto. No aconsejo.
                    No motivo.{" "}
                    <span className="text-foreground font-medium">
                      Leo la arquitectura desde la que operas y te muestro con precisión lo que está
                      generando los resultados que tienes.
                    </span>
                  </p>
                  <p className="text-foreground/90 italic border-l-2 border-gold/30 pl-5">
                    Mi trabajo termina cuando tu estructura se sostiene sola. Eso no es un objetivo — es
                    el único criterio válido.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* DESPUÉS DE LA SESIÓN */}
      <section className="py-28 md:py-40 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(38_50%_48%/0.03)_0%,transparent_50%)]" />
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <FadeIn>
            <p className="font-body text-xs tracking-[0.5em] uppercase text-gold text-center mb-6">
              Después de la sesión
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-light text-center mb-16 leading-tight">
              La claridad te deja frente a una decisión.
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeIn delay={0.15}>
              <div className="p-10 bg-card/80 backdrop-blur-sm border border-border/50 hover:border-gold/20 transition-all duration-500 h-full">
                <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4">Autonomía inmediata</p>
                <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
                  Con tu estructura visible, tienes todo lo que necesitas para empezar a tomar decisiones
                  desde un lugar distinto. La lectura te da el mapa. El recorrido es tuyo. Para muchos,
                  esta sola sesión es el mayor punto de inflexión de su proceso personal.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <Link
                to="/proceso-sanark"
                className="group block p-10 bg-card/80 backdrop-blur-sm border border-border/50 hover:border-gold/30 transition-all duration-500 h-full hover:glow-gold"
              >
                <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4">El siguiente nivel</p>
                <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
                  Si tu estructura requiere una reconstrucción profunda — no un ajuste — valoramos juntos
                  tu acceso al Proceso Sanark: 12 intervenciones 1:1 para desmantelar la arquitectura
                  heredada y construir una base propia.
                </p>
                <span className="inline-flex items-center gap-2 text-gold text-sm font-body tracking-wider uppercase group-hover:gap-4 transition-all duration-300">
                  Conocer el Proceso Sanark <ArrowRight size={14} />
                </span>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Final CTA — scroll-stopping */}
      <section className="py-32 md:py-44 relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(38_50%_48%/0.08)_0%,transparent_60%)]" />
        <FloatingParticles count={20} />
        <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
          <FadeIn>
            <SanarkSymbol size={80} className="mx-auto mb-10 opacity-40" />
          </FadeIn>
          <FadeIn delay={0.15}>
            <h2 className="font-display text-3xl md:text-5xl font-light mb-8 leading-tight">
              Tu estructura actual tiene una fecha de caducidad.
              <br />
              <span className="text-gold">Tú decides cuándo.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="font-body text-base text-muted-foreground mb-14 max-w-xl mx-auto">
              La Lectura Estructural es el primer paso. Te muestra exactamente
              desde dónde estás operando y por qué ciertos resultados se repiten.
            </p>
          </FadeIn>
          <FadeIn delay={0.45}>
            <Link
              to="/lectura-estructural"
              className="group inline-flex items-center gap-3 font-body text-sm tracking-wider uppercase px-12 py-5 bg-gold text-background hover:bg-gold-light transition-all duration-500 font-medium glow-gold"
            >
              Reserva tu Lectura Estructural
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
