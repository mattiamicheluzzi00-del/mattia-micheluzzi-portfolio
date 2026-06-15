import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  outputFileTracingRoot: __dirname,
  images: {
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;
