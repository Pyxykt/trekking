import { motion } from "framer-motion";
import { C } from "../../constants/colors";

export function MountainSilhouette({ scrollY }: { scrollY: number }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden">
      <motion.div style={{ y: scrollY * 0.1 }}>
        <svg
          viewBox="0 0 1440 260"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block" }}
        >
          <path
            d="M0,260 L0,170 L80,130 L160,80 L220,110 L300,40 L380,95 L440,62 L520,16 L600,55 L680,26 L760,74 L820,40 L900,92 L960,64 L1040,104 L1120,54 L1200,84 L1280,122 L1360,94 L1440,142 L1440,260 Z"
            fill={C.bg}
            opacity="0.97"
          />
          <path
            d="M0,260 L0,210 L100,182 L200,152 L280,170 L360,132 L440,152 L520,122 L600,148 L700,118 L780,138 L860,112 L940,132 L1020,108 L1100,128 L1200,148 L1300,132 L1440,162 L1440,260 Z"
            fill={C.bg}
          />
        </svg>
      </motion.div>
    </div>
  );
}
