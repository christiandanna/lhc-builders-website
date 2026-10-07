import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Every image on the site is a real LHC photograph served from /public.
    // AVIF first, WebP as the fallback, then the original JPEG.
    formats: ["image/avif", "image/webp"],
    // Matches the layout's breakpoints so the optimizer does not generate
    // sizes nothing requests.
    deviceSizes: [390, 640, 828, 1080, 1280, 1920, 2048, 2400],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
};

export default nextConfig;
