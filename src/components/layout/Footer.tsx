import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { C } from "../../constants/colors";
import { ROUTES } from "../../constants/navigation";
import { Logo } from "../ui/Logo";

export function Footer() {
  const cols = [
    {
      title: "Expeditions",
      links: [
        { label: "Himalaya", path: ROUTES.expeditions },
        { label: "Patagonia", path: ROUTES.expeditions },
        { label: "Alps", path: ROUTES.expeditions },
        { label: "Iceland", path: ROUTES.expeditions },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Our Guides", path: ROUTES.guides },
        { label: "Philosophy", path: ROUTES.philosophy },
        { label: "Testimonials", path: ROUTES.testimonials },
        { label: "Journal", path: ROUTES.journal },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: "hello@type2fun.com", path: ROUTES.contact },
        { label: "+44 20 7946 0991", path: ROUTES.contact },
        { label: "London · Kathmandu", path: ROUTES.contact },
        { label: "Book a Call", path: ROUTES.contact },
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
                <Link key={l.label} to={l.path} className="no-underline">
                  <motion.span
                    whileHover={{ color: C.parchment, x: 2 }}
                    transition={{ duration: 0.2 }}
                    style={{ fontSize: 14, color: C.dim, cursor: "pointer" }}
                  >
                    {l.label}
                  </motion.span>
                </Link>
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
          © 2025 TYPE 2 FUN · ALL RIGHTS RESERVED
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
