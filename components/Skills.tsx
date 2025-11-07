"use client"

import { useState } from "react"
import { Star, TrendingUp, RefreshCw } from "lucide-react"
import { useSkills } from "@/hooks/useSkills"

export default function Skills() {
  const { skills, loading, error, refreshSkills } = useSkills()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = async () => {
    setRefreshing(true)
    await refreshSkills()
    setRefreshing(false)
  }

  const categories = ["All", ...Array.from(new Set(skills.map((skill) => skill.category)))]
  const filteredSkills =
    selectedCategory === "All" ? skills : skills.filter((skill) => skill.category === selectedCategory)

  const groupedSkills = filteredSkills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, typeof skills>,
  )

  const getSkillLevelText = (level: number) => {
    if (level <= 4) return "Learning"
    if (level <= 6) return "Intermediate"
    if (level <= 8) return "Proficient"
    return "Expert"
  }

  const getSkillColor = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      purple: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      red: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      orange: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      yellow: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      cyan: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  if (error) {
    return (
      <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400 mb-4">Failed to load skills</p>
            <button onClick={handleRefresh} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              Try Again
            </button>
          </div>
        </div>
      </section>
    )
  }

  if (loading) {
    return (
      <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading skills...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-4xl font-bold">Skills & Expertise</h2>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              title="Refresh skills data"
            >
              <RefreshCw className={`w-5 h-5 ${refreshing ? "animate-spin" : ""}`} />
            </button>
          </div>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A comprehensive toolkit for building intelligent applications and solving complex problems
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="space-y-8">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white flex items-center">
                <TrendingUp className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
                {category}
              </h3>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {categorySkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="group relative p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-md"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm">{skill.name}</h4>
                      {skill.is_featured && <Star className="w-3 h-3 text-yellow-500 fill-current flex-shrink-0" />}
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600 dark:text-gray-400">
                        {skill.years_experience}yr{skill.years_experience !== 1 ? "s" : ""}
                      </span>
                      <span className={`px-2 py-0.5 rounded font-medium ${
                        skill.level <= 4
                          ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                          : skill.level <= 6
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                          : skill.level <= 8
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                      }`}>
                        {getSkillLevelText(skill.level)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
