import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const IFRAME_URL = ""; // ← Reemplazar con la URL pública de tu cuestionario

const LecturaIntroductoria = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Minimal top bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-between px-6 py-4 border-b border-border/30 bg-background/95 backdrop-blur-xl"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-body text-xs tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} />
          Volver
        </Link>
        <p className="font-display text-sm text-gold tracking-wider">
          Lectura Introductoria
        </p>
        <Link
          to="/lectura-estructural"
          className="font-body text-xs tracking-wider uppercase text-gold hover:text-gold-light transition-colors"
        >
          Lectura completa →
        </Link>
      </motion.div>

      {/* Iframe container */}
      <div className="flex-1 relative">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-center"
            >
              <p className="font-display text-2xl text-gold mb-2">Cargando...</p>
              <p className="font-body text-xs text-muted-foreground tracking-wider">
                Tu lectura introductoria está en camino
              </p>
            </motion.div>
          </div>
        )}

        {IFRAME_URL ? (
          <iframe
            src={IFRAME_URL}
            className="w-full h-full border-0"
            onLoad={() => setLoaded(true)}
            allow="clipboard-write"
            title="Lectura Introductoria Sanark"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center max-w-md px-6">
              <p className="font-display text-3xl text-foreground mb-4">
                Próximamente
              </p>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8">
                La lectura introductoria estará disponible aquí. 
                Una primera experiencia gratuita para que descubras qué estructura 
                está operando por debajo de tus decisiones.
              </p>
              <Link
                to="/lectura-estructural"
                className="inline-flex items-center gap-2 font-body text-sm tracking-wider uppercase px-8 py-3 bg-gold text-background hover:bg-gold-light transition-all duration-500"
              >
                Mientras tanto, accede a tu lectura completa
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LecturaIntroductoria;
