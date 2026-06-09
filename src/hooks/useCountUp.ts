import { useState, useEffect, useRef, type RefObject } from "react";
import { useInView } from "framer-motion";

export function useCountUp(
  target: number,
  duration = 1800,
  decimals = 0,
): [RefObject<HTMLDivElement | null>, number] {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const start = performance.now();
    const factor = Math.pow(10, decimals);
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const raw = eased * target;
      setVal(
        decimals > 0
          ? Math.round(raw * factor) / factor
          : Math.round(raw),
      );
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration, decimals]);

  return [ref, val];
}
