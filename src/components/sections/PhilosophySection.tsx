import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { C } from "../../constants/colors";
import { PRINCIPLES } from "../../data/principles";
import { fadeUp, staggerContainer } from "../../lib/motion";
import { Eyebrow } from "../ui/Eyebrow";

export function PhilosophySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="philosophy"
      ref={ref}
      style={{
        padding: "100px clamp(24px, 8vw, 120px)",
        background: C.surface,
        borderTop: `1px solid ${C.border}`,
        borderBottom: `1px solid ${C.border}`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="absolute hidden lg:block"
        style={{
          right: -80,
          top: -60,
          width: 420,
          height: 420,
          borderRadius: "50%",
          border: `1px solid ${C.border}`,
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />
      <div
        className="absolute hidden lg:block"
        style={{
          right: -20,
          top: -20,
          width: 240,
          height: 240,
          borderRadius: "50%",
          border: `1px solid ${C.moss}22`,
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />

      <div className="relative z-10 max-w-3xl mb-16">
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={staggerContainer()}
        >
          <motion.div variants={fadeUp}>
            <Eyebrow color={C.gold}>OUR PHILOSOPHY</Eyebrow>
          </motion.div>
          <motion.blockquote
            variants={fadeUp}
            className="font-display leading-snug mb-10"
            style={{
              fontSize: "clamp(22px, 3vw, 36px)",
              color: C.parchment,
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            "The mountains don't care how fit you are. They care about your
            attention. We spend three years working the same routes before we
            guide them. You benefit from that."
          </motion.blockquote>
          <motion.div variants={fadeUp} className="flex items-center gap-4">
            <div
              className="flex items-center justify-center font-display"
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: C.faint,
                border: `1px solid ${C.moss}44`,
                fontSize: 14,
                color: C.gold,
              }}
            >
              EF
            </div>
            <div>
              <div
                className="font-semibold"
                style={{ fontSize: 14, color: C.parchment }}
              >
                Ethan Forrest
              </div>
              <div
                className="font-mono-custom"
                style={{ fontSize: 11, color: C.moss, letterSpacing: "0.08em" }}
              >
                Founder & Lead Guide
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        style={{ gap: 1, background: C.border }}
      >
        {PRINCIPLES.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2 + i * 0.1 }}
            whileHover={{ background: "#141F17" }}
            style={{
              background: C.surface,
              padding: "36px 28px",
              transition: "background 0.3s",
            }}
          >
            <div style={{ fontSize: 22, color: C.moss, marginBottom: 16 }}>
              {p.symbol}
            </div>
            <h4
              className="font-display font-semibold mb-3"
              style={{ fontSize: 18, color: C.parchment }}
            >
              {p.title}
            </h4>
            <p style={{ fontSize: 14, color: C.dim, lineHeight: "1.7" }}>
              {p.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
