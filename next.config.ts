import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      { source: '/portfolio', destination: '/' },
      { source: '/Portfolio', destination: '/' },
      { source: '/services', destination: '/' },
      { source: '/Services', destination: '/' },
      { source: '/tools', destination: '/' },
      { source: '/Tools', destination: '/' },
      { source: '/home', destination: '/' },
      { source: '/Home', destination: '/' },
    ];
  },
};

export default nextConfig;
