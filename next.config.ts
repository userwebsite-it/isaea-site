import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
      },
      {
        protocol: 'https',
        hostname: 'scannables.scdn.co',
      },
      {
        protocol: 'https',
        hostname: 'p.scdn.co',
      },
    ],
  },
};

export default nextConfig;
