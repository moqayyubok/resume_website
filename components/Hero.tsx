"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Download, Mail } from "lucide-react"
import { Plus_Jakarta_Sans, DM_Mono } from "next/font/google"

// ─── Two-font system ──────────────────────────────────────────────────────────
// Display: geometric, heavy, editorial — fills the viewport
// Mono: precise, technical — labels and metadata only
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
})
const mono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
})

// ─── Design tokens ────────────────────────────────────────────────────────────
const BLUE  = "#3B82F6"
const LIGHT = "#60A5FA"
const DIM   = "rgba(248,250,252,0.28)"
const EASE  = [0.16, 1, 0.3, 1] as const

// ─── Letter data ──────────────────────────────────────────────────────────────
const QAYYUM  = "QAYYUM".split("")
const BOKHARI = "BOKHARI".split("")
const TOTAL   = QAYYUM.length + BOKHARI.length // 13

// ─── Spring configs — each letter gets slightly varied stiffness/damping
//     so the scatter feels physically chaotic, not perfectly synchronized ─────
function letterSpring(i: number, scattering: boolean) {
  // Introduce subtle variation based on letter index
  const stiffVar = (i % 4) * 4   // 0, 4, 8, 12
  const dampVar  = (i % 3) * 1.5 // 0, 1.5, 3
  return scattering
    ? { type: "spring" as const, stiffness: 52 + stiffVar, damping: 9 + dampVar, mass: 1.2 + (i % 3) * 0.15 }
    : { type: "spring" as const, stiffness: 230 - stiffVar, damping: 30 + dampVar }
}
const OPACITY_FAST = { duration: 0.2, ease: "easeOut" } as const

// ─── Types ────────────────────────────────────────────────────────────────────
type LetterState = { x: number; y: number; rotate: number; opacity: number }
const REST: LetterState = { x: 0, y: 0, rotate: 0, opacity: 1 }

// ─── Scatter computation ──────────────────────────────────────────────────────
function computeScatter(
  refs: React.MutableRefObject<(HTMLSpanElement | null)[]>,
  cx: number,
  cy: number,
): LetterState[] {
  return refs.current.map((el, i) => {
    if (!el) return { ...REST, opacity: 0 }
    const r   = el.getBoundingClientRect()
    const lx  = r.left + r.width  / 2
    const ly  = r.top  + r.height / 2
    const dx  = lx - cx
    const dy  = ly - cy
    const d   = Math.sqrt(dx * dx + dy * dy)
    const mag = Math.min(320, 11500 / (d + 32))
    const nx  = d > 0.5 ? dx / d : Math.random() - 0.5
    const ny  = d > 0.5 ? dy / d : Math.random() - 0.5
    // Alternate scatter angle slightly so letters fan out more naturally
    const angle = Math.atan2(ny, nx) + ((i % 2 === 0 ? 1 : -1) * 0.18)
    return {
      x:       Math.cos(angle) * mag,
      y:       Math.sin(angle) * mag,
      rotate:  (Math.random() - 0.5) * 75,
      opacity: 0,
    }
  })
}

// ─── Noise SVG data URI for grain texture ────────────────────────────────────
const NOISE_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

// ─── Component ────────────────────────────────────────────────────────────────
export default function Hero() {
  const letterRefs = useRef<(HTMLSpanElement | null)[]>(new Array(TOTAL).fill(null))
  const [isMobile, setIsMobile] = useState(false)
  const [hovered,  setHovered]  = useState(false)
  const [states,   setStates]   = useState<LetterState[]>(() => new Array(TOTAL).fill(REST))

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const onEnter = useCallback((e: React.MouseEvent) => {
    if (isMobile) return
    setHovered(true)
    setStates(computeScatter(letterRefs, e.clientX, e.clientY))
  }, [isMobile])

  const onLeave = useCallback(() => {
    if (isMobile) return
    setHovered(false)
    setStates(new Array(TOTAL).fill(REST))
  }, [isMobile])

  return (
    <section
      className={`${jakarta.className} relative min-h-screen overflow-hidden flex flex-col`}
      style={{ background: "#0a0a0a" }}
    >

      {/* ── Grain / noise texture ─────────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.038] mix-blend-overlay"
        style={{ backgroundImage: NOISE_URL, backgroundSize: "180px 180px" }}
      />

      {/* ── Ambient glow — primary (top-right, blue) ─────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          width: "70vw", height: "70vw",
          top: "-15%", right: "-20%",
          background: "radial-gradient(circle, rgba(59,130,246,0.09) 0%, transparent 65%)",
          filter: "blur(1px)",
        }}
      />
      {/* ── Ambient glow — secondary (bottom-left, dimmer) ───────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          width: "50vw", height: "50vw",
          bottom: "-10%", left: "-15%",
          background: "radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 65%)",
          filter: "blur(1px)",
        }}
      />

      {/* ── Left architectural margin rule ───────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          left: "clamp(20px, 3vw, 44px)",
          top: "18%",
          width: "1px",
          height: "64%",
          background:
            "linear-gradient(to bottom, transparent, rgba(59,130,246,0.25) 20%, rgba(59,130,246,0.25) 80%, transparent)",
        }}
      />

      {/* ═══════════════════════════════════════════════════════════════════
          TOP METADATA BAR — editorial header
      ═══════════════════════════════════════════════════════════════════ */}
      <motion.div
        className={`${mono.className} relative flex items-center justify-between px-6 md:px-14 lg:px-20 pt-24 pb-0`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.7 }}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: DIM }}>
          Portfolio&nbsp;—&nbsp;2026&nbsp;·&nbsp;Birmingham,&nbsp;UK
        </span>
        <span
          className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase"
          style={{ color: DIM }}
        >
          {/* Pulsing availability dot */}
          <span className="relative flex h-1.5 w-1.5">
            <span
              className="absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{
                background: LIGHT,
                animation: "ping 2s cubic-bezier(0,0,0.2,1) infinite",
              }}
            />
            <span
              className="relative inline-flex h-1.5 w-1.5 rounded-full"
              style={{ background: LIGHT }}
            />
          </span>
          Open&nbsp;to&nbsp;Work
        </span>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════════════
          MAIN CONTENT
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="relative flex-1 flex flex-col justify-center px-6 md:px-14 lg:px-20 pt-8 pb-10">

        {/* ── Editorial section index ─────────────────────────────────── */}
        <motion.span
          className={`${mono.className} block text-[10px] tracking-[0.28em] uppercase mb-3`}
          style={{ color: LIGHT }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          ( 01 ) &nbsp;Identity
        </motion.span>

        {/* ── Name block — the whole design ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: EASE }}
          className="relative"
        >
          {/* Interactive scatter zone */}
          <div
            className="cursor-crosshair"
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
          >
            {/* ── QAYYUM — solid white ─────────────────────────────── */}
            <h1
              className="font-extrabold uppercase text-white leading-none select-none"
              style={{
                fontSize: "clamp(3.8rem, 17.8vw, 252px)",
                lineHeight: 0.86,
                letterSpacing: "-0.02em",
              }}
            >
              {QAYYUM.map((char, i) => (
                <motion.span
                  key={i}
                  ref={(el) => { letterRefs.current[i] = el }}
                  style={{ display: "inline-block" }}
                  animate={states[i]}
                  transition={{
                    x:       letterSpring(i, hovered),
                    y:       letterSpring(i, hovered),
                    rotate:  letterSpring(i, hovered),
                    opacity: OPACITY_FAST,
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </h1>

            {/* ── BOKHARI — blue stroke outline ────────────────────── */}
            {/*    color + -webkit-text-stroke are inherited by child spans */}
            <h1
              className="font-extrabold uppercase leading-none select-none"
              style={{
                fontSize: "clamp(3.8rem, 17.8vw, 252px)",
                lineHeight: 0.86,
                letterSpacing: "-0.02em",
                color: "transparent",
                WebkitTextStroke: "clamp(1px, 0.14vw, 2.5px) #3B82F6",
              }}
            >
              {BOKHARI.map((char, i) => (
                <motion.span
                  key={i}
                  ref={(el) => { letterRefs.current[QAYYUM.length + i] = el }}
                  style={{ display: "inline-block" }}
                  animate={states[QAYYUM.length + i]}
                  transition={{
                    x:       letterSpring(QAYYUM.length + i, hovered),
                    y:       letterSpring(QAYYUM.length + i, hovered),
                    rotate:  letterSpring(QAYYUM.length + i, hovered),
                    opacity: OPACITY_FAST,
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </h1>
          </div>

          {/* ── Subtitle overlay — materialises when letters scatter ── */}
          <motion.div
            aria-hidden={!hovered}
            className="absolute inset-0 flex flex-col justify-center pointer-events-none"
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 12 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
          >
            <p
              className="font-extrabold uppercase"
              style={{
                fontSize:      "clamp(1.2rem, 5.2vw, 74px)",
                color:         LIGHT,
                lineHeight:    1.0,
                letterSpacing: "0.04em",
              }}
            >
              Full-Stack
              <br />
              Developer
              <br />
              <span style={{ color: "rgba(96,165,250,0.55)" }}>&amp;&nbsp;AI&nbsp;Engineer</span>
            </p>
          </motion.div>
        </motion.div>

        {/* ── Hairline separator ──────────────────────────────────────── */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.55, duration: 0.9, ease: EASE }}
          className="mt-8 md:mt-10 h-px origin-left"
          style={{ background: "rgba(255,255,255,0.07)" }}
        />

        {/* ── Mobile subtitle ─────────────────────────────────────────── */}
        <motion.p
          className={`${mono.className} md:hidden mt-5 text-xs tracking-[0.22em] uppercase`}
          style={{ color: LIGHT }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Full-Stack Developer &amp; AI Engineer
        </motion.p>

        {/* ── Bottom row: tagline left / CTAs right ───────────────────── */}
        <div className="mt-7 flex flex-col md:flex-row md:items-end md:justify-between gap-6">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.75, ease: EASE }}
          >
            <p
              className={`${mono.className} hidden md:block text-[10px] tracking-[0.3em] uppercase mb-2`}
              style={{ color: LIGHT }}
            >
              Full-Stack Developer &amp; AI Engineer
            </p>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: DIM }}>
              Building production software — React, Django, and LLM integrations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.75, ease: EASE }}
            className="flex items-center gap-3"
          >
            <a
              href="/Qayyum_Bokhari_CV.docx"
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-full
                         border border-white/[0.12] text-white/70
                         transition-all duration-300
                         hover:border-blue-500/50 hover:text-blue-400"
              style={{ letterSpacing: "0.08em" }}
            >
              <Download className="w-3.5 h-3.5" />
              RESUME
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-full text-white
                         transition-all duration-200 hover:brightness-110 active:scale-95"
              style={{ background: BLUE, letterSpacing: "0.08em" }}
            >
              <Mail className="w-3.5 h-3.5" />
              GET IN TOUCH
            </a>
          </motion.div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          SCROLL INDICATOR — vertical growing line, not a chevron
      ═══════════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className={`${mono.className} flex flex-col items-center pb-9 gap-3`}
      >
        <span
          className="text-[9px] tracking-[0.35em] uppercase"
          style={{ color: "rgba(255,255,255,0.18)" }}
        >
          Scroll
        </span>
        {/* Animated vertical line — grows then shrinks repeatedly */}
        <div className="relative w-px overflow-hidden" style={{ height: 40 }}>
          <motion.div
            className="absolute inset-x-0 top-0"
            style={{ background: LIGHT }}
            animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* ── Keyframe for the availability ping dot ──────────────────────── */}
      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>

    </section>
  )
}
