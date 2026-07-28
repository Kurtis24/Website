import "@/styles/globals.css";
import SiteBackground from "@/components/SiteBackground";

export default function App({ Component, pageProps }) {
  return (
    <>
      <SiteBackground />
      <Component {...pageProps} />
    </>
  );
}
