/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    const path = require("path");
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname),   // ← makes "@/lib/…" work
    };
    return config;
  },
};

module.exports = nextConfig;
