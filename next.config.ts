import type { NextConfig } from "next";

// NOTE: Security headers (CSP, HSTS, X-Frame-Options, etc.) must be
// configured on your hosting server (Vercel/Nginx/Apache) since
// Next.js headers() does not work with output: 'export'.

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  // Only apply basePath in production (GitHub Pages) to avoid 404 on localhost
  basePath: isProd ? '/Potif-lio' : '',
  assetPrefix: isProd ? '/Potif-lio/' : '',
  images: {
    unoptimized: true, // Required for next/image during Export
  },
};

export default nextConfig;
