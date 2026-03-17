import fs from "node:fs";
import process from "node:process";
import { fileURLToPath } from "node:url";

export function getInlineScripts(html) {
  // dopuszczamy TYLKO <script src="..."></script> (bez inline)
  // Wyjątek: Google Analytics (gtag/dataLayer)
  return [...html.matchAll(/<script\b(?![^>]*\bsrc=)[^>]*>[\s\S]*?<\/script>/gi)]
    .map((m) => m[0])
    .filter((s) => !s.includes("gtag") && !s.includes("dataLayer"));
}

const isMain = process.argv[1] && (
  process.argv[1].endsWith('check-inline-js.mjs') ||
  fileURLToPath(import.meta.url) === process.argv[1]
);

if (isMain) {
  const html = fs.readFileSync("index.html", "utf8");
  const inline = getInlineScripts(html);

  if (inline.length) {
    console.error("❌ Wykryto inline <script> (CSP-safe wymaga braku inline JS):");
    inline.slice(0, 3).forEach((m, i) => console.error(`--- #${i + 1} ---\n${m}\n...`));
    process.exit(1);
  }
  console.log("✅ OK: brak inline <script> w index.html");
}
