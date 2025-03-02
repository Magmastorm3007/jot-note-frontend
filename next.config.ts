import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React's strict mode for highlighting potential issues
  reactStrictMode: true,

  // Define custom rewrites
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Match API routes
        destination: `${process.env.NEXT_PUBLIC_SERVER_URL}/:path*`, // Redirect to an external server
      },
    ];
  },
};

export default nextConfig;
