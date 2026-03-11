"use client"

import { MessageSquare } from "lucide-react"

export default function AskAIButton({ projectTitle }: { projectTitle: string }) {
  const handleClick = () => {
    const message = `Tell me about the ${projectTitle} project — what was built, what technologies were used, and what results it achieved.`
    window.dispatchEvent(new CustomEvent("open-chat", { detail: { message } }))
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
    >
      <MessageSquare className="w-4 h-4" />
      Ask AI
    </button>
  )
}
