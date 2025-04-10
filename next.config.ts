import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  assetPrefix: process.env.NODE_ENV === 'production' ? '.' : '',
  basePath: '',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
