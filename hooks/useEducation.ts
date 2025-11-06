"use client"

import { useState, useEffect } from "react"
import { dataFetcher } from "@/lib/data-fetcher"
import { educationData } from "@/data/data"
import type { Education } from "@/lib/database"

// Convert static education data to Education format
const convertStaticEducation = (): Education[] => {
  return educationData.map((edu, index) => ({
    id: `static-edu-${index}`,
    institution: edu.institution,
    degree: edu.degree,
    field_of_study: "Artificial Intelligence and Robotics",
    start_date: "2024-09-01",
    end_date: null,
    is_current: edu.status === "Current Student",
    grade: null,
    description: edu.description,
    location: edu.location,
    achievements: edu.highlights,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }))
}

export function useEducation() {
  const [education, setEducation] = useState<Education[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        setLoading(true)
        const educationData = await dataFetcher.getEducation()

        // If no education from database, use static data
        if (educationData.length === 0) {
          setEducation(convertStaticEducation())
        } else {
          setEducation(educationData)
        }
      } catch (err) {
        // On error, fallback to static data
        setEducation(convertStaticEducation())
        setError(null)
      } finally {
        setLoading(false)
      }
    }

    fetchEducation()
  }, [])

  const refreshEducation = async () => {
    try {
      setLoading(true)
      const educationData = await dataFetcher.getEducation(true)

      // If no education from database, use static data
      if (educationData.length === 0) {
        setEducation(convertStaticEducation())
      } else {
        setEducation(educationData)
      }
    } catch (err) {
      // On error, fallback to static data
      setEducation(convertStaticEducation())
      setError(null)
    } finally {
      setLoading(false)
    }
  }

  return { education, loading, error, refreshEducation }
}
