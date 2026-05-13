import { ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileExpandableProps {
  /** Texto/contenido siempre visible (preview corto) */
  preview: ReactNode;
  /** Contenido extra que se revela al pulsar "Leer más" en móvil */
  extra: ReactNode;
  /** Etiquetas opcionales del toggle */
  moreLabel?: string;
  lessLabel?: string;
  /** className para el wrapper */
  className?: string;
}

/**
 * En móvil muestra `preview` + botón "Leer más" que despliega `extra`.
 * En desktop (md+) muestra todo el contenido sin acordeón.
 */
const MobileExpandable = ({
  preview,
  extra,
  moreLabel = "Leer más",
  lessLabel = "Leer menos",
  className = "",
}: MobileExpandableProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={className}>
      {preview}

      {/* Desktop: contenido extra siempre visible */}
      <div className="hidden md:block">{extra}</div>

      {/* Mobile: contenido extra colapsable */}
      <div className="md:hidden">
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="extra"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-4">{extra}</div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="mt-4 inline-flex items-center gap-2 font-body text-xs tracking-[0.25em] uppercase text-gold/80 hover:text-gold transition-colors"
        >
          {open ? lessLabel : moreLabel}
          <ChevronDown
            size={14}
            className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </button>
      </div>
    </div>
  );
};

export default MobileExpandable;
