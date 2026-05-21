import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
// Replace 'your-repo-name' with the exact name of your GitHub repository
const repoName = "jorelm68.github.io"; 

const nextConfig: NextConfig = {
  output: "export", // Forces Next.js to build static HTML/CSS/JS (no Node server required)
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",
  images: {
    unoptimized: true, // Required because Next.js default Image optimization needs a live Node server
  },
};

export default nextConfig;