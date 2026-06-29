import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  async redirects() {
    return [
      {
        source: "/produkty",
        destination: "/#produkty",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
