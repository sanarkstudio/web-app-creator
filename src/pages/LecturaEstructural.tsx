import Layout from "@/components/layout/Layout";
import FadeIn from "@/components/shared/FadeIn";
import SectionDivider from "@/components/shared/SectionDivider";
import FloatingParticles from "@/components/shared/FloatingParticles";
import SanarkSymbol from "@/components/shared/SanarkSymbol";
import { ArrowRight } from "lucide-react";

const LecturaEstructural = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(38_50%_48%/0.05)_0%,transparent_60%)]" />
        <FloatingParticles count={20} />
        <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl py-28">
          <FadeIn>
            <SanarkSymbol size={100} className="mx-auto mb-8 opacity-50" />
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="font-body text-xs tracking-[0.4em] uppercase text-gold mb-8">
              El punto de partida
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <h1 className="font-display text-5xl md:text-7xl font-light leading-[1.1] mb-8 text-shadow-gold">
              Lectura Estructural
            </h1>
          </FadeIn>
          <FadeIn delay={0.6}>
            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Una lectura profunda que revela la estructura desde la que operas.
              No lo que te pasa. Sino lo que lo sostiene.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* What is it */}
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
              <p>
                <span className="text-foreground font-medium">La Lectura Estructural los hace visibles.</span>{" "}
                Te muestra con precisión qué estructura estás habitando, qué fugas genera y por qué
                ciertos patrones se repiten sin importar lo que hagas para cambiarlos.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* What it reveals */}
      <section className="py-28 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(38_50%_48%/0.04)_0%,transparent_60%)]" />
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
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
                desc: "Una visión precisa de cómo estos programas operan en cada dimensión de tu vida: física, emocional, mental, relacional, social y financiera. El mapa desde el que realmente estás viviendo.",
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div className="p-8 bg-card/80 backdrop-blur-sm border border-border/50 h-full hover:border-gold/20 transition-all duration-500 hover:glow-gold">
                  <div className="w-8 h-px bg-gold mb-6" />
                  <h3 className="font-display text-xl font-medium mb-4">{item.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Who is it for */}
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
              <p>
                <span className="text-foreground font-medium">
                  No es para quien busca motivación. Es para quien busca la raíz.
                </span>
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Price box */}
      <section className="py-28 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(38_50%_48%/0.06)_0%,transparent_60%)]" />
        <FloatingParticles count={12} />
        <div className="container mx-auto px-6 max-w-3xl relative z-10">
          <FadeIn>
            <div className="relative p-12 md:p-16 bg-card/80 backdrop-blur-sm border border-gold/20 text-center hover:border-gold/40 transition-all duration-500 glow-gold">
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
              <p className="font-display text-5xl md:text-6xl font-light text-gold mb-2">180€</p>
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
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default LecturaEstructural;
