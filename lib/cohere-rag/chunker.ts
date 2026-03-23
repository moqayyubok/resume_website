/**
 * Recursive character text splitter — TypeScript port of the Python version.
 * Splits on progressively finer separators until each chunk fits within the target size.
 */

const DEFAULT_SEPARATORS = ["\n\n", "\n", ". ", " ", ""];
const DEFAULT_CHUNK_SIZE = 2048;   // ≈ 512 tokens
const DEFAULT_OVERLAP = 200;       // ≈ 50 tokens

export function chunkText(
  text: string,
  chunkSize = DEFAULT_CHUNK_SIZE,
  overlap = DEFAULT_OVERLAP,
): string[] {
  const chunks = _split(text, DEFAULT_SEPARATORS, chunkSize, overlap);
  return chunks.filter((c) => c.trim().length > 0);
}

function _split(
  text: string,
  separators: string[],
  chunkSize: number,
  overlap: number,
): string[] {
  if (text.length <= chunkSize) return [text];
  if (separators.length === 0) {
    // Hard-split by characters
    return hardSplit(text, chunkSize, overlap);
  }

  const [sep, ...rest] = separators;

  if (!text.includes(sep)) {
    return _split(text, rest, chunkSize, overlap);
  }

  const pieces = text.split(sep);
  const chunks: string[] = [];
  let bucket = "";

  for (const piece of pieces) {
    const candidate = bucket ? bucket + sep + piece : piece;
    if (candidate.length <= chunkSize) {
      bucket = candidate;
    } else {
      if (bucket) {
        // Recursively split the bucket in case it's still too big
        const sub = _split(bucket, rest, chunkSize, overlap);
        chunks.push(...sub);
        // Seed next bucket with the overlap from the last sub-chunk
        const last = sub[sub.length - 1] ?? "";
        bucket = last.slice(Math.max(0, last.length - overlap));
      }
      bucket = bucket ? bucket + sep + piece : piece;
    }
  }
  if (bucket) {
    chunks.push(..._split(bucket, rest, chunkSize, overlap));
  }

  return chunks;
}

function hardSplit(text: string, chunkSize: number, overlap: number): string[] {
  const chunks: string[] = [];
  let start = 0;
  while (start < text.length) {
    chunks.push(text.slice(start, start + chunkSize));
    start += chunkSize - overlap;
  }
  return chunks;
}
