import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin gold reading-progress bar fixed at the top of the viewport.
 * Gives momentum + feedback that invites the user to keep scrolling.
 */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left bg-gradient-to-r from-gold-dark via-gold to-gold-light shadow-[0_0_12px_hsl(38_50%_48%/0.6)]"
    />
  );
};

export default ScrollProgress;
