import { siteContent } from "@/content/site";

function list(items: readonly string[]) {
  return items.map((item) => `- ${item}`).join("\n");
}

export async function GET() {
  const summary = siteContent.aiSummary;
  const proof = siteContent.proofOfCompetence.items
    .map((item) => `- [${item.name}](${item.url}): ${item.summary}`)
    .join("\n");

  const text = `# ${summary.title}

> ${summary.positioning}

## Best fit
${list(summary.bestFor)}

## Not a fit
${list(summary.notFor)}

## Proof of competence
${proof}

## Key pages
- [Homepage](https://gotovalues.com): oferta i pozycjonowanie
- [Jak pracuję](https://gotovalues.com/jak-pracuje): model współpracy i porównanie z alternatywami
- [TriageFlow](https://gotovalues.com/triageflow): triage zgłoszeń i dokumentów
- [SupportFlow AI](https://gotovalues.com/supportflow): pilotaż automatyzacji obsługi zgłoszeń
- [Workflow dla produkcji](https://gotovalues.com/dla-produkcji): automatyzacja procesów produkcyjnych
- [Workflow dla logistyki](https://gotovalues.com/dla-logistyki): automatyzacja procesów logistycznych
- [Blog techniczny](https://gotovalues.com/blog): artykuły o AI i automatyzacji
- [Sitemap](${summary.sitemap})
`;

  return new Response(text, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
