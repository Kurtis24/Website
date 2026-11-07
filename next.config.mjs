/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable strict mode to prevent double-invocation of effects in dev,
  // which can trigger third-party cleanups (destroy) on undefined instances.
  reactStrictMode: false,
  images: {
    // Allow common remote hosts in case you swap placeholders with remote frames
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
      { protocol: 'https', hostname: 'cdn.pixabay.com' },
    ],
  },
  // Two lockfiles exist (here and one directory up), so pin the root rather
  // than let Next guess and warn on every build.
  outputFileTracingRoot: import.meta.dirname,
  // Vercel's default for files in /public makes browsers re-check them on
  // every visit. Let images and video sit in the browser and CDN cache for a
  // week, and serve the cached copy while a fresh one is fetched after that.
  async headers() {
    const cache = [
      {
        key: "Cache-Control",
        value: "public, max-age=604800, stale-while-revalidate=86400",
      },
    ];
    return [
      { source: "/images/:path*", headers: cache },
      { source: "/noise.png", headers: cache },
      { source: "/favicon.ico", headers: cache },
    ];
  },
};

export default nextConfig;
