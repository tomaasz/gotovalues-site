import { siteContent } from "@/content/site";

export async function GET() {
  const summary = siteContent.aiSummary;
  const lines = [
    "AI crawling: allow",
    "AI training: allow",
    "AI indexing: allow",
    "AI archiving: allow",
    `Sitemap: ${summary.sitemap}`,
    "LLM summary: https://gotovalues.com/llms.txt",
    "",
    summary.title,
    summary.positioning,
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
