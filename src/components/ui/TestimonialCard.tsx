import { motion } from "framer-motion";
import { C } from "../../constants/colors";
import type { Testimonial } from "../../types/testimonial";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          style={{
            fontSize: 12,
            color: i < rating ? C.gold : C.faint,
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export function TestimonialCard({
  testimonial,
  index = 0,
  featured = false,
}: {
  testimonial: Testimonial;
  index?: number;
  featured?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: featured ? 24 : 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: featured ? 0 : 0.1 + index * 0.1 }}
      className="flex flex-col gap-6 h-full"
      style={{
        background: featured ? C.surface : C.bg,
        padding: featured ? "48px 40px" : "40px 32px",
        border: featured ? `1px solid ${C.border}` : undefined,
      }}
    >
      <StarRating rating={testimonial.rating} />
      <p
        className="font-display leading-relaxed flex-1"
        style={{
          fontSize: featured
            ? "clamp(18px, 2vw, 24px)"
            : "clamp(15px, 1.5vw, 17px)",
          color: featured ? C.parchment : "#C8BEA8",
          fontStyle: "italic",
        }}
      >
        "{testimonial.quote}"
      </p>
      <div className="flex items-center gap-3 mt-auto">
        <div
          className="flex items-center justify-center font-display flex-shrink-0"
          style={{
            width: featured ? 48 : 40,
            height: featured ? 48 : 40,
            borderRadius: "50%",
            background: C.faint,
            border: `1px solid ${C.moss}44`,
            fontSize: featured ? 14 : 12,
            color: C.gold,
          }}
        >
          {testimonial.initials}
        </div>
        <div>
          <div
            className="font-semibold"
            style={{ fontSize: featured ? 14 : 13, color: C.parchment }}
          >
            {testimonial.name}
          </div>
          <div
            className="font-mono-custom"
            style={{
              fontSize: 10,
              color: C.moss,
              letterSpacing: "0.06em",
            }}
          >
            {testimonial.origin} · {testimonial.trek} · {testimonial.year}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
