import { motion } from "framer-motion";
import FloatingParticles from "./FloatingParticles";

const HeroBackground = ({ particles = 60 }: { particles?: number }) => (
  <>
    <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(38_50%_48%/0.08)_0%,transparent_70%)]" />

    {/* Pulsing radial glows */}
    <motion.div
      className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,hsl(38_50%_48%/0.12)_0%,transparent_50%)]"
      animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1.1, 0.9] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute inset-0 bg-[radial-gradient(circle_at_30%_60%,hsl(38_40%_40%/0.06)_0%,transparent_40%)]"
      animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
    />

    {/* Animated structural lines */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[20, 40, 60, 80].map((left, i) => (
        <motion.div
          key={i}
          className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/[0.04] to-transparent"
          style={{ left: `${left}%` }}
          animate={{ opacity: [0, 0.6, 0], scaleY: [0.5, 1, 0.5] }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5,
          }}
        />
      ))}
      {[25, 50, 75].map((top, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/[0.03] to-transparent"
          style={{ top: `${top}%` }}
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2,
          }}
        />
      ))}
    </div>

    <FloatingParticles count={particles} />
  </>
);

export default HeroBackground;
