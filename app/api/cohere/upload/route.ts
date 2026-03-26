import { NextResponse } from "next/server";
import { rateLimit, getClientIP } from "@/lib/rate-limit";
import { ingestDocument } from "@/lib/cohere-rag/pipeline";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export async function POST(req: Request) {
  const ip = getClientIP(req);
  if (!rateLimit(ip, 20, 60_000)) {
    return NextResponse.json({ error: "Too many requests. Please wait." }, { status: 429 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File exceeds 10 MB limit." }, { status: 413 });
    }

    const name = file.name.toLowerCase();
    if (!name.endsWith(".pdf") && !name.endsWith(".txt")) {
      return NextResponse.json({ error: "Only PDF and .txt files are supported." }, { status: 400 });
    }

    // Extract text
    let text: string;
    const bytes = await file.arrayBuffer();

    if (name.endsWith(".pdf")) {
      const pdfParse = (await import("pdf-parse")).default;
      const result = await pdfParse(Buffer.from(bytes));
      text = result.text;
    } else {
      text = new TextDecoder("utf-8").decode(bytes);
    }

    text = text.trim();
    if (!text) {
      return NextResponse.json({ error: "No readable text found in the file." }, { status: 400 });
    }

    // Chunk + embed — returns everything the client needs for stateless queries
    const { chunks, embeddings, chunk_count } = await ingestDocument(text);

    return NextResponse.json({
      message: "Document ingested successfully.",
      chunk_count,
      filename: file.name,
      chunks,
      embeddings,
    });
  } catch (err: unknown) {
    console.error("[cohere/upload]", err);
    const message = err instanceof Error ? err.message : "Upload failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
