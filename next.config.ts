import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  {
    key: "Permissions-Policy",
    value: "geolocation=(), microphone=(), camera=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://eu.i.posthog.com https://eu-assets.i.posthog.com",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  typedRoutes: true,
  // PostHog ingestion proxied through a first-party path (adblock-resistant).
  // The path is deliberately neutral (no "posthog"/"analytics"/"track") so
  // privacy blocklists don't match it. Keep in sync with NEXT_PUBLIC_POSTHOG_HOST.
  skipTrailingSlashRedirect: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
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
        source: "/:path*",
        has: [{ type: "host", value: "www.gotovalues.com" }],
        destination: "https://gotovalues.com/:path*",
        permanent: true,
      },
      {
        source: "/vs-freelancer-automatyzator",
        destination: "/jak-pracuje",
        permanent: true,
      },
      {
        source: "/produkty",
        destination: "/",
        permanent: true,
      },
      {
        source: "/support-ai",
        destination: "/automatyzacja",
        permanent: true,
      },
      {
        source: "/supportflow",
        destination: "/automatyzacja",
        permanent: true,
      },
      {
        source: "/triageflow",
        destination: "/automatyzacja",
        permanent: true,
      },
      {
        source: "/dla-produkcji",
        destination: "/automatyzacja",
        permanent: true,
      },
      {
        source: "/dla-logistyki",
        destination: "/automatyzacja",
        permanent: true,
      },
      {
        source: "/kalkulator-roi",
        destination: "/dane-i-analityka",
        permanent: true,
      },
      {
        source: "/blog/dedykowane-aplikacje-webowe-ai-excel",
        destination: "/blog/aplikacje-webowe-dla-firm-przewodnik",
        permanent: true,
      },
      {
        source: "/blog/konsultant-ai-procesy-operacyjne-automatyzacja",
        destination: "/blog/automatyzacja-procesow-w-firmie-przewodnik",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
