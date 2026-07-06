import { siteContent } from "@/content/site";

function list(items: readonly string[]) {
  return items.map((item) => `- ${item}`).join("\n");
}

export async function GET() {
  const summary = siteContent.aiSummary;
  const proof = siteContent.proofOfCompetence.items
    .map((item) => `- ${item.name}: ${item.summary} ${item.url}`)
    .join("\n");

  const text = `# ${summary.title}

${summary.positioning}

## Best fit
${list(summary.bestFor)}

## Not a fit
${list(summary.notFor)}

## Proof of competence
${proof}

## Key pages
- Homepage: https://gotovalues.com
- Comparison: https://gotovalues.com/vs-freelancer-automatyzator
- TriageFlow: https://gotovalues.com/triageflow
- SupportFlow AI: https://gotovalues.com/supportflow
- Production workflows: https://gotovalues.com/dla-produkcji
- Logistics workflows: https://gotovalues.com/dla-logistyki
- Blog: https://gotovalues.com/blog
- Sitemap: ${summary.sitemap}
`;

  return new Response(text, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
