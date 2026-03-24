import type { NextConfig } from "next";

// NOTE: With output: 'export', Next cannot attach response headers here.
// Hardening: configure CSP, HSTS, X-Frame-Options, Referrer-Policy on CDN
// (Cloudflare, etc.) or reverse proxy. See also `security_audit` in the CLI.

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
