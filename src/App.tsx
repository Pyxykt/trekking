// Summit & Wild — Private Trekking Co.
// Built with React, Tailwind CSS, Framer Motion
// Senior frontend architecture: hooks, component decomposition, motion design system

import { useState, useEffect, useRef, type ReactNode, type RefObject } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  type Variants,
} from "framer-motion";

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const C = {
  bg: "#080E0B",
  surface: "#0F1A13",
  card: "#111E15",
  border: "#1C2E20",
  borderHi: "#2A4430",
  moss: "#4A7C59",
  mossHi: "#5A9C6E",
  gold: "#C9A84C",
  goldHi: "#D4B85E",
  parchment: "#E8DFC8",
  muted: "#8A9E8E",
  dim: "#4A5A4E",
  faint: "#1E2D26",
};

// ─── FONTS (injected once) ────────────────────────────────────────────────────
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,500;1,700&family=Inter:wght@300;400;500;600&family=Courier+Prime:wght@400;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: ${C.bg}; color: ${C.parchment}; font-family: 'Inter', sans-serif; overflow-x: hidden; }
    ::selection { background: ${C.moss}44; color: ${C.parchment}; }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: ${C.bg}; }
    ::-webkit-scrollbar-thumb { background: ${C.moss}; }
    .font-display { font-family: 'Playfair Display', serif; }
    .font-mono-custom { font-family: 'Courier Prime', monospace; }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  `}</style>
);

// ─── MOTION VARIANTS ─────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};
const staggerContainer = (delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: delay } },
});

// ─── HOOKS ───────────────────────────────────────────────────────────────────
function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const fn = () => setY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return y;
}

function useCountUp(
  target: number,
  duration = 1800,
): [RefObject<HTMLDivElement | null>, number] {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const started = useRef(false);
  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);
  return [ref, val];
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const TREKS = [
  {
    id: 1,
    name: "Annapurna Circuit",
    region: "Nepal",
    duration: "18 Days",
    elevation: "5,416m",
    difficulty: "Demanding",
    maxGroup: 8,
    price: "$3,400",
    tag: "Most Iconic",
    accentHex: "#4A7C59",
    img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
    desc: "The crown jewel of Himalayan trekking. Circumnavigate the Annapurna massif through rhododendron forests, ancient villages, and the legendary Thorong La pass.",
  },
  {
    id: 2,
    name: "Patagonia W Trek",
    region: "Chile",
    duration: "8 Days",
    elevation: "1,200m",
    difficulty: "Moderate",
    maxGroup: 6,
    price: "$2,800",
    tag: "Wilderness",
    accentHex: "#2563EB",
    img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    desc: "Glaciers that crack and thunder. Torres del Paine at dawn, turning amber. A route so dramatic it feels designed by a cinematographer.",
  },
  {
    id: 3,
    name: "Haute Route",
    region: "Alps",
    duration: "14 Days",
    elevation: "3,820m",
    difficulty: "Strenuous",
    maxGroup: 8,
    price: "$4,100",
    tag: "Classic",
    accentHex: "#6366F1",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    desc: "Chamonix to Zermatt. Two of Europe's greatest mountain towns connected by high passes, alpine meadows, and a finale under the Matterhorn.",
  },
  {
    id: 4,
    name: "Laugavegur Trail",
    region: "Iceland",
    duration: "6 Days",
    elevation: "1,100m",
    difficulty: "Moderate",
    maxGroup: 6,
    price: "$2,200",
    tag: "Otherworldly",
    accentHex: "#0F766E",
    img: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&q=80",
    desc: "Obsidian lava fields. Steaming fumaroles. Rhyolite mountains in violet and ochre. The most surreal landscape on Earth, explored on foot.",
  },
];

const STATS = [
  { end: 1400, suffix: "+", label: "Summits Reached" },
  { end: 98, suffix: "%", label: "Guest Satisfaction" },
  { end: 16, suffix: "", label: "Years in the Field" },
  { end: 8, suffix: "", label: "Max Group Size" },
];

const PRINCIPLES = [
  {
    symbol: "◉",
    title: "Leave No Trace",
    body: "Strict LNT protocol on every route, every time. The landscape outlives us both.",
  },
  {
    symbol: "◈",
    title: "Local Partnership",
    body: "Every expedition employs local porters, supports teahouses, and funds trail maintenance.",
  },
  {
    symbol: "⊙",
    title: "True Small Groups",
    body: "Eight guests is not marketing. It's a hard rule. We turn down bookings to maintain it.",
  },
  {
    symbol: "◫",
    title: "No Shortcuts",
    body: "We take the full route. Every acclimatisation day stays in the itinerary regardless of pressure.",
  },
];

const TESTIMONIALS = [
  {
    name: "Mira Castellanos",
    origin: "Barcelona, Spain",
    trek: "Annapurna Circuit",
    initials: "MC",
    quote:
      "They treated the mountains with the same reverence we did. Every logistical detail was invisible — all we saw was the route.",
  },
  {
    name: "James Thornton",
    origin: "Edinburgh, Scotland",
    trek: "Patagonia W Trek",
    initials: "JT",
    quote:
      "I've trekked with seven companies. Summit & Wild is the only one where the guides felt like they genuinely loved the place they were showing you.",
  },
  {
    name: "Priya Nair",
    origin: "Bengaluru, India",
    trek: "Haute Route",
    initials: "PN",
    quote:
      "Three months later I'm still thinking about waking up on day six to see the Matterhorn appear through cloud. Worth every rupee.",
  },
];

const NAV_LINKS = ["Expeditions", "Philosophy", "Guides", "Journal", "Contact"];

type Trek = (typeof TREKS)[number];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

// Logo
function Logo() {
  return (
    <div className="flex items-center gap-3 cursor-pointer select-none">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path
          d="M16 4L28 28H4L16 4Z"
          stroke={C.moss}
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M10 28L16 14L22 28"
          stroke={C.gold}
          strokeWidth="1.2"
          fill="none"
        />
      </svg>
      <div>
        <div
          className="font-display font-semibold leading-none"
          style={{ fontSize: 17, color: C.parchment, letterSpacing: "0.02em" }}
        >
          Summit & Wild
        </div>
        <div
          className="font-mono-custom"
          style={{
            fontSize: 9,
            color: C.moss,
            letterSpacing: "0.18em",
            marginTop: 2,
          }}
        >
          PRIVATE EXPEDITIONS
        </div>
      </div>
    </div>
  );
}

// Eyebrow label
function Eyebrow({
  children,
  color = C.moss,
}: {
  children: ReactNode;
  color?: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div style={{ width: 40, height: 1, background: color }} />
      <span
        className="font-mono-custom"
        style={{ fontSize: 11, color, letterSpacing: "0.2em" }}
      >
        {children}
      </span>
    </div>
  );
}

// Navbar
function Navbar({ scrollY }: { scrollY: number }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Expeditions");
  const scrolled = scrollY > 80;

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
        style={{
          padding: "0 clamp(20px, 5vw, 80px)",
          height: 72,
          background: scrolled ? "rgba(8,14,11,0.92)" : "transparent",
          borderBottom: `1px solid ${scrolled ? C.border : "transparent"}`,
          backdropFilter: scrolled ? "blur(16px)" : "none",
          transition:
            "background 0.4s, border-color 0.4s, backdrop-filter 0.4s",
        }}
      >
        <Logo />

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <motion.button
              key={link}
              onClick={() => setActive(link)}
              whileHover={{ color: C.gold }}
              className="font-medium"
              style={{
                fontSize: 13,
                letterSpacing: "0.04em",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: active === link ? C.gold : C.muted,
                transition: "color 0.2s",
              }}
            >
              {link}
            </motion.button>
          ))}
          <motion.button
            whileHover={{ background: C.moss, color: "#fff", scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="font-mono-custom"
            style={{
              background: "transparent",
              color: C.moss,
              border: `1px solid ${C.moss}`,
              padding: "9px 24px",
              fontSize: 12,
              letterSpacing: "0.1em",
              cursor: "pointer",
              borderRadius: 1,
            }}
          >
            BOOK NOW
          </motion.button>
        </div>

        {/* Hamburger */}
        <motion.button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          style={{ background: "none", border: "none", cursor: "pointer" }}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={
                open
                  ? i === 0
                    ? { rotate: 45, y: 8 }
                    : i === 1
                      ? { opacity: 0, scaleX: 0 }
                      : { rotate: -45, y: -8 }
                  : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }
              }
              style={{
                display: "block",
                width: 24,
                height: 1.5,
                background: C.parchment,
                transformOrigin: "center",
              }}
            />
          ))}
        </motion.button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-18 left-0 right-0 z-40 lg:hidden"
            style={{
              top: 72,
              background: "rgba(8,14,11,0.98)",
              backdropFilter: "blur(20px)",
              borderBottom: `1px solid ${C.border}`,
              padding: "24px clamp(20px, 5vw, 40px) 32px",
            }}
          >
            <div className="flex flex-col gap-5">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => {
                    setActive(link);
                    setOpen(false);
                  }}
                  className="text-left font-display"
                  style={{
                    fontSize: 22,
                    fontWeight: 500,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: active === link ? C.gold : C.parchment,
                  }}
                >
                  {link}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="font-mono-custom mt-2"
                style={{
                  background: C.moss,
                  color: "#fff",
                  border: "none",
                  padding: "14px 0",
                  fontSize: 13,
                  letterSpacing: "0.1em",
                  cursor: "pointer",
                  borderRadius: 1,
                }}
              >
                BOOK NOW →
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Mountain SVG silhouette
function MountainSilhouette({ scrollY }: { scrollY: number }) {
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

// Altitude counter
function AltitudeTicker() {
  const [ref, val] = useCountUp(5416, 3000);
  return (
    <div
      ref={ref}
      className="font-mono-custom flex items-center gap-2"
      style={{ color: C.gold, fontSize: 13, letterSpacing: "0.15em" }}
    >
      <span style={{ color: C.moss }}>↑</span>
      {val.toLocaleString()}m ASL
    </div>
  );
}

// Hero section
function HeroSection({ scrollY }: { scrollY: number }) {
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
      {/* Parallax background */}
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

      {/* Content */}
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
                    ease: [0.22, 1, 0.36, 1],
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
            Private expeditions for those who want more than a trail. Eight
            guests maximum. Guides who know the land like family. No shortcuts,
            no compromises.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-14">
            <motion.button
              whileHover={{ scale: 1.03, background: C.mossHi }}
              whileTap={{ scale: 0.97 }}
              className="font-mono-custom"
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
              VIEW EXPEDITIONS →
            </motion.button>
            <motion.button
              whileHover={{
                borderColor: C.parchment,
                color: C.parchment,
                scale: 1.02,
              }}
              whileTap={{ scale: 0.97 }}
              className="font-mono-custom"
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
            </motion.button>
          </motion.div>

          <motion.div variants={fadeUp}>
            <AltitudeTicker />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Right column stats — hidden on small screens */}
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

      {/* Scroll indicator */}
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

// Stat counter card
function StatCard({
  end,
  suffix,
  label,
}: {
  end: number;
  suffix: string;
  label: string;
}) {
  const [ref, val] = useCountUp(end, 1800);
  return (
    <div ref={ref} className="text-center">
      <div
        className="font-display font-bold leading-none mb-2"
        style={{ fontSize: "clamp(40px, 5vw, 64px)", color: C.parchment }}
      >
        {val.toLocaleString()}
        {suffix}
      </div>
      <div
        className="font-mono-custom"
        style={{ fontSize: 11, color: C.moss, letterSpacing: "0.14em" }}
      >
        {label.toUpperCase()}
      </div>
    </div>
  );
}

// Stats bar
function StatsBar() {
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

// Trek card
function TrekCard({ trek, index }: { trek: Trek; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

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
            ease: [0.22, 1, 0.36, 1],
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
      {/* Image */}
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

      {/* Body */}
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
        {/* Stats row */}
        <div
          className="grid grid-cols-3 gap-3 pt-3"
          style={{ borderTop: `1px solid ${C.faint}` }}
        >
          {[
            ["Duration", trek.duration],
            ["Summit", trek.elevation],
            ["Group", `Max ${trek.maxGroup}`],
          ].map(([lbl, val]) => (
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
        {/* Footer row */}
        <div className="flex items-center justify-between pt-1">
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
          <motion.button
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
        </div>
      </div>
    </motion.article>
  );
}

// Expeditions section
function ExpeditionsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section style={{ padding: "100px clamp(24px, 6vw, 100px)" }}>
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
            style={{ fontSize: "clamp(32px, 4.5vw, 56px)", color: C.parchment }}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {TREKS.map((trek, i) => (
          <TrekCard key={trek.id} trek={trek} index={i} />
        ))}
      </div>
    </section>
  );
}

// Philosophy section
function PhilosophySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section
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
      {/* Decorative ring */}
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

      {/* Principles grid */}
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

// Testimonials
function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} style={{ padding: "100px clamp(24px, 6vw, 100px)" }}>
      <motion.div
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={staggerContainer()}
        className="mb-14"
      >
        <motion.div variants={fadeUp}>
          <Eyebrow>GUEST WORDS</Eyebrow>
        </motion.div>
      </motion.div>

      <div
        className="grid grid-cols-1 md:grid-cols-3"
        style={{ gap: 2, background: C.border }}
      >
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 + i * 0.12 }}
            className="flex flex-col gap-6"
            style={{ background: C.bg, padding: "40px 32px" }}
          >
            <p
              className="font-display leading-relaxed flex-1"
              style={{
                fontSize: "clamp(15px, 1.5vw, 17px)",
                color: "#C8BEA8",
                fontStyle: "italic",
              }}
            >
              "{t.quote}"
            </p>
            <div className="flex items-center gap-3 mt-auto">
              <div
                className="flex items-center justify-center font-display flex-shrink-0"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: C.faint,
                  border: `1px solid ${C.moss}44`,
                  fontSize: 12,
                  color: C.gold,
                }}
              >
                {t.initials}
              </div>
              <div>
                <div
                  className="font-semibold"
                  style={{ fontSize: 13, color: C.parchment }}
                >
                  {t.name}
                </div>
                <div
                  className="font-mono-custom"
                  style={{
                    fontSize: 10,
                    color: C.moss,
                    letterSpacing: "0.06em",
                  }}
                >
                  {t.origin} · {t.trek}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// CTA section
function CtaSection() {
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
          <motion.button
            whileHover={{ scale: 1.03, background: C.goldHi }}
            whileTap={{ scale: 0.97 }}
            className="font-mono-custom font-bold"
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
          </motion.button>
          <motion.button
            whileHover={{
              borderColor: C.moss,
              color: C.parchment,
              scale: 1.02,
            }}
            whileTap={{ scale: 0.97 }}
            className="font-mono-custom"
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
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}

// Footer
function Footer() {
  const cols = [
    {
      title: "Expeditions",
      links: ["Himalaya", "Patagonia", "Alps", "Iceland", "Andes"],
    },
    {
      title: "Company",
      links: ["Our Guides", "Philosophy", "Journal", "Press", "Careers"],
    },
    {
      title: "Contact",
      links: [
        "hello@summitwild.com",
        "+44 20 7946 0991",
        "London · Kathmandu",
        "Book a Call",
      ],
    },
  ];
  return (
    <footer
      style={{
        padding: "64px clamp(24px, 6vw, 100px) 36px",
        borderTop: `1px solid ${C.border}`,
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <div>
          <Logo />
          <p
            className="mt-5 leading-relaxed"
            style={{ fontSize: 14, color: C.dim, maxWidth: 260 }}
          >
            Private trekking expeditions on four continents. Eight guests
            maximum. No exceptions.
          </p>
        </div>
        {cols.map((col) => (
          <div key={col.title}>
            <div
              className="font-mono-custom mb-5"
              style={{ fontSize: 10, color: C.moss, letterSpacing: "0.16em" }}
            >
              {col.title.toUpperCase()}
            </div>
            <div className="flex flex-col gap-3">
              {col.links.map((l) => (
                <motion.span
                  key={l}
                  whileHover={{ color: C.parchment, x: 2 }}
                  transition={{ duration: 0.2 }}
                  style={{ fontSize: 14, color: C.dim, cursor: "pointer" }}
                >
                  {l}
                </motion.span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        style={{ borderTop: `1px solid ${C.border}`, paddingTop: 28 }}
      >
        <span
          className="font-mono-custom"
          style={{ fontSize: 11, color: C.faint, letterSpacing: "0.08em" }}
        >
          © 2025 SUMMIT & WILD · ALL RIGHTS RESERVED
        </span>
        <div className="flex gap-6">
          {["Privacy", "Terms", "Sustainability"].map((l) => (
            <motion.span
              key={l}
              whileHover={{ color: C.muted }}
              className="font-mono-custom"
              style={{
                fontSize: 11,
                color: C.faint,
                cursor: "pointer",
                letterSpacing: "0.06em",
              }}
            >
              {l}
            </motion.span>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const scrollY = useScrollY();

  return (
    <>
      <FontLoader />
      <div style={{ background: C.bg, minHeight: "100vh", color: C.parchment }}>
        <Navbar scrollY={scrollY} />
        <HeroSection scrollY={scrollY} />
        <StatsBar />
        <ExpeditionsSection />
        <PhilosophySection />
        <TestimonialsSection />
        <CtaSection />
        <Footer />
      </div>
    </>
  );
}
