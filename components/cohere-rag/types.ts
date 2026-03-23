export interface Citation {
  start: number;
  end: number;
  text: string;
  document_ids: string[];
}

export interface SourceChunk {
  id: string;
  text: string;
  relevance_score: number;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  citations?: Citation[];
  source_chunks?: SourceChunk[];
  isError?: boolean;
}
