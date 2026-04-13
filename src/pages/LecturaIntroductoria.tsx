import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const IFRAME_URL = (import.meta.env.VITE_LECTURA_INTRO_URL ?? "").trim();

const LecturaIntroductoria = () => {
  const [loaded, setLoaded] = useState(false);
  const hasIframe = Boolean(IFRAME_URL);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 border-b border-border/30 bg-background/95 backdrop-blur-xl"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-body text-xs tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} />
          Volver
        </Link>
        <p className="font-display text-sm text-gold tracking-wider">Lectura Introductoria</p>
        <Link
          to="/lectura-estructural"
          className="font-body text-xs tracking-wider uppercase text-gold hover:text-gold-light transition-colors"
        >
          Lectura completa →
        </Link>
      </motion.div>

      <div className="flex-1 relative">
        {hasIframe && !loaded && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/90">
            <motion.div
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="text-center"
            >
              <p className="font-display text-2xl text-gold mb-2">Cargando lectura introductoria...</p>
              <p className="font-body text-xs text-muted-foreground tracking-wider">
                Preparando tu primera experiencia estructural
              </p>
            </motion.div>
          </div>
        )}

        {hasIframe ? (
          <iframe
            src={IFRAME_URL}
            className="w-full h-[calc(100vh-73px)] border-0"
            onLoad={() => setLoaded(true)}
            allow="clipboard-write"
            title="Lectura Introductoria Sanark"
          />
        ) : (
          <div className="h-[calc(100vh-73px)] flex items-center justify-center px-6">
            <div className="w-full max-w-2xl text-center p-10 bg-card/60 border border-border/40">
              <p className="font-display text-3xl md:text-4xl text-foreground mb-4">Activa tu acceso introductorio</p>
              <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed mb-8">
                Esta página ya está lista. Solo falta conectar la URL pública de tu cuestionario para mostrarlo aquí en pantalla completa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center font-body text-sm tracking-wider uppercase px-8 py-3 border border-gold/40 text-gold hover:bg-gold hover:text-background transition-all duration-500"
                >
                  Volver al inicio
                </Link>
                <Link
                  to="/lectura-estructural"
                  className="inline-flex items-center justify-center font-body text-sm tracking-wider uppercase px-8 py-3 bg-gold text-background hover:bg-gold-light transition-all duration-500"
                >
                  Ir a lectura completa
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LecturaIntroductoria;
