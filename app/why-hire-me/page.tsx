"use client"

import { useEffect, useRef, useCallback, type ReactNode } from "react"
import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
  type Variants,
} from "framer-motion"
import { ExternalLink, Github, Mail, ArrowLeft, Code, Database, Globe, Zap, Cpu, Wrench } from "lucide-react"
import Link from "next/link"

// ─── Animation Variants ────────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const heroContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
}

const heroChild: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const cardGrid: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
}

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.52, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const textStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
}

const textItem: Variants = {
  hidden: { opacity: 0, x: -18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const skills = [
  {
    icon: <Database className="w-7 h-7" />,
    title: "PHP, Laravel & MySQL",
    description:
      "Built production inventory systems with Laravel backends, MySQL databases, Redis caching, and JWT authentication. Real projects, real uptime — not just tutorials.",
  },
  {
    icon: <Globe className="w-7 h-7" />,
    title: "JavaScript & Frontend",
    description:
      "Comfortable with vanilla JS, React, Bootstrap and responsive design. I care about UX, not just making things work — if it looks rough on mobile, it bothers me.",
  },
  {
    icon: <Code className="w-7 h-7" />,
    title: "API Design & Integration",
    description:
      "Designed and consumed RESTful APIs with JWT auth and Redis caching. Also built an AI chatbot with RAG architecture and OpenAI API integration.",
  },
  {
    icon: <Wrench className="w-7 h-7" />,
    title: "Docker & CI/CD",
    description:
      "Set up Docker environments and CI/CD pipelines for deployment. I've gone from zero to production on multiple projects, handling infrastructure myself.",
  },
  {
    icon: <Zap className="w-7 h-7" />,
    title: "Fast Learner, Ships Fast",
    description:
      "Self-taught since COVID. I pick things up quickly, ask the right questions, and I'd rather ship something solid than wait for perfect. I'll hit the ground running.",
  },
]

const projects = [
  {
    title: "DF Baston Inventory System",
    oneLiner: "Full inventory management platform cutting stock discrepancies by 45% and saving 12 hours/week.",
    tech: ["Laravel", "MySQL", "Redis", "Docker", "JWT", "CI/CD", "REST API"],
    github: "https://github.com/moqayyubok",
    demo: "https://www.dfbastoninventory.co.uk/",
    icon: <Database className="w-7 h-7" />,
  },
  {
    title: "AI CV Chatbot",
    oneLiner: "RAG-powered chatbot answering questions about my CV with 92% accuracy using FAISS vector search.",
    tech: ["Python", "Django", "OpenAI API", "Hugging Face", "FAISS", "Docker", "AWS EC2"],
    github: "https://github.com/moqayyubok",
    demo: "https://royaltap.shop/",
    icon: <Cpu className="w-7 h-7" />,
  },
  {
    title: "Retro App",
    oneLiner: "Team collaboration platform with Redis caching that cut response times from 2.1s down to 0.8s.",
    tech: ["Django", "PostgreSQL", "Redis", "JWT", "REST API", "Docker"],
    github: "https://github.com/moqayyubok",
    demo: "#",
    icon: <Code className="w-7 h-7" />,
  },
]

// ─── Sub-components ────────────────────────────────────────────────────────────

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 z-50"
      style={{ scaleX, transformOrigin: "0%" }}
    />
  )
}

function BackgroundOrbs({ reduced }: { reduced: boolean }) {
  const base = { repeat: Infinity, ease: "easeInOut" as const }
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div
        className="absolute -top-48 -left-48 w-[600px] h-[600px] rounded-full bg-blue-400/10 dark:bg-blue-500/10 blur-3xl"
        animate={reduced ? {} : { x: [0, 45, 0], y: [0, -28, 0] }}
        transition={{ ...base, duration: 11 }}
      />
      <motion.div
        className="absolute -bottom-48 -right-48 w-[700px] h-[700px] rounded-full bg-purple-400/10 dark:bg-purple-500/10 blur-3xl"
        animate={reduced ? {} : { x: [0, -55, 0], y: [0, 38, 0] }}
        transition={{ ...base, duration: 14 }}
      />
      <motion.div
        className="absolute top-1/3 left-2/3 w-[380px] h-[380px] rounded-full bg-indigo-400/8 dark:bg-indigo-500/8 blur-3xl"
        animate={reduced ? {} : { x: [0, -30, 0], y: [0, -44, 0] }}
        transition={{ ...base, duration: 9 }}
      />
    </div>
  )
}

function AnimatedUnderline() {
  return (
    <motion.div
      className="h-1 bg-blue-600 mx-auto mb-4 rounded-full"
      initial={{ width: 0 }}
      whileInView={{ width: 80 }}
      viewport={{ once: true }}
      transition={{ duration: 0.85, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
    />
  )
}

function SectionHeading({ children, subtitle }: { children: ReactNode; subtitle?: string }) {
  return (
    <motion.div
      className="text-center mb-16"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      <h2 className="text-4xl font-bold mb-4">{children}</h2>
      <AnimatedUnderline />
      {subtitle && (
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
      )}
    </motion.div>
  )
}

function Shimmer() {
  return (
    <motion.span
      aria-hidden="true"
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/22 to-transparent -skew-x-12"
      animate={{ x: ["-160%", "220%"] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: "linear", repeatDelay: 1.8 }}
    />
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function WhyHireMe() {
  const reduced = !!useReducedMotion()
  const lastConfetti = useRef(0)

  // Lenis smooth scrolling
  useEffect(() => {
    let animFrameId: number
    let lenis: { raf: (t: number) => void; destroy: () => void } | undefined
    let mounted = true

    const init = async () => {
      const { default: Lenis } = await import("lenis")
      if (!mounted) return
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
      const raf = (time: number) => {
        lenis!.raf(time)
        animFrameId = requestAnimationFrame(raf)
      }
      animFrameId = requestAnimationFrame(raf)
    }

    init()
    return () => {
      mounted = false
      cancelAnimationFrame(animFrameId)
      lenis?.destroy()
    }
  }, [])

  const handleConfetti = useCallback(async () => {
    if (reduced) return
    const now = Date.now()
    if (now - lastConfetti.current < 2200) return
    lastConfetti.current = now
    const confetti = (await import("canvas-confetti")).default
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.65 },
      colors: ["#3b82f6", "#6366f1", "#8b5cf6", "#c7d2fe", "#ffffff"],
      ticks: 150,
      gravity: 1.2,
      scalar: 0.9,
      disableForReducedMotion: true,
    })
  }, [reduced])

  return (
    <motion.div
      className="min-h-screen bg-white dark:bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.55 }}
    >
      <ScrollProgress />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 pt-16 overflow-hidden">
        <BackgroundOrbs reduced={reduced} />

        <motion.div
          className="max-w-4xl mx-auto px-4 text-center relative z-10"
          variants={heroContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={heroChild} className="mb-6">
            <motion.span
              className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full"
              animate={reduced ? {} : { y: [0, -5, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            >
              This one&apos;s just for you, EC
            </motion.span>
          </motion.div>

          {/* Headline — line 1 */}
          <motion.h1
            variants={heroChild}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Why{" "}
            <motion.span
              className="text-blue-600 dark:text-blue-400"
              animate={
                reduced
                  ? {}
                  : {
                      filter: [
                        "drop-shadow(0 0 0px rgba(59,130,246,0))",
                        "drop-shadow(0 0 18px rgba(59,130,246,0.55))",
                        "drop-shadow(0 0 0px rgba(59,130,246,0))",
                      ],
                    }
              }
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
            >
              Entrepreneurs Circle
            </motion.span>
            <br />
            Should Hire Me
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={heroChild}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            I&apos;m not mass-applying. I genuinely want to be there — because a company with a butler,
            a chef, a four-day week, and best places to work two years running? That&apos;s earned.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={heroChild}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href="mailto:qayyumbokhari77@gmail.com"
              className="relative overflow-hidden bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onHoverStart={handleConfetti}
            >
              {!reduced && <Shimmer />}
              <Mail className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Let&apos;s Talk</span>
            </motion.a>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/"
                className="px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Portfolio
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── What I Bring ──────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading subtitle="PHP, MySQL, JavaScript, Bootstrap — I've shipped production code with all of it. Here's the breakdown.">
            What I Bring
          </SectionHeading>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={cardGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {skills.map((skill, i) => (
              <motion.div
                key={i}
                variants={cardVariant}
                whileHover={
                  reduced
                    ? {}
                    : {
                        y: -8,
                        scale: 1.02,
                        boxShadow: "0 20px 40px rgba(59,130,246,0.14)",
                      }
                }
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 h-full border border-gray-100 dark:border-gray-700 cursor-default"
                style={{ willChange: "transform" }}
              >
                <div className="text-blue-600 dark:text-blue-400 mb-4">{skill.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{skill.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                  {skill.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Projects That Prove It ─────────────────────────────────────── */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading subtitle="Not side-project toys. Actual production work with real users, real data, real requirements.">
            Projects That Prove It
          </SectionHeading>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={cardGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {projects.map((project, i) => (
              <motion.div
                key={i}
                variants={cardVariant}
                whileHover={
                  reduced
                    ? {}
                    : {
                        y: -8,
                        scale: 1.02,
                        boxShadow: "0 20px 40px rgba(59,130,246,0.12)",
                      }
                }
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden h-full flex flex-col"
                style={{ willChange: "transform" }}
              >
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center mb-4">
                    <div className="text-blue-600 dark:text-blue-400 mr-3">{project.icon}</div>
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed flex-1">
                    {project.oneLiner}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, j) => (
                      <span
                        key={j}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                    {project.demo !== "#" && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── How I Work ────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeading>How I Work</SectionHeading>

          <motion.div
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 md:p-12"
            variants={textStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.p
              variants={textItem}
              className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-6"
            >
              I taught myself to code during COVID. Not a bootcamp, not a structured course — just
              relentless building, breaking things, and figuring out why. That&apos;s still how I work. I
              don&apos;t wait to be told what to do; I look at the problem, figure out the best approach,
              and get on with it.
            </motion.p>
            <motion.p
              variants={textItem}
              className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-6"
            >
              I care about UX, not just functionality. If something technically works but feels clunky,
              I&apos;ll say so. I&apos;m the type to suggest a better way if I spot one — not to be
              difficult, but because I actually care about the product being good.
            </motion.p>
            <motion.p
              variants={textItem}
              className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg"
            >
              I pick up new tech fast. PHP and Bootstrap are your stack — I&apos;ve used both in
              production. SCSS, MySQL, vanilla JS — same. I&apos;m not arriving needing six months to ramp
              up. I&apos;m arriving ready to contribute from day one, ask smart questions, and make myself
              useful immediately. The four-day week just means I&apos;ll work even harder on the days
              I&apos;m there.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Let&apos;s Make It Official</h2>
            <AnimatedUnderline />
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-10 max-w-xl mx-auto">
              Drop me an email and let&apos;s have a conversation. I&apos;m not hard to talk to, I promise.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* Primary CTA — pulse ring + shimmer + confetti */}
              <div className="relative">
                {!reduced && (
                  <motion.div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-lg bg-blue-500/30"
                    animate={{ scale: [1, 1.14, 1], opacity: [0.55, 0, 0.55] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
                <motion.a
                  href="mailto:qayyumbokhari77@gmail.com"
                  className="relative overflow-hidden bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onHoverStart={handleConfetti}
                >
                  {!reduced && <Shimmer />}
                  <Mail className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">qayyumbokhari77@gmail.com</span>
                </motion.a>
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/"
                  className="px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors font-semibold flex items-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Portfolio
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
