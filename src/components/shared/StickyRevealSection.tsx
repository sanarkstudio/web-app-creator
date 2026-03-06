import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface StickyRevealSectionProps {
  children: ReactNode;
  className?: string;
  /** How tall the scroll area is relative to viewport (e.g. 2 = 200vh) */
  scrollHeight?: number;
}

/**
 * Apple-style sticky section that pins content while scroll-driven
 * animations play (scale, opacity mask, etc.)
 */
const StickyRevealSection = ({ children, className = "", scrollHeight = 1.5 }: StickyRevealSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.8, 1], [0.92, 1, 0.96]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const maskProgress = useTransform(scrollYProgress, [0, 0.4], [0, 100]);
  const clipPath = useTransform(
    maskProgress,
    (v) => `inset(${Math.max(0, 50 - v / 2)}% 0% ${Math.max(0, 50 - v / 2)}% 0%)`
  );

  return (
    <div ref={ref} style={{ height: `${scrollHeight * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale, opacity, clipPath }}
          className={`w-full ${className}`}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default StickyRevealSection;
