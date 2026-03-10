import Image from "next/image"

export default function About() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-full h-96 rounded-lg overflow-hidden shadow-xl border-4 border-white dark:border-gray-700">
              <Image
                src="/Mypicture.jpg"
                alt="Qayyum Bokhari"
                width={400}
                height={384}
                className="w-full h-full object-contain object-center hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Self-Taught. Production-Ready. Always Building.
            </h3>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              COVID took my bar job. So I taught myself to code. No bootcamp, no hand-holding — just YouTube, docs, and
              a lot of broken projects that eventually started working.
            </p>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              To get my first clients, I cold-called businesses I found on Google Maps and offered to build them
              websites. That&apos;s where I learned that shipping matters more than perfection, and that real users
              break things in ways you never expect.
            </p>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Since then I&apos;ve built production inventory systems with Django and Laravel, designed REST APIs with
              JWT auth and Redis caching, and deployed AI agents and RAG chatbots using OpenAI and Hugging Face. The
              kind of things that actually run in the real world, not just on localhost.
            </p>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              I&apos;m currently studying BSc Artificial Intelligence &amp; Robotics at Aston University, graduating
              2027 — which means I spend my days learning the theory and my evenings applying it.
            </p>

            <div className="flex gap-4 mt-6">
              <a
                href="/Qayyum_Bokharicv.pdf"
                download
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Download CV
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors font-semibold"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
