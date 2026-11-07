import { M_PLUS_Rounded_1c, Mochiy_Pop_One } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/anime-hero.css";
import "katex/dist/katex.min.css";
import SiteBackground from "@/components/SiteBackground";
import CursorTrail from "@/components/CursorTrail";

// Anime-style type, downloaded at build time and served from the site itself.
// Body: soft rounded gothic, the classic anime/game UI face.
const body = M_PLUS_Rounded_1c({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
});
// Headings: chunky pop title-card face.
const display = Mochiy_Pop_One({ subsets: ["latin"], weight: "400", display: "swap" });

export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-body: ${body.style.fontFamily};
          --font-display: ${display.style.fontFamily};
        }
      `}</style>
      <SiteBackground />
      <Component {...pageProps} />
      <CursorTrail />
    </>
  );
}
