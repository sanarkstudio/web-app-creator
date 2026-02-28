import Layout from "@/components/layout/Layout";
import FadeIn from "@/components/shared/FadeIn";
import SectionDivider from "@/components/shared/SectionDivider";
import { ArrowRight } from "lucide-react";

const LecturaEstructural = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />
        <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl py-28">
          <FadeIn>
            <p className="font-body text-xs tracking-[0.4em] uppercase text-gold mb-8">
              El punto de partida
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className="font-display text-5xl md:text-7xl font-light leading-[1.1] mb-8">
              Lectura Estructural
            </h1>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Un diagnóstico avanzado que revela la estructura profunda desde la que operas.
              No lo que te pasa. Sino lo que lo sostiene.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* What is it */}
      <section className="py-28 md:py-36">
        <div className="container mx-auto px-6 max-w-3xl">
          <FadeIn><SectionDivider /></FadeIn>
          <FadeIn delay={0.15}>
            <h2 className="font-display text-3xl md:text-5xl font-light text-center mt-12 mb-10">
              ¿Qué es una Lectura Estructural?
            </h2>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="space-y-6 font-body text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Es un modelo de diagnóstico que va más allá de los síntomas, las emociones o los
                comportamientos visibles. La Lectura Estructural accede a la capa más profunda de tu
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
      <section className="py-28 md:py-36 bg-secondary/30">
        <div className="container mx-auto px-6 max-w-5xl">
          <FadeIn>
            <h2 className="font-display text-3xl md:text-5xl font-light text-center mb-16">
              Lo que revela
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Tus programas heredados",
                desc: "Los patrones instalados antes de tu consciencia que dictan cómo gestionas energía, vínculos, salud y recursos.",
              },
              {
                title: "Tus fugas activas",
                desc: "Dónde pierdes energía, tiempo y claridad de forma cíclica. Las repeticiones que ningún hábito nuevo ha logrado detener.",
              },
              {
                title: "Tu mapa estructural",
                desc: "Una visión completa de las dimensiones donde estos programas operan: física, emocional, mental, relacional, social y financiera.",
              },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div className="p-8 bg-card border border-border/50 h-full">
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

      {/* CTA */}
      <section className="py-28 md:py-36 bg-secondary/30">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <FadeIn>
            <h2 className="font-display text-3xl md:text-5xl font-light mb-8 leading-tight">
              El primer paso es <span className="text-gold">ver</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="font-body text-base text-muted-foreground mb-12 max-w-xl mx-auto">
              La Lectura Estructural es una sesión individual donde se decodifica tu estructura
              actual. Sin interpretaciones. Sin suposiciones. Solo lo que está operando.
            </p>
          </FadeIn>
          <FadeIn delay={0.35}>
            <a
              href="mailto:info@sanark.com?subject=Reserva%20Lectura%20Estructural"
              className="inline-flex items-center gap-3 font-body text-sm tracking-wider uppercase px-8 py-4 bg-gold text-background hover:bg-gold-light transition-all duration-500 font-medium"
            >
              Reserva tu Lectura Estructural
              <ArrowRight size={16} />
            </a>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default LecturaEstructural;
