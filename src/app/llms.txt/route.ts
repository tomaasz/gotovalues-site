import { siteContent } from "@/content/site";

function list(items: readonly string[]) {
  return items.map((item) => `- ${item}`).join("\n");
}

export async function GET() {
  const summary = siteContent.aiSummary;
  const services = siteContent.offer.pillars
    .map((pillar) => `- [${pillar.title}](https://gotovalues.com${pillar.href}): ${pillar.description}`)
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
- [Homepage](https://gotovalues.com): zakres usług, podział ścieżek i kontakt
- [Automatyzacja i integracje](https://gotovalues.com/automatyzacja): integracje systemów, obieg dokumentów, OCR i AI
- [Dane i analityka](https://gotovalues.com/dane-i-analityka): porządkowanie danych, SQL, raporty i dashboardy
- [Aplikacje i oprogramowanie](https://gotovalues.com/aplikacje): dedykowane aplikacje webowe i narzędzia wewnętrzne
- [Infrastruktura i wsparcie IT](https://gotovalues.com/wsparcie-it): komputery, serwery (NAS), sieci, poczta i kopie zapasowe
- [Jak pracuję](https://gotovalues.com/jak-pracuje): podejście do doboru rozwiązania
- [Blog techniczny](https://gotovalues.com/blog): artykuły o automatyzacji, danych i aplikacjach
- [Sitemap](${summary.sitemap})
`;

  return new Response(text, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
