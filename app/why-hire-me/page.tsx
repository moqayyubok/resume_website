"use client"

import { useEffect, useRef, useState } from "react"
import { ExternalLink, Github, Mail, ArrowLeft, Code, Database, Globe, Zap, Cpu, Wrench } from "lucide-react"
import Link from "next/link"

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}

function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  )
}

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

export default function WhyHireMe() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 pt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-6">
            <span className="inline-block px-4 py-1.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full mb-6">
              This one&apos;s just for you, EC
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Why{" "}
            <span className="text-blue-600 dark:text-blue-400">Entrepreneurs Circle</span>
            <br />
            Should Hire Me
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            I&apos;m not mass-applying. I genuinely want to be there — because a company with a butler, a chef, a
            four-day week, and best places to work two years running? That&apos;s earned.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:qayyumbokhari77@gmail.com"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Let&apos;s Talk
            </a>
            <Link
              href="/"
              className="px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* What I Bring */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <RevealSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">What I Bring</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                PHP, MySQL, JavaScript, Bootstrap — I&apos;ve shipped production code with all of it. Here&apos;s the
                breakdown.
              </p>
            </div>
          </RevealSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <RevealSection key={index}>
                <div
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 h-full border border-gray-100 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500"
                  style={{ transitionDelay: `${index * 60}ms` }}
                >
                  <div className="text-blue-600 dark:text-blue-400 mb-4">{skill.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{skill.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">{skill.description}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Projects That Prove It */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <RevealSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Projects That Prove It</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Not side-project toys. Actual production work with real users, real data, real requirements.
              </p>
            </div>
          </RevealSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <RevealSection key={index}>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center mb-4">
                      <div className="text-blue-600 dark:text-blue-400 mr-3">{project.icon}</div>
                      <h3 className="text-xl font-semibold">{project.title}</h3>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed flex-1">
                      {project.oneLiner}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
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
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* How I Work */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4">
          <RevealSection>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">How I Work</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 md:p-12">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-6">
                I taught myself to code during COVID. Not a bootcamp, not a structured course — just relentless
                building, breaking things, and figuring out why. That&apos;s still how I work. I don&apos;t wait to be
                told what to do; I look at the problem, figure out the best approach, and get on with it.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-6">
                I care about UX, not just functionality. If something technically works but feels clunky, I&apos;ll say
                so. I&apos;m the type to suggest a better way if I spot one — not to be difficult, but because I
                actually care about the product being good.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                I pick up new tech fast. PHP and Bootstrap are your stack — I&apos;ve used both in production. SCSS,
                MySQL, vanilla JS — same. I&apos;m not arriving needing six months to ramp up. I&apos;m arriving ready
                to contribute from day one, ask smart questions, and make myself useful immediately. The four-day week
                just means I&apos;ll work even harder on the days I&apos;m there.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <RevealSection>
            <h2 className="text-4xl font-bold mb-4">Let&apos;s Make It Official</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-10 max-w-xl mx-auto">
              Drop me an email and let&apos;s have a conversation. I&apos;m not hard to talk to, I promise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:qayyumbokhari77@gmail.com"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                qayyumbokhari77@gmail.com
              </a>
              <Link
                href="/"
                className="px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors font-semibold flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Portfolio
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>
    </div>
  )
}
