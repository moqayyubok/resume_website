"use client"

import type React from "react"
import { useState } from "react"
import { Send } from "lucide-react"
import { contactInfo } from "@/data/data"

const MONO: React.CSSProperties = { fontFamily: "var(--font-mono)" }

const INPUT_STYLE: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 10,
  color: "#fff",
  outline: "none",
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "", // honeypot — hidden from real users
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      if (response.ok) {
        setSubmitStatus({ type: "success", message: "Thank you! Your message has been sent successfully." })
        setFormData({ name: "", email: "", subject: "", message: "", website: "" })
      } else {
        setSubmitStatus({ type: "error", message: data.error || "Failed to send message. Please try again." })
      }
    } catch {
      setSubmitStatus({ type: "error", message: "An error occurred. Please try again later." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section id="contact" className="py-24" style={{ background: "#0a0a0a" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        {/* ── Section header ── */}
        <div className="mb-14">
          <p className="text-[10px] font-medium tracking-[0.28em] uppercase mb-3"
             style={{ ...MONO, color: "#60A5FA" }}>
            ( 08 ) &nbsp;Contact
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">Get In Touch</h2>
          <div className="mt-5 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
          <p className="mt-4 text-sm" style={{ color: "rgba(255,255,255,0.42)" }}>
            Let&apos;s discuss your next project or collaboration opportunity
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-14">

          {/* Left: contact info */}
          <div>
            <p className="text-sm font-bold text-white mb-6">Contact Information</p>
            <div className="space-y-5">
              {contactInfo.map((contact, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0"
                    style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", color: "#60A5FA" }}
                  >
                    {contact.icon}
                  </div>
                  <div>
                    <p className="text-[10px] tracking-wider uppercase font-medium mb-0.5"
                       style={{ ...MONO, color: "rgba(255,255,255,0.35)" }}>
                      {contact.title}
                    </p>
                    {contact.href ? (
                      <a href={contact.href} className="text-sm text-white hover:text-blue-400 transition-colors">
                        {contact.value}
                      </a>
                    ) : (
                      <p className="text-sm text-white">{contact.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div>
            {submitStatus.type && (
              <div
                className="mb-6 p-4 rounded-xl text-sm"
                style={submitStatus.type === "success"
                  ? { background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", color: "rgba(74,222,128,0.9)" }
                  : { background: "rgba(239,68,68,0.08)",  border: "1px solid rgba(239,68,68,0.2)",  color: "rgba(248,113,113,0.9)" }
                }
              >
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot — hidden from real users */}
              <div aria-hidden="true" style={{ display: "none" }}>
                <label htmlFor="website">Website</label>
                <input type="text" id="website" name="website" value={formData.website} onChange={handleChange} tabIndex={-1} autoComplete="off" />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold mb-2"
                         style={{ ...MONO, color: "rgba(255,255,255,0.45)" }}>
                    Name
                  </label>
                  <input
                    type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                    className="w-full px-4 py-3 text-sm"
                    style={INPUT_STYLE}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold mb-2"
                         style={{ ...MONO, color: "rgba(255,255,255,0.45)" }}>
                    Email
                  </label>
                  <input
                    type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                    className="w-full px-4 py-3 text-sm"
                    style={INPUT_STYLE}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-semibold mb-2"
                       style={{ ...MONO, color: "rgba(255,255,255,0.45)" }}>
                  Subject
                </label>
                <input
                  type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required
                  className="w-full px-4 py-3 text-sm"
                  style={INPUT_STYLE}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold mb-2"
                       style={{ ...MONO, color: "rgba(255,255,255,0.45)" }}>
                  Message
                </label>
                <textarea
                  id="message" name="message" value={formData.message} onChange={handleChange} required rows={6}
                  className="w-full px-4 py-3 text-sm resize-none"
                  style={INPUT_STYLE}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-3 rounded-full text-sm font-bold text-white flex items-center justify-center gap-2 transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: "#3B82F6" }}
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? "Sending…" : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
