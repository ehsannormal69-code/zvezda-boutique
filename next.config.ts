import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Freebuff serves the dev server through this host origin.
  allowedDevOrigins: ["3000-ih940kavlqt5g9u7uhi7i.e2b.app"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
