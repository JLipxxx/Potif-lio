import type { NextConfig } from "next";

// NOTE: Security headers (CSP, HSTS, X-Frame-Options, etc.) must be
// configured on your hosting server (Vercel/Nginx/Apache) since
// Next.js headers() does not work with output: 'export'.

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/Potif-lio',
  assetPrefix: '/Potif-lio/',
  images: {
    unoptimized: true, // Required for next/image during Export
  },
};

export default nextConfig;
