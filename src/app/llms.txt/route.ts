import { siteContent } from "@/content/site";

function list(items: readonly string[]) {
  return items.map((item) => `- ${item}`).join("\n");
}

export async function GET() {
  const summary = siteContent.aiSummary;
  const services = siteContent.offer.pillars
    .map((pillar) => `- **${pillar.title}**: ${pillar.description}`)
    .join("\n");

  const text = `# ${summary.title}

> ${summary.positioning}

## Scope
${services}

## Best fit
${list(summary.bestFor)}

## Not a fit
${list(summary.notFor)}

## Key pages
- [Homepage](https://gotovalues.com): zakres usług, model pracy i kontakt
- [Jak pracuję](https://gotovalues.com/jak-pracuje): podejście do doboru rozwiązania (konfiguracja, integracja, aplikacja)
- [Blog techniczny](https://gotovalues.com/blog): artykuły o automatyzacji procesów, danych i aplikacjach webowych
- [Sitemap](${summary.sitemap})
`;

  return new Response(text, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
