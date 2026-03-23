import { ExternalLink, Github, AlertCircle, TrendingUp, FileText } from "lucide-react"
import { projects } from "@/data/data"
import AskAIButton from "@/components/AskAIButton"

const MONO: React.CSSProperties = { fontFamily: "var(--font-mono)" }
const CARD: React.CSSProperties = { background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16 }

export default function Projects() {
  return (
    <section id="projects" className="py-24" style={{ background: "#0d0d0d" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="mb-14">
          <p className="text-[10px] font-medium tracking-[0.28em] uppercase mb-3" style={{ ...MONO, color: "#60A5FA" }}>
            ( 04 ) &nbsp;Work
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">Featured Projects</h2>
          <div className="mt-5 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
          <p className="mt-4 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>Real problems. Real solutions. Real results.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="flex flex-col overflow-hidden transition-all duration-300 hover:border-white/[0.14]" style={{ ...CARD }}>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center mb-4 gap-3">
                  <div style={{ color: "#60A5FA" }}>{project.icon}</div>
                  <h3 className="text-base font-bold text-white leading-tight">{project.title}</h3>
                </div>
                <p className="text-xs leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>{project.description}</p>
                {(project.problem || project.result) && (
                  <div className="space-y-2 mb-5">
                    {project.problem && (
                      <div className="flex gap-2 p-3 rounded-lg" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}>
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: "rgba(248,113,113,0.8)" }} />
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ ...MONO, color: "rgba(248,113,113,0.7)" }}>Problem</span>
                          <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{project.problem}</p>
                        </div>
                      </div>
                    )}
                    {project.result && (
                      <div className="flex gap-2 p-3 rounded-lg" style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.15)" }}>
                        <TrendingUp className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: "rgba(74,222,128,0.8)" }} />
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ ...MONO, color: "rgba(74,222,128,0.7)" }}>Result</span>
                          <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{project.result}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2 py-0.5 text-[10px] rounded-full" style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.18)", color: "rgba(255,255,255,0.55)" }}>{t}</span>
                  ))}
                </div>
                <div className="mt-auto flex items-center gap-3">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs transition-colors hover:text-blue-400" style={{ color: "rgba(255,255,255,0.45)" }}>
                      <Github className="w-3.5 h-3.5" /> Code
                    </a>
                  )}
                  {project.demo && project.demo !== "#" && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs transition-colors hover:text-blue-400" style={{ color: "rgba(255,255,255,0.45)" }}>
                      <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                    </a>
                  )}
                  {project.paper && (
                    <a href={project.paper} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs transition-colors hover:text-blue-400" style={{ color: "rgba(255,255,255,0.45)" }}>
                      <FileText className="w-3.5 h-3.5" /> Paper
                    </a>
                  )}
                  <div className="ml-auto">
                    <AskAIButton projectTitle={project.title} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
