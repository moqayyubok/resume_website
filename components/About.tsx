import { stats } from "@/data/data"
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

          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
              AI and Software Engineer
            </h3>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Full-Stack Developer transitioning to AI Engineering with hands-on experience building production ML systems. Delivered 23% reduction in client return rates through predictive analytics and developed AI-powered applications using OpenAI API, Hugging Face Transformers, and Django.
            </p>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Currently pursuing BSc in AI & Robotics at Aston University while building intelligent web applications. Seeking junior AI engineer roles to combine software engineering expertise with machine learning implementation.
            </p>

            <div className="flex gap-4 mt-6">
              <a
                href="/Qayyum_Bokhari_CV.pdf"
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
