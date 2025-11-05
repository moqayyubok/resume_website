import { NextResponse } from "next/server"
import { supabase } from "@/lib/database"
import { educationData, certificationsData } from "@/data/data"

export async function POST(request: Request) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase is not configured. Please set up your NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables." },
        { status: 500 }
      )
    }

    // Check for authorization (optional - remove if you want public access)
    const { authorization } = await request.json().catch(() => ({ authorization: null }))

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
    return NextResponse.json(
      { error: "Failed to seed database", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}

// GET endpoint to check current data
export async function GET() {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: "Supabase is not configured" },
        { status: 500 }
      )
    }

    const { data: education, error: eduError } = await supabase
      .from("education")
      .select("*")

    const { data: certifications, error: certError } = await supabase
      .from("certifications")
      .select("*")

    return NextResponse.json({
      education: education || [],
      certifications: certifications || [],
      educationError: eduError?.message,
      certificationsError: certError?.message,
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}
