import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface HorizontalScrollSectionProps {
  children: ReactNode;
  /** Number of "panels" to determine scroll width */
  panels?: number;
  className?: string;
}

/**
 * Apple-style horizontal scroll section driven by vertical scroll.
 */
const HorizontalScrollSection = ({ children, panels = 3, className = "" }: HorizontalScrollSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(panels - 1) * 100}%`]);

  return (
    <div ref={ref} style={{ height: `${panels * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div
          style={{ x }}
          className={`flex ${className}`}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default HorizontalScrollSection;
