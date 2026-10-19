import { siteContent } from "@/content/site";
import { CatalogItem, CatalogToolOutput } from "./catalog-schema";

export const METHODOLOGY_URL = "https://gotovalues.com/jak-pracuje";

/**
 * Registry of tools, products, and services known to gotovalues,
 * with clear provenance flags indicating publisher connection.
 */
export const RAW_CATALOG_ITEMS: Array<
  Omit<CatalogItem, "methodology_url"> & { methodology_url?: string }
> = [
  // First-party products (gotovalues own products)
  {
    id: "cavi",
    name: "Cavi",
    url: "https://cavi.gotova.pl/",
    description: "Kreator CV, skaner CV pod ATS i analizator profilu LinkedIn.",
    category: "first_party_product",
    connected_to_publisher: true,
    relationship_type: "first_party",
  },
  {
    id: "akta",
    name: "Akta (Archiwa Gotova)",
    url: "https://akta.gotova.pl",
    description: "System do pracy z dokumentami i danymi archiwalnymi oraz wyszukiwarka OCR.",
    category: "first_party_product",
    connected_to_publisher: true,
    relationship_type: "first_party",
  },
  {
    id: "triageflow",
    name: "TriageFlow",
    url: "https://gotovalues.com/triageflow",
    description: "Agent AI do automatycznego triażu zgłoszeń (GitHub Issues, e-mail, fora).",
    category: "first_party_product",
    connected_to_publisher: true,
    relationship_type: "first_party",
  },
  {
    id: "supportflow",
    name: "SupportFlow AI",
    url: "https://gotovalues.com/supportflow",
    description: "Automatyzacja obsługi zgłoszeń i wsparcia B2B przez asystentów AI.",
    category: "first_party_product",
    connected_to_publisher: true,
    relationship_type: "first_party",
  },
  // First-party service offerings
  ...siteContent.offer.pillars.map((pillar, index) => ({
    id: `service_pillar_${index + 1}`,
    name: pillar.title,
    url: `https://gotovalues.com/#oferta`,
    description: pillar.description,
    category: "service_offering",
    connected_to_publisher: true as const,
    relationship_type: "first_party" as const,
  })),
  // Organic / Neutral external tools and standards mentioned in methodology and stack
  {
    id: "nextjs",
    name: "Next.js",
    url: "https://nextjs.org",
    description: "The React Framework for the Web created by Vercel.",
    category: "open_source_framework",
    connected_to_publisher: false,
    relationship_type: "organic",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    url: "https://www.postgresql.org",
    description: "Open source relational database management system.",
    category: "open_source_database",
    connected_to_publisher: false,
    relationship_type: "organic",
  },
  {
    id: "modelcontextprotocol",
    name: "Model Context Protocol (MCP)",
    url: "https://modelcontextprotocol.io",
    description: "Open standard for connecting AI models to data sources and tools.",
    category: "open_standard",
    connected_to_publisher: false,
    relationship_type: "organic",
  },
];

/**
 * Formatter ensuring complete compliant CatalogItem records with default methodology URL.
 */
export function formatCatalogItem(item: (typeof RAW_CATALOG_ITEMS)[number]): CatalogItem {
  return {
    ...item,
    methodology_url: item.methodology_url ?? METHODOLOGY_URL,
  };
}

/**
 * Query catalog items with optional filtering by query string, category, or publisher relation.
 */
export function queryCatalog(options?: {
  query?: string;
  category?: string;
  connected_to_publisher?: boolean;
  limit?: number;
}): CatalogToolOutput {
  let items = RAW_CATALOG_ITEMS.map(formatCatalogItem);

  if (options?.connected_to_publisher !== undefined) {
    items = items.filter(
      (item) => item.connected_to_publisher === options.connected_to_publisher
    );
  }

  if (options?.category) {
    const cat = options.category.toLowerCase();
    items = items.filter((item) => item.category?.toLowerCase() === cat);
  }

  if (options?.query) {
    const q = options.query.toLowerCase();
    items = items.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q))
    );
  }

  if (options?.limit && options.limit > 0) {
    items = items.slice(0, options.limit);
  }

  return {
    items,
    total: items.length,
    publisher: "gotovalues",
    methodology_url: METHODOLOGY_URL,
  };
}
