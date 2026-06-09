import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { C } from "../../constants/colors";
import { useScrollY } from "../../hooks/useScrollY";
import { FontLoader } from "./FontLoader";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { AudioPlayer } from "../ui/AudioPlayer";

export function RootLayout() {
  const scrollY = useScrollY();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <FontLoader />
      <div style={{ background: C.bg, minHeight: "100vh", color: C.parchment }}>
        <Navbar scrollY={scrollY} />
        <main>
          <Outlet context={{ scrollY }} />
        </main>
        <Footer />
        <AudioPlayer />
      </div>
    </>
  );
}
