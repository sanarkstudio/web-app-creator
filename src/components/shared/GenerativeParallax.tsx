import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";

/**
 * GenerativeParallax — Sanark structural parallax system.
 *
 * Layered, depth-based composition built from the Sanark grid:
 *  L1 — Deep gold nebula (slowest)
 *  L2 — Generative particle field (medium parallax)
 *  L3 — Sanark structural lattice (vertical/horizontal lines + concentric rings)
 *  L4 — Foreground sparks and orbiting nodes (fastest, mouse-reactive)
 *
 * All motion derives from scroll progress + smoothed mouse position.
 * No cinematic typography or scan lines — pure structural depth.
 */

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  depth: number; // 0 (far) → 1 (near)
  duration: number;
  delay: number;
  drift: number;
};

const GenerativeParallax = ({
  density = 70,
  intensity = 1,
}: {
  density?: number;
  intensity?: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll-driven parallax
  const { scrollY } = useScroll();
  const yFar = useTransform(scrollY, [0, 1000], [0, 60 * intensity]);
  const yMid = useTransform(scrollY, [0, 1000], [0, 140 * intensity]);
  const yNear = useTransform(scrollY, [0, 1000], [0, 240 * intensity]);
  const ringScale = useTransform(scrollY, [0, 800], [1, 1.25]);
  const ringOpacity = useTransform(scrollY, [0, 600], [0.35, 0]);

  // Mouse-driven parallax (smoothed)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 40, damping: 20, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 40, damping: 20, mass: 0.6 });

  const mxFar = useTransform(smx, (v) => v * 8 * intensity);
  const myFar = useTransform(smy, (v) => v * 8 * intensity);
  const mxMid = useTransform(smx, (v) => v * 18 * intensity);
  const myMid = useTransform(smy, (v) => v * 18 * intensity);
  const mxNear = useTransform(smx, (v) => v * 32 * intensity);
  const myNear = useTransform(smy, (v) => v * 32 * intensity);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mx.set((e.clientX / w - 0.5) * 2);
      my.set((e.clientY / h - 0.5) * 2);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  // Generative particle field (depth-stratified)
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: density }, (_, i) => {
        const depth = Math.random();
        return {
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: 0.6 + depth * 2.4,
          depth,
          duration: 14 + Math.random() * 18,
          delay: Math.random() * 8,
          drift: (Math.random() - 0.5) * 60,
        };
      }),
    [density]
  );

  // Sanark structural grid coordinates
  const verticalLines = [12, 26, 50, 74, 88];
  const horizontalLines = [22, 50, 78];
  const rings = [180, 320, 480, 680];

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden
    >
      {/* L1 — Deep nebula */}
      <motion.div
        className="absolute inset-0"
        style={{ y: yFar, x: mxFar }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,hsl(38_55%_50%/0.18)_0%,transparent_60%)]" />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,hsl(38_45%_42%/0.12)_0%,transparent_45%)]"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,hsl(38_60%_55%/0.10)_0%,transparent_40%)]"
          animate={{ opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
      </motion.div>

      {/* L2 — Sanark lattice (concentric rings + structural lines) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ y: yMid, x: mxMid, opacity: ringOpacity, scale: ringScale }}
      >
        {rings.map((size, i) => (
          <motion.div
            key={`ring-${i}`}
            className="absolute rounded-full border border-gold/15"
            style={{ width: size, height: size }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 80 + i * 30, repeat: Infinity, ease: "linear" }}
          />
        ))}
        {/* Inner pulse */}
        <motion.div
          className="absolute w-24 h-24 rounded-full bg-gold/10 blur-2xl"
          animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* L2b — Structural grid lines */}
      <motion.div className="absolute inset-0" style={{ y: yMid, x: myMid }}>
        {verticalLines.map((left, i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent"
            style={{ left: `${left}%` }}
            animate={{ opacity: [0.1, 0.5, 0.1], scaleY: [0.6, 1, 0.6] }}
            transition={{
              duration: 6 + i * 1.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.9,
            }}
          />
        ))}
        {horizontalLines.map((top, i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent"
            style={{ top: `${top}%` }}
            animate={{ opacity: [0.05, 0.4, 0.05] }}
            transition={{
              duration: 8 + i * 1.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.4,
            }}
          />
        ))}
      </motion.div>

      {/* L3 — Generative particle field (depth stratified) */}
      <motion.div className="absolute inset-0" style={{ y: yNear, x: mxNear }}>
        {particles.map((p) => {
          const opacity = 0.08 + p.depth * 0.35;
          return (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                background: `hsl(38 55% ${45 + p.depth * 15}% / ${opacity})`,
                boxShadow:
                  p.depth > 0.7
                    ? `0 0 ${4 + p.depth * 8}px hsl(38 55% 50% / ${opacity})`
                    : "none",
              }}
              animate={{
                y: [0, -40 - p.depth * 60, 0],
                x: [0, p.drift, 0],
                opacity: [opacity * 0.6, opacity, opacity * 0.6],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </motion.div>

      {/* L4 — Foreground orbiting nodes (mouse-reactive, fastest) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ x: mxNear, y: myNear }}
      >
        {[0, 1, 2, 3].map((i) => {
          const radius = 140 + i * 70;
          const duration = 28 + i * 10;
          return (
            <motion.div
              key={`orbit-${i}`}
              className="absolute"
              style={{ width: radius * 2, height: radius * 2 }}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{ duration, repeat: Infinity, ease: "linear" }}
            >
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gold"
                style={{
                  boxShadow: "0 0 12px hsl(38 60% 55% / 0.9), 0 0 24px hsl(38 60% 55% / 0.5)",
                }}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Subtle vignette to ground the composition */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,hsl(var(--background))_100%)]" />
    </div>
  );
};

export default GenerativeParallax;
