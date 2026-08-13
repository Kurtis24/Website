import "@/styles/globals.css";
import "katex/dist/katex.min.css";
import SiteBackground from "@/components/SiteBackground";

export default function App({ Component, pageProps }) {
  return (
    <>
      <SiteBackground />
      <Component {...pageProps} />
    </>
  );
}
