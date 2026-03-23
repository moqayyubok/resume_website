"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { ChatWindow } from "@/components/cohere-rag/ChatWindow";
import { CitationPanel } from "@/components/cohere-rag/CitationPanel";
import { FileUpload } from "@/components/cohere-rag/FileUpload";
import type { Message, SourceChunk } from "@/components/cohere-rag/types";

let msgId = 0;
const uid = () => String(++msgId);

export default function CohereRagPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [documentLoaded, setDocumentLoaded] = useState(false);
  const [docName, setDocName] = useState("");
  const [activeCitation, setActiveCitation] = useState<{ chunk: SourceChunk; num: number } | null>(null);

  // ------------------------------------------------------------------
  // Upload
  // ------------------------------------------------------------------
  const handleUpload = useCallback(async (file: File) => {
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/cohere/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");

      setDocumentLoaded(true);
      setDocName(data.filename);
      setMessages([]);
      setActiveCitation(null);
      setMessages([
        {
          id: uid(),
          role: "assistant",
          content: `Document "${data.filename}" loaded — ${data.chunk_count} chunks indexed. Ask me anything about it.`,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { id: uid(), role: "assistant", content: `Upload failed: ${(err as Error).message}`, isError: true },
      ]);
    } finally {
      setUploading(false);
    }
  }, []);

  // ------------------------------------------------------------------
  // Reset
  // ------------------------------------------------------------------
  const handleReset = useCallback(async () => {
    await fetch("/api/cohere/reset", { method: "POST" });
    setDocumentLoaded(false);
    setDocName("");
    setMessages([]);
    setActiveCitation(null);
  }, []);

  // ------------------------------------------------------------------
  // Send query
  // ------------------------------------------------------------------
  const handleSend = useCallback(async () => {
    const query = input.trim();
    if (!query || loading) return;

    setInput("");
    setActiveCitation(null);
    setMessages((prev) => [...prev, { id: uid(), role: "user", content: query }]);
    setLoading(true);

    try {
      const res = await fetch("/api/cohere/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Query failed");

      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: "assistant",
          content: data.answer,
          citations: data.citations,
          source_chunks: data.source_chunks,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { id: uid(), role: "assistant", content: `Error: ${(err as Error).message}`, isError: true },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 overflow-hidden">
      {/* ------------------------------------------------------------------ */}
      {/* Main column                                                          */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <header className="shrink-0 flex items-center gap-3 px-4 py-3 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-sm">
          {/* Back link */}
          <Link
            href="/"
            className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300 transition-colors mr-1"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>

          <FileUpload
            onUpload={handleUpload}
            onReset={handleReset}
            documentLoaded={documentLoaded}
            uploading={uploading}
          />

          {/* Title / doc name */}
          <div className="flex-1 flex items-center gap-2 min-w-0">
            <span className="font-semibold text-zinc-200 text-sm hidden sm:inline">Cohere RAG</span>
            {docName && (
              <>
                <span className="text-zinc-600 hidden sm:inline">/</span>
                <span className="text-xs text-zinc-500 truncate max-w-[200px]">{docName}</span>
              </>
            )}
          </div>

          {/* Cohere badge */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-xs text-zinc-600 hidden md:inline">Powered by</span>
            <span className="text-xs font-semibold text-indigo-400 bg-indigo-950/60 border border-indigo-800/50 px-2 py-0.5 rounded-full">
              Cohere
            </span>
          </div>
        </header>

        {/* Chat area */}
        <ChatWindow
          messages={messages}
          loading={loading}
          documentLoaded={documentLoaded}
          onCitationClick={(chunk, num) => setActiveCitation({ chunk, num })}
        />

        {/* Input bar */}
        <div className="shrink-0 border-t border-zinc-800/80 p-4 bg-zinc-950/90 backdrop-blur-sm">
          <div className="max-w-3xl mx-auto flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder={documentLoaded ? "Ask a question about your document…" : "Upload a document to get started"}
                disabled={loading || !documentLoaded}
                className="w-full resize-none rounded-xl bg-zinc-800 border border-zinc-700
                           text-zinc-100 placeholder-zinc-500 px-4 py-3 pr-12
                           focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50
                           disabled:opacity-40 disabled:cursor-not-allowed
                           text-sm leading-relaxed min-h-[48px] max-h-40 overflow-y-auto
                           transition-colors"
              />
            </div>
            <button
              onClick={handleSend}
              disabled={loading || !documentLoaded || !input.trim()}
              className="shrink-0 w-11 h-11 rounded-xl bg-indigo-600 hover:bg-indigo-500
                         disabled:bg-zinc-700 disabled:cursor-not-allowed
                         flex items-center justify-center transition-colors"
              aria-label="Send"
            >
              {loading ? (
                <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </div>
          <p className="text-center text-zinc-700 text-xs mt-2">
            Enter to send · Shift+Enter for new line
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Citation panel                                                       */}
      {/* ------------------------------------------------------------------ */}
      {activeCitation && (
        <CitationPanel
          chunk={activeCitation.chunk}
          chunkNumber={activeCitation.num}
          onClose={() => setActiveCitation(null)}
        />
      )}
    </div>
  );
}
