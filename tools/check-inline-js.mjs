import fs from "node:fs";

const html = fs.readFileSync("index.html", "utf8");

// dopuszczamy TYLKO <script src="..."></script> (bez inline)
const inline = [...html.matchAll(/<script\b(?![^>]*\bsrc=)[^>]*>[\s\S]*?<\/script>/gi)];
if (inline.length) {
  console.error("❌ Wykryto inline <script> (CSP-safe wymaga braku inline JS):");
  inline.slice(0, 3).forEach((m, i) => console.error(`--- #${i + 1} ---\n${m[0].slice(0, 300)}\n...`));
  process.exit(1);
}
console.log("✅ OK: brak inline <script> w index.html");
