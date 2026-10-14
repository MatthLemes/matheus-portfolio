import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-linear-to-r from-[#0A66C2] via-[#2563EB] to-[#0A66C2] origin-left z-50 pointer-events-none shadow-xs"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
};
