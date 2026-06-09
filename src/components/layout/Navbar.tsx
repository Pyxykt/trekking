import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { C } from "../../constants/colors";
import { NAV_LINKS, ROUTES } from "../../constants/navigation";
import { Logo } from "../ui/Logo";

export function Navbar({ scrollY }: { scrollY: number }) {
  const [open, setOpen] = useState(false);
  const scrolled = scrollY > 80;

  const linkStyle = (isActive: boolean) => ({
    fontSize: 13,
    letterSpacing: "0.04em",
    background: "none" as const,
    border: "none" as const,
    cursor: "pointer" as const,
    color: isActive ? C.gold : C.muted,
    transition: "color 0.2s",
    textDecoration: "none" as const,
  });

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
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

        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className="font-medium"
              style={({ isActive }) => linkStyle(isActive)}
            >
              {link.label}
            </NavLink>
          ))}
          <Link to={ROUTES.contact}>
            <motion.span
              whileHover={{ background: C.moss, color: "#fff", scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="font-mono-custom inline-block"
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
            </motion.span>
          </Link>
        </div>

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
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <NavLink
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className="text-left font-display block"
                    style={({ isActive }) => ({
                      fontSize: 22,
                      fontWeight: 500,
                      textDecoration: "none",
                      color: isActive ? C.gold : C.parchment,
                    })}
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <Link to={ROUTES.contact} onClick={() => setOpen(false)}>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="font-mono-custom mt-2 block text-center"
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
                </motion.span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
