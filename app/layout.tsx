import type React from "react"
import type { Metadata } from "next"
import { Analytics } from '@vercel/analytics/next'
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import DataStatus from "@/components/DataStatus"

const inter = Inter({ subsets: ["latin"] })

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
      <body
        className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300`}
      >
        <Navbar />
<Analytics />
        <main className="min-h-screen">{children}</main>
        <Footer />
        {/* <DataStatus /> */}
      </body>
    </html>
  )
}
