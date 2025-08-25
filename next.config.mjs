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
};

export default nextConfig;
