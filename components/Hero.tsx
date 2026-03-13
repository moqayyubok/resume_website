"use client"

import { useState, useEffect } from "react"
import { ChevronDown, Download } from "lucide-react"
import { personalInfo, socialLinks } from "@/data/data"

const PHRASES = [
  "Software Engineer",
  "Full Stack Developer",
  "AI & ML Engineer",
  "Problem Solver",
]

export default function Hero() {
  const [text, setText] = useState("")
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = PHRASES[phraseIndex]

    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), 2000)
      return () => clearTimeout(t)
    }

    if (deleting && text === "") {
      setDeleting(false)
      setPhraseIndex((i) => (i + 1) % PHRASES.length)
      return
    }

    const t = setTimeout(
      () => setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1)),
      deleting ? 45 : 95,
    )
    return () => clearTimeout(t)
  }, [text, deleting, phraseIndex])

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 pt-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
            Q
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Hi, I&apos;m <span className="text-blue-600 dark:text-blue-400">{personalInfo.name}</span>
          </h1>
          <div className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 h-8">
            {text}
            <span className="animate-pulse">|</span>
          </div>
        </div>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          I build things that work. Software engineer with commercial experience in full-stack development and AI-powered applications.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <a
            href="/Qayyum_Bokhari_CV.docx"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download Resume
          </a>
          <div className="flex gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="animate-bounce">
          <ChevronDown className="w-8 h-8 mx-auto text-gray-400" />
        </div>
      </div>
    </section>
  )
}
