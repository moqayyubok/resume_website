import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    message: "Deployment test - Changes are live!",
    timestamp: new Date().toISOString(),
    commitHash: "02d409a",
    changes: {
      cvButton: "Updated to Qayyum_Bokhari_CV.docx",
      contactForm: "Has API endpoint at /api/contact",
      chatbot: "Improved personality with temperature 0.9",
      seedEndpoint: "Available at /api/seed",
    }
  })
}
