"use client"

import { useState } from "react"
import { useSkills } from "@/hooks/useSkills"

const FILTER_TABS = ["All", "Backend", "Frontend", "AI / ML", "DevOps & Cloud", "Testing & Practices"]
const MONO: React.CSSProperties = { fontFamily: "var(--font-mono)" }

export default function Skills() {
  const { skills } = useSkills()
  const [selectedCategory, setSelectedCategory] = useState("All")

  const visibleCategories = selectedCategory === "All" ? FILTER_TABS.slice(1) : [selectedCategory]

  return (
    <section id="skills" className="py-24" style={{ background: "#0a0a0a" }}>
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <div className="mb-14">
          <p className="text-[10px] font-medium tracking-[0.28em] uppercase mb-3" style={{ ...MONO, color: "#60A5FA" }}>
            ( 03 ) &nbsp;Expertise
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">Skills &amp; Expertise</h2>
          <div className="mt-5 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedCategory(tab)}
              className="px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200"
              style={selectedCategory === tab
                ? { background: "#3B82F6", color: "#fff" }
                : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.1)" }
              }
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {visibleCategories.map((category) => {
            const categorySkills = skills.filter((s) => s.category === category)
            if (categorySkills.length === 0) return null
            return (
              <div key={category} className="flex flex-col sm:flex-row sm:items-start gap-4 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="sm:w-44 flex-shrink-0">
                  <p className="text-[10px] font-semibold tracking-[0.2em] uppercase" style={{ ...MONO, color: "#60A5FA" }}>{category}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill) => (
                    <span
                      key={skill.id}
                      className="px-3 py-1 text-xs rounded-full"
                      style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", color: "rgba(255,255,255,0.7)" }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
