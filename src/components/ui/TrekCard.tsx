import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { C } from "../../constants/colors";
import type { Trek } from "../../types/trek";

export function TrekCard({ trek, index }: { trek: Trek; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  const handleWhatsAppInquiry = () => {
    const phone = "917983952959"; // Country code without +
    const message = encodeURIComponent(
      `Hi, I'm interested in the ${trek.name} trek. Can you please share the details?`,
    );

    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  return (
    <motion.article
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 48, scale: 0.97 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.65,
            delay: index * 0.1,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: C.card,
        border: `1px solid ${hovered ? trek.accentHex + "55" : C.border}`,
        borderRadius: 2,
        overflow: "hidden",
        cursor: "pointer",
        transition: "border-color 0.3s",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="relative overflow-hidden" style={{ height: 220 }}>
        <motion.img
          src={trek.img}
          alt={trek.name}
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.7)" }}
        />
        <motion.div
          animate={{ opacity: hovered ? 0.45 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0"
          style={{ background: trek.accentHex }}
        />
        <div
          className="absolute top-4 left-4 font-mono-custom"
          style={{
            background: trek.accentHex + "22",
            border: `1px solid ${trek.accentHex}66`,
            color: trek.accentHex,
            fontSize: 10,
            letterSpacing: "0.12em",
            padding: "4px 10px",
            borderRadius: 1,
          }}
        >
          {trek.tag.toUpperCase()}
        </div>
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: 80,
            background: `linear-gradient(transparent, ${C.card})`,
          }}
        />
      </div>

      <div className="flex flex-col gap-3 flex-1" style={{ padding: "24px" }}>
        <div>
          <div
            className="font-mono-custom mb-1"
            style={{ fontSize: 10, color: C.moss, letterSpacing: "0.1em" }}
          >
            {trek.region.toUpperCase()}
          </div>
          <h3
            className="font-display font-bold"
            style={{ fontSize: 22, color: C.parchment }}
          >
            {trek.name}
          </h3>
        </div>
        <p
          className="leading-relaxed flex-1"
          style={{ fontSize: 14, color: C.muted }}
        >
          {trek.desc}
        </p>
        <div
          className="grid grid-cols-3 gap-3 pt-3"
          style={{ borderTop: `1px solid ${C.faint}` }}
        >
          {(
            [
              ["Duration", trek.duration],
              ["Summit", trek.elevation],
              ["Group", `Max ${trek.maxGroup}`],
            ] as const
          ).map(([lbl, val]) => (
            <div key={lbl}>
              <div
                className="font-mono-custom mb-1"
                style={{ fontSize: 9, color: C.moss, letterSpacing: "0.08em" }}
              >
                {lbl.toUpperCase()}
              </div>
              <div
                className="font-semibold"
                style={{ fontSize: 13, color: C.parchment }}
              >
                {val}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span
              className="font-mono-custom font-bold"
              style={{ fontSize: 20, color: C.gold }}
            >
              {trek.price}
            </span>
            <span className="ml-1" style={{ fontSize: 12, color: C.dim }}>
              / person
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <motion.button
              onClick={handleWhatsAppInquiry}
              whileHover={{
                background: trek.accentHex,
                color: "#fff",
                scale: 1.03,
              }}
              whileTap={{ scale: 0.97 }}
              className="font-mono-custom"
              style={{
                background: "transparent",
                color: trek.accentHex,
                border: `1px solid ${trek.accentHex}`,
                padding: "7px 18px",
                fontSize: 11,
                letterSpacing: "0.1em",
                cursor: "pointer",
                borderRadius: 1,
                transition: "all 0.22s",
              }}
            >
              INQUIRE →
            </motion.button>
            <Link
              to={`/treks/${trek.slug}`}
              target="_self"
              className="font-mono-custom"
              style={{
                color: C.parchment,
                textDecoration: "none",
                fontSize: 11,
                letterSpacing: "0.1em",
              }}
            >
              DETAILS →
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
