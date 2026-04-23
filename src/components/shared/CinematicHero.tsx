import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Slider Revolution-style cinematic hero overlay.
 * - Animated kinetic typography phrases that fade in/out
 * - Layered parallax light beams
 * - Animated scan line crossing the viewport
 * - Subtle mouse-reactive gradient
 */
const phrases = [
  "Heredaste una estructura.",
  "No la elegiste.",
  "Hoy decide por ti.",
  "Mañana ya no.",
];

const CinematicHero = () => {
  const [active, setActive] = useState(0);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % phrases.length), 3200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Mouse-reactive gradient */}
      <div
        className="absolute inset-0 transition-[background] duration-700 ease-out"
        style={{
          background: `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, hsl(38 50% 48% / 0.18) 0%, transparent 45%)`,
        }}
      />

      {/* Vertical light beams that sweep */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`beam-${i}`}
          className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-gold/40 to-transparent"
          initial={{ left: "-5%", opacity: 0 }}
          animate={{
            left: ["−5%", "105%"],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            delay: i * 2.5,
            ease: "easeInOut",
          }}
          style={{ filter: "blur(1px)" }}
        />
      ))}

      {/* Horizontal scan line */}
      <motion.div
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/60 to-transparent"
        initial={{ top: "-5%" }}
        animate={{ top: ["-5%", "105%"] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{ filter: "blur(0.5px)", boxShadow: "0 0 20px hsl(38 50% 48% / 0.6)" }}
      />

      {/* Kinetic phrases — bottom corner */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 w-full text-center pointer-events-none">
        {phrases.map((p, i) => (
          <motion.div
            key={i}
            className="absolute inset-x-0"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={
              active === i
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: -20, filter: "blur(8px)" }
            }
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-display text-sm md:text-base tracking-[0.4em] uppercase text-gold/70">
              {p}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Corner brackets — Slider Revolution style */}
      {[
        { top: "8%", left: "6%", rotate: 0 },
        { top: "8%", right: "6%", rotate: 90 },
        { bottom: "8%", left: "6%", rotate: -90 },
        { bottom: "8%", right: "6%", rotate: 180 },
      ].map((pos, i) => (
        <motion.div
          key={`bracket-${i}`}
          className="absolute w-12 h-12"
          style={pos as any}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ delay: 0.8 + i * 0.15, duration: 0.8 }}
        >
          <div
            className="w-full h-full"
            style={{
              borderTop: "1px solid hsl(var(--gold) / 0.5)",
              borderLeft: "1px solid hsl(var(--gold) / 0.5)",
              transform: `rotate(${pos.rotate}deg)`,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default CinematicHero;
