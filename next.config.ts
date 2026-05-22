import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Forces Next.js to build static HTML/CSS/JS (no Node server required)
  images: {
    unoptimized: true, // Required because Next.js default Image optimization needs a live Node server
  },
};

export default nextConfig;