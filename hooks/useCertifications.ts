"use client"

import { useState, useEffect } from "react"
import { dataFetcher } from "@/lib/data-fetcher"
import { certificationsData } from "@/data/data"
import type { Certification } from "@/lib/database"

// Convert static certifications data to Certification format
const convertStaticCertifications = (): Certification[] => {
  return certificationsData.map((cert, index) => ({
    id: `static-cert-${index}`,
    name: cert.name,
    issuing_organization: cert.status === "Currently Pursuing" ? "In Progress" : "Completed",
    issue_date: new Date().toISOString().split("T")[0],
    expiration_date: null,
    credential_id: null,
    credential_url: null,
    description: cert.description,
    skills: cert.skills,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }))
}

export function useCertifications() {
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        setLoading(true)
        const certificationsData = await dataFetcher.getCertifications()

        // If no certifications from database, use static data
        if (certificationsData.length === 0) {
          setCertifications(convertStaticCertifications())
        } else {
          setCertifications(certificationsData)
        }
      } catch (err) {
        // On error, fallback to static data
        setCertifications(convertStaticCertifications())
        setError(null)
      } finally {
        setLoading(false)
      }
    }

    fetchCertifications()
  }, [])

  const refreshCertifications = async () => {
    try {
      setLoading(true)
      const certificationsData = await dataFetcher.getCertifications(true)

      // If no certifications from database, use static data
      if (certificationsData.length === 0) {
        setCertifications(convertStaticCertifications())
      } else {
        setCertifications(certificationsData)
      }
    } catch (err) {
      // On error, fallback to static data
      setCertifications(convertStaticCertifications())
      setError(null)
    } finally {
      setLoading(false)
    }
  }

  return { certifications, loading, error, refreshCertifications }
}
