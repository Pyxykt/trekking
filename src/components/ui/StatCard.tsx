import { C } from "../../constants/colors";
import { useCountUp } from "../../hooks/useCountUp";

export function StatCard({
  end,
  suffix,
  label,
  decimals = 0,
}: {
  end: number;
  suffix: string;
  label: string;
  decimals?: number;
}) {
  const [ref, val] = useCountUp(end, 1800, decimals);
  const display =
    decimals > 0 ? val.toFixed(decimals) : val.toLocaleString();

  return (
    <div ref={ref} className="text-center">
      <div
        className="font-display font-bold leading-none mb-2"
        style={{ fontSize: "clamp(40px, 5vw, 64px)", color: C.parchment }}
      >
        {display}
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
