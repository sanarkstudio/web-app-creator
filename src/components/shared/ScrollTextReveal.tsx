import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ScrollTextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

/**
 * Apple-style word-by-word opacity reveal on scroll.
 * Each word transitions from dim to fully visible as the user scrolls through.
 */
const ScrollTextReveal = ({ text, className = "", as: Tag = "p" }: ScrollTextRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.25"],
  });

  const words = text.split(" ");

  return (
    <div ref={ref}>
      <Tag className={className} style={{ lineHeight: 1.3 }}>
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return <Word key={i} word={word} range={[start, end]} progress={scrollYProgress} />;
        })}
      </Tag>
    </div>
  );
};

const Word = ({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  progress: any;
}) => {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.3em] will-change-[opacity]">
      {word}
    </motion.span>
  );
};

export default ScrollTextReveal;
