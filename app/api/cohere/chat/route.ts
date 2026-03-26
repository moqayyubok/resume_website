import { NextResponse } from "next/server";
import { rateLimit, getClientIP } from "@/lib/rate-limit";
import { queryWithContext } from "@/lib/cohere-rag/pipeline";

const MAX_QUERY_LENGTH = 1000;

export async function POST(req: Request) {
  const ip = getClientIP(req);
  if (!rateLimit(ip, 20, 60_000)) {
    return NextResponse.json({ error: "Too many requests. Please wait." }, { status: 429 });
  }

  try {
    const body = await req.json();
    const query: unknown = body?.query;
    const chunks: unknown = body?.chunks;
    const embeddings: unknown = body?.embeddings;

    if (typeof query !== "string" || !query.trim()) {
      return NextResponse.json({ error: "query must be a non-empty string." }, { status: 400 });
    }

    if (query.length > MAX_QUERY_LENGTH) {
      return NextResponse.json(
        { error: `Query too long. Max ${MAX_QUERY_LENGTH} characters.` },
        { status: 400 },
      );
    }

    if (!Array.isArray(chunks) || chunks.length === 0) {
      return NextResponse.json(
        { error: "Please upload a document first." },
        { status: 400 },
      );
    }

    if (!Array.isArray(embeddings) || embeddings.length !== chunks.length) {
      return NextResponse.json(
        { error: "Invalid document context. Please re-upload your document." },
        { status: 400 },
      );
    }

    const result = await queryWithContext(query.trim(), chunks as string[], embeddings as number[][]);
    return NextResponse.json(result);
  } catch (err: unknown) {
    console.error("[cohere/chat]", err);
    const message = err instanceof Error ? err.message : "Chat failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
