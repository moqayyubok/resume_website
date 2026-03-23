"use client"

import type React from "react"
import { useState } from "react"
import { Award, Calendar, ExternalLink, Star, CheckCircle, RefreshCw } from "lucide-react"
import { useCertifications } from "@/hooks/useCertifications"

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

export default function Certifications() {
  const { certifications, loading, error, refreshCertifications } = useCertifications()
  const [filter, setFilter] = useState<"all" | "featured" | "active">("all")
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = async () => {
    setRefreshing(true)
    await refreshCertifications()
    setRefreshing(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    })
  }

  const isActive = (cert: any) => {
    if (!cert.expiration_date) return true
    return new Date(cert.expiration_date) > new Date()
  }

  const filteredCertifications = certifications.filter((cert) => {
    if (filter === "featured") return cert.is_featured
    if (filter === "active") return isActive(cert)
    return true
  })

  if (error) {
    return (
      <section id="certifications" className="py-24" style={{ background: "#0a0a0a" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10 text-center">
          <p className="text-sm mb-4" style={{ color: "rgba(248,113,113,0.9)" }}>Failed to load certifications</p>
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
      <section id="certifications" className="py-24" style={{ background: "#0a0a0a" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10 text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500 mx-auto" />
          <p className="mt-4 text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>Loading certifications…</p>
        </div>
      </section>
    )
  }

  const filterBtnStyle = (active: boolean): React.CSSProperties =>
    active
      ? { background: "#2563EB", color: "#fff", border: "1px solid #3B82F6" }
      : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.08)" }

  return (
    <section id="certifications" className="py-24" style={{ background: "#0a0a0a" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        {/* ── Section header ── */}
        <div className="mb-14">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-medium tracking-[0.28em] uppercase mb-3"
                 style={{ ...MONO, color: "#60A5FA" }}>
                ( 06 ) &nbsp;Credentials
              </p>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">Certifications</h2>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-2 transition-colors"
              style={{ color: "rgba(255,255,255,0.35)" }}
              title="Refresh certifications data"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            </button>
          </div>
          <div className="mt-5 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
          <p className="mt-4 text-sm" style={{ color: "rgba(255,255,255,0.42)" }}>
            Professional certifications and credentials that validate my expertise
          </p>
        </div>

        {/* ── Filter pills ── */}
        <div className="flex gap-3 mb-12 flex-wrap">
          {(["all", "featured", "active"] as const).map((f) => {
            const count =
              f === "all" ? certifications.length
              : f === "featured" ? certifications.filter((c) => c.is_featured).length
              : certifications.filter((c) => isActive(c)).length
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-5 py-2 rounded-full text-xs font-semibold capitalize transition-all"
                style={{ ...MONO, ...filterBtnStyle(filter === f) }}
              >
                {f} ({count})
              </button>
            )
          })}
        </div>

        {/* ── Certifications grid ── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertifications.map((cert) => (
            <div
              key={cert.id}
              style={{
                ...CARD,
                ...(cert.is_featured ? { border: "1px solid rgba(59,130,246,0.25)" } : {}),
              }}
              className="p-6 flex flex-col"
            >
              {/* Card top row */}
              <div className="flex items-start justify-between mb-5">
                <div className="w-11 h-11 flex items-center justify-center flex-shrink-0" style={ICON_BOX}>
                  <Award className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-2">
                  {cert.is_featured && <Star className="w-4 h-4 fill-current" style={{ color: "#FBBF24" }} />}
                  {isActive(cert) && <CheckCircle className="w-4 h-4" style={{ color: "#4ADE80" }} />}
                </div>
              </div>

              <h3 className="text-base font-bold text-white mb-1 leading-snug">{cert.name}</h3>
              <p className="text-sm mb-4" style={{ color: "#60A5FA" }}>{cert.issuing_organization}</p>

              <div className="flex items-center gap-2 text-xs mb-4" style={{ ...MONO, color: "rgba(255,255,255,0.38)" }}>
                <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                <span>
                  Issued {formatDate(cert.issue_date)}
                  {cert.expiration_date && <> · Expires {formatDate(cert.expiration_date)}</>}
                </span>
              </div>

              {cert.description && (
                <p className="text-xs leading-relaxed mb-4 flex-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {cert.description}
                </p>
              )}

              {cert.skills && cert.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {cert.skills.slice(0, 4).map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-[10px] rounded"
                      style={{
                        ...MONO,
                        background: "rgba(59,130,246,0.08)",
                        border: "1px solid rgba(59,130,246,0.15)",
                        color: "rgba(255,255,255,0.55)",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 4 && (
                    <span
                      className="px-2 py-0.5 text-[10px] rounded"
                      style={{
                        ...MONO,
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.35)",
                      }}
                    >
                      +{cert.skills.length - 4} more
                    </span>
                  )}
                </div>
              )}

              {/* Card footer */}
              <div
                className="flex items-center justify-between pt-4"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span
                  className="px-2.5 py-1 text-[10px] rounded-full font-semibold"
                  style={
                    isActive(cert)
                      ? { ...MONO, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", color: "rgba(74,222,128,0.9)" }
                      : { ...MONO, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "rgba(248,113,113,0.9)" }
                  }
                >
                  {isActive(cert) ? "Active" : "Expired"}
                </span>

                {cert.credential_url && (
                  <a
                    href={cert.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-semibold transition-colors hover:opacity-70"
                    style={{ color: "#60A5FA" }}
                  >
                    Verify
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              {cert.credential_id && (
                <p className="mt-3 text-[10px]" style={{ ...MONO, color: "rgba(255,255,255,0.22)" }}>
                  ID: {cert.credential_id}
                </p>
              )}
            </div>
          ))}
        </div>

        {filteredCertifications.length === 0 && (
          <div className="text-center py-16">
            <Award className="w-12 h-12 mx-auto mb-4" style={{ color: "rgba(255,255,255,0.15)" }} />
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
              No certifications found for the selected filter.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
