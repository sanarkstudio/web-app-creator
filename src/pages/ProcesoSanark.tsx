import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import FadeIn from "@/components/shared/FadeIn";
import SectionDivider from "@/components/shared/SectionDivider";
import { ArrowRight } from "lucide-react";

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
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />
        <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl py-28">
          <FadeIn>
            <p className="font-body text-xs tracking-[0.4em] uppercase text-gold mb-8">
              Transformación integral
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className="font-display text-5xl md:text-7xl font-light leading-[1.1] mb-8">
              Proceso Sanark
            </h1>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              12 sesiones individuales para dejar de reparar lo que ya no te sirve y crear la
              estructura desde la que realmente quieres operar.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Intro */}
      <section className="py-28 md:py-36">
        <div className="container mx-auto px-6 max-w-3xl">
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
                trabaja directamente sobre los programas que sostienen tus patrones repetitivos.
              </p>
              <p>
                Puedes cambiar hábitos, rutinas, entornos. Pero si la estructura subyacente
                permanece intacta, las fugas volverán. Los ciclos se repetirán. El techo seguirá ahí.
              </p>
              <p className="text-foreground font-medium">
                Este proceso existe para quienes están listos para intervenir en la raíz.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Phases */}
      <section className="py-28 md:py-36 bg-secondary/30">
        <div className="container mx-auto px-6 max-w-5xl">
          <FadeIn>
            <h2 className="font-display text-3xl md:text-5xl font-light text-center mb-16">
              Las cuatro fases
            </h2>
          </FadeIn>
          <div className="space-y-6">
            {phases.map((phase, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <div className="flex gap-8 p-8 md:p-10 bg-card border border-border/50 hover:border-gold/20 transition-all duration-500">
                  <span className="font-display text-4xl md:text-5xl font-light text-gold/40 shrink-0">
                    {phase.num}
                  </span>
                  <div>
                    <h3 className="font-display text-xl md:text-2xl font-medium mb-3">{phase.title}</h3>
                    <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
                      {phase.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
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
              El Proceso Sanark comienza siempre con una Lectura Estructural. Es el diagnóstico
              necesario para saber exactamente desde dónde partes y qué estructuras están operando.
              Sin ese mapa, no hay intervención posible.
            </p>
          </FadeIn>
          <FadeIn delay={0.35}>
            <Link
              to="/lectura-estructural"
              className="inline-flex items-center gap-3 font-body text-sm tracking-wider uppercase px-8 py-4 border border-gold/40 text-gold hover:bg-gold hover:text-background transition-all duration-500"
            >
              Comienza con tu Lectura Estructural
              <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 md:py-36 bg-secondary/30">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <FadeIn>
            <h2 className="font-display text-3xl md:text-5xl font-light mb-8 leading-tight">
              No se trata de ser mejor.
              <br />
              <span className="text-gold">Se trata de operar desde otro lugar.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="font-body text-base text-muted-foreground mb-12 max-w-xl mx-auto">
              Si ya hiciste tu Lectura Estructural y estás listo para el siguiente nivel, el
              Proceso Sanark es tu camino.
            </p>
          </FadeIn>
          <FadeIn delay={0.35}>
            <a
              href="mailto:info@sanark.com?subject=Información%20Proceso%20Sanark"
              className="inline-flex items-center gap-3 font-body text-sm tracking-wider uppercase px-8 py-4 bg-gold text-background hover:bg-gold-light transition-all duration-500 font-medium"
            >
              Solicitar información
              <ArrowRight size={16} />
            </a>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default ProcesoSanark;
