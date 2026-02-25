import fs from "node:fs";

const html = fs.readFileSync("index.html", "utf8");

// dopuszczamy TYLKO <script src="..."></script> (bez inline)
// Wyjątek: Google Analytics (gtag/dataLayer)
const inline = [...html.matchAll(/<script\b(?![^>]*\bsrc=)[^>]*>[\s\S]*?<\/script>/gi)]
  .map((m) => m[0])
  .filter((s) => !s.includes("gtag") && !s.includes("dataLayer"));

if (inline.length) {
  console.error("❌ Wykryto inline <script> (CSP-safe wymaga braku inline JS):");
  inline.slice(0, 3).forEach((m, i) => console.error(`--- #${i + 1} ---\n${m}\n...`));
  process.exit(1);
}
console.log("✅ OK: brak inline <script> w index.html");
