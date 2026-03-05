import Layout from "@/components/layout/Layout";
import FadeIn from "@/components/shared/FadeIn";

const AvisoLegal = () => {
  return (
    <Layout>
      <section className="py-28 md:py-36">
        <div className="container mx-auto px-6 max-w-3xl">
          <FadeIn>
            <h1 className="font-display text-4xl md:text-5xl font-light mb-12 text-center">
              Aviso Legal
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="space-y-8 font-body text-sm text-muted-foreground leading-relaxed">
              <div>
                <h2 className="font-display text-xl font-medium text-foreground mb-3">Titular</h2>
                <p>
                  Este sitio web es propiedad de Juan Carlos Sánchez Velázquez, que opera bajo la marca comercial Sanark.
                  Para cualquier comunicación, puedes dirigirte a info@sanark.com.
                </p>
              </div>
              <div>
                <h2 className="font-display text-xl font-medium text-foreground mb-3">Objeto del sitio</h2>
                <p>
                  Este espacio tiene como finalidad informar sobre los servicios de Decodificación Estructural de Vida que ofrezco:
                  la Lectura Estructural y el Proceso Sanark. Todo el contenido publicado es orientativo y no constituye
                  asesoramiento médico, psicológico ni terapéutico de ningún tipo.
                </p>
              </div>
              <div>
                <h2 className="font-display text-xl font-medium text-foreground mb-3">Propiedad intelectual</h2>
                <p>
                  Todos los textos, elementos gráficos, estructura, diseño y contenido de este sitio web son propiedad
                  exclusiva de Sanark o cuentan con la debida autorización para su uso. Queda prohibida su reproducción,
                  distribución o transformación sin autorización expresa por escrito.
                </p>
              </div>
              <div>
                <h2 className="font-display text-xl font-medium text-foreground mb-3">Limitación de responsabilidad</h2>
                <p>
                  Mi trabajo es estructural, no clínico. No sustituye ningún tratamiento médico, psicológico ni farmacológico.
                  Cada persona es responsable de las decisiones que tome a partir de la información obtenida en una Lectura Estructural
                  o en el Proceso Sanark.
                </p>
              </div>
              <div>
                <h2 className="font-display text-xl font-medium text-foreground mb-3">Legislación aplicable</h2>
                <p>
                  Este sitio web y las relaciones derivadas de su uso se rigen por la legislación española vigente.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default AvisoLegal;
