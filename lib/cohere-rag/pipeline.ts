/**
 * Cohere RAG pipeline — TypeScript port of the Python backend.
 *
 * Steps:
 *   1. Ingest  — recursive character splitter (2 048 chars / 200 char overlap)
 *   2. Embed   — embed-english-v3.0 with asymmetric input_type
 *   3. Retrieve — flat cosine-similarity search (top-10 candidates)
 *   4. Rerank  — rerank-english-v3.0 cross-encoder (top-3)
 *   5. Generate — command-r-plus-08-2024 with grounded generation + citations
 *
 * Module-level in-memory state (single document at a time).
 * On Vercel, this persists within a warm function instance.
 */

import { CohereClient } from "cohere-ai";
import { chunkText } from "./chunker";

// ---------------------------------------------------------------------------
// Cohere client
// ---------------------------------------------------------------------------

function getClient(): CohereClient {
  const key = process.env.COHERE_API_KEY;
  if (!key) throw new Error("COHERE_API_KEY environment variable is not set.");
  return new CohereClient({ token: key });
}

// ---------------------------------------------------------------------------
// Public API — fully stateless (no module-level state)
// ---------------------------------------------------------------------------

export interface IngestResult {
  chunks: string[];
  embeddings: number[][];
  chunk_count: number;
}

export interface QueryResult {
  answer: string;
  citations: Array<{ start: number; end: number; text: string; document_ids: string[] }>;
  source_chunks: Array<{ id: string; text: string; relevance_score: number }>;
}

/** Chunk and embed a document. Returns chunks + embeddings to be stored client-side. */
export async function ingestDocument(text: string): Promise<IngestResult> {
  const co = getClient();

  const chunks = chunkText(text);
  if (chunks.length === 0) throw new Error("No text could be extracted from the document.");

  const embeddings = await embed(co, chunks, "search_document");
  normalizeAll(embeddings);

  return { chunks, embeddings, chunk_count: chunks.length };
}

/**
 * Stateless retrieve → rerank → generate pipeline.
 * Caller passes chunks + embeddings (received from ingestDocument).
 */
export async function queryWithContext(
  query: string,
  chunks: string[],
  embeddings: number[][],
): Promise<QueryResult> {
  if (chunks.length === 0) throw new Error("No document context provided.");

  const co = getClient();

  // ---- Embed query ---------------------------------------------------------
  const [qVec] = await embed(co, [query], "search_query");
  normalizeAll([qVec]);

  // ---- Top-10 cosine similarity --------------------------------------------
  const k = Math.min(10, chunks.length);
  const topIndices = topK(qVec, embeddings, k);
  const candidateTexts = topIndices.map((i) => chunks[i]);

  // ---- Rerank → top-3 ------------------------------------------------------
  const rerankResp = await co.rerank({
    model: "rerank-english-v3.0",
    query,
    documents: candidateTexts,
    topN: 3,
  });

  const topChunks = rerankResp.results.map((r) => ({
    id: `chunk_${r.index}`,
    text: candidateTexts[r.index],
    relevance_score: r.relevanceScore,
  }));

  // ---- Grounded generation -------------------------------------------------
  const documents = topChunks.map((c) => ({ id: c.id, text: c.text }));

  const chatResp = await co.chat({
    model: "command-r-plus-08-2024",
    message: query,
    documents,
  });

  const citations = (chatResp.citations ?? []).map((cit) => ({
    start: cit.start,
    end: cit.end,
    text: cit.text,
    document_ids: cit.documentIds,
  }));

  return { answer: chatResp.text, citations, source_chunks: topChunks };
}

// ---------------------------------------------------------------------------
// Vector helpers
// ---------------------------------------------------------------------------

async function embed(
  co: CohereClient,
  texts: string[],
  inputType: "search_document" | "search_query",
): Promise<number[][]> {
  const resp = await co.embed({
    texts,
    model: "embed-english-v3.0",
    inputType,
    embeddingTypes: ["float"],
  });

  if (resp.responseType !== "embeddings_by_type" || !resp.embeddings.float) {
    throw new Error("Unexpected embed response type from Cohere API.");
  }
  return resp.embeddings.float;
}

function normalizeAll(vecs: number[][]): void {
  for (const vec of vecs) {
    const mag = Math.sqrt(vec.reduce((s, v) => s + v * v, 0));
    if (mag > 0) {
      for (let i = 0; i < vec.length; i++) vec[i] /= mag;
    }
  }
}

function dotProduct(a: number[], b: number[]): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += a[i] * b[i];
  return sum;
}

function topK(query: number[], matrix: number[][], k: number): number[] {
  const scores = matrix.map((row, i) => ({ i, score: dotProduct(query, row) }));
  scores.sort((a, b) => b.score - a.score);
  return scores.slice(0, k).map((s) => s.i);
}
