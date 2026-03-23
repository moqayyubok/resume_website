"use client"

import { GraduationCap, Calendar, MapPin, Award, BookOpen, RefreshCw } from "lucide-react"
import { useEducation } from "@/hooks/useEducation"
import { useState } from "react"

const MONO: React.CSSProperties = { fontFamily: "var(--font-mono)" }
const CARD: React.CSSProperties = {
  background: "rgba(255,255,255,0.025)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 16,
}
const ICON_BOX: React.CSSProperties = {
  background: "rgba(59,130,246,0.1)",
  border: "1px solid rgba(59,130,246,0.2)",
  color: "#60A5FA",
  borderRadius: 12,
}

import type React from "react"

export default function Education() {
  const { education, loading, error, refreshEducation } = useEducation()
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = async () => {
    setRefreshing(true)
    await refreshEducation()
    setRefreshing(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    })
  }

  if (error) {
    return (
      <section id="education" className="py-24" style={{ background: "#0d0d0d" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10 text-center">
          <p className="text-sm mb-4" style={{ color: "rgba(248,113,113,0.9)" }}>Failed to load education</p>
          <button
            onClick={handleRefresh}
            className="px-6 py-2 rounded-full text-sm font-bold text-white"
            style={{ background: "#3B82F6" }}
          >
            Try Again
          </button>
        </div>
      </section>
    )
  }

  if (loading) {
    return (
      <section id="education" className="py-24" style={{ background: "#0d0d0d" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10 text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500 mx-auto" />
          <p className="mt-4 text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>Loading education…</p>
        </div>
      </section>
    )
  }

  return (
    <section id="education" className="py-24" style={{ background: "#0d0d0d" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        {/* ── Section header ── */}
        <div className="mb-14">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-medium tracking-[0.28em] uppercase mb-3"
                 style={{ ...MONO, color: "#60A5FA" }}>
                ( 05 ) &nbsp;Education
              </p>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">Academic Path</h2>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-2 transition-colors"
              style={{ color: "rgba(255,255,255,0.35)" }}
              title="Refresh education data"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            </button>
          </div>
          <div className="mt-5 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
          <p className="mt-4 text-sm" style={{ color: "rgba(255,255,255,0.42)" }}>
            My academic journey and continuous learning path
          </p>
        </div>

        {/* ── Education cards ── */}
        <div className="space-y-6">
          {education.map((edu) => (
            <div key={edu.id} style={CARD} className="p-8">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-11 h-11 flex items-center justify-center flex-shrink-0" style={ICON_BOX}>
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white leading-snug">{edu.degree}</h3>
                      {edu.field_of_study && (
                        <p className="text-sm mt-0.5" style={{ color: "#60A5FA" }}>{edu.field_of_study}</p>
                      )}
                      <p className="text-sm font-semibold mt-1" style={{ color: "rgba(255,255,255,0.65)" }}>
                        {edu.institution}
                      </p>
                    </div>
                  </div>

                  {/* Metadata row */}
                  <div className="flex flex-wrap gap-5 mb-5">
                    <div className="flex items-center gap-2 text-xs" style={{ ...MONO, color: "rgba(255,255,255,0.38)" }}>
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(edu.start_date)} —{" "}
                      {edu.is_current ? "Present" : edu.end_date ? formatDate(edu.end_date) : "Present"}
                    </div>
                    {edu.location && (
                      <div className="flex items-center gap-2 text-xs" style={{ ...MONO, color: "rgba(255,255,255,0.38)" }}>
                        <MapPin className="w-3.5 h-3.5" />
                        {edu.location}
                      </div>
                    )}
                    {edu.grade && (
                      <div className="flex items-center gap-2 text-xs" style={{ ...MONO, color: "rgba(255,255,255,0.38)" }}>
                        <BookOpen className="w-3.5 h-3.5" />
                        {edu.grade}
                      </div>
                    )}
                  </div>

                  {edu.description && (
                    <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.55)" }}>
                      {edu.description}
                    </p>
                  )}

                  {edu.achievements && edu.achievements.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold mb-3 flex items-center gap-2"
                         style={{ ...MONO, color: "rgba(255,255,255,0.45)" }}>
                        <Award className="w-3.5 h-3.5" style={{ color: "#60A5FA" }} />
                        Key Achievements
                      </p>
                      <ul className="space-y-2">
                        {edu.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                            <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: "#3B82F6" }} />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {edu.is_current && (
                  <div className="flex-shrink-0">
                    <span
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
                      style={{
                        background: "rgba(34,197,94,0.08)",
                        border: "1px solid rgba(34,197,94,0.2)",
                        color: "rgba(74,222,128,0.9)",
                        ...MONO,
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      Enrolled
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
