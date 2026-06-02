import { motion } from "framer-motion";

/**
 * Vertical animated thread that connects two sections.
 * Draws downward as it enters the viewport — a visual cue that
 * keeps the eye moving down the page toward the booking CTA.
 */
const SectionConnector = ({ className = "" }: { className?: string }) => (
  <div className={`flex justify-center py-2 md:py-4 ${className}`} aria-hidden>
    <motion.div
      className="w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent"
      initial={{ height: 0, opacity: 0 }}
      whileInView={{ height: 64, opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    />
  </div>
);

export default SectionConnector;
