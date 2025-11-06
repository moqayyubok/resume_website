"use client"

import { useState, useEffect } from "react"
import { dataFetcher } from "@/lib/data-fetcher"
import { skillCategories } from "@/data/data"
import type { Skill } from "@/lib/database"

// Convert static skill categories to Skill format
const convertStaticSkills = (): Skill[] => {
  const skills: Skill[] = []
  skillCategories.forEach((category, catIndex) => {
    category.skills.forEach((skillName, skillIndex) => {
      skills.push({
        id: `static-${catIndex}-${skillIndex}`,
        category: category.title,
        name: skillName,
        level: 8, // Default level
        years_experience: 3,
        is_featured: catIndex < 2, // First two categories featured
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        color: ['blue', 'green', 'purple', 'orange', 'cyan', 'yellow'][catIndex % 6],
      })
    })
  })
  return skills
}

export function useSkills() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true)
        const skillsData = await dataFetcher.getSkills()

        // If no skills from database, use static data
        if (skillsData.length === 0) {
          setSkills(convertStaticSkills())
        } else {
          setSkills(skillsData)
        }
      } catch (err) {
        // On error, fallback to static data
        setSkills(convertStaticSkills())
        setError(null) // Don't show error, just use fallback
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  const refreshSkills = async () => {
    try {
      setLoading(true)
      const skillsData = await dataFetcher.getSkills(true)

      // If no skills from database, use static data
      if (skillsData.length === 0) {
        setSkills(convertStaticSkills())
      } else {
        setSkills(skillsData)
      }
    } catch (err) {
      // On error, fallback to static data
      setSkills(convertStaticSkills())
      setError(null)
    } finally {
      setLoading(false)
    }
  }

  return { skills, loading, error, refreshSkills }
}
