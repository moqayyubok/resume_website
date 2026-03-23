import Image from "next/image"

const MONO: React.CSSProperties = { fontFamily: "var(--font-mono)" }
const CARD: React.CSSProperties = { background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12 }

export default function About() {
  return (
    <section id="about" className="py-24" style={{ background: "#0d0d0d" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="mb-14">
          <p className="text-[10px] font-medium tracking-[0.28em] uppercase mb-3" style={{ ...MONO, color: "#60A5FA" }}>
            ( 02 ) &nbsp;About
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">About Me</h2>
          <div className="mt-5 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="overflow-hidden" style={{ borderRadius: 16, border: "1px solid rgba(255,255,255,0.07)", aspectRatio: "4/5" }}>
            <Image src="/Mypicture.jpg" alt="Qayyum Bokhari" width={480} height={600} className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-white leading-snug">Commercial Experience. Production-Ready. Always Building.</h3>
            <p className="leading-relaxed text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
              I&apos;m a Software Engineer with commercial experience building production web applications and AI-powered systems. I&apos;ve delivered measurable results including a 23% reduction in client return rates through predictive analytics and a 35% improvement in backend performance through strategic optimisation.
            </p>
            <p className="leading-relaxed text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
              My journey started with cold-calling businesses on Google Maps and offering to build their websites. That taught me that shipping matters more than perfection. Since then I&apos;ve built production inventory systems with Django and Laravel, REST APIs with JWT auth and Redis caching, and deployed AI agents and RAG chatbots using OpenAI and Hugging Face.
            </p>
            <p className="leading-relaxed text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
              Currently studying BSc AI &amp; Robotics at Aston University (graduating 2027). Full right to work in the UK. Actively seeking Software Engineer, AI/ML Engineer, or Full Stack Developer roles.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {[{ value: "3+", label: "Years Building" }, { value: "20+", label: "Projects Shipped" }, { value: "UK", label: "Right to Work" }].map(({ value, label }) => (
                <div key={label} className="px-4 py-2.5" style={CARD}>
                  <p className="text-lg font-extrabold text-white">{value}</p>
                  <p className="text-[10px] tracking-wider uppercase" style={{ ...MONO, color: "rgba(255,255,255,0.38)" }}>{label}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-3 pt-2">
              <a href="/Qayyum_Bokhari_CV.docx" download className="px-5 py-2.5 text-xs font-bold rounded-full text-white tracking-wide transition-all hover:brightness-110" style={{ background: "#3B82F6" }}>Download CV</a>
              <a href="#contact" className="px-5 py-2.5 text-xs font-semibold rounded-full tracking-wide transition-all hover:text-blue-400" style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.65)" }}>Get in Touch</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
