import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { C } from "../constants/colors";
import { ROUTES } from "../constants/navigation";

export function NotFoundPage() {
  return (
    <div
      className="flex flex-col items-center justify-center text-center"
      style={{ paddingTop: 72, minHeight: "80vh", padding: "0 24px" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div
          className="font-mono-custom mb-6"
          style={{ fontSize: 11, color: C.moss, letterSpacing: "0.2em" }}
        >
          404 · OFF TRAIL
        </div>
        <h1
          className="font-display font-bold mb-6"
          style={{ fontSize: "clamp(40px, 6vw, 72px)", color: C.parchment }}
        >
          This path doesn't exist.
        </h1>
        <p
          className="mb-10 mx-auto"
          style={{ fontSize: 16, color: C.dim, maxWidth: 400 }}
        >
          The route you're looking for may have moved or never was charted.
        </p>
        <Link to={ROUTES.home} className="no-underline">
          <motion.span
            whileHover={{ scale: 1.03, background: C.mossHi }}
            whileTap={{ scale: 0.97 }}
            className="font-mono-custom inline-block"
            style={{
              background: C.moss,
              color: "#fff",
              padding: "14px 36px",
              fontSize: 13,
              letterSpacing: "0.12em",
              borderRadius: 1,
            }}
          >
            RETURN HOME →
          </motion.span>
        </Link>
      </motion.div>
    </div>
  );
}
