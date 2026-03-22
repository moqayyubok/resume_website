"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Download, Mail, ChevronDown } from "lucide-react"
import { Plus_Jakarta_Sans } from "next/font/google"

// ─── Font ─────────────────────────────────────────────────────────────────────
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
})

// ─── Constants ────────────────────────────────────────────────────────────────
const BLUE       = "#3B82F6"
const BLUE_LIGHT = "#60A5FA"
const EASE       = [0.16, 1, 0.3, 1] as const

const QAYYUM  = "QAYYUM".split("")
const BOKHARI = "BOKHARI".split("")
const TOTAL   = QAYYUM.length + BOKHARI.length // 13

// Spring configs
const SCATTER_SPRING = { type: "spring" as const, stiffness: 60, damping: 10, mass: 1.4 }
const RETURN_SPRING  = { type: "spring" as const, stiffness: 220, damping: 32 }
const OPACITY_TWEEN  = { duration: 0.22, ease: "easeOut" } as const

// ─── Types ────────────────────────────────────────────────────────────────────
type LetterState = { x: number; y: number; rotate: number; opacity: number }
const REST: LetterState = { x: 0, y: 0, rotate: 0, opacity: 1 }

// ─── Scatter computation ──────────────────────────────────────────────────────
// For each letter, calculates a displacement vector pointing AWAY from cursor.
// Letters closer to the cursor scatter further (inverse-distance weighting).
function computeScatter(
  refs: React.MutableRefObject<(HTMLSpanElement | null)[]>,
  cursorX: number,
  cursorY: number,
): LetterState[] {
  return refs.current.map((el) => {
    if (!el) return { ...REST, opacity: 0 }

    const r  = el.getBoundingClientRect()
    const cx = r.left + r.width  / 2
    const cy = r.top  + r.height / 2

    const dx   = cx - cursorX
    const dy   = cy - cursorY
    const dist = Math.sqrt(dx * dx + dy * dy)

    // Closer → bigger displacement (capped at 300px)
    const mag = Math.min(300, 11000 / (dist + 35))

    // Unit direction away from cursor; fallback to random if cursor is on top
    const nx = dist > 0.5 ? dx / dist : Math.random() - 0.5
    const ny = dist > 0.5 ? dy / dist : Math.random() - 0.5

    return {
      x:      nx * mag,
      y:      ny * mag,
      rotate: (Math.random() - 0.5) * 68,
      opacity: 0,
    }
  })
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Hero() {
  const letterRefs = useRef<(HTMLSpanElement | null)[]>(new Array(TOTAL).fill(null))
  const [isMobile, setIsMobile] = useState(false)
  const [hovered,  setHovered]  = useState(false)
  const [states,   setStates]   = useState<LetterState[]>(() => new Array(TOTAL).fill(REST))

  // Detect mobile on mount + resize
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  // Scatter on cursor entry — capture entry position, calculate vectors once
  const onEnter = useCallback((e: React.MouseEvent) => {
    if (isMobile) return
    setHovered(true)
    setStates(computeScatter(letterRefs, e.clientX, e.clientY))
  }, [isMobile])

  // Spring letters back on cursor leave
  const onLeave = useCallback(() => {
    if (isMobile) return
    setHovered(false)
    setStates(new Array(TOTAL).fill(REST))
  }, [isMobile])

  // Transition applied to each letter (per-property so spring ≠ opacity speed)
  const transition = hovered
    ? { x: SCATTER_SPRING, y: SCATTER_SPRING, rotate: SCATTER_SPRING, opacity: OPACITY_TWEEN }
    : { x: RETURN_SPRING,  y: RETURN_SPRING,  rotate: RETURN_SPRING,  opacity: OPACITY_TWEEN }

  return (
    <section
      className={`${jakarta.className} relative min-h-screen overflow-hidden flex flex-col`}
      style={{ background: "#0a0a0a" }}
    >
      {/* ── Dot-grid texture ─────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── Ambient blue glow (top-right) ────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute rounded-full"
        style={{
          width: "55vw",
          height: "55vw",
          top: "5%",
          right: "-10%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 68%)",
          filter: "blur(40px)",
        }}
      />

      {/* ═══════════════════════════════════════════════════════════════════
          MAIN CONTENT
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="relative flex-1 flex flex-col justify-center px-6 md:px-14 lg:px-20 pt-28 pb-10">

        {/* ── Name block ───────────────────────────────────────────────── */}
        {/*
            Structure:
              [outer motion.div]  — entrance animation (fade + slide-up)
                [relative div]    — positioning context for subtitle overlay
                  [cursor div]    — mouse event target
                    h1 QAYYUM     — each letter is a motion.span
                    h1 BOKHARI    — each letter is a motion.span (blue stroke)
                  [subtitle overlay] — absolute, pointer-events-none, fades on hover
        */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE }}
        >
          <div className="relative">

            {/* Mouse event zone */}
            <div
              className="cursor-default"
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
            >
              {/* QAYYUM — solid white fill */}
              <h1
                className="font-extrabold uppercase tracking-tighter text-white leading-none select-none"
                style={{ fontSize: "clamp(3.8rem, 17.8vw, 248px)", lineHeight: 0.87 }}
              >
                {QAYYUM.map((char, i) => (
                  <motion.span
                    key={i}
                    ref={(el) => { letterRefs.current[i] = el }}
                    style={{ display: "inline-block" }}
                    animate={states[i]}
                    transition={transition}
                  >
                    {char}
                  </motion.span>
                ))}
              </h1>

              {/* BOKHARI — transparent fill + blue stroke
                  `color` and `-webkit-text-stroke` are inherited by child spans */}
              <h1
                className="font-extrabold uppercase tracking-tighter leading-none select-none"
                style={{
                  fontSize: "clamp(3.8rem, 17.8vw, 248px)",
                  lineHeight: 0.87,
                  color: "transparent",
                  WebkitTextStroke: "clamp(1px, 0.15vw, 2.5px) #3B82F6",
                }}
              >
                {BOKHARI.map((char, i) => (
                  <motion.span
                    key={i}
                    ref={(el) => { letterRefs.current[QAYYUM.length + i] = el }}
                    style={{ display: "inline-block" }}
                    animate={states[QAYYUM.length + i]}
                    transition={transition}
                  >
                    {char}
                  </motion.span>
                ))}
              </h1>
            </div>

            {/* Subtitle overlay — appears in the name's place on hover.
                pointer-events-none so it never blocks the mouse events below. */}
            <motion.div
              aria-hidden={!hovered}
              className="absolute inset-0 flex items-center pointer-events-none"
              animate={{
                opacity: hovered ? 1 : 0,
                scale:   hovered ? 1 : 0.94,
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <p
                className="font-extrabold uppercase"
                style={{
                  fontSize:      "clamp(1.1rem, 4.8vw, 68px)",
                  color:         BLUE_LIGHT,
                  lineHeight:    1.05,
                  letterSpacing: "0.06em",
                }}
              >
                Full-Stack Developer
                <br />
                &amp;&nbsp;AI Engineer
              </p>
            </motion.div>

          </div>
        </motion.div>

        {/* ── Mobile-only static subtitle ──────────────────────────────── */}
        <motion.p
          className="md:hidden mt-5 text-sm font-semibold tracking-[0.22em] uppercase"
          style={{ color: BLUE_LIGHT }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Full-Stack Developer &amp; AI Engineer
        </motion.p>

        {/* ── Bottom row: tagline + CTA buttons ───────────────────────── */}
        <div className="mt-8 md:mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">

          {/* Left: role label + one-liner */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.52, duration: 0.75, ease: EASE }}
          >
            <p
              className="hidden md:block text-xs font-bold tracking-[0.28em] uppercase mb-2"
              style={{ color: BLUE_LIGHT }}
            >
              Full-Stack Developer &amp; AI Engineer
            </p>
            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: "rgba(255,255,255,0.38)" }}
            >
              Building production software with React, Django, and LLM integrations.
            </p>
          </motion.div>

          {/* Right: buttons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.68, duration: 0.75, ease: EASE }}
            className="flex items-center gap-3"
          >
            <a
              href="/Qayyum_Bokhari_CV.docx"
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full
                         border border-white/[0.14] text-white/75
                         transition-all duration-300
                         hover:border-blue-500/60 hover:text-blue-400"
            >
              <Download className="w-4 h-4" />
              Resume
            </a>

            <a
              href="#contact"
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-full text-white
                         transition-all duration-200 hover:brightness-110 active:scale-95"
              style={{ background: BLUE }}
            >
              <Mail className="w-4 h-4" />
              Get in Touch
            </a>
          </motion.div>

        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.05, duration: 0.6 }}
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
          <ChevronDown className="w-4 h-4" style={{ color: BLUE_LIGHT }} />
        </motion.div>
      </motion.div>
    </section>
  )
}
