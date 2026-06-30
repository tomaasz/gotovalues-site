import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  // PostHog ingestion proxied through a first-party path (adblock-resistant).
  // The path is deliberately neutral (no "posthog"/"analytics"/"track") so
  // privacy blocklists don't match it. Keep in sync with NEXT_PUBLIC_POSTHOG_HOST.
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      {
        source: "/r9f3c0/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/r9f3c0/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/produkty",
        destination: "/#produkty",
        permanent: true,
      },
      {
        source: "/support-ai",
        destination: "/supportflow",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

// Cloudflare/OpenNext local-dev binding shim — only relevant under `next dev` on the
// Cloudflare adapter. Skip it on Vercel and in production builds so they don't pull in
// wrangler/miniflare during the build.
if (process.env.NODE_ENV === "development" && !process.env.VERCEL) {
  import("@opennextjs/cloudflare").then((m) => m.initOpenNextCloudflareForDev());
}
