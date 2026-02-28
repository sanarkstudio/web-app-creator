import { motion, type Easing } from "framer-motion";

const ease: Easing = [0.22, 1, 0.36, 1];

/** Animated SVG of the Sanark compass symbol — draws on scroll/view */
const SanarkSymbol = ({ size = 200, className = "" }: { size?: number; className?: string }) => {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: i * 0.3, duration: 2, ease },
        opacity: { delay: i * 0.3, duration: 0.5 },
      },
    }),
  };

  return (
    <motion.svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.circle cx="100" cy="100" r="85" fill="none" stroke="hsl(38 50% 48%)" strokeWidth="1.5" variants={draw} custom={0} />
      <motion.path d="M100 30 Q120 80 170 100 Q120 120 100 170 Q80 120 30 100 Q80 80 100 30Z" fill="none" stroke="hsl(38 50% 48%)" strokeWidth="1.5" variants={draw} custom={0.5} />
      <motion.path d="M100 65 Q110 90 135 100 Q110 110 100 135 Q90 110 65 100 Q90 90 100 65Z" fill="hsl(38 50% 48% / 0.15)" stroke="hsl(38 50% 48%)" strokeWidth="1" variants={draw} custom={1} />
      <motion.line x1="100" y1="12" x2="100" y2="30" stroke="hsl(38 50% 48%)" strokeWidth="1" variants={draw} custom={1.2} />
      <motion.line x1="100" y1="170" x2="100" y2="188" stroke="hsl(38 50% 48%)" strokeWidth="1" variants={draw} custom={1.2} />
      <motion.line x1="12" y1="100" x2="30" y2="100" stroke="hsl(38 50% 48%)" strokeWidth="1" variants={draw} custom={1.2} />
      <motion.line x1="170" y1="100" x2="188" y2="100" stroke="hsl(38 50% 48%)" strokeWidth="1" variants={draw} custom={1.2} />
    </motion.svg>
  );
};

export default SanarkSymbol;
