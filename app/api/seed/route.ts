import { NextResponse } from "next/server"
import { supabase } from "@/lib/database"
import { educationData, certificationsData } from "@/data/data"

export async function POST(request: Request) {
  try {
    if (!supabase) {
      return NextResponse.json({ error: "Database not configured." }, { status: 500 })
    }

    // Require SEED_SECRET — this endpoint must never be publicly accessible
    const SEED_SECRET = process.env.SEED_SECRET
    if (!SEED_SECRET) {
      return NextResponse.json({ error: "Endpoint disabled." }, { status: 403 })
    }

    const body = await request.json().catch(() => ({}))
    const { authorization } = body

    if (authorization !== SEED_SECRET) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 })
    }

    // Seed Education Data
    const educationRecords = educationData.map((edu) => ({
      institution: edu.institution,
      degree: edu.degree,
      field_of_study: edu.degree,
      start_date: "2024-09-01",
      end_date: null,
      is_current: edu.status === "Current Student",
      grade: null,
      description: edu.description,
      location: edu.location,
      achievements: edu.highlights,
      logo_url: null,
    }))

    // Insert education data
    const { data: educationInserted, error: educationError } = await supabase
      .from("education")
      .upsert(educationRecords, { onConflict: "institution" })
      .select()

    if (educationError) {
      console.error("Education seed error:", educationError)
    }

    // Seed Certifications Data
    const certificationRecords = certificationsData.map((cert) => ({
      name: cert.name,
      issuing_organization: "In Progress",
      issue_date: new Date().toISOString().split("T")[0],
      expiration_date: null,
      credential_id: null,
      credential_url: null,
      description: cert.description,
      logo_url: null,
      skills: cert.skills,
      is_featured: true,
    }))

    // Insert certifications data
    const { data: certificationsInserted, error: certificationsError } = await supabase
      .from("certifications")
      .upsert(certificationRecords, { onConflict: "name" })
      .select()

    if (certificationsError) {
      console.error("Certifications seed error:", certificationsError)
    }

    return NextResponse.json(
      {
        success: true,
        message: "Database seeded successfully!",
        education: educationInserted?.length || 0,
        certifications: certificationsInserted?.length || 0,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Seed error:", error)
    return NextResponse.json({ error: "Failed to seed database." }, { status: 500 })
  }
}

// GET endpoint disabled in production — use POST with SEED_SECRET instead
export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 })
}
