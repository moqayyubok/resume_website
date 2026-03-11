"use client"

import { useState } from "react"
import { useSkills } from "@/hooks/useSkills"

const FILTER_TABS = ["All", "Backend", "Frontend", "AI / ML", "DevOps & Cloud", "Testing & Practices"]

const CATEGORY_COLORS: Record<string, string> = {
  "Backend":             "bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  "Frontend":            "bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  "AI / ML":             "bg-purple-50 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  "DevOps & Cloud":      "bg-orange-50 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  "Testing & Practices": "bg-cyan-50 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
}

export default function Skills() {
  const { skills } = useSkills()
  const [selectedCategory, setSelectedCategory] = useState("All")

  const visibleCategories = selectedCategory === "All"
    ? FILTER_TABS.slice(1)
    : [selectedCategory]

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-5xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Skills &amp; Expertise</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedCategory(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === tab
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Category rows */}
        <div className="space-y-6">
          {visibleCategories.map((category) => {
            const categorySkills = skills.filter((s) => s.category === category)
            if (categorySkills.length === 0) return null
            const pillStyle = CATEGORY_COLORS[category] ?? "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"

            return (
              <div key={category} className="flex flex-col sm:flex-row sm:items-start gap-3">
                {/* Category label */}
                <span className="shrink-0 w-40 pt-1 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {category}
                </span>

                {/* Skill pills */}
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill) => (
                    <span
                      key={skill.id}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${pillStyle}`}
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
