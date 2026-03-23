"use client";

import type { SourceChunk } from "./types";

interface Props {
  chunk: SourceChunk;
  chunkNumber: number;
  onClose: () => void;
}

export function CitationPanel({ chunk, chunkNumber, onClose }: Props) {
  const score = Math.round(chunk.relevance_score * 100);

  return (
    <div className="w-80 shrink-0 flex flex-col border-l border-zinc-800 bg-zinc-950">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full
                           bg-indigo-600 text-white text-xs font-bold">
            {chunkNumber}
          </span>
          <span className="text-sm font-semibold text-zinc-200">Source chunk</span>
        </div>
        <button
          onClick={onClose}
          className="text-zinc-500 hover:text-zinc-300 transition-colors p-1 rounded"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Relevance bar */}
      <div className="px-4 py-3 border-b border-zinc-800/60">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-zinc-500">Rerank relevance score</span>
          <span className="text-xs font-mono font-semibold text-indigo-400">{score}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-indigo-400 transition-all"
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      {/* Chunk text */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
          Passage
        </p>
        <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
          {chunk.text}
        </p>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-zinc-800/60">
        <p className="text-xs text-zinc-600 font-mono">{chunk.id}</p>
      </div>
    </div>
  );
}
