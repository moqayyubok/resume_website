import { ExternalLink, Github, AlertCircle, TrendingUp } from "lucide-react"
import { projects } from "@/data/data"
import AskAIButton from "@/components/AskAIButton"

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Real problems. Real solutions. Real results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div className="p-6 flex flex-col flex-1">
                {/* Header */}
                <div className="flex items-center mb-4">
                  <div className="text-blue-600 dark:text-blue-400 mr-3">{project.icon}</div>
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-5 leading-relaxed text-sm">{project.description}</p>

                {/* Problem / Result */}
                {(project.problem || project.result) && (
                  <div className="space-y-2 mb-5">
                    {project.problem && (
                      <div className="flex gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <AlertCircle className="w-4 h-4 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wide">
                            The Problem
                          </span>
                          <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5 leading-relaxed">
                            {project.problem}
                          </p>
                        </div>
                      </div>
                    )}
                    {project.result && (
                      <div className="flex gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide">
                            The Result
                          </span>
                          <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5 leading-relaxed">
                            {project.result}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-5 mt-auto">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 items-center flex-wrap">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                  {project.demo !== "#" && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                  <AskAIButton projectTitle={project.title} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
