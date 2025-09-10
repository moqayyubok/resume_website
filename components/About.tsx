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
              AI & Robotics Student | Full-Stack Developer
            </h3>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              I'm an Artificial Intelligence and Robotics student at Aston University with a proven ability to design and build complex applications that integrate advanced machine learning algorithms and full software ecosystems.
            </p>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              My experience spans from developing end-to-end solutions with seamless integrations to working on real-world projects that combine AI, robotics, and modern application development. I bring both technical expertise and entrepreneurial drive, capable of turning ideas into fully functional, scalable systems.
            </p>


          </div>
        </div>
      </div>
    </section>
  )
}
