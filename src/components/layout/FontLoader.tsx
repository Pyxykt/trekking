import { C } from "../../constants/colors";

export function FontLoader() {
  return (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,500;1,700&family=Inter:wght@300;400;500;600&family=Courier+Prime:wght@400;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: ${C.bg}; color: ${C.parchment}; font-family: 'Inter', sans-serif; overflow-x: hidden; }
    ::selection { background: ${C.moss}44; color: ${C.parchment}; }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: ${C.bg}; }
    ::-webkit-scrollbar-thumb { background: ${C.moss}; }
    .font-display { font-family: 'Playfair Display', serif; }
    .font-mono-custom { font-family: 'Courier Prime', monospace; }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
    }
  `}</style>
  );
}
