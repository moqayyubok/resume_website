"use client"

import { useState } from "react"
import type { Skill } from "@/lib/database"

const STATIC_SKILLS: Skill[] = [
  // Backend
  { id: "b1", category: "Backend", name: "Python",     level: 9, years_experience: 3, is_featured: true,  color: "blue",   created_at: "", updated_at: "" },
  { id: "b2", category: "Backend", name: "Django",     level: 9, years_experience: 3, is_featured: true,  color: "blue",   created_at: "", updated_at: "" },
  { id: "b3", category: "Backend", name: "Laravel",    level: 8, years_experience: 2, is_featured: true,  color: "blue",   created_at: "", updated_at: "" },
  { id: "b4", category: "Backend", name: "PHP",        level: 8, years_experience: 3, is_featured: true,  color: "blue",   created_at: "", updated_at: "" },
  { id: "b5", category: "Backend", name: "Node.js",    level: 7, years_experience: 2, is_featured: false, color: "blue",   created_at: "", updated_at: "" },
  { id: "b6", category: "Backend", name: "PostgreSQL", level: 8, years_experience: 3, is_featured: true,  color: "blue",   created_at: "", updated_at: "" },
  { id: "b7", category: "Backend", name: "MySQL",      level: 8, years_experience: 3, is_featured: true,  color: "blue",   created_at: "", updated_at: "" },
  { id: "b8", category: "Backend", name: "MongoDB",    level: 6, years_experience: 1, is_featured: false, color: "blue",   created_at: "", updated_at: "" },
  { id: "b9", category: "Backend", name: "SQLite",     level: 7, years_experience: 2, is_featured: false, color: "blue",   created_at: "", updated_at: "" },

  // Frontend
  { id: "f1", category: "Frontend", name: "JavaScript",  level: 9, years_experience: 3, is_featured: true,  color: "green", created_at: "", updated_at: "" },
  { id: "f2", category: "Frontend", name: "React",       level: 8, years_experience: 2, is_featured: true,  color: "green", created_at: "", updated_at: "" },
  { id: "f3", category: "Frontend", name: "HTML5",       level: 9, years_experience: 4, is_featured: true,  color: "green", created_at: "", updated_at: "" },
  { id: "f4", category: "Frontend", name: "CSS3",        level: 9, years_experience: 4, is_featured: true,  color: "green", created_at: "", updated_at: "" },
  { id: "f5", category: "Frontend", name: "jQuery",      level: 7, years_experience: 2, is_featured: false, color: "green", created_at: "", updated_at: "" },
  { id: "f6", category: "Frontend", name: "Tailwind CSS",level: 8, years_experience: 2, is_featured: false, color: "green", created_at: "", updated_at: "" },

  // AI / ML
  { id: "a1", category: "AI / ML", name: "Hugging Face Transformers", level: 6, years_experience: 1, is_featured: true,  color: "purple", created_at: "", updated_at: "" },
  { id: "a2", category: "AI / ML", name: "Scikit-learn",              level: 5, years_experience: 1, is_featured: false, color: "purple", created_at: "", updated_at: "" },
  { id: "a3", category: "AI / ML", name: "FAISS",                     level: 6, years_experience: 1, is_featured: false, color: "purple", created_at: "", updated_at: "" },
  { id: "a4", category: "AI / ML", name: "OpenAI API",                level: 7, years_experience: 1, is_featured: true,  color: "purple", created_at: "", updated_at: "" },
  { id: "a5", category: "AI / ML", name: "Large Language Models",     level: 6, years_experience: 1, is_featured: false, color: "purple", created_at: "", updated_at: "" },

  // DevOps & Cloud
  { id: "d1", category: "DevOps & Cloud", name: "Docker", level: 7, years_experience: 1, is_featured: false, color: "orange", created_at: "", updated_at: "" },
  { id: "d2", category: "DevOps & Cloud", name: "Git",    level: 8, years_experience: 3, is_featured: true,  color: "orange", created_at: "", updated_at: "" },
  { id: "d3", category: "DevOps & Cloud", name: "CI/CD",  level: 6, years_experience: 1, is_featured: false, color: "orange", created_at: "", updated_at: "" },
  { id: "d4", category: "DevOps & Cloud", name: "AWS",    level: 5, years_experience: 1, is_featured: false, color: "orange", created_at: "", updated_at: "" },
  { id: "d5", category: "DevOps & Cloud", name: "Vercel", level: 7, years_experience: 1, is_featured: false, color: "orange", created_at: "", updated_at: "" },

  // Testing & Practices
  { id: "t1", category: "Testing & Practices", name: "Unit Testing",      level: 7, years_experience: 2, is_featured: false, color: "cyan", created_at: "", updated_at: "" },
  { id: "t2", category: "Testing & Practices", name: "Integration Testing",level: 6, years_experience: 1, is_featured: false, color: "cyan", created_at: "", updated_at: "" },
  { id: "t3", category: "Testing & Practices", name: "TDD",               level: 6, years_experience: 1, is_featured: false, color: "cyan", created_at: "", updated_at: "" },
  { id: "t4", category: "Testing & Practices", name: "Agile",             level: 7, years_experience: 2, is_featured: false, color: "cyan", created_at: "", updated_at: "" },
  { id: "t5", category: "Testing & Practices", name: "Scrum",             level: 7, years_experience: 2, is_featured: false, color: "cyan", created_at: "", updated_at: "" },
  { id: "t6", category: "Testing & Practices", name: "REST API Design",   level: 8, years_experience: 2, is_featured: true,  color: "cyan", created_at: "", updated_at: "" },
]

export function useSkills() {
  const [skills] = useState<Skill[]>(STATIC_SKILLS)
  return {
    skills,
    loading: false,
    error: null,
    refreshSkills: async () => {},
  }
}
