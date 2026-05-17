export { cn } from "@hermes/ui";

const escapeMap: Record<string, string> = {
  '<': '\\u003c',
  '>': '\\u003e',
  '&': '\\u0026',
};

export function escapeJsonLd(json: unknown): string {
  return JSON.stringify(json).replace(/[<>&]/g, (c) => escapeMap[c] as string);
}
