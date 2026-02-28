import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import FadeIn from "@/components/shared/FadeIn";
import SectionDivider from "@/components/shared/SectionDivider";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />
        <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
          <FadeIn delay={0.1}>
            <p className="font-body text-xs tracking-[0.4em] uppercase text-gold mb-8">
              Decodificación Estructural de Vida
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light leading-[1.1] mb-8">
              No cambias lo que haces.
              <br />
              <span className="gradient-text-gold font-medium">Cambias desde donde operas.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.5}>
            <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
              Has trabajado en ti. Has invertido tiempo, energía y recursos. Pero ciertos patrones
              siguen ahí, intactos. No es un problema de voluntad. Es un problema de estructura.
            </p>
          </FadeIn>
          <FadeIn delay={0.7}>
            <Link
              to="/lectura-estructural"
              className="inline-flex items-center gap-3 font-body text-sm tracking-wider uppercase px-8 py-4 border border-gold/40 text-gold hover:bg-gold hover:text-background transition-all duration-500"
            >
              Descubre tu estructura
              <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Problem */}
      <section className="py-28 md:py-36">
        <div className="container mx-auto px-6 max-w-3xl">
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
        </div>
      </section>

      {/* Solution */}
      <section className="py-28 md:py-36 bg-secondary/30">
        <div className="container mx-auto px-6 max-w-5xl">
          <FadeIn>
            <p className="font-body text-xs tracking-[0.4em] uppercase text-gold text-center mb-6">
              Lo que hacemos
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-light text-center mb-16 leading-tight">
              Revelamos lo que sostiene todo lo demás
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeIn delay={0.15}>
              <Link
                to="/lectura-estructural"
                className="group block p-10 bg-card border border-border/50 hover:border-gold/30 transition-all duration-500"
              >
                <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4">Paso 1</p>
                <h3 className="font-display text-2xl md:text-3xl font-light mb-4">Lectura Estructural</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
                  Un diagnóstico profundo que revela la estructura desde la que operas: qué programas
                  heredados dirigen tu vida física, emocional, relacional y financiera. El punto de
                  partida imprescindible.
                </p>
                <span className="inline-flex items-center gap-2 text-gold text-sm font-body tracking-wider uppercase group-hover:gap-4 transition-all duration-300">
                  Conocer más <ArrowRight size={14} />
                </span>
              </Link>
            </FadeIn>
            <FadeIn delay={0.3}>
              <Link
                to="/proceso-sanark"
                className="group block p-10 bg-card border border-border/50 hover:border-gold/30 transition-all duration-500"
              >
                <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4">Paso 2</p>
                <h3 className="font-display text-2xl md:text-3xl font-light mb-4">Proceso Sanark</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
                  12 sesiones individuales para detectar, diseñar, crear y habitar una nueva estructura.
                  No se trata de mejorar la versión actual. Se trata de operar desde un lugar
                  completamente distinto.
                </p>
                <span className="inline-flex items-center gap-2 text-gold text-sm font-body tracking-wider uppercase group-hover:gap-4 transition-all duration-300">
                  Conocer más <ArrowRight size={14} />
                </span>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Identification */}
      <section className="py-28 md:py-36">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <FadeIn>
            <h2 className="font-display text-3xl md:text-5xl font-light mb-12 leading-tight">
              Si esto te suena, no es casualidad
            </h2>
          </FadeIn>
          <div className="space-y-6">
            {[
              "Sientes que ya has hecho \"todo\" pero algo sigue sin encajar.",
              "Repites patrones en tus relaciones, tu salud o tus finanzas.",
              "Has avanzado mucho, pero hay un techo que no logras romper.",
              "Sabes que hay algo más profundo operando, pero no sabes qué es.",
              "Estás listo para dejar de trabajar sobre los síntomas.",
            ].map((text, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <p className="font-body text-base md:text-lg text-foreground/80 py-4 border-b border-border/30 last:border-0">
                  {text}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-28 md:py-36 bg-secondary/30">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <FadeIn>
            <h2 className="font-display text-3xl md:text-5xl font-light mb-8 leading-tight">
              Tu estructura actual tiene una fecha de caducidad.
              <br />
              <span className="text-gold">Tú decides cuándo.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="font-body text-base text-muted-foreground mb-12 max-w-xl mx-auto">
              La Lectura Estructural es el primer paso. Un diagnóstico que te muestra exactamente
              desde dónde estás operando y por qué ciertos resultados se repiten.
            </p>
          </FadeIn>
          <FadeIn delay={0.35}>
            <Link
              to="/lectura-estructural"
              className="inline-flex items-center gap-3 font-body text-sm tracking-wider uppercase px-8 py-4 bg-gold text-background hover:bg-gold-light transition-all duration-500 font-medium"
            >
              Reserva tu Lectura Estructural
              <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
