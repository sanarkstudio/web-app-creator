import { motion } from "framer-motion";
import FloatingParticles from "./FloatingParticles";

const HeroBackground = ({ particles = 60 }: { particles?: number }) => (
  <>
    <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(38_50%_48%/0.12)_0%,transparent_70%)]" />

    {/* Pulsing radial glows — more visible */}
    <motion.div
      className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,hsl(38_50%_48%/0.18)_0%,transparent_50%)]"
      animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.15, 0.9] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute inset-0 bg-[radial-gradient(circle_at_30%_60%,hsl(38_40%_40%/0.10)_0%,transparent_40%)]"
      animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.25, 1] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
    />
    <motion.div
      className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,hsl(38_55%_50%/0.08)_0%,transparent_45%)]"
      animate={{ opacity: [0.3, 0.8, 0.3], scale: [1.1, 0.9, 1.1] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
    />

    {/* Animated structural lines — more visible */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[15, 35, 55, 75, 90].map((left, i) => (
        <motion.div
          key={i}
          className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/[0.08] to-transparent"
          style={{ left: `${left}%` }}
          animate={{ opacity: [0, 1, 0], scaleY: [0.3, 1, 0.3] }}
          transition={{
            duration: 5 + i * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.2,
          }}
        />
      ))}
      {[20, 40, 60, 80].map((top, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/[0.06] to-transparent"
          style={{ top: `${top}%` }}
          animate={{ opacity: [0, 0.7, 0] }}
          transition={{
            duration: 7 + i * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.8,
          }}
        />
      ))}

      {/* Diagonal accent lines */}
      {[0, 1].map((i) => (
        <motion.div
          key={`d-${i}`}
          className="absolute w-[200%] h-px bg-gradient-to-r from-transparent via-gold/[0.05] to-transparent"
          style={{
            top: `${30 + i * 40}%`,
            left: "-50%",
            transform: `rotate(${i === 0 ? -15 : 15}deg)`,
          }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{
            duration: 10 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 3,
          }}
        />
      ))}
    </div>

    <FloatingParticles count={particles} />
  </>
);

export default HeroBackground;
