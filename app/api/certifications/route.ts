import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"
import { requireAuth } from "@/lib/auth"

// API route for certifications
export async function GET() {
  try {
    const certifications = await db.getCertifications()
    return NextResponse.json(certifications)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch certifications" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const user = requireAuth(request)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const certificationData = await request.json()
    const newCertification = await db.createCertification(certificationData)
    return NextResponse.json(newCertification, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create certification" }, { status: 500 })
  }
}
