import type React from "react"
import type { Metadata } from "next"
import { Analytics } from '@vercel/analytics/next'
import { Plus_Jakarta_Sans, DM_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import DataStatus from "@/components/DataStatus"

// Display font — applied globally to body
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400","500","700","800"], display: "swap" })
// Mono font — exposed as CSS variable for components that need it
const dmMono  = DM_Mono({ subsets: ["latin"], weight: ["400","500"], display: "swap", variable: "--font-mono" })

export const metadata: Metadata = {
  title: "Qayyum Bokhari - Software Engineer | AI & Full Stack Developer",
  description: "Software Engineer with commercial experience in full-stack development, CI/CD, and AI-powered applications. Python, Django, React, LLMs. Based in Birmingham, UK.",
  keywords: "Software Engineer, Full Stack Developer, AI Engineer, Python, Django, React, Machine Learning, Birmingham, UK",
  authors: [{ name: "Qayyum Bokhari" }],
  openGraph: {
    title: "Qayyum Bokhari - Software Engineer | AI & Full Stack Developer",
    description: "Software Engineer with commercial experience in full-stack development and AI-powered applications",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${jakarta.className} ${dmMono.variable} bg-[#0a0a0a] text-white antialiased`}>
        <Navbar />
<Analytics />
        <main className="min-h-screen">{children}</main>
        <Footer />
        {/* <DataStatus /> */}
      </body>
    </html>
  )
}
