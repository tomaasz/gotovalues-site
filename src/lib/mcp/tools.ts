import {
  CATALOG_ITEM_JSON_SCHEMA,
  catalogToolOutputSchema,
  CatalogToolOutput,
} from "./catalog-schema";
import { queryCatalog } from "./catalog-data";

/**
 * MCP Tool Definition for Catalog / Recommendation queries,
 * exposing the connected_to_publisher flag in tool schemas.
 */
export const MCP_CATALOG_TOOL = {
  name: "get_catalog_items",
  description:
    "Pobiera listę produktów, usług lub narzędzi z katalogu gotovalues wraz z transparentną flagą connected_to_publisher (true dla produktów i usług własnych lub powiązań komercyjnych, false dla neutralnych treści organicznych/open-source) zgodnie ze standardem R279.",
  inputSchema: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "Opcjonalna fraza wyszukiwania (nazwa lub opis)",
      },
      category: {
        type: "string",
        description: "Opcjonalny filtr kategorii (np. first_party_product, open_source_framework)",
      },
      connected_to_publisher: {
        type: "boolean",
        description:
          "Filtruj wg powiązania z wydawcą: true tylko powiązane komercyjnie/własne, false tylko organiczne/zewnętrzne",
      },
      limit: {
        type: "number",
        description: "Maksymalna liczba zwracanych rekordów",
      },
    },
  },
  outputSchema: {
    type: "object",
    required: ["items", "total", "publisher", "methodology_url"],
    properties: {
      items: {
        type: "array",
        items: CATALOG_ITEM_JSON_SCHEMA,
      },
      total: {
        type: "number",
        description: "Liczba znalezionych rekordów",
      },
      publisher: {
        type: "string",
        description: "Identyfikator wydawcy (gotovalues)",
      },
      methodology_url: {
        type: "string",
        format: "uri",
        description: "Link do metodologii transparentności i weryfikacji powiązań",
      },
    },
  },
} as const;

export interface ExecuteToolOptions {
  query?: string;
  category?: string;
  connected_to_publisher?: boolean;
  limit?: number;
}

/**
 * Tool handler function returning validated CatalogToolOutput.
 */
export function executeCatalogTool(params?: ExecuteToolOptions): CatalogToolOutput {
  const rawResult = queryCatalog(params);
  // Runtime validation against the schema to guarantee 100% compliance
  return catalogToolOutputSchema.parse(rawResult);
}
