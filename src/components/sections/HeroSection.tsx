import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { C } from "../../constants/colors";
import { ROUTES } from "../../constants/navigation";
import { fadeUp, staggerContainer } from "../../lib/motion";
import { AltitudeTicker } from "../ui/AltitudeTicker";
import { MountainSilhouette } from "../ui/MountainSilhouette";

export function HeroSection({ scrollY }: { scrollY: number }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const headline = ["Where the path", "ends is where", "we begin."];

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ height: "100vh", minHeight: 700 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          y: bgY,
          backgroundImage:
            "url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1800&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          filter: "brightness(0.32) saturate(0.9)",
          scale: 1.1,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(165deg, rgba(8,14,11,0.65) 0%, rgba(8,14,11,0.15) 50%, rgba(8,14,11,0.72) 100%)`,
        }}
      />

      <motion.div
        className="relative z-10 flex flex-col justify-center h-full"
        style={{
          opacity,
          padding: "0 clamp(24px, 8vw, 120px)",
          maxWidth: 900,
        }}
      >
        <motion.div
          variants={staggerContainer(0.2)}
          initial="hidden"
          animate="show"
        >
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-3 mb-8"
          >
            <div style={{ width: 40, height: 1, background: C.moss }} />
            <span
              className="font-mono-custom"
              style={{ fontSize: 11, color: C.moss, letterSpacing: "0.22em" }}
            >
              SMALL GROUPS · HIGH PLACES · SINCE 2009
            </span>
          </motion.div>

          <div className="mb-7">
            {headline.map((line, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="block font-display font-bold leading-none overflow-hidden"
                style={{ fontSize: "clamp(44px, 7.5vw, 96px)" }}
              >
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 0.85,
                    delay: 0.3 + i * 0.12,
                    ease: [0.22, 1, 0.36, 1] as const,
                  }}
                  style={{
                    color: i === 1 ? C.gold : C.parchment,
                    fontStyle: i === 1 ? "italic" : "normal",
                  }}
                >
                  {line}
                </motion.span>
              </motion.div>
            ))}
          </div>

          <motion.p
            variants={fadeUp}
            className="leading-relaxed mb-10"
            style={{
              fontSize: "clamp(15px, 1.6vw, 18px)",
              color: C.muted,
              maxWidth: 520,
            }}
          >
            Private treks for those who want more than a trail. Eight guests
            maximum. Guides who know the land like family. No shortcuts, no
            compromises.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-14">
            <Link to={ROUTES.treks} className="no-underline">
              <motion.span
                whileHover={{ scale: 1.03, background: C.mossHi }}
                whileTap={{ scale: 0.97 }}
                className="font-mono-custom inline-block"
                style={{
                  background: C.moss,
                  color: "#fff",
                  border: "none",
                  padding: "14px 38px",
                  fontSize: 13,
                  letterSpacing: "0.12em",
                  cursor: "pointer",
                  borderRadius: 1,
                }}
              >
                VIEW TREKS →
              </motion.span>
            </Link>
            <Link to={ROUTES.philosophy} className="no-underline">
              <motion.span
                whileHover={{
                  borderColor: C.parchment,
                  color: C.parchment,
                  scale: 1.02,
                }}
                whileTap={{ scale: 0.97 }}
                className="font-mono-custom inline-block"
                style={{
                  background: "transparent",
                  color: "#a0b0a4",
                  border: `1px solid rgba(232,223,200,0.28)`,
                  padding: "14px 38px",
                  fontSize: 13,
                  letterSpacing: "0.12em",
                  cursor: "pointer",
                  borderRadius: 1,
                  transition: "all 0.25s",
                }}
              >
                OUR PHILOSOPHY
              </motion.span>
            </Link>
          </motion.div>

          <motion.div variants={fadeUp}>
            <AltitudeTicker />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute right-12 bottom-28 flex-col gap-6 items-center hidden xl:flex"
        style={{ zIndex: 10 }}
      >
        {["28 Routes", "6 Continents", "Since 2009"].map((s, i) => (
          <div
            key={i}
            className="font-mono-custom"
            style={{
              writingMode: "vertical-rl",
              fontSize: 10,
              color: C.moss,
              letterSpacing: "0.14em",
              opacity: 0.7,
            }}
          >
            {s.toUpperCase()}
          </div>
        ))}
        <div
          style={{
            width: 1,
            height: 64,
            background: `linear-gradient(${C.moss}, transparent)`,
          }}
        />
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      >
        <span
          className="font-mono-custom"
          style={{
            fontSize: 10,
            color: C.moss + "88",
            letterSpacing: "0.16em",
          }}
        >
          SCROLL
        </span>
        <div
          style={{
            width: 1,
            height: 40,
            background: `linear-gradient(${C.moss}, transparent)`,
          }}
        />
      </motion.div>

      <MountainSilhouette scrollY={scrollY} />
    </section>
  );
}
