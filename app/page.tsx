import Hero from "@/components/Hero"
import About from "@/components/About"
import Skills from "@/components/Skills"
import Education from "@/components/Education"
import Certifications from "@/components/Certifications"
import Projects from "@/components/Projects"
import BlogPreview from "@/components/BlogPreview"
import Contact from "@/components/Contact"
import AIChat from "@/components/AIChat"

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Education />
      <Certifications />
      <BlogPreview />
      <Contact />
      <AIChat />
    </>
  )
}
