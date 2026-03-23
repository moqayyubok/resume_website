"use client";

import type { Citation, Message, SourceChunk } from "./types";

interface Props {
  message: Message;
  onCitationClick: (chunk: SourceChunk, num: number) => void;
}

export function MessageBubble({ message, onCitationClick }: Props) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4 px-4`}>
      {!isUser && (
        <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600
                        flex items-center justify-center text-white text-xs font-bold mr-3 mt-1">
          Co
        </div>
      )}

      <div className={`max-w-[75%] ${isUser ? "max-w-[60%]" : ""}`}>
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isUser
              ? "bg-indigo-600 text-white rounded-tr-sm"
              : message.isError
              ? "bg-red-950/60 border border-red-800/50 text-red-300 rounded-tl-sm"
              : "bg-zinc-800/80 text-zinc-100 rounded-tl-sm"
          }`}
        >
          {isUser ? (
            <span>{message.content}</span>
          ) : (
            <CitedContent
              content={message.content}
              citations={message.citations ?? []}
              sourceChunks={message.source_chunks ?? []}
              onCitationClick={onCitationClick}
            />
          )}
        </div>

        {!isUser && (message.source_chunks?.length ?? 0) > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {message.source_chunks!.map((chunk, idx) => (
              <button
                key={chunk.id}
                onClick={() => onCitationClick(chunk, idx + 1)}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs
                           bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-indigo-500
                           text-zinc-400 hover:text-indigo-300 transition-all"
              >
                <span className="font-bold text-indigo-400">[{idx + 1}]</span>
                {Math.round(chunk.relevance_score * 100)}% match
              </button>
            ))}
          </div>
        )}
      </div>

      {isUser && (
        <div className="shrink-0 w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center
                        text-zinc-300 text-xs font-bold ml-3 mt-1">
          You
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// CitedContent — renders assistant text with inline citation markers
// ---------------------------------------------------------------------------

interface CitedContentProps {
  content: string;
  citations: Citation[];
  sourceChunks: SourceChunk[];
  onCitationClick: (chunk: SourceChunk, num: number) => void;
}

function CitedContent({ content, citations, sourceChunks, onCitationClick }: CitedContentProps) {
  if (citations.length === 0) {
    return <span className="whitespace-pre-wrap">{content}</span>;
  }

  const docNumMap = new Map<string, number>();
  let counter = 1;
  const sorted = [...citations].sort((a, b) => a.start - b.start);
  for (const cit of sorted) {
    for (const did of cit.document_ids) {
      if (!docNumMap.has(did)) docNumMap.set(did, counter++);
    }
  }

  const parts: React.ReactNode[] = [];
  let cursor = 0;

  sorted.forEach((cit, idx) => {
    if (cit.start > cursor) {
      parts.push(
        <span key={`pre-${idx}`} className="whitespace-pre-wrap">
          {content.slice(cursor, cit.start)}
        </span>,
      );
    }

    const primaryDocId = cit.document_ids[0] ?? "";
    const num = docNumMap.get(primaryDocId) ?? idx + 1;
    const chunk = sourceChunks.find((c) => c.id === primaryDocId);

    parts.push(
      <span key={`cit-${idx}`} className="group">
        <span className="text-indigo-300 bg-indigo-950/40 rounded px-0.5">
          {content.slice(cit.start, cit.end)}
        </span>
        {chunk && (
          <button
            onClick={() => onCitationClick(chunk, num)}
            className="inline-flex items-center justify-center w-4 h-4 ml-0.5 align-super
                       text-[9px] font-bold rounded-full
                       bg-indigo-600 hover:bg-indigo-500 text-white
                       transition-colors cursor-pointer"
            title={`View source chunk ${num}`}
          >
            {num}
          </button>
        )}
      </span>,
    );

    cursor = cit.end;
  });

  if (cursor < content.length) {
    parts.push(
      <span key="tail" className="whitespace-pre-wrap">
        {content.slice(cursor)}
      </span>,
    );
  }

  return <>{parts}</>;
}

// ---------------------------------------------------------------------------
// Typing indicator
// ---------------------------------------------------------------------------

export function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4 px-4">
      <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600
                      flex items-center justify-center text-white text-xs font-bold mr-3">
        Co
      </div>
      <div className="bg-zinc-800/80 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}
