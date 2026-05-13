import { ReactNode } from "react";
import BookingFormDialog from "./BookingFormDialog";
import { ArrowRight } from "lucide-react";

interface MobileStickyCTAProps {
  cta: string;
  location: string;
  /** Texto pequeño bajo el CTA, ej. "180€ · 90 min" */
  meta?: string;
  /** Si se quiere usar Link en vez de BookingFormDialog (no implementado por ahora) */
  trigger?: ReactNode;
}

/**
 * Barra fija inferior visible solo en móvil con el CTA principal de la página.
 * Se oculta en desktop (md+).
 */
const MobileStickyCTA = ({ cta, location, meta }: MobileStickyCTAProps) => (
  <div
    className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/85 backdrop-blur-xl border-t border-gold/20"
    style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
  >
    <div className="px-4 py-3 flex flex-col items-stretch gap-1">
      <BookingFormDialog
        cta={cta}
        location={location}
        trigger={
          <button className="group inline-flex items-center justify-center gap-2 font-body text-[11px] tracking-[0.2em] uppercase px-4 py-3 bg-gold text-background hover:bg-gold-light transition-all duration-300 font-semibold w-full">
            {cta}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        }
      />
      {meta && (
        <p className="font-body text-[10px] text-foreground/55 text-center tracking-wider">
          {meta}
        </p>
      )}
    </div>
  </div>
);

export default MobileStickyCTA;
