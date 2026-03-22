"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Download, Mail, ChevronDown } from "lucide-react"
import { Plus_Jakarta_Sans } from "next/font/google"

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
})

// ─── Easing curve: snappy deceleration ────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const

// ─── Slide-up reveal variant ──────────────────────────────────────────────────
const slideUp = (delay = 0) => ({
  initial: { y: "105%", opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { delay, duration: 0.9, ease: EASE },
})

// ─── Fade-up variant ──────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.75, ease: EASE },
})

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  // ── Detect mobile once on mount + on resize ──────────────────────────────
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  // ── Normalised mouse position: −0.5 → +0.5 ──────────────────────────────
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isMobile) return
    const r = sectionRef.current!.getBoundingClientRect()
    setMouse({
      x: (e.clientX - r.left) / r.width - 0.5,
      y: (e.clientY - r.top) / r.height - 0.5,
    })
  }

  const handleMouseLeave = () => setMouse({ x: 0, y: 0 })

  // ── Parallax helpers ─────────────────────────────────────────────────────
  const shift = (factor: number) =>
    isMobile ? "none" : `translate(${mouse.x * factor}px, ${mouse.y * factor}px)`

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${jakarta.className} relative min-h-screen overflow-hidden flex flex-col`}
      style={{ background: "#0a0a0a" }}
    >
      {/* ── Subtle dot-grid texture ──────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── Ambient orange glow (follows cursor slightly) ────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute rounded-full"
        style={{
          width: "55vw",
          height: "55vw",
          top: "5%",
          right: "-10%",
          background:
            "radial-gradient(circle, rgba(249,115,22,0.13) 0%, transparent 68%)",
          filter: "blur(40px)",
          transform: shift(18),
          transition: "transform 0.5s ease-out",
        }}
      />

      {/* ═══════════════════════════════════════════════════════════════════
          MAIN CONTENT
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="relative flex-1 flex flex-col justify-center px-6 md:px-14 lg:px-20 pt-28 pb-10">

        {/* ── Mobile-only: small circular photo above name ─────────────── */}
        <motion.div
          className="md:hidden mb-6 self-start"
          {...fadeUp(0.15)}
        >
          <div
            className="relative"
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid rgba(249,115,22,0.4)",
              boxShadow: "0 0 24px rgba(249,115,22,0.2)",
            }}
          >
            <Image
              src="/Mypicture.jpg"
              alt="Qayyum Bokhari"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* ── Giant name block + overlapping photo ─────────────────────── */}
        <div className="relative">

          {/* Text — shifts opposite direction to photo */}
          <div
            style={{
              transform: shift(-7),
              transition: "transform 0.18s ease-out",
            }}
          >
            {/* QAYYUM — solid white */}
            <div className="overflow-hidden">
              <motion.h1
                {...slideUp(0)}
                className="font-extrabold uppercase tracking-tighter text-white leading-none select-none"
                style={{ fontSize: "clamp(3.8rem, 17.8vw, 248px)", lineHeight: 0.87 }}
              >
                QAYYUM
              </motion.h1>
            </div>

            {/* BOKHARI — outline / stroke style */}
            <div className="overflow-hidden">
              <motion.h1
                {...slideUp(0.1)}
                className="font-extrabold uppercase tracking-tighter leading-none select-none"
                style={{
                  fontSize: "clamp(3.8rem, 17.8vw, 248px)",
                  lineHeight: 0.87,
                  color: "transparent",
                  WebkitTextStroke: "clamp(1px, 0.15vw, 2.5px) #F97316",
                }}
              >
                BOKHARI
              </motion.h1>
            </div>
          </div>

          {/* ── Profile photo — overlaps both name lines ─────────────── */}
          <div
            className="hidden md:block absolute pointer-events-none"
            style={{
              /* sits between the two name lines, pushed right */
              top: "50%",
              right: "clamp(0px, 2vw, 40px)",
              zIndex: 20,
              transform: `translate(${isMobile ? 0 : mouse.x * 14}px, calc(-50% + ${isMobile ? 0 : mouse.y * 14}px))`,
              transition: "transform 0.14s ease-out",
            }}
          >
            <motion.div
              initial={{ scale: 0.78, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.32, duration: 1, ease: EASE }}
            >
              <div
                style={{
                  width: "clamp(200px, 23vw, 370px)",
                  height: "clamp(240px, 28vw, 450px)",
                  /* organic blob shape — top rounded, bottom tapers */
                  borderRadius: "48% 52% 46% 54% / 42% 42% 58% 58%",
                  overflow: "hidden",
                  border: "2px solid rgba(249,115,22,0.22)",
                  boxShadow:
                    "0 0 90px rgba(249,115,22,0.11), 0 50px 110px rgba(0,0,0,0.65)",
                }}
              >
                <Image
                  src="/Mypicture.jpg"
                  alt="Qayyum Bokhari"
                  width={370}
                  height={450}
                  className="object-cover w-full h-full object-top"
                  priority
                />
              </div>
            </motion.div>
          </div>

        </div>

        {/* ── Subtitle + CTA row ───────────────────────────────────────── */}
        <div className="mt-8 md:mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">

          {/* Left: role label + one-liner */}
          <motion.div {...fadeUp(0.52)}>
            <p
              className="text-xs font-bold tracking-[0.28em] uppercase mb-2"
              style={{ color: "#F97316" }}
            >
              Full-Stack Developer &amp; AI Engineer
            </p>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "rgba(255,255,255,0.38)" }}>
              Building production software with React, Django,&nbsp;and LLM integrations.
            </p>
          </motion.div>

          {/* Right: buttons */}
          <motion.div {...fadeUp(0.68)} className="flex items-center gap-3">
            <a
              href="/Qayyum_Bokhari_CV.docx"
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-300"
              style={{
                color: "rgba(255,255,255,0.75)",
                border: "1px solid rgba(255,255,255,0.14)",
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.borderColor =
                  "rgba(249,115,22,0.55)"
                ;(e.currentTarget as HTMLAnchorElement).style.color = "#F97316"
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.borderColor =
                  "rgba(255,255,255,0.14)"
                ;(e.currentTarget as HTMLAnchorElement).style.color =
                  "rgba(255,255,255,0.75)"
              }}
            >
              <Download className="w-4 h-4" />
              Resume
            </a>

            <a
              href="#contact"
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-full transition-all duration-200 hover:brightness-110 active:scale-95"
              style={{ background: "#F97316", color: "#0a0a0a" }}
            >
              <Mail className="w-4 h-4" />
              Get in Touch
            </a>
          </motion.div>

        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────────────── */}
      <motion.div
        {...fadeUp(1.05)}
        className="flex flex-col items-center pb-9 gap-1.5"
      >
        <span
          className="text-[10px] font-semibold tracking-[0.32em] uppercase"
          style={{ color: "rgba(255,255,255,0.22)" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.7, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4" style={{ color: "#F97316" }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
