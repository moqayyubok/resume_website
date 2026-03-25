"use client";

import { useState } from "react";

interface Props {
  onUpload: (file: File) => Promise<void>;
  onReset: () => void;
  documentLoaded: boolean;
  uploading: boolean;
}

export function FileUpload({ onUpload, onReset, documentLoaded, uploading }: Props) {
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.name.match(/\.(pdf|txt)$/i)) {
      alert("Please upload a PDF or .txt file.");
      return;
    }
    onUpload(file);
  };

  if (documentLoaded) {
    return (
      <button
        onClick={onReset}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
                   bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white
                   border border-zinc-700 hover:border-zinc-500 transition-all"
        title="Upload a new document"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        New document
      </button>
    );
  }

  return (
    <label
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        handleFiles(e.dataTransfer.files);
      }}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all
        border ${dragOver
          ? "border-indigo-400 bg-indigo-900/30 text-indigo-300"
          : "border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500"
        } ${uploading ? "opacity-60 pointer-events-none" : "cursor-pointer"}`}
      title="Upload a PDF or text document"
    >
      <input
        type="file"
        accept=".pdf,.txt"
        className="hidden"
        disabled={uploading}
        onChange={(e) => { handleFiles(e.target.files); e.target.value = ""; }}
      />
      {uploading ? (
        <>
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Processing…
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Upload document
        </>
      )}
    </label>
  );
}
