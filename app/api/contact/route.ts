import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { rateLimit, getClientIP } from "@/lib/rate-limit"

// Escape HTML entities to prevent injection into the email body
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

const MAX_NAME_LEN = 100
const MAX_EMAIL_LEN = 254 // RFC 5321 max
const MAX_SUBJECT_LEN = 200
const MAX_MESSAGE_LEN = 3000

export async function POST(request: NextRequest) {
  // Rate limit: 3 submissions per IP per minute
  const ip = getClientIP(request)
  if (!rateLimit(ip, 3, 60_000)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment before trying again." },
      { status: 429 }
    )
  }

  try {
    const body = await request.json()
    const { name, email, subject, message, website } = body

    // Honeypot — bots fill hidden fields, humans don't
    if (website) {
      // Silently accept but don't send
      return NextResponse.json({ success: true, message: "Message sent successfully!" }, { status: 200 })
    }

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Length validation
    if (name.length > MAX_NAME_LEN)
      return NextResponse.json({ error: "Name is too long" }, { status: 400 })
    if (email.length > MAX_EMAIL_LEN)
      return NextResponse.json({ error: "Email address is too long" }, { status: 400 })
    if (subject.length > MAX_SUBJECT_LEN)
      return NextResponse.json({ error: "Subject is too long" }, { status: 400 })
    if (message.length > MAX_MESSAGE_LEN)
      return NextResponse.json({ error: "Message is too long (max 3000 characters)" }, { status: 400 })

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Sanitise all user-supplied values before putting them in HTML
    const safeName    = escapeHtml(name.trim())
    const safeEmail   = escapeHtml(email.trim())
    const safeSubject = escapeHtml(subject.trim())
    // For message: escape HTML, then convert newlines to <br>
    const safeMessage = escapeHtml(message.trim()).replace(/\n/g, "<br>")

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: "qayyumbokhari77@gmail.com",
      replyTo: safeEmail,
      subject: `Portfolio Contact: ${safeSubject}`,
      html: `
        <h2>New message from your portfolio</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
        <p><strong>Subject:</strong> ${safeSubject}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    })

    return NextResponse.json({ success: true, message: "Message sent successfully!" }, { status: 200 })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    )
  }
}
