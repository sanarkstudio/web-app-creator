import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, HelpCircle } from "lucide-react";
import FadeIn from "./FadeIn";
import BookingFormDialog from "./BookingFormDialog";

const faqs = [
  {
    q: "¿Esto es terapia o coaching?",
    a: "No. La terapia trabaja el síntoma; el coaching la meta. Yo trabajo la estructura desde la que ambos emergen. No te ayudo a sentirte mejor: te muestro lo que opera por debajo y te enseño a desmontarlo.",
  },
  {
    q: "Llevo años trabajando en mí. ¿Qué encontraré aquí que no haya visto antes?",
    a: "Encontrarás la capa de la que casi nadie habla: la arquitectura heredada que sigue dirigiendo tus respuestas por debajo, aunque ya hayas hecho mucho trabajo personal. No es más información ni otra técnica encima de las que ya conoces — es ver el plano desde el que se sostienen tus patrones, y aprender a desmontarlo. Si sientes que has avanzado mucho y aun así hay algo que no termina de moverse, casi siempre está aquí.",
  },
  {
    q: "¿Necesito creer en algo espiritual o energético?",
    a: "No. Aquí no hay dogma, ni cartas, ni creencias. Es lectura estructural — observación clara de patrones reales que operan en tu vida. Lo que ves, lo verificas en tu propia experiencia.",
  },
  {
    q: "¿Qué pasa exactamente en una Lectura Estructural?",
    a: "90 minutos uno a uno. Leo la estructura activa desde la que estás operando hoy y te muestro los programas heredados que la sostienen. Sales con una visión clara — y con la decisión de qué hacer con ella.",
  },
  {
    q: "¿Es online o presencial?",
    a: "Online. Sesión 1:1 por videollamada. La distancia no afecta la lectura: la estructura se lee, no se toca.",
  },
  {
    q: "¿Tengo que hacer el Proceso Sanark después de la Lectura?",
    a: "No. La Lectura es completa en sí misma. El Proceso Sanark existe para quien, después de ver, decide construir una estructura nueva. Es una elección, no una obligación.",
  },
  {
    q: "¿En cuánto tiempo se notan los cambios?",
    a: "Algunos los notas el mismo día — porque ver lo que antes no veías ya cambia cómo decides. Los cambios estructurales profundos se consolidan a lo largo del Proceso.",
  },
  {
    q: "¿Cómo sé si esto es para mí?",
    a: "Si has probado mucho y algo fundamental sigue sin moverse, lo es. Si lo que necesitas es que alguien te diga lo que quieres oír, no lo es.",
  },
];

const FaqSection = () => {
  return (
    <section className="py-32 md:py-48 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(38_50%_48%/0.04)_0%,transparent_55%)]" />
      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <FadeIn>
          <HelpCircle size={24} className="text-gold/60 mx-auto mb-6" strokeWidth={1.5} />
          <p className="font-body text-xs tracking-[0.4em] uppercase text-gold text-center mb-6">
            Lo que sueles preguntarme
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-light text-center mb-14 leading-tight">
            Respuestas claras,
            <br />
            <span className="gradient-text-gold">sin rodeos.</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((item, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-border/40 hover:border-gold/30 bg-card/50 backdrop-blur-sm px-6 transition-colors duration-300"
              >
                <AccordionTrigger className="font-display text-base md:text-lg font-light text-left text-foreground/90 hover:no-underline hover:text-gold transition-colors py-5">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="font-body text-base text-foreground/85 leading-relaxed pb-6 pt-1">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-14 text-center">
            <p className="font-body text-base text-foreground/80 mb-6">
              ¿Tu pregunta no está aquí? La respuesta más honesta llega en sesión.
            </p>
            <BookingFormDialog
              cta="Resolver lo mío en 90 minutos"
              location="home_faq"
              trigger={
                <button className="group inline-flex items-center gap-3 font-body text-sm tracking-wider uppercase px-10 py-4 border border-gold/40 text-gold hover:bg-gold hover:text-background transition-all duration-500">
                  Resolver lo mío en 90 minutos
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              }
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default FaqSection;
