import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "@/components/shared/FadeIn";
import estructura1 from "@/assets/estructura-1.jpg";
import estructura2 from "@/assets/estructura-2.jpg";
import estructura3 from "@/assets/estructura-3.jpg";

const slides = [
  {
    src: estructura1,
    title: "La arquitectura que sostiene",
    text: "Una trama invisible levantada antes de que tuvieras palabras para nombrarla.",
  },
  {
    src: estructura2,
    title: "Los nodos que se repiten",
    text: "Cada vínculo, cada decisión, conectados por la misma red estructural.",
  },
  {
    src: estructura3,
    title: "La forma en la que asciendes",
    text: "Espirales que parecen avanzar, pero giran sobre el mismo eje heredado.",
  },
];

const StructureSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(38_50%_48%/0.05)_0%,transparent_60%)]" />
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <FadeIn>
          <p className="font-body text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase text-gold text-center mb-5 md:mb-6">
            La estructura, en imágenes
          </p>
          <h2 className="font-display text-2xl md:text-5xl font-light text-center mb-10 md:mb-16 leading-tight">
            Lo invisible, hecho forma
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="relative aspect-[16/10] md:aspect-[16/8] overflow-hidden border border-border/40">
            <AnimatePresence mode="sync">
              <motion.img
                key={index}
                src={slides[index].src}
                alt={slides[index].title}
                loading="lazy"
                width={1280}
                height={896}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="font-display text-xl md:text-3xl font-light text-foreground mb-2">
                    {slides[index].title}
                  </h3>
                  <p className="font-body text-sm md:text-base text-foreground/75 max-w-xl leading-relaxed">
                    {slides[index].text}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-6">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Ver imagen ${i + 1}`}
                className={`h-[3px] transition-all duration-500 ${
                  i === index ? "w-10 bg-gold" : "w-5 bg-gold/30 hover:bg-gold/50"
                }`}
              />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default StructureSlider;
