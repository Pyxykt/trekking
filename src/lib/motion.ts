import type { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const staggerContainer = (delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: delay } },
});
