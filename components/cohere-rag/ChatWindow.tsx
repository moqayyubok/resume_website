"use client";

import { useEffect, useRef } from "react";
import type { Message, SourceChunk } from "./types";
import { MessageBubble, TypingIndicator } from "./MessageBubble";

interface Props {
  messages: Message[];
  loading: boolean;
  documentLoaded: boolean;
  onCitationClick: (chunk: SourceChunk, num: number) => void;
}

export function ChatWindow({ messages, loading, documentLoaded, onCitationClick }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
        {documentLoaded ? (
          <>
            <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-600/30
                            flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <p className="text-zinc-300 font-medium mb-1">Document ready</p>
            <p className="text-zinc-500 text-sm">Ask any question about your document below.</p>
          </>
        ) : (
          <>
            <div className="w-14 h-14 rounded-2xl bg-zinc-800 border border-zinc-700
                            flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-zinc-400 font-medium mb-1">No document loaded</p>
            <p className="text-zinc-600 text-sm">
              Upload a PDF or text file using the button above.
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto py-4 space-y-1">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} onCitationClick={onCitationClick} />
      ))}
      {loading && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
}
