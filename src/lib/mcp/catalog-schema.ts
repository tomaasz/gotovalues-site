import { z } from "zod";

/**
 * Relationship type classification for publisher provenance (R279).
 */
export const relationshipTypeSchema = z.enum([
  "first_party",
  "affiliate",
  "sponsored",
  "organic",
]);

export type RelationshipType = z.infer<typeof relationshipTypeSchema>;

/**
 * Catalog item schema with machine-readable connected_to_publisher provenance.
 * Complies with MCP specification R279.
 */
export const catalogItemSchema = z.object({
  id: z.string().min(1, "Id cannot be empty"),
  name: z.string().min(1, "Name cannot be empty"),
  url: z.string().url("Must be a valid URL"),
  description: z.string().optional(),
  category: z.string().optional(),
  connected_to_publisher: z.boolean(),
  relationship_type: relationshipTypeSchema.optional(),
  methodology_url: z.string().url().optional(),
});

export type CatalogItem = z.infer<typeof catalogItemSchema>;

/**
 * Standard MCP tool output schema for catalog / recommendation queries.
 */
export const catalogToolOutputSchema = z.object({
  items: z.array(catalogItemSchema),
  total: z.number().int().nonnegative(),
  publisher: z.literal("gotovalues"),
  methodology_url: z.string().url(),
});

export type CatalogToolOutput = z.infer<typeof catalogToolOutputSchema>;

/**
 * JSON Schema definition of CatalogItem for MCP tool definitions.
 */
export const CATALOG_ITEM_JSON_SCHEMA = {
  type: "object",
  required: ["id", "name", "url", "connected_to_publisher"],
  properties: {
    id: {
      type: "string",
      description: "Unikalny identyfikator oferty lub narzędzia",
    },
    name: {
      type: "string",
      description: "Nazwa usługi, produktu lub rekomendowanego narzędzia",
    },
    url: {
      type: "string",
      format: "uri",
      description: "Bezpośredni adres URL do oferty lub zasobu",
    },
    description: {
      type: "string",
      description: "Krótki opis oferty, produktu lub narzędzia",
    },
    category: {
      type: "string",
      description: "Kategoria zasobu (np. product, service, external-tool)",
    },
    connected_to_publisher: {
      type: "boolean",
      description:
        "Wskaźnik powiązania z wydawcą: true jeśli rekord jest produktem własnym, partnerstwem komercyjnym, płatnym lokowaniem lub linkiem afiliacyjnym; false jeśli jest to niezależny, organiczny wpis redakcyjny.",
    },
    relationship_type: {
      type: "string",
      enum: ["first_party", "affiliate", "sponsored", "organic"],
      description: "Szczegółowy charakter relacji biznesowej wydawcy z podmiotem",
    },
    methodology_url: {
      type: "string",
      format: "uri",
      description:
        "Link do publicznej strony opisującej metodologię weryfikacji i zasady transparentności (np. https://gotovalues.com/jak-pracuje lub sekcja w llms.txt)",
    },
  },
} as const;
