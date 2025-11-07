"use client"

import { useState, useEffect } from "react"
import { dataFetcher } from "@/lib/data-fetcher"
import { skillCategories } from "@/data/data"
import type { Skill } from "@/lib/database"

// Convert static skill categories to Skill format with HONEST skill levels
const convertStaticSkills = (): Skill[] => {
  const skills: Skill[] = []

  // Define actual skill proficiency levels - BE HONEST
  const skillLevels: { [key: string]: { level: number, years: number } } = {
    // Core Languages - Strong
    "Python": { level: 9, years: 3 },
    "JavaScript (ES6+)": { level: 9, years: 3 },
    "PHP": { level: 8, years: 3 },
    "SQL": { level: 8, years: 3 },
    "HTML5": { level: 9, years: 4 },
    "CSS3": { level: 8, years: 4 },

    // Backend - Strong
    "Django": { level: 9, years: 3 },
    "Flask": { level: 8, years: 2 },
    "Laravel": { level: 8, years: 2 },
    "Node.js": { level: 8, years: 2 },

    // Frontend - Strong
    "React": { level: 8, years: 2 },
    "jQuery": { level: 7, years: 2 },
    "Bootstrap": { level: 8, years: 3 },
    "Tailwind CSS": { level: 8, years: 2 },

    // AI/ML - LEARNING (be honest!)
    "TensorFlow": { level: 5, years: 1 },
    "Hugging Face Transformers": { level: 6, years: 1 },
    "OpenAI API": { level: 7, years: 1 },
    "Scikit-learn": { level: 5, years: 1 },

    // Databases - Strong
    "PostgreSQL": { level: 8, years: 3 },
    "MySQL": { level: 8, years: 3 },
    "MongoDB": { level: 7, years: 2 },
    "SQLite": { level: 7, years: 2 },

    // DevOps - LEARNING/INTERMEDIATE (be honest!)
    "Docker": { level: 6, years: 1 },
    "Git": { level: 8, years: 3 },
    "GitHub": { level: 8, years: 3 },
    "CI/CD": { level: 5, years: 1 },
    "Jenkins": { level: 4, years: 1 },
    "Linux": { level: 7, years: 2 },
    "AWS (EC2, S3, RDS)": { level: 5, years: 1 },
    "Vercel": { level: 7, years: 1 },
    "Heroku": { level: 6, years: 1 },
  }

  skillCategories.forEach((category, catIndex) => {
    category.skills.forEach((skillName, skillIndex) => {
      const proficiency = skillLevels[skillName] || { level: 5, years: 1 }
      skills.push({
        id: `static-${catIndex}-${skillIndex}`,
        category: category.title,
        name: skillName,
        level: proficiency.level,
        years_experience: proficiency.years,
        is_featured: proficiency.level >= 8, // Only featured if actually proficient
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
