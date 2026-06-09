import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { C } from "../../constants/colors";
import { ROUTES } from "../../constants/navigation";
import {
  FEATURED_TESTIMONIAL,
  TESTIMONIALS,
  TESTIMONIAL_STATS,
} from "../../data/testimonials";
import { fadeUp, staggerContainer } from "../../lib/motion";
import { Eyebrow } from "../ui/Eyebrow";
import { StatCard } from "../ui/StatCard";
import { TestimonialCard } from "../ui/TestimonialCard";

export function TestimonialsSection({
  variant = "preview",
}: {
  variant?: "preview" | "full";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isFull = variant === "full";
  const displayed = isFull ? TESTIMONIALS : TESTIMONIALS.slice(0, 3);

  return (
    <section
      id="testimonials"
      ref={ref}
      style={{
        padding: "100px clamp(24px, 6vw, 100px)",
        background: isFull ? C.bg : undefined,
        borderTop: isFull ? undefined : `1px solid ${C.border}`,
      }}
    >
      <motion.div
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={staggerContainer()}
        className="mb-14"
      >
        <motion.div variants={fadeUp}>
          <Eyebrow>GUEST WORDS</Eyebrow>
          <h2
            className="font-display font-bold leading-tight mb-4"
            style={{ fontSize: "clamp(32px, 4.5vw, 56px)", color: C.parchment }}
          >
            {isFull ? (
              <>
                Stories from
                <br />
                <em style={{ color: C.gold, fontStyle: "italic" }}>the trail</em>
              </>
            ) : (
              "What our guests say"
            )}
          </h2>
          <p
            style={{
              fontSize: 15,
              color: C.dim,
              maxWidth: 520,
              lineHeight: "1.75",
            }}
          >
            {isFull
              ? "Over a thousand expeditions completed. These are the voices that keep us honest — and keep us climbing."
              : "Real accounts from guests who walked our routes. No incentives, no edits."}
          </p>
        </motion.div>
      </motion.div>

      {isFull && (
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={staggerContainer(0.1)}
          className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-16 max-w-4xl"
        >
          {TESTIMONIAL_STATS.map((s, i) => (
            <motion.div key={i} variants={fadeUp}>
              <StatCard {...s} />
            </motion.div>
          ))}
        </motion.div>
      )}

      <div className="mb-10">
        <TestimonialCard testimonial={FEATURED_TESTIMONIAL} featured />
      </div>

      <div
        className={`grid gap-2 ${isFull ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 md:grid-cols-3"}`}
        style={{ background: C.border }}
      >
        {displayed.map((t, i) => (
          <TestimonialCard key={t.name} testimonial={t} index={i} />
        ))}
      </div>

      {!isFull && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link to={ROUTES.testimonials} className="no-underline">
            <motion.span
              whileHover={{ borderColor: C.gold, color: C.gold, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="font-mono-custom inline-block"
              style={{
                background: "transparent",
                color: C.muted,
                border: `1px solid ${C.borderHi}`,
                padding: "14px 36px",
                fontSize: 12,
                letterSpacing: "0.12em",
                cursor: "pointer",
                borderRadius: 1,
                transition: "all 0.25s",
              }}
            >
              READ ALL TESTIMONIALS →
            </motion.span>
          </Link>
        </motion.div>
      )}
    </section>
  );
}
