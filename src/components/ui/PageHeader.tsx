import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { C } from "../../constants/colors";
import { Eyebrow } from "./Eyebrow";
import { fadeUp, staggerContainer } from "../../lib/motion";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={staggerContainer()}
      className="mb-14 max-w-3xl"
    >
      <motion.div variants={fadeUp}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1
          className="font-display font-bold leading-tight mb-4"
          style={{ fontSize: "clamp(32px, 4.5vw, 56px)", color: C.parchment }}
        >
          {title}
        </h1>
        {description && (
          <p
            style={{
              fontSize: 15,
              color: C.dim,
              maxWidth: 520,
              lineHeight: "1.75",
            }}
          >
            {description}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}
