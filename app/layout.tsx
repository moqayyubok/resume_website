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
  title: "Qayyum Bokhari - AI & Robotics Developer",
  description: "AI & Robotics portfolio showcasing projects and expertise in machine learning, robotics, and full-stack development.",
  keywords: "AI, Machine Learning, Robotics, Web Development, Portfolio, Blog",
  authors: [{ name: "Qayyum Bokhari" }],
  openGraph: {
    title: "Qayyum Bokhari - AI & Robotics Developer",
    description: "AI & Robotics portfolio showcasing projects and expertise",
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
