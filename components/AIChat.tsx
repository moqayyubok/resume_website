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

// Design tokens — mirrors the rest of the portfolio
const PANEL:      React.CSSProperties = { background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.08)" }
const DIVIDER_B:  React.CSSProperties = { borderBottomColor: "rgba(255,255,255,0.08)" }
const DIVIDER_T:  React.CSSProperties = { borderTopColor:    "rgba(255,255,255,0.08)" }
const AVATAR_BOT: React.CSSProperties = { background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.25)" }
const BUBBLE_BOT: React.CSSProperties = { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.85)" }
const BUBBLE_USR: React.CSSProperties = { background: "#3B82F6", color: "#fff" }
const INPUT_STYLE: React.CSSProperties = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "#fff", outline: "none" }
const CHIP_STYLE:  React.CSSProperties = { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }
const MONO = { fontFamily: "var(--font-mono)" }

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
  const sendMessageRef = useRef<(text: string) => void>(() => {})

  useEffect(() => {
    if (!sessionIdRef.current) {
      sessionIdRef.current = `session-${Date.now()}-${Math.random().toString(36).substring(7)}`
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  const cleanResponse = (text: string) =>
    text.replace(/\*/g, "").replace(/#{1,6}\s/g, "").replace(/\n\s*\n/g, "\n\n").trim()

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
      if (data.error) {
        const e = data.error
        const msg = typeof e === "string" ? e : typeof e?.message === "string" ? e.message : JSON.stringify(e) || "API error"
        throw new Error(msg)
      }

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

  const messagesRef = useRef(messages)
  useEffect(() => { messagesRef.current = messages }, [messages])

  sendMessageRef.current = (text: string) => sendMessage(text, messagesRef.current)

  useEffect(() => {
    const handler = (e: Event) => {
      const { message } = (e as CustomEvent<{ message: string }>).detail
      setIsOpen(true)
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
        className={`fixed bottom-5 right-5 md:bottom-6 md:right-6 w-14 h-14 md:w-16 md:h-16 text-white rounded-full shadow-xl transition-all duration-300 flex items-center justify-center z-50 hover:brightness-110 ${
          isOpen ? "scale-0 pointer-events-none" : "scale-100"
        }`}
        style={{ background: "#3B82F6" }}
      >
        <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
      </button>

      {/* Chat modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center md:bg-black/60 md:p-4"
          onClick={() => setIsOpen(false)}
        >
          {/* Mobile: slides up from bottom — Desktop: centered panel */}
          <div
            className="w-full flex flex-col md:max-w-4xl md:rounded-2xl md:shadow-2xl"
            style={{
              ...PANEL,
              height: "100dvh",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4 border-b flex-shrink-0"
              style={DIVIDER_B}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={AVATAR_BOT}
                >
                  <Bot className="w-4 h-4" style={{ color: "#60A5FA" }} />
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-bold text-white leading-tight">
                    Qayyum's AI Assistant
                  </h3>
                  <p
                    className="hidden md:block text-[10px] tracking-[0.2em] uppercase"
                    style={{ ...MONO, color: "rgba(255,255,255,0.38)" }}
                  >
                    Ask me anything about his portfolio
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-2 rounded-lg transition-colors flex-shrink-0"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Smart info banner — desktop only */}
            <div
              className="hidden md:block px-6 py-3 text-xs flex-shrink-0 border-b"
              style={{
                background: "rgba(59,130,246,0.06)",
                borderBottomColor: "rgba(59,130,246,0.18)",
                color: "rgba(255,255,255,0.55)",
                ...MONO,
              }}
            >
              <span style={{ color: "#60A5FA", fontWeight: 600 }}>Smart Assistant: </span>
              I have access to Qayyum's complete portfolio — skills, education, certifications, projects, and blog posts.
            </div>

            {/* Messages */}
            <div className="flex-1 px-4 py-4 md:px-6 overflow-y-auto space-y-4 min-h-0">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex items-start gap-2 max-w-[85%] md:max-w-[80%] ${
                      message.role === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={message.role === "user" ? { background: "#3B82F6" } : AVATAR_BOT}
                    >
                      {message.role === "user" ? (
                        <span className="text-xs font-bold text-white">U</span>
                      ) : (
                        <Bot className="w-4 h-4" style={{ color: "#60A5FA" }} />
                      )}
                    </div>
                    <div
                      className="px-3 py-2 md:px-4 md:py-3 rounded-xl text-sm leading-relaxed"
                      style={message.role === "user" ? BUBBLE_USR : BUBBLE_BOT}
                    >
                      <div className="whitespace-pre-wrap">{message.content}</div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2">
                    <div
                      className="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={AVATAR_BOT}
                    >
                      <Bot className="w-4 h-4" style={{ color: "#60A5FA" }} />
                    </div>
                    <div
                      className="px-4 py-3 rounded-xl flex items-center gap-1.5"
                      style={BUBBLE_BOT}
                    >
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="block w-2 h-2 rounded-full"
                          style={{
                            background: "rgba(96,165,250,0.7)",
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

            {/* Input area */}
            <div
              className="flex-shrink-0 px-4 pt-3 pb-4 md:px-6 md:pt-4 md:pb-6 border-t"
              style={{ ...DIVIDER_T, paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
            >
              {/* Quick questions */}
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 md:flex-wrap mb-3 scrollbar-none">
                <span
                  className="hidden md:inline text-[10px] tracking-[0.2em] uppercase self-center flex-shrink-0 mr-1"
                  style={{ ...MONO, color: "rgba(255,255,255,0.3)" }}
                >
                  Quick:
                </span>
                {QUICK_QUESTIONS.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(question)}
                    className="flex-shrink-0 text-xs px-3 py-1 rounded-full transition-colors whitespace-nowrap hover:brightness-125"
                    style={CHIP_STYLE}
                  >
                    {question}
                  </button>
                ))}
              </div>

              {/* Input + send */}
              <div className="flex gap-2 md:gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about Qayyum's skills, projects, experience…"
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 text-sm disabled:opacity-50 placeholder:text-white/25"
                  style={INPUT_STYLE}
                />
                <button
                  onClick={handleSend}
                  title="Send message"
                  disabled={isLoading || !input.trim()}
                  className="px-4 md:px-5 py-3 text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 hover:brightness-110 active:scale-95"
                  style={{ background: "#3B82F6", borderRadius: 10 }}
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  <span className="hidden sm:inline text-sm font-semibold">Send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
