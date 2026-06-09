import { C } from "../../constants/colors";
import { useCountUp } from "../../hooks/useCountUp";

export function AltitudeTicker() {
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
