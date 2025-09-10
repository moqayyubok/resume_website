"use client"

import { useState } from "react"
import { MessageCircle, X, Send, Bot, Loader2 } from "lucide-react"

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm Qayyum's AI assistant. I have access to his complete portfolio data including skills, education, certifications, projects, and blog posts. How can I help you learn more about his work and experience?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Function to clean asterisks and format text for web display
  const cleanResponse = (text: string) => {
    return text
      .replace(/\*/g, '') // Remove all asterisks
      .replace(/#{1,6}\s/g, '') // Remove markdown headers
      .replace(/\n\s*\n/g, '\n\n') // Clean up extra line breaks
      .trim();
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      const rawResponse = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response. Please try again.";
      const cleanedResponse = cleanResponse(rawResponse);
      setMessages((prev) => [...prev, { role: "assistant", content: cleanedResponse }]);
    } catch (err) {
      console.error("Chat error:", err);
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: `I apologize, but I encountered an error: ${errorMessage}. Please try asking your question again, or feel free to contact Qayyum directly at qayyumbokhari77@gmail.com.`
      }]);
    } finally {
      setIsLoading(false);
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        title="Open chat"
        className={`fixed bottom-6 right-6 w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center z-50 ${
          isOpen ? "scale-0" : "scale-100"
        }`}
      >
        <MessageCircle className="w-8 h-8" />
      </button>

      {/* Chat Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-all duration-300 z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          {/* Chat Window - Large Modal */}
          <div
            className="w-full max-w-4xl h-[85vh] bg-white dark:bg-gray-800 rounded-lg shadow-2xl transition-all duration-300 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <Bot className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <div>
                  <h3 className="text-xl font-semibold">Qayyum's AI Assistant</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Ask me anything about Qayyum's portfolio</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Disclaimer / Info */}
            <div className="px-6 py-3 text-sm text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 bg-blue-50 dark:bg-blue-900/20">
              <span role="alert">
                <strong>💡 Smart Assistant:</strong> I have access to Qayyum's complete portfolio data including skills, education, certifications, projects, and blog posts. Ask me about his experience, technical skills, or any specific projects!
              </span>
            </div>

            {/* Messages */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex items-start gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.role === "user" 
                        ? "bg-blue-600 text-white" 
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}>
                      {message.role === "user" ? (
                        <span className="text-sm font-semibold">U</span>
                      ) : (
                        <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      )}
                    </div>
                    <div
                      className={`px-4 py-3 rounded-lg text-sm leading-relaxed ${
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
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Analyzing portfolio data and generating response...
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about Qayyum's skills, projects, education, or experience..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  title="Send message"
                  disabled={isLoading || !input.trim()}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                  <span className="hidden sm:inline">Send</span>
                </button>
              </div>
              
              {/* Quick Questions */}
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">Quick questions:</span>
                {[
                  "What are Qayyum's main skills?",
                  "Tell me about his projects",
                  "What's his educational background?",
                  "What certifications does he have?"
                ].map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(question)}
                    className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
