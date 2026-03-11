"use client"

import { useState, useEffect, useRef } from "react"
import { MessageCircle, X, Send, Bot, Loader2 } from "lucide-react"

const QUICK_QUESTIONS = [
  "What are Qayyum's main skills?",
  "Tell me about his projects",
  "What's his educational background?",
  "What certifications does he have?",
]

type Message = { role: string; content: string }

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Qayyum's AI assistant. I have access to his complete portfolio data including skills, education, certifications, projects, and blog posts. How can I help you learn more about his work and experience?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const sessionIdRef = useRef<string>("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  // Always points to the latest sendMessage — avoids stale closure in event listener
  const sendMessageRef = useRef<(text: string) => void>(() => {})

  useEffect(() => {
    if (!sessionIdRef.current) {
      sessionIdRef.current = `session-${Date.now()}-${Math.random().toString(36).substring(7)}`
    }
  }, [])

  // Body scroll lock on mobile when chat is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  // Scroll to bottom on new messages / typing indicator
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  const cleanResponse = (text: string) =>
    text.replace(/\*/g, "").replace(/#{1,6}\s/g, "").replace(/\n\s*\n/g, "\n\n").trim()

  // Core send function — accepts text directly so it can be called from the event handler
  const sendMessage = async (text: string, currentMessages: Message[]) => {
    if (!text.trim() || isLoading) return

    const userMessage: Message = { role: "user", content: text }
    const updatedMessages = [...currentMessages, userMessage]
    setMessages(updatedMessages)
    setInput("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages, sessionId: sessionIdRef.current }),
      })

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      const data = await res.json()
      if (data.error) throw new Error(data.error)

      const raw =
        data.choices?.[0]?.message?.content ||
        "Sorry, I couldn't generate a response. Please try again."
      setMessages((prev) => [...prev, { role: "assistant", content: cleanResponse(raw) }])
    } catch (err) {
      console.error("Chat error:", err)
      const msg = err instanceof Error ? err.message : "Unknown error occurred"
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `I apologize, but I encountered an error: ${msg}. Please try again, or contact Qayyum directly at qayyumbokhari77@gmail.com.`,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  // Keep ref current so the event listener always calls the latest version
  const messagesRef = useRef(messages)
  useEffect(() => { messagesRef.current = messages }, [messages])

  sendMessageRef.current = (text: string) => sendMessage(text, messagesRef.current)

  // Listen for project card "Ask AI" deep-link events
  useEffect(() => {
    const handler = (e: Event) => {
      const { message } = (e as CustomEvent<{ message: string }>).detail
      setIsOpen(true)
      // Small delay so the chat is mounted/visible before sending
      setTimeout(() => sendMessageRef.current(message), 50)
    }
    window.addEventListener("open-chat", handler)
    return () => window.removeEventListener("open-chat", handler)
  }, [])

  const handleSend = () => sendMessage(input, messages)

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Floating open button */}
      <button
        onClick={() => setIsOpen(true)}
        title="Open chat"
        className={`fixed bottom-6 right-6 w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center z-50 ${
          isOpen ? "scale-0" : "scale-100"
        }`}
      >
        <MessageCircle className="w-8 h-8" />
      </button>

      {/* Chat modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center md:bg-black/50 md:p-4"
          onClick={() => setIsOpen(false)}
        >
          {/* Mobile: full-screen — Desktop: centered panel */}
          <div
            className="w-full h-[100dvh] flex flex-col bg-white dark:bg-gray-800 md:h-[85vh] md:max-w-4xl md:rounded-lg md:shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
              <div className="flex items-center gap-3">
                <Bot className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <div>
                  <h3 className="text-base md:text-xl font-semibold leading-tight">Qayyum's AI Assistant</h3>
                  <p className="hidden md:block text-sm text-gray-500 dark:text-gray-400">
                    Ask me anything about Qayyum's portfolio
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex-shrink-0"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Smart banner — desktop only */}
            <div className="hidden md:block px-6 py-3 text-sm text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 bg-blue-50 dark:bg-blue-900/20 flex-shrink-0">
              <strong>💡 Smart Assistant:</strong> I have access to Qayyum's complete portfolio data including skills,
              education, certifications, projects, and blog posts.
            </div>

            {/* Messages — only this scrolls */}
            <div className="flex-1 px-4 py-4 md:px-6 overflow-y-auto space-y-4 min-h-0">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex items-start gap-2 max-w-[85%] md:max-w-[80%] ${
                      message.role === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    >
                      {message.role === "user" ? (
                        <span className="text-xs font-semibold">U</span>
                      ) : (
                        <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      )}
                    </div>
                    <div
                      className={`px-3 py-2 md:px-4 md:py-3 rounded-lg text-sm leading-relaxed ${
                        message.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{message.content}</div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing indicator — three bouncing dots */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2">
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-lg flex items-center gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="block w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500"
                          style={{
                            animation: "chatbot-bounce 1.2s ease-in-out infinite",
                            animationDelay: `${i * 0.15}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input area — always pinned at bottom */}
            <div
              className="flex-shrink-0 px-4 pt-3 pb-4 md:px-6 md:pt-4 md:pb-6 border-t border-gray-200 dark:border-gray-700"
              style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
            >
              {/* Quick questions — horizontal scroll on mobile, wrap on desktop */}
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 md:flex-wrap mb-3">
                <span className="hidden md:inline text-xs text-gray-500 dark:text-gray-400 self-center flex-shrink-0 mr-1">
                  Quick questions:
                </span>
                {QUICK_QUESTIONS.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(question)}
                    className="flex-shrink-0 text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors whitespace-nowrap"
                  >
                    {question}
                  </button>
                ))}
              </div>

              {/* Text input + send */}
              <div className="flex gap-2 md:gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about Qayyum's skills, projects, experience…"
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  title="Send message"
                  disabled={isLoading || !input.trim()}
                  className="px-4 md:px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  <span className="hidden sm:inline">Send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
