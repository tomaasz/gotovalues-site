import { faqs } from "@/content/faq";
import { jsonResponse } from "@/lib/ai-json";

export async function GET() {
  return jsonResponse({
    url: "https://gotovalues.com/#faq",
    language: "pl",
    faq: faqs.map((faq) => ({
      question: faq.q,
      answer: faq.a,
      category: faq.category,
    })),
  });
}
