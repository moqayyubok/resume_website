"use client"

import { useState, useEffect } from "react"
import type { Skill } from "@/lib/database"

// Static skills — grouped into the 4 requested categories.
// These show immediately; no spinner, no API dependency.
const STATIC_SKILLS: Skill[] = [
  // Backend
  { id: "b1",  category: "Backend",  name: "Python",      level: 9, years_experience: 3, is_featured: true,  color: "blue",   created_at: "", updated_at: "" },
  { id: "b2",  category: "Backend",  name: "Django",      level: 9, years_experience: 3, is_featured: true,  color: "blue",   created_at: "", updated_at: "" },
  { id: "b3",  category: "Backend",  name: "Laravel",     level: 8, years_experience: 2, is_featured: true,  color: "blue",   created_at: "", updated_at: "" },
  { id: "b4",  category: "Backend",  name: "PHP",         level: 8, years_experience: 3, is_featured: true,  color: "blue",   created_at: "", updated_at: "" },
  { id: "b5",  category: "Backend",  name: "PostgreSQL",  level: 8, years_experience: 3, is_featured: true,  color: "blue",   created_at: "", updated_at: "" },
  { id: "b6",  category: "Backend",  name: "MySQL",       level: 8, years_experience: 3, is_featured: true,  color: "blue",   created_at: "", updated_at: "" },
  { id: "b7",  category: "Backend",  name: "Node.js",     level: 7, years_experience: 2, is_featured: false, color: "blue",   created_at: "", updated_at: "" },
  { id: "b8",  category: "Backend",  name: "Redis",       level: 7, years_experience: 2, is_featured: false, color: "blue",   created_at: "", updated_at: "" },

  // Frontend
  { id: "f1",  category: "Frontend", name: "JavaScript",  level: 9, years_experience: 3, is_featured: true,  color: "green",  created_at: "", updated_at: "" },
  { id: "f2",  category: "Frontend", name: "React",       level: 8, years_experience: 2, is_featured: true,  color: "green",  created_at: "", updated_at: "" },
  { id: "f3",  category: "Frontend", name: "HTML / CSS",  level: 9, years_experience: 4, is_featured: true,  color: "green",  created_at: "", updated_at: "" },
  { id: "f4",  category: "Frontend", name: "Bootstrap",   level: 8, years_experience: 3, is_featured: false, color: "green",  created_at: "", updated_at: "" },
  { id: "f5",  category: "Frontend", name: "jQuery",      level: 7, years_experience: 2, is_featured: false, color: "green",  created_at: "", updated_at: "" },
  { id: "f6",  category: "Frontend", name: "Tailwind CSS",level: 8, years_experience: 2, is_featured: false, color: "green",  created_at: "", updated_at: "" },

  // AI / ML
  { id: "a1",  category: "AI / ML",  name: "OpenAI API",        level: 7, years_experience: 1, is_featured: true,  color: "purple", created_at: "", updated_at: "" },
  { id: "a2",  category: "AI / ML",  name: "Hugging Face",      level: 6, years_experience: 1, is_featured: false, color: "purple", created_at: "", updated_at: "" },
  { id: "a3",  category: "AI / ML",  name: "FAISS",             level: 6, years_experience: 1, is_featured: false, color: "purple", created_at: "", updated_at: "" },
  { id: "a4",  category: "AI / ML",  name: "scikit-learn",      level: 5, years_experience: 1, is_featured: false, color: "purple", created_at: "", updated_at: "" },
  { id: "a5",  category: "AI / ML",  name: "LangChain",         level: 5, years_experience: 1, is_featured: false, color: "purple", created_at: "", updated_at: "" },

  // DevOps
  { id: "d1",  category: "DevOps",   name: "Docker",            level: 7, years_experience: 1, is_featured: false, color: "orange", created_at: "", updated_at: "" },
  { id: "d2",  category: "DevOps",   name: "Git",               level: 8, years_experience: 3, is_featured: true,  color: "orange", created_at: "", updated_at: "" },
  { id: "d3",  category: "DevOps",   name: "CI/CD",             level: 6, years_experience: 1, is_featured: false, color: "orange", created_at: "", updated_at: "" },
  { id: "d4",  category: "DevOps",   name: "AWS (EC2, S3, RDS)",level: 5, years_experience: 1, is_featured: false, color: "orange", created_at: "", updated_at: "" },
  { id: "d5",  category: "DevOps",   name: "Linux",             level: 7, years_experience: 2, is_featured: false, color: "orange", created_at: "", updated_at: "" },
]

export function useSkills() {
  // Initialize directly with static data — no loading state, no spinner
  const [skills] = useState<Skill[]>(STATIC_SKILLS)

  return {
    skills,
    loading: false,
    error: null,
    refreshSkills: async () => {},
  }
}
