import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { C } from "../../constants/colors";
import { TREKS } from "../../data/treks";
import { fadeUp, staggerContainer } from "../../lib/motion";
import { Eyebrow } from "../ui/Eyebrow";
import { TrekCard } from "../ui/TrekCard";

export function ExpeditionsSection({
  showHeader = true,
  limit,
}: {
  showHeader?: boolean;
  limit?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const treks = limit ? TREKS.slice(0, limit) : TREKS;

  return (
    <section
      id="expeditions"
      style={{ padding: "100px clamp(24px, 6vw, 100px)" }}
    >
      {showHeader && (
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={staggerContainer()}
          className="mb-14"
        >
          <motion.div variants={fadeUp}>
            <Eyebrow>CURRENT ROSTER</Eyebrow>
            <h2
              className="font-display font-bold leading-tight mb-4"
              style={{
                fontSize: "clamp(32px, 4.5vw, 56px)",
                color: C.parchment,
              }}
            >
              Expeditions open
              <br />
              for <em style={{ color: C.gold, fontStyle: "italic" }}>2025–26</em>
            </h2>
            <p
              style={{
                fontSize: 15,
                color: C.dim,
                maxWidth: 480,
                lineHeight: "1.75",
              }}
            >
              Each route is led by a single guide who has walked it dozens of
              times. Availability is limited by design.
            </p>
          </motion.div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {treks.map((trek, i) => (
          <TrekCard key={trek.id} trek={trek} index={i} />
        ))}
      </div>
    </section>
  );
}
