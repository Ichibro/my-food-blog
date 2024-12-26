import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@": path.resolve(__dirname, "./src"),
    };

    return config;
  },
  images: {
    domains: ["res.cloudinary.com"], // Allow images hosted on Cloudinary
  },
};

export default nextConfig;
