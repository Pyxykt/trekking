import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { C } from "../constants/colors";
import { ROUTES } from "../constants/navigation";
import { TREKS } from "../data/treks";
import { Eyebrow } from "../components/ui/Eyebrow";
import { NotFoundPage } from "./NotFoundPage";

export function TrekDetailPage() {
  const { trekSlug } = useParams();
  const trek = TREKS.find((item) => item.slug === trekSlug);

  if (!trek) {
    return <NotFoundPage />;
  }

  const handleWhatsAppInquiry = () => {
    const phone = "917983952959";
    const message = encodeURIComponent(
      `Hi, I'm interested in the ${trek.name} trek. Can you please share the details?`,
    );

    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  return (
    <div style={{ paddingTop: 72, background: C.bg, color: C.parchment }}>
      <section
        style={{
          padding: "72px clamp(24px, 6vw, 100px) 0",
          display: "grid",
          gap: 24,
        }}
      >
        <Link
          to={ROUTES.treks}
          style={{
            color: C.moss,
            textDecoration: "none",
            fontSize: 13,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            width: "fit-content",
          }}
        >
          ← Back to treks
        </Link>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              border: `1px solid ${C.border}`,
              borderRadius: 2,
              overflow: "hidden",
              background: C.card,
            }}
          >
            <img
              src={trek.img}
              alt={trek.name}
              style={{ width: "100%", height: "clamp(260px, 46vw, 420px)", objectFit: "cover" }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 2,
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <Eyebrow>{trek.tag.toUpperCase()}</Eyebrow>
            <h1
              className="font-display font-bold"
              style={{ fontSize: "clamp(28px, 3.6vw, 42px)", color: C.parchment, lineHeight: 1.1 }}
            >
              {trek.name}
            </h1>
            <p style={{ color: C.muted, fontSize: 15, lineHeight: 1.8 }}>
              {trek.desc}
            </p>

            <div className="grid grid-cols-2 gap-3">
              {[
                ["Region", trek.region],
                ["Duration", trek.duration],
                ["Elevation", trek.elevation],
                ["Difficulty", trek.difficulty],
              ].map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    padding: "14px",
                    border: `1px solid ${C.faint}`,
                    borderRadius: 1,
                  }}
                >
                  <div
                    className="font-mono-custom"
                    style={{ fontSize: 9, color: C.moss, letterSpacing: "0.1em" }}
                  >
                    {label.toUpperCase()}
                  </div>
                  <div style={{ marginTop: 4, fontSize: 14, color: C.parchment }}>
                    {value}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={handleWhatsAppInquiry}
                style={{
                  background: trek.accentHex,
                  color: "#fff",
                  border: "none",
                  padding: "10px 18px",
                  cursor: "pointer",
                  borderRadius: 1,
                  fontSize: 12,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                Inquiry now
              </button>
              <Link
                to={ROUTES.treks}
                style={{
                  color: trek.accentHex,
                  border: `1px solid ${trek.accentHex}`,
                  padding: "10px 18px",
                  textDecoration: "none",
                  borderRadius: 1,
                  fontSize: 12,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                View all treks
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        style={{
          padding: "8px clamp(24px, 6vw, 100px) 100px",
          display: "grid",
          gap: 24,
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
        }}
      >
        <div
          style={{
            background: C.card,
            border: `1px solid ${C.border}`,
            borderRadius: 2,
            padding: "24px",
          }}
        >
          <h2 style={{ fontSize: 20, color: C.parchment, marginBottom: 12 }}>
            Why this trek
          </h2>
          <ul style={{ color: C.muted, lineHeight: 1.8, paddingLeft: 18 }}>
            {trek.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div
          style={{
            background: C.card,
            border: `1px solid ${C.border}`,
            borderRadius: 2,
            padding: "24px",
          }}
        >
          <h2 style={{ fontSize: 20, color: C.parchment, marginBottom: 12 }}>
            Route snapshot
          </h2>
          <ul style={{ color: C.muted, lineHeight: 1.8, paddingLeft: 18 }}>
            {trek.itinerary.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div
          style={{
            background: C.card,
            border: `1px solid ${C.border}`,
            borderRadius: 2,
            padding: "24px",
          }}
        >
          <h2 style={{ fontSize: 20, color: C.parchment, marginBottom: 12 }}>
            Trip notes
          </h2>
          <ul style={{ color: C.muted, lineHeight: 1.8, paddingLeft: 18 }}>
            <li>Best season: {trek.bestSeason}</li>
            <li>Fitness: {trek.fitness}</li>
            <li>Group size: Max {trek.maxGroup} guests</li>
            <li>Price: {trek.price} per person</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
