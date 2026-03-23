"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { navLinks } from "@/data/data"

const MONO: React.CSSProperties = { fontFamily: "var(--font-mono)" }

export default function Navbar() {
  const [isOpen,   setIsOpen]   = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleNavigation = (href: string) => {
    setIsOpen(false)
    if (href.startsWith("#")) {
      window.location.href = `/${href}`
    } else {
      window.location.href = href
    }
  }

  return (
    <nav
      className="fixed top-0 w-full z-50 transition-all duration-300"
      style={{
        background:     scrolled ? "rgba(10,10,10,0.92)" : "transparent",
        borderBottom:   scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-sm font-extrabold tracking-widest uppercase text-white hover:text-blue-400 transition-colors"
            style={MONO}
          >
            QB
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavigation(link.href)}
                className="text-[11px] tracking-[0.18em] uppercase transition-colors duration-200 hover:text-white"
                style={{ ...MONO, color: "rgba(255,255,255,0.45)" }}
              >
                {link.label}
              </button>
            ))}
          </div>
          <button
            className="md:hidden p-2 transition-colors"
            style={{ color: "rgba(255,255,255,0.55)" }}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div
          className="md:hidden px-6 py-6 flex flex-col gap-5"
          style={{ background: "rgba(10,10,10,0.97)", borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavigation(link.href)}
              className="text-left text-[11px] tracking-[0.2em] uppercase transition-colors hover:text-white"
              style={{ ...MONO, color: "rgba(255,255,255,0.5)" }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
