import { Link } from "react-router-dom";
import { C } from "../../constants/colors";
import { ROUTES } from "../../constants/navigation";

export function Logo() {
  return (
    <Link
      to={ROUTES.home}
      className="flex items-center gap-3 cursor-pointer select-none no-underline"
    >
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
          Type 2 Fun
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
    </Link>
  );
}
