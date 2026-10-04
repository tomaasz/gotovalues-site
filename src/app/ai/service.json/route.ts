import { siteContent } from "@/content/site";
import { jsonResponse } from "@/lib/ai-json";

export async function GET() {
  return jsonResponse({
    name: "gotovalues",
    url: "https://gotovalues.com",
    language: "pl",
    areaServed: "PL",
    contact: "kontakt@gotovalues.com",
    services: siteContent.offer.pillars.map((pillar) => ({
      name: pillar.title,
      description: pillar.description,
      capabilities: pillar.bullets,
    })),
  });
}
