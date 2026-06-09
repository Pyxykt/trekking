import type { ReactNode } from "react";
import { C } from "../../constants/colors";

export function Eyebrow({
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
