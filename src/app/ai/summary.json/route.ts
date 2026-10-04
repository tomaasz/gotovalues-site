import { siteContent } from "@/content/site";
import { jsonResponse } from "@/lib/ai-json";

export async function GET() {
  const summary = siteContent.aiSummary;

  return jsonResponse({
    name: "gotovalues",
    url: "https://gotovalues.com",
    title: summary.title,
    description: summary.positioning,
    language: "pl",
    bestFor: summary.bestFor,
    notFor: summary.notFor,
    sitemap: summary.sitemap,
    llms: "https://gotovalues.com/llms.txt",
  });
}
