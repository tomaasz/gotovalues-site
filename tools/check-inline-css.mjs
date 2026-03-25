import fs from 'node:fs';

const html = fs.readFileSync('index.html', 'utf8');

// Wykrywanie bloków <style>
const inlineStyleBlocks = [...html.matchAll(/<style\b[^>]*>[\s\S]*?<\/style>/gi)].map((m) => m[0]);

// Wykrywanie atrybutów style="..." w tagach HTML
const inlineStyleAttributes = [...html.matchAll(/<[^>]+style\s*=\s*(['"])(.*?)\1[^>]*>/gi)].map(
  (m) => m[0],
);

const issues = [...inlineStyleBlocks, ...inlineStyleAttributes];

if (issues.length) {
  console.error("❌ Wykryto inline CSS (CSP-safe wymaga usunięcia 'unsafe-inline' ze style-src):");
  issues.slice(0, 3).forEach((m, i) => console.error(`--- #${i + 1} ---\n${m}\n...`));
  process.exit(1);
}
console.log('✅ OK: brak inline <style> i atrybutów style=... w index.html');
