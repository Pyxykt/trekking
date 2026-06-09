import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { C } from "../constants/colors";
import { ROUTES } from "../constants/navigation";
import { PageHeader } from "../components/ui/PageHeader";

export function PlaceholderPage({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div style={{ padding: "152px clamp(24px, 6vw, 100px) 120px" }}>
      <PageHeader eyebrow={eyebrow} title={title} description={description} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Link to={ROUTES.home} className="no-underline">
          <motion.span
            whileHover={{ color: C.gold }}
            className="font-mono-custom"
            style={{
              fontSize: 12,
              color: C.moss,
              letterSpacing: "0.12em",
            }}
          >
            ← BACK TO HOME
          </motion.span>
        </Link>
      </motion.div>
    </div>
  );
}
