import assert from "node:assert/strict";
import { describe, test } from "node:test";

import {
  catalogItemSchema,
  CatalogItem,
  CatalogToolOutput,
} from "../src/lib/mcp/catalog-schema";
import { RAW_CATALOG_ITEMS } from "../src/lib/mcp/catalog-data";
import { MCP_CATALOG_TOOL, executeCatalogTool } from "../src/lib/mcp/tools";
import { GET, POST } from "../src/app/ai/mcp/catalog/route";

describe("MCP Catalog Tools & connected_to_publisher (R279)", () => {
  test("MCP tool schema declares connected_to_publisher boolean field", () => {
    assert.equal(MCP_CATALOG_TOOL.name, "get_catalog_items");
    const itemSchema = MCP_CATALOG_TOOL.outputSchema.properties.items.items;
    assert.ok(itemSchema.required.includes("connected_to_publisher"));
    assert.equal(itemSchema.properties.connected_to_publisher.type, "boolean");
    assert.ok(itemSchema.properties.connected_to_publisher.description.length > 0);
  });

  test("every raw catalog item has a deterministic boolean connected_to_publisher flag", () => {
    assert.ok(RAW_CATALOG_ITEMS.length > 0);
    for (const item of RAW_CATALOG_ITEMS) {
      assert.equal(
        typeof item.connected_to_publisher,
        "boolean",
        `Item ${item.id} must have boolean connected_to_publisher`
      );
      assert.ok(["first_party", "affiliate", "sponsored", "organic"].includes(item.relationship_type!));
      if (item.connected_to_publisher) {
        assert.ok(["first_party", "affiliate", "sponsored"].includes(item.relationship_type!));
      } else {
        assert.equal(item.relationship_type, "organic");
      }
    }
  });

  test("executeCatalogTool validates against catalogToolOutputSchema (100% compliance)", () => {
    const result = executeCatalogTool();
    assert.equal(result.publisher, "gotovalues");
    assert.ok(result.total > 0);
    assert.equal(result.items.length, result.total);

    for (const item of result.items) {
      // Validates each item via Zod schema
      const parsed = catalogItemSchema.parse(item);
      assert.equal(typeof parsed.connected_to_publisher, "boolean");
      assert.ok(parsed.url.startsWith("http"));
      assert.ok(parsed.methodology_url?.startsWith("http"));
    }
  });

  test("correctly flags first-party products as connected_to_publisher: true", () => {
    const result = executeCatalogTool({ query: "cavi" });
    assert.ok(result.items.length >= 1);
    const cavi = result.items.find((i) => i.id === "cavi");
    assert.ok(cavi);
    assert.equal(cavi?.connected_to_publisher, true);
    assert.equal(cavi?.relationship_type, "first_party");

    const aktaResult = executeCatalogTool({ query: "akta" });
    const akta = aktaResult.items.find((i) => i.id === "akta");
    assert.ok(akta);
    assert.equal(akta?.connected_to_publisher, true);
  });

  test("correctly flags neutral / open-source external tools as connected_to_publisher: false", () => {
    const result = executeCatalogTool({ query: "nextjs" });
    const nextjs = result.items.find((i) => i.id === "nextjs");
    assert.ok(nextjs);
    assert.equal(nextjs?.connected_to_publisher, false);
    assert.equal(nextjs?.relationship_type, "organic");
  });

  test("filtering by connected_to_publisher works accurately", () => {
    const onlyConnected = executeCatalogTool({ connected_to_publisher: true });
    assert.ok(onlyConnected.items.length > 0);
    assert.ok(onlyConnected.items.every((i) => i.connected_to_publisher === true));

    const onlyOrganic = executeCatalogTool({ connected_to_publisher: false });
    assert.ok(onlyOrganic.items.length > 0);
    assert.ok(onlyOrganic.items.every((i) => i.connected_to_publisher === false));
  });

  test("GET route returns schema and data correctly", async () => {
    // Test schema request
    const schemaReq = new Request("https://gotovalues.com/ai/mcp/catalog?schema=1");
    const schemaRes = await GET(schemaReq);
    const schemaJson = (await schemaRes.json()) as { tool: typeof MCP_CATALOG_TOOL };
    assert.equal(schemaJson.tool.name, "get_catalog_items");
    assert.ok(schemaJson.tool.outputSchema.properties.items.items.properties.connected_to_publisher);

    // Test data request
    const dataReq = new Request("https://gotovalues.com/ai/mcp/catalog?connected_to_publisher=true");
    const dataRes = await GET(dataReq);
    const dataJson = (await dataRes.json()) as CatalogToolOutput;
    assert.ok(dataJson.items.length > 0);
    assert.ok(dataJson.items.every((i: CatalogItem) => i.connected_to_publisher === true));
  });

  test("POST route supports JSON-RPC 2.0 tool execution", async () => {
    const rpcReq = new Request("https://gotovalues.com/ai/mcp/catalog", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "req_123",
        params: {
          query: "cavi",
        },
      }),
    });

    const rpcRes = await POST(rpcReq);
    const rpcJson = (await rpcRes.json()) as {
      jsonrpc: string;
      id: string;
      result: CatalogToolOutput;
    };
    assert.equal(rpcJson.jsonrpc, "2.0");
    assert.equal(rpcJson.id, "req_123");
    assert.ok(rpcJson.result.items.some((i: CatalogItem) => i.id === "cavi" && i.connected_to_publisher === true));
  });
});
