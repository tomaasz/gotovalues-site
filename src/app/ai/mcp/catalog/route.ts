import { jsonResponse } from "@/lib/ai-json";
import { MCP_CATALOG_TOOL, executeCatalogTool } from "@/lib/mcp/tools";

/**
 * Endpoint providing both tool definition and direct catalog query interface
 * for AI agents and MCP consumers.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // If requested schema definition
  if (searchParams.get("schema") === "1") {
    return jsonResponse({
      tool: MCP_CATALOG_TOOL,
    });
  }

  const query = searchParams.get("query") || undefined;
  const category = searchParams.get("category") || undefined;
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? parseInt(limitParam, 10) : undefined;

  let connected_to_publisher: boolean | undefined = undefined;
  if (searchParams.has("connected_to_publisher")) {
    connected_to_publisher = searchParams.get("connected_to_publisher") === "true";
  }

  const data = executeCatalogTool({
    query,
    category,
    connected_to_publisher,
    limit,
  });

  return jsonResponse(data);
}

/**
 * Standard JSON-RPC style tool execution interface for MCP clients
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Check if JSON-RPC or direct parameter object
    const params = body?.params || body || {};
    const data = executeCatalogTool({
      query: typeof params.query === "string" ? params.query : undefined,
      category: typeof params.category === "string" ? params.category : undefined,
      connected_to_publisher:
        typeof params.connected_to_publisher === "boolean"
          ? params.connected_to_publisher
          : undefined,
      limit: typeof params.limit === "number" ? params.limit : undefined,
    });

    if (body?.jsonrpc === "2.0" && body?.id !== undefined) {
      return jsonResponse({
        jsonrpc: "2.0",
        id: body.id,
        result: data,
      });
    }

    return jsonResponse(data);
  } catch (error) {
    return jsonResponse(
      {
        error: "Invalid request body",
        details: error instanceof Error ? error.message : String(error),
      },
    );
  }
}
