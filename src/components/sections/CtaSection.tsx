import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { C } from "../../constants/colors";
import { ROUTES } from "../../constants/navigation";
import { fadeUp, staggerContainer } from "../../lib/motion";

export function CtaSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden text-center"
      style={{
        padding: "120px clamp(24px, 8vw, 120px)",
        background: C.surface,
        borderTop: `1px solid ${C.border}`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1400&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.06,
          pointerEvents: "none",
        }}
      />
      <motion.div
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={staggerContainer()}
        className="relative z-10 max-w-2xl mx-auto"
      >
        <motion.div
          variants={fadeUp}
          className="font-mono-custom mb-6 inline-block"
          style={{ fontSize: 11, color: C.gold, letterSpacing: "0.2em" }}
        >
          NEXT DEPARTURE: OCTOBER 2025
        </motion.div>
        <motion.h2
          variants={fadeUp}
          className="font-display font-bold leading-tight mb-6"
          style={{ fontSize: "clamp(32px, 5vw, 62px)", color: C.parchment }}
        >
          The mountain is waiting.
          <br />
          <em style={{ color: C.gold }}>Are you?</em>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="leading-relaxed mb-12 mx-auto"
          style={{ fontSize: 16, color: C.dim, maxWidth: 480 }}
        >
          Spaces on each expedition are allocated by application. Tell us about
          yourself and the route that interests you.
        </motion.p>
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link to={ROUTES.contact} className="no-underline">
            <motion.span
              whileHover={{ scale: 1.03, background: C.goldHi }}
              whileTap={{ scale: 0.97 }}
              className="font-mono-custom font-bold inline-block"
              style={{
                background: C.gold,
                color: C.bg,
                border: "none",
                padding: "16px 48px",
                fontSize: 13,
                letterSpacing: "0.12em",
                cursor: "pointer",
                borderRadius: 1,
              }}
            >
              APPLY FOR A PLACE →
            </motion.span>
          </Link>
          <motion.span
            whileHover={{
              borderColor: C.moss,
              color: C.parchment,
              scale: 1.02,
            }}
            whileTap={{ scale: 0.97 }}
            className="font-mono-custom inline-block"
            style={{
              background: "transparent",
              color: C.muted,
              border: `1px solid ${C.faint}`,
              padding: "16px 48px",
              fontSize: 13,
              letterSpacing: "0.12em",
              cursor: "pointer",
              borderRadius: 1,
              transition: "all 0.25s",
            }}
          >
            DOWNLOAD BROCHURE
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  );
}
