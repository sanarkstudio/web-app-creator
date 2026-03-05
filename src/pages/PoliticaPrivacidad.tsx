import Layout from "@/components/layout/Layout";
import FadeIn from "@/components/shared/FadeIn";

const PoliticaPrivacidad = () => {
  return (
    <Layout>
      <section className="py-28 md:py-36">
        <div className="container mx-auto px-6 max-w-3xl">
          <FadeIn>
            <h1 className="font-display text-4xl md:text-5xl font-light mb-12 text-center">
              Política de Privacidad
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="space-y-8 font-body text-sm text-muted-foreground leading-relaxed">
              <div>
                <h2 className="font-display text-xl font-medium text-foreground mb-3">Responsable del tratamiento</h2>
                <p>
                  Juan Carlos Sánchez Velázquez, bajo la marca Sanark, es el responsable del tratamiento de los datos personales
                  que me facilites a través de este sitio web o por cualquier otro canal de contacto.
                </p>
              </div>
              <div>
                <h2 className="font-display text-xl font-medium text-foreground mb-3">Qué datos recojo y para qué</h2>
                <p>
                  Recojo únicamente los datos que tú me proporcionas de forma voluntaria al contactarme: nombre, correo electrónico
                  y, en su caso, el contenido de tu mensaje. Los utilizo exclusivamente para responder a tu consulta y, si lo solicitas,
                  para gestionar la reserva de una Lectura Estructural o un Proceso Sanark.
                </p>
              </div>
              <div>
                <h2 className="font-display text-xl font-medium text-foreground mb-3">Base legal</h2>
                <p>
                  El tratamiento de tus datos se basa en tu consentimiento expreso al contactarme y en la ejecución del servicio
                  que solicitas. No comparto tus datos con terceros ni los utilizo con fines comerciales ajenos a lo pactado.
                </p>
              </div>
              <div>
                <h2 className="font-display text-xl font-medium text-foreground mb-3">Conservación</h2>
                <p>
                  Conservo tus datos durante el tiempo necesario para gestionar tu solicitud y cumplir con las obligaciones legales aplicables.
                  Puedes solicitar su eliminación en cualquier momento escribiéndome a info@sanark.com.
                </p>
              </div>
              <div>
                <h2 className="font-display text-xl font-medium text-foreground mb-3">Tus derechos</h2>
                <p>
                  Tienes derecho a acceder, rectificar, suprimir, limitar u oponerte al tratamiento de tus datos, así como a su portabilidad.
                  Para ejercer cualquiera de estos derechos, contacta conmigo en info@sanark.com.
                </p>
              </div>
              <div>
                <h2 className="font-display text-xl font-medium text-foreground mb-3">Cookies</h2>
                <p>
                  Este sitio web no utiliza cookies de seguimiento ni herramientas de análisis invasivas.
                  Tu navegación aquí es limpia, como debería ser.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default PoliticaPrivacidad;
