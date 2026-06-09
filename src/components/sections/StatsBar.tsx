import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { C } from "../../constants/colors";
import { STATS } from "../../data/stats";
import { fadeUp, staggerContainer } from "../../lib/motion";
import { StatCard } from "../ui/StatCard";

export function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={staggerContainer()}
      style={{
        padding: "72px clamp(24px, 8vw, 120px)",
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 max-w-4xl mx-auto">
        {STATS.map((s, i) => (
          <motion.div key={i} variants={fadeUp}>
            <StatCard {...s} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
