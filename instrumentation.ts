// Sentry instrumentation — loaded automatically by Next.js on server start.
// No-op if SENTRY_DSN is unset, so local dev and CI stay offline.

export async function register() {
  const dsn = process.env.SENTRY_DSN;
  if (!dsn) return;

  if (process.env.NEXT_RUNTIME === "nodejs" || process.env.NEXT_RUNTIME === "edge") {
    const Sentry = await import("@sentry/nextjs");
    Sentry.init({
      dsn,
      environment: process.env.SENTRY_ENVIRONMENT ?? "production",
      release: process.env.SENTRY_RELEASE,
      serverName: "gotovalues-site",
      tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE ?? "0.1"),
      sendDefaultPii: false,
      // Scrub sensitive env-derived values from outgoing events.
      beforeSend(event) {
        const headers = event.request?.headers;
        if (headers && typeof headers === "object") {
          for (const h of ["Authorization", "Cookie", "authorization", "cookie"]) {
            if (h in headers) (headers as Record<string, string>)[h] = "[Filtered]";
          }
        }
        return event;
      },
    });
    Sentry.setTag("service", "gotovalues-site");
  }
}

export const onRequestError = async (
  err: unknown,
  request: Request,
  context: { routerKind: "Pages Router" | "App Router"; routePath: string; routeType: "render" | "route" | "action" | "middleware" },
) => {
  if (!process.env.SENTRY_DSN) return;
  const Sentry = await import("@sentry/nextjs");
  Sentry.captureRequestError(err, request, context);
};
